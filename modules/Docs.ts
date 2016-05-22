/**
 * Created by Vlad on 5/7/2016.
 */
    ///<reference path="../js/typings/jquery.d.ts"/>

module grabop{

    interface UserJoin{
        username:string,
        pass:string,
        firstName:string,
        lastName:string,
        email:string
    }

    interface ResultJoin{

    }

    interface ErrorJoin{

    }
    interface UserUnique{
        username:string
    }

    interface RespUnique{
        success:'success'
    }


    //Join us

    var uj:UserJoin;
    joinUs(uj).done((res_join:ResultJoin)=>{

    }).fail((er_jpoin:ErrorJoin)=>{

    });

    function joinUs(data:UserJoin):JQueryPromise<ResultJoin>{
        return  $.post('http://grabopwsdev.azurewebsites.net/userjoin-us',data);
    }


    //Chrck unique username
    var uu: UserUnique;
    isUnique(uu).done((res:RespUnique)=>{

    }).fail((er:Error)=>{

    });

    function isUnique(data:UserUnique):JQueryPromise<RespUnique>{
        return $.post('http://grabopwsdev.azurewebsites.net//username-is-unique',uu);

    }



}