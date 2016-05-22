/**
 * Created by VladHome on 3/1/2016.
 */
    ///<reference path="../typings/jquery.d.ts"/>
    ///<reference path="../typings/underscore.d.ts"/>
    ///<reference path="../Base.ts"/>
    ///<reference path="../Alliance.ts"/>


module grabop {

    export class ServicesCollection {
        private $list:JQuery;
        onChange:Function;
        onData:Function;
        $selected:JQuery;
        selectedItem:ServiceVO;
        selectedIndex:number;
        data:ServiceVO[];
        template:any;
        dispatcher:JQuery = $({});

        constructor(private $view:JQuery, private opt:{get:string;user_id:string}) {
            this.$list = $view.find('[data-js=list]');
            this.template = _.template($('#serviceItemImage').html());

            this.$list.on('click', 'a', (evt)=> {
                var id:number = Number($(evt.currentTarget).data('id'));
                this.$selected = $(evt.currentTarget);
                var item:ServiceVO = this.getItemById(id);
                this.selectedItem = item;
                if (item && this.onChange)this.onChange(item)
            })
            this.loadData();
        }

        renderItem(item):string {
            return '<li class="" data-toggle="tooltip" data-placement="top" ><a href="#/service/' + item.id + '" data-id="' + item.id + '"  title="' + item.title + '" style="background-image: url(' + item.image + ')" ></a></li>';
        }

        getItemById(id:number) {
            var ar = this.data
            for (var i = 0, n = ar.length; i < n; i++) {
                if (ar[i].id == id) return ar[i];
            }
            return null;
        }

        selectItem(id):void {
            var item:ServiceVO;
            if (id === 0) item = this.data[0];
            else item = this.getItemById(id);
            this.selectedItem = item;
            if (item && this.onChange)this.onChange(item);
        }

        setData(data:ServiceVO[]):ServicesCollection {
            this.data = data;
            return this;
        }

        render():void {
            var ar = this.data;
            var out = '';
            for (var i = 0, n = ar.length; i < n; i++) {
                out += this.renderItem(ar[i])
            }

            this.$list.html(out);
        }

        loadData() {
            var url = this.opt.get + 'services/' + this.opt.user_id;
            console.log('load data '+url);
            $.get(url).done((s)=> {
                // console.log(s);
                var res:ServiceVO[] = [];
                try {
                    var ar = JSON.parse(s);
                    for (var i = 0, n = ar.length; i < n; i++)res.push(new ServiceVO(ar[i]))

                } catch (e) {
                    console.log('Error ' + s, e);
                }

                if (res.length) {
                    this.data = res;
                    this.setData(res).render();
                    if (this.onData)this.onData(res);
                    var hash:string = window.location.hash;
                    var id:number = 0;
                    var h = hash.split('/');
                    if (h.indexOf('service') !== -1)  id = Number(h.pop());
                    this.selectItem(id);
                }
            })
        }

    }
}