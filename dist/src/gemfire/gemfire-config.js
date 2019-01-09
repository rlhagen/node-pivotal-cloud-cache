"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var GemfireConfig = {
    region: process.env.REGION || "default",
    type: process.env.TYPE || "PROXY"
};

exports.default = GemfireConfig;