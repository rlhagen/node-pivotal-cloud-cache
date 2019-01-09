// nodefire test app.  Creates web session and the end points
// calling the appropriate functions in the cache lib.

import CacheManager from './cache-manager';
import express from 'express';

let app = express();

app.get("/api/greeting/:id", (req, res) => {

    if (typeof req.query.message != "undefined") {
        CacheManager.getCache().put(req.params.id, req.query.message);
        res.json({
            key: req.params.id,
            value: req.query.message,
            source: CacheManager.getCache().name()
        });
    } else {
        var greeting = CacheManager.getCache().get(req.params.id);
        if (typeof greeting != "undefined") {
            // we found something
            console.log('Found the object, returning it.')
            res.json({
                key: req.params.id,
                value: greeting,
                source: CacheManager.getCache().name()
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

app.get(['/', '/api/greeting/'], (req, res) => {
    var options = {root: __dirname + '/../static/'};
    res.sendFile('readme.html', options);
});

app.get('/api/init-cache/', (req, res) => {
    CacheManager.init();
    res.json({
        initialized: true
    });
});

app.get('/env', (req, res) => {
    res.json(process.env);
});

app.set("port", process.env.PORT || 8080);
app.listen(app.get("port"), () => {
    CacheManager.init();
    console.log(`Hello from NodeFire test app.`);
});
