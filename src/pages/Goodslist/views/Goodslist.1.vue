<template>
  <div class="goos_list">
    <v-header>
      <div v-if="title" class="aheader" slot="title">{{title}}</div>
    </v-header>

    <div class="list"  id="vcontent" :style="style" v-infinite-scroll="loadMore" :infinite-scroll-disabled="loading" infinite-scroll-distance="10">
      <div class="item" v-for="item in list" :key="item.goods_id">
        <div class="imageContain">
          <img class="image" @click="detail(item.company_id,item.shop_id,item.goods_id,item.serial)" :src="$helper.getRealPicURL(item.cover,item.company_id,item.shop_id,'w386_h454')">
         <!-- <img v-else class="image" :src="item.property[1].image_url">-->
        </div>
        <div class="info">
          <div class="detail">{{item.title}}
          </div>
          <div class="price"><span class="price-1">￥</span>{{item.min_price}}</div>
        </div>
        <i class="car"></i>
      </div>
    </div>
     <v-baseline ></v-baseline>
  </div>
</template>

<script>
import Header from '@/components/common/_header.vue'
import Baseline from '@/components/common/_baseline.vue'
import {mapState} from 'vuex'
export default {
  computed: {
    ...mapState({
      visitedViews: state => state.tagsView.visitedViews
    })
  },
  components: {
    'v-header': Header,
    'v-baseline': Baseline
  },
  data () {
    return {
      title: '',
      list: [],
      page: 1,
      order: '',
      condition: '',
      keyword: '',
      loading: false,
      selected: '1',
      cid: '',
      style: {
        height: window.innerHeight / window.innerWidth * 100 - 36 + 'vw',
        top: '24vw',
        overflow: 'scroll',
        '-webkit-overflow-scrolling': 'touch'
      },
      changeCircle: false,
      ticking: false
    }
  },
  methods: {
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
            self.$route.query.cid = self.$helper.getUrlKey('cid')
            self.$route.query.keyword = self.$helper.getUrlKey('keyword')
            console.log('addVisitedViews')
            console.log('self.$route', self.$route)
            self.$store.dispatch('addVisitedViews6', self.$route)
          }
        })
      }
    },
    detail (companyId, shopId, goodsId, serial) {
      this.$localStorage.set('TREADTAGVISITEDVIES', JSON.stringify(this.visitedViews))
      location.assign('shop.html#/shopdetail?goods_id=' + goodsId + '&serial=' + serial + '&company_id=' + companyId + '&shop_id=' + shopId)
      /* self.$router.push({
        path: '/detail?company_id=' + companyId + '&shop_id=' + shopId + '&goods_id=' + goodsId + '&serial=' + serial
      }) */
    },
    loadMore () {
      // // 防止多次加载
      // let self = this
      // if (self.loading) {
      //   return false
      // }
      // self.loading = true
      // setTimeout(() => {
      //   // TODO
      //   self.loading = false
      // }, 2500)
    },
    loadQuerys () {
      const self = this
      if (self.$helper.getUrlKey('cid')) {
        // test
        // self.keyword = self.$route.query.keyword
        // self.keyword = '小小酥'
        self.cid = self.$helper.getUrlKey('cid')
        self.title = self.$helper.getUrlKey('keyword')
        console.log('cid')

        console.log(self.cid)

        let category = {
          category_id: self.cid
        }
        self.condition = JSON.stringify(category)
        console.log(self.condition)
      }
    },
    loadDatas () {
      let self = this
      console.log('loadDatas')
      if (self.cid || self.keyword) {
        self.$store.dispatch('goodsList_shop2', {
          keyword: self.keyword,
          page_size: '10',
          now_page: self.page,
          order: self.order,
          condition: self.condition
        }).then(function (res) {
          console.log(res)
          if (+res.data.code === 1) {
            self.list = res.data.msg.rows
            console.log(self.list)
          }
        }).catch(function (err) {
          console.log(err)
        })
      }
    },
    findPosition () {
      let self = this
      console.log('self.visitedViews', self.visitedViews)
      self.removeListener()
      for (let i in self.visitedViews) {
        let v = self.visitedViews[i]
        if (v.path === self.$route.path && +v.query.cid === +self.$helper.getUrlKey('cid') && v.query.keyword === self.$helper.getUrlKey('keyword')) {
        //  if (v.path === self.$route.path && +v.query.cid === +self.$route.query.cid && v.query.keyword === self.$route.query.keyword) {
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
    }
  },
  mounted () {
    let self = this
    console.log()
    self.loadQuerys()
    self.loadDatas()

    self.addListener()
    self.findPosition()
  }
}
</script>

<style lang="less" scoped>
  .goos_list {
    width: 100%;
    background: #f2f2f2;
    .aheader {
      width: 100%;
      font-size: 4.4vw;
    }
    .list {
      display: flex;
      flex-flow: row wrap;
      justify-content: space-between;
      flex: 1;
      background: #f2f2f2;
      padding: 15% 0 0 3%;
      &::after {
        content: "";
        width: 45vw;
      }
      .item {
        position: relative;
        width: 48%;
        background: #f2f2f2;
        margin-bottom: 3%;
        .imageContain {
          width: 100%;
          height: 55vw;
          .image {
            width: 100%;
            height: 100%;
          }
        }
        .info {
          width: 94%;
          height: 14vw;
          padding: 0 1.4vw 1vw;
          display: flex;
          flex-direction: column;
          font-size: 4vw;
          background: #fff;
          .detail {
            color: #000;
            padding: 2vw 0;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            height: 5vw;
          }
          .price {
            color: red;
            .price-1{
              font-size: 3.3vw;
            }
          }
        }
        .car{
          padding: 3.4vw 4.8vw;
          background: url("../../../images/cart.png") no-repeat;
          background-size: 100% 100%;
          margin-left: 48%;
          position: absolute;
          height: 2.4vw;
          bottom: 0;
          right: 0;
        }
      }
    }
  }
</style>
