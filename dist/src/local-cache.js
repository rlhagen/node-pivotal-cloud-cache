"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var LocalCache = {
    name: function name() {
        return "local";
    },
    cache: {},

    init: function init() {
        console.log("[LocalCache]: initializing...");
    },
    get: function get(key) {
        return LocalCache.cache[key];
    },
    put: function put(key, value) {
        LocalCache.cache[key] = value;
    }
};

exports.default = LocalCache;