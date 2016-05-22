/**
 * Created by VladHome on 1/16/2016.
 */
///<reference path="../typings/jquery.d.ts"/>
///<reference path="../typings/underscore.d.ts"/>
///<reference path="../Base.ts"/>
///<reference path="../Alliance.ts"/>
///<reference path="ServicesCollection.ts"/>
var grabop;
(function (grabop) {
    var DetailsView = (function () {
        function DetailsView($view) {
            this.$view = $view;
            this.renderer = new grabop.RenderController($view);
        }
        DetailsView.prototype.setData = function (data) {
            this.data = data;
        };
        DetailsView.prototype.render = function () {
            this.renderer.setData(this.data);
            //  var edit:JQuery =  this.$view.find('[data-id=btnEdit]');
            //  edit.attr('href',this.replaceId(this.data.id,edit.attr('href')));
        };
        return DetailsView;
    })();
    grabop.DetailsView = DetailsView;
    var ManageServices = (function () {
        function ManageServices($view, opt) {
            var _this = this;
            console.log(opt);
            this.bindHref = new grabop.BindHref($view);
            // var opt:any={};
            // opt.userid = String($view.data('userid'));
            // opt.service_get = String($view.data('get'));
            //opt.service_log = String($view.data('log'));
            if (isNaN(opt.user_id)) {
                console.log('User ID reqired');
                return;
            }
            this.serviceDetails = new DetailsView($('#servicedetails'));
            this.gallery = new grabop.ServicesCollection($view.find('[data-js=listview]'), opt);
            this.gallery.onChange = function (item) {
                _this.serviceDetails.setData(item);
                _this.serviceDetails.render();
                _this.bindHref.setData(item);
                _this.aliance.setData(item);
            };
            this.aliance = new grabop.Alliance($('#ServiceAllince'), opt);
        }
        return ManageServices;
    })();
    grabop.ManageServices = ManageServices;
})(grabop || (grabop = {}));
baseUrl = baseUrl || '';
userId = userId || 0;
var manageServices = new grabop.ManageServices($('#ManageServices'), {
    get: baseUrl + "test/proxy_get.php?",
    log: baseUrl + "test/logger.php?type=",
    user_id: userId
});
//# sourceMappingURL=ManageServices.js.map