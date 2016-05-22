/**
 * Created by VladHome on 2/5/2016.
 */
///<reference path="../../js/typings/jquery.d.ts"/>
///<reference path="../../js/typings/underscore.d.ts"/>
///<reference path="GrabOpNotifications.ts"/>
///<reference path="NotificationsBase.ts"/>
var grabop;
(function (grabop) {
    var Notifications;
    (function (Notifications) {
        var NotificationItem = (function () {
            function NotificationItem(item, settings) {
                this.item = item;
                this.settings = settings;
                this.popup = '#NotificationsDetails';
                this.$view = $(item.html);
            }
            NotificationItem.prototype.appendTo = function ($container) {
                var _this = this;
                this.$view.appendTo($container);
                this.$view.click(function (evt) {
                    console.log(evt.target);
                    var btn = $(evt.target);
                    switch (btn.data('id').toString()) {
                        case 'close':
                            _this.$view.fadeOut('slow', function () { _this.$view.remove(); });
                            break;
                        case 'accept':
                            _this.$view.html('<p>You have accepted ' + _this.item.message + '</p>');
                            setTimeout(function () {
                                _this.$view.fadeOut('slow', function () { _this.$view.remove(); });
                            }, 2000);
                            _this.sendAction(_this.settings.accept);
                            break;
                        case 'reject':
                            _this.$view.html('<p>You have declined ' + _this.item.message + '</p>');
                            setTimeout(function () {
                                _this.$view.fadeOut('slow', function () { _this.$view.remove(); });
                            }, 2000);
                            _this.sendAction(_this.settings.reject);
                            break;
                        case 'view':
                            _this.$popup = $(_this.popup);
                            _this.getDetails();
                            _this.$popup.find('.btn').click(function (evt) {
                                var act = $(evt.currentTarget).data('id').toString();
                                console.log(act);
                                switch (act) {
                                    case 'accept':
                                        _this.sendAction(_this.settings.accept);
                                        break;
                                    case 'reject':
                                        _this.sendAction(_this.settings.reject);
                                        break;
                                    case 'close':
                                        _this.$popup.find('.btn').off('click');
                                        _this.$popup.fadeOut();
                                        break;
                                }
                            });
                            _this.$popup.fadeIn();
                            break;
                    }
                });
                //  console.log(this.$view);
            };
            NotificationItem.prototype.getDetails = function () {
                var _this = this;
                var url = this.settings.get_details.replace('{notification-id}', this.item.id);
                $.get(url).done(function (res) { _this.$popup.find('[data-id=message]').html(res); }).fail(function (err) { console.warn(err); });
            };
            NotificationItem.prototype.sendAction = function (action) {
                action = action.replace('{notification-id}', this.item.id);
                $.get(action).done(function (res) { console.log(res); }).fail(function (err) { console.warn(err); });
            };
            return NotificationItem;
        })();
        Notifications.NotificationItem = NotificationItem;
        var NotificationsList = (function () {
            function NotificationsList(settings, $container) {
                var _this = this;
                this.settings = settings;
                NotificationsList.emmiter.on('reset', function () {
                    _this.close();
                });
                this.onetime_template = _.template(document.getElementById('one-time-item').innerHTML);
                this.template = _.template(document.getElementById(settings.template).innerHTML);
                this.notifications_set_old = settings.notifications_set_old;
                this.url_get = _.template(settings.url_get)({ index: settings.index });
                //console.log(this.url_get);
                var tmpl = _.template(document.getElementById('notifications-list').innerHTML);
                var html = tmpl({ label: settings.label });
                this.$view = $(html);
                this.$view.appendTo($container);
                this.$list = this.$view.find('[data-id=list]:first');
                NotificationsList.emmiter.on(NotificationsList.ON_LIST_OPEN, function () {
                    _this.close();
                });
                this.$header = this.$view.find('[data-id=header]').click(function () {
                    if (_this.isVisible) {
                        _this.close();
                        NotificationsList.emmiter.triggerHandler(NotificationsList.ON_LIST_CLOSE, _this);
                    }
                    else {
                        NotificationsList.emmiter.triggerHandler(NotificationsList.ON_LIST_OPEN, _this);
                        _this.isVisible = true;
                        if (_this.$list.children().length)
                            _this.$list.show('fast');
                        _this.getData();
                        _this.$total.fadeOut(function () {
                            _this.$total.text('');
                            _this.$total.fadeIn();
                        });
                    }
                });
                //this.$list = this.$view.find('[data-list=list]').hide();
                // this.$list.click((evt)=>this.onListClick(evt));
                this.isVisible = false;
                this.$total = this.$view.find('[data-text=total]');
                this.data = [];
            }
            NotificationsList.prototype.close = function () {
                if (this.isVisible) {
                    this.$list.hide('fast');
                    this.isVisible = false;
                }
            };
            NotificationsList.prototype.getData = function () {
                var _this = this;
                console.log('load ' + this.url_get);
                $.get(this.url_get).done(function (res) {
                    _this.$list.empty();
                    console.log(res);
                    var ar = res.notifications;
                    var onetime = [];
                    var settings = _this.settings;
                    for (var i = 0, n = ar.length; i < n; i++) {
                        var item = ar[i];
                        var tmpl;
                        if (item.one_time) {
                            tmpl = _this.onetime_template;
                            onetime.push(item.id);
                        }
                        else
                            tmpl = _this.template;
                        item.sender_url = settings.sender_url.replace('{sender-id}', item.sender_id).replace('{notification-id}', item.id);
                        //console.log(settings.redirect);
                        if (settings.redirect)
                            item.redirect = settings.redirect.replace('{sender-id}', item.sender_id).replace('{notification-id}', item.id);
                        else
                            item.redirect = '#';
                        //console.log(item.redirect);
                        item.html = tmpl(item);
                        var note = new NotificationItem(item, _this.settings);
                        note.appendTo(_this.$list);
                    }
                    if (onetime.length)
                        _this.sendOneTime(onetime);
                    setTimeout(function () {
                        _this.$list.show('fast');
                    }, 100);
                });
            };
            NotificationsList.prototype.sendOneTime = function (ar) {
                $.post(this.notifications_set_old, JSON.stringify(ar)).done(function (res) { console.log(res); }).fail(function (err) { console.log(' erroro ' + err); });
            };
            NotificationsList.prototype.setHeader = function (data) {
                if (data && data.n)
                    this.$total.text('{' + data.n + ')');
                else
                    this.$total.text('');
            };
            NotificationsList.ON_LIST_CLICK = 'ON_LIST_CLICK';
            NotificationsList.ON_LIST_OPEN = 'ON_LIST_OPEN';
            NotificationsList.ON_LIST_CLOSE = 'ON_LIST_CLOSE';
            NotificationsList.emmiter = $({});
            return NotificationsList;
        })();
        Notifications.NotificationsList = NotificationsList;
    })(Notifications = grabop.Notifications || (grabop.Notifications = {}));
})(grabop || (grabop = {}));
//# sourceMappingURL=NotificationsList.js.map