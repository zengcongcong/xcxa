var timer=null;
// var app = getApp(); 
var network = require("../../utils/untils.js");
var url = 'https://dev.unionglasses.com/'
Page({
  data:{
    desctime:"获取验证码",
    shouview: false,
    shouviews:false,
    downTime:60,
    huan:false,
  },
  codestatus:function(){
    let downTime = 60;
    let that = this
    timer = setInterval(function () {
      downTime--;
      that.setData({
        desctime: downTime + 's重发',
        huan: true,
      })
      if (downTime <= 0) {
        clearInterval(timer);
        that.setData({
          desctime: '获取验证码',
          disabled: false,
          huan: false,
        })
      }
    }, 500)
  },
  sendsms:function(phone){
    console.log("发送短信")
    var Url = url + 'api/Login/getCode';
    var params = {}
    let that = this
    params.mobile = phone,
    network.POST(Url, params,
      {
        success: function (res) {
          if (res.statusCode == 200) {
            that.codestatus()
            
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

  // 60秒获取短信
  // sendmessg: function (e) {
  //   // console.log(this.data.phoneValue);
  //   var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
  //   if (!this.data.phoneValue && this.data.phoneValue.length != 11 && !myreg.test(this.data.phoneValue)) {
  //     wx.showToast({
  //       title: '输入正确的手机号格式',
  //       icon: 'none',
  //       duration: 1500
  //     })
  //     // 获取验证码
  //   } else {
  //     // 发送短信
  //     let that = this
  //     counTime++;
  //     if (counTime == 1){
  //       that.setData({
  //         disabled: true,
  //         huan: true,
  //       })
  //     }
  //     that.sendsms(that.data.phoneValue)
  //     let downTime = 61;
  //    let interval = setInterval(function () {
  //       downTime--;
  //       that.setData({
  //         downTime: downTime,
  //         desctime: downTime + 's重发',
  //         disabled: true,
  //         huan: true,
  //       })
  //       if (downTime <= 0) {
  //         clearInterval(interval)
  //         that.setData({
  //           desctime: '重新发送',
  //           downTime: 61,
  //           disabled: false,
  //           huan: false,
  //         })
  //       }
  //     }, 500)  
  sendmessg: function (e) {
    var that=this
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (!this.data.phoneValue) {
      wx.showToast({
        title: '输入手机号',
        icon: 'none',
        duration: 1500
      })
      return
    }
    if (this.data.phoneValue.length != 11 || !myreg.test(this.data.phoneValue)) {
      wx.showToast({
        title: '输入正确的手机号格式',
        icon: 'none',
        duration: 1500
      })
      return

    }
    that.sendsms(that.data.phoneValue);
  },


  zhuce:function(e){
    var that = this
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (!this.data.phoneValue) {
      wx.showToast({
        title: '输入手机号',
        icon: 'none',
        duration: 1500
      })
      return
    }
  
    if (this.data.Value.length != 6) {
      wx.showToast({
        title: '输入6位验证码',
        icon: 'none',
        duration: 1500
      })
      return
    }
    var Urls = url + 'api/login/register';
    var params = {}
      params.code = that.data.Value,
      params.phone = that.data.phoneValue;
      console.log(params)
      network.POST(Urls, params,
      {
          success: function (res) {
            console.log(res.data)
           if(res.data._c==1){
            wx.redirectTo({
              url: '../register/register?phone=' + that.data.phoneValue,
                })
           } else if (res.data._c == 2){
             wx.redirectTo({
               url: '../registerList/registerList?phone=' + that.data.phoneValue,
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
  onLoad:function(options){
    shouview: (options.shouview == "true" ? true : false)
    shouviews: (options.shouviews == "true" ? true : false)
  },
    // 获取手机号码
  Input: function (e) {
    var shouview = this.data.shouview
      this.setData({
        phoneValue: e.detail.value,
        shouview:true,
      })
  },
  bulr:function(e){
    console.log(e)
    var shouview = this.data.shouview
    this.setData({
      shouview: false,
    })
  },
  clear:function(e){
    this.setData({
      phoneValue:"",
      shouview: false,
    })
  },
  // 获取验证码
  inpused: function (e) {
    var shouviews = this.data.shouviews
    this.setData({
      Value: e.detail.value,
      shouviews:true,
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
      Value: "",
      shouviews: false,
    })
  },
})
