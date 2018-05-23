<template>
  <div :id="inputId"
       class="tab">
    <div style="display:none"
         v-for="(item,index) in list"
         :key="item.id">
      <img class="tab2-li-img"
           :id="index"
           :src="$helper.getRealPicURL(item.cover,query.company_id,query.shop_id) | preloadImage(item,that)" />
    </div>
    <ul class="tab2-ul"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="isall"
        infinite-scroll-distance="10"
        id="vcontent">
      <div id="leftColumn"
           class="left">
        <li v-if="list.length > 0"
            v-for="(item,index) in leftList"
            :key="item.id"
            :flag="item.is_sale"
            :class="'tab2-li tab2-li'+item.is_sale"
            @click="detail(query.company_id, query.shop_id, shop_name, item.id, encodeURIComponent(item.serial))">
          <!-- <router-link :to="{name:'详情页',query:{'shop_name':shop_name,goods_id:item.id,serial:encodeURIComponent(item.serial),company_id:query.company_id,shop_id:query.shop_id,codeid:$localStorage.get('CODEID'),is_sale:item.is_sale}}"> -->
          <img class="tab2-li-img"
               :id="index"
               :src="$helper.getRealPicURL(item.cover,query.company_id,query.shop_id)" />
          <div class="tab2-li-span">
            <span class="li-span-name">{{item.name}}</span>
            <span class="li-span-price">
              ￥
              <span class="big-price">{{item.min_price}}</span>
              <span v-if="parseInt(item.max_price) > parseInt(item.min_price)"
                    class="big-price">~{{item.max_price}}</span>
            </span>
            <!-- <span class="li-span-price">￥<span v-if="item.property.length > 0" class="big-price">{{item.property[0].price}}</span></span>-->
            <!--<span class="li-span-pay">{{item.people}}<span>万人付款</span></span>-->
            <i class="li-span-i"></i>
          </div>
          <div class="discount"></div>
          <!-- </router-link> -->
        </li>
      </div>
      <div id="rightColumn"
           class="right">
        <li v-if="list.length > 0"
            v-for="(item,index) in rightList"
            :key="item.id"
            :class="'tab2-li tab2-li'+item.is_sale"
            @click="detail(query.company_id, query.shop_id, shop_name, item.id, encodeURIComponent(item.serial))">
          <!-- <router-link :to="{name:'详情页',query:{'shop_name':shop_name,goods_id:item.id,serial:encodeURIComponent(item.serial),company_id:query.company_id,shop_id:query.shop_id,codeid:$localStorage.get('CODEID'),is_sale:item.is_sale}}"> -->
          <img class="tab2-li-img"
               :id="index"
               :src="$helper.getRealPicURL(item.cover,query.company_id,query.shop_id)" />
          <div class="tab2-li-span">
            <span class="li-span-name">{{item.name}}</span>
            <span class="li-span-price">
              ￥
              <span class="big-price">{{item.min_price}}</span>
              <span v-if="parseInt(item.max_price) > parseInt(item.min_price)"
                    class="big-price">~{{item.max_price}}</span>
            </span>
            <!--  <span class="li-span-price" v-if="item.max_price=null || item.max_price===item.min_price" >￥<span  class="big-price">{{item.min_price}}</span></span>
               <span class="li-span-price" v-else >￥<span  class="big-price">{{item.min_price}}</span>
                  <span  class="big-price">—{{item.max_price}}</span> </span>
                 <span class="li-span-price">￥<span v-if="item.property.length > 0" class="big-price">{{item.property[0].price}}</span></span>-->
            <!--<span class="li-span-pay">{{item.people}}<span>万人付款</span></span>-->
            <i class="li-span-i"></i>
          </div>
          <div class="discount"></div>
          <!-- </router-link> -->
        </li>
      </div>
    </ul>
    <div class="spinner-center"
         v-show="!spinnerloading">
      <mt-spinner type="fading-circle"></mt-spinner>
    </div>
    <div v-show="isall"
         class="tab2-ul-footer">已经是全部啦~~~</div>
  </div>
