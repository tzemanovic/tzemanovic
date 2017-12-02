module Main exposing (main)

import Navigation exposing (Location)
import TZ.Model exposing (Model, Msg(..))
import TZ.Route as Route exposing (Route(..))
import TZ.View exposing (view)


init : Location -> ( Model, Cmd Msg )
init location =
    ( { route = Route.fromLocation location }, Cmd.none )



---- UPDATE ----


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
