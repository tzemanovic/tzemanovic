module TZ.Route
    exposing
        ( Route(..)
        , initial
        , fromLocation
        , change
        )

import UrlParser exposing (map, oneOf, parsePath, s, top)
import Navigation exposing (Location)


type Route
    = NotFound
    | Blog
    | Work
    | Stacks


initial : Route
initial =
    Blog


fromLocation : Location -> Route
fromLocation location =
    Maybe.withDefault NotFound <|
        parsePath pathParser location


change : Route -> Cmd msg
change =
    routeToPath >> Navigation.newUrl



---- INTERNAL ----


blog : String
blog =
    "blog"


stacks : String
stacks =
    "stacks"


resume : String
resume =
    "resume"


pathParser : UrlParser.Parser (Route -> c) c
pathParser =
    oneOf
        [ map initial top
        , map Blog (s blog)
        , map Work (s resume)
        , map Stacks (s stacks)
        ]


routeToPath : Route -> String
routeToPath route =
    "/"
        ++ case route of
            NotFound ->
                ""

            Blog ->
                blog

            Work ->
                resume

            Stacks ->
                stacks
