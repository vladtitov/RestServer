/**
 * Created by Vlad on 5/14/2016.
 */

///<reference path="./typings/lodash/lodash.d.ts"/>
///<reference path="./typings/node/node.d.ts"/>


module DAO {
    export interface Identifiable {
        id?: number;
    }

    export interface User extends Identifiable {
        firstname: string;
        lastname: string;
        username:string;
        password:string;
        email:string;
    }
    export interface DAO<T extends Identifiable> {
        create(t: T):T;
        read(id: number):T;
        update(t: T):boolean;
        delete(id: number):boolean;
    }
}

import * as _ from 'lodash';
var fs = require('fs');
import User = DAO.User;

export class UserDAO implements DAO.DAO<User> {
    private id:number;
    private url:string='data/users.json';
    private users:{ [id:number]:User; };
    private _users:User[];
    private fs=fs;
    private _=_;
    constructor() {
        this.id = 1;
        this.fs.readFile(this.url, 'utf8',(err, data)=>{
            if (err) throw err;
            var obj:User[] = JSON.parse(data);
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
    create(user:DAO.User) {
        user.id = this.id;
        this.id++;
        this.users[user.id] = user;
        return user;
    }
    read(id:number) {
        return this.users[id];
    }
    update(user:User) {
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
    login(user:User):User{
        this._users.forEach(function (item:User) {
            if(item.username == user.username && item.password==user.password) return item;
        })
        return null;
    }
    getAll():any{
        return this.users;
    }
}