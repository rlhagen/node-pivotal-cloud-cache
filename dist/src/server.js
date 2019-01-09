'use strict';

var _cacheManager = require('./cache-manager');

var _cacheManager2 = _interopRequireDefault(_cacheManager);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)(); // nodefire test app.  Creates web session and the end points
// calling the appropriate functions in the cache lib.

app.set('trust proxy', 1); // trust first proxy
app.use((0, _expressSession2.default)({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));

app.get("/api/greeting/:id", function (req, res) {

    if (typeof req.query.message != "undefined") {
        //CacheManager.getCache().put(req.params.id, req.query.message);
        if (!req.session.messages) {
            req.session.messages = {};
        }
        req.session.messages[req.params.id] = req.query.message;
        res.json({
            key: req.params.id,
            value: req.query.message
            //source: CacheManager.getCache().name()
        });
    } else {
        //var greeting = CacheManager.getCache().get(req.params.id);
        var greeting = req.session.messages[req.params.id];
        if (typeof greeting != "undefined") {
            // we found something
            console.log('Found the object, returning it.');
            res.json({
                key: req.params.id,
                value: greeting
                //source: CacheManager.getCache().name()
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
    //CacheManager.init();
    res.json({
        initialized: true
    });
});

app.get('/env', function (req, res) {
    res.json(process.env);
});

app.set("port", process.env.PORT || 8080);
app.listen(app.get("port"), function () {
    //CacheManager.init();
    console.log('Hello from NodeFire test app.');
});