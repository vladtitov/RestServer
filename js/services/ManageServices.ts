/**
 * Created by VladHome on 1/16/2016.
 */
    ///<reference path="../typings/jquery.d.ts"/>
    ///<reference path="../typings/underscore.d.ts"/>
    ///<reference path="../Base.ts"/>
    ///<reference path="../Alliance.ts"/>
    ///<reference path="ServicesCollection.ts"/>


module grabop{
    export class DetailsView{
        private data:ServiceVO;
        private baseUrl:string;

        private renderer:RenderController;
        constructor(private $view:JQuery){
            this.renderer = new RenderController($view);


        }

        setData(data:ServiceVO){
            this.data = data;
        }

        render(){
            this.renderer.setData(this.data);
          //  var edit:JQuery =  this.$view.find('[data-id=btnEdit]');
          //  edit.attr('href',this.replaceId(this.data.id,edit.attr('href')));
        }
/*
        private replaceId(id:number,source:string):string{
            var ar = source.split('/');
                ar.pop();
                ar.push(String(id));
               return ar.join('/');
        }*/
    }

    export class ManageServices{
        data:ServiceVO[];
        gallery:ServicesCollection;
        serviceDetails:DetailsView;
        private bindHref:BindHref;
        private aliance:Alliance;
        constructor($view:JQuery,opt){
           console.log(opt);
            this.bindHref = new BindHref($view);
           // var opt:any={};
           // opt.userid = String($view.data('userid'));
           // opt.service_get = String($view.data('get'));
            //opt.service_log = String($view.data('log'));
            if(isNaN(opt.user_id)){
                console.log('User ID reqired');
                return
            }
            this.serviceDetails = new DetailsView($('#servicedetails'));
            this.gallery = new ServicesCollection($view.find('[data-js=listview]'),opt);

            this.gallery.onChange = (item:ServiceVO)=>{
                this.serviceDetails.setData(item);
                this.serviceDetails.render();
                this.bindHref.setData(item);
                this.aliance.setData(item);
            }

            this.aliance = new Alliance($('#ServiceAllince'),opt);
        }

    }
}

declare var baseUrl;
declare var userId;

baseUrl = baseUrl || '';
userId = userId || 0;
var manageServices = new grabop.ManageServices($('#ManageServices'),{
    get:baseUrl+"test/proxy_get.php?",
    log:baseUrl+"test/logger.php?type=",
    user_id:userId
});