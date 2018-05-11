export GFCPP=$PWD/lib/pivotal-gemfire-native
export LD_LIBRARY_PATH=$GFCPP/lib:$PWD/lib:$LD_LIBRARY_PATH
export LIBRARY_PATH=$GFCPP/lib:$PWD/lib:$LIBRARY_PATH
export CPATH=$GFCPP/include/

# Necessary for binary buildpack
export NODE_PATH=./node_modules
export NODE_HOME=./bin/node-v0.10.48-linux-x64

echo 'Starting the App'

# Extract the node_modules directory (cf won't push due to symlinks, so it's zipped)
if [ -d node_modules ]; then
  echo "node_modules directory exists.  Doing nothing."
elif [ -e node_modules.tgz ]; then
  echo "Didn't find node_modules directory or node_modules.tgz!!!  This is probably going to fail."
else
  echo "Extracting node_modules"
  tar xfz ./node_modules.tgz
fi


# Add the symlink back to node.js (probaby not necessary)
if [ ! -h $NODE_HOME/bin/npm ]; then
  echo 'Creating the symlink to npm'
  cd $NODE_HOME/bin/
  ln -s ../lib/node_modules/npm/bin/npm-cli.js npm
  cd -
fi


if [ "$1" = "test" ]; then
  $NODE_HOME/bin/node src/test.js
else
  $NODE_HOME/bin/node src/gf-node-test.js
fi
