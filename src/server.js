import express from 'express';
import session from 'express-session';
const GemfireStore = require('./gemfire/gemfire-session')(session);

let app = express();

let options = {
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
};

if(process.env.SESSION_STORE === "pcc"){
    options.store = new GemfireStore({});
}

app.set('trust proxy', 1);
app.use(session(options));

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
        let greeting = req.session.messages[req.params.id];
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
