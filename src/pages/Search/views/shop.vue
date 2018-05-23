<template lang="html">
    <div class="shop">
      <v-header v-if="data.id" :shopinfo="data" :query="query"></v-header>
      <v-content   :shopinfo="data"  :query="query"></v-content>
    </div>
</template>

<script>
import Header from '../components/shop/shop_header.vue'
import Content from '../components/shop/shop_content.vue'
import { Toast } from 'mint-ui'
import {mapState} from 'vuex'
import wx from 'weixin-js-sdk'

export default {
  name: 'Shop',
  data () {
    return {
      data: {},
      query: {},
      style: {
        height: window.innerHeight / window.innerWidth * 100 - 36 + 'vw',
        top: '24vw',
        overflow: 'scroll',
        '-webkit-overflow-scrolling': 'touch'
      },
      info: {
        name: '巨龙商城',
        intro: '发现一个好店',
        cover: ''
      }
    }
  },
  computed: {
    ...mapState({
      visitedViews: state => state.tagsView.visitedViews
    })
  },
  components: {
    'v-header': Header,
    'v-content': Content
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
          desc: self.info.shop_name,
          link: window.location.href,
          imgUrl: self.info.cover
        })
        wx.onMenuShareAppMessage({
          title: self.info.name,
          desc: self.info.shop_name,
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
    setActive () {
      const self = this
      self.$store.dispatch('getShopInfo', {'shop_id': self.query.shop_id}).then(function (res) { // 广告
        let result = res.data
        if (result.code) {
          console.log('result.msg')
          console.log(result.msg)
          self.data = result.msg
          self.info = result.msg

          self.$store.dispatch('getSignPackage', {'url': window.location.href}).then(function (res) { // 微信
            self.configSharePlugs(res.data)
          })
        } else {
          Toast(result.error[0])
          console.log(result.error)
        }
      })
    },
    param () {
      const self = this
      if (self.$route.query.shop_id !== undefined) {
        let query = {
          shop_id: self.$route.query.shop_id,
          company_id: self.$route.query.company_id
        }
        self.query = query
      }
    }
  },
  created () {
    document.addEventListener('scroll', this.scrollEvent)
  },
  beforeDestroy () {
    document.removeEventListener('scroll', this.scrollEvent)
  },
  mounted () {
    const self = this
    self.param()
    self.setActive()
  }
}
</script>

<style lang="less" scoped>
</style>
