/**
 * Created by VladHome on 1/17/2016.
 */
    ///<reference path="typings/jquery.d.ts"/>
    ///<reference path="typings/underscore.d.ts"/>
module grabop {

    export class UserVO {
        constructor(data:any) {
            for (var str in data)this[str] = data[str];
        }

        city:number;
        firstname:string;
        id:number;
        lastname:string;
        latitude:number;
        longitude:number;
        profile_pic:string;
        username:string;
    }

    export class AllianceMember{
        city: number;
        displayname:string
        email: string;
        firstname: string;
        id: number;
        lastname: string;
        latitude: number;
        longitude: number;
        occupation:string;
        phone: string;
        profile_pic: string;
        role: string;
        username: string;
    }
  export  class AllianceVO {
        createdat:string;
        displaymembers:boolean;
        id:number;
        isfull:boolean;
        serviceid:number;

        constructor(data:any) {
            for (var str in data)this[str] = data[str];
        }
    }
   export class MediaVO {
        static createMedia(data:any[]):MediaVO[] {
            var ar = data;
            var out:MediaVO[] = [];
            for (var i = 0, n = ar.length; i < n; i++) {
                out.push(new MediaVO(ar[i]));
            }
            return out;
        }

        constructor(data:any) {
            for (var str in data)this[str] = data[str];
        }

        id:number;
        location:string;
        serviceid:number
        status:number
        type:string;
    }

    interface ImageVO {
        src:string
        id:number;
    }

   export class ServiceVO {
        constructor(data:any) {
            for (var str in data)this[str] = data[str];
            this.user = new UserVO(this.user);
            if (this.videos) this.videos = MediaVO.createMedia(this.videos);
            if (this.pictures) {
                this.pictures = MediaVO.createMedia(this.pictures);
                this.image = this.pictures.length ? this.pictures[0].location : null;
            }

            this.alliance = new AllianceVO(this.alliance);
            this.nostyle = !(this.businessPartnership || this.serviceExchange || this.charity || this.internship);

        }

        nostyle:boolean;
        image:string;
        alliance:AllianceVO;
        businessPartnership:boolean;
        categoryid:number;
        charity:boolean;
        fixedPrice:number;
        hourlyRate:boolean;
        hourlyRateFrom:number;
        hourlyRateTo:number;
        id:number;
        internship:boolean;
        matchPercentage:number;
        numberReviews:number;
        numberTrades:number;
        numberViews:number;
        pictures:MediaVO[];
        serviceExchange:boolean;
        serviceRating:number
        serviceType:number
        summary:string;
        title:string;
        user:UserVO;
        videos:MediaVO[]
    }

    export class BindHref{
        $hrefs:JQuery[];

        data:ServiceVO;
        constructor($view){
            this.$hrefs = this.createHrefCollection($view);
        }
        setData(data:ServiceVO){
            var ar = this.$hrefs;
            for (var i = 0, n = ar.length; i < n; i++) {
                var item = ar[i];
                var val:string =  data[String(item.data('href'))];
                var newval:string = String(item.data('tmpl')).replace('*',val);
                if(val)item.attr('href',newval);

            }
        }
        createHrefCollection($view:JQuery):any{
            var out:any[]=[];
            $view.find('[data-href]').each(function(i,el:any){
                var $el = $(el);
                console.log(el);
                $el.data('tmpl', el.getAttribute('href'));
                out.push($el)
            })
            return out;
        }
    }

    export class RenderController{
        $texts:_.Dictionary<JQuery>;
        $visible:_.Dictionary<JQuery>;
        $imgs:_.Dictionary<JQuery>;
        $chk:_.Dictionary<JQuery>;

        constructor($view:JQuery){
            this.$texts = this.createCollection('data-txt',$view);
            this.$visible = this.createCollection('data-vis',$view);
            this.$imgs = this.createCollection('data-img',$view);
            this.$chk =  this.createCollection('data-chk',$view);
        }

        createCollection(type:string,$view:JQuery):_.Dictionary<JQuery>{
            var obj:any={}
            $view.find('['+type+']').each(function(i,el){
                obj[String(el.getAttribute(type))] = $(el);
            })
            return obj;
        }
        getObject(str:string){
            return this.$texts[str] || this.$visible[str] || this.$imgs[str] || this.$chk[str];
        }
        setData(item:any){
            //  console.log(item);
            for (var str in this.$texts)this.$texts[str].text(item[str]);
            for (var str in this.$visible)item[str]?this.$visible[str].show():this.$visible[str].hide();
            for (var str in this.$imgs)this.$imgs[str].css('background-image','url('+item[str]+')');
            for (var str in this.$chk)this.$chk[str].prop('checked',item[str]);

        }
    }


}