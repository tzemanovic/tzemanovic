**This repository has been moved** to [https://gitlab.com/tzemanovic/tzemanovic.gitlab.io](https://gitlab.com/tzemanovic/tzemanovic.gitlab.io).

tzemanovic.github.io
=============

Source code for [tzemanovic.github.io](http://tzemanovic.github.io).

This page is built with [Hakyll](http://jaspervdj.be/hakyll/) and Bootstrap.

## Build Hakyll

```
cd src
stack install
stack build
stack exec site build
```

## Build Bootstrap

```
cd src/bootstrap-less
npm install -g grunt-cli
npm install
grunt
```

## Develop (run watch on Hakyll and Bootstrap sources)
```
cd src
./devel.sh
```

## Publish

```
cd src
./publish.sh
```
