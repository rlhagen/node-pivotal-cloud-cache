
let cache = null;

const CacheManager = {
    init(){
        console.log("[CacheManager]: initializing...")
        if (process.env.CACHE === "pcc") {
            cache = require('./gemfire/gemfire-client.js').default;
            cache.init();
        } else {
            cache = require('./local-cache.js').default;
            cache.init();
        }
    },
    getCache(){
        return cache;
    }
};

export default CacheManager