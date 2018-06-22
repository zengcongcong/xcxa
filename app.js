var network = require("/utils/untils.js");
var url = 'https://dev.unionglasses.com/';

App({
  globalData: {
    ctoken: "bl",
    nums : '0',
    utoken: "",
    ctxPath: 'https://dev.unionglasses.com/Mall/Index/newProduct/fhelz5/?tags=true',
    refreshFlag: false
  },
  //购物车数量
  getCartNum: function () {
    var Url = url + 'api/scart/cartNum';
    var params = {}
    network.POST(Url, params,
      {
        success: function (res) {

          var nums = JSON.stringify(res.data.num)
          if (nums > 9) {
            nums = '9+'
          }
          wx.setTabBarBadge({
            index: 2,
            text: nums,
          })
          getApp().globalData.nums = nums;
        },
        fail: function (res) {
          wx.showToast({
            title: '网络错误',
          })
        },
      })
  },
  // 监控购物车事件
  onShow: function () {
    var app = getApp();
    var that = this
    that.getCartNum()
  },
  // onLaunch: function () {
  //   // 展示本地存储能力
  //   var logs = wx.getStorageSync('logs') || []
  //   logs.unshift(Date.now())
  //   wx.setStorageSync('logs', logs)

  //   // 登录
  //   wx.login({
  //     success: res => {
  //       // 发送 res.code 到后台换取 openId, sessionKey, unionId
  //     }
  //   })
  //   // 获取用户信息
  //   wx.getSetting({
  //     success: res => {
  //       if (res.authSetting['scope.userInfo']) {
  //         // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
  //         wx.getUserInfo({
  //           success: res => {
  //             // 可以将 res 发送给后台解码出 unionId
  //             this.globalData.userInfo = res.userInfo

  //             // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
  //             // 所以此处加入 callback 以防止这种情况
  //             if (this.userInfoReadyCallback) {
  //               this.userInfoReadyCallback(res)
  //             }
  //           }
  //         })
  //       }
  //     }
  //   })
  // },
 
  onLaunch: function () {
    if (this.globalData.utoken != '') {
      wx.navigateTo({
        url: '/pages/index/index',
      })
    } else {
      wx.showToast({
        title: '您还未登录,请先登录',
        icon:'none'
      })
      // setTimeout(function () {
      //   wx.redirectTo({
      //     url: "/pages/login/login"
      //   });
      // }, 5000) 
    }
    // wx.checkSession({
    //   success: function () {
    //     //session 未过期，并且在本生命周期一直有效
    //     // console.log('未过期')
    //   },
    //   fail: function () {
    //     //登录态过期
    //     // 登录
    //     console.log('过期')
    //     wx.login({
    //       success: res => {
    //         // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //         wx.request({
    //           url: 'https://mini.zhumingke.cn/index.php/home/index/login',
    //           data: {
    //             code: res.code,
    //             miniid: 1
    //           },
    //           success: function (res) {
    //             wx.setStorageSync('sessionid', res.data)
    //             console.log('成功登录')
    //           }
    //         })
    //       }
    //     })
    //   }
    // })
  },
  // onShow: function () {
    
    // console.log("1111")
    // wx.redirectTo({
    //   url: '/pages/logs/logs',
    // })
   
  // },

})
