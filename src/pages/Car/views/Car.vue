<template lang="html">

  <div class="car">
    <!-- slot分发内容 让子组件混合父组件的内容 -->
    <v-header>
      <h1 slot="title">购物车</h1>
    </v-header>
    <!--&lt;!&ndash; 根据购物车是否有商品加载不同的组件 &ndash;&gt;-->
    <v-warn v-if="count"></v-warn>
    <v-something v-if="count"></v-something>
    <v-nothing v-else></v-nothing>
    <v-footer v-if="count"></v-footer>
  </div>
</template>

<script>
import Header from '@/components/common/_header.vue'
import Nothing from '../components/carview/nothing.vue'
import Warn from '../components/carview/warn.vue'
import Something from '../components/carview/something.vue'
import Footer from '../components/carview/footer.vue'

export default {
  components: {
    'v-header': Header,
    'v-nothing': Nothing,
    'v-something': Something,
    'v-footer': Footer,
    'v-warn': Warn
  },
  data () {
    return {
      count: 0
    }
  },
  methods: {
    setActive () {
      const self = this
      self.$store.dispatch('cartCount').then(function (res) {     /* 广告 */
        let result = res.data
        if (result.code) {
          // console.log('result.msg.rows');
          // console.log(result);
          self.count = result.msg
          // self.count=0;
        } else {
          console.log(result.error)
        }
      })
    }
  },
  mounted () {
    const self = this
    self.setActive()
  }
  // /*  computed:{
  //      count(){
  //        return this.$store.state.detail.count
  //      }
  //    },
  //    mounted(){
  //       // 防止刷新页面数据为空
  //       if (this.$store.state.detail.count=="") {
  //
  //         this.$store.commit('RESET_COUNT');
  //
  //       }
  //     }*/

}
</script>

<style lang="less" scoped>
  .car {
    width: 100%;
    padding-bottom: 14vw;
  }
</style>
