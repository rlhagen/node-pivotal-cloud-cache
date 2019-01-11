import GemfireClient from './gemfire-client';
import util from 'util';
let noop = function(){};

export default class GemfireStore {

    constructor(session, options){
        let Store = session.Store;

        Store.call(this, options);

        this.serializer = options.serializer || JSON;
        this.client = new GemfireClient();

        util.inherits(GemfireStore, Store);
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

        let data = store.client.get(sid);
        if (!data) return fn();

        let result;
        data = data.toString();

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
            store.client.put(sid, jsess);
            return fn(null);
        }
        catch (er) {
            console.log("[GemfireSession]: ERROR ", error);
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
        let store = this;
        if (!fn) fn = noop;
        store.client.delete(sid);
        fn.apply(null, arguments);
    }
}
