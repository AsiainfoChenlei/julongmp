<template lang="html">
  <div class="wrap">
    <v-header class="header">
      <div class="header-d" slot="title">商品分类</div>
    </v-header>
    <section class="view">
      <v-aside v-if="allData" :datas="allData"></v-aside>
      <router-view v-if="allData" :datas="allData"></router-view>
      <!-- <v-footer></v-footer> -->
    </section>
  </div>
</template>

<script>
import Header from '@/components/common/_header.vue'
import Aside from '../components/category/aside2.vue'
import Footer from '@/components/common/_footer.vue'
// import Footer from '@/components/category/Cfooter.vue'
// import category from '@/http/mock.js' //模拟数据
export default {
  name: 'category',
  components: {
    'v-header': Header,
    'v-aside': Aside,
    'v-footer': Footer
  },
  data () {
    return {
      allData: null
    }
  },
  methods: {
    scrollEvent () {
      this.$route.meta.position = {x: 0, y: document.documentElement.scrollTop || document.body.scrollTop}
      console.log('this.$route.meta.position', this.$route.meta.position)
    }
  },
  created () {
    /* this.$api({
        method:'post',
        url:'/category'
      }).then((res)=>{
        this.allData = res.data;
      }).catch((error)=>{
        console.log(error);
      }) */
    let a = []
    a.id = 0
    a.type = 1
    const self = this
    /*  let category=JSON.parse(self.$localStorage.get('CATEGORY'));
      if(category[0]){
        self.allData=category;
        return;
      } */
    self.$api({
      method: 'get',
      url: 'http://47.100.2.173:8002/admin/category/getChildrenCategories?id=0&type=1'
      // data:a//{'id':'0',type:'1'}
    }).then((res) => {
      let result = res.data
      if (result.code) {
        self.allData = result.msg
        // self.$localStorage.set('CATEGORY',JSON.stringify(result.msg))
        console.log(self.allData)
      }
    }).catch((error) => {
      console.log(error)
    })
    document.addEventListener('scroll', this.scrollEvent)
  },
  beforeDestroy () {
    document.removeEventListener('scroll', this.scrollEvent)
  }
}
</script>

<style lang="less" scoped>
  .wrap {
    width: 100%;
    height: 100%;
    /*display: -webkit-box;*/
    /*display: -ms-flexbox;*/
    /*display: flex;*/
    /*-webkit-box-orient: vertical;*/
    /*-webkit-box-direction: normal;*/
    /*-ms-flex-flow: column nowrap;*/
    flex-flow: column nowrap;
    .header {
      .header-d {
        width: 100%;
        font-size: 4.5vw;
      }
    }
    .view {
      padding-top: 12%;
      width: 100%;
      height: 100%;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      padding-bottom: 12vw;
    }
  }
</style>
