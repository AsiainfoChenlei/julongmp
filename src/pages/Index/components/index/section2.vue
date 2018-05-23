<template>
  <section class="section2" v-if="section2">
     <!-- <div class="section-title1"><i class="lantern1"></i>&nbsp;今日优惠店&nbsp;&nbsp;<i class="lantern2"></i>-->
      <!--<div class="section-title1">今日优惠店&nbsp;&nbsp;
      <hr/>
    </div>
    <div class="section2-list">
      <ul>
        <li v-for="k in todaystores" :key="k.id">
          <router-link :to="{name: '商家首页',query:{shop_id: k.shop_id,company_id:k.company_id,select:'2'}}">
            <img class="li-imag" v-lazy="$helper.getRealPicURL(k.face,1,1,'w100_h100')">
            <span class="li-span">{{k.shop_name}}</span>
          </router-link>
        </li>
      </ul>
    </div>-->
    <div class="section-add">
      <!--<div class="section-title1"><i class="lantern1"></i>&nbsp;发现好货&nbsp;&nbsp;<i class="lantern2"></i></div>-->
      <div class="section-title1">&nbsp;发现好货&nbsp;&nbsp;</div>

      <div class="section-type"  v-for="val in FaceShopAndGoods" :key="val.id">
        <div class="section-add-list">
          <div class="list-right list-right2">
            <a @click="goshophome (val.shop_info.id,val.shop_info.company_id)">
              <img v-lazy="$helper.getRealPicURL(val.shop_info.face,1,1,'w100_h100')">
            </a>
          </div>
          <div class="list-left">
            <ul class="left-ul">
              <li class="left-li" v-for="vall in val.goods_info.rows" :key="vall.id" >
                <a @click="godetail(vall.goods_id,vall.company_id,vall.serial,vall.shop_id)" >
                  <img class="left-ul-img" v-lazy="$helper.getRealPicURL(vall.cover,vall.company_id,vall.shop_id,'w100_h100')">
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="section-add-img" v-if="val.title">{{val.title}}</div>
      </div>

    </div>
  </section>
</template>

<script>
export default {
  props: ['section2'],
  data () {
    return {
      todaystores: [],
      goodsByClothes: [],
      goodsByElectronics: [],
      goodsByElectronicsName: '',
      goodsByFurnishing: [],
      FaceShopAndGoods: []
    }
  },
  methods: {
    setActive () {
      const self = this
      self.$store.dispatch('getTopShopList', {
        'now_page': 1,
        'page_size': 20
      }).then(function (res) { // 商品
        let result = res.data
        if (result.code) {
          /*  if(self.page===1){
               self.datas=result.msg.rows;
              }else{
                  result.msg.rows.forEach(v=>{
                      self.datas.push(v);
                  });
              } */
          self.todaystores = result.msg.rows
          self.length = result.msg.rows.length
        } else {
          console.log(result.error)
        }
      })
    },

    // 跳转详情页
    godetail (goodsId, companyId, serial, shopId) {
      const self = this
      location.assign('shop.html#/shopdetail?goods_id=' + goodsId + '&company_id=' + companyId + '&serial=' + encodeURIComponent(serial) + '&shop_id=' + shopId + '&codeid=' + self.$localStorage.get('CODEID'))
    },
    // 商家首页
    goshophome (s, c) {
      location.assign('shop.html#/shop?shop_id=' + s + '&company_id=' + c + '&select=2')
    },

    // 获取店铺+商品
    getFaceShopAndGoods () {
      const self = this
      self.$store.dispatch('getFaceShopAndGoods', {
        'now_page': 1,
        'page_size': 20
      }).then(function (res) { // 商品
        let result = res.data
        console.log(result.data)
        console.log(res.data.code)
        if (res.data.code === 1) {
          self.FaceShopAndGoods = res.data.data
        } else {
          console.log(result.error)
        }
      })
    }
  },
  mounted () {
    const self = this
    self.setActive()
    self.getFaceShopAndGoods()
  }
}
</script>

