var purl = 'https://dev.unionglasses.com'
//GET请求

var requestHandler = {
  success: function (res) {
    // success  
  },
  fail: function () {
    // fail  
  },
}

//GET请求  
function GET(purl, params, requestHandler) {
  request(purl, params, 'GET', requestHandler)
}
//POST请求  
function POST(purl, params, requestHandler) {
  request(purl, params, 'POST', requestHandler)
}

function request(purl, params, method, requestHandler) {
  //注意：可以对params加密等处理  
  wx.request({
    url: purl,
    data: params,
    method: method, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
    header: {
      'content-type': 'application/x-www-form-urlencoded',
      'utoken':'122333333'
    }, // 设置请求的 header  
    success: function (res) {
      //注意：可以对参数解密等处理  
      requestHandler.success(res)
    },
    fail: function () {
      requestHandler.fail()
    },
    complete: function () {
      // complete  
    }
  })
}
function AjaxExt() {
  var url = '',
    params = null,
    callback = null;
  var args = _gg_.argsCat(arguments);
  url = args.str[0];
  params = args.obj[0] || {};
  callback = args.fun[0] || function () { };
  wx.request({
    url: url,
    data: params,
    method: args.str[1],
    // method: args.mth[0], // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
    header: {
      'content-type': 'application/x-www-form-urlencoded',
    }, // 设置请求的 header  
    success: function (res) {
      //注意：可以对参数解密等处理  
      if (typeof callback == 'function') {
        doAjax(res);
        callback(res);
      }
    },
    fail: function (res) {
      if (typeof callback == 'function') {
        doAjax(res);
        callback(res);
      }
    },
  })
}
function doAjax(jo) {
  jo.isOk = function () {
    return this.statusCode === 200;
  };
  jo.getCode = function () {
    return this.statusCode;
  };
  jo.getMessage = function () {
    return this.errMsg;
  };
}
var _gg_ = {};
_gg_.argsCat = function (args) {
  var ret = {
    num: [],
    str: [],
    boo: [],
    fun: [],
    arr: [],
    obj: [],
    length: 0,
    isConf: false
  };
  var i = 0;
  ret.length = args.length;
  for (var i = 0; i < ret.length; i++) {
    var t = typeof args[i];
    if (t == 'object' && args[i] instanceof Array) {
      ret.arr.push(args[i]);
      continue;
    }
    if (ret[t.substr(0, 3)]) {
      ret[t.substr(0, 3)].push(args[i]);
    }
  }
  if (ret.length == 1 && ret.obj.length == 1) {
    ret.isConf = true;
  }
  return ret;
}
function Pagination() {
  var that = this;
  this.pagi = {
    _lmt: 1,
    _pn: 0
  };
  this.turl = '';
  this.data = [];
  this.curTot = 0;
  this.curCnt = 0;
  this.dfNo = true;
  this.callback = {};
  this.calldata = {};
  this.filter = null;
  this.init = function (opt) {
    for (var p in this.pagi) {
      if (typeof opt[p] != 'undefined') {
        this.pagi[p] = opt[p];
      }
    }
    return this;
  }
  this.set = function (opt) {
    if (opt) {
      if (opt.pagi) {
        for (var p in opt.pagi) {
          this.pagi[p] = opt.pagi[p]
        }
      }
      if (opt.data && opt.data instanceof Array) {
        if (this.dfNo) {
          this.appendData(opt.data);
        } else {
          this.putCount(opt.data.length)
        }
      }
    }
    return this;
  }
  this.putCount = function (cnt) {
    this.curCnt = parseInt(cnt);
    this.curTot += this.curCnt;
  }
  this.isAll = function () {
    if (arguments.length > 0) {
      this.putCount(arguments[0]);
    }
    return this.curCnt < this.pagi._lmt
  }
  this.getTotal = function () {
    return this.curTot
  }
  this.requesting = function (data) {
    if (data) {
      data._pn = parseInt(this.pagi._pn) + 1;
    } else {
      return {
        _pn: parseInt(this.pagi._pn) + 1
      }
    }
  }
  this.reduce = function () {
    if (arguments.length > 0) {
      this.curTot -= arguments[0]
    } else {
      this.curTot--;
    }
    return this.curTot;
  }
  this.appendData = function (data) {
    var no = this.data.length;
    no = no > 0 ? no - 1 : 0;
    if (data instanceof Array) {
      this.curCnt = data.length;
      this.data = this.data.concat(data);
    } else {
      this.curCnt = 1;
      this.data.push(data)
    }
    this.curTot = this.data.length;
    for (var i = no; i < this.data.length; i++) {
      this.data[i]._no = i;
    }
  }
  this.getData = function () {
    if (arguments.length > 0) {
      return this.data[arguments[0]]
    } else {
      return this.data
    }
  }
  this.page = function (opt) {
    this.set(opt);
    if (this.callback.item) {
      this.callback.item.call(that, opt.data);
    }
  }
  this.loadatas = function () {
    var pdata = {};
    if (that.filter) {
      var flt = that.filter;
      if (typeof that.filter == 'function') {
        flt = that.filter();
      }
      if (flt) {
        for (var p in flt) {
          pdata[p] = flt[p];
        }
      }
    }
    this.data = [];
    AjaxExt(that.turl, pdata, 'POST', function (jo) {
      if (that.callback.ajax) {
        that.callback.ajax.call(that, jo.data);
      } else {
        if (jo.isOk) {
          that.set(jo.data);
          if (that.callback.html) {
            that.callback.html.call(that, jo.data.data);
          }
        }
      }
    });
  };
  this.initPull = function (cb) {
    this.callback.html = cb;
    console.log(this.callback.html)
    this.loadatas();
  }
}
var _cache = {
  pagi: {}
}
function _pagination() {
  var args = _gg_.argsCat(arguments);
  var name = 'def';
  if (args.str.length > 0) {
    if (args.str[0] == 'init') {
      name = 'def';
    } else {
      name = args.str[0];
    }
  }
  if (!_cache.pagi[name]) {
    _cache.pagi[name] = new Pagination();
  }
  if (args.str[0] == 'init') {
    _cache.pagi[name].initPull(args.fun[0]);
  } else {
    if (args.obj.length > 0) {
      _cache.pagi[name].set(args.obj[0]);
    }
  }
  return _cache.pagi[name];
}

var format = '1544112000'
function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/** 
 * 时间戳转化为年 月 日 时 分 秒 
 * number: 传入时间戳 
 * format：返回格式，支持自定义，但参数必须与formateArr里保持一致 
*/
function formatTime(number, format) {

  var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
  var returnArr = [];

  var date = new Date(number * 1000);
  returnArr.push(date.getFullYear());
  returnArr.push(formatNumber(date.getMonth() + 1));
  returnArr.push(formatNumber(date.getDate()));

  returnArr.push(formatNumber(date.getHours()));
  returnArr.push(formatNumber(date.getMinutes()));
  returnArr.push(formatNumber(date.getSeconds()));

  for (var i in returnArr) {
    format = format.replace(formateArr[i], returnArr[i]);
  }
  return format;
}

function initanimation(moveY, show) {
  var animation = wx.createAnimation({
    duration: 500,
    timingFunction: 'linear'
  })
  animation.translateY(moveY + 'vh').step()
  var obj = {
    animationData: animation.export()
  }
  return obj
}

module.exports = {
  GET: GET,
  POST: POST,
  AjaxExt: AjaxExt,
  formatTime: formatTime,
  pagination: _pagination,
  animations: initanimation
} 