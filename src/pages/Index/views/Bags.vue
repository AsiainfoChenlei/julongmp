<template lang="html">
  <div class="bags">
  <div class="back" @click="$router.go(-1)">
      <i class="icon-go"></i>
    </div>
    <img class="bags-img" src="/static/images/gai.png"/>
    <div class="bags-top1">
      <img class="bags-top1-img" src="/static/images/xiezi.png" @click="getGoodsByTopClassId(13);"/>
      <img class="bags-top1-img" src="/static/images/baobao.png" @click="getGoodsByTopClassId(12);"/>
    </div>
    <div class="bags-top2">
      <img class="bags-img" src="/static/images/lanzi.png"/>
      <div class="bags-top2-content">
        <div class="bags-top2-title"><b>爆款直降</b></div>
        <ul class="bags-top2-ul">
          <li class="bags-top2-li" v-for="(val,k)  in product" :key="val.cover" v-if="k<12">
            <div class="top2-li-title">直降{{val.disprice}}元</div>
            <a @click="gobuy(val)">
            <img class="top2-li-img" v-lazy="$helper.getRealPicURL(val.cover,val.company_id,val.shop_id,'wfellow_h410')"/>
            <span class="top2-li-span">立即购买&nbsp;></span>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="bags-top3">
      <div class="bags-top3-title">批发价大甩卖</div>
      <ul class="bags-top3-ul">
        <li class="bags-top3-li" v-for="(val,k) in product" :key="val.cover" v-if="k>12">
          <a @click="gobuy(val)">
          <img class="top3-li-img" v-lazy="$helper.getRealPicURL(val.cover,val.company_id,val.shop_id,'wfellow_h410')"/>
          </a>
          <div class="top3-li-div">
            <div class="li-div-part1">{{val.title}}</div>
            <div class="li-div-part2">
                ￥{{val.min_price}}<span class="div-part2-span">&gt;</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
// import indexData from '../api/indexData'
export default{
  name: 'bags',
  data () {
    return {
      product: ''
    }
  },

  methods: {
    scrollEvent () {
      this.$route.meta.position = {x: 0, y: document.documentElement.scrollTop || document.body.scrollTop}
      console.log(this.$route.meta.position)
    },
    // 去购买
    gobuy (i) {
      const self = this
      self.$router.push({name: '详情页',
        query: {
          company_id: i.company_id,
          shop_id: i.shop_id,
          goods_id: i.goods_id,
          serial: encodeURIComponent(i.serial),
          codeid: self.$localStorage.get('CODEID')
        }})
      // location.assign('shop.html#/shopdetail?company_id=' + i.company_id + '&shop_id=' + i.shop_id + '&goods_id=' + i.goods_id + '&serial=' + i.serial)
    },
    getGoodsByTopClassId (classId) {
      let self = this
      self.$store.dispatch('getGoodsByTopClassId', {
        class_id: classId,
        page_size: '17',
        now_page: self.page
      }).then(function (res) {
        console.log(res)
        if (+res.data.code === 1) {
          self.product = res.data.msg.rows
          console.log(self.product)
        }
      }).catch(function (err) {
        console.log(err)
      })
    }
  },
  mounted () {
    let self = this
    self.getGoodsByTopClassId(13)
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
  .bags{
    .back {
      width: 7vw;
      height: 7vw;
      position: absolute;
      left: 4vw;
      top: 4vw;
      background-color: rgba(0,0,0,.4);
      border-radius: 50%;
      text-align: center;
      i {
        display: inline-block;
        line-height: 7vw;
        font-size: 4.3vw;
        transform: rotate(-180deg);
        &::before {
          color:#fff;
        }
      }
      &:active {
        transform: scale(1.3);
      }
    }
    .bags-img{
      width: 100%;
    }
    .bags-top1{
      display: flex;
      align-items: center;
      margin-top: 3%;
      .bags-top1-img{
        width: 48%;
        margin-left: 1.5%;
      }
    }
    .bags-top2{
      margin-top: 3%;
      .bags-top2-content{
        background: #9216EE;
        margin-top: -1vw;
        .bags-top2-title{
          text-align: center;
          color: #fff;
          font-size: 5.3vw;
          height: 15vw;
          line-height: 13vw;
          letter-spacing: 0.8vw;
        }
        .bags-top2-ul{
          background: inherit;
          .bags-top2-li{
            display: inline-block;
            width: 31%;
            height: 50vw;
            margin-left: 1.7%;
            margin-bottom: 3%;
            text-align: center;
            .top2-li-title{
              width: 100%;
              height: 8vw;
              color: #fff;
              font-size: 3.8vw;
              line-height: 8vw;
              letter-spacing: 0.3vw;
            }
            .top2-li-img{
              width: 93%;
              margin: 3%;
              height: 63%;
            }
            .top2-li-span{
              color: #fff;
              font-size: 3.3vw;
              padding: 1.5vw 4vw;
              border-radius: 3vw;
              margin-top: 1%;
              display: inline-block;
            }
          }
          .bags-top2-li:nth-of-type(3n-2){
            .top2-li-title{
              background: url("/static/images/red_bg.png");
              background-size: 100% 100%;
            }
            .top2-li-span{
              background: #FE6130;
            }
          }
          .bags-top2-li:nth-of-type(3n-1){
            .top2-li-title{
              background: url("/static/images/blue.png");
              background-size: 100% 100%;
            }
            .top2-li-span{
              background: #689AFD;
            }
          }
          .bags-top2-li:nth-of-type(3n){
            .top2-li-title{
              background: url("/static/images/yellow.png");
              background-size: 100% 100%;
            }
            .top2-li-span{
              background: #F7BB18;
            }
          }
        }
      }
    }
    .bags-top3{
      background: #FE612F;
      margin-top: 6%;
      padding-bottom: 3%;
      .bags-top3-title{
        height: 15vw;
        line-height: 15vw;
        font-size: 5.3vw;
        letter-spacing: 1vw;
        color: #fff;
        text-align: center;
      }
      .bags-top3-ul{
        background: inherit;
        .bags-top3-li{
          width: 48%;
          margin-left: 1.5%;
          margin-bottom: 2%;
          display: inline-block;
          height: 60vw;
          vertical-align: middle;
          .top3-li-img{
            width: 100%;
            height: 82%;
          }
          .top3-li-div{
            background: #9C4FF2;
            color: #fff;
            height: 18%;
            padding: 2%;
            .li-div-part1{
              font-size: 3.4vw;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .li-div-part2{
              margin-top: 2%;
              line-height: 1.5;
              font-size: 4.6vw;
              .div-part2-span{
                float: right;
                background: #000;
                padding: 0 5.2%;
                font-size: 3.7vw;
                margin-top: 1%;
              }
            }
          }
        }
      }
    }
  }
</style>
