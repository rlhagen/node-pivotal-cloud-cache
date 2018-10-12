# Node to GemfireFire Sample App

It's a "Greeting" app.  Store a greeting with an id, get a greeting by id.

## Dependencies

This application uses the node GemFire driver that can been install through NPM.   If you would like to learn more about GemFire or the node library it can be found here:

* https://github.com/gemfire/node-gemfire
* http://gemfire.docs.pivotal.io

## How to install Node GemFire 
```
npm install gemfire
```

### Native Client
The GemFire Node driver uses the native library to provide connectivity to GemFire.

- Download the native client from PivNet.
- Create a lib directory
- Extract the client into it

Tested with client v9.2.1

## Security 
PCF uses security to authenticate it users.   For that we have used this project to provide credentials to the servers.

* https://github.com/charliemblack/geode-cpp-user-password-auth

The released library needs to be in lib directory.

## StdLib

Either the native library or the bridge has a dependency on libstdc++.so.6.  Maybe this could be statically compiled, but I copied a version into the lib directory to get the code going.  My lib dir looks like below:

```
$ ls 
libgeode_user_password_auth.so  libstdc++.so.6  pivotal-gemfire-nativ
```

## Usage

The root (home page) has links to push/get a sample value.

Initialize by hitting /api/init-cache

The main endpoint is at /api/greeting

- Get a greeting: http://<server>/api/greeting/{id}
- Add a greeting: http://<server>/api/greeting/{id}?message={message}

# History for installing C libraries so our PCF Node JS app can find them 
1. cd lib
2. wget https://s3.amazonaws.com/gemfire-field/pivotal-gemfire-native-9.2.1-build.10-Linux-64bit.tar.gz
3. tar zxvf pivotal-gemfire-native-9.2.1-build.10-Linux-64bit.tar.gz 
4. wget https://github.com/charliemblack/geode-cpp-user-password-auth/releases/download/v0.1-ubuntu/libgeode_user_password_auth.so
5. wget https://s3.amazonaws.com/gemfire-field/libstdc%2B%2B.so.6
6. rm pivotal-gemfire-native-9.2.1-build.10-Linux-64bit.tar.gz 