<style lang="less" scoped>
  @import '../../../../assets/fz.less';
  @import '../../../../assets/index/style.css';
  .section2-list {
    overflow-x: auto;
    width: 100%;
    padding-top: 0px !important;
    .pt();
    /*原生滑动*/
    -webkit-overflow-scrolling: touch;
    >ul {
      .bt();
      width: 95%;
      font-size: 0;
      padding: 2% 2.5% 3% 2%;
      li {
        display: inline-block;
        width: 23%;
        padding: 1%;
        /*border: solid #e5e5e5;*/
        /*border-width: 0 0.1vw 0.15vw 0;*/
        text-align: center;
        a,
        img {
          display: block;
        }
        h2,
        p {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        h2 {
          .fz(font-size, 32);
          padding-top: 3vw;
          color: #333;
        }
        p.section2-list-intro {
          padding-top: 2vw;
          .fz(font-size, 26);
          color: rgb(150, 150, 150);
        }
        p.section2-list-price {
          color: #b4282d;
        }
      }
      li:nth-child(5),
      li:last-child {
        border-right: none;
      }
      li:nth-child(6),
      li:nth-child(7),
      li:nth-child(8),
      li:nth-child(9),
      li:nth-child(10) {
        border-bottom: none;
      }
    }
    ul {
      li {
        a {
          position: relative;
          .li-imag {
            display: inline-block;
            width: 100%;
            height: 20vw;
            background: #dedbdb;
            border-radius: 2vw;
          }
          .li-span {
            position: absolute;
            bottom: -0.03vw;
            left: 0;
            width: 73%;
            background: #f74b27;
            font-size: 3vw;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            border-radius: 0 0 2vw 2vw;
            color: #FFC846;
            display: inline-block;
            height: 6vw;
            line-height: 6vw;
            padding: 0 3vw;
          }
        }
      }
      li:last-child {
        margin-right: 0;
      }
    }
  }
  .section2-list::-webkit-scrollbar {
    display: none;
  }
  .section-title1 {
    height: 12vw;
    width: 100%;
    text-align: center;
    font-size: 6vw;
    line-height: 12vw;
    background: linear-gradient(to bottom right, #a953e2, #EB081F);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    /*hr{*/
    /*display: inline-block;*/
    /*width: 20%;*/
    /*vertical-align: middle;*/
    /*}*/
    .lantern1 {
      display: inline-block;
      height: 100%;
      width: 9vw;
      background: url("/static/images/lantern.png") no-repeat;
      vertical-align: middle;
      background-size: auto 100%;
    }
    .lantern2 {
      display: inline-block;
      height: 100%;
      width: 9vw;
      background: url("/static/images/lantern1.png") no-repeat;
      vertical-align: middle;
      background-size: auto 100%;
    }
  }
  .section-add {
    .section-type {
      position: relative;
      margin-bottom: 8vw;
      display: inline-block;
      width: 100%;
      .section-add-list {
        height: 60vw;
        padding: 5.5vw 1.2vw 7vw 0.3vw;
        background: #fff;
        display: flex;
        align-items: center;
      }
      .section-add-img {
        position: absolute;
        width: 16vw;
        height: 9vw;
        background: -webkit-gradient(linear, left top, right bottom, from(#fe930e), to(#ff6340));
        background: linear-gradient(to bottom right, #fe930e, #ff6340);
        text-align: center;
        border-radius: 0px 10vw 10vw 0px;
        top: -4.6vw;
        font-size: 4.4vw;
        line-height: 9vw;
        color: #fff;
      }
      .list-left,.list-right {
        float: left;
      }
      .list-left {
        width: 57%;
        height: 100%;
        .left-ul {
          margin-top: 6.5%;
          margin-left: 3%;
          width: 97%;
          height: 83%;
          font-size: 0;
          .left-li {
            display: inline-block;
            padding: 1vw;
            width: 45%;
            height: 55%;
            border: 0.2vw solid #e5e5e5;
            margin: -0.1vw;
            vertical-align: middle;
            .left-ul-img {
              width: 100%;
              max-height: 100%;
              background: #dedbdb;
            }
          }
          .left-li:nth-child(1) {
            border-left: none;
            border-top: none;
          }
          .left-li:nth-child(2) {
            border-right: none;
            border-top: none;
          }
          .left-li:nth-child(3) {
            border-left: none;
            border-bottom: none;
          }
          .left-li:nth-child(4) {
            border-right: none;
            border-bottom: none;
          }
        }
      }
      .list-right {
        width: 41%;
        /*height: 95%;*/
        margin-top: 5%;
        margin-left: 2%;
        img {
          width: 100%;
          /*height: 100%;*/
        }
      }
      .list-right2 {
        margin-left: 0;
      }
    }
    .section-type:last-child {
      margin-bottom: 0;
    }
  }
  .section2-banner {
    display: block;
    width: 100vw;
    img {
      display: block;
      height: 24vw;
      width: 100%;
    }
  }
</style>
