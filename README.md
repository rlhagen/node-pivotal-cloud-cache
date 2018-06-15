# Node to GemfireFire Sample App

It's a "Greeting" app.  Store a greeting with an id, get a greeting by id.

## Dependencies

The app doesn't need to be compiled, but it is dependant on the gemfire native client and the node-gemfire bridge module.

### Native Client

- Download the native client from PivNet.
- Create a lib directory
- Extract the client into it

Tested with client v9.2

### Node to Gem Bridge

- The bridge code can be downloaded from:  https://github.com/charliemblack/node-gemfire
- Build it with npm
- Rename the directory gemfire
- tar the directory (tar cvfz node-gemfire gemfire.tgz)
- copy it to the root of the project

(look at scripts/start_nodefire.sh to see how it's extracted into node_modules)

NOTE: This is a heavy weight way to deploy the bridge.  Once the full sub-set of files that are required have been identified we'll be able to deploy them only.

### StdLib

Either the native library or the bridge has a dependency on libstdc++.so.6.  Maybe this could be statically compiled, but I copied a version into the lib directory to get the code going.  My lib dir looks like below:

```
$ ls lib/
libstdc++.so.6  pivotal-gemfire-native
```

## Usage

The root (home page) has links to push/get a sample value.

Initialize by hitting /api/init-cache

The main endpoint is at /api/greeting

- Get a greeting: http://<server>/api/greeting/{id}
- Add a greeting: http://<server>/api/greeting/{id}?message={message}
