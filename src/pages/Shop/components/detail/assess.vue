<template lang="html">
  <div class="shopdetail3">
    <v-ass v-if='length' :datas="datas" :length="length"></v-ass>
    <router-link v-if='length' :to="{ name: '评论列表', query: {'goodsid':goodsid}}">
        <div class="vass">
          <span class="vass-span">查看更多评价</span>
        </div>
    </router-link>

    <div class="vass"  style="border: 0.3vw solid #333;"  v-if='!length' >
          <span class="vass-span" style="color:#333">暂无评价</span>
     </div>
  </div>
</template>
<script type="text/javascript">
import Assess from './Assess_content.vue'
export default {
  props: ['goodsid'],
  components: {
    'v-ass': Assess
  },
  data () {
    return {
      datas: [],
      selected: '1',
      f1: true,
      query: {},
      page_size: 2,
      now_page: 1,
      length: 0
    }
  },
  methods: {
    param () {
      const self = this
      if (self.$route.query.goodsid) {
        self.query.goodsid = self.$route.query.goodsid
      }
    },
    setActive () {
      const self = this
      let goodId = self.goodsid
      self.$store.dispatch('commentList', {'good_id':goodId,'page_size': self.page_size, 'now_page': self.now_page}).then(function (res) { // 商品
        let result = res.data
        if (result.code) {
          console.log('result.msg')
          console.log(result.msg)
          /*  if(self.page===1){
                             self.datas=result.msg.rows;
                            }else{
                                result.msg.rows.forEach(v=>{
                                    self.datas.push(v);
                                });
                            } */
          self.datas = result.msg.rows
          self.length = +result.msg.pagination.total_count
        } else {
          console.log(result.error)
        }
      })
    }
  },
  mounted () {
    const self = this
    self.param()
    self.setActive()
  }
}
</script>
<style lang="less" scoped>
  .shopdetail3{
    margin: 3% 0;
    padding: 1% 0 3%;
    background: #fff;
    .asscontent /deep/ div.ass-div{
      margin-bottom: 0;
      border-bottom: 0.3vw solid #E3E3E3;
      &:last-child{
        border-bottom: none;
      }
    }
    .asscontent /deep/ span.span3{
      color: #666;
    }
    .vass{
      height: 7vw;
      color: #F74B27;
      border: 0.3vw solid #F74B27;
      border-radius: 6vw;
      text-align: center;
      line-height: 8vw;
      width: 31%;
      margin: 2% auto 0;
      font-size: 3.7vw;
    }
  }
</style>
