var network = require("../../utils/untils.js");
var url = 'https://dev.unionglasses.com/';
var orglassesType = {};
const List = {
  'img': '/images/9.jpg',
  'bk': "爆款",
  'rx': "热销",
  'xp': "新品",
  'tlj': "跳楼价",
  'sz': "30%數字",
  'price': "555",
  "id": "0",
  'ys': "颜色",
  'cpsm': "产品说明",
  'count': "5",
  'kd': '10.00'
};
Page({
  data: {
    // start
    glassesType: {},
    tabGTIndex: '',
    sltData: {},
    shopid: 0,
    // end
    condition0: true,
    add: true,
    vals1: "",
    vals2: "",
    curBdIndex: 0,
    noscrollheight: "100%",
    noscrollhdidden: "hidden",
    info: {},
    'count': "5",
    chooseSize: false,
    chooseS: false,
    animationData: {},
    animationDatas: {},
    attrValueList: [],
    tabArr: {
      curHdIndex: 0,
      curBdIndex: 0
    },
  },
  gwcs: function (e) {
    console.log(e)
    wx.switchTab({
      url: '../myCart/myCart',
    })
  },
  chooseS: function (e) {

    var that = this
    var chooseS = that.data.chooseS;
    // 创建一个动画实例
    var animation = wx.createAnimation({
      // 动画持续时间
      duration: 500,
      // 定义动画效果，当前是匀速
      timingFunction: 'linear'
    })
    // 将该变量赋值给当前动画
    that.animation = animation
    // 先在y轴偏移，然后用step()完成一个动画
    animation.translateY(200).step()
    // 用setData改变当前动画
    that.setData({
      // 通过export()方法导出数据
      animationDatas: animation.export(),
      // 改变view里面的Wx：if
      chooseS: true,

    })
    // 设置setTimeout来改变y轴偏移量，实现有感觉的滑动
    setTimeout(function () {
      animation.translateY(0).step()
      that.setData({
        animationDatas: animation.export(),

      })
    }, 200)

  },
  hideModals: function (e) {
    var that = this;
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'linear'
    })
    that.animation = animation
    animation.translateY(200).step()
    that.setData({
      animationDatas: animation.export()


    })
    setTimeout(function () {
      animation.translateY(0).step()
      that.setData({
        animationDatas: animation.export(),
        noscrollheight: "100%",
        chooseS: false
      })
    }, 200)
  },
  chooseSezi: function (e) {
    var _obj = {};
    _obj.curHdIndex = e.currentTarget.dataset.index;
    console.log(e.currentTarget.dataset.index)
    this.setData({
      tabArr: _obj,
      tabGTIndex: e.currentTarget.dataset.index
    });
    // 用that取代this，防止不必要的情况发生
    var that = this;
    // 创建一个动画实例
    var animation = wx.createAnimation({
      // 动画持续时间
      duration: 500,
      // 定义动画效果，当前是匀速
      timingFunction: 'linear'
    })
    // 将该变量赋值给当前动画
    that.animation = animation
    // 先在y轴偏移，然后用step()完成一个动画
    animation.translateY(200).step()
    // 用setData改变当前动画



    that.setData({
      // 通过export()方法导出数据
      animationData: animation.export(),
      // 改变view里面的Wx：if
      chooseSize: true,
    })
    // 设置setTimeout来改变y轴偏移量，实现有感觉的滑动
    setTimeout(function () {
      animation.translateY(0).step()
      that.setData({
        animationData: animation.export()
      })
    }, 200)
  },
  hideModal: function (e) {
    var that = this;
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'linear'
    })
    that.animation = animation
    animation.translateY(200).step()
    that.setData({
      animationData: animation.export()


    })
    setTimeout(function () {
      animation.translateY(0).step()
      that.setData({
        animationData: animation.export(),
        noscrollheight: "100%",
        chooseSize: false
      })
    }, 200)
  },
  // 点击确定
  selevent: function (e) {
    console.log(e)
    var that = this
    var sltData = that.data.sltData;
    var tabGTIndex = that.data.tabGTIndex
    var seltype = e.currentTarget.dataset.item,
      selindex = e.currentTarget.dataset.index,
      glassesType = that.data.glassesType;
    sltData[tabGTIndex] = sltData[tabGTIndex] || []
    if (seltype == 1) {
      var item = glassesType[tabGTIndex][selindex]
      if (item.checked) {
        item = orglassesType[tabGTIndex][selindex]
        item.checked = false
        delete sltData[tabGTIndex]
      } else {
        item.checked = true
        sltData[tabGTIndex] = glassesType[tabGTIndex][selindex].val
      }
    } else if (seltype == 2) {
      var item = glassesType[tabGTIndex].data[selindex]
      if (item.checked) {
        glassesType[tabGTIndex].data[selindex] = orglassesType[tabGTIndex].data[selindex]
        glassesType[tabGTIndex].data[selindex].checked = false
        delete sltData[tabGTIndex]
      } else {
        item.checked = true
        sltData[tabGTIndex] = item.val
      }
    }
    // console.log(sltData)
    this.setData({
      glassesType
    })
  },
  completed: function () {
    var that = this
    that.hideModals()
    var sltData = that.data.sltData
    that.setData({
      chooseSize: false,
      sltData
    })
    var Url = url + '/api/Goods/getDynamicAttr';
    console.log(sltData)
    var params = {
      gid: that.data.shopid,
      param: JSON.stringify(sltData)
    };
    network.POST(Url, params,
      {
        success: function (res) {
          var reqglassesType = {},
            glassesType = that.data.glassesType
          reqglassesType = res.data.data
          if (sltData) {
            for (var i in sltData) {
              reqglassesType[i] = glassesType[i]
            }
          }
          for (var i in reqglassesType) {
            if (reqglassesType[i].name) {
              for (var j = 0; j < reqglassesType[i].data.length; j++) {
                var resobj = []
                var item = reqglassesType[i].data[j]
                if (!item.val) {
                  resobj = {
                    val: item,
                    checked: false
                  }
                  reqglassesType[i].data[j] = resobj
                }
              }
            } else {
              for (n = 0; n < reqglassesType[i].length; n++) {
                var resobj = {};
                if (reqglassesType[i][n].start == reqglassesType[i][n].end) {
                  resobj = {
                    val: reqglassesType[i][n].start,
                    checked: false
                  }
                  reqglassesType[i].push(resobj)
                } else {
                  for (var j = reqglassesType[i][n].start; j <= reqglassesType[i][n].end; j += reqglassesType[i][n].step) {
                    resobj = {
                      val: j,
                      checked: false
                    }
                    reqglassesType[i].push(resobj)
                  }
                }
              }
            }
          }
          that.setData({
            glassesType: reqglassesType
          })
          console.log(reqglassesType)
        },
        fail: function (res) {
          wx.showToast({
            title: '网络错误',
          })
        },
      })
    // network.AjaxExt(Url, pdata, 'POST', function (res) {
    //   if (res.isOk) {
    //     console.log(res)
    //   }
    // })
  },

  oppen2: function (e) {
    var vals2 = this.data.vals2
  },
  youhuij: function (e) {

    var that = this;

    let index = e.currentTarget.dataset.index;

    that.data.yuj[index].status = 1;

    that.setData({
      ['yuj[' + index + '].ljsy']: '领取成功',
      ['yuj[' + index + '].status']: 1
    })

    // console.log(that.data)

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    // var shopid = options.query
    var shopid = 3
    showView: (options.showView == "true" ? true : false)
    var that = this;
    that.setData({
      shopid
    })
    that.getTypelist()
  },
  getTypelist: function () {
    var that = this;
    var Url = url + 'api/goods/detail';
    var params = {};
    params.id = that.data.shopid;
    network.AjaxExt(Url, params, 'POST', function (res) {
      if (res.isOk) {
        var typeObj = res.data._d.shop_glasses_type;
        that.filterDatas(typeObj)
      }
    });
  },
  filterDatas: function (typeObj) {
    var that = this
    for (var i in typeObj) {
      var k = i,
        n = 0;
      if (typeObj[i].name) {
        orglassesType[k] = orglassesType[k] || {};
        orglassesType[k].name = typeObj[i].name;
        orglassesType[k].data = [];
        for (n = 0; n < typeObj[i].data.length; n++) {
          var item = typeObj[i].data[n];
          orglassesType[k].data[n] = orglassesType[k].data[n] || [];
          orglassesType[k].data[n] = {
            val: item,
            checked: false
          };
        }
        continue;
      }
      for (n = 0; n < typeObj[i].length; n++) {
        var obj = {};
        orglassesType[k] = resd[k] || [];
        if (typeObj[i][n].start == typeObj[i][n].end) {
          obj = {
            val: typeObj[i][n].start,
            checked: false
          }
          orglassesType[k].push(obj)
        } else {
          for (var j = typeObj[i][n].start; j <= typeObj[i][n].end; j += typeObj[i][n].step) {
            obj = {
              val: j,
              checked: false
            }
            orglassesType[k].push(obj)
          }
        }
      }
    }
    // console.log(res.data._d)
    that.setData({
      glassesType: orglassesType
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (options) {
    var sjc = 1488481383;
    // console.log(network.formatTime(sjc, 'Y/M/D h:m:s'));
    // console.log(network.formatTime(sjc, 'h:m'));
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
