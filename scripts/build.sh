#!/usr/bin/env bash

babel src --out-dir dist/src

cp package.json dist/
cp manifest.yml dist/

cp -R static/ dist/static/
cp -R scripts/ dist/scripts/
cp -R config/ dist/config/
cp -R lib/ dist/lib/
