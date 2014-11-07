define(['$','sl/sl','app','sl/widget/loading','sl/widget/dialog','extend/iscroll'],function(require,exports,module) {
    var $=require('$'),
        sl=require('sl/sl'),
        Loading=require('sl/widget/loading'),
        iScroll=require('extend/iscroll'),
        Dialog=require('sl/widget/dialog');

    module.exports=sl.Activity.extend({
        template: 'views/index.html',
        events: {
            'tap .js_next': 'select'
        },
        onCreate: function() {
            var that=this;


        },
        onStart: function() {
        },
        onResume: function() {
        },
        onShow: function() {
            var that=this;

            that.$('.js_main').css({ height: 100,minHeight: 100,overflow: 'hidden' }).iScroll({
                bounceTop: false,
                bounceTop: false,
                bounce: false
            }).iScroll("refresh");
        },

        onDestory: function() {
            console.log("index onDestory");
        },

        select: function(e) {
        }
    });
});
