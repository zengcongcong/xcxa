var network = require("../../../utils/untils.js");
var url = 'https://dev.unionglasses.com/'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodLists: [],
    hidden: true,
    page: 1,
    pageSize: 10,
    url: 'https://dev.unionglasses.com',
  },
  /**
   * 生命周期函数--监听页面加载
   */
  detail: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    console.log(e)
    wx.navigateTo({
      url: '../myorder/refundDetail/refundDetail?id=' + id,
    })
  },
  // 删除;
  del: function (e) {
    var that = this;
    let deldeid = e.currentTarget.dataset.id;

    let goodLists = that.data.goodLists;
    let newallData = [];
    for (var i in goodLists) {
      var item = goodLists[i];
      if (item.id != deldeid) {
        newallData.push(item);
      }
    }
    var Url = url + 'api/Order/refundDel';
    var params = {};
    params.id = deldeid
    network.POST(Url, params,
      {
        success: function (res) {
          if (res.data._c == 0) {
            that.setData({
              goodLists: newallData
            })
            wx.showToast({
              title: "删除成功",
              icon: 'none'
            })
          } else {
            wx.showToast({
              title: res.data._m,
              icon: 'none'
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
  onLoad: function (options) {
    var that = this;
    that.getinfo('加载数据中...');
  },
  getinfo: function (message) {
    var that = this;
    var shopinf = that.data.shopinf;
    var total = that.data.total;
    var Url = url + 'api/Order/refundList';
    var params = {};
    network.POST(Url, params,
      {
        success: function (res) {
          var contentlistTem = that.data.goodLists;
          var page = res.data._d.pagi._pn;
          if (res.data._d.list == "") {
            that.setData({
              hidden: false,
            })
          }
          if (res.data._c == 0) {
            if (page == 1) {
              contentlistTem = []
            }
            var goodLists = res.data._d.list;
            // console.log(goodLists)
            if (goodLists.length < that.data.pageSize) {
              that.setData({
                goodLists: contentlistTem.concat(goodLists),
                hasMoreData: false
              })
            } else {
              that.setData({
                goodLists: contentlistTem.concat(goodLists),
                hasMoreData: true,
                page: page + 1,
              })
            }
            wx.showToast({
              title: message,
              icon: 'loading'
            })
          } else {
            wx.showToast({
              title: res.data._m,
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
    var that = this
    that.getinfo('正在刷新数据');
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.hasMoreData) {
      var that = this
      params._pn = that.data.page;
      this.getinfo('正在刷新数据');
    } else {
      wx.showToast({
        title: '没有更多数据',
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})