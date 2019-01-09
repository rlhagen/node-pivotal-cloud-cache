'use strict';

var _cacheManager = require('./cache-manager');

var _cacheManager2 = _interopRequireDefault(_cacheManager);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// nodefire test app.  Creates web session and the end points
// calling the appropriate functions in the cache lib.

var app = (0, _express2.default)();

app.get("/api/greeting/:id", function (req, res) {

    if (typeof req.query.message != "undefined") {
        _cacheManager2.default.getCache().put(req.params.id, req.query.message);
        res.json({
            key: req.params.id,
            value: req.query.message,
            source: _cacheManager2.default.getCache().name()
        });
    } else {
        var greeting = _cacheManager2.default.getCache().get(req.params.id);
        if (typeof greeting != "undefined") {
            // we found something
            console.log('Found the object, returning it.');
            res.json({
                key: req.params.id,
                value: greeting,
                source: _cacheManager2.default.getCache().name()
            });
        } else {
            console.log("Nothing in cache for key " + req.params.id);
            res.json({
                key: req.params.id,
                value: greeting,
                source: 'Not in cache'
            });
        }
    }
});

app.get(['/', '/api/greeting/'], function (req, res) {
    var options = { root: __dirname + '/../static/' };
    res.sendFile('readme.html', options);
});

app.get('/api/init-cache/', function (req, res) {
    _cacheManager2.default.init();
    res.json({
        initialized: true
    });
});

app.get('/env', function (req, res) {
    res.json(process.env);
});

app.set("port", process.env.PORT || 8080);
app.listen(app.get("port"), function () {
    _cacheManager2.default.init();
    console.log('Hello from NodeFire test app.');
});