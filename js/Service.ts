/**
 * Created by VladHome on 3/8/2016.
 */
    ///<reference path="../js/typings/jquery.d.ts"/>
///<reference path="../js/typings/underscore.d.ts"/>
module garbop{
    export class Registry{
        static LOAD_MESSAGE:string='LOAD_MESSAGE';
        static SHOW_MESSAGES:string='SHOW_MESSAGES';
        static trigger = function(str,data){
            Registry.dispatcher.triggerHandler(str,[data]);
        }
        static dispatcher:JQuery =$({});
        static on = function(listener,callBack){
            Registry.dispatcher.on(listener,callBack);
        }
        static data:any={}
    }
    export class Service{

        constructor(options){

        }
    }

}