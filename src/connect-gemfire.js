const propertiesFile = __dirname + '/../config/gemfire.properties';
import gemfire from "gemfire";
import util from 'util';

let cache = null;

let noop = function () {
};

/**
 * This can only be called once per application instance
 * @param options
 */
function connect(options) {
    let cacheFactory = gemfire.createCacheFactory(propertiesFile);

    // Get the user name and password from vcap services if not provided
    let credentials = options.credentials ? options.credentials :
        JSON.parse(process.env.VCAP_SERVICES)["p-cloudcache"][0].credentials;

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
        console.log('[GemfireStore]: adding ' + host + ':' + port + ' ...');
        cacheFactory.addLocator(host, parseInt(port));
    }

    cache = cacheFactory.create();
}

function isConnected() {
    return cache !== null;
}

/**
 * Refer to https://www.npmjs.com/package/express-session#session-store-implementation
 * This class implements the express-session Store interface.
 * get, set, and destroy are required.
 */
export default class GemfireStore {

    constructor(session, options) {
        console.log('[GemfireStore]: initializing...');
        this.serializer = options.serializer || JSON;

        if (!isConnected()) {
            connect(options);
        }

        this.region = cache.createRegion(options.region, {type: options.type});

        if (session !== null) {
            let Store = session.Store;
            Store.call(this, options);
            util.inherits(GemfireStore, Store);
        }

        console.log('[GemfireStore]: done...');
    }

    /**
     * Attempt to fetch session by the given `sid`.
     *
     * @param {String} sid
     * @param {Function} fn
     * @api public
     */

    get(sid, fn) {
        let store = this;
        if (!fn) fn = noop;

        console.log("[GemfireStore]: getting key = " + sid);
        let data = this.region.getSync(sid);
        if (!data) return fn();

        console.log("[GemfireStore]: retrieved value =  " + JSON.stringify(data));
        data = data.toString();

        let result = null;
        try {
            result = store.serializer.parse(data);
        } catch (er) {
            return fn(er);
        }
        return fn(null, result);
    }

    /**
     * Commit the given `sess` object associated with the given `sid`.
     *
     * @param {String} sid
     * @param {Session} sess
     * @param {Function} fn
     * @api public
     */

    set(sid, sess, fn) {
        let store = this;
        if (!fn) fn = noop;

        try {
            let jsess = store.serializer.stringify(sess);
            console.log("[GemfireStore]: adding (" + sid + ", " + JSON.stringify(sess) + ")");
            this.region.putSync(sid, jsess);
            console.log("[GemfireStore]: adding successful...");
            return fn(null);
        } catch (er) {
            console.log("[GemfireStore]: ERROR ", er);
            return fn(er);
        }
    }

    /**
     * Destroy the session associated with the given `sid`.
     *
     * @param {String} sid
     * @api public
     */

    destroy(sid, fn) {
        if (!fn) fn = noop;
        console.log("[GemfireStore]: deleting key=" + sid);
        this.region.remove(sid, function (error) {
            if (error) {
                fn(error);
            } else {
                console.log("[GemfireStore]: removed entry successful...");
            }
        });
        return fn(null);
    }
}
