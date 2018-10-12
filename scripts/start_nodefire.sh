export GFCPP=/home/vcap/app/lib/pivotal-gemfire-native
export LD_LIBRARY_PATH=$GFCPP/lib:/home/vcap/app/lib:$LD_LIBRARY_PATH
export LIBRARY_PATH=$GFCPP/lib:/home/vcap/app/lib:$LIBRARY_PATH
export CPATH=$GFCPP/include/:$CPATH


pushd /home/vcap/app
node  src/nodefire-server.js
popd
