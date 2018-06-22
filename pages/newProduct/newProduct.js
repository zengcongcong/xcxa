var network = require("../../utils/untils.js");
var url = 'https://dev.unionglasses.com/';
var arrays = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodLists:'',
    hidden: true,
    values: "",
    values1:"",
    id:"",
    updown:true,
    page:1,
    height:true,
    kuang: 2,
    pageSize: 10,
    lsize: 0,
    showview: false,
    url:'https://dev.unionglasses.com',
    index: 0,
    _num:0,
    indexNum:1,
    hasd:false,
    gname:'',//搜索名称
    brands:"", 
    inputValue:"",
  },
  detaileven: function (e) {
    var ids = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../template-details/template-details?id=' + ids,
    })
  },
  // // 点击搜索

  bindInput: function (e) {
    this.setData({
      gname: e.detail.value
    })
  },  
  sousuo: function (e) {
    var params = {}
    params = this.getParams()
    this.getinfo(params, '加载数据中...')
  },

  price:function(e){
    var that = this;
    var _num = 0;
    var indexNum = 1;

    if (e.target.dataset.sad == 3 && that.data.index > 0) {
      _num = 1;
      that.data.index = 0;
    } else if (e.target.dataset.sad == 3 && that.data.index <= 0) {
      _num = 2;
      that.data.index++;
    }
    var showview = false
    var lsize = 0
    if (parseInt(e.target.dataset.sad) == 4) {
      showview = true
      lsize = -e.detail.x
    }
    indexNum = e.target.dataset.sad;
    
    that.setData({
      indexNum: indexNum,
      _num: _num,
      showview, 
         lsize
    });
    
    var params = {}
    params = this.getParams()

    that.getinfo(params,'加载数据中...')
  },
  hideModal: function (e) {
    var that = this;
    var indexNum = e.target.dataset.sad
    that.setData({
      indexNum,
      hasd: true,
      showview: false,
      lsize: 0
    });
  },
  ppai:function(){
    var that =this;
    that.setData({
      height: (!that.data.height),
      updown: (!that.data.updown)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.gname != undefined){
      this.setData({
        gname: options.gname,
      }) 
    }
    //后期完善
    // if (options.t != undefined) {
    //   this.setData({
    //     t: options.t,
    //   })
    // }
    console.log(options.gname)
    var params = {};
    params = this.getParams();

    this.getinfo(params, '正在刷新数据');
  },
  inputs:function(e){
    var that= this;
    var values = that.data.values;
      that.setData({
        values: e.detail.value
    })
  },
  inputs1: function (e) {
    var that = this;
    var values1 = that.data.values1;
    that.setData({
      values1: e.detail.value
    })
  },
  select:function(e){
    var that =this
    var brands = that.data.brands;
    var id = e.currentTarget.dataset.id;
    var index = e.currentTarget.dataset.index;
    arrays.push(id)
    // console.log(arrays)
    if (brands[index].kuang == 1){
      brands[index].kuang = 0;
    } else if (brands[index].kuang == 0){
      brands[index].kuang = 1;
    }
   
    this.setData({
      brands: brands,
      });
  
  },
  //设置参数
  getParams:function()
  { 
    var that = this;
    var params = {};
   
    var indexNum = that.data.indexNum;
    var _num = that.data._num;
    console.log(indexNum)
    switch (indexNum) {
      case '1':
        params.t = 'mult';
        break;
      case '2':
        params.t = 'sale';
        break;
      case '3':
        params.t = 'price';
        if (_num == 2) {
          params.s = 'desc';
        } else {
          params.s = 'asc';
        }
        break;
      case '4':
        if (that.data.values != '') {
          params.ps = that.data.values;
        }
        if (that.data.values1 != '') {
          params.pe = that.data.values1;
        }
        if (JSON.stringify(arrays) != '[]') {
          params.brds = arrays;
        }
        break;
      default:
        params.t = 'mult';
    }
    var gname = that.data.gname;
    if (gname != '') {
      params.gname = gname;
    }
    return params;
  },
  reset:function(){
    var values = this.data.values;
    var values1 = this.data.values1;
    var brands = this.data.brands;
    arrays = [];
    for (var i = 0; i < brands.length;i++){
      brands[i].kuang = 0;
    }
    
    this.setData({
      values: "",
      values1:"",
      brands: brands,
    })
  },
  submit:function(){
    var that = this
    that.setData({
      indexNum: 4,
      _num: 0,
      showview:false,
      lsize:0
    });
    var params = {};

    if (that.data.values != '') {
      params.ps = that.data.values;
    }
    if (that.data.values1 != '') {
      params.pe = that.data.values1;
    }
    if (JSON.stringify(arrays) != '[]') {
      params.brds = arrays;
    }
    if (that.data.gname != '') {
      params.gname = gname;
    }
    that.getinfo(params, '正在刷新数据');
  },
  // 列表
  getinfo: function (params,message) {
    var that = this
    var Url = url + 'api/index/newProduct';
    network.POST(Url, params,
      {
        success: function (res) {
          var url = that.data.url;
          var contentlistTem = that.data.goodLists;
          var page = res.data._d.pagi._pn;
          var brands = that.data.brands;
          brands = res.data._d.brands;
          
          for (var i = 0; i < brands.length; i++) {
            if (JSON.stringify(arrays) != '[]') {
              console.log(arrays);
              if(arrays.indexOf(brands[i]['id']) == '-1'){
                brands[i]['kuang'] = 0;
              }else{
                brands[i]['kuang'] = 1;
              }
            }else{
              brands[i]['kuang'] = 0;
            }
          }
       
          if (res.data._c == 0) {
            if (page == 1) {
              contentlistTem = []
            }
            var goodLists = res.data._d.list;
            if (res.data._d.list == ""){
                that.setData({
                  hidden:false,
                })

            }
            console.log(res.data._d.list == "")
            if (goodLists.length < that.data.pageSize) {
              that.setData({
                brands: brands,
                goodLists: contentlistTem.concat(goodLists),
                hasMoreData: false,
              })
            } else {
              that.setData({
                brands: res.data._d.brands,
                goodLists: contentlistTem.concat(goodLists),
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
    var that = this

    var params = {};
    params = that.getParams();
  
    that.getinfo(params,'正在刷新数据');
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.hasMoreData) {
      var that = this
      var params = {};
      params = that.getParams();
      params._pn = that.data.page;

      this.getinfo(params, '正在刷新数据');
    } else {
      wx.showToast({
        title: '没有更多数据',
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})