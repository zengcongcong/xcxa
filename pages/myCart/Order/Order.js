var network = require("../../../utils/untils.js");
var url = 'https://dev.unionglasses.com';
function checkedUserCode(val) { //纳税人识别号
  return /^[a-zA-Z]|[0-9]+$/.test(val);
};
function isValidMobile(val) { //手机号校验
  return /^1[0-9]{10}$/.test(val);
};

function isValidPhone(val) {
  return /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(val)
}
function isValidMail(val) {
  return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(val);
}


Page({

  /**
   * 页面的初始数据
   */
  data: {
    loadingHidden:false,
    item: "success_no_circle",
    chooseS: false,
    shopxq:false,
    radios:"",
    chooseS1: false,
    hiddens: false,
    hiddens1: true,
    selinfo:[],
    selected: {
      1: true,
      2: false,
      3: false
    },
    company:true,
    yhj: "",
    qi: false,
    gred: false,
    showsed: false,
    watch: false,
    bindPickerChang: false,
    showView: false,
    ishows: false,
    iswatch: false,
    shows: true,
    infos:{},
    definfo:{},
    items:[],
    coupons:[],
    values:[],
    taitour:"",
    nsuir:"",
    numbersed:"",
    kaihuh:"",
    yhh:"",
    adrees:"",
    phone:"",
    usenanme:"",
    usenumber:"",
    usemoblie:"",
    numsed:"",
    address_index:0,
    freight:0,
    goodsPrice:0,
    attrTotal: 0,
    show_coupount:[],
    shopcopune:[],
    goods_index:0,
    indexeds:0,
    commonCouponPrice:0,
    commonCouponId:0,
    totalCouponPrice:0,  
    flags: true,
    inputValue:"",
    },
  // 备注说明
  bulr:function(e){
    console.log(e)
    var index = e.target.dataset.index
    this.setData({
      ['infos.shopinf[' + index + '].content']: e.detail.value,
    })
    // console.log(this.data.infos.shopinf);
  },

  // 备注
  beizhu: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    that.setData({
      ['infos.shopinf[' + index + '].isShow']: (!that.data.infos.shopinf[index].isShow)
    })
    
  },
  // 确定
  qued:function(e){
    console.log(e)
    var that = this;
    var index = e.currentTarget.dataset.index;  
    that.setData({
      ['infos.shopinf[' + index + '].isShow']:false,
    })

  },
  // 取消
  qx: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    that.setData({
      ['infos.shopinf[' + index + '].content']: "",
      ['infos.shopinf[' + index + '].isShow']: false,
    })


  },

  youhuij: function (e) {
    var that = this;

    let index = e.currentTarget.dataset.index;

    that.data.yuj[index].status = 1;

    that.setData({
      ['yuj[' + index + '].ljsy']: '领取成功',
      ['yuj[' + index + '].status']: 1
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var params = {};
    if (options.sc_id == undefined){
      params.gid = options.gid;
      params.aid = options.aid;
      params.atid = options.atid;
    }else{
      params.sc_id = options.sc_id;
    }
    // params.sc_id = ['1322'];
    // params.sc_id = ['1322','1324'];
    // params.sc_id = ['1347','1368'];
    // params.sc_id = ['1222'];
    this.getinfo(params);
    iswatch: (options.iswatch == "true" ? true : false)
    gred: (options.gred == "true" ? true : false)
    qi: (options.qi == "true" ? true : false)
    showsed: (options.showsed == "true" ? true : false)
    watch: (options.watch == "true" ? true : false)

  },
  // 列表
  getinfo:function(params){
    var that=this
    var Url = url + '/api/order/confirmOrder';
    network.POST(Url, params,
      {
        success: function (res) {
          if (res.data._c == 0) {
            var infos = res.data.orderinf;
            var shopinfos=[];
            for (var i = 0; i < infos.shopinf.length; i++) {
              shopinfos[i] = infos.shopinf[i]||{}
              shopinfos[i].img_src = url+infos.shopinf[i].img_src
              shopinfos[i].isShow = false;
              shopinfos[i].content = '';
              shopinfos[i].coupount = [];
              shopinfos[i].isShowCouponInfo = false;
              shopinfos[i].couponPrice = 0;
            }

            var definfo=[];
            for(var i=0;i<infos.address.length;i++){
              var item = infos.address[i]
              if (item.isChecked){
                definfo = item
              }
            }
            var items=[];
            if (infos.shops.get && infos.shops.get.length > 0) {
              items = infos.shops.get
            } else if (infos.shops.try && infos.shops.try.length > 0) {
              items = infos.shops.try
            }
            that.setData({
              infos,
              definfo, items,
              loadingHidden:true,
            })
    
            that.CouponList();
            that.caculateFreight();
            that.goodsTotalPrice();
            that.bond();
            that.caculateCouponPrice();
           
          }else{
            var new_params = JSON.stringify(params);
            if(res.data._m == '地址为空')
            {
              console.log(222)
              wx.navigateTo({
                url: '../../person/Address/add/add?isOrder=1&new_params='+new_params,
              })
            }
          }
        },
        fail: function (res) {
          wx.showToast({
            title: '网络错误',
          })
        },
    })
  },

  caculateFreight:function()
  {
    var infos = this.data.infos;
    var shopinfos = this.data.infos.shopinf;
    var address_index = this.data.address_index;
    var freight = 0;
    for (var i = 0; i < shopinfos.length; i++) {
      // console.log(shopinfos[i].dfc);
      if (shopinfos[i].sn && parseInt(shopinfos[i].sn) != 0) {

        var sn = shopinfos[i].sn;
        var cityArr = sn.split(',');

        var cityTest = 0;

        if (cityArr.length > 0) {
          for (var j = 0; j < cityArr.length; j++) {
            if (cityArr[j].indexOf(infos.address[address_index].city) != -1) {
              cityTest = 1;
              break;
            }
          }
        }

        if (cityTest == 1) {
          if (shopinfos[i].sfc < shopinfos[i].num) {
            freight += parseFloat(shopinfos[i].sp) + ((parseInt(shopinfos[i].num) - parseInt(shopinfos[i].sfc)) * (parseFloat(shopinfos[i].sap) / parseFloat(shopinfos[i].sac)));
          } else {
            freight += parseFloat(shopinfos[i].sp);
          }
        } else if (cityTest == 0) {
          if (shopinfos[i].dfc < shopinfos[i].num) {
            freight += parseFloat(shopinfos[i].dp) + ((parseInt(shopinfos[i].num) - parseInt(shopinfos[i].dfc)) * (parseFloat(shopinfos[i].ap) / parseFloat(shopinfos[i].ac)));
          } else {
            freight += parseFloat(shopinfos[i].dp);
          }
        }
      } else {
        if (parseInt(shopinfos[i].dfc) < parseInt(shopinfos[i].num) && parseInt(shopinfos[i].dfc) > 0) {
          freight += parseFloat(shopinfos[i].dp) + ((parseInt(shopinfos[i].num) - parseInt(shopinfos[i].dfc)) * (parseFloat(shopinfos[i].ap) / parseFloat(shopinfos[i].ac)));
        } else {
          freight += parseFloat(shopinfos[i].dp);
        }
      }
    }
    this.setData({
      freight,
    })
    
  },
  // 商品总额
  goodsTotalPrice:function(){
    var that =this;
  
    var shopinf = that.data.infos.shopinf;
    var goodsPrice = 0;
    for (var i = 0; i < shopinf.length;i++){
      goodsPrice += parseFloat(shopinf[i].price) * shopinf[i].num;
    }

    that.setData({
      goodsPrice: Number(goodsPrice.toFixed(2)),
    })
  },
  // 保证金
  bond: function () {
    var that = this;
    // console.log(that.data.infos);
    var shopinf = that.data.infos.shopinf;
    var attrTotal = 0;
    for (var i = 0; i < shopinf.length; i++) {
      attrTotal += (shopinf[i].price * (shopinf[i].insurance / 100) * shopinf[i].num);
    }
    that.setData({
      attrTotal: Number(attrTotal.toFixed(2)),
    })

  },
  // 点击搜索
  search:function(e){
    var that=this;
    var obj = network.animations(500, false);
    that.setData(obj)
    var shopitems = [];
    for (var i = 0; i < that.data.items.length; i++) {
      shopitems[i] = that.data.items[i] || {};
      shopitems[i].jiantou = false;
      shopitems[i].bigs = false;
      shopitems[i].add = false;
      shopitems[i].lei = false;
      shopitems[i].color = true;
      shopitems[i].shows = true;
    }
    that.setData({
      items: shopitems
    })
    that.setData({ flags: false })
  },
 
  chooseS: function (e) {
    var that = this
    var chooseS = that.data.chooseS;
    // 创建一个动画实例
    var animation = wx.createAnimation({
      // 动画持续时间
      duration: 500,
      // 定义动画效果，当前是匀速
      timingFunction: 'linear'
    })
    that.animation = animation
    animation.translateY(200).step()
    // 用setData改变当前动画
    that.setData({
      // 通过export()方法导出数据
      animationDatas: animation.export(),
      // 改变view里面的Wx：if
      chooseS: true,

    })
    // 设置setTimeout来改变y轴偏移量，实现有感觉的滑动
    setTimeout(function () {
      animation.translateY(0).step()
      that.setData({
        animationDatas: animation.export(),
      })
    }, 200)
  },
  shopxq:function(e){
    var that = this;
    var index = e.currentTarget.dataset.index;
    console.log(that.data.infos.shopinf)
    that.setData({
      show_coupount: that.data.infos.shopinf[index].coupount,
      goods_index: index
    })

    var chooseS = that.data.chooseS;
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'linear'
    })
    that.animation = animation
    animation.translateY(200).step()
    that.setData({
      animations: animation.export(),
      shopxq: true,
    })
    // 设置setTimeout来改变y轴偏移量，实现有感觉的滑动
    setTimeout(function () {
      animation.translateY(0).step()
      that.setData({
        animations: animation.export(),
      })
    }, 200)
  },

  //计算总优惠券优惠额度
  caculateCouponPrice:function()
  {
   
    var shopinf = this.data.infos.shopinf;
    var totalCouponPrice = 0;
    for (var i = 0; i < shopinf.length;i++){    
      totalCouponPrice += parseFloat(shopinf[i].couponPrice);
    }

    totalCouponPrice += parseFloat(this.data.commonCouponPrice);
    
    this.setData({
      totalCouponPrice: parseFloat(totalCouponPrice),
    })
  },

  chooseS1: function (e) {

    var that = this
    var chooseS1 = that.data.chooseS1;
    var index = parseInt(e.currentTarget.dataset.index);
    var selected = {
      1: false,
      2: false,
      3: false
    }
    selected[index] = true;
    that.setData({
      selected: selected
    })
    var infos = that.data.infos
    if (index == 1) {
      that.getfastinfo()
    }else{
      that.translate(e)
      var items=[];
      if(index==2){
        if (infos.shops.get && infos.shops.get.length > 0) {
          items = infos.shops.get
        }
      }else if(index==3){
        if (infos.shops.try && infos.shops.try.length > 0) {
          items = infos.shops.try
        }
      }
      that.setData({
        items
      })
    }
  },
  ardess:function(){
    this.getfastinfo() 
  },
  getfastinfo: function () {
    var that = this
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'linear'
    })
    that.animation = animation
    animation.translateY(200).step()
    that.setData({
      animationDatas1: animation.export(),
      chooseS1: true,
    })
    setTimeout(function () {
      animation.translateY(0).step()
      that.setData({
        animationDatas1: animation.export(),
      })
    }, 200)
  },
  // 管理收货地址
  oppens: function () {
    wx.navigateTo({
      url: '../../person/Address/Address',
    })
  },
  oppens1:function(){
    this.setData({
      chooseS :false,
    })
  },
  changeCoupon: function (goods_index)
  {
    var that = this
    var goodsInfo = that.data.infos.shopinf[goods_index];
   
    var couponList = that.data.infos.shopinf[goods_index].coupount;
    for (var i = 0; i < couponList.length;i++){
      var couponInfo = [];
      if (couponList[i].isChecked == true)
      {
        couponInfo = couponList[i];
        break;
      }
    }

    if (JSON.stringify(couponInfo) != '[]' && JSON.stringify(couponInfo) != undefined){
      var single_price = goodsInfo.price;
      var goods_num = goodsInfo.num;
      var goods_total_price = parseFloat(single_price) * goods_num;
      var coupon_value = couponInfo.value;
      var coupon_minus = couponInfo.minus;
      if (goods_total_price >= coupon_value) {
        that.setData({
          ['infos.shopinf[' + goods_index + '].couponPrice']: coupon_minus,
          ['infos.shopinf[' + goods_index + '].isShowCouponInfo']: true,
        })

      } else {
        wx.showToast({
          title: '不满足满减条件',
          icon: 'none'
        })
        that.setData({
          ['infos.shopinf[' + goods_index + '].couponPrice']: 0,
          ['infos.shopinf[' + goods_index + '].isShowCouponInfo']: false,
        })
        for (var i = 0; i < that.data.infos.shopinf[goods_index].coupount.length; i++) {
          that.setData({
            ['infos.shopinf[' + goods_index + '].coupount[' + i + '].isChecked']: false
          })
        }
      }
    }
    
    that.caculateCouponPrice();
  },
  // 点击详情的优惠卷
  radioChanges:function(e){
    var that = this
    var show_coupount = that.data.show_coupount;

    var index = e.detail.value;
    var goods_index = e.target.dataset.sat;

    var shopinfoContent = that.data.infos.shopinf;

    var currentCoupon = shopinfoContent[goods_index].coupount[index];
    var currentCouponId = currentCoupon.cid;

    console.log(that.data.infos.shopinf)
    var flag = false;
    var old_goods_index = '';
    var old_radio_index = '';
    
    for (var i = 0; i < shopinfoContent.length;i++){
      if (i != goods_index){
        for(var j=0;j<shopinfoContent[i].coupount.length;j++){
          if ((shopinfoContent[i].coupount[j].isChecked) == true && (shopinfoContent[i].coupount[j].cid == currentCouponId)){
            flag = true;
            old_goods_index = i;
            old_radio_index = j;
            break;
          }
        }
      }
    }

    if(flag == true)
    {
      that.setData({
        ['infos.shopinf[' + old_goods_index + '].coupount[' + old_radio_index + '].isChecked']: false,
        ['infos.shopinf[' + old_goods_index + '].isShowCouponInfo']:false
      })

      wx.showToast({
        title: '相同的劵只可以使用一次',
        icon:'none'
      })
    }
  
    for (var i = 0; i < shopinfoContent[goods_index].coupount.length; i++) {
      var isChecked = false;
      if (i == index) {
        isChecked = true;
      }
      that.setData({
        ['infos.shopinf[' + goods_index + '].coupount[' + i + '].isChecked']: isChecked
      })
    }
    console.log(that.data.infos.shopinf)

    that.changeCoupon(goods_index);
    console.log(that.data.infos.shopinf)
  },


  complete:function(){
      this.setData({
        shopxq:false,
      })
  },



  // 优惠卷
  CouponList:function(){
    var that=this;
    var params = {}
    var Url = url + '/api/Coupon/getReceivedCouponList';

    var shopinf = that.data.infos.shopinf;
    var arrays = [];
    for (var i = 0; i < shopinf.length;i++){
      arrays.push(shopinf[i].id);
    }
    // console.log(that.data.infos.shopinf)
    var shopinfxq = that.data.infos.shopinf;
    params.type = 1,
    params.ids = arrays,
    network.POST(Url, params,
      {
        success: function (res) {
          if (res.data._c == 0) {
            var coupons = res.data.data;

            var commonCoupon = [];
            var goodsCoupon = [];
            for (var i = 0; i < coupons.length; i++) {
              coupons[i].vt.s = network.formatTime(coupons[i].vt.s, 'Y-M-D')
              coupons[i].vt.e = network.formatTime(coupons[i].vt.e, 'Y-M-D')
              coupons[i].isChecked = false
              if (coupons[i].gid == 0) {
                commonCoupon.push(coupons[i])
              } else if (coupons[i].gid != 0) {
                goodsCoupon.push(coupons[i])
              }
            }
            for (var j = 0; j < shopinfxq.length; j++) {
              var new_arr = shopinfxq[j].coupount;
              for (var i = 0; i < goodsCoupon.length; i++) {
                if (goodsCoupon[i].gid == shopinfxq[j].id) {
                  // if (JSON.stringify(new_arr) == '[]') {
                  //   goodsCoupon[i].isChecked = true;
                  // }
                  new_arr.push(goodsCoupon[i])
                }
              }
            }
            that.setData({
              coupons: commonCoupon,
              ['infos.shopinf']: shopinfxq
            })
          
          } else {
            wx.showToast({
              title: res.data._m,
            })
          }
        },
        fail: function (res) {
          wx.showToast({
            title: '网络错误',
          })
        },
      })
  },

  hideModals1: function (e) {
    var that = this;
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'linear'
    })
    that.animation = animation
    animation.translateY(200).step()
    that.setData({
      animationDatas1: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      that.setData({
        animationDatas1: animation.export(),
        noscrollheight: "100%",
        chooseS1: false
      })
    }, 200)


  },
  hideModals2:function(e){
    var that = this;
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'linear'
    })
    that.animation = animation
    animation.translateY(200).step()
    that.setData({
      animations: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      that.setData({
        animations: animation.export(),
        noscrollheight: "100%",
        shopxq: false
      })
    }, 200)

  },
  hideModals: function (e) {
    var that = this;
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'linear'
    })
    that.animation = animation
    animation.translateY(200).step()
    that.setData({
      animationDatas: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      that.setData({
        animationDatas: animation.export(),
        noscrollheight: "100%",
        chooseS: false
      })
    }, 200)
  },

  daodian: function (e) {
    console.log(e)
    this.setData({
      watch: true
    })
  },


  // 点击地址:
  Chose:function(e){
    var that = this;
    var index = e.currentTarget.dataset.index;
    var definfo = that.data.definfo;
    console.log(that.data.infos.address[index])
      for (var i = 0; i < that.data.infos.address.length;i++){
        if (i != index){
          that.setData({
            ['infos.address[' + i + '].isChecked']: false,
          })
        }else{
          that.setData({
            ['infos.address[' + i + '].isChecked']: true,
          })
        }
      }
      that.setData({
        definfo: that.data.infos.address[index],
        chooseS1:false,
        hiddens1: true,
        hiddens: false,
      })
  },
  //   * 用户点击商品加1
  //  */
  addtap: function (e) {
    var that = this;
    var index = e.target.dataset.index;
    var shopinf = that.data.infos.shopinf
 
    var nums = shopinf[index];
    var old_num = shopinf[index].num;
    var is_oversell = shopinf[index].is_oversell;
    if (parseInt(nums.stock) > parseInt(old_num)){
      var new_num = parseInt(old_num) + 1;
      that.setData({
        ['infos.shopinf[' + index + '].num']: new_num,
      })
    }else{
      that.setData({
        ['infos.shopinf[' + index + '].num']: old_num,
      })
    }

    that.goodsTotalPrice();
    that.bond();
    that.changeCoupon(index);
  },
    /**
* 用户点击商品减1
*/
  subtracttap: function (e) {
    var that =this;
    console.log(e)
    var index = e.target.dataset.index;;
    var shopinf = that.data.infos.shopinf
    console.log(shopinf)
    var nums = shopinf[index];
    var old_num = shopinf[index].num;

    if (old_num <= 1) {
      return;
    } else {
      old_num--;
      this.setData({
        ['infos.shopinf[' + index + '].num']: old_num,
      })
    }
    that.goodsTotalPrice();
    that.bond();
    that.changeCoupon(index);
  },
  // 修改数量
  adds:function(e){
    var that =this;
    var value = e.detail.value
    var index = e.currentTarget.dataset.index;
    console.log(value)
    if (parseInt(value) >= parseInt(that.data.infos.shopinf[index].stock)){
      var new_num = that.data.infos.shopinf[index].stock;
      if (that.data.infos.shopinf[index].stock <= 0){
        new_num = 1;
      }
        that.setData({
          ['infos.shopinf[' + index + '].num']: new_num,    
        })
        wx.showToast({
          title: '大于库存数量',
          icon:'none',
        })
    }else{
      that.setData({
        ['infos.shopinf[' + index + '].num']: e.detail.value,
      }) 
    }
    that.changeCoupon(index);
  },

