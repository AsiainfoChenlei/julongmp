<template>
  <div v-if="identifier==='goods'&&identifier===currrent" class="content" v-infinite-scroll="loadMore" infinite-scroll-disabled="allLoad" infinite-scroll-distance="10">
    <div style="display:none" v-for="(item,index) in list" :key="item.id">
      <img :id="index" :src="$helper.getRealPicURL(item.cover,item.company_id,item.shop_id) | preloadImage(item,that)" />
    </div>
    <div class="leftList">
      <div v-if="leftList.length > 0" v-for="(item ,index) in leftList" :key="index" class="itemContainer1">
        <a @click="godetail(item.goods_id,item.company_id,item.serial,item.shop_id)">
          <img class="itemContainer1 img" :src="$helper.getRealPicURL(item.cover,item.company_id,item.shop_id,'wcut_h400')">
          <div class="itemContainer1 info">{{item.title}}</div>
          <div class="itemContainer1 price">
            <span class="price1">￥</span>{{item.min_price}}
            <span v-if="parseInt(item.max_price)> parseInt(item.min_price)" class="price">~{{item.max_price}}</span>
          </div>
          <i class="itemContainer1 car"></i>
        </a>
        <div class="foot"></div>
      </div>
    </div>
    <div class="rightList">
      <div v-if="rightList.length > 0" v-for="(item ,index) in rightList" :key="index" class="itemContainer1">
        <a @click="godetail(item.goods_id,item.company_id,item.serial,item.shop_id)">
          <img class="itemContainer1 img" :src="$helper.getRealPicURL(item.cover,item.company_id,item.shop_id,'wcut_h400')">
          <div class="itemContainer1 info">{{item.title}}</div>
          <div class="itemContainer1 price">
            <span class="price1">￥</span>{{item.min_price}}
            <span v-if="parseInt(item.max_price)> parseInt(item.min_price)" class="price">~{{item.max_price}}</span>
          </div>
          <i class="itemContainer1 car"></i>
        </a>
        <div class="foot"></div>
      </div>
    </div>
    <div class="spinner-center">
      <mt-spinner v-show="shouldShow" type="triple-bounce" :size="50"></mt-spinner>
    </div>
  </div>
  <div v-else-if="identifier==='shop'&&identifier===currrent" class="content content1" v-infinite-scroll="loadMore" infinite-scroll-disabled="allLoad" infinite-scroll-distance="10">
    <div v-for="(item ,index) in list" :key="index" class="itemContainer2">
      <a  @click="goshophome (item.id, item.company_id)">
        <img class="cover" :src="$helper.getRealPicURL(item.face,1,1,'w100_h100')">
        <div class="info">
          <span class="shop">{{item.shop_name}}</span>
          <span class="shop"></span>
          <span class="shop">{{item.area}}</span>
        </div>
        <div class="right"></div>
      </a>
    </div>
    <div class="spinner-center">
      <mt-spinner v-show="shouldShow" type="triple-bounce" :size="50"></mt-spinner>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Image from '../../../../../util/preloadimage'
