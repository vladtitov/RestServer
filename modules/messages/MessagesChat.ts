/**
 * Created by VladHome on 3/2/2016.
 */
    ///<reference path="../../js/typings/jquery.d.ts"/>
///<reference path="../../js/typings/underscore.d.ts"/>

module grabop{

    declare var baseUrl;
    export class VOMessage{
        body:string;
        from:string;
        id:number;
        level:number;
        subject:string;
        time:string;
        cl:string;

    }
    export class MessagesChat{
        $view:JQuery;
        private data:any[];
        private template:any;
        private listeners:any;
        CANCEL:string='cancel';
        SENDING:string='sending';
        SENT:string ='sent';
        on(evt,callBack):void{
            if(!this.listeners[evt]) this.listeners[evt] =[];
        };
       private  dispatch(evt,data):void{
            if(this.listeners[evt])  this.listeners[evt].forEach(function(func){func(data)});

        }

        appendTo($view):JQuery{
            $view.append(this.$view);
            return this.$view;
        }
        constructor(){
            this.listeners={};

            this.$view = $('<div>').addClass(' MessagesChat');
            this.$view.load(baseUrl+'modules/messages/MessagesChat.html',(res)=>{
                this.init();
            });
        }
        init():void{
            this.template = _.template(document.getElementById('chatmessage').innerHTML);

            this.$view.find('[data-id=btnSend]').click(()=>{
                console.log('posting');
                var url='http://grabopwsdev.azurewebsites.net/messages/'+this.id+'/history';
                var data = $('#message-to-send').val();
                this.dispatch(this.SENDING,data);
                $.post(url,data).done(function(res){
                    console.log(res);
                    this.dispatch(this.SENT,res);
                    this.showMessages();
                })
            });

           var btnCancel = this.$view.find('[data-id=btnCancel]').click(()=>{
               this.dispatch('cancel',btnCancel);
            });
        }

        parse():void{
            var ar = this.data
            var out='';
            for (var i = 0, n = ar.length; i < n; i++) {
                var item = ar[i];
                item.cl='mu';
                out+=this.template(item)
            }

            $('#ChatHistory').html(out);
           $('#Messages_Chat [data-id=total]').text(n);

        }
        id:number
        showMessages(id:number):void{
            if(id)this.id=id
            this.id=id;
            var url='http://grabopwsdev.azurewebsites.net/messages/'+this.id+'/history';
         //   var url= 'messages/history/'+messagechat;
            $.get(url).done((res)=>{
                this.data = res
                this.parse();
                console.log(res);
            })
        }

        getOpponent():void{

        }


}
}




