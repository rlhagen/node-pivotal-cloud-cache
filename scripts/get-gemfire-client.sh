export GFCPP=$PWD/lib/pivotal-gemfire-native
export LD_LIBRARY_PATH=$GFCPP/lib:$PWD/lib:$LD_LIBRARY_PATH
export LIBRARY_PATH=$GFCPP/lib:$PWD/lib:$LIBRARY_PATH
export CPATH=$GFCPP/include/

# Necessary for binary buildpack
export NODE_PATH=./node_modules
export NODE_HOME=./bin/node-v0.10.48-linux-x64

$NODE_HOME/bin/npm install --build-from-source=gemfire https://github.com/charliemblack/node-gemfire.git
