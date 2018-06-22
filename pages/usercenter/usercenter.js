
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
})