<template>
  <div class="tread" id="tread">
    <div class="headFixed">
      <div class="tread-header">
        <i class="icon-index" @click="gohome"></i>
        <span class="th-span" @click='chooseFirst'>
          <!--<span class="header-span">箱包</span>-->
          <select class="select1" v-model="selected" @change="ochange">
            <option v-for="item in options" class="optin1" :key="item.label" :value="item">{{item.label}}</option>
          </select>
          <!-- <i class="span-1"></i>-->
        </span>
        <!--  <i class="icon-search"></i> -->
      </div>
      <div class="classify">
        <ul class="tread-ul">
          <li class="tread-li" v-for="(k,i) in selected.children" :key="i" :class="{'is-select1':i==secondSelected}" @click="choseSecondSelected(i,k)">
            {{k.label}}
          </li>
        </ul>
      </div>
    </div>
    <!-- <v-tdcontent :address="stores"></v-tdcontent> -->
    <!-- 分段显示 indexList -->
    <div class="content" id="vcontent" v-infinite-scroll="loadMore" :style="style" infinite-scroll-disabled="allLoad" infinite-scroll-distance="10">
      <div v-for="(item,index) in indexlist" :key="index" :id="index">
        <v-tdcontent :address="item"></v-tdcontent>
      </div>
    </div>
    <div class="tread-footer">
      <ul class="tread-ul">
        <li class="tread-li" v-for="(k,i) in circle" :key="i" :class="{'is-select2':circleSelected==i}" @click="choseCircleSelected(i,k)"
          :id="'circle'+i">
          {{k.circle_name}}
        </li>
      </ul>
    </div>
    <div class="spinner-center">
      <mt-spinner v-show="isLoading" type="triple-bounce" :size="50"></mt-spinner>
    </div>
    <mt-popup v-model="popupVisible" position="bottom">
      <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
    </mt-popup>
  </div>
</template>

