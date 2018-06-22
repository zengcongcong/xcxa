var network = require("../../utils/untils.js");
var url = 'https://dev.unionglasses.com/'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "_num": 1,
    showView: 1,
    hidden: true,
    lists: [],
    lists2: [],
    lists3:[],
  },
  onLoad: function (options) {
    var that = this;

    var Url = url + 'api/Coupon/pclist';
    var params = {}
    network.POST(Url, params,
      {
        success: function (res) {
        var   lists = that.data.lists;
        var   which = that.data.which;
          that.setData({
            lists:res.data.data,
            which: res.data.which
          })
        },
        fail: function (res) {
          wx.showToast({
            title: '网络错误',
          })
        },
      })


  },
  menuClick: function (e) {
    var that = this;
    var index = e.target.dataset.index;
    var showView = that.data.showView;
    that.setData({
      hidden: true,
    }) 
    if (index == 1) {
      that.setData({
        showView: 1,
      })
      var Url = url + 'api/Coupon/pclist';
      var params = {}
      params.type=1
      network.POST(Url, params,
        {
          success: function (res) { 
            var lists = that.data.lists;
            if (res.data.data == ""){
              that.setData({
                hidden: false,
              }) 
            }else{
              that.setData({
                lists: res.data.data,
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
    if (index == 2){
      that.setData({
        showView: 2,
      })
      var Url = url + 'api/Coupon/pclist';
      var params = {}
      params.type = 2
      network.POST(Url, params,
        {
          success: function (res) {
            var lists2 = that.data.lists2;
            if (res.data.data == "") {
              that.setData({
                hidden: false,
              })
            } else {
              that.setData({
                lists2: res.data.data,
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
    if (index == 3) {
      that.setData({
        showView: 3,
      })
      var Url = url + 'api/Coupon/pclist';
      var params = {}
      params.type = 3
      network.POST(Url, params,
        {
          success: function (res) {
            var lists3 = that.data.lists3;
            if (res.data.data == "") {
              that.setData({
                hidden: false,
              })
            } else {
              that.setData({
                lists3: res.data.data,
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
    that.setData({
      _num: e.target.dataset.index,
    })

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