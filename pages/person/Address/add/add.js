var network = require("../../../../utils/untils.js");
var url = 'https://dev.unionglasses.com/'

var zone = [];
var defaults = 2;
Page({
  data: {
    showView: true,
    showViews: true,
    region:"",
    color: '#999',
    dz:"添加地址",
    isOrder:false,
    orderParams:{}
  },
  onLoad: function (options) {
    console.log(options.isOrder);
    showView: (options.showView == "false" ? false : true)
    showViews: (options.showViews == "false" ? false : true)
    this.setData({
      isOrder: (options.isOrder == '1' ? true : false),
      orderParams: (typeof options.new_params == "undefined" ? {} : JSON.parse(options.new_params))
    })
  },
  formSubmit: function (e) {
    var address = e.detail.value.address;
    var username = e.detail.value.username;
    var mobile = e.detail.value.mobile;
    var zone = this.data.region[0] + "+" + this.data.region[1] + "+" + this.data.region[2];
    var that = this;

//     function  filteremoji(content) {
//         var  ranges  =  [
//             '\ud83c[\udf00-\udfff]',
//             '\ud83d[\udc00-\ude4f]',
//             '\ud83d[\ude80-\udeff]'
//         ];
//         emojireg  =  content .replace(new  RegExp(ranges.join('|'),  'g'),  '');
//         return  emojireg;
//         }
//     if (filteremoji(address.val()))  return  true;  
    if (address == "") {
      wx.showModal({
        title: '提示',
        content: '请填写详细的地址',  
        showCancel: false
      })
      return
    }
    if (username == "") {
      wx.showModal({
        title: '提示',
        content: '请填写联系人姓名',
        showCancel: false
      })
      return
    }
    if (mobile == "" || mobile.length != 11) {
      wx.showModal({
        title: '提示',
        content: '请输入11位手机号码',
        showCancel: false
      })
      return
    }
    if (that.data.region == "") {
      wx.showModal({
        title: '提示',
        content: '请选择地区',
        showCancel: false
      })
      return
    }
    var Url = url + 'api/Address/doEditAdd';
    var params = {}
    params.address = address,
    params.is_default = defaults,
    params.name = username,
    params.phone = mobile,
    params.zone = zone,

    network.POST(Url, params,
      {
        success: function (res) {
          console.log(res)
          if (res.statusCode == 200 && res.data._c == 0) {
            if (that.data.isOrder)
            {
              var order_params = that.data.orderParams;
              var str = '';
              for (var i in order_params) {
                str += i + '=' + order_params[i] + '&'
              }
              var index = str.length - 1;
              var new_str = str.substring(0, index);
              wx.navigateTo({
                url: '../../../myCart/Order/Order?'+new_str,
              })
            }else{
              wx.navigateTo({
                url: '../Address',
              })
            }
           
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

  bindPickerCity: function (e) {
  
    this.setData({
      region: e.detail.value,
      color: '#000',
      showView: false,
    })
  },
  img1: function (e) {
    if (e.currentTarget.dataset.default == 2){
      defaults = 1
    }else{
      defaults = 2
    }
    this.setData({
      showViews: (!this.data.showViews),
    })
  },

  // 保存数据
  // btnsave:function(){
  //   const wxCurrPage = getCurrentPages();//获取当前页面的页面栈
  //   const wxPrevPage = wxCurrPage[wxCurrPage.length - 2];//获取上级页面的page对象
  //   if (wxPrevPage) {
  //     //修改上级页面的数据
  //     wxPrevPage.setData({
  //       baseData: true,//baseData为上级页面的某个数据
  //       time:1233
  //     })
  //   }


  //   wx.navigateBack({     //返回上一页面或多级页面
  //     delta: 1
  //   })

  // },


})
