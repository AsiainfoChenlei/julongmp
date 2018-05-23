<template lang="html">
    <div id="vcontent" :style="style" class="shop">
      <v-header v-if="data.id" :shopinfo="data" :query="query"></v-header>
      <v-content   :shopinfo="data"  :query="query"></v-content>
    </div>
</template>

<script>
import Header from '../components/shop/shop_header.vue'
import Content from '../components/shop/shop_content.vue'
import { Toast } from 'mint-ui'
import {mapState} from 'vuex'

export default {
  data () {
    return {
      data: {},
      query: {},
      style: {
        height: window.innerHeight / window.innerWidth * 100 - 36 + 'vw',
        top: '24vw',
        overflow: 'scroll',
        '-webkit-overflow-scrolling': 'touch'
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
    setActive () {
      const self = this
      self.$store.dispatch('getShopInfo', {'shop_id': self.query.shop_id}).then(function (res) { // 广告
        let result = res.data
        if (result.code) {
          console.log('result.msg')
          console.log(result.msg)
          self.data = result.msg
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
    },
    findPosition () {
      let self = this
      console.log('self.visitedViews', self.visitedViews)
      console.log('self.self.$route', self.$route)
      self.removeListener()
      for (let i in self.visitedViews) {
        let v = self.visitedViews[i]
        //  if (v.path === self.$route.path && +v.query.company_id === +self.$helper.getUrlKey('company_id') && +v.query.shop_id === +self.$helper.getUrlKey('shop_id') && +v.query.select === +self.$helper.getUrlKey('select')) {
        if (v.path === self.$route.path && +v.query.company_id === +self.$route.query.company_id && +v.query.shop_id === +self.$route.query.shop_id && +v.query.select === +self.$route.query.select) {
          self.$route.meta.position = v.meta.position
          // document.getElementById('vcontent').scrollTop = +v.meta.position.y
          // console.log(document.getElementById('vcontent').scrollTop)
          self.interval = setInterval(function () {
            let scrollHeight = document.getElementById('vcontent').scrollHeight
            if (scrollHeight > v.meta.position.y && document.getElementById('vcontent').scrollTop !== +v.meta.position.y && !self.isLoading) {
              self.$nextTick(function () {
                document.getElementById('vcontent').scrollTop = +v.meta.position.y
                console.log('setposition')
                self.clear()
              })
            } else {
              console.log(scrollHeight, v.meta.position.y, document.getElementById('vcontent').scrollTop, self.isLoading)
              if (!self.allLoad && !self.isLoading) {
                self.loadMore()
              }
            }
          }, 300)
          break
        }
      }
    },
    clear () {
      clearInterval(this.interval)
      this.addListener()
    },
    addListener () {
      console.log('addListener')
      document.getElementById('vcontent').addEventListener('scroll', this.onScroll, false)
    },
    removeListener () {
      document.getElementById('vcontent').addEventListener('scroll', this.onScroll)
    },
    onScroll (e) {
      if (!this.ticking) {
        requestAnimationFrame(this.scrollEvent)
        this.$set(self, 'ticking', true)
      }
    },
    scrollEvent () {
      console.log('scrollEvent')
      let self = this
      console.log('self.changeCircle', self.changeCircle)
      if (!self.changeCircle) {
        self.$nextTick(function () {
          // let index = self.compareWithLength()
          var scrollTop = document.getElementById('vcontent').scrollTop
          if (scrollTop > 0) {
            self.$route.meta.position = {
              x: 0,
              y: scrollTop
            }
            // self.$route.query.company_id = self.$helper.getUrlKey('company_id')
            // self.$route.query.shop_id = self.$helper.getUrlKey('shop_id')
            // self.$route.query.select = self.$helper.getUrlKey('select')
            console.log('addVisitedViews')
            console.log('self.$route', self.$route)
            self.$store.dispatch('addVisitedViews6', self.$route)
          }
        })
      }
    }
  },
  mounted () {
    const self = this
    self.param()
    self.setActive()

    self.addListener()
    self.findPosition()
  }
}
</script>

<style lang="less" scoped>
</style>
