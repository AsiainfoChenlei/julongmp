/**
 * Created by luqiang on 17-11-26.
 */
/*eslint-disable*/
import bus from './bus'
function RemoveZero (obj) {
  return obj.toString().replace(/^0+/g, '')
}

const helper = {
  version: '180506',
  qiniuUrl: 'http://ozrdx2iqj.bkt.clouddn.com/',
  bus: bus,
  parseNum (num) {
    num = parseInt(num)
    if (num > 1000000) { return (num / 1000000 + '百万') }
    if (num > 10000) { return (num / 10000 + '万') }
    if (num > 1000) { return (num / 1000 + '千') }
    return num
  },

  in_array (array, val) {
    var s = String.fromCharCode(2); var r = new RegExp(s + val + s); return (r.test(s + array.join(s) + s))
  },

  // 显示error
  doError (result) {
    let error = result.error
    // console.log(result);
    if (error.length === 1) {
      self.$Message.error(error[0])
    } else {
      self.$Message.error(error)
    }
  },

  getRealPicURL (dbath, companyId, shopId, wh) {
    // console.log(dbath,company_id,shop_id);
    if (dbath == null) return ''
    // var config = sysconfig.getSettings()
    wh = arguments[3] ? arguments[3] : 'w600_hfellow'
    let whconfig = {
      cutw150_cuth170: 'imageView2/1/w/450/h/510/q/75|imageslim',
      w100_h100: 'imageView2/2/w/200/h/210/q/100',
      wfellow_h410: 'imageMogr2/auto-orient/thumbnail/1200x/blur/1x0/quality/100',
      wcut_h400: 'imageMogr2/auto-orient/thumbnail/x600/blur/1x0/quality/100',
      w600_hfellow: 'imageMogr2/auto-orient/thumbnail/1200x/blur/1x0/quality/100',
      wfellow386_h454: 'imageMogr2/auto-orient/thumbnail/x454/gravity/Center/crop/386x/blur/1x0/quality/100',
      w386_h454: 'imageView2/1/w/386/h/454/q/100'

    }
    let config = {
      urldb: {

        default: {
          default: 'http://ozrdx2iqj.bkt.clouddn.com'
        },
        QINIU: {
          default: 'http://ozrdx2iqj.bkt.clouddn.com',
          julong: 'http://ozrdx2iqj.bkt.clouddn.com'
        }

      }
    }

    // console.log(config);
    // return;
    // var userInfo = sysconfig.getUserInfo()
    var pathArr = dbath.split('@')
    var bucket = ''
    var domain = ''
    var urldb = config['urldb']
    var realurl = ''
    if (pathArr.length !== 4) {
      return dbath
    }
    if (pathArr[1]) { bucket = pathArr[1].split(':') }
    if (urldb[bucket[0]] != null) {
      if (urldb[bucket[0]][bucket[1]] != null) { domain = urldb[bucket[0]][bucket[1]] }
    }
    if (domain === '' || domain == null) { domain = urldb['default']['default'] }
    realurl = domain + '/' + RemoveZero(companyId) + '/' + RemoveZero(shopId) + '/' + pathArr[2] + '/' + pathArr[3] + '?' + whconfig[wh]
    return realurl
  },

  /* getRealPicURL2 (dbath) {
    if (dbath == null) return ''
    var config = sysconfig.getSettings()
    var userInfo = sysconfig.getUserInfo()
    var pathArr = dbath.split('@')
    var bucket = ''
    var domain = ''
    var urldb = config['urldb']
    var realurl = ''
    if (pathArr.length != 4) {
      return dbath
    }
    if (pathArr[1]) { bucket = pathArr[1].split(':') }
    if (urldb[bucket[0]] != null) {
      if (urldb[bucket[0]][bucket[1]] != null) { domain = urldb[bucket[0]][bucket[1]] }
    }
    if (domain == '' || domain == null) { domain = urldb['default']['default'] }
    realurl = domain + '/' + userInfo.company_id + '/' + userInfo.shop_id + '/' + pathArr[2] + '/' + pathArr[3]
    return realurl
  }, */
  getUrlKey (name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)', 'ig').exec(location.search) || [, ''])[1].replace(/\+/g, '%20')) || null
  }
}
export default helper
