/**
 * Created by VladHome on 3/2/2016.
 */
///<reference path="../../js/typings/jquery.d.ts"/>
///<reference path="../../js/typings/underscore.d.ts"/>
var grabop;
(function (grabop) {
    var VOMessage = (function () {
        function VOMessage() {
        }
        return VOMessage;
    })();
    grabop.VOMessage = VOMessage;
    var MessagesChat = (function () {
        function MessagesChat() {
            var _this = this;
            this.CANCEL = 'cancel';
            this.SENDING = 'sending';
            this.SENT = 'sent';
            this.listeners = {};
            this.$view = $('<div>').addClass(' MessagesChat');
            this.$view.load(baseUrl + 'modules/messages/MessagesChat.html', function (res) {
                _this.init();
            });
        }
        MessagesChat.prototype.on = function (evt, callBack) {
            if (!this.listeners[evt])
                this.listeners[evt] = [];
        };
        ;
        MessagesChat.prototype.dispatch = function (evt, data) {
            if (this.listeners[evt])
                this.listeners[evt].forEach(function (func) { func(data); });
        };
        MessagesChat.prototype.appendTo = function ($view) {
            $view.append(this.$view);
            return this.$view;
        };
        MessagesChat.prototype.init = function () {
            var _this = this;
            this.template = _.template(document.getElementById('chatmessage').innerHTML);
            this.$view.find('[data-id=btnSend]').click(function () {
                console.log('posting');
                var url = 'http://grabopwsdev.azurewebsites.net/messages/' + _this.id + '/history';
                var data = $('#message-to-send').val();
                _this.dispatch(_this.SENDING, data);
                $.post(url, data).done(function (res) {
                    console.log(res);
                    this.dispatch(this.SENT, res);
                    this.showMessages();
                });
            });
            var btnCancel = this.$view.find('[data-id=btnCancel]').click(function () {
                _this.dispatch('cancel', btnCancel);
            });
        };
        MessagesChat.prototype.parse = function () {
            var ar = this.data;
            var out = '';
            for (var i = 0, n = ar.length; i < n; i++) {
                var item = ar[i];
                item.cl = 'mu';
                out += this.template(item);
            }
            $('#ChatHistory').html(out);
            $('#Messages_Chat [data-id=total]').text(n);
        };
        MessagesChat.prototype.showMessages = function (id) {
            var _this = this;
            if (id)
                this.id = id;
            this.id = id;
            var url = 'http://grabopwsdev.azurewebsites.net/messages/' + this.id + '/history';
            //   var url= 'messages/history/'+messagechat;
            $.get(url).done(function (res) {
                _this.data = res;
                _this.parse();
                console.log(res);
            });
        };
        MessagesChat.prototype.getOpponent = function () {
        };
        return MessagesChat;
    })();
    grabop.MessagesChat = MessagesChat;
})(grabop || (grabop = {}));
//# sourceMappingURL=MessagesChat.js.map