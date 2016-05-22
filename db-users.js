/**
 * Created by Vlad on 5/14/2016.
 */
"use strict";
///<reference path="./typings/lodash/lodash.d.ts"/>
///<reference path="./typings/node/node.d.ts"/>
var _ = require('lodash');
var fs = require('fs');
var UserDAO = (function () {
    function UserDAO() {
        var _this = this;
        this.url = 'users.json';
        this.fs = fs;
        this._ = _;
        this.id = 1;
        this.fs.readFile(this.url, 'utf8', function (err, data) {
            if (err)
                throw err;
            var obj = JSON.parse(data);
            _this._users = obj;
            _this.users = _this._.keyBy(obj, 'id');
        });
    }
    UserDAO.prototype.save = function (callBack) {
        this.fs.writeFile(this.url, JSON.stringify(this.users), function (err) {
            if (err) {
                console.log(err);
                callBack(false);
            }
            callBack(true);
        });
    };
    UserDAO.prototype.create = function (user) {
        user.id = this.id;
        this.id++;
        this.users[user.id] = user;
        return user;
    };
    UserDAO.prototype.read = function (id) {
        return this.users[id];
    };
    UserDAO.prototype.update = function (user) {
        if (this.users[user.id] === null) {
            return false;
        }
        this.users[user.id] = user;
        return true;
    };
    UserDAO.prototype.delete = function (id) {
        if (this.users[id] === null) {
            return false;
        }
        this.users[id] = null;
        return true;
    };
    UserDAO.prototype.login = function (user) {
        this._users.forEach(function (item) {
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