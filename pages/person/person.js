
Page({
  data: {
    avatarUrl: "",
    nickName: "未知"
  },
  onLoad() {
    wx.getUserInfo({
      success: (res) => {
        this.setData({
          avatarUrl: res.userInfo.avatarUrl,
          nickName: res.userInfo.nickName,
        })
      }
    })
  },
  daifuk: function (e) {
    wx.navigateTo({
      url: 'myorder/myorder?index=' + e.currentTarget.dataset.index,
    });
  },
  tuikuan: function () {
    wx.navigateTo({
      url: 'refundList/refundList',
    })
  },
  youhui: function () {
    wx.navigateTo({
      url: '../Coupon/Coupon',
    })
  },
  boda:function(){
    wx.makePhoneCall({
      phoneNumber: '1340000' 
    })
  },
  ardess:function(){
    wx.navigateTo({
      url: 'Address/Address',
    })
  },
})