var network = require("../../utils/untils.js");
var url = 'https://dev.unionglasses.com/';
var num=[];
var id = "";
Page({
  data: {
    name:"AAAA",
    lists:[],
    one_1: '',
    two_1: '',  
    // wjx:"/images/wjx.jpg",
    wjx:[{
      wjxs0: "/images/wjx.jpg",
      wjxs1: "/images/wjx.jpg",
      wjxs2: "/images/wjx.jpg",
      wjxs3: "/images/wjx.jpg",
      wjxs4: "/images/wjx.jpg"

    }],
    time:"2017-12-28 19:40 ",
    sjtime:"2018-01-09 08:31",
    leix:"精工金属架",
  },
  /**
   * 生命周期函数--监听页面加载
   */
  // 列表
  getlist: function () {
    var that = this;
    var lists = that.data.lists
    var Url = url + 'api/goods/comment';
    var params = {}
    params.gid = id;
    // params._pn = 2;
    // params._lmt = 1
    network.POST(Url, params,
      {
        success: function (res) {
          if (res.data._c == 0) {
            console.log(res.data.data)
            var list = res.data.data.map(function (item) {
              var lochost = 'https://dev.unionglasses.com/';
              if (item.reply !== '' && item.reply !== undefined && item.reply !==null){
                for (var i = 0; i < item.reply.length; i++) {
                  item.reply[i].c1 = network.formatTime(item.reply[i].c1, 'Y-M-D h:m:s')
                }
              }
              
              return {
                vip_img: item.vip_img,
                vip_name: item.vip_name,
                attachment: item.attachment,
                star: item.star,
                id: item.id,
                reply: item.reply,
                classes: item.classes,
                content: item.content,
                ctime: network.formatTime(item.ctime, 'Y-M-D h:m:s'),
              }
            });
            var one_1 = that.data.one_1;
            var two_1 = that.data.two_1
            that.setData({
              lists: list,
            })
            var grayImg=[];
            var num=[];
            for (var i = 0; i < that.data.lists.length;i++){
              num[i] = num[i]||{}
              num[i] = parseInt(that.data.lists[i].star)
              grayImg[i] = grayImg[i] || {}
              grayImg[i] = 5 - num[i]
            }
            that.setData({
              one_1: num,
              two_1: grayImg
            })
          } else if (res.data._c == 1) {
            wx.showToast({
              title: 'res.data._m',
            })
          }

        },
        fail: function (res) {
          wx.showToast({
            title: '网络错误',
          })
        },

      })
  },
  onLoad: function (options) {
    console.log(options)
    id = options.id
    this.getlist()
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