// 通用优惠卷
  radioChangesd:function(e){
    var that =this;
    console.log(e.detail.value)
    var index = e.detail.value;
    that.setData({
      commonCouponPrice: that.data.coupons[index].minus,
      commonCouponId: that.data.coupons[index].cid
    })
    for (var i = 0; i < that.data.coupons.length;i++){
      var isChecked = false;
      if (i == index) {
        isChecked = true;
      }
      that.setData({
        ['coupons[' + i + '].isChecked']: isChecked
      })
    }
    that.caculateCouponPrice();
  },
  // 发票
  fapiao: function () {
    this.setData({
      showsed: (!this.data.showsed),
      iswatch: (!this.data.iswatch),
    })
  },
  radioChange: function (e) {
    var radios = e.detail.value;

    if (radios == 0) {
      this.setData({
        qi:(!this.data.qi),
        gred: false,
        radios: radios,
      })
    } else if (radios == 1) {
      this.setData({
        qi: false,
        gred: (!this.data.gred),
        radios: radios,
      })
    } else if (radios == 2) {
      this.setData({
        gred: false,
        qi: false,
        radios: radios,
      })
    }
  },
  //移动按钮点击事件
  translate: function (e) {
    var that = this;
    var obj = network.animations(0, true);
    that.setData(obj)
  },
  //隐藏弹窗浮层
  hiddenFloatView(e) {
    var that = this;
    var obj = network.animations(500, false);
    that.setData(obj)
  },
  bindChanges(e) {
    console.log(e)
    var selindex = e.detail.value[0];
 
    this.setData({
      selindex
    })
    console.log(selindex)
  },
  pickConfirm: function (e) {

    var that = this;
    var selinfo = that.data.selinfo;
    var index = "";
    if(that.data.selindex == undefined){
       index  = 0;
    }else{
      index = that.data.selindex;
    }
  var selinfos = that.data.items[index];
    that.hiddenFloatView()
    that.setData({
      selinfo:selinfos,
      hiddens1: false,
      hiddens:true,
    })
  },
  // 企业确定取消
  formSubmits: function (e) {
    var taitour = e.detail.value.taitour;
    var nsuir = e.detail.value.nsuir;
    var numbersed = e.detail.value.numbersed;
    var kaihuh = e.detail.value.kaihuh;
    var yhh = e.detail.value.yhh;
    var adrees = e.detail.value.adrees;
    var phone = e.detail.value.phone;
    this.setData({
        taitour,
        nsuir,
        numbersed,
        kaihuh,
        yhh,
        adrees,
        phone,
        qi: false,
    })
  },
  formResets: function (e) {
    console.log('form发生了reset事件')
    console.log(this.data.company)
    this.setData({
      taitour:"",
      nsuir:"",
      numbersed:"",
      kaihuh:"",
      yhh:"",
      adrees:"",
      phone:"",
      qi:false,
    })
  },
  // 个人确定取消
  formSubmit: function (e) {
    var that = this;
    var usenanme = e.detail.value.usenanme;
    var usenumber = e.detail.value.usenumber;
    var usemoblie = e.detail.value.usemoblie;
   that.setData({
     usenanme,
     usenumber,
     usemoblie,
     gred:false,
   })
  },
  formReset: function (e) {
    that.setData({
      usenanme:"",
      usenumber:"",
      usemoblie:"",
      gred: false,
    })
  },



  // 提交订单
  Submission:function(e){ 
    var that = this;
   
    var radios = that.data.radios;
    if (radios == ""){ 
      wx.showToast({
        title: '请选择发票类型',
        icon: 'none'
      })
      return;
    }else{
      if (radios == 0) {

        if (that.data.taitour == "") {
          wx.showToast({
            title: '企业抬头名称不能为空',
            icon: 'none'
          })
          return;
        };
        if (that.data.nsuir == "") {
          wx.showToast({
            title: '纳税人识别号不能为空',
            icon: 'none'
          })
          return;
        };
        if (!checkedUserCode(that.data.nsuir)) {
          wx.showToast({
            title: '纳税人识别号只能输入数字和英文',
            icon: 'none'
          })
          return;
        }
        if (that.data.numbersed == "") {
          wx.showToast({
            title: '手机号不能为空',
            icon: 'none'
          })
          return;
        };
        if (!isValidMobile(that.data.numbersed)) {
          wx.showToast({
            title: '手机号不对',
            icon: 'none'
          })
          return;
        };
        if (!isValidMobile(that.data.numbersed)) {
          wx.showToast({
            title: '手机号不对',
            icon: 'none'
          })
          return;
        };
        if (that.data.phone.length > 0) {
          if (!isValidPhone(that.data.phone)) {
            wx.showToast({
              title: '请输入正确的电话号码',
              icon: 'none'
            })
            return false;
          };
        } 

        var invoice = {
          type:1,
          addr: that.data.adrees,
          bank_account: that.data.yhh,
          bank_name: that.data.kaihuh,
          mobile: that.data.numbersed,
          tax_id: that.data.nsuir,
          tax_name: that.data.taitour,
          tel: that.data.phone
        }
      } else if (radios == 1) {
        if (that.data.usenanme == "") {
          wx.showToast({
            title: '用户名不能为空',
            icon: 'none'
          })
          return;
        }
        if (that.data.usenumber == "") {
          wx.showToast({
            title: '手机号不能为空',
            icon: 'none'
          })
          return;
        }
        if (!isValidMobile(that.data.usenumber)) {
          wx.showToast({
            title: '手机号不对',
            icon: 'none'
          })
          return false;
        }
        if (that.data.usemoblie.length > 0) {
          if (!isValidMail(that.data.usemoblie)) {
            wx.showToast({
              title: '请输入合法的邮件地址',
              icon: 'none'
            })
            return;
          };
        } 
      var  invoice = {
          type: 1,
          email: that.data.usemoblie,
          mobile: that.data.usenumber,
          name: that.data.usenanme,
        }

      } else if (radios == 2) {
       var    invoice = {
          type: 0,
        }
      }
    }

    if (that.data.selected[1] == true){

     var  address={
        address_id: that.data.definfo.id,
        receive_way: 1,
      }
    } else if (that.data.selected[2] == true){
    var   address = {
        address_id: that.data.definfo.id,
        receive_way: 2,
        shopNameid: that.data.selinfo.id,
      }
    } else if (that.data.selected[3] == true) {
      var   address = {
        address_id: that.data.definfo.id,
        receive_way: 3,
        shopNameid: that.data.selinfo.id,
      }
    }

    var shopinf = that.data.infos.shopinf;
    var good = []; 
    for (var i = 0; i < shopinf.length;i++){
      var goods = {};
      goods.art_id = shopinf[i].art_id;
      goods.atid = shopinf[i].attr_id;
      goods.comment = shopinf[i].content;
      goods.gid_artid = shopinf[i].id + shopinf[i].art_id + shopinf[i].attr_id;
      goods.id = shopinf[i].id;
      goods.num = shopinf[i].num;
      for (var j = 0; j < shopinf[i].coupount.length; j++) {
        if (shopinf[i].coupount[j].isChecked == true){
          goods.cid = shopinf[i].coupount[j].cid;
          goods.coupon_id = shopinf[i].coupount[j].cid;
        }
      };
      good.push(goods)
    }


    var params = {};
     params = {
      oid: that.data.infos.orderid,
      common_coupon_id:this.data.commonCouponId,
      address: JSON.stringify(address),
      goods: JSON.stringify(good),
      invoice: JSON.stringify(invoice),
    }

    var Url = url + '/api//order/submitOrder';

 
      network.POST(Url, params,
        {
          success: function (res) {
            if (res.data._c == 0) {
              wx.showToast({
                title: '提交成功',
              })
              wx.navigateTo({
                url: '../../person/myorder/myorder',
              })
            }else{
              wx.showToast({
                title: res.data._m,
              })
            }
          },
          fail: function (res) {
            wx.showToast({
              title: '网络错误',
            })
          },
        })
  },

  // 点击搜索地址
  xzdis:function(e){
    console.log("333332")
    var that=this
    var index = e.currentTarget.dataset.index;
    for (var i = 0; i < that.data.items.length;i++){
      if(i !=index){
        that.setData({
          ['items[' + i + '].jiantou']: false,
          ['items[' + i + '].bigs']: false,
          ['items[' + i + '].add']: false,
          ['items[' + i + '].lei']: false,
          ['items[' + i + '].color']: true,
        })
      }
      
    }
    that.setData({
      ['items[' + index + '].jiantou']: (!that.data.items[index].jiantou),
      ['items[' + index + '].bigs']: !that.data.items[index].bigs,
      ['items[' + index + '].add']: !that.data.items[index].add,
      ['items[' + index + '].lei']: !that.data.items[index].lei,
      ['items[' + index + '].color']: !that.data.items[index].color,
    })
    console.log(that.data.items)
  },     
  bindInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },  
  bdsosuo:function(){
    console.log(this.data.items)
  var inputValue = this.data.inputValue;
  if (inputValue == ""){
      return;
    }
  for (var i = 0; i < this.data.items.length; i++){
    this.setData({
      ['items[' + i + '].shows']: false,
    })
    if (this.data.items[i].text.indexOf(inputValue)>=0){
      this.setData({
        ['items[' + i + '].shows']: true,
      })
    } 
  }
  },
  // 确定
  btnSubmit:function(e){
    console.log(this.data.items)
    var items = this.data.items;
    var selinfo = this.data.selinfo;
    for (var i = 0; i < items.length;i++){
      if (items[i].add == true){     
        this.setData({
          ['selinfo']: items[i],
          hiddens1: false,
          hiddens: true,
          flags:true,
        })
        console.log(this.data.selinfo)
      }

    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }

})

