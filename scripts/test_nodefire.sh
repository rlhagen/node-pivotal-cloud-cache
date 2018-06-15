export GFCPP=/home/pivotal/dev/nodefire/lib/pivotal-gemfire-native
#export PATH=$GFCPP/bin:$PATH
export LD_LIBRARY_PATH=$GFCPP/lib
#export LIBRARY_PATH=$GFCPP/lib
#export CPATH=$GFCPP/include/

#npm install --build-from-source=gemfire https://github.com/charliemblack/node-gemfire.git

node nodefire-test.js
#node test.js