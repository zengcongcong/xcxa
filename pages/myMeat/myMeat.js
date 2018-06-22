
var network = require("../../utils/untils.js");
var url = 'https://dev.unionglasses.com/'
// var buttonClicked = function (that) {
//   that.setData({
//     buttonClicked: false
//   })
//   setTimeout(function () {
//     that.setData({
//       buttonClicked: true
//     })

//   }, 500);

// }
var item ={};
Page({
  data: {
    page: 1,
    all:true,
    pageSize: 10,
    showView: 2,
    itemActive: 2,
    height: '',
    urls:'https://dev.unionglasses.com/',
    Lists:[],
    List:[],
    params:{},
    selist:[
    ],
  },
  // 列表
  getlist: function (message){
    var that = this;
    var Url = url + 'api/Index/goods';
    var params = that.data.params;
    network.POST(Url, params,
      {
        success: function (res) {
 
          var contentlistTem = that.data.List;
          var page = that.data.page;
          if (res.data._c == 0) {
            if (page == 1) {
              contentlistTem = []
            }
            var List = res.data._d;            
            if (List.length < that.data.pageSize) {
              that.setData({
                List: contentlistTem.concat(List),
                hasMoreData: false
              })
            } else {
              that.setData({
                List: contentlistTem.concat(List),
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

  onLoad: function (options) {
    var that= this
 
    that.getlist();
    showView: (options.showView == "true" ? true : false)
    itemActive: (options.itemActive == "true" ? true : false)
    hidden: true;
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          height: res.windowHeight
        })
      }
    })
    var Urls = url + 'api/Index/cate';
    var params = {}
    network.POST(Urls, params,
      {
        success: function (res) {

            if (res.statusCode == 200) {
              var Lists = res.data._d.cates.map(function (item) {
              return {
                id: item.id,
                name: item.name,
                lst: item.lst
              }

            });
            that.setData({
                Lists
            })
          } else {
            wx.showToast({
              title: '网络错误',
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
  changes: function (e) {
    
    var index = e.currentTarget.id;
    var selist = this.data.selist
    for (var i = 0; i < this.data.Lists.length; i++) {
      selist[i] = selist[i] || {}
      if (i != index) {
        selist[i].ishow = 0;
      }
    }
    if (selist[index].ishow){
      selist[index].ishow = 0;
    }else{
      selist[index].ishow = 1;
    }
    
      this.setData({
        itemActive: e.currentTarget.id,
        showView: e.currentTarget.id,
        selist
      });
  },
  // 点击全部
  allShops:function(e){
    console.log()
    var index = e.currentTarget.dataset.index;
    var that = this;
    if (index == 0){
      that.setData({
        all: true,
        params: {},
        ['Lists[' + index + '].name']: '类别',
      })
    } else if (index == 1){
      that.setData({
        all: true,
        params: {},
        ['Lists[' + index + '].name']: '品牌',
      })
    }
    var selist = that.data.selist
    selist[that.data.itemActive].ishow = 0
    that.setData({
      ['params._pn']: 1,
      selist
    })
    that.getlist('正在刷新数据');
  },
  // 点击类别
  set: function (e) {
    var that = this;
    var lbs = e.currentTarget.dataset.name;
    var list = that.data.Lists;
    var index = e.currentTarget.dataset.index;
    var showView = that.data.showView;
    
     item = list[that.data.itemActive].lst[index]
     if (item.id != undefined && item.name != undefined ){
       list[that.data.itemActive].lst.push({
         id: list.id,
         name: list.name
       })

       list[that.data.itemActive] = {
         id: item.id,
         name: item.name,
         all:false,
         lst: list[that.data.itemActive].lst
       }

     }
 
  
    var selist = that.data.selist
    selist[that.data.itemActive].ishow=0
  
    that.setData({
      Lists: list,
      selist,
      page: 1,
      all: false,
    })
    that.setData({
      ['params._pn']: that.data.page,
      ['params.i1']: item.id
    })
    that.getlist('正在刷新数据');
  },

  detaileven: function (e) {
    var ids = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../template-details/template-details?id=' + ids,
    })
  },


  onPullDownRefresh: function () {
    var that = this
    that.setData({
      ['params._pn']:1
    })
    that.getlist( '正在刷新数据');
  },

  lower: function (e) {
    var that = this
  
    that.setData({
      ['params._pn']: that.data.page
    })
    if (that.data.hasMoreData) {
      that.getlist('正在刷新数据');
    } else {
      wx.showToast({
        title: '没有更多数据',
      })
    }
  },

})