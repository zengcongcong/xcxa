var network = require("../../../utils/untils.js");
var url = 'https://dev.unionglasses.com/';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: "success_no_circle",
    chooseS: false,
    chooseS1: false,
    selected: {
      1: false,
      2: false,
      3: false
    },
    yhj: "",
    qi: false,
    gred: false,
    showsed: false,
    array: ['中国', '美国', '英国', '法国', '德国'],
    watch: false,
    bindPickerChang: false,
    showView: false,
    ishows: false,
    iswatch: false,
    shows: true,
  },
  beizhu: function () {
    var that = this;
    that.setData({
      showView: (!that.data.showView),
      ishows: (!that.data.ishows),
    })
  },
  bindFormSubmit: function () {
    this.setData({
      showView: false,
      ishows: false,
    })
  },


  youhuij: function (e) {
    // var Url = url + '/api/coupon/takeCoupon';
    // var params = {};
    // params.couponId = 7;
    // network.POST(Url, params,
    //   {
    //     success: function (res) {
    //       console.log(res.data)
        
    //     },
    //     fail: function (res) {
    //       wx.showToast({
    //         title: '网络错误',
    //       })
    //     },
    //   })




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
    params = options;
    this.getinfo(params);

    this.CouponList();
    iswatch: (options.iswatch == "true" ? true : false)
    gred: (options.gred == "true" ? true : false)
    qi: (options.qi == "true" ? true : false)
    showsed: (options.showsed == "true" ? true : false)
    watch: (options.watch == "true" ? true : false)
  },
  // 列表
  getinfo:function(params){
    var Url = url + '/api/order/confirmOrder';
    network.POST(Url, params,
      {
        success: function (res) {
          console.log(res.data)
          if (res.data._c == 0) {

          }else{
            
          }
        },
        fail: function (res) {
          wx.showToast({
            title: '网络错误',
          })
        },
    })
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
  
  chooseS1: function (e) {
    console.log(e);
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
    if (index == 1) {
      that.getfastinfo()
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
    // 设置setTimeout来改变y轴偏移量，实现有感觉的滑动
    setTimeout(function () {
      animation.translateY(0).step()
      that.setData({
        animationDatas1: animation.export(),
      })
    }, 200)

    var Url = url + 'api/Address/lists';
    var params = {}
    network.POST(Url, params,
      {
        success: function (res) {
          if (res.statusCode == 200) {
            console.log(res)
            that.setData({
              goodList: res.data.address
            })

          } else {
            wx.showToast({
              title: '网络错误',
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
  // 管理收货地址
  oppens: function () {
    wx.navigateTo({
      url: '../../person/Address/Address',
    })
  },

  // 优惠卷
  CouponList:function(){
    var Url = url + 'api/Coupon/getReceivedCouponList';
    var params = {}
    // params.type = 1,
    params.type = 1,
    params.ids = 31,
    
    network.POST(Url, params,
      {
        success: function (res) {
          if (res.statusCode == 200) {
            // console.log(res)
          } else {
            wx.showToast({
              title: '网络错误',
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
  /**
* 用户点击商品减1
*/
  // subtracttap: function (e) {
  //   var index = e.target.dataset.index;;
  //   var goodLists = this.data.goodLists;

  //   var num = goodLists[index].num;
  //   if (num <= 1) {
  //     return;
  //   } else {
  //     goodLists[index].num--;
  //     this.setData({
  //       goodLists: goodLists,
  //     })
  //   }

  // },

  //   * 用户点击商品加1
  //  */
  addtap: function (e) {
    var index = e.target.dataset.index;
    var goodLists = this.data.goodLists;
    var num = goodLists[index].num;
    goodLists[index].num++;
    this.setData({
      goodLists: goodLists
    });
  },

  // 发票
  fapiao: function () {
    this.setData({
      showsed: (!this.data.showsed),
    })
  },
  radioChange: function (e) {
    console.log(e.detail.value)
    var values = e.detail.value;
    if (values == 0) {
      this.setData({
        qi: true,
        gred: false,
      })
    } else if (values == 1) {
      this.setData({
        gred: true,
        qi: false,
      })
    } else if (values == 2) {
      this.setData({
        gred: false,
        qi: false,
      })
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