<template lang="html">
  <div class="manageshop">
    <v-header>
      <div class="header" slot="title">店铺管理</div>
    </v-header>
    <ul class="ms-ul">

      <li class="ms-li" v-for="item in list" :key="item.id">
        <img class="ms-img" :src="$helper.getRealPicURL(item.face,1,1,'w100_h100')"/>
        <div class="ms-span">
          <b class="mspan span-1">{{item.shop_name}}</b>

          <span class="num" v-if="item.status==1">店铺编号:<span style="color:#15FA3E"> {{item.id}}</span></span>
          <span class="mspan span-2">{{item.area}}</span>
          <span class="mspan" v-if="item.status==3" @click="ReApplyShop(item.id)" style="color: #15FA3E;">【重新申请】</span>
        </div>
        <div class="ms-icon icon3" v-if="item.status==0"></div>
        <div class="ms-icon icon1" v-if="item.status==1"></div>
        <div class="ms-icon icon2" v-if="item.status==2"></div>
      </li>
    </ul>
    <router-link class="my-service-top" :to="{name:'申请开店'}">
      <div class="ms-button" >增加店铺</div>
    </router-link>
  </div>
</template>
<script>
import Header from '../../../components/common/_header.vue'
export default {
  components: {
    'v-header': Header
  },
  data () {
    return {
      list: []
    }
  },
  methods: {
    ReApplyShop (v) {
      const self = this
      self.$router.push({name: '添加店铺',
        query: {
          shop_id: v
        }})
    },
    // 获取商家列表
    getOwnShops () {
      const self = this
      self.$store.dispatch('getOwnShops').then(function (res) {
        self.list = res.data.msg
      })
    }
  },

  mounted () {
    const self = this
    self.getOwnShops()
  }
}
</script>
<style lang="less" scoped>
  .manageshop{
    .header{
      width: 100%;
      font-size: 4.5vw;
    }
    .ms-ul{
      padding-top: 12vw;
      .ms-li{
        padding: 5% 0;
        display: flex;
        align-items: center;
        border-bottom: 0.03vw solid #ececec;
        .ms-img{
          width: 18vw;
          height: 18vw;
          background: #26a2ff;
          margin: 0 3% 0 5%;
        }
        .ms-span{
          width: 54%;
          .mspan{
            display: block;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            line-height: 1.6;
          }
          .num{
            font-size:3.5vw;
          }
          .span-1{
            font-size: 4.0vw;
          }
          .span-2{
            font-size: 3.5vw;
          }
        }
        .ms-icon{
          height: 13vw;
          width: 18vw;
          margin-top: -9%;
        }
        .icon1{
          background: url("/static/images/shtg.png");
          background-size: 100% 100%;
        }
        .icon2{
          background: url("/static/images/wtg.png");
          background-size: 100% 100%;
        }
        .icon3{
          background: url("/static/images/dsh.png");
          background-size: 100% 100%;
        }
      }
    }
    .ms-button{
      width: 70%;
      height: 12vw;
      line-height: 12vw;
      font-size: 4.7vw;
      color: white;
      background-color: #48DA9B;
      margin: 7% auto 3%;
      text-align: center;
      border-radius: 6vw;
    }
  }
</style>
