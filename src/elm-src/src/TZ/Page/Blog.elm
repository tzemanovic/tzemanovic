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
        [ Element.text "Blog"
        , Element.paragraph None
            []
            [ Element.text
                """While having drinks with Tibor Kalman one night, he told me, “When you make something no one hates, no one fucking loves it.” What’s important is the fucking drive to see a project through no matter what. Paul Rand once said, “The public is more familiar with bad fucking design than good design. It is, in effect, conditioned to prefer bad design, because that is what it lives with. The new becomes threatening, the old reassuring.” To go partway is easy, but mastering anything requires hard fucking work. If you fucking give up, you will achieve nothing. What’s important is the fucking drive to see a project through no matter what. Can we all just agree as the greater design community to stop fucking talking about Comic Sans altogether? It’s getting fucking old.

Learn from fucking criticism. Must-do is a good fucking master. While having drinks with Tibor Kalman one night, he told me, “When you make something no one hates, no one fucking loves it.” Practice won’t get you anywhere if you mindlessly fucking practice the same thing. Change only occurs when you work deliberately with purpose toward a goal. Why are you fucking reading all of this? Get back to work.

Never let your guard down by thinking you’re fucking good enough. Use your fucking hands. Fuck. While having drinks with Tibor Kalman one night, he told me, “When you make something no one hates, no one fucking loves it.” A good fucking composition is the result of a hierarchy consisting of clearly contrasting elements set with distinct alignments containing irregular intervals of negative space. Your rapidograph pens are fucking dried up, the x-acto blades in your bag are rusty, and your mind is dull. Stop clicking your mouse, get messy, go back to the basics and make something fucking original. Saul Bass on failure: Failure is built into creativity… the creative act involves this element of ‘newness’ and ‘experimentalism,’ then one must expect and accept the fucking possibility of failure.

Why are you fucking reading all of this? Get back to work. Remember it’s called the creative process, it’s not the creative fucking moment. To go partway is easy, but mastering anything requires hard fucking work. Practice won’t get you anywhere if you mindlessly fucking practice the same thing. Change only occurs when you work deliberately with purpose toward a goal.

A good fucking composition is the result of a hierarchy consisting of clearly contrasting elements set with distinct alignments containing irregular intervals of negative space. While having drinks with Tibor Kalman one night, he told me, “When you make something no one hates, no one fucking loves it.” If you’re not being fucking honest with yourself how could you ever hope to communicate something meaningful to someone else? Can we all just agree as the greater design community to stop fucking talking about Comic Sans altogether? It’s getting fucking old.

Make your work consistent but not fucking predictable. A good fucking composition is the result of a hierarchy consisting of clearly contrasting elements set with distinct alignments containing irregular intervals of negative space. Practice won’t get you anywhere if you mindlessly fucking practice the same thing. Change only occurs when you work deliberately with purpose toward a goal. Paul Rand once said, “The public is more familiar with bad fucking design than good design. It is, in effect, conditioned to prefer bad design, because that is what it lives with. The new becomes threatening, the old reassuring.”

Never, never assume that what you have achieved is fucking good enough. While having drinks with Tibor Kalman one night, he told me, “When you make something no one hates, no one fucking loves it.” Saul Bass on failure: Failure is built into creativity… the creative act involves this element of ‘newness’ and ‘experimentalism,’ then one must expect and accept the fucking possibility of failure. You need to sit down and sketch more fucking ideas because stalking your ex on facebook isn’t going to get you anywhere.

Don’t get hung up on things that don’t fucking work. Never, never assume that what you have achieved is fucking good enough. The graphic designer’s first fucking consideration is always the size and shape of the format, whether for the printed page or for digital display. Someday is not a fucking day of the week.

While having drinks with Tibor Kalman one night, he told me, “When you make something no one hates, no one fucking loves it.” Intuition is fucking important. Think about all the fucking possibilities. Fuck. Must-do is a good fucking master. Practice won’t get you anywhere if you mindlessly fucking practice the same thing. Change only occurs when you work deliberately with purpose toward a goal. Never let your guard down by thinking you’re fucking good enough.

Remember it’s called the creative process, it’s not the creative fucking moment. You won’t get good at anything by doing it a lot fucking aimlessly. You need to sit down and sketch more fucking ideas because stalking your ex on facebook isn’t going to get you anywhere. Widows and orphans are terrible fucking tragedies, both in real life and definitely in typography.

Sometimes it is appropriate to place various typographic elements on the outside of the fucking left margin of text to maintain a strong vertical axis. This practice is referred to as exdenting and is most often used with bullets and quotations. You are not your fucking work. Someday is not a fucking day of the week. Creativity is a fucking work-ethic. Form follows fucking function. Nothing of value comes to you without fucking working at it.

This design is fucking brilliant. The graphic designer’s first fucking consideration is always the size and shape of the format, whether for the printed page or for digital display. Use your fucking hands. The details are not the details. They make the fucking design. Use your fucking hands. The details are not the details. They make the fucking design.

Learn from fucking criticism. When you design, you have to draw on your own fucking life experiences. If it’s not something you would want to read/look at/use then why fucking bother? You need to sit down and sketch more fucking ideas because stalking your ex on facebook isn’t going to get you anywhere. This design is fucking brilliant.

Creativity is a fucking work-ethic. Must-do is a good fucking master. When you sit down to work, external critics aren’t the enemy. It’s you who you must to fight against to do great fucking work. You must overcome yourself. If you fucking give up, you will achieve nothing. Think about all the fucking possibilities. A good fucking composition is the result of a hierarchy consisting of clearly contrasting elements set with distinct alignments containing irregular intervals of negative space. Your rapidograph pens are fucking dried up, the x-acto blades in your bag are rusty, and your mind is dull. Stop clicking your mouse, get messy, go back to the basics and make something fucking original. Design is all about fucking relationships—the relationship of form and content, the relationship of elements, the relationship of designer and user.

Never, never assume that what you have achieved is fucking good enough. The details are not the details. They make the fucking design. Make your work consistent but not fucking predictable. If you’re not being fucking honest with yourself how could you ever hope to communicate something meaningful to someone else? You are not your fucking work. Remember it’s called the creative process, it’s not the creative fucking moment. If you fucking give up, you will achieve nothing.

When you design, you have to draw on your own fucking life experiences. If it’s not something you would want to read/look at/use then why fucking bother? The details are not the details. They make the fucking design. You won’t get good at anything by doing it a lot fucking aimlessly. If you’re not being fucking honest with yourself how could you ever hope to communicate something meaningful to someone else? Don’t worry about what other people fucking think. Make your work consistent but not fucking predictable. While having drinks with Tibor Kalman one night, he told me, “When you make something no one hates, no one fucking loves it.” Design as if your fucking life depended on it.

Widows and orphans are terrible fucking tragedies, both in real life and definitely in typography. What’s important is the fucking drive to see a project through no matter what. Don’t fucking lie to yourself. Widows and orphans are terrible fucking tragedies, both in real life and definitely in typography. Can we all just agree as the greater design community to stop fucking talking about Comic Sans altogether? It’s getting fucking old. Must-do is a good fucking master. Your rapidograph pens are fucking dried up, the x-acto blades in your bag are rusty, and your mind is dull. Stop clicking your mouse, get messy, go back to the basics and make something fucking original. Form follows fucking function.

You won’t get good at anything by doing it a lot fucking aimlessly. While having drinks with Tibor Kalman one night, he told me, “When you make something no one hates, no one fucking loves it.” A good fucking composition is the result of a hierarchy consisting of clearly contrasting elements set with distinct alignments containing irregular intervals of negative space. Design as if your fucking life depended on it. Your rapidograph pens are fucking dried up, the x-acto blades in your bag are rusty, and your mind is dull. Stop clicking your mouse, get messy, go back to the basics and make something fucking original. When you sit down to work, external critics aren’t the enemy. It’s you who you must to fight against to do great fucking work. You must overcome yourself. Dedicate yourself to lifelong fucking learning. Don’t worry about what other people fucking think.

Sometimes it is appropriate to place various typographic elements on the outside of the fucking left margin of text to maintain a strong vertical axis. This practice is referred to as exdenting and is most often used with bullets and quotations. Learn from fucking criticism. Intuition is fucking important. If you’re not being fucking honest with yourself how could you ever hope to communicate something meaningful to someone else? Widows and orphans are terrible fucking tragedies, both in real life and definitely in typography. Don’t worry about what other people fucking think. What’s important is the fucking drive to see a project through no matter what.

Paul Rand once said, “The public is more familiar with bad fucking design than good design. It is, in effect, conditioned to prefer bad design, because that is what it lives with. The new becomes threatening, the old reassuring.” Dedicate yourself to lifelong fucking learning. The details are not the details. They make the fucking design. Intuition is fucking important. Can we all just agree as the greater design community to stop fucking talking about Comic Sans altogether? It’s getting fucking old. When you sit down to work, external critics aren’t the enemy. It’s you who you must to fight against to do great fucking work. You must overcome yourself.
"""
            ]
        ]
