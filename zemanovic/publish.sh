#!/bin/bash
mkdir -p _publish
cd _publish
if [ ! -d "maseek.github.io" ]; then
    echo "cloning"
    git clone https://github.com/maseek/maseek.github.io.git
fi
cd maseek.github.io
echo "copying data"
rm -rf *
cp -rf ../../_site/* .
git add --all .
git add -u :/
echo "commiting"
git commit -m "publishing"
echo "pushing"
# use this first if on cygwin
# git config --global core.askpass "git-gui--askpass"
git push origin master
