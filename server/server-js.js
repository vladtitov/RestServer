/**
 * Created by Vlad on 5/12/2016.
 */
var express = require('express');
var path = require('path');
var app = express();
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/myindex.html'))
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});