module Main exposing (..)

import Page exposing (Page(..))
import Navigation exposing (Location)
import Html exposing (Html, button, div, img, text)
import Html.Attributes exposing (src)
import Html.Events exposing (onClick)


---- MODEL ----


type alias Model =
    { page : Page }


init : Location -> ( Model, Cmd Msg )
init location =
    ( { page = Page.fromLocation location }, Cmd.none )



---- UPDATE ----


type Msg
    = NoOp
    | LocationChanged Location
    | ChangePage Page


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        NoOp ->
            ( model, Cmd.none )

        LocationChanged location ->
            let
                _ =
                    Debug.log "location" <| toString location

                page =
                    Page.fromLocation location
            in
                ( { model | page = page }, Cmd.none )

        ChangePage page ->
            ( model, Page.change page )



---- VIEW ----


view : Model -> Html Msg
view model =
    div []
        [ img [ src "/logo.svg" ] []
        , div [] [ text <| toString model.page ]
        , button [ onClick <| ChangePage Blog ] [ text "Blog" ]
        , button [ onClick <| ChangePage Resume ] [ text "Résumé" ]
        , button [ onClick <| ChangePage Stacks ] [ text "Stacks" ]
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
