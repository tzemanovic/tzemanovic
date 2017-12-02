module TZ.StaticView
    exposing
        ( viewBlog
        , viewWork
        , viewStacks
        )

{-| We can't import Main here, because it uses `document.location`, which makes
`elm-static-html` fail.

Therefore, we have to separate the view into its own module.

-}

import Html exposing (Html)
import TZ.Model exposing (Msg)
import TZ.Route as Route exposing (Route(..))
import TZ.View exposing (view)


viewBlog : Html Msg
viewBlog =
    view { route = Blog }


viewWork : Html Msg
viewWork =
    view { route = Work }


viewStacks : Html Msg
viewStacks =
    view { route = Stacks }
