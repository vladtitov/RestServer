/**
 * Created by VladHome on 2/1/2016.
 */
///<reference path="../../js/typings/jquery.d.ts"/>
///<reference path="../../js/typings/underscore.d.ts"/>
///<reference path="NotificationsList.ts"/>
///<reference path="NotificationsBase.ts"/>

module grabop.Notifications{


   /* export class Options{
        get_all:string;
        settings:any;
        views:any[]
    }*/
    export class Collection{
        data:BaseNote[];
        onData:Function;
        onLengthChanges:Function;
        private rawData:any;
        private url:string;
        $list:JQuery;
        lists:_.Dictionary<NotificationsList>;
        constructor(private settings:any){
         // this.url = opt.get_all;

            console.log(settings);
            var groups= settings.groups;
            var get_group = settings.get_group;
            get_group =  get_group.split('{').join('<%=').split('}').join('%>');
           _.map( groups, function(item:any){
               item.notifications_set_old = settings.notifications_set_old;
               item.sender_url = settings.sender_url;
               item.accept= settings.accept;
               item.reject= settings.reject;
               item.get_details = settings.get_details;

               item.url_get=get_group
           });

            this.$list = $('#NotificationsList [data-id=list]');
            this.lists = this.createLists(groups);
        }

         private createLists(ar):_.Dictionary<NotificationsList>{
         var out:_.Dictionary<NotificationsList> = {}

         for (var i = 0, n = ar.length; i < n; i++){
            // console.log(ar[i]);
             out[ar[i].index] = new NotificationsList(ar[i],this.$list);
         }
         return out;
         }

        reset():void{
            NotificationsList.emmiter.triggerHandler('reset');
        }
        parseData():void{
            this.setData(this.rawData);
        }

        loadHeader():void{
            $.get(this.settings)
        }
        setData(res):void{
         //   var ar = res;
          //  var out:BaseNote[] =[];
           //for (var i = 0, n = ar.length; i < n; i++) out.push(this.cretaeNotification(ar[i]));
           // this.data = out;
            // if(this.unknown.length)console.log('ERROR unknoen notifications ',this.unknown);
           // if(this.onData)this.onData(out);
        }

        getNotificationById(id:number):BaseNote{
            var ar = this.data;
            for (var i = 0, n = ar.length; i < n; i++)   if(ar[i].id==id) return ar[i];
            return null;
        }

        setHeaders(ar:any[]):void{
            var ind= _.indexBy(ar,'group');
            for(var str  in this.lists)this.lists[str].setHeader(ind[str]);
        }
        deleteNotificationById(id:number):boolean{
            var ar = this.data;
            for (var i = 0, n = ar.length; i < n; i++) {
                if(ar[i].id==id){
                    this.data.splice(i,1);
                    return true;
                }
            }
            return false;
        }
        getTotal():number{
            return this.data.length
        }
        getAll():BaseNote[]{
            return this.data;
        }
    }


    export class Main{
        onListClick:JQuery;
       collection:Collection;

        ON_LIST_CLICK:string='ON_LIST_CLICK';

        checkInterval:number;
        constructor(private settings:any){
            //console.log('Main');
            //this.views= this.createViews(opt.notifications);
            this.onListClick = NotificationsList.emmiter;
            this.collection = new Collection(settings);

           // if(isNaN(opt.checkData) || opt.checkData < 2)opt.checkData = 5;
            //this.startCheck();

        }

        reset(){
            console.log('reset');
            this.collection.reset();
        }
        stopCheck():void{
            clearInterval(this.checkInterval);
        }

        checkData(callBack){
            $.get(this.settings.get_new).done((res)=>{
                console.log(res);
                var ar = res.notifications;
                this.collection.setHeaders(ar);

                callBack(res.total);
            })
        }

        private showTotal(total):void{
            if(total){
                $('#NotificationsBellTotal').show();
                $('#NotificationsBellTotal>div').text(total)

            }else $('#NotificationsBellTotal').hide();

        }




    }
}