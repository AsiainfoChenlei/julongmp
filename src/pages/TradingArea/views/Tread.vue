<template lang="html">
  <div class="tread">
    <div class="tread-header">
      <i class="icon-index" @click="$router.go(-1)"></i>
      <span class="th-span" @click='chooseFirst'>
                                <!--<span class="header-span">箱包</span>-->
     <select class="select1" v-model="selected">
      <option v-for="item in options" class="optin1" :value ="item">{{item.label}}</option>
      </select>
      <!-- <i class="span-1"></i>-->
      </span>
    <!--  <i class="icon-search"></i> -->
    </div>
    <div class="classify">
      <ul class="tread-ul">
        <li class="tread-li" v-for="(k,i) in selected.children" :class="{'is-select1':secondSelected==i}" @click="choseSecondSelected(i,k)">
          {{k.label}}
        </li>
      </ul>
    </div>
    <!-- <v-tdcontent :address="stores"></v-tdcontent> -->
    <!-- 分段显示 indexList -->
    <div class="content" style="padding-bottom: 11.7vw; ">
      <div v-for="(item,index) in indexlist" :ref="'index'+index" :id="index">
        <vue-lazy-component :viewport="null" :before-init="beforeInit(item,index)">
          <v-tdcontent :address="item.data"></v-tdcontent>
        </vue-lazy-component>
      </div>
    </div>
    <div class="tread-footer">
      <ul class="tread-ul">
        <li class="tread-li" v-for="(k,i) in circle" :class="{'is-select2':circleSelected==i}" @click="choseCircleSelected(i,k)">
          {{k.name}}
        </li>
      </ul>
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
import {component as VueLazyComponent} from '@xunlei/vue-lazy-component'
import {Popup} from 'mint-ui'
import {Picker} from 'mint-ui'
import {Actionsheet} from 'mint-ui'
export default {
  components: {
    'v-tdcontent': Tcontent,
    Actionsheet,
    'vue-lazy-component': VueLazyComponent
  },
  watch: {
    selected (value) {
      console.log('selected', value)
      let self = this
      if (value) {
        self.secondSelected = 0
        self.$localStorage.set('secondSelected', 0)
        self.categoryid = value.children[self.secondSelected].value
        self.circleid = self.circle[0].id
        self.circleSelected = 0
        if (self.circleid) {
          // self.getShopsByCircle()
          self.loadDatasByValues()
        }
      }
    }
  },
  data () {
    return {
      popupVisible: false,
      now_page: 1,
      page_size: 10,
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
      slots: [{
        flex: 1,
        values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
        className: 'slot1',
        textAlign: 'center'
      }],
      sheetVisible: false,
      scroll: ''
    }
  },
  methods: {
    beforeInit (e, index) {
      // 处理数据加载
      let self = this
      if (+e.cRequestStatus === 2 && e.cRequest.length > 0) {
        Promise.all(e.cRequest).then(function (cresults) {
          for (let i in cresults) {
            const res = cresults[i].data
            if (Array.isArray(res.msg.rows)) {
              e.data = e.data.concat(res.msg.rows)
            }
          }
          // success
          e.cRequestStatus = 1
          e.cRequest = []
          self.indexlist[+index] = e
        }).catch(function (err) {
          console.log(err)
          // fail
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
    param () {
      const self = this
      console.log(self.$route.query.cid)
      if (self.$route.query.cid) {
        self.query.cid = self.$route.query.cid
      }
      if (!self.query.cid) {
        return false
      }
      self.getStableData().then(function (res) {
        if (res) {
          self.loadDatasByValues()
        }
      }).catch(function (err) {
        console.log(err)
      })
    },
    loadDatasByValues () {
      let self = this
      let promises = []
      for (let index = 0; index < self.circle.length; index++) {
        let promise = self.loadDatasBySingleValues(self.circle[index].id, self.categoryid)
        promises.push(promise)
      }
      Promise.all(promises).then(function (results) {
        self.indexlist = results
        console.log(self.$refs)
        console.log(self.indexlist)
      }).catch(function (err) {
        console.log(err)
      })
    },
    loadDatasBySingleValues (circleid, categoryid) {
      let self = this
      return new Promise(function (resolve, reject) {
        self.getShopsDataPromise(circleid, categoryid, 1).then(function (res) {
          let result = res.data
          if (result.code) {
            let format = {}
            format.data = result.msg.rows
            format.cRequest = []
            format.cRequestStatus = false
            // 需要定义一个不重复的identifier
            // 根据totalPage 来多次请求数据 先创建promise
            for (let index = +result.msg.pagination.now_page; index < +result.msg.pagination.total_page; index++) {
              let promise = self.getShopsDataPromise(circleid, categoryid, index + 1)
              format.cRequest.push(promise)
            }
            // 根据数据量 判断是否加载 暂时先加载两个页面 多的就不加载
            if (Array.isArray(format.cRequest) && format.cRequest.length < 2) {
              Promise.all(format.cRequest).then(function (cresults) {
                for (let i in cresults) {
                  const res = cresults[i].data
                  if (Array.isArray(res.msg.rows)) {
                    format.data = format.data.concat(res.msg.rows)
                  }
                }
                // success
                format.cRequestStatus = 1
              }).catch(function (err) {
                console.log(err)
                // fail
                format.cRequestStatus = 0
              })
            } else {
              // need requestMore
              format.cRequestStatus = 2
            }
            resolve(format)
            // 假数据
            // alert('该商圈和类别下数据为空');
            // self.property=result.msg.property;
            // self.property=JSON.parse(result.msg.property);
          }
        }).catch(function (err) {
          console.log(err)
          reject(err)
        })
      })
    },
    getStableData () {
      let self = this
      return new Promise(function (resolve, reject) {
        Promise.all([self.getTopCategoryPromise(), self.getBusinessCirclePromise()]).then(function (results) {
          console.log(results)
          if (results[0]) {
            let result = results[0].data
            if (result.code) {
              self.options = result.msg.rows
              for (let i in self.options) {
                if (+self.options[i].value === +self.$route.query.cid) {
                  self.selected = self.options[i]
                  self.categoryid = self.selected.children[0].value
                  break
                }
              }
            }
          }
          if (results[1]) {
            let result = results[1].data
            if (result.code) {
              console.log('result.msggetBusinessCircle')
              console.log(result.msg)
              self.circle = result.msg
              self.circleid = self.circle[0].id
            }
          }
          if (self.circleid && self.categoryid) {
            resolve(true)
          } else {
            resolve(false)
          }
        }).catch(function (err) {
          reject(err)
        })
      })
    },
    getCircleSelected () {
      const self = this
      let circleSelected = self.$localStorage.get('circleSelected')
      self.circleSelected = circleSelected
    },
    getFirstSelected () {
      const self = this
      let firstSelected = self.$localStorage.get('firstSelected')
      self.firstSelected = firstSelected
    },
    getSecondSelected () {
      const self = this
      let secondSelected = self.$localStorage.get('secondSelected')
      self.secondSelected = secondSelected
    },
    // 点击后把i赋值给colSelected,再通过判断决定是否添加选中样式 (active)
    choseCircleSelected (i, k) {
      // console.log('iiiiiiiiiiiiiiiiiii');
      const self = this
      self.circleSelected = i
      console.log(self.circleSelected)
      self.$localStorage.set('circleSelected', i)
      self.circleid = k.id
      self.$nextTick(function () {
        let ref = 'index' + i
        self.$refs[ref][0].scrollIntoView()
        // self.$refs.ref[0].scrollIntoView()
      })
      // self.getShopsByCircle();
      // this.$store.commit('CHANGE_COL_SELECTED', i);
    },
    choseFirstSelected (i) {
      const self = this
      self.firstSelected = i
      console.log(self.firstSelected)
      self.$localStorage.set('firstSelected', i)
      self.getShopsByCircle()
    },
    choseSecondSelected (i, k) {
      const self = this
      self.secondSelected = i
      console.log(self.secondSelected)
      self.$localStorage.set('secondSelected', i)
      self.categoryid = k.value
      self.circleid = self.circle[0].id
      self.circleSelected = 0
      self.loadDatasByValues()
      // 重新加载数据
      // this.$store.commit('CHANGE_COL_SELECTED', i);
    },
    sizeChose (i) {
      this.$store.commit('CHANGE_SIZE_SELECTED', i)
    },
    getBusinessCircle () {
      // console.log('txt');
      // return;
      const self = this
      self.$store.dispatch('getBusinessCircle').then(function (res) { // 广告
        let result = res.data
        if (result.code) {
          console.log('result.msggetBusinessCircle')
          console.log(result.msg)
          self.circle = result.msg
          self.circleid = self.circle[0].id
          // self.property=result.msg.property;
          // self.property=JSON.parse(result.msg.property);
          if (self.categoryid) {
            // self.getShopsByCircle();
          }
        } else {
          console.log(result.error)
        }
      })
    },
    getBusinessCirclePromise () {
      let self = this
      return self.$store.dispatch('getBusinessCircle')
    },
    getTopCategoryPromise () {
      let self = this
      return self.$store.dispatch('getSecond', {
        'id': 0,
        type: 1
      })
    },
    getFirst () {
      const self = this
      self.$store.dispatch('getSecond', {
        'id': 0,
        type: 1
      }).then(function (res) { // 广告
        let result = res.data
        if (result.code) {
          self.options = result.msg.rows
          for (let i in self.options) {
            if (+self.options[i].value === +self.$route.query.cid) {
              self.selected = self.options[i]
              self.categoryid = self.selected.children[0].value
              break
            }
          }
        }
      })
    },
    getShopsDataPromise (circleid, categoryid, page) {
      let self = this
      return self.$store.dispatch('getShopsByCircle', {
        'circle_id': circleid,
        'category_id': categoryid,
        'now_page': page,
        'page_size': self.page_size
      })
    },
    getShopsByCircle () {
      const self = this
      console.log('self.circle[self.circleSelected].id')
      console.log(self.circleid, self.categoryid)
      // 测试数据
      // self.categoryid = 95,
      // self.circleid = 1
      self.$store.dispatch('getShopsByCircle', {
        'circle_id': self.circleid,
        'category_id': self.categoryid,
        'now_page': self.now_page,
        'page_size': self.page_size
      }).then(function (res) { // 广告
        let result = res.data
        if (result.code) {
          console.log('result.msg')
          console.log(result.msg)
          self.stores = result.msg.rows
          for (let i in result.msg.rows) {
            self.stores.push(result.msg.rows[i])
          }
          for (let i in result.msg.rows) {
            self.stores.push(result.msg.rows[i])
          }
          for (let i in result.msg.rows) {
            self.stores.push(result.msg.rows[i])
          }
          for (let i in result.msg.rows) {
            self.stores.push(result.msg.rows[i])
          }
          // alert('该商圈和类别下数据为空');
          // self.property=result.msg.property;
          // self.property=JSON.parse(result.msg.property);
        } else {
          console.log(result.error)
        }
      })
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
            heights.push({
              length: length += height,
              index: i
            })
          }
        }
      }
      self.heights = heights
    },
    compareWithLength () {
      let self = this
      var scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      let heights = []
      for (let i in self.heights) {
        heights.push(self.heights[i])
      }
      let N = scrollTop + window.innerHeight
      heights.sort(function (a, b) {
        return Math.abs(a.length - N) - Math.abs(b.length - N)
      })
      return heights[0].index
    }
  },
  updated () {
    let self = this
    self.calculateHeights()
  },
  mounted () {
    const self = this
    self.calculateHeights()
    self.param()
    self.getCircleSelected()
    self.getSecondSelected()
    window.addEventListener('scroll', function () {
      let index = self.compareWithLength()
      self.circleid = self.circle[index].id
      self.circleSelected = index
      // 总高度 body.scrollheight
      // div 总高度 getElementById(0).scrollHeight
    })
    // self.getShopsByCircle();
    /* this.$api({
         method:'post',
         url:'/tread'
       }).then((respose) => {
         const self = this;
         self.box = respose.data.classify.box;
         self.address = respose.data.classify.address;
       }).catch(function (error) {
         alert(error);
       }) */
  }
}
</script>

<style lang="less" scoped>
  .slot1 {
    width: 100%;
  }
  .is-select2 {
    background-color: #FB701B;
  }
  .tread {
    .tread-header {
      height: 12vw;
      background: #f9f9f9;
      line-height: 12vw;
      padding: 0 5vw;
      .th-span{
        vertical-align: super;
        display: inline-block;
        width: 82%;
        text-align: center;
      }
      .select1{
        border:none;
        background: #f9f9f9;
        font-size: 5.2vw;
        height: 9vw;
        color: #333;
        option{
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
      background: #f86141;
      color: #fff;
      white-space: nowrap;
      overflow-x: auto;
      height: 12vw;
      line-height: 12vw;
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
