module TZ.Style exposing (Style(..), stylesheet)

import Style exposing (..)
import Style.Font as Font


type Style
    = None
    | Navigation
    | Logo


stylesheet : StyleSheet Style variation
stylesheet =
    Style.styleSheet
        [ style None []
        , style Navigation
            []
        , style Logo
            [ Font.size 20 ]
        ]
