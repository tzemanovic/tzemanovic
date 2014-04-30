#!/bin/bash
mkdir -p _publish
cd _publish
if [ ! -d "maseek.github.io" ]; then
    git clone https://github.com/maseek/maseek.github.io.git
else
	git pull origin master
fi
cd maseek.github.io
mv CNAME .CNAME
mv README.md .README.md
rm -rf *
mv .CNAME CNAME
mv .README.md README.md
cp -rf ../../_site/* .
git add --all .
git add -u :/
echo -n "enter commit message: "
read msg
git commit -m msg
# use this first if on cygwin
# git config --global core.askpass "git-gui--askpass"
git push origin master

cd ../..
git add --all .
git add -u :/
git commit -m msg
git push origin master
