var network = require("../../../../utils/untils.js");
var url = 'https://dev.unionglasses.com/';
var region = "";
var defaults = "";
Page({
  data: {
    showView: true,
    region: '',
    index: "",
    name: "",
    id : "",
    tel: "",
    area: "",
    defaults:"",
  },
  onLoad: function (options) {
    showView: (options.showView == "false" ? false : true)
    var _obj = JSON.parse(options.addrIfo);     
    var regions = _obj.region_name.split("+")
    var defaults= _obj.is_default;
    this.setData({
      name: _obj.username,
      tel: _obj.mobile,
      region: regions,
      area: _obj.address,
      defaults: defaults,
      id : _obj.id
    })
    
    if (defaults== 1){
      this.setData({
        showView :false,
      })
    }else{
      this.setData({
        showView: true,
      })
    }
  },
  formSubmit: function (e) {    
    var address = e.detail.value.address;
    var username = e.detail.value.username;
    var mobile = e.detail.value.mobile;
    var id = this.data.id
    var that = this;
    var zone = this.data.region[0] + "+" + this.data.region[1] + "+" + this.data.region[2];
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
      var s = this.data.defaults
      params.id = id,
      params.address = address,
      params.is_default = s,
      params.name = username,
      params.phone = mobile,
      params.zone = zone,
      network.POST(Url, params,
        {
          success: function (res) {
            console.log(res)
            if (res.data._c == 0) {
              wx.navigateTo({
                url: '../Address',
              })
            } else {
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

  bindPickerCity: function (e) {
    this.setData({
      region: e.detail.value,
      color: '#000',
      showViews: false,
    })
  },

  img1: function (e) {
 
    if (e.currentTarget.dataset.default == 2)
    {
      this.setData({
        defaults : 1 
      })
    }else{
      this.setData({
        defaults: 2
      })
    }
    
    this.setData({
      showView: (!this.data.showView),
    })
  },


})
