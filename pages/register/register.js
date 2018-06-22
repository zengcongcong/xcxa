var network = require("../../utils/untils.js");
var url = 'https://dev.unionglasses.com/'
const app = getApp();

var names= "";
var date= "";
Page({
  data:{
    shouview: false,
    maskFlag:true,
    checked:true,
    phone:"",
  },
  onLoad: function (options) {
    shouview: (options.shouview == "true" ? true : false)
    this.setData({
      phone: options.phone,
    })
  },
  formSubmit: function (e) {
    var that= this;
    console.log(e.detail.value)
    var names = e.detail.value.names;
    var sex = e.detail.value.radio;
    console.log(sex)
    var age = e.detail.value.number;
    wx.login({
      success: function (res) {
        if (names.length == 0){
          wx.showToast({
            title: '请输入正确的姓名',
            icon: 'none',
            duration: 1500
          })
          return
        }
        if (age.length == 0) {
          wx.showToast({
            title: '请选择正确的日期',
            icon: 'none',
            duration: 1500
          })
          return
        }
        if(res.code){
          var Url = url + 'api/login/registerInfo';
          console.log(that.data.phone);
          var params = {}
            params.code = res.code,
              params.phone = that.data.phone,
              params.uname = that.data.names,
              params.age = that.data.date,
              params.sex = e.detail.value.radio,
              console.log(params);
           
            network.POST(Url, params,
              {
                success: function (res) {
                  console.log(res.data)
                  if (res.data._c == 0) {
                    wx.switchTab({
                      url: '../index/index',
                    })
                  }
                  if (res.data._c == 1) {
                    wx.navigateTo({
                      url: '../registerList/registerList?phone=' +that.data.phone,
                    })
                  }

                },
                fail: function (res) {
                  wx.showToast({
                    title: '网络错误',
                  })
                },
              })

        }
      }   
    })



  },
  bindPickerDate: function (e) {
    console.log("选择的日期：", e.detail.value)
    this.setData({
      date: e.detail.value,
      maskFlag:false,
    })
  },
  // 输入姓名
  userName:function(e){
    var shouview = this.data.shouview
    this.setData({
      names: e.detail.value,
      shouview: true,
    })
  },
  bulr: function (e) {
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
})