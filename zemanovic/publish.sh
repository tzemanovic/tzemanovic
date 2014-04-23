#!/bin/bash
mkdir -p _publish
cd _publish
echo "cloning"
git clone https://github.com/maseek/maseek.github.io.git
cd maseek.github.io
echo "copying data"
rm -rf *
cp -rf ../../_site/* .
git add -all .
git add -u :/
echo "commiting"
git commit -m "publishing"
echo "pushing"
git push origin master
