-- some parts inspired by <https://github.com/yogsototh/yblog>
--------------------------------------------------------------------------------
{-# LANGUAGE OverloadedStrings #-}
import           Control.Monad         (forM)
import           Data.List             (isInfixOf, isPrefixOf, isSuffixOf,
                                        sortBy)
import           Data.Monoid           ((<>))
import           Data.Ord              (comparing)
import           Data.Time.Format      (defaultTimeLocale)
import           GHC.IO.Encoding       (setFileSystemEncoding,
                                        setForeignEncoding, setLocaleEncoding,
                                        utf8)
import           Hakyll
import           System.FilePath       (takeFileName)
import           System.FilePath.Posix (splitFileName, takeBaseName,
                                        takeDirectory, (</>))

--------------------------------------------------------------------------------
main :: IO ()
main = do
    setLocaleEncoding utf8
    setFileSystemEncoding utf8
    setForeignEncoding utf8
    hakyllWith config $ do
        match ("favicon.ico" .||. "robots.txt" .||. "images/**" .||. "css/**" .||. "posts/**.png" .||. "posts/**.jpg" .||. "quarter-brain/**") $ do
            route   idRoute
            compile copyFileCompiler

        match "js/*" $ do
            route idRoute
            compile copyFileCompiler

        match (fromList ["about.rst", "contact.markdown"]) $ do
            route   $ setExtension "html"
            compile $ pandocCompiler
                >>= loadAndApplyTemplate "templates/default.html" defaultContext
                >>= relativizeUrls

        match "posts/*" $ do
            route $ niceRoute
            compile $ pandocCompiler
                >>= saveSnapshot "post"
                >>= loadAndApplyTemplate "templates/post.html"    postCtx
                >>= loadAndApplyTemplate "templates/default.html" postCtx
                >>= relativizeUrls
                >>= removeIndexHtml

        create ["feed.xml"] $ do
            route idRoute
            compile $ do
                loadAllSnapshots "posts/*" "post"
                >>= (fmap (take 10)) . createdFirst
                >>= renderAtom feedConfiguration feedCtx

        create ["archive.html"] $ do
            route idRoute
            compile $ do
                posts <- recentFirst =<< loadAll "posts/*"
                let archiveCtx =
                        listField "posts" postCtx (return posts) <>
                        constField "title" "archives"            <>
                        defaultContext

                makeItem ""
                    >>= loadAndApplyTemplate "templates/archive.html" archiveCtx
                    >>= loadAndApplyTemplate "templates/default.html" archiveCtx
                    >>= relativizeUrls


        {-match "index.html" $ do
            route idRoute
            compile $ do
                posts <- recentFirst =<< loadAll "posts/*"
                let indexCtx =
                        listField "posts" postCtx (return posts) <>
                        constField "active-home" "y"             <>
                        constField "title" "home"                <>
                        defaultContext
                getResourceBody
                    >>= applyAsTemplate indexCtx
                    >>= loadAndApplyTemplate "templates/default.html" indexCtx
                    >>= relativizeUrls
                    >>= removeIndexHtml-}

        match "index.html" $ do
            route idRoute
            compile $ do
                posts <- recentFirst =<< loadAll "posts/*"
                let blogCtx =
                        listField "posts" postCtx (return posts) <>
                        constField "active-blog" "y"             <>
                        defaultContext
                getResourceBody
                    >>= applyAsTemplate blogCtx
                    >>= loadAndApplyTemplate "templates/default.html" blogCtx
                    >>= relativizeUrls
                    >>= removeIndexHtml

        match "projects.html" $ do
            route niceRoute
            compile $ do
                let projectsCtx =
                        constField "active-projects" "y"        <>
                        constField "title" "projects"           <>
                        defaultContext
                getResourceBody
                    >>= applyAsTemplate projectsCtx
                    >>= loadAndApplyTemplate "templates/default.html" projectsCtx
                    >>= relativizeUrls
                    >>= removeIndexHtml

        match "404.html" $ do
            route idRoute
            compile $ do
                getResourceBody
                    >>= applyAsTemplate defaultContext
                    >>= loadAndApplyTemplate "templates/default.html" defaultContext
                    >>= relativizeUrls
                    >>= removeIndexHtml

        match "l11*.html" $ do
            route idRoute
            compile $ do
                getResourceBody
                    >>= applyAsTemplate defaultContext
                    >>= loadAndApplyTemplate "templates/default.html" defaultContext
                    >>= relativizeUrls
                    >>= removeIndexHtml

        match "templates/*" $ compile templateCompiler

--------------------------------------------------------------------------------
postCtx :: Context String
postCtx =
    dateField "date" "%B %e, %Y"    <>
    constField "active-blog" "y"    <>
    metaKeywordCtx                  <>
    defaultContext

--------------------------------------------------------------------------------
metaKeywordCtx :: Context String
metaKeywordCtx = field "metaKeywords" $ \item -> do
    tags <- getMetadataField (itemIdentifier item) "tags"
    return $ maybe "" showMetaTags tags
        where
            showMetaTags t = "<meta name=\"keywords\" content=\"" ++ t ++ "\"/>\n"

--------------------------------------------------------------------------------
feedCtx :: Context String
feedCtx = defaultContext <> bodyField "description"

--------------------------------------------------------------------------------
feedConfiguration :: FeedConfiguration
feedConfiguration = FeedConfiguration
    { feedTitle = "tzemanovic.github.io blog"
    , feedDescription = "blog about c++, haskell and other stuff"
    , feedAuthorName = "Tomas Zemanovic"
    , feedAuthorEmail = "tzemanovic@gmail.com"
    , feedRoot = "https://tzemanovic.github.io"
    }

--------------------------------------------------------------------------------
niceRoute :: Routes
niceRoute = customRoute createIndexRoute
    where
        createIndexRoute ident =
            takeDirectory p </> takeBaseName p </> "index.html"
            where p = toFilePath ident

--------------------------------------------------------------------------------
removeIndexHtml :: Item String -> Compiler (Item String)
removeIndexHtml item = return $ fmap (withUrls removeIndexStr) item
    where
        removeIndexStr :: String -> String
        removeIndexStr url = case splitFileName url of
            (dir, "index.html") | isLocal dir -> dir
            _                                 -> url
            where isLocal uri = not (isInfixOf "://" uri)

--------------------------------------------------------------------------------
config :: Configuration
config = defaultConfiguration {ignoreFile = ignoreFile'}
    where
        ignoreFile' path
            | "."    `isPrefixOf` fileName = True
            | "#"    `isPrefixOf` fileName = True
            | "~"    `isSuffixOf` fileName = True
            | ".swp" `isSuffixOf` fileName = True
            | "Thumbs.db" ==      fileName = True
            | otherwise                    = False
            where
                fileName = takeFileName path

--------------------------------------------------------------------------------
createdFirst :: [Item String] -> Compiler [Item String]
createdFirst items = do
    itemsWithTime <- forM items $ \item -> do
        utc <- getItemUTC defaultTimeLocale $ itemIdentifier item
        return (utc,item)
    return $ map snd $ reverse $ sortBy (comparing fst) itemsWithTime

