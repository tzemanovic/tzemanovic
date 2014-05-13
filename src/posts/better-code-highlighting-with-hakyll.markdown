---
title: better code highlighting with hakyll
tags: blog, hakyll, highlight-js, highlight, javascript, cli
published: 2014-05-13
---

If you want to highlight code syntax on your site there are couple of alternatives. I looked around and <a href="http://highlightjs.org/" target="_blank">highlight.js</a> seemed to be doing best. So I chose to load the JavaScript on the site and manually initialize it. Simple enough.

But then I realized that I could do better. Because I am using <a href="http://jaspervdj.be/hakyll/" target="_blank">Hakyll</a> to generate static version of my site, I could run the highlighting code on my site during the build, thus avoiding slowing down the page with yet another JavaScript.

To connect some pieces together I used <a href="http://nodejs.org/" target="_blank">node.js</a> to create a command that would run <a href="https://github.com/cheeriojs/cheerio" target="_blank">cheerio</a> (to get jQuery abilities) together with <a href="http://highlightjs.org/" target="_blank">highlight.js</a>. You can get the npm package <a href="https://www.npmjs.org/package/highlight.js-cli" target="_blank">highlight.js-cli</a> by running:

<pre><code class="bash">npm install highlight.js-cli
</code></pre>

There is a <a href="http://jaspervdj.be/hakyll/" target="_blank">Hakyll</a> function <a href="http://jaspervdj.be/hakyll/reference/Hakyll-Core-UnixFilter.html" target="_blank"><code>unixFilter</code></a> that can run a program as a <a href="http://jaspervdj.be/hakyll/tutorials/03-rules-routes-compilers.html#basic-compilers" target="_blank">compiler</a>. You have to run the <a href="https://www.npmjs.org/package/highlight.js-cli" target="_blank">highlight.js-cli</a> through node, pointing it to its source. Like this:

<pre><code class="haskell">main :: IO ()
main = do
  hakyll $ do
    match "posts/*" $ do
      route $ niceRoute
        compile $ getResourceBody
            >>= withItemBody (unixFilter "node" ["..\\highlight.js-cli\\bin\\hljs"])
            >>= saveSnapshot "post"
            >>= pandocCompile
            >>= loadAndApplyTemplate "templates/post.html"    postCtx
            >>= loadAndApplyTemplate "templates/default.html" postCtx
            >>= relativizeUrls
            >>= removeIndexHtml

pandocCompile :: Item String -> Compiler (Item String)
pandocCompile item = return $ writePandoc $ readPandoc item
</code></pre>

And if you put the name of the language in the class like this:
<pre><code class="html">&lt;pre&gt;&lt;code class="haskell"&gt;
	main :: IO ()
&lt;/code&gt;&lt;/pre&gt;
</code></pre>
The <a href="https://www.npmjs.org/package/highlight.js-cli" target="_blank">highlight.js-cli</a> will pick it up and pass it to <a href="http://highlightjs.org/" target="_blank">highlight.js</a>.