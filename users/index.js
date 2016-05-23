/**
 * Created by Vlad on 5/22/2016.
 */
///<reference path="../server.ts"/>
"use strict";
var express = require('express');
var DAO = require('./db-users');
var userDAO = new DAO.UserDAO();
var router = express.Router();
router.get('/', function (req, res) {
    res.json(userDAO.getAll());
});
router.get('/user/:id', function (req, res) {
    res.json(userDAO.read(req.params.id));
});
router.post('/user', function (req, res) {
    res.json(userDAO.create(req.body));
    userDAO.save(function () { });
});
router.post('/user/login', function (req, res) {
    var user = userDAO.login(req.body);
    var out = {};
    if (user) {
        if (!user.data) {
            user.data = 'data/u_' + user.id + '.json';
            userDAO.update(user);
            userDAO.save();
        }
        req.session['user'] = user;
        out.result = 'logedin';
        out.success = 'success';
    }
    res.json(out);
});
router.get('/load', function (req, res) {
    userDAO.load(function (dao) {
        res.json(dao.getAll());
    });
});
module.exports = router;
//# sourceMappingURL=index.js.map