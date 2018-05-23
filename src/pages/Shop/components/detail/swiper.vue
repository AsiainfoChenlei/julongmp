<template lang="html">
    <div :class="'swiper swiper'+this.query.is_sale">
      <mt-swipe :auto="4000">
        <mt-swipe-item v-for="i in swiperData" :key="i.id">
           <div class="mimg">
            <img :src="$helper.getRealPicURL(i.images,+query.company_id,+query.shop_id,'wfellow_h410')">
           </div>
        </mt-swipe-item>
      </mt-swipe>
      <div class="back" @click="$router.go(-1)">
        <span class="icon-go"></span>
      </div>
      <div class="discount"></div>
      <!--<div class="shopdetail1">-->
        <!--<span class="shopdetail1-span1">这是一个很长很长很长很长名字的烧烤店，你以为你看完了其实...-->
        <!--<span class="shopdetail1-span2">(已选S-土豪金-6000元)</span>-->
        <!--</span>-->
      <!--</div>-->
      <!--<div class="shopdetail2">-->
        <!--<span class="shopdetail2-span span-select">S</span>-->
        <!--<span class="shopdetail2-span">M</span>-->
        <!--<span class="shopdetail2-span">L</span>-->
      <!--</div>-->
    </div>
</template>

<script>
export default {
  props: ['swiperData', 'view', 'query']
  /* computed:{
    swiper(){
       console.log('123');
        //return this.$store.state.detail.productDatas.swiper
        console.log(this.$store.state.detail.productDatas);
        console.log(JSON.parse(this.$store.state.detail.productDatas.property));
        return JSON.parse(this.$store.state.detail.productDatas.property);
    }
  } */
}
</script>

<style lang="less" scoped>
@import '../../../../assets/fz.less';
@import '../../../../assets/index/style.css';

.swiper {
  width: 100%;
  position: relative;
  .mint-swipe {
    width: 100%;
    height: 100vw;
    .mimg{
      display: table;
      vertical-align: middle;
      height: 100vw;
      width: 100%;
      text-align: center;
      line-height: 100vw;
      img {
        display: inline-block;
        max-width: 100%;
        vertical-align: middle;
        max-height:100vw;
      }
    }

  }

  .back {
    width: 7vw;
    height: 7vw;
    line-height: 8.5vw;
    position: absolute;
    left: 4vw;
    top: 2vw;
    background-color: rgba(0,0,0,.4);
    border-radius: 50%;
    text-align: center;
      span {
        display: inline-block;
        transform: rotate(-180deg);
        &::before {
          color:#fff;
          font-size: 3.7vw;
        }
      }

      &:active {
        transform: scale(1.3);
      }
  }

  .shopdetail1{
    padding: 3%;
    line-height: 1.5;
    background: #fff;
    .shopdetail1-span1{
      font-size: 3.9vw;
      color: #333;
    }
    .shopdetail1-span2{
      font-size: 4.5vw;
      color: #F74B27;
    }
  }
  .shopdetail2{
    background: #fff;
    display: flex;
    padding-bottom: 4%;
    padding-top: 1%;
    .shopdetail2-span{

      padding: 1.5% 2.5%;
      border: 0.3vw solid #999;
      margin-left: 3%;
    }
    .span-select{
      border-color: #F74B27;
      color: #F74B27;
    }
  }
  .discount{
    position: absolute;
    top: 2vw;
    right: 3vw;
    width: 20vw;
    height: 20vw;
    background: url("../../../../../static/images/tj.png") no-repeat;
    background-size: 100% 100%;
  }
}
.swiper0{
  .discount{
    display: none;
  }
}
</style>
<style type="text/css">
  .mint-swipe-indicators{
    bottom: 2vw !important;
  }
  .mint-swipe-indicator{
    width: 2.5vw;
    height: 2.5vw;
    margin: 0 0.7vw;
  }
</style>
