var network = require("../../utils/untils.js");
var url = 'https://dev.unionglasses.com/';
var WxParse = require('../../wxParse/wxParse.js');
var lists = [];
var status = false;
// var paramsed = [];
// var keys = [];

var sltNum = 0;
Page({
  data: {
    yuj:[],
    sltData: {},
    canclesltData: {},
    nums: "",
    hidden: true,
    modalFlag: true,
    tabGTIndex: '',
    shopid: 0,
    glassesType: {},
    shopinf: [],
    sx: {},
    xunhuan: [],
    mediainf: "",
    urls: "",
    dataes: "",
    keysed: "",
    commentList: "",
    condition0: true,
    curBdIndex: 0,
    noscrollheight: "100%",
    noscrollhdidden: "hidden",
    info: {},
    chooseSize: false,
    chooseS: false,
    animationData: {},
    animationDatas: {},
    attrValueList: [],
    tabArr: {
      curHdIndex: 0,
      curBdIndex: 0
    },
    orglassesType: {},
    imgheights: [],
    //图片宽度  
    imgwidth: 750,
    current: 0,
  },
  // 轮播图
  imageLoad: function (e) {
    //获取图片真实宽度  
    var imgwidth = e.detail.width,
      imgheight = e.detail.height,
      //宽高比  
      ratio = imgwidth / imgheight;
    //计算的高度值  
    var viewHeight = 750 / ratio;
    var imgheight = viewHeight
    var imgheights = this.data.imgheights
    //把每一张图片的高度记录到数组里  
    imgheights.push(imgheight)
    this.setData({
      imgheights: imgheights,
    })
  },
  bindchange: function (e) {
    this.setData({ current: e.detail.current })
  },
  gwcs: function (e) {
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
    var that = this
    var curIndex = e.currentTarget.dataset.index;
    var attr = that.data.glassesType[curIndex];

    var objA = {};
    var shop_glasses_type = that.data.glassesType;
    var radio_type = e.currentTarget.dataset.type;

    var arrAy = [];
    var new_sx = that.data.sx;
    var info = {};
    // if (radio_type == 1) {
    //   console.log("22222")
    //   for (var i = 0; i < attr.length; i++) {
    //     var data = attr[i];
    //     if (parseInt(data.start) == parseInt(data.end)) {
    //       arrAy.push(data.start);
    //       console.log(arrAy)
    //     } else {
    //       for (var k = data.start; k < data.end; k += data.step) {
    //         arrAy.push(k);
    //         console.log(arrAy)
    //       }
    //     }
    //   }
    // } else if (radio_type == 2) {
    //   arrAy = attr.data;
    // }

    for (var j = 0; j < new_sx.length; j++) {
      if (new_sx[j]['key'] == curIndex) {
        info.name = new_sx[j]['name'];
        info.key = new_sx[j]['key'];
        info.type = new_sx[j]['type'];
      }
    }
    info.attr_data = arrAy;
    that.setData({
      newarry: info
    })

    var _obj = {};

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
  youhuij: function (e) {
    var that = this;

    let index = e.currentTarget.dataset.index;
    var id = e.currentTarget.dataset.id;

    var Url = url + '/api/coupon/takeCoupon';
    var params = {};
    params.couponId = id;
    network.POST(Url, params,
      {
        success: function (res) {
          console.log(res.data)
          if (res.data._c == 0) {
            that.setData({
              ['yuj[' + index + '].is_received']: 1,
              ['yuj[' + index + '].status']: 1,
            })
            wx.showToast({
              title: '领取成功',
              icon: 'none',
            })
          } else {
            wx.showToast({
              title: res.data._m,
              icon: 'none',
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

  /**
   * 生命周期函数--监听页面加载
   */
  // 列表
  getlist: function () {
    var that = this;
    var Url = url + 'api/goods/detail';
    var params = {}
    params.id = that.data.shopid;
    network.POST(Url, params,
      {
        success: function (res) {
          if (res.data._c == 0) {
            var typeObj = that.filterDatas(res.data._d.shop_glasses_type)
            that.setData({
              orglassesType: typeObj,
              glassesType: typeObj
            })
            var shopinf = that.data.shopinf;
            var yuj = that.data.yuj;
            var sx = that.data.sx;
            var type = res.data._d.shop_glasses_type
            var mediainf = that.data.mediainf
            var commentList = that.data.commentList;
            var urls = that.data.urls;
            var arris = []
            // for (var i in type) {
            //   var newObj = {}
            //   if (i == 'ball') {
            //     newObj.name = '球镜'
            //     newObj.type = 1
            //   } else if (i == 'add') {
            //     newObj.name = 'add'
            //     newObj.type = 1
            //   } else if (i == 'pole') {
            //     newObj.name = '柱镜'
            //     newObj.type = 1
            //   } else {
            //     newObj.name = type[i].name
            //     newObj.type = 2
            //   }
            //   newObj.key = i
            //   arris.push(newObj)
            // }
             yuj = res.data._d.coupons;
             if (yuj.length != ""){
                that.setData({
                  hidden:false,
                })
             }
             for (var i = 0; i < yuj.length;i++){
               yuj[i].vt.s = network.formatTime(yuj[i].vt.s, 'Y-M-D')
               yuj[i].vt.e = network.formatTime(yuj[i].vt.e, 'Y-M-D')
             }
            that.setData({
              shopinf: res.data._d.shopinf,
              yuj: yuj,
              sx: arris,
              commentList: res.data._d.commentList,
              urls: url
            })
            console.log(that.data.yuj)
            var article = res.data._d.mediainf
            article = article.replace(/<img\s+src\s*=\s*["|']\/uploads\//g, '<img src="https://dev.unionglasses.com/uploads/');
            WxParse.wxParse('mediainf', 'html', article, that, 5);
          } else if (res.data._c == 1) {
            wx.showToast({
              title: res.data._m,
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



  filterDatas: function (typeObj) {
    var that = this
    var glassesobj = {};
    for (var i in typeObj) {
      var k = i,
        n = 0;
      if (typeObj[i].name) {
        glassesobj[k] = glassesobj[k] || {};
        glassesobj[k].name = typeObj[i].name;
        glassesobj[k].data = [];
        for (n = 0; n < typeObj[i].data.length; n++) {
          var item = typeObj[i].data[n];
          glassesobj[k].data[n] = glassesobj[k].data[n] || [];
          glassesobj[k].data[n] = {
            val: item,
            checked: false
          };
        }
        continue;
      }
      for (n = 0; n < typeObj[i].length; n++) {
        var obj = {};
        glassesobj[k] = glassesobj[k] || [];
        if (typeObj[i][n].start == typeObj[i][n].end) {
          obj = {
            val: typeObj[i][n].start,
            checked: false
          }
          glassesobj[k].push(obj)
        } else {
          for (var j = typeObj[i][n].start; j <= typeObj[i][n].end; j += typeObj[i][n].step) {
            obj = {
              val: j,
              checked: false
            }
            glassesobj[k].push(obj)

          }
        }
      }
    }
    return glassesobj;
  },
  oppens: function () {
    this.setData({
      chooseS: false,
    })
  },
  // 取消
  cancel:function(e){
    var that= this;
    that.setData({
      chooseSize: false,
    })
  },
  // 点击确定
  selevent: function (e) {
    var that = this
    var sltData = that.data.sltData;
    var tabGTIndex = that.data.tabGTIndex
    var seltype = e.currentTarget.dataset.item,
      selindex = e.currentTarget.dataset.index,
      glassesType = that.data.glassesType;
    sltData[tabGTIndex] = sltData[tabGTIndex] || []
    var canclesltData = that.data.canclesltData
    canclesltData[tabGTIndex] = canclesltData[tabGTIndex] || []

    if (seltype == 1) {
      var item = glassesType[tabGTIndex][selindex]
      console.log(item)
      if (item.checked) {
        glassesType[tabGTIndex][selindex].checked = false
        delete sltData[tabGTIndex]
      } else {
        for (var i = 0; i < glassesType[tabGTIndex].length; i++) {
          glassesType[tabGTIndex][i].checked = false
        }
        glassesType[tabGTIndex][selindex].checked = true;
        sltData[tabGTIndex] = glassesType[tabGTIndex][selindex].val;
        delete canclesltData[tabGTIndex]
      }
    } else if (seltype == 2) {
      var item = glassesType[tabGTIndex].data[selindex];
      console.log(item.checked);

      if (item.checked) {
        glassesType[tabGTIndex].data[selindex].checked = false
        delete sltData[tabGTIndex]
      } else {
        for (var i = 0; i < glassesType[tabGTIndex].data.length; i++) {
          glassesType[tabGTIndex].data[i].checked = false
        }
        glassesType[tabGTIndex].data[selindex].checked = true
        sltData[tabGTIndex] = item.val
        delete canclesltData[tabGTIndex]
      }
    }
    console.log(canclesltData)
    this.setData({
      sltData,
      canclesltData,
      glassesType
    })
  },
  completed: function () {
    var that = this
    that.hideModals()
    var sltData = that.data.sltData
    var num = 0
    var datanum = 0
    for (var i in sltData) {
      num++
    }

    that.setData({
      chooseSize: false
    })

    var Url = url + 'api/Goods/getDynamicAttr';

    var params = {
      gid: that.data.shopid,
      param: JSON.stringify(sltData)
    };
    for (var i in that.data.glassesType) {
      datanum++
    }
    if (num > 0 && num == datanum) {
      status = true;
      var Url = url + 'api/Goods/getGoodsERPInfo';
      network.POST(Url, params,
        {
          success: function (res) {
            var reqglassesType = res.data.data
            if (res.data._c == 1) {
              wx.showToast({
                title: res.data._m,
                icon: 'none'
              })
              return;
            } else {
              var list = res.data.data;
              var shopinf = that.data.shopinf;
              var new_shop_info = shopinf;
              console.log(res)
              if (res.data.data.photo == "") {
                new_shop_info.img = that.data.shopinf.img;
              } else {
                new_shop_info.img = list.photo;
              }
              new_shop_info.stock = list.stock;
              new_shop_info.goods_type = list.type;
              new_shop_info.salePrice = list.price;
              new_shop_info.is_oversell = list.is_oversell;
              new_shop_info.art_id = list.art_id;
              new_shop_info.attr_id = list.attr_id;

              that.setData({
                shopinf: new_shop_info
              })
            }

          },
          fail: function (res) {
            wx.showToast({
              title: '网络错误',
            })
            return;
          },
        })

    } else {
      network.POST(Url, params,
        {
          success: function (res) {
            var reqglassesType = res.data.data
            that.resetData(reqglassesType)
          },
          fail: function (res) {
            wx.showToast({
              title: '网络错误',
            })
          },
        })
    }
  },
  resetData(reqglassesType) {
    var that = this, sltData = that.data.sltData, glassesType = that.data.glassesType,   
      canclesltData = that.data.canclesltData, orglassesType = that.data.orglassesType
      var obj = that.filterDatas(reqglassesType)
    if (sltData) {
      for (var i in sltData) {
        obj[i] = glassesType[i]
      }
    }
    if (canclesltData) {
      for (var i in canclesltData) {
        obj[i] = orglassesType[i]
      }
    }
    that.setData({
      glassesType: obj
    })
  },

  watched: function () {
    var that = this
    console.log(that.data.shopid)
    wx.navigateTo({
      url: '../comment/comment?id=' + that.data.shopid,
    })
  },

  onLoad: function (options) {

    showView: (options.showView == "true" ? true : false)
    var shopid = options.id;
    // var shopid = 21;
    var that = this;
    that.setData({
      shopid
    })
    this.getlist()
    this.gwc()
  },
  gwc: function () {
    var that = this;
    var Url = url + 'api/scart/cartNum';
    var params = {}
    network.POST(Url, params,
      {
        success: function (res) {
          if (res.data.num > 9) {
            res.data.num  = '9+'
          }
          that.setData({
            nums: res.data.num + ''
          })

        },
        fail: function (res) {
          wx.showToast({
            title: '网络错误',
          })
        },

      })
  },



  // 加入购物车
  btnSave: function (e) {
    console.log(this.data)
    var that = this;
    var list = that.data.shopinf;
    console.log(list)
    if (status == false) {
      wx.showToast({
        title: '您还有未选择的商品属性',
        icon: 'none'
      })
      return;
    }
    if (list.stock <= 0) {
      if (list.is_oversell != 1) {
        wx.showToast({
          title: '库存数量不足',
          icon: 'none'
        })
      }
      return;
    }
    if (list.salePrice <= 0) {
      wx.showToast({
        title: '不能对金额为零的商品进行操作',
        icon: 'none'
      })
      return;
    }

    var pdata = {};
    pdata.data = JSON.stringify([{
      gid: list.id,
      price: list.salePrice || '',
      art_id: list.art_id || '',
      atid: list.attr_id || '',
      num: 1,
    }]);
    var Url = url + '/api/Scart/putToCart';
    var params = pdata;
    network.POST(Url, params,
      {
        success: function (res) {
          if (res.data._c == 0) {

            wx.showModal({
              title: "添加购物车成功",
              showCancel: false,
              confirmText: "是",
              confirmColor: "#000"
            })
            that.gwc();
            var app = getApp();
            app.globalData.refreshFlag = true
            var nums = app.globalData.nums;
            nums++;
            app.globalData.nums = nums;
          }

        },
        fail: function (res) {
          wx.showToast({
            title: '网络错误',
          })
        },
      })
  },
  // 立即购买
  btnshop: function () {

    var list = this.data.shopinf;
    console.log(list)
    if (status == false) {
      wx.showToast({
        title: '您未选择商品属性',
      })
      return;
    }
    if (list.stock <= 0) {
      if (list.is_oversell != 1) {
        console.log("333333")
        wx.showToast({
          title: '库存数量不足',
        })
        return;
      }
    }
    if (list.salePrice <= 0) {
      wx.showToast({
        title: '不能对金额为零的商品进行操作',
      })
      return;
    }
    wx.navigateTo({
      url: '../myCart/Order/Order?gid=' + list.id + '&aid=' + list.art_id + '&atid=' + list.attr_id,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (options) {
    network.formatTime(1488481383, 'Y-M-D');
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
