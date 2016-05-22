/**
 * Created by Vlad on 5/7/2016.
 */
///<reference path="../js/typings/jquery.d.ts"/>
var grabop;
(function (grabop) {
    //Join us
    var uj;
    joinUs(uj).done(function (res_join) {
    }).fail(function (er_jpoin) {
    });
    function joinUs(data) {
        return $.post('http://grabopwsdev.azurewebsites.net/userjoin-us', data);
    }
    //Chrck unique username
    var uu;
    isUnique(uu).done(function (res) {
    }).fail(function (er) {
    });
    function isUnique(data) {
        return $.post('http://grabopwsdev.azurewebsites.net//username-is-unique', uu);
    }
})(grabop || (grabop = {}));
//# sourceMappingURL=Docs.js.map