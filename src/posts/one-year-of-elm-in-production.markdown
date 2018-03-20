---
title: One year of Elm in production
tags: elm, production, front-end, javascript, programming languages, ML
published: 2018-03-06
---

About a year ago, I started a new job at <a href="https://www.loop11.com" target="_blank_">Loop11</a>, where we build tools aimed at helping others provide a better user experience. As is common in the software industry, I inherited lots of poor vanilla JavaScript code. There were no tests, very little code structure or code re-use, mixed coding styles and as expected, a full menagerie of bugs, which frequently cropped up resulting in very poor user experience. With such a sorry state of things, it only made sense to try to take a wholly different approach - stop writing JavaScript and instead pick a higher level language that would make sure all the things are kept in check.

As a functional programming enthusiast, I've been a keen user of Elm for some time and although I conceptually liked it better before version 0.17 with its higher-level abstraction of rendering visual elements contained in <a href="http://package.elm-lang.org/packages/evancz/elm-graphics/1.0.1" target="_blank">elm-graphics library</a>, the inclusion of HTML library made it possible to integrate it into existing front-end ecosystem with much less friction to the point where it actually became one of the top choices.

If Elm code looks terrifyingly unfamiliar to you, fear not. It builds on top of very mature ML (Meta Language) family of programming languages. Elm itself is written in Haskell, which is as old as programming itself, but you can find a plethora of languages in this family: 

<table class="table">
<tbody>
<tr class="odd">
<td align="right"><a href="http://www.purescript.org/" target="_blank">PureScript</a></td>
<td>front-end language, more similar to Haskell</td>
</tr>
<tr class="even">
<td align="right"><a href="https://www.idris-lang.org/" target="_blank">Idris</a></td>
<td>general purpose language similar to Haskell, but with dependent types</td>
</tr>
<tr class="odd">
<td align="right"><a href="https://www.scala-lang.org/" target="_blank">Scala</a></td>
<td>fusion of FP with OOP for the JVM</td>
</tr>
<tr class="even">
<td align="right"><a href="http://www.frege-lang.org/" target="_blank">Frege</a></td>
<td>Haskell for the JVM</td>
</tr>
<tr class="odd">
<td align="right"><a href="https://eta-lang.org/" target="_blank">Eta</a></td>
<td>Haskell for the JVM</td>
</tr>
<tr class="even">
<td align="right"><a href="https://ocaml.org/" target="_blank">OCaml</a></td>
<td>FP with OOP</td>
</tr>
<tr class="odd">
<td align="right"><a href="http://fsharp.org/" target="_blank">F#</a></td>
<td>Microsoft’s FP with OOP</td>
</tr>
<tr class="even">
<td align="right"><a href="https://github.com/Morgan-Stanley/hobbes" target="_blank">Hobbes</a></td>
<td>custom language built for embedding in C++</td>
</tr>
<tr class="odd">
<td align="right"><a href="http://sml-family.org/" target="_blank">Standard ML</a></td>
<td>general purpose popular language for compilers</td>
</tr>
<tr class="even">
<td align="right"></td>
<td></td>
</tr>
</tbody>
</table>

As processors scaling predicted by Moore's law is close to reaching its hard physical limits (as Herb Sutter famously put it the free lunch is over[^1]), the software industry will have to reach to tools that are better suited for dealing with concurrency. And these tools are functional programming languages. The interesting thing is that even if your application has no need to deal with concurrency, it can still benefit from FP, its foundation in mathematical concepts scares a lot people off, but it is its strong point. If the word mathematical puts you off, know that you don't actually have to know about this to take advantage of it, just like you won't fly off a rollercoaster if you don't know its physics (anecdotally, it will probably be your last ride if the rollercoaster has been built with complete ignorance of physics). 

[^1]: <a href="http://www.gotw.ca/publications/concurrency-ddj.htm" target="_blank">Herb Sutter: The Free Lunch Is Over</a>

As most of software development education and training focuses on OOP, there are lots of developers who get the impression that thinking about things in terms of objects is somehow natural. But the limitation of this mindset becomes very apparent in a very popular OOP topic - Gang of Four's design patterns[^2]. It also becomes apparent when implementation becomes so complex that no one can or even wants to work with it anymore. But where does this complexity come from, is it intrinsic to the problem domain? Most programmers know that tight coupling between unrelated concepts creates problems, in the same spirit I would say that the interleaving of data with behavior inside classes can create more problems than it solves. The declarative nature of FP languages removes much of the incidental complexity, the elephant we're dragging around[^3], introduced by imperative programs because we don't need to think about execution to understand what is going on. In more conceptual words of professor Philip Wadler, some languages were discovered while others were invented[^4] and you can tell.

[^2]: <a href="https://youtu.be/oB8jN68KGcU" target="_blank">Ted Newark: Why Functional Programming Matters @ Devoxx Poland 2016</a>
[^3]: <a href="https://youtu.be/rI8tNMsozo0" target="_blank">Rich Hickey: Simplicity Matters keynote @ Rails Conf 2012 </a>
[^4]: <a href="https://youtu.be/IOiZatlZtGU" target="_blank">Philip Wadler: Propositions as Types @ Strange Loop 2015</a>
 
The nice thing about Elm is that the community that has formed around it is very inclusive and welcoming. The language itself is very beginner friendly, to the point where some mistake its simplicity for a toy language. Don't make the same mistake though, because Elm is up there with big names such as React, in fact, it is much more a complete solution than React. The simplicity of Elm is rooted in hard work that has been put into its design.

Once you familiarize yourself with it, the Elm compiler will be your best friend. Its error messages are so clear and helpful that they've influenced other languages, such as Rust. The language comes with a package manager <a href="https://github.com/elm-lang/elm-package" target="_blank">elm-package</a> and the libraries released in Elm automatically adhere to semantic versioning. You can even use it to <a href="https://github.com/elm-lang/elm-package#updating-dependencies" target="_blank">check what has changed between different versions of a given package</a>. For interactive coding, there is <a href="https://github.com/elm-lang/elm-repl" target="_blank">elm-repl</a> and <a href="https://github.com/elm-lang/elm-reactor" target="_blank">elm-reactor</a>. The performance of Elm generated code is great and when needed optimization is a simple function call away.
 
So far, Elm's simple yet powerful design has helped us to stay focused on our goal of building a great product and we expect that the payoff will be even greater in the long run. At the moment, we have about 16k Elm lines of code in production, steadily translating pleasant development experience into pleasant user experience and we have more on their way.
