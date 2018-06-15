// Cache abstraction that uses Gemfire.

const configFile = './config/nodefire-config.xml';
const regionName = 'nodefire';

var gemfire = require('gemfire');
// var cache;
// var region;

var localCache = [];

exports.initCache = function() {
    console.log("Initializing cache");
    //setup the connection
    gemfire.configure(configFile);
    cache = gemfire.getCache();
    region = cache.getRegion(regionName);
}

exports.addToCache = function(theKey, theValue) {
    console.log("Adding key="+theKey+" to the cache");

    localCache[theKey] = theValue;
    // region.putSync(theKey, theValue);
}

exports.getFromCache = function(theKey) {
    console.log("Getting key="+theKey+" from the cache");

    return localCache[theKey];
    // return region.get(theKey);
}
