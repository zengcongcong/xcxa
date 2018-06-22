var network = require("../../../../utils/untils.js");
var url = 'https://dev.unionglasses.com/';
var id = "";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    focus: false,
    goodLists: [],
    url:'https://dev.unionglasses.com',
    evaContent: '',
    isShows: false,
    isShow: true,
    count: [1, 2, 3, 4,5],
    userStars: [
      '/images/wjx.jpg',
      '/images/wjx.jpg',
      '/images/wjx.jpg',
      '/images/wjx.jpg',
      '/images/wjx.jpg',
    ],
  },
  deled: function (e) {
    this.setData({
      evaContent: '',
      isShows: false,
      isShow: true,
    })
  },
  bindTextAreaBlur: function (e) {
    var sat = "";
    sat = e.currentTarget.dataset.sat;
    this.setData({
      isShows: true,
      ['goodLists[' + sat + '].content']: e.detail.value,
    })
  },

  bindFormSubmit: function (e) {
    console.log(e)
    console.log(e.detail.value.textarea)
  },
  // 图片上传
  chooseImage: function (e) {
    var _this = this;
    var sat = "";
   sat = e.currentTarget.dataset.sat;
    wx.chooseImage({
      count: 2, // 默认9  
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
      success: function (res) {
        var pics = _this.data.goodLists[sat].pics;
        console.log(pics);
        var tempFilePaths = res.tempFilePaths;
        pics = pics.concat(tempFilePaths);
        if (pics.length >= 4) {
          _this.setData({
            isShow: (!_this.data.isShow)
          })
          console.log(!_this.data.isShow)
        } else {
          _this.setData({
            isShow: (_this.data.isShow)
          })
        }

        _this.setData({
          ['goodLists[' + sat + '].pics']: pics,
        })

        console.log(_this.data.goodLists)
        wx.uploadFile({
          url: url + 'api/comment/upload', //接口  
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'user': 'test'
          },
          success: function (res) {
            var img_l = _this.data.goodLists[sat].attachment;
            var data = JSON.parse(res.data);
            var img = url + data._d.src;
            img_l.push(img);
            _this.setData({
              ['goodLists[' + sat + '].attachment']: img_l,
              // img_l: img_l
            })
            console.log(_this.data.goodLists)
          },
          fail: function (error) {
          }
        })

      }
    })
  }, 




  // chooseImage: function () {
  //   var _this = this,
  //     pics = this.data.pics;
  //   wx.chooseImage({
  //     // count: 9 - pics.length, // 最多可以选择的图片张数，默认9
  //     count: 4,
  //     sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
  //     sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
  //     success: function (res) {
  //       var imgSrc = res.tempFilePaths;
  //       pics = pics.concat(imgSrc);
  //       // 控制触发添加图片的最多时隐藏
  //       if (pics.length >= 2) {
  //         _this.setData({
  //           isShow: (!_this.data.isShow)
  //         })

  //       } else {
  //         _this.setData({
  //           isShow: (_this.data.isShow)
  //         })
  //       }
  //       _this.setData({
  //         pics: pics
  //       })
  //     },
  //   })
  // },




  // 图片预览
  previewImage: function (e) {
    var current = e.target.dataset.src;
    console.log(current)
    wx.previewImage({
      current: current,
      urls: this.data.pics
    })
  },
  // 星星点击事件
  starTap: function (e) {
    console.log(e)
    var sat = e.currentTarget.dataset.sat;
    var index = e.currentTarget.dataset.index; // 获取当前点击的是第几颗星星
    var tempUserStars = this.data.goodLists[sat].starList; // 暂存星星数组
    // console.log(this.data.goodLists[sat].starList)
    var len = tempUserStars.length; // 获取星星数组的长度
    for (var i = 0; i < len; i++) {
      if (i <= index) { // 小于等于index的是满心
        tempUserStars[i] = '/images/wjx.jpg'
      } else { // 其他是空心
        tempUserStars[i] = '/images/wxjh.jpg'
      }
    }
    // 重新赋值就可以显示了
    this.setData({
      ['goodLists[' + sat + '].starList']: tempUserStars,
      ['goodLists[' + sat + '].star']: index+1,
    })
    console.log(this.data.goodLists)
  },
  reset:function(){
    var that = this;
    var Url = url + 'api/comment/addComment';
    var params = {};
    params.data = JSON.stringify(this.data.goodLists);
    params.oid = id;
    network.POST(Url, params,
      {
        success: function (res) {
          console.log(res)
          if (res.data._c == 0) {
            wx.navigateTo({
              url: '../myorder?status=4',
            })

          } else {
            wx.showToast({
              title: res.data._m,
            })
          }
        },
        fail: function (res) {
          wx.showToast({
            title: '评价失败',
            icon: 'loading'
          })
        },
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that =this;
    id = options.id;
    isShow: (options.isShow == "true" ? true : false)
    isShows: (options.isShows == "true" ? true : false)
    that.getinfo();
  },

  getinfo:function(){
    var that = this;
    var Url = url + 'api/goods/tocomment';
    var params ={};
    params.oid = 483;
    network.POST(Url, params,
      {
        success: function (res) {
          var goodLists = that.data.goodLists;
          // console.log(res.data._d.data)
          if(res.data._c == 0){
            // console.log(res.data._d.data);
              var data = res.data._d.data;
              var goodList = [];
              for (var i = 0; i < data.length;i++){
                var new_obj = {};
                new_obj.id = data[i].id;
                new_obj.img_src = data[i].img_src;
                new_obj.starList = that.data.userStars;
                new_obj.star = 5;
                new_obj.content = '';
                new_obj.attachment = [];
                new_obj.pics = [];
                goodList.push(new_obj)
              }
              // console.log(goodList)
              that.setData({
                goodLists: goodList
              })


          }else{
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