/**
 * Created by VladHome on 2/5/2016.
 */
///<reference path="../../js/typings/jquery.d.ts"/>
///<reference path="../../js/typings/underscore.d.ts"/>
///<reference path="GrabOpNotifications.ts"/>
///<reference path="NotificationsBase.ts"/>

module grabop.Notifications {

   export class NotificationItem{
        $view:JQuery;
       $popup:JQuery

        appendTo($container:JQuery):void{
            this.$view.appendTo($container);
            this.$view.click((evt:JQueryEventObject)=>{
                console.log(evt.target);

               var btn =  $(evt.target);
                switch(btn.data('id').toString()){
                    case 'close':
                        this.$view.fadeOut('slow',()=>{this.$view.remove()});
                        break;
                    case 'accept':
                        this.$view.html('<p>You have accepted '+this.item.message+'</p>');

                        setTimeout(()=>{
                            this.$view.fadeOut('slow',()=>{this.$view.remove()});
                        },2000);
                        this.sendAction(this.settings.accept);
                        break;
                    case 'reject':
                        this.$view.html('<p>You have declined '+this.item.message+'</p>');
                        setTimeout(()=>{
                            this.$view.fadeOut('slow',()=>{this.$view.remove()});
                        },2000);
                        this.sendAction(this.settings.reject);
                        break;
                    case 'view':
                        this.$popup = $(this.popup);
                       this.getDetails();
                        this.$popup.find('.btn').click((evt)=>{
                            var act:string = $(evt.currentTarget).data('id').toString();
                            console.log(act);
                           switch(act){
                               case 'accept':
                                   this.sendAction(this.settings.accept);
                                   break;
                               case 'reject':
                                   this.sendAction(this.settings.reject);
                                   break;
                               case 'close':
                                   this.$popup.find('.btn').off('click');
                                   this.$popup.fadeOut();
                                   break;
                           }
                        })
                        this.$popup.fadeIn();
                        break;
                }
            })
          //  console.log(this.$view);
        }


       getDetails():void{
           var url = this.settings.get_details.replace('{notification-id}',this.item.id);
           $.get(url).done((res)=>{this.$popup.find('[data-id=message]').html(res) }).fail((err)=>{console.warn(err);})
       }
       sendAction(action:string):void{
           action = action.replace('{notification-id}',this.item.id);
           $.get(action).done((res)=>{console.log(res); }).fail((err)=>{console.warn(err);})
       }
       popup:string ='#NotificationsDetails';

        constructor(private item:any,private settings:any){


            this.$view = $(item.html);
        }
    }
    export class NotificationsList {
        $view:JQuery;
        $header:JQuery;
        $total:JQuery;
        $list:JQuery;
        index:string;

        data:BaseNote[];
        isVisible:boolean;


        static ON_LIST_CLICK:string='ON_LIST_CLICK';
        static ON_LIST_OPEN:string='ON_LIST_OPEN';
        static ON_LIST_CLOSE:string='ON_LIST_CLOSE';
        static emmiter:JQuery =$({});
        private url_get:string;
        private notifications_set_old:string;
        private onetime_template:Function;
        private template:any;


        constructor(private settings:any,$container:JQuery) {
            NotificationsList.emmiter.on('reset',()=>{
                this.close();
            })
            this.onetime_template = _.template(document.getElementById('one-time-item').innerHTML);
            this.template = _.template(document.getElementById(settings.template).innerHTML);

            this.notifications_set_old = settings.notifications_set_old;
            this.url_get = _.template(settings.url_get)({index:settings.index});

            //console.log(this.url_get);

            var tmpl =  _.template(document.getElementById('notifications-list').innerHTML);
            var html = tmpl({label:settings.label})
            this.$view = $(html);
            this.$view.appendTo($container);
            this.$list=this.$view.find('[data-id=list]:first');
            NotificationsList.emmiter.on(NotificationsList.ON_LIST_OPEN,()=>{
                this.close();
            });
            this.$header = this.$view.find('[data-id=header]').click(()=> {

                if (this.isVisible) {
                    this.close();
                    NotificationsList.emmiter.triggerHandler(NotificationsList.ON_LIST_CLOSE,this);

                }
                else {
                    NotificationsList.emmiter.triggerHandler(NotificationsList.ON_LIST_OPEN,this);
                    this.isVisible = true;
                   if(this.$list.children().length) this.$list.show('fast');
                    this.getData();
                    this.$total.fadeOut(()=>{
                        this.$total.text('');
                        this.$total.fadeIn();

                    })

                }
            });

            //this.$list = this.$view.find('[data-list=list]').hide();
           // this.$list.click((evt)=>this.onListClick(evt));
            this.isVisible = false;
            this.$total = this.$view.find('[data-text=total]');
            this.data = [];
        }

        redirect:Function;
        sender_url:Function;

        close():void{
            if (this.isVisible){
                this.$list.hide('fast');
                this.isVisible = false;
            }
        }
        getData(){
            console.log('load '+this.url_get);
            $.get(this.url_get).done((res)=>{

                this.$list.empty();
                console.log(res);
                var ar = res.notifications
                var onetime:number[]=[];
                var settings = this.settings;
                for(var i=0,n=ar.length;i<n;i++){
                    var item = ar[i];
                    var tmpl;
                    if(item.one_time) {
                        tmpl = this.onetime_template;
                        onetime.push(item.id);
                    }
                    else tmpl = this.template;
                    item.sender_url= settings.sender_url.replace('{sender-id}',item.sender_id).replace('{notification-id}',item.id);

                    //console.log(settings.redirect);

                   if(settings.redirect)  item.redirect= settings.redirect.replace('{sender-id}',item.sender_id).replace('{notification-id}',item.id);
                   else  item.redirect ='#';
                    //console.log(item.redirect);
                    item.html = tmpl(item);

                    var note:NotificationItem = new NotificationItem(item,this.settings);

                    note.appendTo(this.$list);

                }
                if(onetime.length) this.sendOneTime(onetime);
            setTimeout(()=> {
                this.$list.show('fast');
            },100);



            });

        }
        sendOneTime(ar:number[]):void{

            $.post(this.notifications_set_old,JSON.stringify(ar)).done((res)=>{ console.log(res);}).fail((err)=>{ console.log(' erroro '+err); });
        }
        setHeader(data:any):void{
            if(data && data.n)this.$total.text('{'+data.n+')');
            else this.$total.text('');
        }
       /* onListClick(evt:JQueryEventObject):void {
            NotificationsList.emmiter.triggerHandler(NotificationsList.ON_LIST_CLICK,evt);
        }

        reset(){
            this.data=[];
            this.$total.text(this.data.length);
            this.$list.html('');
        }
        addNote(note:BaseNote) {
            this.data.push(note);
            note.view = $(this.template(note));
            this.$list.append(note.view);
            this.$total.text(this.data.length);
        }

        getTotal():number{
            return this.data.length;
        }

        getNoteById(id:number):BaseNote {
            var ar = this.data
            for (var i = 0, n = ar.length; i < n; i++) if (ar[i].id == id)return ar[i];
        }

        deleteNotification(note:BaseNote):void{
            var ar = this.data;
            for (var i = ar.length-1; i >=0; i--){
                if (ar[i].id == note.id){
                    ar[i].view.remove();
                    ar.splice(i,1);

                }
            }
            this.$total.text(this.data.length);
        }

*/
    }
}