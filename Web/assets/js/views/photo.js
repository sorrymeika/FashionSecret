define(['$','sl/sl','app','sl/widget/loading'],function(require,exports,module) {
    var $=require('$'),
        sl=require('sl/sl'),
        app=require('app'),
        imglazyload=require('sl/widget/imglazyload'),
        Loading=require('sl/widget/loading');

    module.exports=sl.Activity.extend({
        template: 'views/photo.html',
        events: {
            'tap .js_list li.item': 'check',
            'tap .js_save': 'save',
            'tap .js_back': 'back'
        },
        onCreate: function() {
            var that=this;

            that.$list=that.$('.js_list');

            app.queryThumbnailList(function(res) {
                that.$list.append(that.tmpl('list',{
                    data: res
                }));

                that.$('.js_lazy[data-url]').imglazyload().removeClass('js_lazy');
                imglazyload();
            });

        },
        onStart: function() {
        },
        onResume: function() {
        },
        onShow: function() {
            if(!localStorage.getItem('USERINFO')) {
                this.back('/');
            }
        },
        onDestory: function() {
            this.loading&&this.loading.destory();
        },

        check: function(e) {
            var $target=$(e.currentTarget);

            $target.addClass('check').siblings('.check').removeClass('check');
        },

        save: function() {
        }

    });
});
