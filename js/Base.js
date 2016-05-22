/**
 * Created by VladHome on 1/17/2016.
 */
///<reference path="typings/jquery.d.ts"/>
///<reference path="typings/underscore.d.ts"/>
var grabop;
(function (grabop) {
    var UserVO = (function () {
        function UserVO(data) {
            for (var str in data)
                this[str] = data[str];
        }
        return UserVO;
    }());
    grabop.UserVO = UserVO;
    var AllianceMember = (function () {
        function AllianceMember() {
        }
        return AllianceMember;
    }());
    grabop.AllianceMember = AllianceMember;
    var AllianceVO = (function () {
        function AllianceVO(data) {
            for (var str in data)
                this[str] = data[str];
        }
        return AllianceVO;
    }());
    grabop.AllianceVO = AllianceVO;
    var MediaVO = (function () {
        function MediaVO(data) {
            for (var str in data)
                this[str] = data[str];
        }
        MediaVO.createMedia = function (data) {
            var ar = data;
            var out = [];
            for (var i = 0, n = ar.length; i < n; i++) {
                out.push(new MediaVO(ar[i]));
            }
            return out;
        };
        return MediaVO;
    }());
    grabop.MediaVO = MediaVO;
    var ServiceVO = (function () {
        function ServiceVO(data) {
            for (var str in data)
                this[str] = data[str];
            this.user = new UserVO(this.user);
            if (this.videos)
                this.videos = MediaVO.createMedia(this.videos);
            if (this.pictures) {
                this.pictures = MediaVO.createMedia(this.pictures);
                this.image = this.pictures.length ? this.pictures[0].location : null;
            }
            this.alliance = new AllianceVO(this.alliance);
            this.nostyle = !(this.businessPartnership || this.serviceExchange || this.charity || this.internship);
        }
        return ServiceVO;
    }());
    grabop.ServiceVO = ServiceVO;
    var BindHref = (function () {
        function BindHref($view) {
            this.$hrefs = this.createHrefCollection($view);
        }
        BindHref.prototype.setData = function (data) {
            var ar = this.$hrefs;
            for (var i = 0, n = ar.length; i < n; i++) {
                var item = ar[i];
                var val = data[String(item.data('href'))];
                var newval = String(item.data('tmpl')).replace('*', val);
                if (val)
                    item.attr('href', newval);
            }
        };
        BindHref.prototype.createHrefCollection = function ($view) {
            var out = [];
            $view.find('[data-href]').each(function (i, el) {
                var $el = $(el);
                console.log(el);
                $el.data('tmpl', el.getAttribute('href'));
                out.push($el);
            });
            return out;
        };
        return BindHref;
    }());
    grabop.BindHref = BindHref;
    var RenderController = (function () {
        function RenderController($view) {
            this.$texts = this.createCollection('data-txt', $view);
            this.$visible = this.createCollection('data-vis', $view);
            this.$imgs = this.createCollection('data-img', $view);
            this.$chk = this.createCollection('data-chk', $view);
        }
        RenderController.prototype.createCollection = function (type, $view) {
            var obj = {};
            $view.find('[' + type + ']').each(function (i, el) {
                obj[String(el.getAttribute(type))] = $(el);
            });
            return obj;
        };
        RenderController.prototype.getObject = function (str) {
            return this.$texts[str] || this.$visible[str] || this.$imgs[str] || this.$chk[str];
        };
        RenderController.prototype.setData = function (item) {
            //  console.log(item);
            for (var str in this.$texts)
                this.$texts[str].text(item[str]);
            for (var str in this.$visible)
                item[str] ? this.$visible[str].show() : this.$visible[str].hide();
            for (var str in this.$imgs)
                this.$imgs[str].css('background-image', 'url(' + item[str] + ')');
            for (var str in this.$chk)
                this.$chk[str].prop('checked', item[str]);
        };
        return RenderController;
    }());
    grabop.RenderController = RenderController;
})(grabop || (grabop = {}));
//# sourceMappingURL=Base.js.map