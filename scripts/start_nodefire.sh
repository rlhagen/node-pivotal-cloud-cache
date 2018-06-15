export GFCPP=$PWD/lib/pivotal-gemfire-native
export LD_LIBRARY_PATH=$GFCPP/lib:$PWD/lib:$LD_LIBRARY_PATH
export LIBRARY_PATH=$GFCPP/lib:$PWD/lib:$LIBRARY_PATH
#export CPATH=$GFCPP/include/

cd node_modules
tar ../xfz gemfire.tgz
cd ..

node src/nodefire-server.js
