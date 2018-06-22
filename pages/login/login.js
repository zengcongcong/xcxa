// pages/login/login.js
var names = "";
var phone = "";
var app = getApp(); 
var network = require("../../utils/untils.js");
var url = 'https://dev.unionglasses.com/'
Page({
  data: {
    shouview:false,
    phone:"",
    names:"",
  },
  onLoad: function (options) {
    shouview: (options.shouview == "true" ? true : false)
    shouviews: (options.shouviews == "true" ? true : false)
  },
  userName: function (e) {
    var shouview = this.data.shouview
    this.setData({
      names: e.detail.value,
      shouview: true,
    })
    console.log(names)
  },
  bulr: function (e) {
    console.log(e)
    var shouview = this.data.shouview
    this.setData({
      shouview: false,
    })
  },
  clear: function (e) {
    this.setData({
      names: "",
      shouview: false,
    })
  },
  phone: function (e) {
    this.setData({
      phone: e.detail.value,
      shouviews: true,
    })

  },
  bulrs: function (e) {
    var shouviews = this.data.shouviews
    this.setData({
      shouviews: false,
    })
  },
  cleardoan: function (e) {
    this.setData({
      phone: "",
      shouviews: false,
    })
  },
  taps:function(e){
    var that = this
    console.log(that.data)
    if (this.data.names == "") {
      wx.showToast({
        title: '请输入姓名',
        icon: 'none',
        duration: 1500
      })
      return
    }
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (!this.data.phone) {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none',
        duration: 1500
      })
      return
    }
    if (this.data.phone.length != 11 || !myreg.test(this.data.phone)) {
      wx.showToast({
        title: '输入正确的手机号格式',
        icon: 'none',
        duration: 1500
      })
      return
    }
    //写入参数
    var Url = url + 'api/Login/login';
    var params = new Object()
    params.uname = that.data.names,
    params.phone = that.data.phone,
      console.log(params)
    network.POST(Url, params,
      {
        success: function (res) {
          console.log(res)
          if (res.data._c == 4){
            wx.redirectTo({
              url: '../registerList/registerList?phone=' + that.data.phone,
            })
          } else if (res.data._c == 3){
            wx.redirectTo({
              url: '../logs/logs?phone=' + that.data.phone,
            })
          } else if (res.data._c == 0) {
            getApp().globalData.utoken = res.data._d;
            wx.switchTab({
              url: '../index/index'
            })
          } else if (res.data._c == 1){
            wx: wx.showToast({
              title: res.data._m,
              icon: 'none',
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
  // onGotUserInfo:function(e){  
  //   wx.login({  
  //     success: function (res) {
  //       if (res.code) {
  //         getApp().globalData.utoken = res.code;
  //         //发起网络请求
  //         wx.request({
  //           url: 'https://test.com/onLogin',
  //           data: {
  //             code: res.code
  //           }
  //         })
  //       } else {
  //         console.log('登录失败！' + res.errMsg)
  //       }
  //     }
  //   });

  // },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})