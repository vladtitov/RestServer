/**
 * Created by Vlad on 5/3/2016.
 */
/**
 * Created by Vlad on 5/3/2016.
 */
    ///<reference path="../../js/Base.ts"/>

module grabop{
    export class JoinUs{
        $user:JQuery;
        $pass:JQuery;
        $close:JQuery;
        $submit:JQuery;
        $container:JQuery;
        $message:JQuery;
        url:string = 'http://grabopws.azurewebsites.net/auth';
        constructor(options:any){
            this.$container =  $('[data-id=join-us-container]').load('modules/com/join-us.html', (res)=> {
                this.init();
            });
        }

        init(){
            this.$user = this.$container.find('[data-id=user]');
            this.$pass = this.$container.find('[data-id=pass]');
            this.$close = this.$container.find('[data-id=close]');
            this.$submit = this.$container.find('[data-id=submit]');
            this.$message = this.$container.find('[data-id=message]').hide();
            this.$submit.click(()=>this.onSubmit());
        }

        onSubmit():void{
            this.$submit.attr('disabled',true);
            var user:string = this.$user.val();
            var pass:string = this.$pass.val();
            $.post(this.url,{UserName:user,Password:pass}).done((res)=>{
                console.log(res);
                this.$submit.attr('disabled',false);
            }).fail((res)=>{
                console.log(res);
                this.$submit.attr('disabled',false);

            })
        }

    }
}

var grabopSignin = new grabop.JoinUs({});