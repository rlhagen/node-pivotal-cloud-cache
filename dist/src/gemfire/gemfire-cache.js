"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _gemfire = require("gemfire");

var _gemfire2 = _interopRequireDefault(_gemfire);

var _gemfireConfig = require("./gemfire-config");

var _gemfireConfig2 = _interopRequireDefault(_gemfireConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Cache abstraction that uses Gemfire.

// I put the properties in here as an example of using GemFire properties file.
// The items in the property file can be overwritten or plainly set using the CacheFactory.set() function.

var propertiesFile = __dirname + '/../../config/gemfire.properties';


var GemfireCache = {
    name: function name() {
        return "gemfire";
    },
    cache: null,
    region: null,

    init: function init() {
        console.log('[GemfireClient.js]: initializing...');
        var cacheFactory = _gemfire2.default.createCacheFactory(propertiesFile);
        console.log('created cacheFactory...');

        var credentials = JSON.parse(process.env.VCAP_SERVICES)["p-cloudcache"][0].credentials;

        // Get the user name and password from vcap services
        for (var item in credentials.users) {
            var currUser = credentials.users[item];
            if (currUser.roles.indexOf("developer") > -1) {
                cacheFactory.set("security-username", currUser.username);
                cacheFactory.set("security-password", currUser.password);
            }
        }

        // Get the locators from the vcap services
        for (var _item in credentials.locators) {
            var locator = credentials.locators[_item];
            var host = locator.slice(0, locator.indexOf("["));
            var port = locator.slice(locator.indexOf("[") + 1, locator.indexOf("]"));
            console.log('adding ' + host + ':' + port + ' ...');
            cacheFactory.addLocator(host, parseInt(port));
        }

        console.log('creating region...');
        this.cache = cacheFactory.create();
        this.region = this.cache.createRegion(_gemfireConfig2.default.region, { type: _gemfireConfig2.default.type });
        console.log('done...');
    },
    put: function put(key, value) {
        console.log("Adding key=" + key + " to the gemfireCache");
        this.region.putSync(key, value);
    },
    get: function get(key) {
        console.log("Getting key=" + key + " from the gemfireCache");
        var value = this.region.getSync(key);
        console.log("The value in the gemfireCache was " + JSON.stringify(value));
        return value;
    }
};

exports.default = GemfireCache;