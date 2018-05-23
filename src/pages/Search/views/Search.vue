<template lang="html">
  <div class="main">
    <!--<header class="search-header">-->
    <!--<input class="sear-input" type="text" placeholder="毛呢大衣"/>-->
    <!--<i class="icon-search sear-isea"></i>-->
    <!--</header>-->
    <v-header>
      <div class="s-header" slot="title">
        <input class="sear-input" type="text" :placeholder="placeholder" v-model="keyword" />
        <i @click="startSearch" class="icon-search sear-isea"></i>
      </div>
    </v-header>
    <section style="padding-top: 15vw" >
      <mt-navbar v-model="selected">
        <!-- <mt-tab-item id="1"><span style="font-size: 4vw;">全部</span></mt-tab-item> -->
        <mt-tab-item id="goods"><span style="font-size: 4vw;">商品</span></mt-tab-item>
        <mt-tab-item id="shop"><span style="font-size: 4vw;">商铺</span></mt-tab-item>
      </mt-navbar>
    </section>
    <!-- tab-container -->
    <mt-tab-container v-model="selected">
      <!-- <mt-tab-container-item id="1">
                   <div class="widget d_tag">
                           <div class="title">
                               <h2>
                                   <span class="title_span">历史记录</span>
                               </h2>
                           </div>
                           <div class="d_tags" v-for="item in datas">
                               <a title="" href="/tag/Javascript" data-original-title="item.search_name">{{item.search_name}}</a>
                           </div>
                       </div>
                </mt-tab-container-item> -->
      <mt-tab-container-item id="goods">
        <v-content  identifier="goods" :currrent="selected" ref="goods" url="searchGoodsByKeyword" level="1"></v-content>
      </mt-tab-container-item>
      <mt-tab-container-item id="shop">
        <v-content  identifier="shop" :currrent="selected" ref="shop" url="searchShopByKeyword"></v-content>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
import Header from '../../../components/common/_header.vue'
import Content from '../components/search/searchContent.vue'
export default {
  name: 'Search',
  components: {
    'v-header': Header,
    'v-content': Content
  },
  data () {
    return {
      datas: [],
      selected: this.$localStorage.get('CHOOSETYPE') ? this.$localStorage.get('CHOOSETYPE') : 'goods',
      keyword: this.$localStorage.get('KEYWORD') ? this.$localStorage.get('KEYWORD') : '',
      placeholder: '商品/商铺',
      choosetype: this.$localStorage.get('CHOOSETYPE') ? this.$localStorage.get('CHOOSETYPE') : 'goods'
    }
  },

  methods: {
    removeLocalStorage () {
      const self = this
      self.$localStorage.remove('KEYWORD') // 设置缓存
      self.$localStorage.remove('CHOOSETYPE') // 设置缓存
    },
    setLocalStorage () {
      const self = this
      self.$localStorage.set('KEYWORD', self.keyword) // 设置缓存
    },
    startSearch () {
      let self = this
      if (self.keyword.length < 1) {
        self.removeLocalStorage()
        self.keyword = ''
        this.$router.replace({path: '/search'})
      } else {
        self.setLocalStorage()
      }
      self.$refs['goods'].refreshData(self.keyword)
      self.$refs['shop'].refreshData(self.keyword)
    },
    scrollEvent () {
      this.$route.meta.position = {x: 0, y: document.documentElement.scrollTop || document.body.scrollTop}
      console.log(this.$route.meta.position)
    }
  },
  watch: {
    selected (value) {
      console.log(value)
      this.$localStorage.set('CHOOSETYPE', value) // 设置缓存
    }

  },
  mounted () {
    let self = this
    if (self.keyword.length < 1) {

    } else {
      this.$router.replace({path: '/search', query: {selected: self.choosetype}})
      self.$refs['goods'].refreshData(self.keyword)
      self.$refs['shop'].refreshData(self.keyword)
    }
  },
  created () {
    document.addEventListener('scroll', this.scrollEvent)
  },
  beforeDestroy () {
    document.removeEventListener('scroll', this.scrollEvent)
  }
}

</script>

<style lang="less" scoped>
  @import '../../../assets/index/style.css';
  a {
    color: #666;
    text-decoration: none;
  }
  .mint-navbar .mint-tab-item{
    padding: 4.3vw 0;
  }
  .main {
    font-size: 20px;
    header {
      height: 16vw;
      background: #f74b27;
      .s-header {
        width: 100%;
        .sear-input {
          width: 80%;
          height: 10vw;
          font-size: 4.7vw;
          text-indent: 8vw;
          border-radius: 24px;
        }
        .sear-isea {
          position: absolute;
          line-height: 10.2vw;
          font-size: 6vw;
          right: 17vw;
        }
        .icon-search:before {
          color: #f74b27;
        }
      }
    }
    .is-selected{
      margin-bottom: 0;
      border-bottom: 0.7vw solid salmon;
      color: salmon;
    }
  }
  .widget {
    clear: both;
    margin-bottom: 10px;
    background-color: #fff;
    border: 1px solid #eaeaea;
    border-radius: 4px;
    -moz-border-radius: 4px;
    -webkit-border-radius: 4px;
  }
  .title {
    position: relative;
    height: 10.7vw;
    padding: 0px 15px 0px 15px;
    border-bottom: 1px solid #eaeaea;
    background: #fbfbfb;
  }
  .title h2 {
    font-weight: inherit !important;
    font-size: 17px;
    margin: 0px;
  }
  .title_span {
    line-height: 10.7vw;
    color: #666;
    font-family: inherit;
    font-style: inherit;
    font-weight: inherit;
    font-size: 5.3vw;
  }
  .d_tags {
    display: inline-block;
    margin: 2%;
  }
  .d_tags a {
    background-color: #f6f6f6;
    color: #999;
    float: left;
    font-size: 12px;
    height: 29px;
    line-height: 29px;
    margin: 1%;
    overflow: hidden;
    padding-left: 2%;
  }
</style>
