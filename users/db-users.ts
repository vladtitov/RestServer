/**
 * Created by Vlad on 5/14/2016.
 */

///<reference path="../typings/lodash/lodash.d.ts"/>
///<reference path="../typings/node/node.d.ts"/>

import * as _ from 'lodash';
module DAO {


  export  interface User {
        id:number;
        firstname: string;
        lastname: string;
        username:string;
        password:string;
        email:string;
        data:string;
    }
  export  interface DAO<T> {
        create(t: T):T;
        read(id: number):T;
        update(t: T):boolean;
        delete(id: number):boolean;
    }







}

var fs = require('fs');
import User = DAO.User;

export  class UserDAO implements DAO.DAO<User> {

    private url:string='users/users.json';
    private usersInd:{ [id:number]:User; };
    private users:User[];
    private fs=fs;
    private _=_;
    private max:number;
    constructor() {
        this.load(function () {

        });
    }

    load(callback:Function):void{
        this.fs.readFile(this.url, 'utf8',(err, data)=>{
            if (err) throw err;
            this.users = JSON.parse(data);
            callback(this);
        });        
    }

    save(callBack?:Function):void{
        this.fs.writeFile(this.url, JSON.stringify(this.users), (err)=> {
            if(err) {               
                if(callBack)callBack(false)
            }
            if(callBack) callBack(true);
        });
    }
    create(user:DAO.User) {
        user.id = this.users.length ? (this.users[this.users.length-1].id + 1):1;
        this.users.push(user);
        return user;
    }

    private current:number
    read(id:number):User {
        id=Number(id);       
        var item:User
        this.users.forEach(function (user) {
            if(user.id === id)  item = user;
        })

        return item;
    }

    update(user:User):boolean {
        var u = this.read(user.id);
        if(u) for(var str in user)u[str]=user[str];
        return u?true:false;
    }

    delete(id:number):boolean {
        var u:User = this.read(id);
        var i:number = this.users.indexOf(u);
        if(i!==-1)this.users.splice(i,1);
        return (i!==-1)?true:false;
    }
    login(user:User):User{
        this.users.forEach(function (item:User) {
            if(item.username == user.username && item.password==user.password) return item;
        })
        return null;
    }
    getAll():any{
        return this.users;
    }
}

