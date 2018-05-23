<template lang="html">
  <div class="detail">
    <!--<v-swiper :swiperData="property"> </v-swiper>-->
    <v-swiper :swiperData="swipeData" :view="datas" :query="query"> </v-swiper>
    <v-chose v-if="datas.id" :view="datas"></v-chose>
    <!--<v-content></v-content>-->
    <v-assess v-if="goodsid" :goodsid="goodsid"></v-assess>
    <v-shop v-if="datas.shop_info.shop_id" :view="datas"></v-shop>
    <v-bdetail v-if="datas.id" :view="datas" :query="query"></v-bdetail>
    <!--<v-baseline></v-baseline>-->
    <v-footer v-if="datas.id" :view="datas" :query="query"></v-footer>
  </div>
</template>

<script>
import {
  MessageBox
} from 'mint-ui'
import Swiper from '../components/detail/swiper.vue'
import Chose from '../components/detail/chose.vue'
import Content from '../components/detail/content.vue'
import Footer from '../components/detail/footer.vue'
import Baseline from '@/components/common/_baseline.vue'
import Assess from '../components/detail/assess.vue'
import Shop from '../components/detail/shop.vue'
import Bdetail from '../components/detail/bdetail.vue'
import wx from 'weixin-js-sdk'
export default {
  data () {
    return {
      datas: {},
      property: [],
      swipeData: [],
      query: {},
      goodsid: 0,
      info: {
        name: '商品详情',
        intro: '发现一个好商品',
        cover: ''
      }
      //     dataswip: []
    }
  },
  components: {
    'v-swiper': Swiper,
    'v-chose': Chose,
    'v-content': Content,
    'v-assess': Assess,
    'v-shop': Shop,
    'v-footer': Footer,
    'v-bdetail': Bdetail,
    'v-baseline': Baseline
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
    setActive () {
      const self = this
      self.$store.dispatch('getGoodsInfo', {
        'shop_id': self.query.shop_id,
        'serial': self.query.serial
      }).then(function (res) { // 广告
        let result = res.data
        if (result.code) {
          self.datas = result.msg
          self.goodsid = result.msg.id
          self.property = result.msg.stock
          // 限制最大长度
          self.swipeData = Array.isArray(self.property) && self.property.length >= 5 ? self.swipeData = self.property.slice(0, 5) : self.property
          if (self.property.length > 0) {
            let cover = self.$helper.getRealPicURL(self.property[0].images, +self.query.company_id, +self.query.shop_id, 'wfellow_h410')
            self.$set(self.info, 'cover', cover)
            self.$store.dispatch('getSignPackage').then(function (res) {
              self.configSharePlugs(res.data)
            })
          }
        } else {
          MessageBox('提示', result.error[0])
          console.log(result.error)
        }
      })
    },
    param () {
      const self = this
      console.log('self.$route.query.serial')
      console.log(self.$route.query.serial)
      if (self.$route.query.serial) {
        let query = {
          goods_id: self.$route.query.goods_id,
          shop_id: self.$route.query.shop_id,
          serial: self.$route.query.serial,
          company_id: self.$route.query.company_id
        }
        self.$set(self, 'query', query)
      }
    }
  },
  mounted () {
    const self = this
    self.param()
    self.setActive()
    //
  }
}
</script>

<style lang="less" scoped>
  .detail {
    width: 100%;
    height: auto;
    padding-bottom: 14vw;
    background: #f0f0f0;
  }
</style>
