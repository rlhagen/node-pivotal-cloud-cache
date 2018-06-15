// nodefire test app.  Creates web session and the end points
// calling the appropriate functions in the cache lib.

var myCache = require('./cache.js');
//var http    = require('http');
var express = require('express');
var app = express();

app.get("/api/greeting/:id", (req, res) => {

    var greeting = myCache.getFromCache(req.params.id);

    //Cache hit, return
    if(typeof greeting != "undefined") {
        console.log('Found the object, returning it.')
        res.json({
            id: req.params.id,
            hello: greeting,
            source: 'cache'
        });
    }
    else { //Cache miss, store in cache
        console.log('Cache miss')
        if(typeof req.query.message != "undefined") {
            console.log("Adding message to cache")
            myCache.addToCache(req.params.id, req.query.message);
            res.json({
                id: req.params.id,
                hello: req.query.message,
                source: 'new'
            });
        }
        else {
            console.log('No message to add to cache.')
        }
    }
});

app.get(['/','/api/greeting/'], (req, res) => {
    var options = { root: __dirname + '/static/' };
    res.sendFile('readme.html', options);
});

app.get('/api/init-cache/', (req, res) => {
    myCache.initCache();
});

app.get('/env', (req, res) => {
    res.json(process.env);
});

app.set("port", process.env.PORT || 8080);
app.listen(app.get("port"), () => {
    console.log(`Hello from NodeFire test app.`);
});
