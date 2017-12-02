module TZ.Model exposing (Model, Msg(..))

import Navigation exposing (Location)
import TZ.Route as Route exposing (Route)


type alias Model =
    { route : Route }


type Msg
    = NoOp
    | LocationChanged Location
    | ChangeRoute Route
