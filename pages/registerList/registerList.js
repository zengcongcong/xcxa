var network = require("../../utils/untils.js");
var url = 'https://dev.unionglasses.com/';
var app = getApp(); 
// var phone = "";
var id = "";
var uname = "";
var code = "";
Page({
  data: {
    curHdIndex: 0,
    titles: "",
    phone:"",
    num : '',
    listData: [],
  },
  onLoad: function (options) {
    var that = this
    
    that.setData({
      phone: options.phone
    })
    console.log(that.data.phone)
    
    var Url = url + 'api/login/loginlist';
    var params = {}
    params.phone = that.data.phone
    network.POST(Url, params,
      {
        success: function (res) {
          console.log(res.data._d.table.data.birthday)
          var ansed = res.data._d.table.data;
          for (var i = 0; i < ansed.length;i++){
           
            ansed[i].birthday = network.formatTime(ansed[i].birthday, 'Y-M-D');
          }
          console.log(ansed)
          res.data._d.table.data[0].checked = true;
          that.setData({
            titles: res.data._d.table.title,
            listData: res.data._d.table.data,
            phone: that.data.phone,
          })

        },
        fail: function (res) {
          wx.showToast({
            title: '网络错误',
          })
        },
      })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },
  radioChange: function (e) {
    var that = this
    var listData = that.data.listData
    var index = e.detail.value;
    var nums = listData[index];
    var uname = nums.name;
    var id = nums.id;
    console.log(nums)
    that.setData({
      curHdIndex: index,
      uname: uname,
      id:id,
      num:nums
    })
  },


  result: function (e) {
    console.log(e)
    var that = this
    console.log(that.data.listData)
    wx.login({
      success: function (res) {
        if (res.code) {
          var code = res.code;
          //发起网络请求
          var Urls = url + 'api/login/loginListbind';
          var params = {};
          var act_index = 0;
          if (that.data.curHdIndex != '')
          {
            act_index = that.data.curHdIndex;
          }
          params.id = that.data.listData[act_index].id;
          params.uname = that.data.listData[act_index].name;
          params.phone = that.data.phone;
          params.code = code;
          
          network.POST(Urls, params,
            {
              success: function (res) {
                console.log(res.data)
                if (res.data._c == 0) {
                  getApp().globalData.utoken = res.data._d;
                  wx.switchTab({
                    url: '../index/index'
                  })
                }
                getApp().globalData.utoken = res.data._d;
              },
              fail: function (res) {
                wx.showToast({
                  title: '网络错误',
                })
              },
            })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }

    })
  },
  // 不绑定
  nobind:function(){
    var that = this;
    console.log(that.data.phone)
    wx.redirectTo({
      url: "../register/register?phone=" + that.data.phone,
    })
  }
})