module Main exposing (main)

import Element
import Element.Events exposing (onClick)
import Navigation exposing (Location)
import Html exposing (Html, button, div, img, text)
import TZ.Page.Blog as Blog
import TZ.Page.Resume as Resume
import TZ.Page.Stacks as Stacks
import TZ.Route as Route exposing (Route(..))
import TZ.Style exposing (Style(..), stylesheet)


---- MODEL ----


type alias Model =
    { route : Route }


init : Location -> ( Model, Cmd Msg )
init location =
    ( { route = Route.fromLocation location }, Cmd.none )



---- UPDATE ----


type Msg
    = NoOp
    | LocationChanged Location
    | ChangeRoute Route


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        NoOp ->
            ( model, Cmd.none )

        LocationChanged location ->
            let
                _ =
                    Debug.log "location" <| toString location

                route =
                    Route.fromLocation location
            in
                ( { model | route = route }, Cmd.none )

        ChangeRoute route ->
            ( model, Route.change route )



---- VIEW ----


view : Model -> Html Msg
view model =
    Element.viewport stylesheet <|
        Element.column None
            []
            [ navigation
            , Element.text "view"
            , case model.route of
                Blog ->
                    Blog.view

                Resume ->
                    Resume.view

                Stacks ->
                    Stacks.view

                _ ->
                    Element.empty
            ]


navigation =
    Element.row None
        []
        [ Element.el None [] (Element.text "TZ")
        , Element.row None
            []
            [ Element.el None
                [ onClick <| ChangeRoute Blog ]
                (Element.text "Blog")
            , Element.el None
                [ onClick <| ChangeRoute Resume ]
                (Element.text "R")
            , Element.el None
                [ onClick <| ChangeRoute Stacks ]
                (Element.text "Stacks")
            ]
        ]



---- PROGRAM ----


main : Program Never Model Msg
main =
    Navigation.program
        LocationChanged
        { view = view
        , init = init
        , update = update
        , subscriptions = always Sub.none
        }
