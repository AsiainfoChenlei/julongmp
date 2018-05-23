<template>
  <div class="tab1-content">
    <ul style="background: inherit;"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="spinnerloading"
        infinite-scroll-distance="10">
      <li class="tab1-li"
          v-for="(store,index)  in datas"
          :key="index">
        <!-- <img class="tab1-img" :src="store.business_pic" />-->
        <a @click="goShop(store.company_id, store.business_id, '2')">
          <!--<img class="tab1-img" :src="$helper.getRealPicURL(store.business_pic,store.company_id,store.business_id)" />-->
          <img class="tab1-img"
               :src="$helper.getRealPicURL(store.business_pic,1,1,'w100_h100')" />
        </a>
        <div class="tab1-li-span">
          <span class="li-span-tab">{{store.business_name}}</span>
        </div>
        <i class="ico"
           @click="CoSellerDelete(index,store.business_id)"></i>
      </li>
    </ul>
    <div class="spinner-center">
      <mt-spinner v-show="isloading"
                  type="triple-bounce"
                  :size="50"></mt-spinner>
    </div>
    <v-baseline v-show="spinnerloading"></v-baseline>
  </div>
</template>

<script>
import Baseline from '@/components/common/_baseline.vue'
import { Spinner, MessageBox } from 'mint-ui'
export default {
  components: {
    'v-spinner': Spinner,
    'v-baseline': Baseline
  },
  //  props:['shopid'],
  data () {
    return {
      spinnerloading: false,
      isloading: false,
      imgPath: 'https://img.alicdn.com/imgextra//61/32/TB1PNlSJXXXXXXDaXXXwu0bFXXX.png_120x120Q50s50.jpg_.webp',
      allowUpdate: true,
      datas: [],
      now_page: 1,
      page_size: 10
    }
  },
  methods: {
    goShop (companyId, shopId, select) {
      location.assign('shop.html#/shop?company_id=' + companyId + '&shop_id=' + shopId + '&select=' + select)
    },
    loadMore () {
      console.log('loadMore')
      const self = this
      setTimeout(() => {
        self.setActive()
      }, 500)
    },
    setActive () {
      const self = this
      if (!self.spinnerloading && !self.isloading) {
        self.isloading = true
        self.$store.dispatch('CoSellerindex', { page_size: self.page_size, now_page: self.now_page }).then(function (res) {
          let result = res.data
          self.isloading = false
          if (result.code) {
            if (self.now_page === 1) {
              console.log(result.msg.rows)
              self.datas = result.msg.rows
            } else {
              result.msg.rows.forEach(v => {
                self.datas.push(v)
              })
            }
            if (self.now_page >= result.msg.pagination.total_page) { // 加载完毕
              self.spinnerloading = true
              console.log('self.allowUpdate = false')
            } else {
              self.now_page = self.now_page + 1
            }
          } else {
            console.log(result.error)
          }
        })
      }
    },

    CoSellerDelete (index, v) {
      MessageBox.confirm('你确定要取消收藏吗?').then(action => {
        console.log(index, v)
        const self = this
        /// alert(v);
        self.$store.dispatch('CoSellerDelete', { 'business_id': v }).then(function (res) { // 商家
          let result = res.data
          if (result.code) {
            // self.setActive();
            self.datas.splice(index, 1)
            // console.log('result.msg');
            // console.log(result.msg);
            //  self.goods=result.msg.rows;
            // self.datas=result.msg;
            // self.property=JSON.parse(result.msg.property);
          } else {
            console.log(result.error)
          }
        })
      })
    }
    /*  param() {
                    const self=this;
                    console.log('self.$route.query.shop_id');
                    console.log(self.$route.query.shop_id);
                    if(self.$route.query.shop_id){
                    self.query.shop_id=self.$route.query.shop_id;
                    }
                } */
  },
  mounted () {
    const self = this
    //  self.param();
    // this.$store.dispatch('setDatas');
    self.loadMore()
  }
}
</script>
<style lang="less" scoped>
.tab1-content {
  .ico {
    padding: 1vw 3vw;
    background: url('../../../../images/delete1.png') no-repeat;
    background-size: 100% 100%;
  }
  .tab1-li {
    height: 22.6vw;
    background: #fff;
    line-height: 22.6vw;
    margin-top: 3%;
    position: relative;
    .tab1-img {
      width: 17vw;
      height: 17vw;
      background: #26a2ff;
      margin-left: 3%;
    }
    .tab1-li-span {
      display: inline-block;
      width: 66%;
      height: 20vw;
      line-height: 20vw;
      vertical-align: middle;
      .li-span-tab1 {
        display: block;
        line-height: 1;
        margin-top: 6.3%;
        font-size: 4vw;
        margin-left: 2%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .li-span-tab {
        display: block;
        margin-left: 3%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-right: 15%;
        font-size: 4.3vw;
      }
    }
  }
}
</style>
