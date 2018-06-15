export GFCPP=$PWD/lib/pivotal-gemfire-native
export LD_LIBRARY_PATH=$GFCPP/lib:$PWD/lib:$LD_LIBRARY_PATH
export LIBRARY_PATH=$GFCPP/lib:$PWD/lib:$LIBRARY_PATH
#export CPATH=$GFCPP/include/

#export GFCPP=$PWD/lib/NativeClient_Linux_64bit_8260_b3910
#export GFCPP=$PWD/lib/gfe-native-client-9.2.x
#export PATH=$GFCPP/bin:$PATH
#export LD_LIBRARY_PATH=$GFCPP/lib

tar xvfz gemfire.tgz

node src/nodefire-server.js
