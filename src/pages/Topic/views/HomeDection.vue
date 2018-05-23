<template lang="html">
  <div class="homedection">
  <div class="back" @click="$router.go(-1)">
      <i class="icon-go"></i>
    </div>
    <img class="hd-img" src="/static/images/banner_01.jpg"/>
    <div class="hd-main">
      <ul class="hd-main-ul">
        <li class="hd-ul-li" v-for="i in list1" :style="i.bg" :key="i.key" @click="getGoodsByTopClassId(i.key);">
          <div class="hd-ul-span">{{i.name}}</div>
          <img class="hd-ul-img" :src="i.img" />
        </li>
      </ul>
      <div class="hd-main-top1" v-for="(val,index) in product" :key="val.id" v-if="index<2">
        <a @click="gobuy(val)">
        <img class="hd-top1-img" v-lazy="$helper.getRealPicURL(val.cover,val.company_id,val.shop_id,'w100_h100')"/>
        </a>
        <div class="hd-top1-span">
          <h1 class="hd-top1-h1">{{val.title}}</h1>
          <div class="hd-top1-span2">￥<span class="hd-top1-span3">{{val.min_price}}</span></div>
        </div>
      </div>
      <div class="hd-main-top2"></div>
      <ul class="hd-main-ul2">
        <li class="hd-li2" v-for="(val,index) in product" :key="val.id" v-if="index<6 && index>1">
          <a @click="gobuy(val)">
          <img class="hd-li2-img" v-lazy="$helper.getRealPicURL(val.cover,val.company_id,val.shop_id,'w100_h100')"/>
          </a>
          <div class="hd-li2-span">
           <!-- <span class="hd-li2-span1">原价：{{val.max_price}}</span>-->
            <span class="hd-li2-span2">促销价：<span class="hd-li-span21">{{val.min_price}}</span></span>
            <span class="hd-li2-span3">立即抢购</span>
          </div>
        </li>
      </ul>
      <div class="hd-main-top3">
        <div class="hd-top3-part1">舒适生活&nbsp;&nbsp;&nbsp;享受你我他</div>
        <a @click="gobuy(product[6])">
        <div class="hd-top3-part2">
          <img class="top3-part2-img" v-lazy="$helper.getRealPicURL(product[6].cover,product[6].company_id,product[6].shop_id,'w100_h100')"/>
          <div class="top3-part2-span">
            <b class="top3-part2-span1">{{product[6].title}}</b>
            <span class="top3-part2-span2">{{product[6].category_name}}</span>
            <span class="top3-part2-span3">￥<span class="top3-part2-span4">{{product[6].min_price}}</span></span>
          </div>
        </div>
        </a>
      </div>
      <div class="hd-main-top3">
        <div class="hd-top3-part1 top4-part">舒适生活&nbsp;&nbsp;&nbsp;享受你我他</div>
        <a @click="gobuy(product[7])">
        <div class="hd-top3-part2  hd-top4-part2">
          <img class="top3-part2-img" v-lazy="$helper.getRealPicURL(product[7].cover,product[7].company_id,product[7].shop_id,'w100_h100')"/>
          <div class="top3-part2-span">
            <b class="top3-part2-span1">{{product[7].title}}</b>
            <span class="top3-part2-span2">{{product[7].category_name}}</span>
            <span class="top3-part2-span3">￥<span class="top3-part2-span4">{{product[7].min_price}}</span></span>
          </div>
        </div>
        </a>
      </div>
      <div class="hd-main-top3">
        <div class="hd-top3-part1">舒适生活&nbsp;&nbsp;&nbsp;享受你我他</div>
        <a @click="gobuy(product[8])">
        <div class="hd-top3-part2">
          <img class="top3-part2-img" v-lazy="$helper.getRealPicURL(product[8].cover,product[8].company_id,product[8].shop_id,'w100_h100')"/>
          <div class="top3-part2-span">
            <b class="top3-part2-span1">{{product[8].title}}</b>
            <span class="top3-part2-span2">{{product[8].category_name}}</span>
            <span class="top3-part2-span3">￥<span class="top3-part2-span4">{{product[8].min_price}}</span></span>
          </div>
        </div>
        </a>
      </div>
      <div class="hd-main-top5">
        <div class="hd-top5-title">
          <b class="top5-title1">家具新品诚意推荐</b>
          <i class="top5-i1"></i> <b class="top5-title2">新品推荐&nbsp;&nbsp;仅此一次</b> <i class="top5-i2"></i>
        </div>
        <a @click="gobuy(product[9])">
        <img class="hd-li2-img1" v-lazy="$helper.getRealPicURL(product[9].cover,product[9].company_id,product[9].shop_id,'w100_h100')"/>
        </a>
        <ul class="hd-main-ul2">
            <li class="hd-li2" v-for="(val,index) in product" :key="val.id" v-if="index<15 && index>9">
               <a @click="gobuy(val)">
              <img class="hd-li2-img" v-lazy="$helper.getRealPicURL(val.cover,val.company_id,val.shop_id,'w100_h100')"/>
              <div class="hd-li2-span">
                <!--<span class="hd-li2-span1">原价：{{val.max_price}}</span>-->
                <span class="hd-li2-span2">促销价：<span class="hd-li-span21">{{val.max_price}}</span></span>
                <span class="hd-li2-span3">立即抢购</span>
              </div>
              </a>
            </li>
          </ul>

      </div>
    </div>
  </div>
