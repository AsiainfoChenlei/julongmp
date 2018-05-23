<template lang="html">
<div>
<header class="mint-navtitle">
  <div class="header-area2 mintui">
    <i class="i-search mintui-search"></i>
    <span class="mintui-header-select1"><span @click="chooseCity">{{mycity}}</span><i class="path3"></i></span>
    <a  @click="search()">
      <span class="mintui-header-select2">商品/店铺</span>
      <input class="input-search" type="text"/>
    </a>
    <i class="i-img" @click="goshow()"></i>
  </div>
</header>

<mt-actionsheet
  :actions="actions"
  v-model="sheetVisible" style="color: #999" ref="abc">
</mt-actionsheet>
</div>
</template>

<script>
import { Actionsheet, Toast, MessageBox } from 'mint-ui'
import Cookies from 'js-cookie'
import detector from 'detector'
export default {
  components: {
    Actionsheet
  },
  data () {
    return {
      mycity: '武汉',
      actions: [],
      sheetVisible: false,
      versionArr: {},
      onlineVersion: 0
    }
  },
  methods: {
    versionBox () {
      const self = this
      MessageBox({
        title: '提示',
        message: '您的版本过旧，是否更新版本？',
        confirmButtonClass: 'surebutton',
        showCancelButton: true,
        confirmButtonText: '立即更新',
        cancelButtonText: '取消'
      }).then(action => {
        if (action === 'confirm') {
          // do something
          console.log('detector', detector)
          let os = detector.os.name
          console.log('os', os)
          if (os === 'ios') {
            self.setRCT()
            Toast('抱歉,苹果版APP还在审核中！若版本太旧，您可先用网页版')
            //  window.location.href='http://home.jlgo.shop/julong_1.0.180123_release.apk';
          } else {
            window.location.href = 'http://home.jlgo.shop/julong_1.0.180123_release.apk'
            Toast('已下载,请下载完成后安装')
          }
        } else {
          self.setRCT()
          // Cookies.set('RecetComparisonTime',(new Date()).valueOf(), { expires: 1 });//若用户点取消,写入最近的比较时间
        }
      })
    },
    goshow(){
            window.location.href = 'http://home.jlgo.shop/julong_1.0.180123_release.apk'
            Toast('已下载,请下载完成后安装')
    },
    search () {
      location.assign('search.html#/search')
    },
    oto (k) {
      location.assign('shop.html#/tshop?circle_id=' + k.id + '&company_id=' + k.company_id + '&shop_id=' + k.shop_id)
      this.$localStorage.set('circle_id', k.id)
      this.$localStorage.set('name', k.name)
    },
    setRCT () {
      let inFifteenMinutes = new Date(new Date().getTime() + 1 * 60 * 1000) // 3分钟
      console.log('inFifteenMinutes', inFifteenMinutes)
      Cookies.set('RecetComparisonTime', '1', {
        expires: inFifteenMinutes
      })
    },
    xiantao () {
      const self = this
      console.log('xiantao')
      self.mycity = '仙桃'
    },
    wuhan () {
      const self = this
      console.log('wuhan')
      self.mycity = '武汉'
    },
    chooseCity () {
      const self = this
      self.sheetVisible = true
    },
    setActive () {
      const self = this
      self.actions = [
        {
          name: '武汉',
          method: self.wuhan
        },
        /* {
             name:"仙桃",
             method: self.xiantao
           }, */
        {
          name: '其他城市正在开通中',
          method: 'wuhan'
        }
      ]
    },
    async twodata () {
      const self = this

      // 1.得到线上的app的版本
      await self.$store.dispatch('getVerison', {verison_type: 1}).then(function (res) { // 商品
        let result = res.data
        console.log(result)
        // return;
        if (result.code) {
          self.versionArr = JSON.parse(result.msg)
          self.onlineVersion = self.versionArr.verison_name
          console.log('verison_name', self.versionArr.verison_name)
          console.log('self.versionArr', self.versionArr)
          console.log('onLineVersion', self.onlineVersion)
        } else {
          console.log(result.error)
        }
      })

      // 2.得到本地的app的版本
      let localVersion = self.$helper.version
      console.log('localVersion', 'onlineVersion')
      console.log(localVersion, self.onlineVersion)
      // 3.比较两个版本
      if (+localVersion == +self.onlineVersion) {

      } else {
        // 触发弹窗
        self.versionBox()
        // return false;
      }
    }
  },
  mounted () {
    const self = this

    self.setActive()
    // self.setRCT();

    // console.log('os',os);

    // 0.判断最近有没有进行比较
    let rct = Cookies.get('RecetComparisonTime')
    if (+rct) {

    } else {
      self.twodata() // 时间已经失效执行
    }
  }

}
</script>

<style lang="less" scoped>
@import '../../../../assets/fz.less';
@import '../../../../assets/index/style.css';
@import '../../../../assets/user/icon/carstyle.css';
.mint-header {
    padding: 6.8vw 4.8vw;
    background-color: #fff;
    color: #333!important;
    .fz(font-size, 40)!important;
}

.mint-navtitle{
  text-align: left;
  padding: 3vw 2vw;
  /*background: #f74b27;*/
  background: #F6774C;
  position: fixed;
  top: 0;
  width: 96%;
  z-index: 1000;
  .header-area2{
    position: relative;
    font-weight: 100;
    .mintui-header-select1{
      font-size: 5vw;
      color: #fff;
      width: 16vw;
      height: 8vw;
      position: absolute;
      line-height: 10vw;
      .path3{
        border-color: transparent #fff transparent transparent;
        border-style: solid;
        border-width: 2vw 2.1vw 0 0;
        display: inline-block;
        position: absolute;
        bottom: 0;
        right: 3.2vw;
      }
    }
    .mintui-header-select2{
      font-size: 4.2vw;
      color: #20190e;
      width: 23vw;
      height: 8vw;
      position: absolute;
      left: 19.5vw;
      line-height: 10.5vw;
      letter-spacing: 0.3vw;
    }
    .i-search{
      position: absolute;
      line-height: 10.5vw;
      font-size: 6vw;
      right: 15vw;
    }
    .input-search{
      width: 71%;
      height: 10vw;
      margin-left: 17%;
      border-radius: 24px;
      margin-right: 2%;
    }
    .icon-go:before,.icon2-kind:before{
      color: #fff;
    }
    .i-search:before{
      color: #20190e;
    }
    .i-img{
      display: inline-block;
      background: url("/static/images/loadwon.png");
      width: 8%;
      height: 8vw;
      vertical-align: middle;
      background-size: 100% 100%;
    }
  }
}
.mint-actionsheet  /deep/ .mint-actionsheet-listitem:last-child{
    color: #999 !important;
  }
</style>
