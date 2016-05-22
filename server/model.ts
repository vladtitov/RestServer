/**
 * Created by Vlad on 5/13/2016.
 */
module VO {
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


  /* export  class User  {
        constructor(public firstname: string,public lastname: string, public age: number) {
        }


    }*/

  /*  class User {
        private _firstname: string;
        private _lastname: string;
        private _age: number;

        constructor(firstname: string, lastname: string, age: number) {
            this._firstname = firstname;
            this._lastname = lastname;
            this._age = age;
        }

        public get firstname() {
            return this._firstname;
        }

        public get lastname() {
            return this._lastname;
        }

        public get age() {
            return this._age;
        }
    }
   var user = new User('John', 'Doe', 42);*/
}
