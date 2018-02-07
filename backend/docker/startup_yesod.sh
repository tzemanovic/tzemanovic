#!/bin/bash

set -e

# sleep infinity

# build libraries
# stack build

# build app
yesod keter

# deploy
rm -r deploy
mkdir -p deploy/dist
cp -r dist/bin deploy/dist/
cp -r config deploy/
cd deploy/
tar -cvzf tzemanovic.keter *
scp tzemanovic.keter tzemanovic:/opt/keter/incoming
