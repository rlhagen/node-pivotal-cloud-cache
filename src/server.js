// nodefire test app.  Creates web session and the end points
// calling the appropriate functions in the cache lib.

import express from 'express';
import session from 'express-session';
let GemfireStore = require('./gemfire/gemfire-session')(session);

let app = express();

app.set('trust proxy', 1) // trust first proxy
app.use(session({
    store: new GemfireStore({}),
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))

app.get("/api/greeting/:id", (req, res) => {

    if (typeof req.query.message != "undefined") {
        if(!req.session.messages){
            req.session.messages = {};
        }
        req.session.messages[req.params.id] =  req.query.message;
        res.json({
            key: req.params.id,
            value: req.query.message
        });
    } else {
        var greeting = req.session.messages[req.params.id];
        if (typeof greeting != "undefined") {
            // we found something
            console.log('Found the object, returning it.')
            res.json({
                key: req.params.id,
                value: greeting
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

app.get('/env', (req, res) => {
    res.json(process.env);
});

app.set("port", process.env.PORT || 8080);
app.listen(app.get("port"), () => {
    console.log(`Hello from NodeFire test app.`);
});
