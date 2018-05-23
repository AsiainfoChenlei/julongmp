<template lang="html">
  <div class="collection">
    <v-header class="collection-header">
      <div class="header-h1" slot="title">收藏夹</div>
      <!--   <i slot="right" class="icon-search">管理</i> -->
    </v-header>
    <v-gologin v-show="!logined"></v-gologin>
    <div style="padding-top: 12%;" v-show="logined">
      <mt-navbar v-model="selected" class="tab1">
        <mt-tab-item id="1">
          <span style="font-size: 4.6vw;">店</span>
        </mt-tab-item>
        <mt-tab-item id="2">
          <span style="font-size: 4.6vw;">商品</span>
        </mt-tab-item>
      </mt-navbar>

      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="1">
          <v-store></v-store>
        </mt-tab-container-item>

        <mt-tab-container-item id="2">
          <v-goods></v-goods>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
   <!-- <v-footer></v-footer> -->
  </div>
</template>

<script>
import Header from '@/components/common/_header.vue'
// import Footer from '@/components/common/_footer.vue'
import Gologin from '../components/collection/gologin.vue'
import StoreTab from '../components/collection/store.vue'
import GoodsTab from '../components/collection/goods.vue'
import MtTabContainerItem from '../../../../node_modules/mint-ui/packages/tab-container-item/src/tab-container-item.vue'
export default {
  components: {
    MtTabContainerItem,
    'v-header': Header,
    'v-store': StoreTab,
    'v-goods': GoodsTab,
    'v-gologin': Gologin
    // 'v-footer': Footer
  },

  data () {
    return {
      store_page: 1,
      good_page: 1,
      loadingCircle: false,
      stores: [],
      goods: [],
      rows: [],
      selected: '1',
      logined: false
    }
  },
  methods: {

      /*setActive_store(){
                const self=this;
                console.log(self.store_page);
                self.store_page=self.store_page+1;
                self.$store.dispatch('CoSellerindex',{'page_size':6,'now_page':self.store_page}).then(function (res) {  //店家
                      let result=res.data;
                        if(result){
                            if(self.page===1){
                            self.stores=result.msg.rows;
                            }else{
                                result.msg.rows.forEach(v=>{
                                    self.stores.push(v);
                                });
                            }
                        }else{
                          console.log(result.error);
                        }
                });
    },*/

    /*setActive_goods () {
      const self = this
      self.good_page = self.good_page + 1
      self.$store.dispatch('CoGoodsList', {'page_size': 6, 'now_page': self.good_page}).then(function (res) { // 商品
        let result = res.data
        if (result) {
          if (self.page === 1) {
            self.goods = result.msg.rows
          } else {
            result.msg.rows.forEach(v => {
              self.goods.push(v)
            })
          }
        } else {
          console.log(result.error)
        }
      })
    }*/

  },
  mounted () {
    const self = this
    //this.$store.dispatch('setDatas');
    //self.setActive_store();
    //self.setActive_goods();
    console.log('this.$localStorage.get')
    console.log(this.$localStorage.get('TOKEN'))
    if (self.$localStorage.get('TOKEN')) {
      self.logined = true
    }
  }
}

</script>

  <style lang="less" scoped>
    @import '../../../assets/user/icon/carstyle.css';
    .collection{
      background: #f9f9f9;
      min-height: 100%;
    .collection-header{
      .header-h1{
        margin-right: 38vw;
        font-size: 4.5vw;
      }
      i{
        font-size: 4vw;
      }
      i:before{
        color: #fff;
        margin-right: 1vw;
      }
    }
    .mint-navbar {
      .mint-tab-item{
        height: 5vw;
      }
      .is-selected{
        color: salmon;
        border-bottom: 0.5vw solid salmon;
        margin-bottom: 0vw;
      }
    }
      .tab1-content{
        .ico{
          padding: 1vw 3.0vw;
        //  background: url("../images/delete1.png") no-repeat;
          background-size: 100% 100%;
        }
        .tab1-li{
          height: 22.6vw;
          background: #fff;
          line-height: 22.6vw;
          margin-top: 3%;
          position: relative;
          .tab1-img{
            width: 17vw;
            height: 17vw;
            background: #26a2ff;
            margin-left: 3%;
          }
          .tab1-li-span{
            display: inline-block;
            width: 66%;
            height: 20vw;
            line-height: 20vw;
            vertical-align: middle;
            .li-span-tab1{
              display: block;
              line-height: 1;
              margin-top: 6.3%;
              font-size: 4vw;
              margin-left: 2%;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
          .li-span-tab{
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
    }
  </style>
