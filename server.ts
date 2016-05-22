/**
 * Created by Vlad on 5/13/2016.
 */
/// <reference path="typings/express/express.d.ts" />
/// <reference path="typings/body-parser/body-parser.d.ts" />
///<reference path="typings/express-session/express-session.d.ts"/>
///<reference path="typings/cookie-parser/cookie-parser.d.ts"/>


import * as express from 'express';

const app = express();

import * as bodyParser from 'body-parser';
import * as session from 'express-session';
import * as cookie from 'cookie-parser';

import DAO = require('./db-users');
const userDAO:DAO.UserDAO = new DAO.UserDAO();
// configure our app to use bodyParser(it let us get the json data from a POST)
app.use(cookie());
app.use(session({
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    secret:'somesecrettokenhere'
}));
app.use('/api',bodyParser.urlencoded({extended: true}));
app.use('/api',bodyParser.json());
var getDirectory = function(){
    var dir = __dirname;
    if(dir.indexOf('node_modules')===-1) return dir;
   return dir.substr(0,dir.indexOf('node_modules')-1);
}
console.log(getDirectory());
app.use(express.static(__dirname + 'app'));
/*app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});*/

const port:number = process.env.PORT || 8888;
const router = express.Router();

router.get('/user/:id', function (req, res) {
   res.json(userDAO.read(req.params.id));
});
router.get('/user', function (req, res) {
    res.json(userDAO.getAll());
})
router.post('/user', function (req, res) {
    res.json(userDAO.create(req.body));
    userDAO.save(()=>{})
})
router.put('/user', function (req, res) {
    res.json({result : userDAO.update(req.body)});
    userDAO.save(()=>{})
});
router.delete('/user/:id', function (req, res) {
    res.json({result : userDAO.delete(req.params.id)});
    userDAO.save(()=>{})
});
router.post('/user/login', function (req, res) {
    var user = userDAO.login(req.body);
    var out:any = {};
    if(user){
        out.result='logedin';
    }
    res.json(out);
});
// prefixed all routes with /api
app.use('/api', router);

app.listen(port,function(){
    console.log('http://127.0.0.1:' + port);
    console.log('http://127.0.0.1:' + port + '/api');
});

