/**
 * Created by Vlad on 5/3/2016.
 */
    ///<reference path="../../js/Base.ts"/>
    
module grabop{
    export class SignIn{
       // $user:JQuery;
       // $pass:JQuery;
        $close:JQuery;
        $submit:JQuery;
        $container:JQuery;
        $message:JQuery;
        $form:JQuery;
        url:string = 'http://grabopws.azurewebsites.net/auth';
        constructor(options:any){
           this.$container =  $('[data-id=sign-in-container]').load('modules/com/sign-in.html', (res)=> {
                this.init();
            });
        }

        init(){
          this.$form = this.$container.find( "form" ).submit(( evt )=> {
              evt.preventDefault();
              this.onSubmit();
          });
           // this.$user = this.$container.find('[data-id=user]');
          //  this.$pass = this.$container.find('[data-id=pass]');
            this.$close = this.$container.find('[data-id=close]');
            this.$submit = this.$container.find('[data-id=submit]');
            this.$message = this.$container.find('[data-id=message]').hide();
           // this.$submit.click(()=>this.onSubmit());
        }

        onSubmit():void{
            var valid = true;
            var obj:any={};
           this.$form.find('input').each((i,input:HTMLInputElement)=>{
               obj[input.name]=input.value;
              // input.checkValidity();
           })

             this.$submit.attr('disabled',true);
             $.post(this.url,obj).done((res)=>{
                 console.log(res);
                 this.$submit.attr('disabled',false);
             }).fail((res)=>{
                 console.log(res);
                 this.$submit.attr('disabled',false);

             })
        }
        
    }
}

var grabopSignin = new grabop.SignIn({});