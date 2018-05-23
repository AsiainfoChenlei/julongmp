<template lang="html">
  <div class="wring">
  <div class="back" @click="$router.go(-1)">
      <i class="icon-go"></i>
    </div>
    <img class="wring-img" src="/static/images/dq_01.jpg"/>
    <ul class="wring-main-ul">
      <li class="wring-ul-li" v-for="i in list1" :style="i.bg" :key="i.img" @click="getGoodsByTopClassId(i.key);">
        <div class="wring-ul-span">{{i.name}}</div>
        <img class="wring-ul-img" :src="i.img"/>
      </li>
    </ul>
    <img class="wring-img1" src="/static/images/dq_20.jpg"/>
    <div class="wring-top1">
      <ul class="wring-top1-ul">
        <li class="wring-top1-li" v-for="(val,k) in product" :key="val.cover" v-if="k<3">
          <a @click="gobuy(val)">
          <img class="top1-li-img" v-lazy="$helper.getRealPicURL(val.cover,val.company_id,val.shop_id,'wfellow_h410')"/>
          </a>
        </li>
      </ul>
    </div>
    <div class="wring-top2">
      <div class="wring-top2-title">
        <span class="top2-title-span1">BEST&nbsp;SALE</span>
        <b class="top2-title-span2">触点直降</b>
      </div>
    </div>
    <div class="wring-top3" v-for="(val,k) in product" :key="val.cover" v-if="k<6 &&k>2">
      <a class="wring-top3-img" @click="gobuy(val)">
      <img v-lazy="$helper.getRealPicURL(val.cover,val.company_id,val.shop_id,'wfellow_h410')"/>
       </a>
      <div class="wring-top3-div">
        <div class="wring-top3-span1">{{val.title}}</div>
        <!--<b class="wring-top3-span2">输入您的卖点&nbsp;卖点</b>-->
        <div class="wring-top3-span3">
          <div class="top3-span3-part1">
            <!--<div class="span3-part1-top1">￥{{val.max_price}}</div>-->
            <div class="span3-part1-top2">狂欢价</div>
          </div>
          <div class="top3-span3-part2">￥{{val.min_price}}</div>
        </div>
      </div>
    </div>
    <div class="wring-top2">
      <div class="wring-top2-title">
        <span class="top2-title-span1">NEW&nbsp;ITEMS</span>
        <b class="top2-title-span2">本期直销</b>
      </div>
    </div>
    <div class="wring-top4" v-for="(val,k) in product" :key="val.cover" v-if="k<12 &&k>6">
      <a @click="gobuy(val)" class="wring-top4-img" >
      <img v-lazy="$helper.getRealPicURL(val.cover,val.company_id,val.shop_id,'wfellow_h410')"/>
       </a>
      <div class="wring-top4-div">
        <div class="top4-div-span1">{{val.title}}</div>
        <div class="top4-div-span2"><span class="top4-div-span21">价格￥<span class="top4-div-span22">{{val.min_price}}</span></span></div>
        <a @click="gobuy(val)">
        <span class="top4-div-span3">立即抢购</span>
        </a>
      </div>
    </div>
    <div class="wring-top2">
      <div class="wring-top2-title">
        <span class="top2-title-span1">NEW&nbsp;ITEMS</span>
        <b class="top2-title-span2">新品热销</b>
      </div>
    </div>
    <ul class="wring-ul1">
      <li class="wring-ul1-li" v-for="(val,k) in product" :key="val.conver" v-if="k<12 &&k>6">
        <a @click="gobuy(val)">
        <img class="ul1-li-img" v-lazy="$helper.getRealPicURL(val.cover,val.company_id,val.shop_id,'wfellow_h410')"/>
        </a>
        <div class="ul1-li-span">
          <span class="li-span1">RMB:{{val.min_price}}</span>
          <a @click="gobuy(val)">
          <span class="li-span2">立即购买</span>
          </a>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import indexData from '../api/indexDataTopic'
