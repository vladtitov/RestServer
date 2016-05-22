/**
 * Created by Vlad on 5/13/2016.
 */
/// <reference path="typings/express/express.d.ts" />
/// <reference path="typings/body-parser/body-parser.d.ts" />
///<reference path="typings/express-session/express-session.d.ts"/>
///<reference path="typings/cookie-parser/cookie-parser.d.ts"/>
"use strict";
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookie = require('cookie-parser');
var DAO = require('./db-users');
var userDAO = new DAO.UserDAO();
// configure our app to use bodyParser(it let us get the json data from a POST)
app.use(cookie());
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'somesecrettokenhere'
}));
app.use('/api', bodyParser.urlencoded({ extended: true }));
app.use('/api', bodyParser.json());
var getDirectory = function () {
    var dir = __dirname;
    if (dir.indexOf('node_modules') === -1)
        return dir;
    return dir.substr(0, dir.indexOf('node_modules') - 1);
};
console.log(getDirectory());
app.use(express.static(__dirname + 'app'));
/*app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});*/
var port = process.env.PORT || 8888;
var router = express.Router();
router.get('/user/:id', function (req, res) {
    res.json(userDAO.read(req.params.id));
});
router.get('/user', function (req, res) {
    res.json(userDAO.getAll());
});
router.post('/user', function (req, res) {
    res.json(userDAO.create(req.body));
    userDAO.save(function () { });
});
router.put('/user', function (req, res) {
    res.json({ result: userDAO.update(req.body) });
    userDAO.save(function () { });
});
router.delete('/user/:id', function (req, res) {
    res.json({ result: userDAO.delete(req.params.id) });
    userDAO.save(function () { });
});
router.post('/user/login', function (req, res) {
    var user = userDAO.login(req.body);
    var out = {};
    if (user) {
        out.result = 'logedin';
    }
    res.json(out);
});
// prefixed all routes with /api
app.use('/api', router);
app.listen(port, function () {
    console.log('http://127.0.0.1:' + port);
    console.log('http://127.0.0.1:' + port + '/api');
});
//# sourceMappingURL=server.js.map