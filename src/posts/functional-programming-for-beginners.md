---
title: Functional programming for beginners
tags: elm, front-end, programming languages, ML, learning, teaching, haskell
published: 2018-03-19
---

Recently, I attended <a href="http://justtesting.org" target="_blank">Manuel Chakravarty</a>'s YOW! night talk titled Demystifying Functional Programming, which inspired me to write this post. 

From my work, I gained some intuition that trying to teach <abbr data-toggle="tooltip" title="functional programming">FP</abbr> by explaining the theory first didn't work well. In hindsight, this seems almost obvious. A lot of us were taught math this way and sadly it has left many of us misunderstanding math or even despising it, even though it might be very useful in their chosen field[^1].

[^1]: <a href="https://lamport.azurewebsites.net/tla/math-knowledge.html" target="_blank">Leslie Lamport: Why Don't Computer Scientists Learn Math?</a>

What worked better was to show how elegantly FP solves many problems we were focusing on; one that required a use of parsers or another for which we were using reactive programming to process and analyse large quantities of data in real-time. These were some of the concepts I've learned in Haskell and was able to apply in Scala. They were harder to implement in the imperative way, which only complected them and that also made them harder to understand.

My intuition really aligned with the content of Manuel's talk. With his long-time experience and commitment to working with and teaching Haskell, Manuel discussed what we can do to advance FP from the stage of innovators and early adopters to early majority[^2], which he summarised as:

[^2]: <a href="https://en.wikipedia.org/wiki/Diffusion_of_innovations" target="_blank">Wikipedia: Diffusion of innovations</a>

* Examples first
* Teach design patterns
* Tight feedback loop
* Visualisation can be an effective tool

Another seasoned Haskeller Gabriel Gonzalez has written some great advice for Haskell beginners[^3], in which he recommends to:

[^3]: <a href="http://www.haskellforall.com/2017/10/advice-for-haskell-beginners.html" target="_blank">Gabriel Gonzalez: Advice for Haskell beginners</a>

* Avoid big-design-up-front
* Start programming at term-level (using simple values and functions)
* Build something useful

If you gave Haskell a try, but still find it too intimidating, I would recommend you having a look at Elm. Elm (which itself is written in Haskell) is a very small language in terms of the size of its grammar, which makes it a perfect fit for beginners. Not only is it very good at all the points above, it can also compete with other front-end frameworks like React. The whole notion of languages being general-purpose can be quite misleading[^4] and Elm is intentionally not a general-purpose language[^5] and it serves its intended purpose very well. You don't have to take my word for it though, instead, you can watch a <a href="https://youtu.be/EStQa0QsUb8" target="_blank">talk by Richard Feldman</a>, who's been using both React and Elm side-by-side in production for over a year. 

[^4]: <a href="http://worrydream.com/ClimateChange/#tools-modeling" target="_blank">Bret Victor: What can a technologist do about climate change? A personal view.</a>
[^5]: <a href="https://github.com/elm-lang/projects/blob/master/notes/on-general-purpose.md" target="_blank">Evan Czaplicki: On “General-Purpose” Languages</a>

Cool, you got me, but...

## Where do you start?

<div class="figure">
  <img src="../../images/elm-grove.jpg" alt="Welcome to Elm" style="width: 100%">
</div>

Of course, not everyone learns the same way. As a general recommendation I would say:

Try not to learn too many things at once, keep things simple. This is especially important if you come to FP **with prior experience** from imperative languages, which doesn't translate well into FP concepts. You might have heard functional programmers say that when you start, you will have to unlearn things, and this is what they're referring to. Honestly, you will need patience, because everything might seem slow at first. That's okay, don't give up and keep at it!

Try to find someone who already has experience with FP and ask them for help with writing something simple. When you see FP applied to solving a real problem, you are very likely to learn faster. There are people who say they were able to pick up Elm this way within a week, but don't set your expectations too high. Once again, everyone's learning path is different. Look for FP <a href="https://www.meetup.com/" target="_target">meetups</a> in your area, join <a href="https://elmlang.herokuapp.com/" target="_blank">Elm on Slack</a>, read the comprehensive <a href="https://guide.elm-lang.org/" target="_blank">Elm Guide</a>. Don't start trying to write a full-blown single page app, there are ways to <a href="http://elm-lang.org/blog/how-to-use-elm-at-work" target="_blank">gradually introduce Elm at work today</a>. Or you can just play around <a href="http://ellie-app.com/" target="_blank">directly from your browser</a>, you don't even have to install anything.

Lastly, don't be afraid to make mistakes, for it's an important part of any learning process.
