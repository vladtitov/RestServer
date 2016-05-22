/**
 * Created by Vlad on 5/3/2016.
 */
///<reference path="../../js/Base.ts"/>
var grabop;
(function (grabop) {
    var SignIn = (function () {
        function SignIn(options) {
            var _this = this;
            this.url = 'http://grabopws.azurewebsites.net/auth';
            this.$container = $('[data-id=sign-in-container]').load('modules/com/sign-in.html', function (res) {
                _this.init();
            });
        }
        SignIn.prototype.init = function () {
            var _this = this;
            this.$form = this.$container.find("form").submit(function (evt) {
                evt.preventDefault();
                _this.onSubmit();
            });
            // this.$user = this.$container.find('[data-id=user]');
            //  this.$pass = this.$container.find('[data-id=pass]');
            this.$close = this.$container.find('[data-id=close]');
            this.$submit = this.$container.find('[data-id=submit]');
            this.$message = this.$container.find('[data-id=message]').hide();
            // this.$submit.click(()=>this.onSubmit());
        };
        SignIn.prototype.onSubmit = function () {
            var _this = this;
            var valid = true;
            var obj = {};
            this.$form.find('input').each(function (i, input) {
                obj[input.name] = input.value;
                // input.checkValidity();
            });
            this.$submit.attr('disabled', true);
            $.post(this.url, obj).done(function (res) {
                console.log(res);
                _this.$submit.attr('disabled', false);
            }).fail(function (res) {
                console.log(res);
                _this.$submit.attr('disabled', false);
            });
        };
        return SignIn;
    }());
    grabop.SignIn = SignIn;
})(grabop || (grabop = {}));
var grabopSignin = new grabop.SignIn({});
//# sourceMappingURL=sign-in.js.map