// nodefire test app.  Creates web session and the end points
// calling the appropriate functions in the cache lib.

var myCache = require('./cache.js');
var express = require('express');
var app = express();

app.get("/api/greeting/:id", (req, res) => {

    if(typeof req.query.message != "undefined") {
      console.log("Adding value to GemFire")
      myCache.addToCache(req.params.id, req.query.message);
        res.json({
            key: req.params.id,
            value: req.query.message,
            source: 'GemFire put()'
        });
    }else{
       var greeting = myCache.getFromCache(req.params.id);
       if(typeof greeting != "undefined") {
         // we found something
         console.log('Found the object, returning it.')
         res.json({
             key: req.params.id,
             value: greeting,
             source: 'GemFire get()'
         });
       }else{
          console.log("Nothing in GemFire for key " + req.params.id);
          res.json({
              key: req.params.id,
              value: greeting,
              source: 'Not in GemFire'
          });
       }
    }
});

app.get(['/','/api/greeting/'], (req, res) => {
    var options = { root: __dirname + '/../static/' };
    res.sendFile('readme.html', options);
});

app.get('/api/init-cache/', (req, res) => {
    myCache.initCache();
    res.json({
        initialized: true
    });
});

app.get('/env', (req, res) => {
    res.json(process.env);
});

app.set("port", process.env.PORT || 8080);
app.listen(app.get("port"), () => {
    console.log(`Hello from NodeFire test app.`);
});
