/**
 * Created by Vlad on 5/14/2016.
 */
/// <reference path="dao.ts" />
///<reference path="../typings/lodash/lodash.d.ts"/>
///<reference path="../typings/node/node.d.ts"/>



import * as _ from 'lodash';
var fs = require('fs');
export class UserDAO implements DAO.DAO<VO.User> {
    private id:number;
    private url:string='data/users.json';
    private users:{ [id:number]:VO.User; };
    private _users:VO.User[];
    private fs=fs;
    private _=_;
    constructor() {
        this.id = 1;
        this.fs.readFile(this.url, 'utf8',(err, data)=>{
            if (err) throw err;
            var obj:VO.User[] = JSON.parse(data);
            this._users = obj;
            this.users = this._.keyBy(obj,'id');
        });
    }

    save(callBack:Function):void{
        this.fs.writeFile(this.url, JSON.stringify(this.users), (err)=> {
            if(err) {
                console.log(err);
                callBack(false)
            }
            callBack(true);
        });
    }
    create(user:VO.User) {
        user.id = this.id;
        this.id++;
        this.users[user.id] = user;
        return user;
    }
    read(id:number) {
        return this.users[id];
    }
    update(user:VO.User) {
        if (this.users[user.id] === null) {
            return false;
        }
        this.users[user.id] = user;
        return true;
    }
    delete(id:number) {
        if (this.users[id] === null) {
            return false;
        }
        this.users[id] = null;
        return true;
    }
    login(user:VO.User):VO.User{
        this._users.forEach(function (item:VO.User) {
            if(item.username == user.username && item.password==user.password) return item;
        })
        return null;
    }
    getAll():any{
        return this.users;
    }
}