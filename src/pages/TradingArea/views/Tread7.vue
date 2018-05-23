<template lang="html">
  <div class="tread">
    <div class="headFixed">
      <div class="tread-header">
        <i class="icon-index" @click="gohome"></i>
        <span class="th-span">
          <select class="select1" v-model="selected">
            <option v-for="item in options" class="optin1" :key="item.name" :value="item">{{item.name}}</option>
          </select>
        </span>
      </div>
      <div class="classify">
        <div class="tread-ul">
          <div class="tread-li" v-for="(k,i) in categorys" :key="i" :class="{'is-select1':i == sid}" :id="'category'+i" @click="choseSecondSelected(i,k)">
            {{k.title}}
          </div>
        </div>
      </div>
    </div>
    <div id="vcontent" v-infinite-scroll="loadMore" :infinite-scroll-disabled="!canNext" :style="style" infinite-scroll-distance="10"
      class="sloda">
      <div v-for="(item,index) in results" :key="index" :id="index">
        <v-tdcontent :address="item"></v-tdcontent>
      </div>
    </div>
    <div class="spinner-center">
        <mt-spinner v-if="isLoading" type="triple-bounce" :size="50"></mt-spinner>
    </div>
    <div class="tab2-ul-footer"> {{canNext ? '向上滑动查看更多' : '人家是有底线的'}}</div>
  </div>

</template>

