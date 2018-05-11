#export GFCPP=./lib/pivotal-gemfire-native
#export GFCPP=/home/pivotal/dev/node/node-gfe/lib/pivotal-gemfire-native
export GFCPP=/home/vcap/app/lib/pivotal-gemfire-native
export LD_LIBRARY_PATH=$GFCPP/lib
export LIBRARY_PATH=$GFCPP/lib
export CPATH=$GFCPP/include/

npm install --build-from-source=gemfire https://github.com/charliemblack/node-gemfire.git
