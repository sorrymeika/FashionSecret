define(['$','sl/sl','app','sl/widget/loading'],function(require,exports,module) {
    var $=require('$'),
        sl=require('sl/sl'),
        app=require('app'),
        Loading=require('sl/widget/loading');

    module.exports=sl.Activity.extend({
        template: 'views/shop.html',
        events: {
            'tap .js_list li': 'check',
            'tap .js_save': 'save',
            'tap .js_back': 'back'
        },
        onCreate: function() {
            var that=this;

            that.$list=that.$('.js_list');

            that.loading=new Loading(that.$el);

            that.loading.load({
                url: '/json/shop',
                success: function(res) {
                    this.hideLoading();
                    that.$list.html(that.tmpl("list",res));

                    if(sl.common.shopInfo&&sl.common.shopInfo.shopId) {
                        var $target=that.$('[data-id="'+sl.common.shopInfo.shopId+'"]')
                        $target.addClass('check').siblings('.check').removeClass('check');
                    }
                }
            });

        },
        onStart: function() {
        },
        onResume: function() {
        },
        onShow: function() {
            if(!localStorage.getItem('USERINFO')) {
                this.back('/login.html');
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
            var $check=this.$list.find('.check'),
                shopName=$check.html(),
                shopId=$check.attr('data-id');

            sl.common.shopInfo={
                shopId: shopId,
                shopName: shopName
            };
            this.setResult('shopChange',sl.common.shopInfo);
            this.back();
        }

    });
});