<script type="text/javascript">
import '../../../assets/user/style.css'
import '../../../assets/user/icon/carstyle.css'
import Tcontent from './tread-content.vue'
import {
  Actionsheet
} from 'mint-ui'
import {mapState} from 'vuex'
export default {
  name: 'tread',
  components: {
    'v-tdcontent': Tcontent,
    Actionsheet
  },
  computed: {
    ...mapState({
      visitedViews: state => state.tagsView.visitedViews
    })
  },
  watch: {
    selected (value) {
      let self = this
      if (value) {
        self.$localStorage.set('currentTopCategory', value.value)
        self.categoryid = value.children[self.secondSelected].value
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
              cid: value.value,
              second: self.secondSelected
            }
          })
          self.loadMore()
        }, 300)
      }
    }
  },
  data () {
    return {
      popupVisible: false,
      now_page: 1,
      page_size: 50,
      indexlist: [],
      heights: [],
      first: [],
      second: [],
      stores: [],
      circle: [],
      circleSelected: 0,
      firstSelected: 0,
      secondSelected: 0,
      query: {},
      categoryid: '',
      options: [],
      selected: {},
      topData: [],
      circleid: '',
      loadedData: false,
      allLoad: false,
      isFinding: false,
      interval: 0,
      findInterval: 0,
      slots: [{
        flex: 1,
        values: [
          '2015-01',
          '2015-02',
          '2015-03',
          '2015-04',
          '2015-05',
          '2015-06'
        ],
        className: 'slot1',
        textAlign: 'center'
      }],
      sheetVisible: false,
      scroll: '',
      dataIndex: 0,
      changeCircle: false,
      isLoading: false,
      locationPath: '',
      ticking: false,
      style: {
        height: window.innerHeight / window.innerWidth * 100 - 36 + 'vw',
        top: '24vw',
        overflow: 'scroll',
        '-webkit-overflow-scrolling': 'touch'
      }
    }
  },
  methods: {
    beforeInit (e, index) {
      // 处理数据加载
    },
    gohome () {
      location.assign('index.html#/home')
    },
    onScroll (e) {
      if (!this.ticking) {
        requestAnimationFrame(this.scrollEvent)
        this.$set(self, 'ticking', true)
      }
    },
    scrollEvent () {
      let self = this
      if (!self.changeCircle) {
        self.$nextTick(function () {
          let index = self.compareWithLength()
          console.log(index)
          var scrollTop = document.getElementById('vcontent').scrollTop
          if (scrollTop > 0) {
            self.$route.meta.position = {
              x: 0,
              y: scrollTop
            }
            self.$store.dispatch('addVisitedViews', self.$route)
          }
          if (
            self.circle.length > index &&
              scrollTop >= 0 &&
              scrollTop + document.getElementById('vcontent').clientHeight <=
              document.getElementById('vcontent').scrollHeight
          ) {
            self.circleid = self.circle[index].circle_id
            self.circleSelected = index
            let anchorElement = document.getElementById('circle' + index)
            // 如果对应id的锚点存在，就跳转到锚点
            if (anchorElement) {
              anchorElement.scrollIntoView()
            }
          }
        })
      }
    },
    menu () {
      console.log(this.scroll, this.$el.offsetHeight, this.$el.scrollHeight)
      // if (this.getDocumentTop() == this.getWindowHeight() + this.scroll) {
      //   //当滚动条到底时,这里是触发内容
      //   //异步请求数据,局部刷新dom
      //   console.log('到底不拉')
      // }
    },
    onValuesChange (picker, values) {
      if (values[0] > values[1]) {
        picker.setSlotValue(1, values[0])
      }
    },
    chooseFirst () {
      const self = this
      self.sheetVisible = true
    },
    getCircleSelected () {
      const self = this
      let circleSelected = self.$localStorage.get('circleSelected')
      self.circleSelected = circleSelected
      // this.$store.commit('CHANGE_COL_SELECTED', i);
    },
    getFirstSelected () {
      const self = this
      let firstSelected = self.$localStorage.get('firstSelected')
      self.firstSelected = firstSelected
      // this.$store.commit('CHANGE_COL_SELECTED', i);
    },
    getSecondSelected () {
      const self = this
      // let secondSelected = self.$localStorage.get('secondSelected');
      if (
        self.$route.query.second !== undefined &&
          self.$route.query.second !== null
      ) {
        self.secondSelected = +self.$route.query.second
      } else {
        self.secondSelected = 0
      }
      // this.$store.commit('CHANGE_COL_SELECTED', i);
    },
    choseCircleSelected (i, k) {
      const self = this
      self.$set(self, 'circleSelected', +i)
      self.$set(self, 'changeCircle', true)
      self.$localStorage.set('circleSelected', i)
      self.circleid = k.circle_id
      let anchorElement = document.getElementById(i)
      // 如果对应id的锚点存在，就跳转到锚点
      if (anchorElement) {
        anchorElement.scrollIntoView(false)
      }
      setTimeout(() => {
        self.changeCircle = false
      }, 200)
    },
    choseSecondSelected (i, k) {
      const self = this
      self.secondSelected = i
      self.$localStorage.set('secondSelected', i)
      self.$router.replace({
        name: '商圈',
        query: {
          cid: self.$route.query.cid,
          second: i
        }
      })
      self.categoryid = k.value
      self.circleSelected = 0
      self.now_page = 1
      self.allLoad = false
      self.circleid = ''
      self.isLoading = false
      self.indexlist = []
      self.dataIndex = 0
      self.loadMore()
      self.findPosition()
      // 重新加载数据
      // this.$store.commit('CHANGE_COL_SELECTED', i);
    },
    ochange () {
      this.secondSelected = 0
      this.$localStorage.set('secondSelected', 0)
    },
    sizeChose (i) {
      this.$store.commit('CHANGE_SIZE_SELECTED', i)
    },
    Mao (selector) {
      var anchor = this.$el.querySelector(selector)
      document.body.scrollTop = anchor.offsetTop
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
              min: length - height,
              max: length,
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
      let area = self.heights.filter(item => +item.min <= scrollTop && +item.max >= scrollTop)
      return area !== undefined && area.length > 0 ? area[area.length - 1].index : 0
    },
    async setTopCategoryData () {
      const self = this
      if (
        self.$route.query.cid !== undefined &&
          self.$route.query.cid !== null
      ) {
        self.query.cid = self.$route.query.cid
      }
      if (
        self.$route.query.second === undefined ||
          self.$route.query.second === null
      ) {
        self.$router.replace({
          name: '商圈',
          query: {
            cid: self.$route.query.cid,
            second: 0
          }
        })
      }
      if (
        self.$route.query.second !== undefined &&
          self.$route.query.second !== null
      ) {
        self.query.second = self.$route.query.second
      }
      if (!self.query.cid) {
        return false
      }
      try {
        let response = await self.getStableData()
        let result = response.data
        let secondSelected = +self.$route.query.second
        if (result.code) {
          self.options = result.msg.rows
          for (let i in self.options) {
            if (+self.options[i].value === +self.$route.query.cid) {
              self.selected = self.options[i]
              if (
                secondSelected != null &&
                  +secondSelected < self.selected.children.length
              ) {
                self.categoryid = self.selected.children[secondSelected].value
                self.getSecondSelected()
              }
              break
            }
          }
        }
      } catch (error) {
        console.log(error)
      }
    },
    async loadMoreData () {
      try {
        let self = this
        if (self.categoryid && !self.allLoad && !self.isLoading) {
          self.isLoading = true
          let res = await self.getShopsDataPromise(
            self.categoryid,
            self.now_page
          )
          // 读取缓存数据
          self.isLoading = false
          self.circle = res.data.msg.circle_data ? res.data.msg.circle_data : []
          if (self.now_page === 1) {
            for (let i in self.circle) {
              self.indexlist[i] = []
            }
          }
          for (let i in res.data.msg.rows) {
            for (let j in self.circle) {
              let temp = []
              if (+self.circle[j].circle_id === +res.data.msg.rows[i].circle_id) {
                temp.push(res.data.msg.rows[i])
                self.indexlist[j] = self.indexlist[j].concat(temp)
              }
            }
          }
          if (+res.data.msg.pagination.total_page > self.now_page) {
            self.now_page++
          } else {
            self.allLoad = true
          }
        }
      } catch (error) {
        console.log(error)
      }
    },
    async loadMore () {
      let self = this
      if (self.allLoad) {
        return false
      }
      await self.loadMoreData()
    },
    async getStableData () {
      try {
        let self = this
        return await self.$store.dispatch('getSecond', {
          id: 0,
          type: 1
        })
      } catch (err) {
        console.log(err)
      }
    },
    async getShopsDataPromise (categoryid, page) {
      try {
        let self = this
        let response = await self.$store.dispatch('getShopsInfoByID', {
          category_id: categoryid,
          now_page: page,
          page_size: self.page_size
        })
        return response
      } catch (error) {
        console.log(error)
      }
    },
    findPosition () {
      let self = this
      self.isFinding = true
      self.removeListener()
      for (let i in self.visitedViews) {
        let v = self.visitedViews[i]
        if (v.path === self.$route.path && +v.query.cid === +self.$route.query.cid && +v.query.second === +self.$route.query.second) {
          self.$route.meta.position = v.meta.position
          // document.getElementById('vcontent').scrollTop = +v.meta.position.y
          // console.log(document.getElementById('vcontent').scrollTop)
          let scrollTop = document.getElementById('vcontent').scrollTop
          self.interval = setInterval(function () {
            let scrollHeight = document.getElementById('vcontent').scrollHeight
            if (scrollHeight > v.meta.position.y && scrollTop !== +v.meta.position.y && !self.isLoading) {
              self.$nextTick(function () {
                document.getElementById('vcontent').scrollTop = +v.meta.position.y
                console.log(document.getElementById('vcontent').scrollTop, v.meta.position.y, self.isLoading)
                if (document.getElementById('vcontent').scrollTop >= +v.meta.position.y) {
                  self.clear()
                }
              })
            } else {
              if (!self.allLoad && !self.isLoading) {
                self.loadMore()
              }
            }
          }, 300)
          break
        }
      }
      if (self.visitedViews.length < 1) {
        setTimeout(() => {
          self.isFinding = false
        }, 300)
      }
    },
    clear () {
      clearInterval(this.interval)
      this.isFinding = false
      console.log('????')
      this.addListener()
    },
    addListener () {
      document.getElementById('vcontent').addEventListener('scroll', this.onScroll, false)
    },
    removeListener () {
      document.getElementById('vcontent').addEventListener('scroll', this.onScroll)
    }
  },
  updated () {
    let self = this
    self.calculateHeights()
  },
  beforeDestroy () {
    this.removeListener()
  },
  mounted () {
    const self = this
    // 进入页面根据id 请求顶部数据
    // if (self.$localStorage.get('secondSelected') == null) {
    //   self.$localStorage.set('secondSelected', 0);
    // } else {
    //   self.secondSelected = self.$localStorage.get('secondSelected');
    // }
    self.setTopCategoryData()
    self.calculateHeights()
    self.addListener()
    self.findPosition()
  }
}

</script>

<style lang="less" scoped>
  .slot1 {
    width: 100%;
  }

  .is-select2 {
    background-color: #fb701b;
  }

  .tread {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
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
      }
    }
    .content {
      margin-top: 24vw;
      overflow: scroll;
    }
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
    .classify::-webkit-scrollbar,
    .tread-footer::-webkit-scrollbar {
      display: none;
    }
    .spinner-center {
      display: flex;
      width: 100%;
      justify-content: center;
      align-items: center;
      bottom: 12vw;
      position: fixed;
    }
    .tread-footer {
      position: fixed;
      bottom: 0;
      background: #f86141;
      color: #fff;
      white-space: nowrap;
      overflow-x: auto;
      height: 12vw;
      line-height: 12vw;
      right: 0;
      left: 0;
    }
  }

</style>
