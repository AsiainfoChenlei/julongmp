<template lang="html">
  <div class="main">
    <!--<header class="search-header">-->
    <!--<input class="sear-input" type="text" placeholder="毛呢大衣"/>-->
    <!--<i class="icon-search sear-isea"></i>-->
    <!--</header>-->
    <v-header>
      <div class="s-header" slot="title">
        <input class="sear-input" type="text" :placeholder="placeholder" v-model="keyword" />
        <i @click="startSearch" class="icon-search sear-isea"></i>
      </div>
    </v-header>
    <section style="padding-top: 15vw" >
      <mt-navbar>
        <!-- <mt-tab-item id="1"><span style="font-size: 4vw;">全部</span></mt-tab-item> -->
        <mt-tab-item id="goods"><span style="font-size: 4vw;">商品</span></mt-tab-item>
        <mt-tab-item id="shop"><span style="font-size: 4vw;">商铺</span></mt-tab-item>
      </mt-navbar>
    </section>
    <!-- tab-container -->
    <mt-tab-container id="vcontent" :style="style"  v-model="selected">
      <!-- <mt-tab-container-item id="1">
                   <div class="widget d_tag">
                           <div class="title">
                               <h2>
                                   <span class="title_span">历史记录</span>
                               </h2>
                           </div>
                           <div class="d_tags" v-for="item in datas">
                               <a title="" href="/tag/Javascript" data-original-title="item.search_name">{{item.search_name}}</a>
                           </div>
                       </div>
                </mt-tab-container-item> -->
      <mt-tab-container-item id="goods">
        <v-content  identifier="goods" :currrent="selected" ref="goods" url="searchGoodsByKeyword" level="1"></v-content>
      </mt-tab-container-item>
      <mt-tab-container-item id="shop">
        <v-content  identifier="shop" :currrent="selected" ref="shop" url="searchShopByKeyword"></v-content>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
import Header from '../../../components/common/_header.vue'
import Content from '../components/search/searchContent.vue'
import {mapState} from 'vuex'
export default {
  computed: {
    ...mapState({
      visitedViews: state => state.tagsView.visitedViews
    })
  },
  components: {
    'v-header': Header,
    'v-content': Content
  },
  data () {
    return {
      isLoading: false,
      ticking: false,
      datas: [],
      selected: this.$localStorage.get('CHOOSETYPE') ? this.$localStorage.get('CHOOSETYPE') : 'goods',
      keyword: this.$localStorage.get('KEYWORD') ? this.$localStorage.get('KEYWORD') : '',
      placeholder: '商品/商铺',
      choosetype: this.$localStorage.get('CHOOSETYPE') ? this.$localStorage.get('CHOOSETYPE') : 'goods',
      style: {
        height: window.innerHeight / window.innerWidth * 100 - 36 + 'vw',
        // top: '24vw',
        overflow: 'scroll',
        '-webkit-overflow-scrolling': 'touch'
      }
    }
  },

  methods: {
    removeLocalStorage () {
      const self = this
      self.$localStorage.remove('KEYWORD') // 设置缓存
      self.$localStorage.remove('CHOOSETYPE') // 设置缓存
    },
    setLocalStorage () {
      const self = this
      self.$localStorage.set('KEYWORD', self.keyword) // 设置缓存
    },
    startSearch () {
      let self = this
      if (self.keyword.length < 1) {
        self.removeLocalStorage()
        self.keyword = ''
        this.$router.replace({path: '/search'})
      } else {
        self.setLocalStorage()
      }
      self.$refs['goods'].refreshData(self.keyword)
      self.$refs['shop'].refreshData(self.keyword)
    },
    findPosition () {
      let self = this
      console.log('self.visitedViews', self.visitedViews)
      console.log('self.self.$route', self.$route)
      self.removeListener()
      for (let i in self.visitedViews) {
        let v = self.visitedViews[i]
        //  if (v.path === self.$route.path && +v.query.company_id === +self.$helper.getUrlKey('company_id') && +v.query.shop_id === +self.$helper.getUrlKey('shop_id') && +v.query.select === +self.$helper.getUrlKey('select')) {
        if (v.path === self.$route.path && v.query.selected === self.$route.query.selected) {
          console.log('jinlaile....................')
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
  watch: {
    selected (value) {
      console.log(value)
      this.$localStorage.set('CHOOSETYPE', value) // 设置缓存
    }

  },
  mounted () {
    let self = this
    if (self.keyword.length < 1) {

    } else {
      this.$router.replace({path: '/search', query: {selected: self.choosetype}})
      self.$refs['goods'].refreshData(self.keyword)
      self.$refs['shop'].refreshData(self.keyword)
    }
    self.addListener()
    self.findPosition()
  }
}

</script>

<style lang="less" scoped>
  @import '../../../assets/index/style.css';
  a {
    color: #666;
    text-decoration: none;
  }
  .mint-navbar .mint-tab-item{
    padding: 4.3vw 0;
  }
  .main {
    font-size: 20px;
    header {
      height: 16vw;
      background: #f74b27;
      .s-header {
        width: 100%;
        .sear-input {
          width: 80%;
          height: 10vw;
          font-size: 4.7vw;
          text-indent: 8vw;
          border-radius: 24px;
        }
        .sear-isea {
          position: absolute;
          line-height: 10.2vw;
          font-size: 6vw;
          right: 17vw;
        }
        .icon-search:before {
          color: #f74b27;
        }
      }
    }
    .is-selected{
      margin-bottom: 0;
      border-bottom: 0.7vw solid salmon;
      color: salmon;
    }
  }
  .widget {
    clear: both;
    margin-bottom: 10px;
    background-color: #fff;
    border: 1px solid #eaeaea;
    border-radius: 4px;
    -moz-border-radius: 4px;
    -webkit-border-radius: 4px;
  }
  .title {
    position: relative;
    height: 10.7vw;
    padding: 0px 15px 0px 15px;
    border-bottom: 1px solid #eaeaea;
    background: #fbfbfb;
  }
  .title h2 {
    font-weight: inherit !important;
    font-size: 17px;
    margin: 0px;
  }
  .title_span {
    line-height: 10.7vw;
    color: #666;
    font-family: inherit;
    font-style: inherit;
    font-weight: inherit;
    font-size: 5.3vw;
  }
  .d_tags {
    display: inline-block;
    margin: 2%;
  }
  .d_tags a {
    background-color: #f6f6f6;
    color: #999;
    float: left;
    font-size: 12px;
    height: 29px;
    line-height: 29px;
    margin: 1%;
    overflow: hidden;
    padding-left: 2%;
  }
</style>
