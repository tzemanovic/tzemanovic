module TZ.View exposing (view)

import Element
import Element.Attributes as Attr
import Element.Events exposing (onClick)
import Html exposing (Html, button, div, img, text)
import TZ.Model exposing (Model, Msg(..))
import TZ.Page.Blog as Blog
import TZ.Page.Stacks as Stacks
import TZ.Page.Work as Work
import TZ.Route as Route exposing (Route(..))
import TZ.Style exposing (Style(..), stylesheet)


view : Model -> Html Msg
view model =
    Element.viewport stylesheet <|
        Element.row None
            []
            [ Element.column
                None
                [ Attr.width <| Attr.percent 33.3 ]
                [ navigation
                ]
            , Element.column
                None
                [ Attr.width <| Attr.percent 33.3 ]
                [ case model.route of
                    Blog ->
                        Blog.view

                    Work ->
                        Work.view

                    Stacks ->
                        Stacks.view

                    _ ->
                        Element.empty
                ]
            , Element.column
                None
                [ Attr.width <| Attr.percent 33.3 ]
                []
            ]


navigation =
    Element.row
        Navigation
        []
        [ Element.el Logo [] (Element.text "Tomáš Zemanovič") ]
        |> Element.below
            [ Element.column None
                []
                [ Element.el None
                    [ onClick <| ChangeRoute Blog ]
                    (Element.text "Blog")
                , Element.el None
                    [ onClick <| ChangeRoute Work ]
                    (Element.text "Work")
                , Element.el None
                    [ onClick <| ChangeRoute Stacks ]
                    (Element.text "Stacks")
                ]
            ]
        |> Element.screen
