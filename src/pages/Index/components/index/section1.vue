<template lang="html">
  <section class="section1" v-if='section1'>
    <div class="section1-part3">
      <!--<div class="spart-1"></div>-->
      <!--<div class="spart-2">14:39:50</div>-->
      <mt-swipe :auto="0">
      <mt-swipe-item>
         <ul class="spart-3">
          <li class="spart3-li" v-for="(val,index) in product" :key="val.id" v-if="index<9 && index>5">
               <a  @click ="gobuy(val)" >
                <img class="hd-li2-img" v-lazy="$helper.getRealPicURL(val.cover,val.company_id,val.shop_id,'cutw150_cuth170')"/>
              </a>
              <div class="li-radius">直降<br/>￥{{val.disprice}}</div>
              <div class="li-bottom">限时<span class="li-span">￥{{val.min_price}}</span></div>
            </li>
          </ul>
        </mt-swipe-item>
        <mt-swipe-item>
          <ul class="spart-3">
            <li class="spart3-li" v-for="(val,index) in product" :key="val.id" v-if="index<3">
              <a  @click ="gobuy(val)" >
                <img class="hd-li2-img" v-lazy="$helper.getRealPicURL(val.cover,val.company_id,val.shop_id,'cutw150_cuth170')"/>
              </a>
              <div class="li-radius">直降<br/>￥{{val.disprice}}</div>
              <div class="li-bottom">限时<span class="li-span">￥{{val.min_price}}</span></div>

            </li>
          </ul>
        </mt-swipe-item>
        <mt-swipe-item>
         <ul class="spart-3">
          <li class="spart3-li" v-for="(val,index) in product" :key="val.id" v-if="index<6 && index>2">
              <a  @click ="gobuy(val)" >
                <img class="hd-li2-img" v-lazy="$helper.getRealPicURL(val.cover,val.company_id,val.shop_id,'cutw150_cuth170')"/>
              </a>
              <div class="li-radius">直降<br/>￥{{val.disprice}}</div>
              <div class="li-bottom">限时<span class="li-span">￥{{val.min_price}}</span></div>
            </li>
          </ul>
        </mt-swipe-item>
        <mt-swipe-item>
         <ul class="spart-3">
          <li class="spart3-li" v-for="(val,index) in product" :key="val.id" v-if="index<12 && index>8">
              <a  @click ="gobuy(val)" >
                <img class="hd-li2-img" v-lazy="$helper.getRealPicURL(val.cover,val.company_id,val.shop_id,'cutw150_cuth170')"/>
              </a>
              <div class="li-radius">直降<br/>￥{{val.disprice}}</div>
              <div class="li-bottom">限时<span class="li-span">￥{{val.min_price}}</span></div>
          </li>
          </ul>
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <div class="section1-part4">
      <div class="part4-1">品牌云集<span class="part41-span">BRAND-NAME</span></div>
      <div class="part4-2">
        <li v-for="i in section1.brandsList" class="part42-span" :key="i.imgPath">
         <div class="sp2-2" :key="i.id"  @click="jump(i)">
                <img class="brands-img" :src="i.imgPath"/>
         </div>
        </li>
      </div>
    </div>
    <div class="section1-part1">
      <div class="item-bac"></div>
      <div class="item-radius1">
            <ul class="section1-list">
              <li v-for="k in section1.list" :key="k.id">
                <a class="li-a" @click="tradingArea(k.id)">
                  <img :src="k.imgPath" class="li-radius"/>
                  <h1>{{k.name}}</h1>
                </a>
              </li>
            </ul>
      </div>
      <!--<div class="item-bac2"></div>-->
    </div>
    <div class="section1-part2">
      <div class="part2-boder">
        <div class="sp2-bac">
          <div class="spb2-1">巨龙商城&nbsp;&nbsp;Discover&nbsp;the&nbsp;beauty&nbsp;of&nbsp;wuhan</div>
          <!--<div class="spb2-1">巨龙商城&nbsp;&nbsp;发现武汉之美</div>-->
          <!--<div class="spb2-2">Discover&nbsp;the&nbsp;beauty&nbsp;of&nbsp;wuhan</div>-->
        </div>
        <ul class="sp2-ul">
            <li class="sp2-li" v-for="i in section1.lis" :key="i.id">
              <div class="sp2-1">
                <span class="sp2-text">{{i.name}}</span>
              </div>
              <div class="sp2-2" @click="oso(i)" :key="i.id">
                <img class="sp2-img" :src="i.imgurl"/>
                <div class="smalldz"></div>
              </div>
            </li>
          <li class="sp2-li" v-for="i in section1.list1" :key="i.id">
            <div class="sp2-1">
              <span class="sp2-text">{{i.name}}</span>
            </div>
              <div class="sp2-2" @click="oto(i)" :key="i.id">
                <img class="sp2-img" :src="i.imgurl"/>
                <div class="smalldz"></div>
              </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: ['section1'],
  data () {
    return {
      // city:
      circle: [],
      product: ''
      // section1: this.section1
    }
  },
  methods: {
    oto (i) {
      let list1 = this.section1.list1
      location.assign('tradingarea.html#/stread?list1=' + list1)
      this.$localStorage.set('sname', i.name)
      var list = i.list
      list = JSON.stringify(list)
      this.$localStorage.set('list', list)
    },
    oso (i) {
      // 删除存储的数据
      this.$localStorage.set('TREADTAGVISITEDVIES', JSON.stringify([]))
      this.$localStorage.set('shopname', i.name)
      this.$localStorage.set('TRADINGAREASEVENSTATE', JSON.stringify({}))
      location.assign('tradingarea.html#/tread7?cid=' + i.id)
    },
    // 去购买
    gobuy (i) {
      const self = this
      location.assign('shop.html#/shopdetail?company_id=' + i.company_id + '&shop_id=' + i.shop_id + '&goods_id=' + i.goods_id + '&serial=' + i.serial + '&codeid=' + self.$localStorage.get('CODEID'))
    },

    tradingArea (cid) {
      // 删除存储的数据
      this.$localStorage.set('TREADTAGVISITEDVIES', JSON.stringify([]))
      location.assign('tradingarea.html#/tread?cid=' + cid + '&second=0')
    },
    getGoodsByTopClassId (classId) {
      let self = this
      self.$store.dispatch('getGoodsByTopClassId', {
        class_id: classId,
        page_size: '12',
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
    },
    jump (i) {
      if (+i.id === 1) {
        // location.assign('topic.html#/homedection')
        this.$router.push({
          name: '家电'
        })
      } else if (+i.id === 2) {
        // location.assign('topic.html#/wring')
        this.$router.push({
          name: '家具'
        })
      } else if (+i.id === 3) {
        // location.assign('topic.html#/bags')
        this.$router.push({
          name: '包包'
        })
      }
    }
  },
  mounted () {
    let self = this
    self.getGoodsByTopClassId(888888)
  }
}

</script>

<style lang="less" scoped>
  @import '../../../../assets/fz.less';
  @import '../../../../assets/index/style.css';
  .section1 {
    /*background: #ffe8c6;*/
    width: 99%;
    .section1-part1{
      width: 101%;
      height: 23vw;
      .section1-list {
        display: -ms-flex;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
        -ms-flex-pack: distribute;
        justify-content: space-around;
        padding:0 2vw 4vw 2vw;
        li {
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          a,
          img {
            width: 100%;
            display: block;
          }
        }
      }
      .item-bac{
        /*height: 5.2vw;*/
        /*background: url("/static/images/m1.png") repeat-x;*/
        background-size: auto 100%;
        transform: rotate(180deg);
        margin-top: -0.2%;
      }
      .item-bac2{
        /*height: 4.8vw;*/
        /*background: url("/static/images/m1.png") repeat-x;*/
        background-size: auto 100%;
      }
      .item-radius1{
        margin-top: 2%;
        /*height: 46vw;*/
        /*margin: 2% 0 -2%;
        height: 45vw;*/
        ul{
          /*height: 100%;*/
          padding: 5% 0;
          /*background: inherit;*/
          li{
            display: inline-block;
            width: 14%;
            height: 52%;
            background: inherit;
            .li-a{
              height: 100%;
              .li-radius{
                height: 50%;
                width: 54%;
                /*border-radius: 50%;*/
                margin: 0 auto;
              }
              h1{
                height: 10vw;
                line-height: 10vw;
                font-size: 3.2vw;
                font-weight: 550;
                margin: 0 auto;
                text-align: center;
                width: 48px;
              }
            }
          }
          li:last-child{
            margin-right: 0vw;
            h1{
              margin-left: -6%;
              width: 54px;
            }
          }
        }
      }
    }
    .section1-part2{
      background: #B4E89D;
      padding-bottom: 3%;
      padding: 3%;
      .part2-boder{
        border: 0.9vw solid #fff;
        padding: 3% 1%;
        .sp2-bac{
          /*height: 10vw;*/
          width: 100%;
          /*background: url("/static/images/m.png") no-repeat;*/
          background-size: 100% 100%;
          color: #fff;
          .spb2-1{
            color: #317F29;
            text-align: center;
            font-weight: 600;
            letter-spacing: 0.2vw;
            font-size: 3.5vw;
            margin-bottom: 1.7vw;
          }
          .spb2-2{
            background: #38952D;
            border-radius: 4vw;
            text-align: center;
            width: 50%;
            margin: 2% auto;
            line-height: 1.7;
            font-size: 3vw;
          }
        }
        .sp2-ul{
          background: inherit;
          .sp2-li{
            /*background: inherit;*/
            width: 29.5%;
            margin: 3% 0 0 2.8%;
            display: inline-block;
            vertical-align: middle;
            border-radius: 5px;
            /*background: #fff;*/
            .sp2-1{
              height: 5.5vw;
              /*background: url("/static/images/kkb.png") no-repeat;*/
              background-size: 100% 100%;
              /*margin-bottom: 6%;*/
              text-align: center;
              line-height: 6.8vw;
              font-size: 2.8vw;
              color: #317F29;
              .sp2-text{
                font-weight: bold;
                display: inline-block;
                width: 70%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
            }
            .sp2-2{
              /*height: 25.5vw;*/
              /*background: url("/static/images/hkb.png") no-repeat;*/
              background-size: 100% 100%;
              .sp2-img{
                width: 83%;
                height: 77%;
                margin: 5% 7%;
                border: 0.3vw solid #317F29;
              }
              .smalldz{
                height: 3vw;
                background: url("/static/images/home_15.png");
                background-size: 100% 100%;
                margin: -5px auto 6%;
                width: 92%;
              }
            }
          }
        }
      }
    }
    .section1-part3{
      width: 101%;
      height: 43vw;
      background: -webkit-linear-gradient(#F6774C, #F64C28); /* Safari 5.1 - 6.0 */
      background: -o-linear-gradient(#F6774C, #F64C28); /* Opera 11.1 - 12.0 */
      background: -moz-linear-gradient(#F6774C, #F64C28); /* Firefox 3.6 - 15 */
      background: linear-gradient(#F6774C, #F64C28); /* 标准的语法（必须放在最后） */
      .mint-swipe {
        padding-bottom: 3%;
      }
      .spart-1{
        background: url("/static/images/home_03.png") no-repeat;
        height: 16%;
        background-size: 100% 100%;
        width: 33%;
        margin: auto;
      }
      .spart-2{
        color: #fff;
        letter-spacing: 0.7vw;
        text-align: center;
        margin: 2% 0;
      }
      .spart-3{
        height: 75%;
        padding-top: 2%;
        background: inherit;
        .spart3-li{
          width: 32%;
          height: 113%;
          display: inline-block;
          border-radius: 4px;
          margin-left: 0.5%;
          position: relative;
          .hd-li2-img{
            width:100%;
            height:100%;
          }
          .li-radius{
            position: absolute;
            top: 0;
            left: 14%;
            height: 32%;
            width: 34%;
            border-radius: 0 0 50% 50%;
            color: #fff;
            font-size: 3.3vw;
            text-align: center;
            padding: 2% 0;
            background: -webkit-linear-gradient(#F6774C, #F64C28); /* Safari 5.1 - 6.0 */
            background: -o-linear-gradient(#F6774C, #F64C28); /* Opera 11.1 - 12.0 */
            background: -moz-linear-gradient(#F6774C, #F64C28); /* Firefox 3.6 - 15 */
            background: linear-gradient(#F6774C, #F64C28); /* 标准的语法（必须放在最后） */
          }
          .li-bottom{
            position: absolute;
            bottom: 7%;
            font-size: 3.3vw;
            color: #F6774C;
            font-weight: 550;
            letter-spacing: 0.8vw;
            left: 0;
            right: 0;
            text-align: center;
            display: none;
            .li-span{
              font-size: 4.3vw;
              letter-spacing: 0;
            }
          }
        }
      }
    }
    .section1-part4{
      height: 34vw;
      background: #fff;
      width: 101%;
      .part4-1{
        font-size: 4.5vw;
        letter-spacing: 0.2vw;
        padding: 3% 2% 3%;
        color: #000;
        .part41-span{
          font-size: 3.5vw;
          letter-spacing: 0.2vw;
          padding-left: 2%;
          color: #999;
        }
      }
      .part4-2{
        height: 32%;
        .part42-span{
          width: 29.7%;
          height: 68%;
          border-radius: 4px;
          background: #26a2ff;
          display: inline-block;
          margin-left: 2.5%;
          .brands-img{
            width: 100%;
         //   height: 71%;
          }
        }
      }
      .part4-3{
        height: 40%;
        .part43-1{
          width: 13.4%;
          height: 67%;
          border: 0.2vw solid #e5e5e5;
          margin-top: 2.1%;
          margin-left: 2.3%;
        }
      }
    }
  }
</style>
<style>
  .mint-swipe{
    height: 97%;
  }
  .mint-swipe-indicator.is-active{
    opacity: 1;
  }
  .mint-swipe-indicator{
    background: #fff;
  }
</style>
