var network = require("../../../utils/untils.js");
var url = 'https://dev.unionglasses.com/'
Page({
  data: {
    goodLists: [],
    page: 1,
    photos1: true,
    photos2:false,
    hidden: true,
    pageSize: 10,
    hasMoreData: true,
    curHdIndex: 0,
  },


  onLoad: function (options) {
    console.log(options)
    var that = this;
    that.setData({
      curHdIndex: options.index
    })
    var params = {};
    params = that.getParams();
    that.getMusicInfo(params, '正在刷新数据');
  },
  // 确认收货
  qrsdh: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    var params = {};
    params.order_id = id;
    var Url = url + 'api/order/confirmReceipt';
    network.POST(Url, params,
      {
        success: function (res) {
          if (res.data._c == 0) {
            that.setData({
              curHdIndex: '3'
            })
            var params = {};
            params = that.getParams();
            that.getMusicInfo(params, '正在刷新数据');
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

  // 删除订单
  delete: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.id;

    let goodLists = that.data.goodLists;
    let newallData = [];
    for (var i in goodLists) {
      var item = goodLists[i];
      if (item.id != id) {
        newallData.push(item);
      }
    }
    console.log(newallData)
    var params = {};
    params.id = id;
    var Url = url + 'api/order/delOrder';
    network.POST(Url, params,
      {
        success: function (res) {
          if (res.data._c == 0) {
            wx.showToast({
              title: '删除成功',
            })
            that.setData({
              goodLists: newallData
            });
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
  tabFun: function (e) {
    var curHdIndex = 0;
    var _datasetId = e.target.dataset.id;

    var that = this;
    this.setData({
      curHdIndex: _datasetId,
      page: 1
    });
    var params = {}
    params = that.getParams()

    that.getMusicInfo(params, '加载数据中...')
  },

  //设置参数
  getParams: function () {
    var that = this;
    var params = {};

    var curHdIndex = that.data.curHdIndex;
    console.log(curHdIndex)
    switch (curHdIndex) {
      case '1':
        params.status = '1';
        break;
      case '2':
        params.status = '3';
        break;
      case '3':
        params.status = '4';
        break;
      case '4':
        params.status = '5';
        break;
      default:
        params.status = '-1';
    }
    params._pn = that.data.page;
    return params;
  },
  // 进入详情页
  detail: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../detail/detail?id=' + id
    })
  },

  // 列表
  getMusicInfo: function (params, message) {
    var that = this;
    that.setData({
      hidden: true,
    })
    var Url = url + 'api/order/myOrderList';
    network.POST(Url, params,
      {
        success: function (res) {
          var contentlistTem = that.data.goodLists;
          var page = res.data._d.pagi._pn;
          console.log(params)
          if (params.status == "5"){
            if (res.data._d.list == "") {
              that.setData({
                hidden: false,
                photos1: true,
                photos2: false,
              })
            }
          }
          if (res.data._d.list == "") {
            that.setData({
              hidden: false,
            })
          } 
          console.log(that.data)
          if (res.data._c == 0) {
            if (page == 1) {
              contentlistTem = []
            }
            var goodLists = res.data._d.list;
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
  // 评价
  pingjia: function (e) {

    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: 'uncomment/uncomment?id=' + id,
    })
  },

  onPullDownRefresh: function () {
    var that = this

    var params = {};
    params = that.getParams();

    that.getMusicInfo(params, '正在刷新数据');
  },

  onReachBottom: function () {
    if (this.data.hasMoreData) {
      var that = this
      var params = {};
      params = that.getParams();
      params._pn = that.data.page;
      console.log(that.data.page)
      this.getMusicInfo(params, '正在刷新数据');
    } else {
      wx.showToast({
        title: '没有更多数据',
      })
    }
  },
  onReady: function () {

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})