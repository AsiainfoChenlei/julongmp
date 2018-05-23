<template lang="html">
  <!-- 在首页父组件发送http请求,后将数据通过props传递给子组件,可减少请求次数,减少服务器压力 -->
  <div class="index">
  <iframe id="geoPage" width=0 height=0 frameborder=0 style="display:none;" scrolling="no" src="https://apis.map.qq.com/tools/geolocation?key=EVIBZ-LL5CS-P4ZOB-6NRPW-H7DRZ-LOBS7&referer=yuconora">
                    </iframe>
    <v-header></v-header>
    <!--<v-swiper :swiperData="adv"></v-swiper>-->
    <!--<v-service></v-service>-->
    <v-section1 :section1="datas.section1"></v-section1>
    <v-section2 :section2="datas.section2"></v-section2>
    <!--<v-section3></v-section3>-->
    <!--<v-section4 :section4="datas.section4"></v-section4>-->
    <v-baseline></v-baseline>
  </div>
</template>

<script>
import Header from '../components/index/header.vue'
import Swiper from '../components/index/swiper.vue'
import Service from '../components/index/service.vue'
import Section1 from '../components/index/section1.vue'
import Section2 from '../components/index/section2.vue'
import Section3 from '../components/index/section3.vue'
import Section4 from '../components/index/section4.vue'
import Baseline from '@/components/_baseline.vue'
// import index from '@/http/mock.js' // 模拟数据
import indexData from '../api/indexData'
import Cookies from 'js-cookie'
import wx from 'weixin-js-sdk'

