/**
 * Created by Vlad on 5/14/2016.
 */
"use strict";
///<reference path="../typings/lodash/lodash.d.ts"/>
///<reference path="../typings/node/node.d.ts"/>
var _ = require('lodash');
var fs = require('fs');
var UserDAO = (function () {
    function UserDAO() {
        this.url = 'users/users.json';
        this.fs = fs;
        this._ = _;
        this.load(function () {
        });
    }
    UserDAO.prototype.load = function (callback) {
        var _this = this;
        this.fs.readFile(this.url, 'utf8', function (err, data) {
            if (err)
                throw err;
            _this.users = JSON.parse(data);
            callback(_this);
        });
    };
    UserDAO.prototype.save = function (callBack) {
        this.fs.writeFile(this.url, JSON.stringify(this.users), function (err) {
            if (err) {
                if (callBack)
                    callBack(false);
            }
            if (callBack)
                callBack(true);
        });
    };
    UserDAO.prototype.create = function (user) {
        user.id = this.users.length ? (this.users[this.users.length - 1].id + 1) : 1;
        this.users.push(user);
        return user;
    };
    UserDAO.prototype.read = function (id) {
        id = Number(id);
        var item;
        this.users.forEach(function (user) {
            if (user.id === id)
                item = user;
        });
        return item;
    };
    UserDAO.prototype.update = function (user) {
        var u = this.read(user.id);
        if (u)
            for (var str in user)
                u[str] = user[str];
        return u ? true : false;
    };
    UserDAO.prototype.delete = function (id) {
        var u = this.read(id);
        var i = this.users.indexOf(u);
        if (i !== -1)
            this.users.splice(i, 1);
        return (i !== -1) ? true : false;
    };
    UserDAO.prototype.login = function (user) {
        this.users.forEach(function (item) {
            if (item.username == user.username && item.password == user.password)
                return item;
        });
        return null;
    };
    UserDAO.prototype.getAll = function () {
        return this.users;
    };
    return UserDAO;
}());
exports.UserDAO = UserDAO;
//# sourceMappingURL=db-users.js.map