define(['$','sl/sl','app','sl/widget/loading'],function(require,exports,module) {
    var $=require('$'),
        sl=require('sl/sl'),
        Loading=require('sl/widget/loading'),
        app=require('app');

    module.exports=sl.Activity.extend({
        template: 'views/modify.html',
        events: {
            'tap .js_save': 'save',
            'blur input': function(e) {
                //$(e.currentTarget).hide();
            },
            'tap .add_form li,.add_plate': function(e) {
                //$(e.currentTarget).find('input').show().focus();
                //e.preventDefault();
            }
        },
        onCreate: function() {
            var that=this;

            that.$('.js_type').html(that.route.data.type==0?"过户":"转籍");

            if(that.route.data.type==1) {
                that.$('.js_region').show();
                that.$('.js_prize_bd').hide();
            } else {
                that.$('.js_region').hide();
                that.$('.js_prize_bd').show();
            }

            that.listenResult("shopChange",function(e,data) {
                that.$('.js_shop').html(data.shopName);
            });
            that.listenResult("buyerChange",function(e,data) {
                that.$('.js_buyer').html(data.name);
            });
            that.listenResult("sellerChange",function(e,data) {
                that.$('.js_seller').html(data.name);
            });

            var userinfo=JSON.parse(localStorage.getItem('USERINFO'));

            that.loading=new Loading(that.$('.addwrap'));
            that.loading.load({
                url: '/json/transfer?action=get',
                data: {
                    auth: userinfo.Auth,
                    account: userinfo.AccountName,
                    id: that.route.data.id
                },
                checkData: false,
                success: function(res) {
                    this.hideLoading();

                    var data=res.data;
                    that.$('.js_plate_number').val(res.data.PlateNumber);
                    that.$('.js_price').val(res.data.Price);
                    that.$('.js_car_type').val(res.data.CarType);
                    that.$('.js_txt_region').val(res.data.TransferRegion);
                    that.$('.js_shop').html(res.data.ShopName);
                    that.$('.js_buyer').html(data.Buyer);
                    that.$('.js_seller').html(data.Seller);

                    sl.common.shopInfo={ shopId: res.data.ShopID,shopName: res.data.ShopName };
                    sl.common.buyerInfo={ name: data.Buyer,mobile: data.BuyerMobile,address: data.BuyerAddress };
                    sl.common.sellerInfo={ name: data.Seller,mobile: data.SellerMobile,address: data.SellerAddress };
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
        onShow: function() {
            if(!localStorage.getItem('USERINFO')) {
                this.back('/login.html');
            }
        },
        onDestory: function() {
            sl.common.shopInfo=null;
            sl.common.buyerInfo=null;
            sl.common.sellerInfo=null;
            this.loading&&this.loading.destory();
        },

        save: function() {
            var that=this,
                sellerInfo=sl.common.sellerInfo,
                data={
                    plateNumber: that.$('.js_plate_number').val(),
                    price: that.$('.js_price').val(),
                    carType: that.$('.js_car_type').val(),
                    region: that.$('.js_txt_region').val()
                };

            if(!data.plateNumber) {
                sl.tip("请填写车牌号");
                return;
            }
            if(!data.carType) {
                sl.tip("请填写车型");
                return;
            }
            if(that.route.data.type==1&&!data.region) {
                sl.tip("请填写转籍地");
                return;
            }

            if(!sl.common.buyerInfo) {
                sl.tip("请填写买方联系方式");
                return;
            }
            if(!sellerInfo) {
                sl.tip("请填写卖方联系方式");
                return;
            }
            if(!sl.common.shopInfo) {
                sl.tip("请选择门店");
                return;
            }
            $.extend(data,sl.common.buyerInfo,sl.common.shopInfo);

            var userinfo=JSON.parse(localStorage.getItem('USERINFO'));

            data.seller=sellerInfo.name;
            data.sellerMobile=sellerInfo.mobile;
            data.sellerAddress=sellerInfo.address;
            data.auth=userinfo.Auth;
            data.account=userinfo.AccountName;
            data.type=that.route.data.type;
            data.id=that.route.data.id;

            !that.loading&&(that.loading=new Loading(that.$el));
            that.loading.load({
                url: '/json/modify',
                type: 'POST',
                checkData: false,
                data: data,
                success: function(res) {
                    this.hideLoading();

                    that.setResult('addSuccess');
                    that.back('/');
                },
                error: function(res) {
                    this.hideLoading();
                    sl.tip(res.msg);
                }
            });

        }

    });
});
