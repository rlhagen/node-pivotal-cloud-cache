// Cache abstraction that uses Gemfire.

// I put the properties in here as an example of using GemFire properties file.
// The items in the property file can be overwritten or plainly set using the CacheFactory.set() function.

const propertiesFile = __dirname + '/../../config/gemfire.properties';
import gemfire from "gemfire";
import GemFireConfig from "./gemfire-config";

const GemfireCache = {
    name: () => {
        return "gemfire"
    },
    cache: null,
    region: null,

    init() {
        console.log('[GemfireCache.js]: initializing...');
        let cacheFactory = gemfire.createCacheFactory(propertiesFile);
        console.log('created cacheFactory...');

        let credentials = JSON.parse(process.env.VCAP_SERVICES)["p-cloudcache"][0].credentials;

        // Get the user name and password from vcap services
        for (let item in credentials.users) {
            let currUser = credentials.users[item];
            if ((currUser.roles.indexOf("developer") > -1)) {
                cacheFactory.set("security-username", currUser.username);
                cacheFactory.set("security-password", currUser.password);
            }
        }

        // Get the locators from the vcap services
        for (let item  in credentials.locators) {
            let locator = credentials.locators[item];
            let host = locator.slice(0, locator.indexOf("["));
            let port = locator.slice(locator.indexOf("[") + 1, locator.indexOf("]"));
            console.log('adding ' + host + ':' + port + ' ...');
            cacheFactory.addLocator(host, parseInt(port));
        }

        console.log('creating region...');
        this.cache = cacheFactory.create();
        this.region = this.cache.createRegion(GemFireConfig.region, {type: GemFireConfig.type});
        console.log('done...');
    },

    put(key, value) {
        console.log("Adding key=" + key + " to the gemfireCache");
        this.region.putSync(key, value);
    },

    get(key) {
        console.log("Getting key=" + key + " from the gemfireCache");
        let value = this.region.getSync(key);
        console.log("The value in the gemfireCache was " + JSON.stringify(value));
        return value;
    }
};

export default GemfireCache