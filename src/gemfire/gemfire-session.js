let util = require('util');
let noop = function(){};

/**
 * Return the `RedisStore` extending `express`'s session Store.
 *
 * @param {object} express session
 * @return {Function}
 * @api public
 */

module.exports = function (session) {

    /**
     * Express's session Store.
     */

    let Store = session.Store;

    /**
     * Initialize GemfireStore with the given `options`.
     *
     * @param {Object} options
     * @api public
     */

    function GemfireStore (options) {
        if (!(this instanceof GemfireStore)) {
            throw new TypeError('Cannot call GemfireStore constructor as a function');
        }

        options = options || {};
        Store.call(this, options);

        this.serializer = options.serializer || JSON;

        this.client = require('./gemfire-client').default;
        this.client.init();
    }

    /**
     * Inherit from `Store`.
     */

    util.inherits(GemfireStore, Store);

    /**
     * Attempt to fetch session by the given `sid`.
     *
     * @param {String} sid
     * @param {Function} fn
     * @api public
     */

    GemfireStore.prototype.get = function (sid, fn) {
        let store = this;
        if (!fn) fn = noop;

        let data = store.client.get(sid);
        if (!data) return fn();

        var result;
        data = data.toString();

        try {
            result = store.serializer.parse(data);
        } catch (er) {
            return fn(er);
        }
        return fn(null, result);
    };

    /**
     * Commit the given `sess` object associated with the given `sid`.
     *
     * @param {String} sid
     * @param {Session} sess
     * @param {Function} fn
     * @api public
     */

    GemfireStore.prototype.set = function (sid, sess, fn) {
        let store = this;
        if (!fn) fn = noop;

        try {
            let jsess = store.serializer.stringify(sess);
            store.client.put(sid, jsess);
        }
        catch (er) {
            return fn(er);
        }
    };

    /**
     * Destroy the session associated with the given `sid`.
     *
     * @param {String} sid
     * @api public
     */

    GemfireStore.prototype.destroy = function (sid, fn) {
        this.client.delete(sid);
    };

    return GemfireStore;
};
