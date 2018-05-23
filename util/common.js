import _typeof from 'babel-runtime/helpers/typeof'
import _JSON$stringify from 'babel-runtime/core-js/json/stringify'
var STORAGE_USER_KEY = 'STORAGE_USER_KEY'

export default {
  ajaxUrl: process.env.API_ROOT,
  // 获取
  getLocal: function getLocal () {
    var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : STORAGE_USER_KEY

    // console.log('get local operation')
    return JSON.parse(window.localStorage.getItem(key))
  },

  // 设置用
  setLocal: function setLocal (res) {
    var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : STORAGE_USER_KEY
    var isSaveOldData = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false

    // 第三个参数是true的话,会增加数据而不是重新设置,res必须是数组
    if (isSaveOldData) {
      if (this.getLocal(key)) {
        var oldData = this.getLocal(key)
        return window.localStorage.setItem(key, _JSON$stringify(oldData.concat(res)))
      }
    }
    return window.localStorage.setItem(key, _JSON$stringify(res))
  },
  urlEncode: function urlEncode (param, token) {
    if (!param) param = {}
    param.token = token
    return this.urlEncodeParam(param)
  },
  urlEncodeParam: function urlEncodeParam (param, key, encode, first) {
    if (param === null) return ''
    var paramStr = ''
    var t = typeof param === 'undefined' ? 'undefined' : _typeof(param)
    var lianjie = '&'
    if (first === true) {
      lianjie = '?'
    } else {
      lianjie = '&'
    }

    if (t === 'string' || t === 'number' || t === 'boolean') {
      var tmpParam = encode === null || encode ? encodeURIComponent(param) : param
      if (tmpParam !== null) {
        paramStr += lianjie + key + '=' + tmpParam
      }
    } else {
      // console.log(123)
      // console.log('this', this)
      var times = 0
      var tmpstr = null
      for (var i in param) {
        // var k = key === null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i)
        var k = key === null ? i : param instanceof Array ? '[' + i + ']' : i
        // console.log('k', k)
        if (times === 0) {
          tmpstr = this.urlEncodeParam(param[i], k, encode, true)
          paramStr += tmpstr
        } else {
          tmpstr = this.urlEncodeParam(param[i], k, encode, false)
          paramStr += tmpstr
        }
        // console.log(tmpstr)
        if (tmpstr != null && tmpstr !== '') {
          times++
        }
        tmpstr = null
      }
      // console.log('encode', encode)
    }
    return paramStr
  }
}
