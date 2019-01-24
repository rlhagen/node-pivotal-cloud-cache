import session from "express-session";
import express from 'express';
import request from 'supertest';
import rewiremock from 'rewiremock';
import assert from 'assert';


//stub/mock for gemfire module
let cache = {};
let methods = {};
let stub = {
    createCacheFactory: (propertiesFile) => {
        return {
            create: () => {
                return {
                    createRegion: () => {
                        return {
                            putSync: (key, value) => {
                                methods["put"] = true;
                                cache[key] = value;
                            },
                            getSync: (key) => {
                                methods["get"] = true;
                                return cache[key];
                            },
                            remove: (key, error) => {
                                methods["remove"] = true;
                                delete cache[key];
                            }
                        }
                    }
                }
            }
        }
    }
};

//mock gemfire module using stub
rewiremock('gemfire')
    .with(stub);
rewiremock.enable();
const GemfireStore = require("../src/connect-gemfire").default;
rewiremock.disable();


function getApp() {

    let options = {
        secret: 'keyboard cat',
        resave: true,
        saveUninitialized: true,
        cookie: {httpOnly: true, maxAge: 60000},
        store: new GemfireStore(session, {
            credentials: {}
        })
    };

    let app = express();
    app.use(session(options));

    return app;
}

describe('GemfireStore tests for express session', function () {

    it('GemfireStore.put is called when session is created', function (done) {
        let app = getApp();
        app.get("/", function (req, res) {
            res.status(200).json({});
        });
        request(app)
            .get("/")
            .expect(200)
            .end(function (err, res) {
                if (err) throw err;
                assert.strictEqual(methods["put"], true);
                done();
            });
    });

    it('GemfireStore.get is called when session is reloaded', function (done) {
        let app = getApp();
        app.get("/", function (req, res) {
            req.session.reload(()=>{});
            res.status(200).json({});
        });
        request(app)
            .get("/")
            .expect(200)
            .end(function (err, res) {
                if (err) throw err;
                assert.strictEqual(methods["get"], true);
                done();
            });
    });

    it('GemfireStore.remove is called when session is destroyed', function (done) {
        let app = getApp();
        app.get("/", function (req, res) {
            req.session.destroy();
            res.status(200).json({});
        });
        request(app)
            .get("/")
            .expect(200)
            .end(function (err, res) {
                if (err) throw err;
                assert.strictEqual(methods["remove"], true);
                done();
            });
    });

});