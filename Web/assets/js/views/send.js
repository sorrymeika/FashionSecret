define(['$','sl/sl','app','sl/widget/loading'],function(require,exports,module) {
    var $=require('$'),
        sl=require('sl/sl'),
        app=require('app'),
        Loading=require('sl/widget/loading');

    module.exports=sl.Activity.extend({
        template: 'views/send.html',
        events: {
            'tap .js_list li': 'check',
            'tap .js_save': 'save'
        },
        onCreate: function() {
            var that=this;

            that.$list=that.$('.js_list');
            that.loading=new Loading(that.$list);

            var userinfo=JSON.parse(localStorage.getItem('USERINFO'));

            that.loading.load({
                url: '/json/user',
                pageSize: 100,
                data: {
                    role: 1,
                    shopId: that.route.data.shopid,
                    auth: userinfo.Auth,
                    account: userinfo.AccountName
                },
                success: function(res) {
                    this.hideLoading();
                    that.$list.html(that.tmpl("list",res));
                },
                error: function(res) {
                    this.hideLoading();
                    sl.tip(res.msg);
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
            var that=this,
                $check=this.$list.find('.check'),
                accountId=$check.attr('data-id');

            if(!accountId) {
                sl.tip("请选择派单人");
                return;
            }

            var userinfo=JSON.parse(localStorage.getItem('USERINFO'));

            that.loading.load({
                url: '/json/send',
                checkData: false,
                data: {
                    transferId: that.route.data.id,
                    accountId: accountId,
                    auth: userinfo.Auth,
                    account: userinfo.AccountName
                },
                success: function(res) {
                    this.hideLoading();
                    sl.tip("派单成功");

                    that.setResult('sendSuccess',res);
                    that.back('/');
                },
                error: function(res) {
                    this.hideLoading();
                    sl.tip(res.msg);
                }
            });


        }

    });
});