export default{
  name: 'wring',
  data () {
    return {
      list1: '',
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
      //  location.assign('shop.html#/shopdetail?company_id=' + i.company_id + '&shop_id=' + i.shop_id + '&goods_id=' + i.goods_id + '&serial=' + i.serial)
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
  beforeCreate () {
    console.log('create')
    console.log('wring', indexData)
    /*    const self = this;
          this.$api({
            method: 'post',
            url:'/wring'
          }).then((response) => {
            self.list1 = response.data.list1;
          }).catch(function(error) {
            alert(error)
          }) */
  },
  mounted () {
    let self = this
    this.$set(this, 'list1', indexData.wring.list1)
    // alert(JSON.stringify(wring.wring.list1))
    console.log('GGGGGGGGGGGG')
    console.log('create222')
    // self.beforeCreate();
    self.getGoodsByTopClassId(4)
    /* 对应空调、冰箱、洗衣机、热水器、集成灶 */
    /* getGoodsByTopClassId(4);getGoodsByTopClassId(5);getGoodsByTopClassId(6);getGoodsByTopClassId(7);getGoodsByTopClassId(8) */
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
  .wring{
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
    .wring-img{
      width: 100%;
    }
    .wring-main-ul{
      background: transparent;
      padding: 2% 0;
      .wring-ul-li{
        display: inline-block;
        width: 17%;
        height: 25vw;
        margin-left: 2.6%;
        border-radius: 2vw;
        vertical-align: middle;
        text-align: center;
        .wring-ul-span{
          font-size: 3.3vw;
          line-height: 8vw;
          height: 9vw;
          color: #fff;
        }
        .wring-ul-img{
          width: 79%;
          height: 54%;
        }
      }
    }
    .wring-img1{
      width: 80%;
      margin-left: 10%;
    }
    .wring-top1{
      width: 90%;
      height: 22vw;
      margin: 25% auto 2%;
      background: url("/static/images/dq_24.jpg");
      background-size: 100%;
      position: relative;
      .wring-top1-ul{
        background: transparent;
        position: absolute;
        width: 88%;
        top: -88%;
        left: 5%;
        .wring-top1-li{
          display: inline-block;
          width: 29%;
          height: 28vw;
          margin-right: 4%;
          border: 1px solid #fff;
          background: url("/static/images/dq_two_03.png");
          .top1-li-img{
            height: 100%;
            width: 100%;
            margin-left: -11%;
            margin-top: -10%;
            background: #ffc107;
            border: 0.8vw solid #FF0035;
          }
        }
        .wring-top1-li:last-of-type{
          margin-right: 0;
        }
      }
    }
    .wring-top2{
      .wring-top2-title{
        width: 100%;
        height: 30vw;
        background: url("/static/images/dq_title_02.jpg");
        background-size: 100% 100%;
        text-align: center;
        color: #fff;
        .top2-title-span1{
          font-size: 2.7vw;
          letter-spacing: 0.8vw;
          padding-top: 10.5%;
          display: inline-block;
          line-height: 1.6;
        }
        .top2-title-span2{
          font-size: 7vw;
          display: block;
        }
      }
    }
    .wring-top3{
      width: 90%;
      height: 40vw;
      border: 2px solid #352482;
      border-radius: 2vw;
      margin: 7% auto;
      display: flex;
      align-items: center;
      .wring-top3-img{
        display: inline-block;
        width: 40%;
        border-radius: 2vw 0 0 2vw;
        margin: 0 8% 0 2%;
        text-align: center;
        img{
          max-width: 100%;
          max-height: 38vw;
        }
      }
      .wring-top3-div{
        width: 45%;
        .wring-top3-span1{
          border-width: 1px 0 1px 0;
          border-style: solid;
          border-color: #FF4D85;
          color: #FF4D85;
          text-align: center;
          padding: 3% 0 2%;
          -webkit-line-clamp: 2;
          overflow: hidden;
          -webkit-box-orient: vertical;
          display: -webkit-box;
        }
        .wring-top3-span2{
          padding-top: 3%;
          display: block;
        }
        .wring-top3-span3{
          background: url("/static/images/dq_30.jpg");
          width: 100%;
          height: 8vw;
          margin-top: 16%;
          background-size: 100% 100%;
          /*display: flex;
          align-items: center;*/
          color: #fff;
          padding: 2%;
          position: relative;
          .top3-span3-part1{
            font-size: 3vw;
            position: absolute;
            .span3-part1-top1{
              text-decoration: line-through;
            }
          }
          .top3-span3-part2{
            margin-top: 9%;
          }
        }
      }
    }
    .wring-top4{
      background: url("/static/images/dq_34.jpg");
      width: 86%;
      height: 50vw;
      background-size: 100% 100%;
      margin: 10% auto;
      padding: 3% 5%;
      display: flex;
      align-items: center;
      .wring-top4-img{
        width: 51%;
        height: 85%;
        text-align: right;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .wring-top4-div{
        width: 39%;
        height: 85%;
        background: #fff;
        padding: 0 5%;
        .top4-div-span1{
          font-size: 3.8vw;
          margin: 17% 0 1%;
          line-height: 1.5;
          color: #7A75EB;
          -webkit-line-clamp: 2;
          overflow: hidden;
          -webkit-box-orient: vertical;
          display: -webkit-box;
          height: 12vw;
        }
        .top4-div-span2{
          color: #F6B800;
          text-align: center;
          .top4-div-span22{
            font-size: 7vw;
          }
        }
        .top4-div-span3{
          background: #F6B800;
          padding: 2% 5%;
          color: #fff;
          border-radius: 3vw;
          font-size: 3.3vw;
          display: inline-block;
          margin-left: 24%;
          width: 45%;
          text-align: center;
          margin-top: 5%;
        }
      }
    }
    .wring-ul1{
      .wring-ul1-li{
        width: 47%;
        display: inline-block;
        padding: 2% 0 0 2%;
        text-align: center;
        vertical-align: middle;
        .ul1-li-img{
          width: 100%;
          height: 55vw;
        }
        .ul1-li-span{
          height: 8vw;
          line-height: 8vw;
          font-size: 4.1vw;
          .li-span2{
            border: 1px solid #666;
            padding: 1% 2% 2%;
            margin-left: 7%;
            font-size: 3.5vw;
          }
        }
      }
    }
  }
</style>
