define(['$','sl/sl','app'],function(require,exports,module) {
    var $=require('$'),
        sl=require('sl/sl'),
        app=require('app'),
        util=require('util');

    module.exports=sl.Activity.extend({
        template: 'views/start.html',
        events: {
            'tap .js_list li': function(e) {
                var target=$(e.currentTarget);
                target.toggleClass('curr').find('em').one($.fx.transitionEnd,function() {
                    target.hasClass('curr')?(target.find('em').css({ '-webkit-transition-delay': '0ms' }),target.find('i').css({ '-webkit-transition-delay': '200ms' })):target.find('em,i').css({ '-webkit-transition-delay': '' });
                });
            }
        },
        onCreate: function() {
            var that=this;
        },
        onStart: function() {
        },
        onResume: function() {
        },
        onDestory: function() {
        }
    });;
});