<script type="text/javascript">
import '../../../assets/user/style.css'
import '../../../assets/user/icon/carstyle.css'
import {mapGetters, mapActions} from 'vuex'
import Tcontent from './tread-content.vue'
export default {
  name: 'tread7',
  data () {
    return {
      cid: '',
      heights: [],
      ticking: false,
      tickings: false,
      findInterval: 0,
      interval: 0,
      selected: {},
      options: [],
      style: {
        height: (window.innerHeight / window.innerWidth * 100 - 24) + 'vw',
        top: '24vw',
        'padding-bottom': '14.7vw',
        overflow: 'scroll',
        '-webkit-overflow-scrolling': 'touch'
      }
    }
  },
  computed: {
    ...mapGetters({
      categorys: 'categorys',
      results: 'results',
      canNext: 'canNext',
      isLoading: 'isLoading',
      sid: 'sid',
      scrollTop: 'scrollTop',
      store: 'store'
    })
  },
  watch: {
    scrollTop (value) {
      this.storeData()
    },
    results (value) {
      console.log('change')
      this.$localStorage.set('TRADINGAREASEVENSTATE', JSON.stringify(this.store))
    },
    selected (value, old) {
      // let self = this
      if (value && old.id !== undefined) {
        // 刷新cid
        this.resetAll()
        this.cid = value.id
        this.getAllCategorys(this.cid)
        setTimeout(() => {
          this.loadMoreData()
        }, 750)
        this.$router.replace({
          name: '商圈7',
          query: {
            cid: value.id
          }
        })
      }
    }
  },
  components: {
    'v-tdcontent': Tcontent
  },
  methods: {
    storeData () {
      this.$localStorage.set('TRADINGAREASEVENPOSITION', JSON.stringify(this.scrollTop))
    },
    onScroll (e) {
      if (!this.ticking) {
        requestAnimationFrame(this.scrollEvent)
        this.$set(self, 'ticking', true)
      }
    },
    scrollEvent () {
      let self = this
      if (!self.changeCircle && !self.isfinding) {
        self.$nextTick(function () {
          let index = self.compareWithLength()
          var scrollTop = document.getElementById('vcontent').scrollTop
          self.setScrollTop(scrollTop)
          if (
            self.categorys.length > index &&
              scrollTop >= 0 &&
              scrollTop + document.getElementById('vcontent').clientHeight <=
              document.getElementById('vcontent').scrollHeight
          ) {
            if (index === self.sid + 1 || index === self.sid || index === self.sid + 2 || index === self.sid - 1) {
              self.setSid(index)
              let anchorElement = document.getElementById('category' + index)
              // 如果对应id的锚点存在，就跳转到锚点
              if (anchorElement) {
                anchorElement.scrollIntoView()
              }
            }
          }
        })
      }
    },
    clear () {
      clearInterval(this.findInterval)
      this.isfinding = false
      this.addListener()
    },
    findPosition () {
      let self = this
      self.isfinding = true
      self.removeListener()
      self.findInterval = setInterval(function () {
        self.$nextTick(function () {
          if (document.getElementById('vcontent').scrollTop < +self.scrollTop) {
            document.getElementById('vcontent').scrollTop = +self.scrollTop
            console.log(document.getElementById('vcontent').scrollTop, self.scrollTop)
          } else {
            self.clear()
          }
        })
      }, 300)
    },
    compareWithLength () {
      let self = this
      var scrollTop = document.getElementById('vcontent').scrollTop
      let area = self.heights.filter(item => +item.min <= scrollTop && +item.max >= scrollTop)
      return area !== undefined && area.length > 0 ? area[area.length - 1].index : 0
    },
    calculateHeights () {
      // 刷新数据之后重新计算
      let self = this
      let heights = []
      let length = 0
      if (self.results) {
        for (var i = 0; i < self.results.length; i++) {
          if (document.getElementById(i)) {
            let height = document.getElementById(i).scrollHeight
            length += height
            heights.push({
              min: length - height,
              max: length,
              index: i
            })
          }
        }
      }
      self.$set(self, 'heights', heights)
    },
    loadMore () {
      let self = this
      console.log('loadMore')
      setTimeout(() => {
        self.loadData()
      }, 750)
    },
    gohome () {
      window.history.go(-1)
    },
    loadData () {
      let self = this
      self.loadMoreData()
    },
    addListener () {
      document.getElementById('vcontent').addEventListener('scroll', this.onScroll, false)
    },
    removeListener () {
      document.getElementById('vcontent').addEventListener('scroll', this.onScroll)
    },
    async choseSecondSelected (i, k) {
      this.removeListener()
      this.setSid(i)
      await this.loadAtFirstPage(k.first_page)
      this.$nextTick(() => {
        let anchorElement = document.getElementById(i)
        // 如果对应id的锚点存在，就跳转到锚点
        if (anchorElement) {
          anchorElement.scrollIntoView(true)
          setTimeout(() => {
            this.addListener()
          }, 500)
        }
      })
    },
    getBusinessCircle () {
      const self = this
      self.$store.dispatch('getBusinessCircle').then(function (res) {
        self.options = res.data.msg
        for (let i in self.options) {
          if (+self.options[i].id === +self.cid) {
            self.selected = self.options[i]
          }
        }
      })
    },
    async setTopCategoryData () {
      const self = this
      if (!self.cid) {
        return false
      }
      self.getBusinessCircle()
    },
    ...mapActions([
      'getAllCategorys',
      'loadMoreData',
      'resetAll',
      'reLoadState',
      'setSid',
      'setScrollTop',
      'loadAtFirstPage'
    ])
  },
  updated () {
    let self = this
    self.calculateHeights()
  },
  beforeDestroy () {
    this.removeListener()
  },
  mounted () {
    this.resetAll()
    this.addListener()
    if (this.$route.query.cid !== undefined) {
      this.cid = this.$route.query.cid
      this.setTopCategoryData()
    }
    let store = JSON.parse(this.$localStorage.get('TRADINGAREASEVENSTATE'))
    if (store && store.results && store.results.length > 0 && store.results[0].length > 0) {
      this.reLoadState(store)
      let scrollTop = JSON.parse(this.$localStorage.get('TRADINGAREASEVENPOSITION'))
      if (+scrollTop > 0) {
        this.setScrollTop(scrollTop)
        this.findPosition()
      }
    } else {
      this.getAllCategorys(this.cid)
      setTimeout(() => {
        this.loadMoreData()
      }, 750)
    }
    this.calculateHeights()
  }
}
</script>
<style lang="less" scoped>
  .spinner-center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .tab2-ul-footer {
    margin-top: -14.7vw;
    text-align: center;
    height: 14.7vw;
    line-height: 14.7vw;
    font-size: 4.2vw;
  }
  .tread{
    .headFixed {
      position: fixed;
      margin: 0px;
      padding: 0px;
      height: 24vw;
      z-index: 100;
      width: 100%;
      .tread-header {
        top: 0;
        height: 12vw;
        background: #f9f9f9;
        line-height: 12vw;
        padding: 0 5vw;
        .th-span {
          vertical-align: super;
          display: inline-block;
          width: 82%;
          text-align: center;
        }
        .select1 {
          border: none;
          background: #f9f9f9;
          font-size: 5.2vw;
          height: 9vw;
          color: #333;
          text-align: center;
          text-align-last: center;
          option {
            background: #fff;
            font-size: 3vw;
            overflow: scroll;
          }
        }
        .icon-index:before,
        .icon-search:before {
          font-size: 6vw;
          line-height: 12vw;
          color: #292929;
        }
        .header-span {
          font-size: 6vw;
          color: #000;
        }
        .span-1 {
          border-color: #000 transparent transparent transparent;
          border-width: 2.5vw 1.5vw 0 1.5vw;
          border-style: solid;
          display: inline-block;
        }
      }
      .classify {
        top: 12vw;
        background: #f86141;
        color: #fff;
        white-space: nowrap;
        overflow-x: auto;
        height: 12vw;
        line-height: 12vw;
        .tread-ul {
          height: 100%;
          margin-left: 2%;
          background-color: inherit;
          .tread-li {
            display: inline-block;
            height: 100%;
            background-color: inherit;
            /*min-width: 15vw;*/
            /*text-align: center;*/
            margin-right: 2vw;
            font-size: 4.5vw;
            padding: 0 2vw;
          }
          .is-select1 {
            color: #fbec04;
            border-bottom: 1vw solid #fbec04;
            height: 92%;
          }
          .is-select2 {
            color: #fbec04;
            border-bottom: 1vw solid #fbec04;
            height: 92%;
          }
        }
      }
    }
    .classify::-webkit-scrollbar,.tread-footer::-webkit-scrollbar{
      display: none;
    }
    .tread-footer{
      position: fixed;
      bottom: 0;
      background: #FCAB36;
      color: #fff;
      white-space: nowrap;
      overflow-x: auto;
      height: 12vw;
      line-height: 12vw;
      right: 0;
      left: 0;
    }
    .sloda{
      padding-top: 23%;
    }
  }
</style>
