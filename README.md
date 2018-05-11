## Gemfire Node.js Sample

## How to play around with the NodeJS GemFire driver.

Download the GemFire native Driver from : https://drive.google.com/open?id=1IbTqyf4qUBqWA4Af8dE1UfN08NDTrI9Y

Uncompress it somewhere - I tar zxvf the file into ~/dev/  which created ~/dev/pivotal-gemfire-native

```
sudo apt install git
sudo apt install python2.7 python-pip
wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
nvm install 0.10.48
export LD_LIBRARY_PATH=~/dev/pivotal-gemfire-native/lib/
export CPATH=~/dev/pivotal-gemfire-native/include/
export LIBRARY_PATH=~/dev/pivotal-gemfire-native/lib
npm install --build-from-source=gemfire https://github.com/charliemblack/node-gemfire.git
demo@demo-kafka:~$ cat test.js 
const gemfire = require('gemfire');
gemfire.configure('example.xml');
var region = gemfire.getCache().getRegion('test');
region.put("foo", "bar");
region.get("foo", function(error, result) {
 console.log(result);
});
demo@demo-kafka:~$ cat example.xml 
<?xml version="1.0" encoding="UTF-8"?>
<client-cache
    xmlns="http://geode.apache.org/schema/cache"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://geode.apache.org/schema/cache http://geode.apache.org/schema/cache/cache-1.0.xsd"
    version="1.0">
    
  <pool name="myPool" subscription-enabled="true">
    <locator host="localhost" port="10334" />
  </pool>
  <pdx read-serialized="true" />
  <region name="test" refid="CACHING_PROXY">
    <region-attributes pool-name="myPool"/>
  </region>
</client-cache>
```

```
demo@demo-kafka:~$ node test.js 
[config 2018/05/04 21:43:57.179290 PDT demo-kafka:11045 139841047361344] Using Geode Native Client Product Directory: /home/demo/dev/pivotal-gemfire-native
[config 2018/05/04 21:43:57.179381 PDT demo-kafka:11045 139841047361344] Product version: Pivotal Gemfire Native 9.2.0-build.10 (64bit) Wed, 24 Jan 2018 10:53:51 -0800
[config 2018/05/04 21:43:57.179391 PDT demo-kafka:11045 139841047361344] Source revision: c6fee485fd81691d4e2991a6d857cb9c5cd823e6
[config 2018/05/04 21:43:57.179395 PDT demo-kafka:11045 139841047361344] Source repository: 
[config 2018/05/04 21:43:57.179400 PDT demo-kafka:11045 139841047361344] Running on: SystemName=Linux Machine=x86_64 Host=demo-kafka Release=4.13.0-39-generic Version=#44-Ubuntu SMP Thu Apr 5 14:25:01 UTC 2018
[config 2018/05/04 21:43:57.179406 PDT demo-kafka:11045 139841047361344] Current directory: /home/demo
[config 2018/05/04 21:43:57.179410 PDT demo-kafka:11045 139841047361344] Current value of PATH: /home/demo/.nvm/v0.10.48/bin:/home/demo/dev/pivotal-gemfire-9.4.0/bin:/home/demo/jdk1.8.0_161/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin
[config 2018/05/04 21:43:57.179414 PDT demo-kafka:11045 139841047361344] Current library path: /home/demo/dev/pivotal-gemfire-native/lib/
[config 2018/05/04 21:43:57.179426 PDT demo-kafka:11045 139841047361344] Geode Native Client System Properties:
  appdomain-enabled = false
  archive-disk-space-limit = 0
  archive-file-size-limit = 0
  auto-ready-for-events = true
  bucket-wait-timeout = 0
  cache-xml-file = example.xml
  conflate-events = server
  connect-timeout = 59
  connection-pool-size = 5
  connect-wait-timeout = 0
  crash-dump-enabled = true
  disable-chunk-handler-thread = false
  disable-shuffling-of-endpoints = false
  durable-client-id = 
  durable-timeout = 300
  enable-time-statistics = false
  grid-client = false
  heap-lru-delta = 10
  heap-lru-limit = 0
  log-disk-space-limit = 0
  log-file = 
  log-file-size-limit = 0
  log-level = config
  max-fe-threads = 8
  max-socket-buffer-size = 66560
  notify-ack-interval = 1
  notify-dupcheck-life = 300
  on-client-disconnect-clear-pdxType-Ids = false
  ping-interval = 10
  read-timeout-unit-in-millis = false
  redundancy-monitor-interval = 10
  security-client-auth-factory = 
  security-client-auth-library = 
  security-client-dhalgo = 
  security-client-kspath = 
  ssl-enabled = false
  ssl-keystore = 
  ssl-truststore = 
  stacktrace-enabled = false
  statistic-archive-file = statArchive.gfs
  statistic-sampling-enabled = true
  statistic-sample-rate = 1
  suspended-tx-timeout = 30
  tombstone-timeout = 480000
[config 2018/05/04 21:43:57.231001 PDT demo-kafka:11045 139841047361344] Starting the Geode Native Client
[info 2018/05/04 21:43:57.231186 PDT demo-kafka:11045 139841047361344] Using GFNative_LIfelxWRqA11045 as random data for ClientProxyMembershipID
[info 2018/05/04 21:43:57.231895 PDT demo-kafka:11045 139841047361344] Xml file parsed successfully
[info 2018/05/04 21:43:57.233221 PDT demo-kafka:11045 139841047361344] Using socket send buffer size of 64240.
[info 2018/05/04 21:43:57.233297 PDT demo-kafka:11045 139841047361344] Using socket receive buffer size of 64240.
[info 2018/05/04 21:43:57.233541 PDT demo-kafka:11045 139840754534144] ClientMetadataService started for pool myPool
[info 2018/05/04 21:43:57.245855 PDT demo-kafka:11045 139841047361344] Creating region test with subscriptions enabled
[info 2018/05/04 21:43:57.246202 PDT demo-kafka:11045 139841047361344] Declarative configuration of cache completed successfully
[info 2018/05/04 21:43:57.256209 PDT demo-kafka:11045 139840754534144] Updated client meta data
bar
[info 2018/05/04 21:43:57.259611 PDT demo-kafka:11045 139840754534144] Updated client meta data
[info 2018/05/04 21:43:58.251255 PDT demo-kafka:11045 139840754534144] ClientMetadataService stopped for pool myPool
[config 2018/05/04 21:43:58.389301 PDT demo-kafka:11045 139841047361344] Stopped the Geode Native Client
```
