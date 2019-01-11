const propertiesFile = __dirname + '/../../config/gemfire.properties';
import gemfire from "gemfire";

export default class GemfireClient {

    constructor(options){
        console.log('[GemfireClient]: initializing...');
        let cacheFactory = gemfire.createCacheFactory(propertiesFile);
        console.log('[GemfireClient]: created cacheFactory...');

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
            console.log('[GemfireClient]: adding ' + host + ':' + port + ' ...');
            cacheFactory.addLocator(host, parseInt(port));
        }

        console.log('creating region...');
        this.cache = cacheFactory.create();
        this.region = this.cache.createRegion(options.region, {type: options.type});
        console.log('[GemfireClient]: done...');

    }

    put(key, value) {
        console.log("[GemfireClient]: adding (" + key + ", " + JSON.stringify(value) + ")");
        this.region.putSync(key, value);
        console.log("[GemfireClient]: adding successful...");
    }

    get(key) {
        console.log("[GemfireClient]: getting key = " + key);
        let value = this.region.getSync(key);
        console.log("[GemfireClient]: retrieved value =  " + JSON.stringify(value));
        return value;
    }

    delete(key){
        console.log("[GemfireClient]: deleting key=" + key);
        this.region.remove(key, function(error){
            if(error){
                console.log(error);
            }else{
                console.log("[GemfireClient]: removed entry successful...");
            }
        });
    }

}