<template lang="html">
<div class="tread">
  <div class="headFixed">
      <div class="tread-header">
        <i class="icon-index" @click="gohome"></i>
          <span class="th-span">
            <select class="select1" v-model="selected">
                    <option v-for="item in options" class="optin1" :key="item.name" :value ="item">{{item.name}}</option>
            </select>
          </span>
      </div>
      <div class="classify">
        <ul class="tread-ul">
          <li class="tread-li" v-for="(k,i) in FirstCategories" :key="i" :class="{'is-select1':i==secondSelected}" @click="choseSecondSelected(i,k)">
             {{k.title}}
          </li>
        </ul>
      </div>
  </div>
  <div id="vcontent" v-infinite-scroll="loadMore" infinite-scroll-disabled="allLoad" :style="style" infinite-scroll-distance="10" class="sloda">
    <v-tdcontent :address="address" ></v-tdcontent>
  </div>
  <div class="spinner-center">
      <mt-spinner v-show="!allLoad" type="triple-bounce" :size="10"></mt-spinner>
  </div>
  <!--<div v-show="allLoad" class="tab2-ul-footer">已经是全部啦~~~</div>-->
</div>
</template>
<script type="text/javascript">
import '../../../assets/user/style.css'
import '../../../assets/user/icon/carstyle.css'
import {mapState} from 'vuex'
import Tcontent from './tread-content.vue'
function checkDup (array, obj) {
  var value = obj.id
  for (var i = 0; i < array.length; i++) {
    if (obj) {
      if (array[i]) {
        var value1 = array[i].id
        if (value === value1) {
          return true
        }
      }
    }
  }
  return false
}
export default{
  name: 'tread6',
  computed: {
    ...mapState({
      visitedViews: state => state.tagsView.visitedViews
    })
  },
  watch: {
    selected (value) {
      console.log('selected')
      console.log(value)
      const self = this
      self.circle_id = value.id
      // self.$route.query.cid = self.circle_id
      self.$localStorage.set('cid', self.circle_id)
      console.log('selected', self.secondselected)
      console.log(self.circle_id)
      console.log(self.$router)
      self.loadMore()
      self.allLoad = false
      self.isloading = false
      self.getCircleFirstCategories()
      setTimeout(() => {
        self.$router.replace({
          name: '商圈6',
          query: {
            cid: self.circle_id
            // second: self.$localStorage.get('secondSelected')
          }
        })
      }, 300)

      // self.loadMore()
      // self.allLoad = false
      // self.isloading = false
      // self.getCircleFirstCategories()
    }
  /*  selected (value) {
      console.log('value', value)
      let self = this
      if (value) {
        // self.$localStorage.set('currentTopCategory', value.value)
        // self.categoryid = value.children[self.secondSelected].value
        self.circleid = value.id
        self.circleSelected = 0
        self.now_page = 1
        self.allLoad = false
        self.indexlist = []
        self.circleid = ''
        setTimeout(() => {
          // 切换路由
          self.$router.replace({
            name: '商圈',
            query: {
              cid: self.circleid
              // second: self.secondSelected
            }
          })
          self.loadMore()
        }, 300)
      }
    } */
  },
  components: {
    'v-tdcontent': Tcontent
  },
  data () {
    return {
      box: [],
      address: [],
      shopName: '',
      now_page: 1,
      page_size: 15,
      allLoad: false,
      isloading: false,
      lis: this.$route.query.lis,
      secondSelected: 0,
      FirstCategories: [],
      firstcategory_id: '',
      options: [],
      selected: {},
      circle_id: '',
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
            console.log('addVisitedViews')
            console.log('self.$route', self.$route)
            self.$store.dispatch('addVisitedViews6', self.$route)
          }
        })
      }
    },
    loadMore () {
      const self = this
      setTimeout(() => {
        self.setActive()
      }, 500)
    },
    gohome () {
      location.assign('index.html#/home')
    },
    setActive () {
      const self = this
      if (!self.allLoad && !self.isloading) {
        self.isloading = true
        self.$store.dispatch('getShopsByCircleId', {'circle_id': self.circle_id, 'category_id': self.firstcategory_id, 'now_page': self.now_page, 'page_size': self.page_size}).then(function (res) {
          self.isloading = false
          let result = res.data
          if (+result.code === 1) {
            if (self.now_page === 1) {
              self.address = result.msg.rows
            }
            for (let i in result.msg.rows) {
              if (!checkDup(self.address, result.msg.rows[i])) {
                self.address.push(result.msg.rows[i])
              }
            }
            if (result.msg.pagination.total_count <= self.address.length) {
              // 强制刷新DOM  用set方法 禁止loadMore 调用
              self.$set(self, 'allLoad', true)
            } else {
              // 其余情况 就让page += 1 注意 滑动到底部的时候才会调用  数据不满一屏幕的时候 会自动调用loadMore
              self.now_page++
            }
          } else {
            console.log(result.error)
          }
        })
      }
    },
    // 获取一级分类
    getCircleFirstCategories () {
      const self = this
      self.$store.dispatch('getCircleFirstCategories', {'circle_id': self.circle_id}).then(function (res) {
        console.log(res.data.msg)
        self.FirstCategories = res.data.msg
        // 赋值第一个category_id
        self.firstcategory_id = self.$localStorage.get('category_id') ? self.$localStorage.get('category_id') : res['data']['msg'][0]['id']
      })
    },
    // 根据一级分类点击事件
    choseSecondSelected (i, k) {
      const self = this
      self.secondSelected = i
      self.$localStorage.set('secondSelected', i)
      let circleid = self.circle_id
      let categoryid = k.id
      self.getGoodsByCircleId(circleid, categoryid)
    },
    // 获取一级分类下的结果
    getGoodsByCircleId (k, i) {
      const self = this
      self.$localStorage.set('category_id', i)
      self.$store.dispatch('getShopsByCircleId', {'circle_id': k, 'category_id': i}).then(function (res) {
        self.address = res.data.msg.rows
      })
    },
    // 获取商圈
    getBusinessCircle () {
      const self = this
      self.$store.dispatch('getBusinessCircle').then(function (res) {
        self.options = res.data.msg
        if (self.$localStorage.get('cid') == null) {
          self.$localStorage.set('cid', self.$route.query.cid)
        }
        for (let i in self.options) {
          if (+self.options[i].id === +self.$localStorage.get('cid')) {
            self.selected = self.options[i]
          } else {
            self.select = 0
          }
        }
      })
    },
    Mao (selector) {
      var anchor = this.$el.querySelector(selector)
      document.body.scrollTop = anchor.offsetTop
    },
    findPosition () {
      let self = this
      self.removeListener()
      console.log('self.visitedViews', self.visitedViews)
      for (let i in self.visitedViews) {
        let v = self.visitedViews[i]
        if (v.path === self.$route.path && +v.query.cid === +self.$route.query.cid) {
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
    calculateHeights () {
      // 刷新数据之后重新计算
      let self = this
      let heights = []
      let length = 0
      if (self.indexlist) {
        for (var i = 0; i < self.indexlist.length; i++) {
          if (document.getElementById(i)) {
            let height = document.getElementById(i).scrollHeight
            length += height
            heights.push({
              length: length,
              index: i
            })
          }
        }
      }
      self.$set(self, 'heights', heights)
    },
    compareWithLength () {
      let self = this
      var scrollTop = document.getElementById('vcontent').scrollTop
      let heights = []
      for (let i in self.heights) {
        heights.push(self.heights[i])
      }
      let N = scrollTop + document.getElementById('vcontent').clientHeight
      heights.sort(function (a, b) {
        return Math.abs(a.length - N) - Math.abs(b.length - N)
      })
      if (scrollTop < 10) {
        return 0
      }
      if (N >= document.getElementById('vcontent').scrollHeight) {
        if (!self.allLoad) {
          return heights[0].index - 1 >= 0 ? heights[0].index - 1 : 0
        }
        return heights.length - 1 >= 0 ? heights.length - 1 : 0
      }
      return heights.length > 0 ? (heights[0].index - 1 >= 0 ? heights[0].index - 1 : 0) : 0
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
    const self = this
    self.circle_id = self.$route.query.cid
    self.shopName = this.$localStorage.get('shopname')
    console.log(self.shopName)
    console.log(this.$localStorage.get('secondSelected'))
    if (this.$localStorage.get('secondSelected') == null) {
      this.$localStorage.set('secondSelected', 0)
      this.$localStorage.set('category_id', '')
    } else {
      self.secondSelected = this.$localStorage.get('secondSelected')
    }
    self.getBusinessCircle()
    self.getCircleFirstCategories()
    self.addListener()
    self.findPosition()
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
