import session from "express-session";
//import GemfireStore from "../src/connect-gemfire";
import express from 'express';
import request from 'supertest';


function getApp() {

    let options = {
        secret: 'keyboard cat',
        resave: true,
        saveUninitialized: true,
        cookie: {httpOnly: true, maxAge: 60000},
        //store: new GemfireStore(session, {})
    };

    let app = express();
    app.use(session(options));

    return app;
}

describe('', function () {

    let app = getApp();
    app.get("/", function (req, res) {
        res.status(200).json({});
    });

    it('should ', function (done) {
        request(app)
            .get("/")
            .expect(200)
            .end(function (err, res) {
                if (err) throw err;

                done();
            });
    });

});