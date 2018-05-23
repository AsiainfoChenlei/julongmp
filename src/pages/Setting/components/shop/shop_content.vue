<template lang="html">
  <div class="content">
    <mt-navbar v-model="select">
     <!-- <mt-tab-item id="1"><span style="font-size: 4vw;">店铺首页</span></mt-tab-item>-->
      <mt-tab-item id="2"><span style="font-size: 4vw;">全部宝贝</span></mt-tab-item>
      <mt-tab-item id="3"><span style="font-size: 4vw;">最新上架</span></mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="select">
     <!-- <mt-tab-container-item id="1">
        <v-tab1 v-if="shopinfo" :shopinfo="shopinfo"></v-tab1>
      </mt-tab-container-item>-->
      <mt-tab-container-item id="2">
         <v-tab2 :shopid="shopid" :query="query" :id="2" :select="select"></v-tab2>
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
         <v-tab2 :shopid="shopid" :shop_name="shop_name" :query="query" :id="3" :select="select"></v-tab2>
      </mt-tab-container-item>
    </mt-tab-container>
    <a @click="gohome" ><div class="content-footer">进入商城</div></a>
  </div>
</template>
<script>
import Tab1 from './tab1.vue'
import Tab2 from './tab2.vue'
//  import detail from '@/http/mock.js' //模拟数据
export default {
  props: ['shopinfo', 'query'],
  components: {
    'v-tab1': Tab1,
    'v-tab2': Tab2
  },

  data: function () {
    return {
      select: '2',
      shop_content: [],
      shop_new: [],
      shopid: this.shopinfo.id,
      shop_name: this.shopinfo.shop_name
    }
  },
  methods: {
    gohome () {
      location.assign('index.html#/home')
    }
  },
  watch: {
    select (value) {
      let self = this
      self.$router.replace({name: '商家首页',
        query: {
          shop_id: self.query.shop_id,
          company_id: self.query.company_id,
          select: value
        }})
    }
  },
  mounted () {
    let self = this
    if (self.$route.query.select === undefined) {
      self.$router.replace({name: '商家首页',
        query: {
          shop_id: self.query.shop_id,
          company_id: self.query.company_id,
          select: '2'
        }})
    } else {
      self.select = self.$route.query.select
    }
  }
  /*  beforeCreate(){
      this.$api({
        method: 'post',
        url:'/shop'
      }).then((response) => {
        const self = this;
        self.shop_content = response.data.shop_content;
        console.log(self.shop_content);
        self.shop_new = response.data.shop_new;
        console.log(self.shop_new);
      }).catch(function(error) {
        alert(error);
      })
    } */
}
</script>
<style lang="less" scoped>
  .content{
    padding-bottom: 12vw;
    .is-selected{
      margin-bottom: 0;
      border-bottom: 0.7vw solid #981309;
      color: #981309;
    }
    .mint-tab-item{
      padding: 4.7vw 0;
    }
    .content-footer{
      height: 12vw;
      font-size: 4.5vw;
      line-height: 12vw;
      background: #fff;
      color: #981309;
      text-align: center;
      position: fixed;
      width: 100%;
      bottom: 0;
    }
  }

</style>
