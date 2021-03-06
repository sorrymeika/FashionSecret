﻿define(['$','sl/sl','app','sl/widget/dialog','sl/widget/loading','util/base64'],function(require,exports,module) {
    var $=require('$'),
        sl=require('sl/sl'),
        base64=require('util/base64'),
        app=require('app'),
        Dialog=require('sl/widget/dialog'),
        Loading=require('sl/widget/loading');

    module.exports=sl.Activity.extend({
        template: 'views/prize1.html',
        events: {
            'tap .js_go': function() {
                sl.confirm("请确认填写收奖地址，否则将视为放弃奖品",function() {
                    location.href="index.html";
                });
            },
            'tap .js_get': function() {
                this.$('.js_dialog,.js_mask').show().removeClass('hide');
                this.$('.js_dialog').css({ top: Math.max((window.innerHeight-this.$('.js_dialog').height())/2,0),marginTop: 0 });
            },
            'tap .js_accept': function() {
                var that=this,
                    code=base64.decode(that.route.data.data).split('|'),
                    data={
                        userId: code[0],
                        prizeId: code[1],
                        receiver: that.$('.js_receiver').val(),
                        phone: that.$('.js_phone').val(),
                        zip: that.$('.js_zip').val(),
                        address: that.$('.js_address').val()
                    };

                if(!data.receiver) {
                    sl.tip('请填写收件人');
                    return;
                }
                if(!data.phone) {
                    sl.tip('请填写电话');
                    return;
                }
                if(!data.zip) {
                    sl.tip('请填写邮编');
                    return;
                }
                if(!data.address) {
                    sl.tip('请填写地址');
                    return;
                }

                !that.loading&&(that.loading=new Loading(that.$el));
                that.loading.load({
                    url: '/json/address',
                    type: 'POST',
                    checkData: false,
                    data: data,
                    success: function(res) {
                        this.hideLoading();

                        sl.tip('填写成功，感谢您的参与！')

                        that.$('.js_dialog,.js_mask').addClass('hide').one($.fx.transitionEnd,function() {
                            this.style.display='none';
                        });

                    },
                    error: function(res) {
                        this.hideLoading();
                        sl.tip(res.msg);
                    }
                });
            }
        },
        onCreate: function() {
            var that=this,
                data=sl.common.prize||JSON.parse(localStorage.getItem('prize'));

            that.$('.js_text').html(data.PrizeName);
            that.$('.js_img').attr('src',data.Picture);
        },
        onStart: function() {
        },
        onResume: function() {
        },
        onShow: function() {

        },
        onDestory: function() {
            this.loading&&this.loading.destory();
        }

    });
});
