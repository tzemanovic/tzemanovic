#!/bin/bash

cd ./bootstrap-less && grunt watch &
cd ../src && stack exec site watch
