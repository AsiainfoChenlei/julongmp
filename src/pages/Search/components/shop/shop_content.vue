<template lang="html">
  <div class="content">
    <mt-navbar v-model="select">
     <!-- <mt-tab-item id="1"><span style="font-size: 4vw;">店铺首页</span></mt-tab-item>-->
      <mt-tab-item v-for="(k,i) in shopcontent" v-show="shopshow" :id="i" :class="{'is-selected':i == select}" :key="k.id"><span style="font-size: 4vw;">{{k.title}}</span></mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="select">
     <!-- <mt-tab-container-item id="1">
        <v-tab1 v-if="shopinfo" :shopinfo="shopinfo"></v-tab1>
      </mt-tab-container-item>-->
      <mt-tab-container-item v-for="(k,i) in shopcontent" :id="i" :key="i">
         <v-tab2 :shopid="shopid" :shop_name="shop_name" :query="query" :id="i" :select="select" :listid="k.id"></v-tab2>
      </mt-tab-container-item>
    </mt-tab-container>
    <a @click="gohome" ><div class="content-footer">进入商城</div></a>
  </div>
</template>
<script>
import Tab1 from './tab1.vue'
import Tab2 from './tab2.vue'
// import detail from '@/http/mock.js' //模拟数据
export default {
  props: ['shopinfo', 'query'],
  components: {
    'v-tab1': Tab1,
    'v-tab2': Tab2
  },
  data: function () {
    return {
      select: '0',
        shop_content:[],
        shop_new:[],
        shopid:this.shopinfo.id,
        shop_name:this.shopinfo.shop_name,
        shopcontent: [],
        shopshow:true
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
  methods: {
    gohome () {
      location.assign('index.html#/home')
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

  self.$nextTick(function () {
        self.$store.dispatch('getCates',{
          'shop_id': self.query.shop_id
        }).then(function (res) {
          let result = res.data;
          if (+result.code === 1) {
            self.shopcontent = result.msg;
            if(self.shopcontent.length==1){
              self.shopshow=false;
            }
          }
        })
      })
      self.select = 0;
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
