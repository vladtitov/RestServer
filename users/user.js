/**
 * Created by Vlad on 5/22/2016.
 */
///<reference path="../server.ts"/>
"use strict";
var express = require('express');
var router = express.Router();
var fs = require('fs');
router.get('/', function (req, res) {
    var data = req.session;
    res.json(data);
});
router.get('/get-all', function (req, res) {
    var file = req.session['file'];
    this.fs.readFile(this.url, 'utf8', function (err, data) {
        if (err)
            throw err;
        res.json(data);
    });
});
router.get('/user/:index', function (req, res) {
    var file = req.session['file'];
    this.fs.readFile(this.url, 'utf8', function (err, data) {
        if (err)
            throw err;
        res.json(data[req.params.index]);
    });
});
router.post('/user/:index', function (req, res) {
    var file = req.session['file'];
    if (file) {
        this.fs.readFile(this.url, 'utf8', function (err, data) {
            if (err)
                res.json(err);
            else {
                data[req.params.index] = req.body;
                fs.writeFile(file, JSON.stringify(data), function (err) {
                    if (err)
                        res.json(err);
                    else
                        res.json({ success: 'success' });
                });
            }
        });
    }
    else
        res.json({ error: 'login' });
});
module.exports = router;
//# sourceMappingURL=user.js.map