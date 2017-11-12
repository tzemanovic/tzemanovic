module TZ.Style exposing (Style(..), stylesheet)

import Style exposing (..)


type Style
    = None


stylesheet : StyleSheet Style variation
stylesheet =
    Style.styleSheet
        [ style None []
        ]
