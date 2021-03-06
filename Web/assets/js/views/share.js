﻿define(['$','sl/sl','app','sl/widget/loading','util/base64'],function(require,exports,module) {
    var $=require('$'),
        sl=require('sl/sl'),
        base64=require('util/base64'),
        app=require('app'),
        Loading=require('sl/widget/loading');

    module.exports=sl.Activity.extend({
        template: 'views/share.html',
        events: {
            'tap .js_get': function() {
                this.$('.js_dialog,.js_mask').show().removeClass('hide');
                this.$('.js_dialog').css({ top: Math.max((window.innerHeight-this.$('.js_dialog').height())/2,0),marginTop: 0 });
            },
            'tap .js_close': function() {
                this.$('.js_dialog,.js_mask').addClass('hide').one($.fx.transitionEnd,function() {
                    this.style.display='none';
                });
            },
            'change .js_province': function(e) {
                var value=e.currentTarget.value,
                    $city=this.$('.js_city'),
                city=$city[0];
                city.options.length=0;

                if(!value) {
                    city.options.add(new Option('',""));
                } else {
                    city.options.add(new Option('正在载入...',""));

                    $.ajax({
                        url: app.url('/json/region?action=city&provid='+value),
                        dataType: 'json',
                        success: function(res) {
                            city.options[0].text=('请选择');
                            $.each(res.data,function(i,item) {
                                city.options.add(new Option(item.name,item.id));
                            });
                        },
                        error: function(res) {
                            city.options[0].text=(res&&res.msg||'网络错误');
                        }
                    });
                }
            },
            'tap .js_accept': function() {
                var that=this,
                    data={
                        noteId: base64.decode(that.route.data.data).split('|')[0],
                        name: that.$('.js_name').val(),
                        email: that.$('.js_email').val(),
                        cityid: that.$('.js_city')[0].value,
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

                        that.$('.js_dialog').html('<b class="btn_close js_close"></b><div class="finishimg"></div><p>记得分享好友，才能参与抽奖噢！</p>');

                        //                        if(res.prize) {
                        //                            sl.common.prize=res.prize;
                        //                            localStorage&&localStorage.setItem('prize',JSON.stringify(res.prize));
                        //                            that.forward('/prize/'+res.result);
                        //                        } else {
                        //                            that.forward('/sorry.html');
                        //                        }

                    },
                    error: function(res) {
                        this.hideLoading();
                        sl.tip(res.msg);
                    }
                });
            }
        },
        onCreate: function() {
            var that=this;

            var $province=that.$('.js_province'),
                province=$province[0];

            province.options.length=0;
            province.options.add(new Option('正在载入...',""));

            $.ajax({
                url: app.url('/json/region?action=province'),
                dataType: 'json',
                success: function(res) {
                    province.options[0].text=('请选择');
                    $.each(res.data,function(i,item) {
                        province.options.add(new Option(item.name,item.id));
                    });
                },
                error: function(res) {
                    province.options[0].text=(res&&res.msg||'网络错误');
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
