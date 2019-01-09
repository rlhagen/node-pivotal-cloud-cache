"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var cache = null;

var CacheManager = {
    init: function init() {
        console.log("[CacheManager]: initializing...");
        if (process.env.CACHE === "pcc") {
            cache = require('./gemfire/GemfireCache.js');
            // cache.init();
        } else {
            cache = require('./local-cache.js').default;
            // cache.init();
        }
    },
    getCache: function getCache() {
        return cache;
    }
};

exports.default = CacheManager;