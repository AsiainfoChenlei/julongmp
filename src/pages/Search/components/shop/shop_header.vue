<template lang="html">
  <div class="sheader"  :style="headerBackGround">
    <div class="mint-header-title">
      <span class="span-i"><i class="icon-go" @click="$router.go(-1)"></i></span>线下体验
      <a :href="location"><div class="title-span"><i style="" class="address" :style="addressImage"></i>{{shopinfo.area}}</div></a>
    </div>
    <div class="mint-content">
      <div class="mint-area1">
        <!--<img class="area1-img" v-lazy="$helper.getRealPicURL(shopinfo.face,this.query.company_id,this.query.shop_id)"/>-->
        <img class="area1-img" v-lazy="$helper.getRealPicURL(shopinfo.face,1,1,'w100_h100')"/>
        <div class="area1-span">
           <span class="span-area1">{{shopinfo.shop_name}}</span>
           <i class="xin" :style="xinImage"></i><i class="xin" :style="xinImage"></i><i class="xin" :style="xinImage"></i><i class="xin1" :style="xin1Image"></i>
        </div>
         <span v-show="!co" class="area1-span3" @click="CoSelleradd" >+ 收藏</span>
         <span v-show="co" class="area1-span4"  @click="CoSellerDelete">- 取消收藏</span>
      </div>
    <!--  <div class="mint-area2">
        <i class="icon-search"></i>
        <input class="area2-input" type="text" placeholder=""/>
      </div>-->
    </div>
  </div>
</template>
<script>
import { Toast } from 'mint-ui'
export default {
  props: ['shopinfo', 'query'],
  data () {
    return {
      co: false,
      epointx: '',
      epointy: '',
      headerBackGround: {background: 'url(' + require('static/images/bgpic.png') + ')', 'background-size': '100% 100%'},
      addressImage: {background: 'url(' + require('static/images/local.png') + ')', 'background-size': '100% 100%'},
      xinImage: {background: 'url(' + require('static/images/f_star.png') + ')', 'background-size': '100%  100%'},
      xin1Image: {background: 'url(' + require('static/images/h_star.png') + ')', 'background-size': '100%  100%'}
    }
  },
  computed: {
    location () {
      const self = this
      return 'http://apis.map.qq.com/tools/routeplan/eword=' + self.shopinfo.shop_name + '&epointx=' + self.epointx + '&epointy=' + self.epointy + '?referer=myapp&key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77'
    }
  },
  methods: {
    doCoSuccess (r) {
      const self = this
      if (r === '0') {
        self.co = false
      } else {
        self.co = true
      }
    },
    iSCoSeller () {
      const self = this
      self.$store.dispatch('iSCoSeller', {'business_id': self.shopinfo.id}).then(function (res) { // 商品
        let result = res.data
        if (result.code) {
          self.doCoSuccess(result.msg)
        } else {
          console.log(result.error)
        }
      })
    },
    CoSelleradd () {
      const self = this
      self.$store.dispatch('CoSelleradd', {'company_id': self.query.company_id, 'business_id': self.shopinfo.id, 'business_name': self.shopinfo.shop_name, 'business_pic': self.shopinfo.face, 'business_addr': self.shopinfo.area}).then(function (res) { // 商品
        let result = res.data
        if (result.code) {
          self.co = true
        } else {
          Toast(result.error[0])
        }
      })
    },
    CoSellerDelete () {
      const self = this
      self.$store.dispatch('CoSellerDelete', {'business_id': self.shopinfo.id}).then(function (res) { // 商品
        let result = res.data
        if (result.code) {
          self.co = false
        } else {
          Toast(result.error[0])
        }
      })
    }
  },
  mounted () {
    const self = this
    self.$nextTick(function () {
      if (self.shopinfo.id) {
        let coArr = self.shopinfo.coordinate.split(',')
        self.epointx = coArr[1]
        self.epointy = coArr[0]
        let token = self.$localStorage.get('TOKEN')
        if (token) {
          self.iSCoSeller()
        }
      }
    })
  }
}
</script>
<style lang="less" scoped>
  @import "../../../../assets/index/style.css";
  @import "../../../../assets/user/icon/carstyle.css";
  .sheader{
    width: 100%;
    height: 55vw;
    // background: url("../../../../assets/images/bgpic.png") no-repeat;
    background-size: 100% 100%;
    color: #fff;
    .mint-header-title{
      height: 16vw;
      padding: 0 4vw;
      font-size: 4vw;
      padding-top: 4.5%;
      line-height: 1.5;
      .span-i{
        transform: rotate(-180deg);
        display: inline-block;
        margin-right: 1%;
      }
      .icon-go{
        vertical-align: middle;
      }
      .title-span{
        padding-top: 2vw;
        color: #fff;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding-left: 5%;
        .address{
          color: #fff;
          padding: 0.1% 2.5%;
          // background: url("/static/images/local.png") no-repeat;
          margin-right: 1%;
          // background-size: 100%;
        }
      }
      .vip-span{
        display: inline-grid;
        .path6{
          height: 1.8vw;
        }
        .path6:before{
          color: #fff;
        }
      }
      .icon-go:before{
        color: #fff;
        line-height: 1.5;
      }
    }

    .mint-content{
      padding: 2vw 5vw 0vw 5vw;
      .mint-area1{
        height: 16vw;
        width: 95%;
        margin-left: auto;
        .area1-img{
          width: 22%;
          height: 100%;
          background: white;
          border-radius: 2vw;
        }
        .area1-span{
          display: inline-block;
          width: 48%;
          line-height: 6vw;
          vertical-align: middle;
          .span-area1{
            display: block;
            line-height: 2;
            font-size: 3.8vw;
            margin-left: 2%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          .xin{
            padding: 1% 6%;
            // background: url("/static/images/f_star.png") no-repeat;
            // background-size: 100% 100%;
            margin-right: 2%
          }
          .xin1{
            padding: 1% 6%;
            // background: url("/static/images/h_star.png") no-repeat;
            // background-size: 100% 100%;
            margin-right: 2%;
          }
        }
        .area1-span3{
          padding: 1.7vw 3vw 1.7vw 2.5vw;
          background: #f6c649;
          border-radius: 10vw;
          font-size: 3.3vw;
          margin-left: 8%;
        }
        .area1-span4{
          background: #f6c649;
          border-radius: 10vw;
          font-size: 3.3vw;
          display: inline-block;
          width: 25%;
          height: 6.5vw;
          text-align: center;
          line-height: 7vw;
        }
      }
      .mint-area2{
        width: 88%;
        margin: 7.8vw auto 0 auto;
        border-bottom: 1px solid #fff;
        .icon-search:before{
          font-size: 5vw;
          color: #fff;
          vertical-align: middle;
        }
        .area2-input{
          background: transparent;
          font-size: 4.2vw;
          padding: 1vw;
          color: #efeaea;
        }
      }
    }
  }

</style>
