#!/bin/bash

set -e

# sleep infinity

echo -e "\nBuild"
yesod keter

echo -e "\nBundle"
mkdir -p deploy/dist
cp -r dist/bin deploy/dist/
cp -r config deploy/
cp -r static deploy/
cd deploy
tar -cvzf tzemanovic.keter --exclude=./tzemanovic.keter .

echo -e "\nDeploy"
yes | scp tzemanovic.keter tzemanovic:/opt/keter/incoming

echo -e "\nClean-up"
cd ..
rm -r deploy
