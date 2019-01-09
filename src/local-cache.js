const LocalCache = {
    name: () => {
        return "local"
    },
    cache: {},

    init() {
        console.log("[LocalCache]: initializing...");
    },

    get(key) {
        return LocalCache.cache[key];
    },

    put(key, value) {
        LocalCache.cache[key] = value;
    }
};

export default LocalCache