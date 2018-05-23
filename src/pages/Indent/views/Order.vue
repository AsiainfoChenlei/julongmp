<template lang="html">
  <div class="main">
    <v-header>
      <h1 slot="title">我的订单</h1>
    </v-header>
    <mt-navbar v-model="selected" style="height: 10vw;padding-top: 12%;">
      <mt-tab-item id="1" style="padding: 0"><span style="font-size: 3.5vw;line-height: 10vw;">全部</span></mt-tab-item>
      <mt-tab-item id="2" style="padding: 0"><span style="font-size: 3.5vw;line-height: 10vw;">未支付</span></mt-tab-item>
      <mt-tab-item id="3" style="padding: 0"><span style="font-size: 3.5vw;line-height: 10vw;">待收货</span></mt-tab-item>
      <mt-tab-item id="4" style="padding: 0"><span style="font-size: 3.5vw;line-height: 10vw;">已取消</span></mt-tab-item>
      <mt-tab-item id="5" style="padding: 0"><span style="font-size: 3.5vw;line-height: 10vw;">已完成</span></mt-tab-item>
    </mt-navbar>
    <!-- tab-container -->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <v-all shopid="ALL" :id="1" :selected="selected"></v-all>
        <v-baseline></v-baseline>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <v-all shopid="UNPAY" :id="2" :selected="selected"></v-all>
        <v-baseline></v-baseline>
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
        <v-all shopid="UNFINISHED" :id="3" :selected="selected"></v-all>
        <v-baseline></v-baseline>
      </mt-tab-container-item>
      <mt-tab-container-item id="4">
        <v-all shopid="CANCELED" :id="4" :selected="selected"></v-all>
        <v-baseline></v-baseline>
      </mt-tab-container-item>
      <mt-tab-container-item id="5">
        <v-all shopid="FINISHED" :id="5" :selected="selected"></v-all>
        <v-baseline></v-baseline>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
import Header from '@/components/common/_header.vue'
import All from '../components/order/all.vue'
import Baseline from '@/components/_baseline.vue'
export default {
  components: {
    'v-header': Header,
    'v-all': All,
    'v-baseline': Baseline
  },
  data () {
    return {
      page: 1,
      page_size: 6,
      selected: '1'
    }
  },
  methods: {
    param () {
      const self = this
      console.log('self.$route.query.selected')
      console.log(self.$helper.getUrlKey('selected'))
      if (self.$helper.getUrlKey('selected')) {
        // self.query.shop_id=self.$route.query.shop_id;
        let query = {
          selected: self.$helper.getUrlKey('selected')
        }
        self.selected = query.selected.toString()
      }
    },
    setActive () {
      const self = this
      self.$store.dispatch('getOrderList', {
        'now_page': self.page,
        'page_size': self.page_size
      }).then(function (res) { // 广告
        let result = res.data
        if (result.code) {
          console.log('result.msg')
          console.log(result.msg)
          // self.datas = result.msg.rows;
          // self.property=JSON.parse(result.msg.property);
        } else {
          console.log(result.error)
        }
      })
    }
  },
  watch: {
    // selected(value){
    //       this.$router.replace({path: '/Order', query: {selected:value}})
    // }
  },
  mounted () {
    const self = this
    // alert(v);
    self.param()
    // this.$store.dispatch('setDatas');
    // self.setActive();
  }
}
// businessname：商家名称  logistics：物流详情 goodname：物品名称  goodpic：物品图片 goodnum：物品数量 goodmoney：物品金额 goodesc：物品简介 totalgoods:总价  numgoods 总数量
</script>

<style lang="less" scoped>
  .main {
    header {
      h1 {
        font-size: 4.2vw;
      }
    }
    .is-selected {
      color: #f74b27;
      border-bottom: 0.1vw solid #f74b27;
    }
  }
</style>
