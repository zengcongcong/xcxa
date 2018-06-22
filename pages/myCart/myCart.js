var network = require("../../utils/untils.js");
var url = 'https://dev.unionglasses.com/';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    startX: 0, //开始坐标
    startY: 0,
    bottom:true,
    showView: false,
    page: 1,
    urls:"",
    pageSize: 10,
    hasMoreData: true,
    goodLists:[],
    'checkAll': false,
    totalCount: 0,
    totalPrice: 0
  },  
  // 去首页看看
  indexss:function(){
      wx.switchTab({
        url: '/pages/index/index',
      })
  },
  // 列表;
  hitlist: function (message){
    var that =this
    var Url= url + 'api/Scart/scart';
    
    var params = {}
    params._pn = that.data.page;
    network.POST(Url, params,
      {
        success: function (res) {
          var contentlistTem = that.data.goodLists;
          var page = that.data.page;
          if (res.data._c == 0) {
            if (page == 1) {
              contentlistTem = []
            }
            var goodLists = res.data._d.list;;
            console.log(goodLists)
            if (goodLists == ""){
              that.setData({
                showView:true,
                bottom:false,
              })
            }else{
              that.setData({
                showView: false,
                bottom: true,
              })
            }
            for (var i = 0; i < goodLists.length; i++) {
              goodLists[i]['checked'] = false;
              goodLists[i]['isTouchMove'] = false;
            }

            if (goodLists.length < that.data.pageSize) {
              that.setData({
                goodLists: contentlistTem.concat(goodLists),
                hasMoreData: false,
                urls: url,
              })
            } else {
              that.setData({
                goodLists: contentlistTem.concat(goodLists),
                hasMoreData: true,
                urls: url,
                page: that.data.page + 1,
              })
            }
            that.calculateTotal();
     
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

// 去结算
  jsje:function(){
    var lists = [];
    var goodLists = this.data.goodLists
    for (var i = 0; i < goodLists.length; i++) {
      var new_obj = {};
      if (goodLists[i].checked == true) {
        new_obj.id = goodLists[i].id;
        new_obj.num = goodLists[i].num;
      }
      if (JSON.stringify(new_obj) != "{}")
      {
        lists.push(new_obj)
      }
    }
  
    var params = {};
    params.slt = JSON.stringify(lists);
    var Url = url + '/api/Scart/crtOrder';
    network.POST(Url, params,
      {
        success: function (res) {
          if (res.data._c == 0) {
            wx.navigateTo({
              url: '../myCart/Order/Order?sc_id=' + res.data.sc_id,
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
  //购物车数量
  // getCartNum: function () {
  //   var Url = url + 'api/scart/cartNum';
  //   var params = {}
  //   network.POST(Url, params,
  //     {
  //       success: function (res) {       
  //         nums = JSON.stringify(res.data.num)
  //         if (nums > 9) {
  //           nums = '9+'
  //         }
  //         wx.setTabBarBadge({
  //           index: 2,
  //           text: nums,
  //         })

  //       },
  //       fail: function (res) {
  //         wx.showToast({
  //           title: '网络错误',
  //         })
  //       },
  //     })
  // },
  onLoad: function (options) {
    var that = this;
    
    that.hitlist('正在加载数据...')
    // that.getCartNum()
  },
  //手指触摸动作开始 记录起点X坐标
  touchstart: function (e) {
    //开始触摸时 重置所有删除
    this.data.goodLists.forEach(function (v, i) {
      if (v.isTouchMove)//只操作为true的
        v.isTouchMove = false;
    })
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      goodLists: this.data.goodLists
    })
  },
  //滑动事件处理
  touchmove: function (e) {

    var that = this,
      index = e.currentTarget.dataset.index,//当前索引
      startX = that.data.startX,//开始X坐标
      startY = that.data.startY,//开始Y坐标
      touchMoveX = e.changedTouches[0].clientX,//滑动变化坐标
      touchMoveY = e.changedTouches[0].clientY,//滑动变化坐标
      //获取滑动角度
      angle = that.angle({ X: startX, Y: startY }, { X: touchMoveX, Y: touchMoveY });
    that.data.goodLists.forEach(function (v, i) {
      v.isTouchMove = false
      //滑动超过30度角 return
      if (Math.abs(angle) > 30) return;
      if (i == index) {
        if (touchMoveX > startX) //右滑
          v.isTouchMove = false
        else //左滑
          v.isTouchMove = true
      }
    })
    //更新数据
    that.setData({
      goodLists: that.data.goodLists
    })
  },

  /**
    * 计算滑动角度
    * @param {Object} start 起点坐标
    * @param {Object} end 终点坐标
    */
  angle: function (start, end) {
    var _X = end.X - start.X,
      _Y = end.Y - start.Y
    //返回角度 /Math.atan()返回数字的反正切值
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
  },
  // 修改数量
  adds: function (e) {
    var that = this;
    var value = e.detail.value
    var index = e.currentTarget.dataset.index;
    console.log(value)
    // console.log(this.data.goodLists[index].)
    // if (parseInt(value) >= parseInt(that.data.infos.shopinf[index].stock))
    // if (parseInt(value) >= parseInt(that.data.infos.shopinf[index].stock)) {
    //   that.setData({
    //     ['infos.shopinf[' + index + '].num']: that.data.infos.shopinf[index].stock,
    //   })
    //   wx.showToast({
    //     title: '大于库存数量',
    //     icon: 'none',
    //   })
    // } else {
    //   that.setData({
    //     ['infos.shopinf[' + index + '].num']: e.detail.value,
    //   })
    // }
    // that.changeCoupon(index);
  },


  //删除事件
  del: function (e) {
    var that = this
    var goodLists = that.data.goodLists;
    var ids = e.currentTarget.dataset.id
    var Url = url + 'api/scart/cartDel';
    
    var params = {}
    params.id = ids 
    network.POST(Url, params,
      {
        success: function (res) {
         
          if(res.data._c == 0){
              wx.showToast({
                title: '删除成功',
              })
              var app = getApp();
              var nums = app.globalData.nums;
              nums--;
              wx.setTabBarBadge({
                index: 2,
                text: nums+'',
              })
              app.globalData.nums = nums;
          }
          goodLists.splice(e.currentTarget.dataset.index, 1);
          that.setData({
            goodLists: goodLists
          });
        },
        fail: function (res) {
          wx.showToast({
            title: '网络错误',
          })
        },
      })



    this.setData({
      goodLists: this.data.goodLists
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  onPullDownRefresh: function () {
    this.data.page = 1
    this.hitlist('正在刷新数据')
  },

  onReachBottom: function () {
    console.log(11111)
    if (this.data.hasMoreData) {
      this.hitlist('加载更多数据')
    } else {
      wx.showToast({
        title: '没有更多数据',
      })
    }
  },
  /**
   * 计算商品总数
   */
  calculateTotal: function () {
    var that = this
    var goodLists = that.data.goodLists;
    var totalCount = 0;
    var totalPrice = 0;
    for (var i = 0; i < goodLists.length; i++) {
      var good = goodLists[i]
      if (good.checked) {
        totalCount += good.num;
        totalPrice += good.num * good.o_price;
      }
    }
    totalPrice = totalPrice.toFixed(2);
   
    that.setData({
      totalCount: totalCount,
      totalPrice: totalPrice
    })
  },
    /**
 * 用户点击商品减1
 */
  subtracttap: function(e){
   var index = e.target.dataset.index;;
    var goodLists = this.data.goodLists;

    var num = goodLists[index].num;
    if (num <= 1) {
      return;
    } else {
      goodLists[index].num--;
      this.setData({
        goodLists: goodLists,
      })

      this.calculateTotal();
    }

  },

//   * 用户点击商品加1
//  */
  addtap: function (e) {
    var index = e.target.dataset.index;
    var goodLists = this.data.goodLists;
    var num = goodLists[index].num;
    goodLists[index].num++;
    this.setData({
      goodLists: goodLists
    });
    this.calculateTotal();
  },
  /**
   * 用户选择购物车商品
   */
  checkboxChange: function (e) {
    var values = e.detail.value;
    var checkboxItems = this.data.goodLists;
    for (var i = 0; i < checkboxItems.length; i++){
      checkboxItems[i].checked = false;
      for (var j = 0; j < values.length; j++){
        if (checkboxItems[i].id == values[j]){
          checkboxItems[i].checked = true;
          break;
        }
      }
      var checkAll = false;
      if (checkboxItems.length == values.length) {
        checkAll = true;
      }

      this.setData({
        goodLists: checkboxItems,
        checkAll: checkAll
      });
      this.calculateTotal();
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  // 监控购物车事件
  onShow: function () {
    var app = getApp();
    var that = this
    if (app.globalData.refreshFlag == true) {
      app.globalData.refreshFlag = false
      that.data.page = 1
      that.hitlist('正在加载数据...')
      var app = getApp();
      var nums = app.globalData.nums;
      console.log(nums);
      wx.setTabBarBadge({
        index: 2,
        text: nums + '',
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
  /**
 * 用户点击全选
 */
  selectalltap: function (e) {
    var value = e.detail.value;
    var checkAll = false;
    if (value && value[0]) {
      checkAll = true;
    }
    var goodLists = this.data.goodLists;
    for (var i = 0; i < goodLists.length; i++) {
      var good = goodLists[i];
      good['checked'] = checkAll;
    }
    this.setData({
      checkAll: checkAll,
      goodLists: goodLists
    });
    this.calculateTotal();

  },
})