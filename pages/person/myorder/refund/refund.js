
var network = require("../../../../utils/untils.js");
var url = 'https://dev.unionglasses.com/'
var id = "";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chooseSize: false,
    shopinf:[],
    total:"",
    values:"",
    img_l:[],
    url:"https://dev.unionglasses.com",
    animationData: {},
    tuyy: ["错拍", "不想要","多拍"],
    applytxt:" 多拍了，不想要了，想退货了",
    pics: [],
    count: [1, 2, 3],
    isShows: false,
    isShow: true,
  },
  chooseSezi: function (e) {
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
        chooseSize: false
      })
    }, 200)
  },
  radioChange: function (e) {
     var values= e.detail.value;
     this.setData({
       applytxt: values,
     })
  },
  oppen: function () {
    this.setData({
      chooseSize: false,
    })
  },
 
  // 图片上传
  chooseImage: function (e) {
    var _this = this;
    wx.chooseImage({
      count: 2, // 默认9  
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
      success: function (res) {
        var pics = _this.data.pics;
        var img_l = _this.data.img_l;

        var tempFilePaths = res.tempFilePaths;
        pics = pics.concat(tempFilePaths);
        if (pics.length >= 3) {
        
          _this.setData({
            isShow: (!_this.data.isShow)
          })
          console.log(!_this.data.isShow)
        } else {
          console.log("000")
          _this.setData({
            isShow: (_this.data.isShow)
          })
        }
        
       
        _this.setData({
          pics: pics
        })

        wx.uploadFile({
          url: url + 'api/order/upload', //接口  
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'user': 'test'
          },
          success: function (res) {
            var img_l = _this.data.img_l;
            var data = JSON.parse(res.data);
            var img = url + data._d.src;
            img_l.push(img);
            _this.setData({
              img_l: img_l
            })
          },
          fail: function (error) {
            console.log(error);
          }
        })

      }
    })
  }, 

  previewImage: function (e) {
    console.log(e)
    var current = e.target.dataset.src;
    console.log(current)
    wx.previewImage({
      current: current,
      urls: this.data.pics
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    isShow: (options.isShow == "true" ? true : false);
    id = options.id;
    that.getinfo()
  },
    // 列表
  getinfo: function () {
    var that = this;
    var shopinf = that.data.shopinf;
    var total = that.data.total;
    var Url = url + 'api/order/refund';
    var params = {};
    params.id = id;
    
    network.POST(Url, params,
      {
        success: function (res) {
          console.log(res);
          var totals = (res.data._d.shopinf.realPrice) * (res.data._d.shopinf.num);
          var totalsw = parseFloat(totals) + parseFloat(res.data._d.shopinf.fastfree) 
          if (res.data._c == 0) {
            that.setData({
              shopinf: res.data._d.shopinf,
              total: totalsw,
            })
          }
          console.log(that.data.shopinf)
        },
        fail: function (res) {
          wx.showToast({
            title: '加载数据失败',
            icon: 'loading'
          })
        },
      })
  },
  // 退款说明
  input:function(e){
    var that = this;
    that.setData({
      values:e.detail.value,
    })
  },
  // 提交
  reserat:function(){
    console.log(id)
    var that =this;
    var Url = url + 'api/order/orderRefund';
    var params = {};
    params.odetail_id= id;
    params.refund_reason = that.data.applytxt;
    params.total = that.data.total;
    params.refund_desc = that.data.values;
    params.attachment = that.data.img_l;
    network.POST(Url, params,
      {
        success: function (res) {
          console.log(res) 
          if(res.data._c == 0){
         


          }else{
            wx.showToast({
              title: res.data._m,
              icon: 'none'
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