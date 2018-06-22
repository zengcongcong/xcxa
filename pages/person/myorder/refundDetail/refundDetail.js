var network = require("../../../../utils/untils.js");
var url = 'https://dev.unionglasses.com/';
var id = "";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodLists:[],
    url: 'https://dev.unionglasses.com',
  },
  up:function(){
    var that =this;
    var id = that.data.goodLists.id;

    console.log(id)
    wx.showModal({
      title: '确认撤销申请？',
      // content: '这是一个模态弹窗',
      success: function (res) {
        if (res.confirm) {

          var Url = url + 'api/Order/cancelRefund';
          var params = {};
          params.id = id;
          network.POST(Url, params,
            {
              success: function (res) {
                if (res.data._c == 0) {
                  that.setData({
                    ['goodLists.refund_status']: '3',
                  })
                  wx.showToast({
                    title: '撤销成功',
                    icon: 'none',
                  })
                } else {
                  wx.showToast({
                    title: res.data._m,
                    icon:'none',
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

        }
      }
    })
  },
  phone:function(){

    wx.makePhoneCall({
      phoneNumber: this.data.goodLists.link_tel
    })
  },
  tiaoz:function(e){
    const { id } = e.currentTarget.dataset;
      wx.navigateTo({
        url: '../../../template-details/template-details?id=' + id,
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    id = options.id;
    that.getinfo();
  },
  getinfo: function (message) {
    var that = this;
    var shopinf = that.data.shopinf;
    var total = that.data.total;
    var Url = url + 'api/Order/refundDetail';
    var params = {};
    params.id=id;
    network.POST(Url, params,
      {
        success: function (res) {
          if(res.data._c==0){
            console.log(res.data._d.shopinf)
            that.setData({
              goodLists: res.data._d.shopinf
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