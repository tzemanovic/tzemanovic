module Page
    exposing
        ( Page(..)
        , initial
        , fromLocation
        , change
        )

import UrlParser exposing (map, oneOf, parsePath, s, top)
import Navigation exposing (Location)


type Page
    = NotFound
    | Blog
    | Resume
    | Stacks


initial : Page
initial =
    Blog


fromLocation : Location -> Page
fromLocation location =
    Maybe.withDefault NotFound <|
        parsePath pathParser location


change : Page -> Cmd msg
change =
    pageToPath >> Navigation.newUrl



-- INTERNAL --


blog : String
blog =
    "blog"


stacks : String
stacks =
    "stacks"


resume : String
resume =
    "resume"


pathParser : UrlParser.Parser (Page -> c) c
pathParser =
    oneOf
        [ map initial top
        , map Blog (s blog)
        , map Resume (s resume)
        , map Stacks (s stacks)
        ]


pageToPath : Page -> String
pageToPath page =
    "/"
        ++ case page of
            NotFound ->
                ""

            Blog ->
                blog

            Resume ->
                resume

            Stacks ->
                stacks