</template>
<script>
import indexData from '../api/indexData'
export default{
  data () {
    return {
      list1: '',
      list2: '',
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
      location.assign('shop.html#/shopdetail?company_id=' + i.company_id + '&shop_id=' + i.shop_id + '&goods_id=' + i.goods_id + '&serial=' + i.serial)
    },
    getGoodsByTopClassId (classId) {
      let self = this
      self.$store.dispatch('getGoodsByTopClassId', {
        class_id: classId,
        page_size: '14',
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

    // self.list1 = homedection.list1
    // self.list2 = response.data.list2
  },
  mounted () {
    let self = this
    this.$set(this, 'list1', indexData.homedection.list1)
    this.$set(this, 'list2', indexData.homedection.list2)
    self.getGoodsByTopClassId(9)
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
   .homedection{
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
      .hd-img{
        width: 100%;
      }
     .hd-main{
       position: relative;
       background: url("/static/images/bg_24.jpg") repeat-y;
       background-size: 100%;
       padding: 30% 3% 0;
       .hd-main-ul{
         width: 85%;
         position: absolute;
         left: 9%;
         top: -1.3%;
         background: transparent;
         .hd-ul-li{
           display: inline-block;
           width: 20%;
           height: 25vw;
           margin: 0 2%;
           border-radius: 2vw;
           vertical-align: middle;
           text-align: center;
           .hd-ul-span{
             font-size: 3.3vw;
             line-height: 8vw;
             height: 9vw;
             color: #fff;
           }
           .hd-ul-img{
             width: 79%;
             height: 54%;
           }
         }
       }
       .hd-main-top1{
         background: url("/static/images/bg3_03.jpg") no-repeat;
         background-size: 100%;
         height: 44vw;
         position: relative;
         .hd-top1-img{
           width: 90%;
           height: 83%;
           margin: 5% 5% 0%;
           background: aqua;
         }
         .hd-top1-span{
           position: absolute;
           width: 30%;
           height: 70.5%;
           top: 10.7%;
           left: 5%;
           padding: 3% 5%;
           background: #ececec;
           opacity: 0.8;
            .hd-top1-h1{
              color: #402F99;
              font-size: 5vw;
              margin-top: 10%;
            }
           .hd-top1-span1{
             color: #402F99;
             font-size: 3vw;
             display: -webkit-box;
             overflow: hidden;
             text-overflow: ellipsis;
             -webkit-line-clamp: 2;
             -webkit-box-orient: vertical;
           }
           .hd-top1-span2{
             color: #FF2793;
             font-size: 3vw;
             .hd-top1-span3{
                font-size: 6vw;
             }
           }
           .hd-top1-span4{
             color: #402F99;
             font-size: 3vw;
             overflow: hidden;
             text-overflow: ellipsis;
             white-space: nowrap;
           }
         }
       }
       .hd-main-top1:nth-of-type(even){
         .hd-top1-span{
           left: unset;
           right: 5%;
         }
       }
       .hd-main-top2{
         height: 17vw;
         background: url("/static/images/teju_16.png") no-repeat;
         background-size: 100% 100%;
         margin: 6% auto;
       }
       .hd-li2-img1{
         width: 96%;
         padding: 3% 2%;
         border: 1px solid #fff;
       }
       .hd-main-ul2{
         background-color: transparent;
         .hd-li2{
           display: inline-block;
           width: 49%;
           margin: 2% 2% 0 0;
           height: 50vw;
           vertical-align: middle;
           .hd-li2-img{
             width: 100%;
             height: 80%;
             background: aquamarine;
           }
           .hd-li2-span{
             height: 20%;
             background: #D84A3C;
             position: relative;
             .hd-li2-span1{
               position: absolute;
               font-size: 2.7vw;
               color: #fff;
               top: 3%;
               left: 2%;
               text-decoration: line-through;
             }
             .hd-li2-span2{
               font-size: 3vw;
               color: #F7E730;
               display: inline-block;
               margin-left: 2%;
               margin-top: 0.7%;
               width: 60%;
               .hd-li-span21{
                 display: block;
                 font-size: 4.8vw;
               }
             }
             .hd-li2-span3{
               display: inline-block;
               width: 33%;
               height: 62%;
               color: #7E0100;
               background: #FBD904;
               float: right;
               text-align: center;
               border-radius: 7px;
               margin: 4% 2.3% auto 0;
               font-size: 3.3vw;
               line-height: 2;
             }
           }
         }
         .hd-li2:nth-child(even){
           margin-right: 0;
         }
       }
       .hd-main-top3{
         margin: 10% 0;
         .hd-top3-part1{
           height: 7vw;
           background: url("/static/images/teju_20.png");
           background-size: 100% 100%;
           color: #fff;
           font-size: 3.3vw;
           padding: 0 10%;
           line-height: 7vw;
         }
         .hd-top3-part2{
           height: 50vw;
           margin-top: 0vw;
           color: #fff;
           display: flex;
           align-items: center;
           background: -webkit-linear-gradient(left top, #8F30BE , #4E208C); /* Safari 5.1 - 6.0 */
           background: -o-linear-gradient(bottom right, #8F30BE , #4E208C); /* Opera 11.1 - 12.0 */
           background: -moz-linear-gradient(bottom right, #8F30BE , #4E208C); /* Firefox 3.6 - 15 */
           background: linear-gradient(to bottom right, #8F30BE , #4E208C);
           .top3-part2-img{
             width: 43%;
             height: 75%;
             margin: 0 5%;
           }
           .top3-part2-span{
             width: 52%;
             text-align: right;
             margin-right: 5%;
             line-height: 1.7;
             .top3-part2-span1{
               font-size: 6.5vw;
             }
             .top3-part2-span2{
               font-size: 3.3vw;
             }
             .top3-part2-span3{
               display: inline-flex;
               font-size: 3vw;
               align-items: baseline;
               .top3-part2-span4{
                 font-size: 6vw;
                 padding-left: 1%;
               }
             }
           }
           .top3-part2-span span{
             display: block;
           }
         }
       }
       .top4-part{
         background: url("/static/images/teju_28.png") !important;
         text-align: right;
       }
       .hd-top4-part2{
         flex-direction: row-reverse;
       }
       .hd-main-top5{
         background: url("/static/images/bg_32.jpg");
         padding: 2vw;
         .hd-top5-title{
           color: #fff;
           text-align: center;
           padding: 2vw 0;
           position: relative;
           .top5-title1{
             display: block;
             font-size: 6vw;
           }
           .top5-title2{
             font-size: 8vw;
             padding: 0 4vw;
           }
           .top5-i1{
             padding: 3vw 1.6vw;
             position: absolute;
             left: 4%;
             background: url("/static/images/teju_36.png") no-repeat;
             background-size: 100% 100%;
             top: 40%;
           }
           .top5-i2{
             padding: 3vw 1.6vw;
             position: absolute;
             right: 4%;
             background: url("/static/images/new_30.png") no-repeat;
             background-size: 100% 100%;
             top: 40%;
           }
         }
         .top5-img{
           width: 93%;
           height: 45vw;
           border: 1px solid #fff;
           padding: 3%;
           background: #8a6de9;
         }
       }
     }
   }
</style>
