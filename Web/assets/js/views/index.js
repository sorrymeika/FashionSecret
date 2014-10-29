define(['$','sl/sl','app','sl/widget/loading','sl/widget/dialog'],function(require,exports,module) {
    var $=require('$'),
        sl=require('sl/sl'),
        Loading=require('sl/widget/loading'),
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
        },

        onDestory: function() {
            console.log("index onDestory");
        },

        select: function(e) {
        }
    });
});
