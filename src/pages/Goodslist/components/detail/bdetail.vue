<template lang="html">
  <div class="shopdetail5">
    <div class="sd5-span">宝贝详情</div>
    <!--<div class="sd5-text"><img style="width:100%" v-lazy="$helper.getRealPicURL(view.show_imgs,query.company_id,query.shop_id)"  /></div>-->
    <div class="sd5-text">
      <img class="sd5-image" v-for="k in  pics" :key="k.shop_id" v-lazy="$helper.getRealPicURL(k,query.company_id,query.shop_id,'w600_hfellow')" />
    </div>
    <div class="sd5-p">
      <div class="sd5-p-title">巨龙商城服务申明</div>
      <div class="sd5-p-title1">商品售后监督：</div>
      <p class="sd5-p-1">通过巨龙平台浏览并在平台购物，巨龙商城可参与该商品售后监督与服务，为保障消费者的售后
      权益，请您通过平台购物，如线下现金与商户交易，平台无法参与售后调节</p>
      <div class="sd5-p-title1">红色标价：</div>
      <p class="sd5-p-1">为实体店在巨龙平台上的商品成交价，该标价一般为实体店最低售价。若该标价高于实体店一般销售成交价，消费者应维护自身利益，向巨龙商城投诉该商品，平台视实际情况最高给与封店处理</p>
      <div class="sd5-p-title1">商品保障：</div>
      <p class="sd5-p-1">巨龙商户应皆为具有实体店面经营商家，平台上产品应为实体店内在售商品。如存在商品虚假信息等行为，消费者可投诉到巨龙客户</p>
      <p class="sd5-p-1"></p>

      <div class="sd5-qq"><a :href="qhref" @click="QQurl1" style="color: #ffaa00">[点击巨龙商城客服在线咨询<i class="qq-icon"></i></a>]</div>
    </div>
    <div class="toast-div" v-show="toas"><img class="toast-img" @click="tauch"/></div>
  </div>
</template>

<script>
import detector from 'detector'
export default {
  props: ['view', 'query'],
  data () {
    return {
      pics: [],
      imgurl: '',
      qhref: 'mqqwpa://im/chat?chat_type=wpa&uin=2896301904&version=1&src_type=web&web_src=oicqzone.com',
      toas: false
    }
  },
  mounted () {
    let self = this
    self.$nextTick(function () {
      self.pics = self.view.show_imgs
      /* if (self.pics.length > 0) {
           self.imgurl = self.$helper.getRealPicURL(self.pics[0], 1, 1)
         } */
      // self.pics = JSON.parse(self.view.show_imgs);
      // self.imgurl = self.$helper.getRealPicURL(self.pics[0], 1, 1)
    })
  },
  methods: {
    QQurl1 () {
      let browser = detector.browser.name
      if (browser === 'micromessenger') {
        this.qhref = '#'
        this.toas = true
      }
    },
    tauch () {
      this.toas = false
    }
  }
}
</script>

<style lang="less" scoped>
  .shopdetail5 {
    background: #fff;
    padding-bottom: 5%;
    .sd5-span {
      height: 12vw;
      line-height: 12vw;
      font-size: 4.5vw;
      padding-left: 5%;
      color: #333;
    }
    .sd5-text {
      height: auto;
      width: 90%;
      margin-left: 5%;
      border: none;
      font-size: 3.8vw;
      color: #999;
      .sd5-image {
        background: #E3E3E3;
        width: 100%;
        margin-bottom: 5px;
      }
    }
    .sd5-p{
      padding: 5% 5% 0;
      .sd5-p-title{
        font-size: 3.2vw;
        text-align: center;
        padding-bottom: 3%;
        letter-spacing: 0.4vw;
      }
      .sd5-p-title1{
        color: #f74b27;
        font-size: 3vw;
        padding-bottom: 1%;
      }
      .sd5-p-1{
        font-size: 2.5vw;
        letter-spacing: 0.2vw;
        line-height: 1.5;
      }
      .sd5-qq{
        font-size: 2.5vw;
        color: #ffaa00;
        text-align: center;
        padding-top: 2.4%;
        .qq-icon{
          padding: 1px 8px;
          background: url("/static/images/qq.png");
          background-size: 100% 100%;
        }
      }
    }
    .toast-div{
      width: 100%;
      height: 100%;
      position: fixed;
      background: #000;
      opacity: 0.9;
      padding: 0% 0% 76%;
      z-index: 1000;
      left: 0;
      bottom: 0;
      top: 0;
      .toast-img{
        height: 100%;
        width: 100%;
        background: url("/static/images/jlts.png");
        background-size: 100% 100%;
      }
    }
  }
</style>
