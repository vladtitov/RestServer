/**
 * Created by VladHome on 2/1/2016.
 */
///<reference path="../../js/typings/jquery.d.ts"/>
///<reference path="../../js/typings/underscore.d.ts"/>
///<reference path="NotificationsList.ts"/>
///<reference path="NotificationsBase.ts"/>
var grabop;
(function (grabop) {
    var Notifications;
    (function (Notifications) {
        /* export class Options{
             get_all:string;
             settings:any;
             views:any[]
         }*/
        var Collection = (function () {
            function Collection(settings) {
                // this.url = opt.get_all;
                this.settings = settings;
                console.log(settings);
                var groups = settings.groups;
                var get_group = settings.get_group;
                get_group = get_group.split('{').join('<%=').split('}').join('%>');
                _.map(groups, function (item) {
                    item.notifications_set_old = settings.notifications_set_old;
                    item.sender_url = settings.sender_url;
                    item.accept = settings.accept;
                    item.reject = settings.reject;
                    item.get_details = settings.get_details;
                    item.url_get = get_group;
                });
                this.$list = $('#NotificationsList [data-id=list]');
                this.lists = this.createLists(groups);
            }
            Collection.prototype.createLists = function (ar) {
                var out = {};
                for (var i = 0, n = ar.length; i < n; i++) {
                    // console.log(ar[i]);
                    out[ar[i].index] = new Notifications.NotificationsList(ar[i], this.$list);
                }
                return out;
            };
            Collection.prototype.reset = function () {
                Notifications.NotificationsList.emmiter.triggerHandler('reset');
            };
            Collection.prototype.parseData = function () {
                this.setData(this.rawData);
            };
            Collection.prototype.loadHeader = function () {
                $.get(this.settings);
            };
            Collection.prototype.setData = function (res) {
                //   var ar = res;
                //  var out:BaseNote[] =[];
                //for (var i = 0, n = ar.length; i < n; i++) out.push(this.cretaeNotification(ar[i]));
                // this.data = out;
                // if(this.unknown.length)console.log('ERROR unknoen notifications ',this.unknown);
                // if(this.onData)this.onData(out);
            };
            Collection.prototype.getNotificationById = function (id) {
                var ar = this.data;
                for (var i = 0, n = ar.length; i < n; i++)
                    if (ar[i].id == id)
                        return ar[i];
                return null;
            };
            Collection.prototype.setHeaders = function (ar) {
                var ind = _.indexBy(ar, 'group');
                for (var str in this.lists)
                    this.lists[str].setHeader(ind[str]);
            };
            Collection.prototype.deleteNotificationById = function (id) {
                var ar = this.data;
                for (var i = 0, n = ar.length; i < n; i++) {
                    if (ar[i].id == id) {
                        this.data.splice(i, 1);
                        return true;
                    }
                }
                return false;
            };
            Collection.prototype.getTotal = function () {
                return this.data.length;
            };
            Collection.prototype.getAll = function () {
                return this.data;
            };
            return Collection;
        })();
        Notifications.Collection = Collection;
        var Main = (function () {
            function Main(settings) {
                this.settings = settings;
                this.ON_LIST_CLICK = 'ON_LIST_CLICK';
                //console.log('Main');
                //this.views= this.createViews(opt.notifications);
                this.onListClick = Notifications.NotificationsList.emmiter;
                this.collection = new Collection(settings);
                // if(isNaN(opt.checkData) || opt.checkData < 2)opt.checkData = 5;
                //this.startCheck();
            }
            Main.prototype.reset = function () {
                console.log('reset');
                this.collection.reset();
            };
            Main.prototype.stopCheck = function () {
                clearInterval(this.checkInterval);
            };
            Main.prototype.checkData = function (callBack) {
                var _this = this;
                $.get(this.settings.get_new).done(function (res) {
                    console.log(res);
                    var ar = res.notifications;
                    _this.collection.setHeaders(ar);
                    callBack(res.total);
                });
            };
            Main.prototype.showTotal = function (total) {
                if (total) {
                    $('#NotificationsBellTotal').show();
                    $('#NotificationsBellTotal>div').text(total);
                }
                else
                    $('#NotificationsBellTotal').hide();
            };
            return Main;
        })();
        Notifications.Main = Main;
    })(Notifications = grabop.Notifications || (grabop.Notifications = {}));
})(grabop || (grabop = {}));
//# sourceMappingURL=GrabOpNotifications.js.map