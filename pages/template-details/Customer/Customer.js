var network = require("../../../utils/untils.js");
var url = 'https://dev.unionglasses.com/'
Page({
  data: {
    goodLists: [],
    page: 1,
    indxsed:"",
    hidden:false,
    jiantou:"",
    phone:"",
  },


  onLoad: function (options) {
    console.log(options)
    var that = this;
    that.getMusicInfo();
  },
 
  // 列表
  getMusicInfo: function () {
    var that = this;
    var params ={};
    var Url = url + 'api/Custom/index/';
    network.POST(Url, params,
      {
        success: function (res) {
       
          if(res.data._c == 0){
            console.log(res.data._d.contact.tel)
            var goodLists = that.data.goodLists;
            var phone = that.data.phone;
            var shopitems = [];
            var shops = [];
            for (var i = 0; i < res.data._d.list.length; i++) {
              for (var j = 0; j < res.data._d.list[i].details.length;j++){
                shopitems[j] = res.data._d.list[i].details[j] || {};
                shopitems[j].jiantou = false;
                shopitems[j].shows = false;
              }
              shops[i] = res.data._d.list[i] || {};        
            }
       

            that.setData({
              goodLists: shops,
              phone: res.data._d.contact.tel,
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

  xzdis: function (e) {
    var that = this;
    var ids = e.currentTarget.dataset.details;
    var indexed = that.data.indexed;
    var indexed = e.currentTarget.dataset.index; 

    for (var i = 0; i < that.data.goodLists.length;i++){
    
      if (ids == that.data.goodLists[i].id){

        that.setData({
          ['goodLists[' + i + '].details[' + indexed + '].shows']: (!that.data.goodLists[i].details[indexed].shows),
          ['goodLists[' + i + '].details[' + indexed + '].jiantou']: (!that.data.goodLists[i].details[indexed].jiantou),
        })
      }
    
    }
  },
  // 拨打电话
  btnSubmit:function(){

    wx.makePhoneCall({
      phoneNumber: this.data.phone
    })
  },
  onReady: function () {

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})