export default {
  name: 'index',
  components: {
    'v-header': Header,
    'v-swiper': Swiper,
    'v-service': Service,
    'v-section1': Section1,
    'v-section2': Section2,
    'v-section3': Section3,
    'v-section4': Section4,
    'v-baseline': Baseline
  },
  data () {
    return {
      datas: {
        section1: {
          list: [],
          lis: [],
          list1: []
        }
      },
      adv: [],
      loading: true,
      address: '',
      province: '',
      info: {
        name: '巨龙商城',
        intro: '实体店触手可及',
        cover: ''
      }
    }
  },
  created () {
    document.addEventListener('scroll', this.scrollEvent)
  },
  beforeDestroy () {
    document.removeEventListener('scroll', this.scrollEvent)
  },
  beforeCreate () {
    // const self = this
    // 获取版本号接口
    // this.$store.dispatch('setDatas');
    //    self.setActive();
    let nowprovince = Cookies.get('NOWPROVINCE')
    this.$set(this, 'province', nowprovince) // 写入本机的定位
    Cookies.set('HOME_VERSION', '1.0.1', {expires: 1})
    let v = Cookies.get('HOME_VERSION')
    console.log(v)
    //    if (v !== '1.0.1') {
    //    MessageBox({
    //      title: '提示',
    //      message: '您的版本过旧，是否更新版本？',
    //      confirmButtonClass: 'surebutton',
    //      showCancelButton: true,
    //      confirmButtonText: '立即更新',
    //      cancelButtonText: '取消'
    //    }).then(action => {
    //      if(action == 'confirm'){
    //        Toast("更新完成");
    //        //do something
    //      }
    //    })
    //   }
    //      const self=this;
    //      self.$store.dispatch('swiper').then(function (res) { //广告
    /// /           console.log(res.data.msg);
    //           self.adv=res.data.msg.rows;
    /// /          console.log(self.datas.swiper);
    //      });

    /*    this.$api({
      // headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      method: 'post',
      // url: 'http://47.100.2.173:8003/admin/Advertise/index'
      url: '/index'
    }).then((response) => {
      console.log(response.data.swiper)
      this.datas = response.data
      self.adv = response.data.swiper
    }).catch(function (error) {
      alert(error)
    }) */
  },
  mounted () {
    this.$set(this, 'datas', indexData.data)
    console.log(indexData.data)
    console.log('GGGGGGGGGGGG')

    this.$router.replace({
      path: '/',
      query: {codeid: this.$localStorage.get('CODEID')}
    })
    const self = this
    if (localStorage.secondSelected != null) {
      localStorage.removeItem('secondSelected')
    }
    if (localStorage.cid != null) {
      localStorage.removeItem('cid')
    }
    console.log(!Cookies.get('NOWPROVINCE'))
    // alert(typeof (Cookies.get('NOWPROVINCE')) === 'undefined')
    if (typeof (Cookies.get('NOWPROVINCE')) === 'undefined') { // 没有定位信息
      self.useForLocation()
    }

    self.$store.dispatch('getSignPackage', {'url': window.location.href}).then(function (res) { // 微信
      self.configSharePlugs(res.data)
    })
  },
  methods: {
    configSharePlugs (res) {
      let self = this
      if (res) {
        wx.config({
          debug: false,
          appId: res.appId,
          timestamp: +res.timestamp,
          nonceStr: res.nonceStr,
          signature: res.signature,
          jsApiList: ['previewImage', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo',
            'onMenuShareQZone'
          ]
        })
        self.registShareComponents()
        wx.error(function (err) {
          console.log(err)
        })
      }
    },
    // 注册分享组件
    registShareComponents () {
      let self = this
      wx.ready(function () {
        wx.onMenuShareTimeline({
          title: self.info.name,
          desc: self.info.intro,
          link: window.location.href,
          imgUrl: self.info.cover
        })
        wx.onMenuShareAppMessage({
          title: self.info.name,
          desc: self.info.intro,
          link: window.location.href,
          imgUrl: self.info.cover,
          type: 'link',
          dataUrl: ''
        })
        wx.onMenuShareQQ({
          title: self.info.name,
          desc: self.info.intro,
          link: window.location.href,
          imgUrl: self.info.cover
        })
      })
      wx.error(function (err) {
        console.log(err)
      })
    },
    scrollEvent () {
      this.$route.meta.position = {x: 0, y: document.documentElement.scrollTop || document.body.scrollTop}
      console.log(this.$route.meta.position)
    },
    useForLocation () {
      const self = this
      console.log(self.province)
      /* 以下是定位用的 */
      let loc
      window.addEventListener('message', function (event) {
        if (self.province) { // 有定位信息
          return
        }
        // 接收位置信息
        loc = event.data
        if (loc && loc.module === 'geolocation') { // 定位成功,防止其他应用也会向该页面post信息，需判断module是否为'geolocation'
          self.address = loc.addr.length > 0 ? loc.addr : loc.nation + loc.province
          self.province = loc.province
          console.log('self.province1111', self.province)
          Cookies.set('NOWPROVINCE', self.province, {expires: 3})
          console.log("Cookies.get('NOWPROVINCE')", Cookies.get('NOWPROVINCE'))
          /* if (self.province !== '湖北省') {
            // alert(self.province)
            alert('您所在城市当前没有开通巨龙商城,暂无法使用')
            self.refuse()
          } */
          self.lat = loc.lat
          self.lng = loc.lng
          console.log('ggggggg', self.lat, self.lng, loc)
        } else {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(self.successCallback, self.handleLocationError, {
              maximumAge: 15000,
              timeout: 10000,
              enableHighAccuracy: true
            })
          } else {
            alert('对不起，您的浏览器不支持html5定位')
          }
        }
      }, false)
      if (typeof (Cookies.get('NOWPROVINCE')) === 'undefined') { // 没有定位信息
        document.getElementById('geoPage').contentWindow.postMessage('getLocation', '*')
      }

      // 设置6s超时，防止定位组件长时间获取位置信息未响应
      setTimeout(function () {
        console.log('loc', loc)
        console.log('this.province', this.province)
        if (!loc || this.province !== '') {
          document.getElementById('geoPage')
            .contentWindow.postMessage('getLocation.robust', '*')
        }
        if (self.province !== '湖北省') {
          //  alert(self.province)
          alert('您所在城市当前没有开通巨龙商城,暂无法使用.或网络导致获取失败,请重试')
          self.refuse()
        }
      }, 10000) // 10s
    },
    // refuse () {
    //   console.log('refuse')
    //   this.$router.push({
    //     name: '首页拒绝'
    //   })
    // },
    getlocation () {
      document.getElementById('geoPage').contentWindow.postMessage('getLocation', '*')
    },
    successCallback (pos) {
      let self = this
      var crd = pos.coords
      console.log('Your current position is:')
      console.log(`Latitude : ${crd.latitude}`)
      console.log(`Longitude: ${crd.longitude}`)
      self.lat = crd.latitude
      self.lng = crd.longitude
      let param = {
        location: crd.latitude + ',' + crd.longitude,
        key: 'EVIBZ-LL5CS-P4ZOB-6NRPW-H7DRZ-LOBS7'
      }
      self.$store.dispatch('getCurrentPosition', param).then(function (res) {
        if (+res.data.status === 0) {
          self.address = res.data.result.address
          self.province = res.data.result.address_component.province
          console.log('self.province222222', self.province)
          Cookies.set('NOWPROVINCE', self.province, {expires: 3})
        /*  if (self.province !== '湖北省') {
            //  alert(self.province)
            alert('您所在城市当前没有开通巨龙商城,暂无法使用')
            self.refuse()
          } */
        } else {
          console.log('定位失败')
        }
      })
    },
    handleLocationError (error) {
      switch (error.code) {
        case 0:
          console.log('获取位置信息出错！')
          break
        case 1:
          console.log('您设置了阻止该页面获取位置信息！')
          break
        case 2:
          console.log('浏览器无法确定您的位置！')
          break
        case 3:
          console.log('获取位置信息超时！')
          break
        default:
          console.log('不明原因')
          break
      }
    }
  }
}
</script>

<style lang="less" scoped>
.index {
    width: 100%;
    padding-bottom: 15vw;
    background-color: #f0f0f0;
    padding-top: 16%;
}
</style>
<style type="text/css">
  .mint-msgbox-title{
    font-size: 3.7vw !important;
  }
  .mint-msgbox-header{
    padding: 2vw 0 0 !important;
  }
  .mint-msgbox-content {
    padding: 3vw 4vw 3vw;
    border-bottom: 0.03vw solid #ddd;
    min-height: 5vw;
  }
  .mint-msgbox-message {
    line-height: 5vw;
    font-size: 3.7vw;
  }
  .mint-msgbox-btns {
    height: 10vw;
    line-height: 10vw;
  }
  .mint-msgbox-btn {
    font-size: 3.7vw;
  }
</style>
