#!/usr/bin/env bash
export GFCPP=/home/vcap/app/lib/pivotal-gemfire-native
export LD_LIBRARY_PATH=${GFCPP}/lib:/home/vcap/app/lib:${LD_LIBRARY_PATH}


pushd /home/vcap/app
node  src/server.js
popd
