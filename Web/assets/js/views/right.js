﻿define(['$','sl/sl','app','util/base64','sl/widget/loading'],function(require,exports,module) {
    var $=require('$'),
        sl=require('sl/sl'),
        base64=require('util/base64'),
        Loading=require('sl/widget/loading'),
        app=require('app');

    module.exports=sl.Activity.extend({
        template: 'views/right.html',
        events: {
            'tap .js_get': function() {
                this.$('.js_dialog,.js_mask').show().removeClass('hide');
            },
            'tap .js_accept': function() {
                var that=this,
                    data={
                        noteId: 0,
                        name: that.$('.js_name').val(),
                        email: that.$('.js_email').val(),
                        mobile: that.$('.js_mobile').val()
                    };

                if(!data.name) {
                    sl.tip('请填写姓名');
                    return;
                }
                if(!data.email) {
                    sl.tip('请填写邮箱');
                    return;
                }
                if(!data.mobile) {
                    sl.tip('请填写手机');
                    return;
                }

                !that.loading&&(that.loading=new Loading(that.$el));
                that.loading.load({
                    url: '/json/play',
                    type: 'POST',
                    checkData: false,
                    data: data,
                    success: function(res) {
                        this.hideLoading();

                        if(res.prize) {
                            sl.common.prize=res.prize;
                            localStorage&&localStorage.setItem('prize',JSON.stringify(res.prize));
                            that.forward('/prize1/'+res.result);
                        } else {
                            that.forward('/sorry1.html');
                        }
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
                code=base64.decode(that.route.query['share']).split('|');

            that.loading=new Loading(that.$el);

            that.loading.load({
                url: '/json/secret',
                data: { noteid: code[0] },
                checkData: false,
                success: function(res) {
                    this.hideLoading();
                    that.$('.js_text').html(res.data.NoteText.replace(/\r\n/g,'<br>').replace(/\n/g,'<br>').replace(/\r/g,'<br>'));
                },
                error: function(res) {
                    this.hideLoading();
                    that.$('.js_text').html("网络错误！");
                }
            });

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
