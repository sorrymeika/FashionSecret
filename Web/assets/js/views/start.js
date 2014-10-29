define(['$','sl/sl','app','sl/widget/loading'],function (require,exports,module) {
    var $=require('$'),
        sl=require('sl/sl'),
        app=require('app'),
        Loading=require('sl/widget/loading');

    module.exports=sl.Activity.extend({
        template: 'views/start.html',
        events: {
            'tap .js_list li': function (e) {
                var target=$(e.currentTarget),
                    next;

                if(!target.hasClass('curr')) {
                    target.addClass('curr').find('em').one($.fx.transitionEnd,function () {
                        target.find('em').css({ '-webkit-transition-delay': '0ms' });
                        target.find('i').css({ '-webkit-transition-delay': '200ms' });
                    });

                    next=target.siblings('.curr').removeClass('curr');
                    next.find('em').one($.fx.transitionEnd,function () {
                        next.find('em,i').css({ '-webkit-transition-delay': '' });
                    });
                }
            },
            'tap .js_next': function () {
                var $target=this.$('.js_list li.curr');
                if(!$target.length) {
                    sl.tip("请先选择您喜爱的时尚搭配");
                    return;
                }
                this.$('.js_dialog img').attr({ src: $target.data('src') });
                this.$('.js_dialog .js_desc').html($target.data('name'));
                this.$('.js_dialog,.js_mask').show().removeClass('hide');
            },
            'tap .js_close': function () {
                this.$('.js_dialog,.js_mask').addClass('hide').one($.fx.transitionEnd,function () {
                    this.style.display='none';
                });
            },
            'tap .js_accept': function () {
                var $target=this.$('.js_list li.curr');

                this.forward('/write/'+$target.data('id')+'.html');
            }
        },
        onCreate: function () {
            var that=this;

            that.$list=that.$('.js_list');

            that.loading=new Loading(that.$el);

            that.loading.load({
                url: '/json/closes',
                success: function (res) {
                    this.hideLoading();
                    that.$list.html(that.tmpl("list",res));
                }
            });
        },
        onStart: function () {
        },
        onResume: function () {
        },
        onDestory: function () {
        }
    });;
});