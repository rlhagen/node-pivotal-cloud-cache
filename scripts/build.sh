#!/usr/bin/env bash

cp package.json dist/
cp package-lock.json dist/
cp manifest.yml dist/

cp -R static/ dist/static/
cp -R scripts/ dist/scripts/
cp -R config/ dist/config/
cp -R lib/ dist/lib/
