define(['$','sl/sl','app','sl/widget/loading'],function (require,exports,module) {
    var $=require('$'),
        sl=require('sl/sl'),
        app=require('app'),
        Loading=require('sl/widget/loading');

    module.exports=sl.Activity.extend({
        template: 'views/share.html',
        events: {
            'tap .js_get': function(){
                this.$('.js_dialog,.js_mask').show().removeClass('hide');
            }
        },
        onCreate: function () {
            var that=this;
        },
        onStart: function () {
        },
        onResume: function () {
        },
        onShow: function () {

        },
        onDestory: function () {
            this.loading&&this.loading.destory();
        }

    });
});