</template>

<script>
import {
  Spinner, Toast
} from 'mint-ui'
import Vue from 'vue'
import { mapState, mapGetters, mapActions } from 'vuex'
import Image from '../../../../../util/preloadimage'
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
  computed: {
    ...mapState({
      visitedViews: state => state.tagsView.visitedViews
    }),
    ...mapGetters({
      searchListData: 'searchListData'
    })
  },
  components: {
    'v-spinner': Spinner
  },
  props: ['shopid', 'id', 'select', 'query', 'shop_name', 'listid', 'route'],
  data () {
    return {
      isall: false,
      spinnerloading: false,
      imgPath: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511425212198&di=1d1760ece9c54f71e9bd5be50c6b2c49&imgtype=0&src=http%3A%2F%2Fimg.fuwo.com%2Fattachment%2F1608%2F03%2Fa5cb936658db11e6a40d00163e00254c.jpg',
      list: [],
      now_page: 1,
      page_size: 10,
      total: 0,
      inputId: '',
      wrapperHeight: 0,
      that: this,
      leftColumnHeight: 0,
      rightColumnHeight: 0,
      leftList: [],
      rightList: [],
      isloading: false
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
              that.leftColumnHeight += img.height / 2
              Vue.set(that, 'leftList', that.leftList)
              Vue.set(that, 'leftColumnHeight', that.leftColumnHeight)
            }
          } else {
            if (!checkDup(that.rightList, item) && !checkDup(that.leftList, item)) {
              that.rightList.push(item)
              that.rightColumnHeight += img.height / 2
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
  watch: {
    select (value) {
      let self = this
      if (+value === +self.id && self.list.length < 1) {
        self.loadMore()
      }
    }
    // route (value) {
    //   console.log('++++++++++++++++++++++++++++++', value.to, value.from)
    //   if (value) {
    //     if (value.to.path === '/shop' && value.from.path === '/detail' && this.searchListData.length > 0) {
    //       Object.assign(this.$data, this.searchListData)
    //       console.log('>>>>>>>>>>>>>>>backdata')
    //     }
    //   }
    // }
  },
  methods: {
    ...mapActions([
      'reloadSearchListData'
    ]),
    detail (companyId, shopId, shopName, goodsId, serial) {
      const self = this
      console.log('self.view')
      console.log(self.view)
      // console.log(self.query)
      this.$localStorage.set('TREADTAGVISITEDVIES', JSON.stringify(this.visitedViews))
      this.reloadSearchListData(this.$data)
      self.$router.push({
        name: '详情页',
        query: {
          company_id: companyId,
          shop_id: shopId,
          shop_name: shopName,
          goods_id: goodsId,
          serial: encodeURIComponent(serial),
          codeid: self.$localStorage.get('CODEID')
        }
      })
    },
    loadMore () {
      const self = this
      if (+self.id !== +self.select) {
        return false
      }
      if (self.isall) {
        return false
      }
      if (self.isloading) {
        console.log('>>>>>>>>>mabideloadmore need return')
        return false
      }
      console.log('>>>>>>>>>mabideloadmore')
      Vue.set(self, 'spinnerloading', false)
      setTimeout(() => {
        self.setActive()
      }, 3000)
    },
    setActive () {
      const self = this
      if (!self.isall && !self.isloading) {
        Vue.set(self, 'isloading', true)
        self.$store.dispatch('goodsList_shop', {
          shop_id: self.query.shop_id,
          cate_id: self.listid,
          class_id: -1,
          page_size: self.page_size,
          now_page: self.now_page
        }).then(function (res) {
          Vue.set(self, 'spinnerloading', true)
          Vue.set(self, 'isloading', false)
          let result = res.data
          if (+result.code === 1) {
            if (self.now_page === 1) {
              self.list = []
              self.leftList = []
              self.rightList = []
              self.leftColumnHeight = 0
              self.rightColumnHeight = 0
            }
            for (let i in result.msg.rows) {
              if (!checkDup(self.list, result.msg.rows[i])) {
                self.list.push(result.msg.rows[i])
              }
            }
            Vue.set(self, 'list', self.list)
            if (+result.msg.pagination.total_count <= self.list.length || result.msg.rows.length < 1) {
              Vue.set(self, 'isall', true)
            } else {
              if (self.list.length === self.now_page * self.page_size) {
                self.now_page++
              }
            }
          } else {
            console.log(result.error)
          }
        }).catch(e => {
          console.log(e)
          Vue.set(self, 'isloading', false)
        })
      }
    },
    addCart (businessId, businessName, goodId, num, index) {
      console.log('addCart')
      const self = this
      self.$store.dispatch('addCart', {
        business_id: businessId,
        business_name: businessName,
        goods_list: JSON.stringify([{
          'good_id': goodId,
          'num': num,
          'index': index
        }])
      }).then(function (res) { // 广告
        console.log(res)
        let result = res.data
        if (result.code) {
          Toast('登录成功')
        } else {
          Toast(result.error)
        }
      })
    }
  },
  mounted () {
    if (this.searchListData.imgPath) {
      this.isloading = true
      this.spinnerloading = true
      Object.assign(this.$data, this.searchListData)
      this.$nextTick(() => {
        setTimeout(() => {
          document.documentElement.scrollTop = this.$route.meta.position.y
          document.body.scrollTop = document.body.scrollTop
        }, 0)
      })
    }
  }
}
</script>

<style lang="less" scoped>
/*.spinner-center {*/
/*left: 50% !important;*/
/*flex: 1;*/
/*}*/
.spinner-center {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  background: #000;
  opacity: 0.8;
  bottom: 0;
  right: 0;
  top: 0;
  left: 0;
  z-index: 1000;
}
.tab2-li {
  width: 94%;
  margin-left: 3%;
  margin-top: 8%;
  border-radius: 6px;
  position: relative;
  .tab2-li-img {
    width: 100%;
    height: 70%;
    border-radius: 6px 6px 3px 3px;
  }
  .tab2-li-span {
    padding: 0 1.4vw 1vw;
    position: relative;
    .li-span-name {
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding: 3vw 0 2vw;
      font-size: 4.2vw;
    }
    .li-span-price {
      color: red;
      font-size: 3vw;
      .big-price {
        font-size: 3.2vw;
      }
    }
    .li-span-pay {
      font-size: 3vw;
      padding-left: 1.4vw;
      display: inline-block;
      width: 47%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      vertical-align: middle;
    }
    .li-span-i {
      padding: 3.4vw 4.8vw;
      background: url('../../../../images/cart.png');
      background-size: 100% 100%;
      margin-left: 48%;
      position: absolute;
      height: 2.4vw;
      bottom: 0;
      right: 0;
    }
  }
  .discount {
    position: absolute;
    top: 2vw;
    right: 1vw;
    width: 13vw;
    height: 13vw;
    background: url('../../../../../static/images/tj.png') no-repeat;
    background-size: 100% 100%;
  }
}
.tab2-li0 {
  .discount {
    display: none;
  }
}
.content {
  .tab2-ul {
    width: 100vw;
    background: #f7f4f4;
    display: flex;
    .left {
      width: 50vw;
    }
    .right {
      width: 50vw;
    }
  }
  .tab2-ul-footer {
    text-align: center;
    height: 14.7vw;
    line-height: 14.7vw;
    font-size: 4.2vw;
  }
}
</style>
<style type="text/css">
.mint-spinner-fading-circle-circle:before {
  margin: 0vw 7vw !important;
  width: 20% !important;
  height: 20% !important;
  background-color: #26a2ff !important;
}
</style>
