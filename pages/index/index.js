//index.js
//获取应用实例
const app = getApp()
var network = require("../../utils/untils.js");
var url = 'https://dev.unionglasses.com/'
var buttonClicked = function (that) {
  that.setData({
    buttonClicked: false
  })
  setTimeout(function () {
    that.setData({
      buttonClicked: true
    })

  }, 100);

}

Page({
  data: {
    Height: "",
    hd: "",
    swiper:"",
    content: "",
    titles:"",
    sublists:"",
    List:[],
    gname:"",
  },
  onLoad: function () {
    var that= this;
    var Url = url+'api/Index/home';
    network.POST(Url,params,
      {
        success: function (res) {
          if (res.data._c == 0){

            var swiper = that.data.swiper;
            var sublists = that.data.sublists;
            that.setData({
              swiper: res.data._d.slider,
              content: res.data._d.navbar,
              titles: res.data._d.model1.title,
              sublists: res.data._d.model1.sublist
            })
           
          }else{
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
// 请求推荐商品
    var Urls = url+'api/Index/newProduct';
    //写入参数
    var params = new Object()
    params.tags = "1"
    network.POST(Urls, params,
      {
        success: function (res) {
        
          if (res.data._c ==0) {
           
            var list = res.data._d.list.map(function(item){
              return {
                bk: item.tags.substring(0,2),
                title: item.title,
                img: 'https://dev.unionglasses.com/'+item.img[0],
                tags: item.tags,
                price: item.price,
                id: item.id,
              }
            });
  
            that.setData({
              List: list
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
  imgHeight: function (e) {
    var winWid = wx.getSystemInfoSync().windowWidth; //获取当前屏幕的宽度
    var imgh = e.detail.height;//图片高度;
    var imghs = imgh / 2;
    var hd = this.data.hd;
    var imgw = e.detail.width;//图片宽度
    var imgws = imgw / 2;
    var swiperH = winWid * imghs / imgws +'px'//等比设置swiper的高度。 即 屏幕宽度 / swiper高度 = 图片宽度 / 图片高度  ==》swiper高度 = 屏幕宽度 * 图片高度 / 图片宽度
    this.setData({
      Height: swiperH,
      hd: swiperH,
    })
  },
  // 跳转详情页面
  gotoDetailHandler: function (e) {
    var id = e.currentTarget.dataset.id;
    if (this.data.buttonClicked) {
      wx.navigateTo({
        url: '../template-details/template-details?id=' + id,
      })
    }
    buttonClicked(this);
  },
  tabar: function (e) {
    var ind = e.currentTarget.dataset.index
    if (ind == 2) {
      wx.navigateTo({
        url: '/pages/Coupon/Coupon',
      })
    } else if (ind == 0){
      wx.navigateTo({
        url: '/pages/index/sign/sign',
      })
    } else if (ind == 1) {
      wx.navigateTo({
        url: '/pages/newProduct/newProduct',
      })
    } else if (ind == 3) {
      wx.navigateTo({
        url: '/pages/newProduct/newProduct',
      })
    }
  },
  // 点击搜索

  bindInput: function (e) {
    this.setData({
      gname: e.detail.value
    })

  },
  sousuo: function (e) {
    wx.navigateTo({
      url: '../newProduct/newProduct?gname=' + this.data.gname,
    })
  },
  onShow:function()
  {
    
  }

})
