var network = require("../../../utils/untils.js");
var url = 'https://dev.unionglasses.com/'
var GetSignInfo = function (that) {
  var Url = url + 'api/User/sign';
  var params = {}
  network.POST(Url, params,
    {
      success: function (res) {
        // console.log(res)
        var infData = res.data.data;
        var datas = that.data.datas;
        that.setData({
          datas: res.data.data
        })

        var curdate = new Date(infData.curtime * 1000);
        var bn = infData.conCnt;
        if (infData.isSign) {
          bn--;
        }
        var newData = [];
        var iterdate = new Date((infData.curtime - bn * 86400) * 1000);
        for (var i = 0; i < infData.totCnt; i++) {
          var newObj = {};
          if (i > 0) {
            iterdate.setDate(iterdate.getDate() + 1);
          }
          newObj.date_value = iterdate.getDate();

          if (i >= infData.conCnt) {
            newObj.isSign = 0;
          } else {
            newObj.isSign = 1;
          }
          newData[i] = newObj;
        }
        var list = that.data.list
        that.setData({
          list: newData,
        })

      },
      fail: function (res) {
        wx.showToast({
          title: '网络错误',
        })
      },
    })
  var Url = url + 'api/User/erpUserInfo';
  var params = {}
  network.POST(Url, params,
    {
      success: function (res) {
        // console.log(res.data.data)
        var dated = that.data.dated;
        that.setData({
          dated: res.data.data,
        })
      },
      fail: function (res) {
        wx.showToast({
          title: '网络错误',
        })
      },
    })
 
}
Page({
  data: {
    showview: 4,
    jjifen: 10, 
    list:[],
    text:[],
    datas:"",
    dated:"",
    lsize: 0,
    imgs: '../../../../../images/sign-star1.png',
  },
  stars:function(){
    var that = this
    var lsize = that.data.lsize
    setTimeout(function () {
      that.setData({
        lsize: 0,
      })
    }, 500);
  },
  // 点击签到
  price: function (e) {
    var that = this;
    var Url = url + 'api/User/doSignPoint';
    var params = {}
    network.POST(Url, params,
      {
        success: function (res) {
          var showview = that.data.showview
          if (res.data._c ==1){
            that.setData({
              showview:1,
            })
          }else{
            var jjifen = that.data.jjifen;
            var text = that.data.text;
            if (res.data.data.type == 1) {
              that.setData({
                showview: 0,
                jjifen: parseInt(res.data.data.inip) + parseInt(res.data.data.add),
                text: [
                  res.data.data.inip + '+' + res.data.data.add,
                  '连续签到可获得更多',
                  '更多积分'
                ],
              })
            }else{
              that.setData({
                showview: 0,
                jjifen: res.data.data.dayp,
                text: [
                  res.data.data.dayp,
                  '再签到' + res.data.data.days + '天就可获得额外',
                  res.data.data.bonp + '积分'
                ],
              })
            }
            GetSignInfo(that);
          }
        
        },
        fail: function (res) {
          var showview = that.data.showview
            that.setData({
              showview: 2,
            })
        },
      })
  },
  closed: function () {
    var that = this;
    that.setData({
      showview: 5,
    })
  },
  onLoad: function (options) {
    GetSignInfo(this);
  },  

  onPullDownRefresh: function () {
    console.log(1111)
    // this.data.page = 1
    // this.getMusicInfo('正在刷新数据')
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log(1111)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this
    setTimeout(function () {
      console.log(that.data.list)
      var lists = that.data.list
      var offset = 0;
      for (var i = 0; i < lists.length; i++) {
        if (lists[i].isSign == 1) {
          offset++;
        }
      }
      var offlength = -(offset - 1) * 70;
      that.setData({
        lsize: offlength,
      });
    }, 100);
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})