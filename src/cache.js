// Cache abstraction that uses Gemfire.

// I put the properties in here as an example of using GemFire properties file.
// The items in the property file can be overwritten or plainly set using the CacheFactory.set() function.

const propertiesFile = __dirname +'/../config/gemfire.properties';

var gemfire = require('gemfire');
var cache = null;
var region;

exports.initCache = function() {
    if(cache === null){
        var cacheFactory = gemfire.createCacheFactory(propertiesFile);

        var credentials = JSON.parse(process.env.VCAP_SERVICES)["p-cloudcache"][0].credentials;

        // Get the user name and password from vcap services
        for (var item in credentials.users) {
            var currUser = credentials.users[item];
            if((currUser.roles.indexOf("developer") > -1)){
                cacheFactory.set("security-username", currUser.username);
                cacheFactory.set("security-password", currUser.password);
            }
        }

        // Get the locators from the vcap services
        for (var item  in credentials.locators) {
            var locator = credentials.locators[item];
            var host = locator.slice(0, locator.indexOf("["));
            var port = locator.slice(locator.indexOf("[") + 1, locator.indexOf("]"));
            cacheFactory.addLocator(host, parseInt(port));
        }
       cache = cacheFactory.create();
       region = cache.createRegion("nodefire", {type: "CACHING_PROXY"});
    }
}

exports.addToCache = function(theKey, theValue) {
    console.log("Adding key="+theKey+" to the cache");
    region.putSync(theKey, theValue);
}

exports.getFromCache = function(theKey) {
    console.log("Getting key="+theKey+" from the cache");
    var value = region.getSync(theKey);
    console.log("The value in the cache was " + value);
    return value;
}

exports.initCache();