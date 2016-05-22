/**
 * Created by VladHome on 3/8/2016.
 */
///<reference path="../js/typings/jquery.d.ts"/>
///<reference path="../js/typings/underscore.d.ts"/>
var garbop;
(function (garbop) {
    var Registry = (function () {
        function Registry() {
        }
        Registry.LOAD_MESSAGE = 'LOAD_MESSAGE';
        Registry.SHOW_MESSAGES = 'SHOW_MESSAGES';
        Registry.trigger = function (str, data) {
            Registry.dispatcher.triggerHandler(str, [data]);
        };
        Registry.dispatcher = $({});
        Registry.on = function (listener, callBack) {
            Registry.dispatcher.on(listener, callBack);
        };
        Registry.data = {};
        return Registry;
    })();
    garbop.Registry = Registry;
    var Service = (function () {
        function Service(options) {
        }
        return Service;
    })();
    garbop.Service = Service;
})(garbop || (garbop = {}));
//# sourceMappingURL=Service.js.map