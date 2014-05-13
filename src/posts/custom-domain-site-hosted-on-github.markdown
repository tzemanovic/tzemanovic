---
title: custom domain site hosted on github
tags: github, webhost, blog, hakyll, jakyll, free
published: 2014-05-10
---

This website is hosted on <a href="https://github.com/maseek/maseek-codes" target="_blank">github</a>. It's free, fast and reliable. You can only host static websites on github, but that's not an issue if you use static site generator like <a href="http://jekyllrb.com/" target="_blank">Jekyll</a>, or if you, like me, prefer using Haskell, there's Jekyll's good twin <a href="http://jaspervdj.be/hakyll/" target="_blank">Hakyll</a>.

To redirect your custom domain to the github page, you need to lookup the DNS for A Record IP, using either <code>dig</code> command or <a href="http://www.dnsqueries.com/en/dns_lookup.php" target="_blank">online DNS lookup tool</a>. Then use the IP address you found to create A Record for your domain. Consult the <a href="https://help.github.com/articles/setting-up-a-custom-domain-with-github-pages" target="_blank">github documentation</a> if you need more details.

To redirect the github page to your custom domain create a **CNAME** file in the github pages repo and put your domain name in it (e.g. <a href="http://maseek.codes">maseek.codes</a>)

It is handy to create a *one-click* publish shell script. Here is mine:

<pre><code class="bash">#!/bin/bash

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
git add --all .
git add -u :/

echo -n "enter commit message: "
read msg
git commit -m "$msg"

# If you are using cygwin, git push command will get stuck, so use the following command first to cofigure git to ask for password in a popup window
# git config --global core.askpass "git-gui--askpass"

git push origin master
</code></pre>
