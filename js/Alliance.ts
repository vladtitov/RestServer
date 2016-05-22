    ///<reference path="typings/jquery.d.ts"/>
    ///<reference path="typings/underscore.d.ts"/>
    ///<reference path="Base.ts"/>

module grabop{
    export class Alliance{
        renderer:RenderController;
        vo:ServiceVO;
        $invite:JQuery;
        $name:JQuery;
        constructor(private $view:JQuery,private opt:any){
            this.renderer = new RenderController($view);
            this.$name = $view.find('[name=name]').on('input',(evt)=>{
                console.log(this.$name.val());

            })

            this.renderer.getObject('isfull').on('change',(evt)=>{
                //console.log(evt);
                var isfull:boolean = $(evt.currentTarget).prop('checked');
            });

            this.renderer.getObject('displaymembers').on('change',(evt)=>{
                var dispalynames:boolean = $(evt.currentTarget).prop('checked');
            });

            this.$invite = $view.find('[data-view=Invite]');
            this.$invite.find('[type=submit]').click((evt)=>{
                evt.preventDefault();

                var form:FormData = new FormData(<HTMLFormElement>document.getElementById('formInvite'));
                console.log(evt);
               // $.post(this.opt.service_get+'alliances/' + this.vo.id + '/members',form).done((s)=>{
//
               // })
               console.log(form);

            })

        }

        setData(vo:ServiceVO):Alliance{
            var alns:AllianceVO = vo.alliance;
            this.vo = vo;
            this.renderer.setData(alns);
            if(alns.isfull)this.$invite.hide();
            else this.$invite.show();
            this.render();
            this.loadData();
            return this;
        }

        render(){


        }

        loadData():void {

            $.get(this.opt.service_get+'alliances/' + this.vo.id + '/members').done((s)=> {
              //  console.log(s);
                var res:any;
                try{
                    res = JSON.parse(s);
                }catch(e){

                }
                if(res){
                    console.log(res);
                }

            });
        }

    }

}


