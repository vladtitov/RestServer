/**
 * Created by VladHome on 3/1/2016.
 */
///<reference path="../typings/jquery.d.ts"/>
///<reference path="../typings/underscore.d.ts"/>
///<reference path="../Base.ts"/>
///<reference path="../Alliance.ts"/>
var grabop;
(function (grabop) {
    var ServicesCollection = (function () {
        function ServicesCollection($view, opt) {
            var _this = this;
            this.$view = $view;
            this.opt = opt;
            this.dispatcher = $({});
            this.$list = $view.find('[data-js=list]');
            this.template = _.template($('#serviceItemImage').html());
            this.$list.on('click', 'a', function (evt) {
                var id = Number($(evt.currentTarget).data('id'));
                _this.$selected = $(evt.currentTarget);
                var item = _this.getItemById(id);
                _this.selectedItem = item;
                if (item && _this.onChange)
                    _this.onChange(item);
            });
            this.loadData();
        }
        ServicesCollection.prototype.renderItem = function (item) {
            return '<li class="" data-toggle="tooltip" data-placement="top" ><a href="#/service/' + item.id + '" data-id="' + item.id + '"  title="' + item.title + '" style="background-image: url(' + item.image + ')" ></a></li>';
        };
        ServicesCollection.prototype.getItemById = function (id) {
            var ar = this.data;
            for (var i = 0, n = ar.length; i < n; i++) {
                if (ar[i].id == id)
                    return ar[i];
            }
            return null;
        };
        ServicesCollection.prototype.selectItem = function (id) {
            var item;
            if (id === 0)
                item = this.data[0];
            else
                item = this.getItemById(id);
            this.selectedItem = item;
            if (item && this.onChange)
                this.onChange(item);
        };
        ServicesCollection.prototype.setData = function (data) {
            this.data = data;
            return this;
        };
        ServicesCollection.prototype.render = function () {
            var ar = this.data;
            var out = '';
            for (var i = 0, n = ar.length; i < n; i++) {
                out += this.renderItem(ar[i]);
            }
            this.$list.html(out);
        };
        ServicesCollection.prototype.loadData = function () {
            var _this = this;
            var url = this.opt.get + 'services/' + this.opt.user_id;
            console.log('load data ' + url);
            $.get(url).done(function (s) {
                // console.log(s);
                var res = [];
                try {
                    var ar = JSON.parse(s);
                    for (var i = 0, n = ar.length; i < n; i++)
                        res.push(new grabop.ServiceVO(ar[i]));
                }
                catch (e) {
                    console.log('Error ' + s, e);
                }
                if (res.length) {
                    _this.data = res;
                    _this.setData(res).render();
                    if (_this.onData)
                        _this.onData(res);
                    var hash = window.location.hash;
                    var id = 0;
                    var h = hash.split('/');
                    if (h.indexOf('service') !== -1)
                        id = Number(h.pop());
                    _this.selectItem(id);
                }
            });
        };
        return ServicesCollection;
    })();
    grabop.ServicesCollection = ServicesCollection;
})(grabop || (grabop = {}));
//# sourceMappingURL=ServicesCollection.js.map