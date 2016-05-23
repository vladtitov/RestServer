/**
 * Created by Vlad on 5/22/2016.
 */
///<reference path="../server.ts"/>

import * as express from 'express';
import DAO = require('./db-users');
const userDAO:DAO.UserDAO  = new DAO.UserDAO();  
const router = express.Router();

router.get('/', function (req, res) {
    res.json(userDAO.getAll());
})

router.get('/user/:id', function (req, res) {
    res.json(userDAO.read(req.params.id));
});

router.post('/user', function (req, res) {
    res.json(userDAO.create(req.body));
    userDAO.save(()=>{})
})

router.post('/user/login', function (req, res) {
    var user = userDAO.login(req.body);
    var out:any = {};
    if(user){
        if( !user.data){
            user.data='data/u_'+user.id+'.json';
            userDAO.update(user);
            userDAO.save();
        }
        req.session['user']=user;
        out.result='logedin';
        out.success='success';
    }
    res.json(out);
});

router.get('/load', function (req, res) {
    userDAO.load(function (dao:DAO.UserDAO) {
        res.json(dao.getAll())
    });
});

export = router