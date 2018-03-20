module Main2 exposing (main)

import Main exposing (init, update)
import Navigation exposing (Location)
import TZ.Model exposing (Model, Msg(..))
import TZ.Route as Route exposing (Route(..))
import TZ.View exposing (view)


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
