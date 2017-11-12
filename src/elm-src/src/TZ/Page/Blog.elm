module TZ.Page.Blog
    exposing
        ( Model
        , init
        , Msg
        , update
        , view
        )

import Element
import TZ.Style exposing (Style(..))


---- MODEL ----


type alias Model =
    {}


init : Model
init =
    {}



---- UPDATE ----


type Msg
    = NoOp


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        NoOp ->
            ( model, Cmd.none )



---- VIEW ----


view : Element.Element Style variation msg
view =
    Element.column None
        []
        [ Element.text "Blog" ]