import {mapState} from 'vuex'
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
export default {
  props: ['currrent', 'identifier', 'url', 'level'],
  computed: {
    ...mapState({
      visitedViews: state => state.tagsView.visitedViews
    }),
    containerStyle () {
      return 'itemContainer' + self.level ? self.level : ''
    }
  },
  data () {
    return {
      allLoad: false,
      list: [],
      now_page: 1,
      page_size: 10,
      keyword: '',
      shouldShow: false,
      that: this,
      leftColumnHeight: 0,
      rightColumnHeight: 0,
      leftList: [],
      rightList: []
    }
  },
  filters: {
    preloadImage (url, item, that) {
      if (!item.hasPreLoad || item.hasPreLoad === undefined) {
        // 加载
        Image.preLoad(url, (img) => {
          // 成功后替换默认图
          Vue.set(item, 'hasPreLoad', true)
          Vue.set(item, 'preLoadUrl', img.src)
          if (that.leftColumnHeight <= that.rightColumnHeight) {
            // 去掉重复的值
            if (!checkDup(that.leftList, item) && !checkDup(that.rightList, item)) {
              that.leftList.push(item)
              that.leftColumnHeight += window.innerHeight * 0.48 * img.height / img.width + window.innerWidth * 0.24
              Vue.set(that, 'leftList', that.leftList)
              Vue.set(that, 'leftColumnHeight', that.leftColumnHeight)
            }
          } else {
            if (!checkDup(that.rightList, item) && !checkDup(that.leftList, item)) {
              that.rightList.push(item)
              that.rightColumnHeight += window.innerHeight * 0.48 * img.height / img.width + window.innerWidth * 0.24
              Vue.set(that, 'rightList', that.rightList)
              Vue.set(that, 'rightColumnHeight', that.rightColumnHeight)
            }
          }
        })
        // 返回默认
        return ''
      } else {
        // 已经加载
        return item.preLoadUrl
      }
    }
  },
  methods: {
    refreshData (keyword) {
      let self = this
      // 显示出来商品跟商铺
      self.allLoad = false
      self.now_page = 1
      self.keyword = keyword
      self.shouldShow = true
      self.loadMore()
    },
    loadMore () {
      const self = this
      if (self.identifier !== self.currrent) {
        return false
      }
      if (self.allLoad) {
        return false
      }
      setTimeout(() => {
        console.log('loadMore', self.currrent, self.identifier)
        self.requestListData()
      }, 500)
    },
    // 跳转详情页
    godetail (goodsId, companyId, serial, shopId) {
      this.$localStorage.set('TREADTAGVISITEDVIES', JSON.stringify(this.visitedViews))
      location.assign('shop.html#/shopdetail?goods_id=' + goodsId + '&company_id=' + companyId + '&serial=' + serial + '&shop_id=' + shopId)
    },
    // 商家首页
    goshophome (s, c) {
      this.$localStorage.set('TREADTAGVISITEDVIES', JSON.stringify(this.visitedViews))
      location.assign('shop.html#/shop?shop_id=' + s + '&company_id=' + c + '&select=2')
    },
    requestListData () {
      const self = this
      if (self.currrent === self.identifier && !self.allLoad && self.keyword.length > 0) {
        self.shouldShow = true
        self.$store.dispatch(self.url, {
          'keyword': self.keyword,
          'now_page': self.now_page,
          'page_size': self.page_size
        }).then(function (res) { // 广告
          let result = res.data
          // console.log(result.msg);
          if (+result.code === 1) {
            if (self.now_page === 1) {
              self.list = []
              self.leftList = []
              self.rightList = []
              self.leftColumnHeight = 0
              self.rightColumnHeight = 0
            }
            if (Array.isArray(result.msg.rows)) {
              self.list = self.list.concat(result.msg.rows)
              if (+result.msg.pagination.total_count <= self.list.length) {
                self.allLoad = true
              } else {
                self.now_page++
              }
            }
            self.shouldShow = false
          } else {
            console.log(result)
          }
        }).catch(function (fail) {
          console.log(fail)
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .content {
    top: 2vw;
    background: #f2f2f2;
    display: flex;
    .leftList {
      width: 48vw;
      margin: 2vw 1vw 0 1vw;
    }
    .rightList {
      width: 48vw;
      margin: 2vw 1vw 0 1vw;
    }
    .itemContainer1 {
      width: 48vw;
      background-color: #fff;
      position: relative;
      &.img {
        top: 0;
        width: 48vw; //height: 60vw;
      }
      &.info {
        width: 94%;
        height: 7vw;
        font-size: 4.2vw;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        padding: 0 3%;
      }
      &.price {
        color: red;
        width: 94%;
        height: 7vw;
        font-size: 3.3vw;
        padding: 0 3%;
        .price1 {
          font-size: 3.3vw;
          padding-right: 2%;
        }
      }
      &.car {
        padding: 3.4vw 4.8vw;
        background: url("../../../../images/cart.png") no-repeat right;
        background-size: 18% 100%;
        margin-left: 48%;
        position: absolute;
        height: 2.4vw;
        bottom: 4vw;
        right: 0;
      }
      .foot {
        width: 48vw;
        height: 5vw;
        background: #f2f2f2;
      }
    }
    .itemContainer2 {
      width: 100%;
      margin: 2% 0;
      background: #fff;
      border-bottom: 0.3vw solid #ececec;
      .cover {
        width: 30vw;
        height: 30vw;
        padding: 0 1.5% 0 3%;
        vertical-align: top;
      }
      .info {
        width: 55%;
        display: inline-block;
        line-height: 1.5;
        vertical-align: top;
        padding: 3% 0;
      }
      .right {
        width: 3%;
        height: 100%;
        display: inline-block;
      }
      .shop {
        display: block;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        font-size: 4.3vw;
        padding: 2% 0;
      }
    }
  }
  .content1{
    display: block;
  }
  .spinner-center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .dark {
    color: #333;
    font-size: 4.5vw;
  }
</style>
<style>
  .mint-tab-container-item{
    background: #f2f2f2;
  }
</style>
