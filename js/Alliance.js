///<reference path="typings/jquery.d.ts"/>
///<reference path="typings/underscore.d.ts"/>
///<reference path="Base.ts"/>
var grabop;
(function (grabop) {
    var Alliance = (function () {
        function Alliance($view, opt) {
            var _this = this;
            this.$view = $view;
            this.opt = opt;
            this.renderer = new grabop.RenderController($view);
            this.$name = $view.find('[name=name]').on('input', function (evt) {
                console.log(_this.$name.val());
            });
            this.renderer.getObject('isfull').on('change', function (evt) {
                //console.log(evt);
                var isfull = $(evt.currentTarget).prop('checked');
            });
            this.renderer.getObject('displaymembers').on('change', function (evt) {
                var dispalynames = $(evt.currentTarget).prop('checked');
            });
            this.$invite = $view.find('[data-view=Invite]');
            this.$invite.find('[type=submit]').click(function (evt) {
                evt.preventDefault();
                var form = new FormData(document.getElementById('formInvite'));
                console.log(evt);
                // $.post(this.opt.service_get+'alliances/' + this.vo.id + '/members',form).done((s)=>{
                //
                // })
                console.log(form);
            });
        }
        Alliance.prototype.setData = function (vo) {
            var alns = vo.alliance;
            this.vo = vo;
            this.renderer.setData(alns);
            if (alns.isfull)
                this.$invite.hide();
            else
                this.$invite.show();
            this.render();
            this.loadData();
            return this;
        };
        Alliance.prototype.render = function () {
        };
        Alliance.prototype.loadData = function () {
            $.get(this.opt.service_get + 'alliances/' + this.vo.id + '/members').done(function (s) {
                //  console.log(s);
                var res;
                try {
                    res = JSON.parse(s);
                }
                catch (e) {
                }
                if (res) {
                    console.log(res);
                }
            });
        };
        return Alliance;
    })();
    grabop.Alliance = Alliance;
})(grabop || (grabop = {}));
//# sourceMappingURL=Alliance.js.map