tzemanovic.github.io
=============

Source code for [tzemanovic.github.io](http://tzemanovic.github.io).

This page is built with [Hakyll](http://jaspervdj.be/hakyll/) and Bootstrap.

## Build Bootstrap

```
cd bootstrap-less
npm install -g grunt-cli
npm install
grunt
```

## Hakyll

```
cd src
```

### Build

```
stack install
stack build
stack exec site build
```

### Develop
```
./devel.sh
```

### Publish

```
./publish.sh
```
