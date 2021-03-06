import express from 'express';
import session from 'express-session';
import GemfireStore from './connect-gemfire';
import config from "./config";


//using as a simple cache (not for http sessions)
// let cache = new GemfireStore(null, {
//     region: "generic",
//     type: process.env.TYPE || "PROXY"
// });
//
// cache.set("favorite-pets", {"kitty": "Archie"}, (err) => {
//     if (err) {
//         console.log('ERROR: ', err);
//     }
// });
// cache.get("favorite-pets", (err, result) => {
//     if (err) {
//         console.log('ERROR: ', err);
//     } else {
//         console.log('found = ', result);
//     }
// });
// end of simple cache example

let app = express();

let options = {
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    cookie: {httpOnly: true, maxAge: 60000}
};

// used for http session caching
if (config.getSessionCachingStrategy() === "pcc") {
    options.store = new GemfireStore(session, config.gemfire);
}

app.set('trust proxy', 1);
app.use(session(options));

app.get("/api/greeting/:id", (req, res) => {

    let message = "NOT FOUND!"
    if (typeof req.query.message != "undefined") {
        if (!req.session.messages) {
            req.session.messages = {};
        }
        req.session.messages[req.params.id] = req.query.message;
        message = req.query.message;
    } else {
        if (typeof req.session.messages != "undefined") {
            message = req.session.messages[req.params.id];
        }
    }
    res.json({
        key: req.params.id,
        value: message
    });
});

app.get(['/api/session/destroy'], (req, res) => {
    req.session.destroy();
    res.json({status: 'success'});
});

app.get(['/', '/api/greeting/'], (req, res) => {
    let options = {root: __dirname + '/../static/'};
    res.sendFile('readme.html', options);
});

app.get('/env', (req, res) => {
    res.json(process.env);
});

app.set("port", process.env.PORT || 8080);
app.listen(app.get("port"), () => {
    console.log(`Hello from NodeFire test app.`);
});
