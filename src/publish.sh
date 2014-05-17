#!/bin/bash

# Create _publish directory if it doesn't exits
mkdir -p _publish
cd _publish

# Clone the giuthub page repo or pull the latest version
if [ ! -d "maseek.github.io" ]; then
    git clone https://github.com/maseek/maseek.github.io.git
else
    git pull origin master
fi

cd maseek.github.io

# Prepend the file names you want to keep in here with dot
mv CNAME .CNAME
mv README.md .README.md

# Clean up
rm -rf *

# Undo the name changes
mv .CNAME CNAME
mv .README.md README.md

# Hakyll by default generates site into _site directory
cp -rf ../../_site/* .

# Add all files to git
git add -A

echo -n "enter commit message: "
read msg
git commit -m "$msg"

# If you are using cygwin, git push command will get stuck, so use the following command first to cofigure git to ask for password in a popup window
# git config --global core.askpass "git-gui--askpass"

git push origin master

# Publish the source code too
cd ../..
git add -A
git commit -m "$msg"
git push origin master
