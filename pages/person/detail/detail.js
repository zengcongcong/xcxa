var network = require("../../../utils/untils.js");
var url = 'https://dev.unionglasses.com/';
var id = "";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    billinf: "",
    orderinf: "",
    shopinf: [],
    url: "https://dev.unionglasses.com/"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    id = options.id;
    that.getlist();
  },
  // 列表
  getlist: function () {
    var that = this;
    var params = {};
    var Url = url + 'api/Order/detail';
    params.id = id;
    network.POST(Url, params,
      {
        success: function (res) {
          console.log(res.data._d)
          var billinf = that.data.billinf;
          var orderinf = that.data.orderinf;
          var shopinf = that.data.shopinf;
          if (res.data._c == 0) {
            that.setData({
              billinf: res.data._d.billinf,
              orderinf: res.data._d.orderinf,
              shopinf: res.data._d.shopinf,
            })
          }
        },
        fail: function (res) {
          wx.showToast({
            title: '加载数据失败',
            icon: 'loading'
          })
        },
      })


  },
  // 点击退款
  tuikuan: function (e) {
    var id = e.currentTarget.dataset.id
    console.log(id)
    wx.navigateTo({
      url: '../myorder/refund/refund?id=' + id,
    })
  },
  // 点击拒绝退款
  jjtk: function (e) {
    var id = e.currentTarget.dataset.id
    console.log(id)
    wx.navigateTo({
      url: '../myorder/refundDetail/refundDetail?id=' + id,
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