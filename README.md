# A Node GemFire Sample Application for PCF

It's a "Greeting" app.  Store a greeting with an id, get a greeting by id.  

Since the application is deployed to PCF there are some dependent libraries that need to be installed.   To simplify the creation lets host the needed libraries in the ``lib`` directory.   If we do this at this point when we ``cf push`` the application all of the required libraries will be in the droplet.

## Library - GemFire Native Client

The GemFire Node driver uses the GemFire native library to provide connectivity to GemFire.

Download the native client from https://network.pivotal.io/ and extract into the ``lib`` directory.

Tested with client v9.2.1

## Library - Security

PCF uses GemFire security to authenticate it applications.   Since GemFire uses a pluggable security model we need to have a implementation to plug-in.   An implementation can be found on github:

* https://github.com/charliemblack/geode-cpp-user-password-auth

Just copy the released library to ``lib`` directory.

## Library - StdLib

This application has a dependency on ``libstdc++.so.6`` and it doesn't appear to be avaible on any of the PCF instances I tried.   So I copied a version into the lib directory to get the code going.  

## Final lib Directory

A working lib dir looks like below:
```
$ ls
libgeode_user_password_auth.so  libstdc++.so.6  pivotal-gemfire-nativ
```

# Usage

The root (home page) has links to push/get a sample value.

Initialize by hitting /api/init-cache

The main endpoint is at /api/greeting

- Get a greeting: http://server/api/greeting/{id}
- Add a greeting: http://server/api/greeting/{id}?message={message}


## Curl Example

```
curl -X GET  https://gemfire-node-sample.apps.pcfone.io/api/init-cache
curl -X GET 'https://gemfire-node-sample.apps.pcfone.io/api/greeting/foo?message=SomeMessage'  
curl -X GET 'https://gemfire-node-sample.apps.pcfone.io/api/greeting/foo'
```

# PCF Interesting Items

Since the node application needs additional libraries we need to alter the ``LD_LIBRARY_PATH``.    To do this we need to launch our node application from a script that will add the items to the path.  This is done by adding a ``command`` element to the cloud foundary ``manifest.yml``.  

The manifest can be viewed here : [manifest.yml](manifest.yml)

The script then will add the additional library locations to the ``LD_LIBRARY_PATH`` before launching the node application.

The application script can be viewed here: [start_app.sh](scripts/start_app.sh)


# Library Install Command History

Since it might not be 100% clear on how installed the dependent libraries I have shared my history from when I set it up.

1. cd lib
2. wget https://s3.amazonaws.com/gemfire-field/pivotal-gemfire-native-9.2.1-build.10-Linux-64bit.tar.gz
3. tar zxvf pivotal-gemfire-native-9.2.1-build.10-Linux-64bit.tar.gz
4. wget https://github.com/charliemblack/geode-cpp-user-password-auth/releases/download/v0.1-ubuntu/libgeode_user_password_auth.so
5. wget https://s3.amazonaws.com/gemfire-field/libstdc%2B%2B.so.6
6. rm pivotal-gemfire-native-9.2.1-build.10-Linux-64bit.tar.gz
