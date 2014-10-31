define(['$','sl/sl','app','sl/widget/loading','util/base64'],function(require,exports,module) {
    var $=require('$'),
        sl=require('sl/sl'),
        base64=require('util/base64'),
        app=require('app'),
        Loading=require('sl/widget/loading');

    module.exports=sl.Activity.extend({
        template: 'views/start1.html',
        events: {
            'tap .js_list li': function(e) {
                var target=$(e.currentTarget),
                    next;

                if(!target.hasClass('curr')) {
                    target.addClass('curr').find('em').one($.fx.transitionEnd,function() {
                        target.find('em').css({ '-webkit-transition-delay': '0ms' });
                        target.find('i').css({ '-webkit-transition-delay': '200ms' });
                    });

                    next=target.siblings('.curr').removeClass('curr');
                    next.find('em').one($.fx.transitionEnd,function() {
                        next.find('em,i').css({ '-webkit-transition-delay': '' });
                    });
                }
            },
            'tap .js_next': function() {
                var $target=this.$('.js_list li.curr');
                if(!$target.length) {
                    sl.tip("请先选择您喜爱的时尚搭配");
                    return;
                }
                this.$('.js_dialog img').attr({ src: $target.data('src') });
                this.$('.js_dialog .js_desc').html($target.data('name'));
                this.$('.js_dialog,.js_mask').show().removeClass('hide');
            },
            'tap .js_close': function() {
                this.$('.js_dialog,.js_mask').addClass('hide').one($.fx.transitionEnd,function() {
                    this.style.display='none';
                });
            },
            'tap .js_desc,.js_dialog img': function() {
                window.open(this.$('.js_list li.curr').data('open'));
            },
            'tap .js_accept': function() {
                var that=this,
                    code=base64.decode(that.route.query['share']).split('|');

                that.loading.load({
                    url: '/json/guess',
                    checkData: false,
                    data: {
                        noteid: code[0],
                        closeId: that.$('.js_list li.curr').data('id')
                    },
                    success: function(res) {
                        this.hideLoading();

                        if(res.result) {
                            that.forward('/right.html?share='+that.route.query['share']);
                        } else {
                            that.forward('/wrong.html');
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
            var that=this;

            that.$list=that.$('.js_list');

            that.loading=new Loading(that.$el);

            that.loading.load({
                url: '/json/closes',
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
        onDestory: function() {
        }
    });;
});