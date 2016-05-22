/**
 * Created by Vlad on 5/3/2016.
 */
/**
 * Created by Vlad on 5/3/2016.
 */
///<reference path="../../js/Base.ts"/>
var grabop;
(function (grabop) {
    var JoinUs = (function () {
        function JoinUs(options) {
            var _this = this;
            this.url = 'http://grabopws.azurewebsites.net/auth';
            this.$container = $('[data-id=join-us-container]').load('modules/com/join-us.html', function (res) {
                _this.init();
            });
        }
        JoinUs.prototype.init = function () {
            var _this = this;
            this.$user = this.$container.find('[data-id=user]');
            this.$pass = this.$container.find('[data-id=pass]');
            this.$close = this.$container.find('[data-id=close]');
            this.$submit = this.$container.find('[data-id=submit]');
            this.$message = this.$container.find('[data-id=message]').hide();
            this.$submit.click(function () { return _this.onSubmit(); });
        };
        JoinUs.prototype.onSubmit = function () {
            var _this = this;
            this.$submit.attr('disabled', true);
            var user = this.$user.val();
            var pass = this.$pass.val();
            $.post(this.url, { UserName: user, Password: pass }).done(function (res) {
                console.log(res);
                _this.$submit.attr('disabled', false);
            }).fail(function (res) {
                console.log(res);
                _this.$submit.attr('disabled', false);
            });
        };
        return JoinUs;
    }());
    grabop.JoinUs = JoinUs;
})(grabop || (grabop = {}));
var grabopSignin = new grabop.JoinUs({});
//# sourceMappingURL=join-us.js.map