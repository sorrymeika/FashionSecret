define(['$','sl/sl','app'],function(require,exports,module) {
    var $=require('$'),
        sl=require('sl/sl'),
        app=require('app');

    module.exports=sl.Activity.extend({
        template: 'views/seller.html',
        events: {
            'tap .js_save': 'save',
            'tap .js_back': 'back'
        },
        onCreate: function() {
            var that=this,
                sellerInfo=sl.common.sellerInfo;

            if(sellerInfo) {
                this.$('[name="name"]').val(sellerInfo.name);
                this.$('[name="mobile"]').val(sellerInfo.mobile);
                this.$('[name="address"]').val(sellerInfo.address);
            }
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
        },

        save: function() {
            var sellerInfo={
                name: this.$('[name="name"]').val(),
                mobile: this.$('[name="mobile"]').val(),
                address: this.$('[name="address"]').val()
            };

            if(!sellerInfo.name) {
                sl.tip('请输入姓名');
                return;
            }

            if(!sellerInfo.name) {
                sl.tip('请输入手机');
                return;
            } else if(!/1\d{10}/.test(sellerInfo.mobile)) {
                sl.tip('请输入正确的手机');
                return;
            }

            if(!sellerInfo.address) {
                sl.tip('请输入地址');
                return;
            }

            sl.common.sellerInfo=sellerInfo;
            this.setResult('sellerChange',sellerInfo);
            this.back();
        }

    });
});
