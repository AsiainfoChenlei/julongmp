<template lang="html">

  <div class="orderdetial" >
    <header>
    <router-link
     class="icon-go"
     :to="{ name: '用户页'}"
     v-if="query.pover==1">
    </router-link>
    <span class="icon-go" @click="$router.go(-1)" v-else></span>
     <div slot="title" class="or-header">订单详情</div>
  </header>


    <div class="order1">
      <span class="span-1">订单状态</span>
      <span class="span-2">{{view.status_list[0].status}}</span>
    </div>
    <div class="order-huabian"></div>
    <div class="order2">
      <div class="order2-1">
        <i class="order-1-address"></i>
        <span class="order-1-span" v-if="typeof view.address_info === 'object'">收货人：{{view.address_info.address_name}}</span>
        <span class="order2-span" v-if="typeof view.address_info === 'object'">{{view.address_info.address_phone}}</span>
      </div>
      <div class="order2-2" v-if="typeof view.address_info === 'object'">收货地址：{{view.address_info.province}} {{view.address_info.city}}  {{view.address_info.area}}  {{view.address_info.address}}</div>
      <div class="order2-2" v-if="typeof view.address_info !== 'object'">收货地址：{{view.address_info}}</div>
    </div>
    <div class="order-huabian"></div>
    <div class="order3">
      <div class="order3-1" @click="shop"><span class="order3-span" >{{view.shop_info.shop_name}}</span><i class="icon-go"></i></div>
      <div class="order3-2">

        <div class="order3-2-1" v-for="(goods,index) in goodsrows">
          <div class="order-1-img">
            <img class="order-img" @click="detail(goods.goods_id,goodsrows[0].serial)" :src="$helper.getRealPicURL(goods.stock.images,view.shop_info.company_id,view.shop_id)" />
          </div>
          <div class="order-1-span">
            <span class="order1-span span-1">{{goods.title}}</span>
            <span class="order1-span span-2">规格：{{goods.stock.standard}}</span>
            <span class="order1-span span-3">{{goods.stock.price}}</span>
          </div>
          <div class="order-1-num">X{{goods.num}}</div>
        </div>

      </div>
      <div class="order3-3">备注：<span>{{view.remark}}</span></div>
      <div class="order3-4">
        <div class="order3-div order3-div-1"><span class="div-1">总计</span><span class="order3-span-1">￥{{goodsrows[0].stock.price}}</span></div>
        <div class="order3-div order3-div-1"><span class="div-1">运费</span><span class="order3-span-1">￥{{view.freight}}</span></div>
        <div class="order3-div order3-div-2"><span class="div-2">实付(含运费)</span><span class="order3-span-2">￥{{view.total_price}}</span></div>
      </div>
    </div>
    <div class="order4">
      <div class="order3-1" @click="QQurl1"><span class="order3-span">联系卖家</span><i class="icon-go"></i></div>
      <div class="order4-1">
        <span class="order4-1-span">订单编号：{{view.system_serial}}</span>
        <span class="order4-1-span">创建时间：{{view.created_at}}</span>
        <span v-if="view.send_serial!=''" class="order4-1-span" >快递图片：
            <img style="width:80%" v-bind:src="$helper.getRealPicURL(view.send_serial,+view.shop_info.company_id,+view.shop_info.id)" alt="">
        </span>
      </div>
    </div>
    <div class='bottoms' v-if="view.auto_finished_at">{{auto_finished_at}}</div>
    <div class="bottoms">
      <div>
      <span  class='span-3' @click="delayt(view.system_serial)" v-if="view.can_delay==1">延迟收货</span>
      </div>

       <v-order  :type="+view.status_list[0].status_code" :serial="view.system_serial" v-on:doActive="activeSuccess"></v-order>
      <mt-popup
            v-model="popupVisible"
            position="bottom">
            <mt-button type="default" @click="delay()" style="float: right;"> 确定</mt-button>
             <mt-picker style="width:100%;" :slots="slots" @change="onValuesChange"></mt-picker>
          </mt-popup>
    </div>
    <div class="toast-div" v-show="toas"><img class="toast-img" @click="tauch"/></div>
  </div>
</template>

<script>
//import Header from '@/common/_header.vue'
import {
    Spinner
  } from 'mint-ui';
  import { Popup } from 'mint-ui';
  import { Picker } from 'mint-ui';
  import { Button } from 'mint-ui';
  import {
    MessageBox
  } from 'mint-ui';
  import OrderBtn from '@/components/order/activebutton.vue';
import detector  from 'detector';
export default {
  components: {
    //'v-header': Header,
    'v-spinner': Spinner,
    'v-order': OrderBtn,
    'v-popup': Popup,
    'v-picker': Picker
  },
  data(){
    return {
          slots: [
        {
          flex: 1,
          values: ['一周', '二周', '三周', '四周', '五周', '六周','七周', '八周', '九周'],
          className: 'slot1'
        }],
        popupVisible:false,
          view:{},
          goodsrows:[],
          selected:"1",
          f1:true,
          query:{},
          page_size:2,
          now_page:1,
          length:0,
          serial:'',
          auto_finished_at:'',
          tempenddate:'',
          //address_info:this.view.address_info.rows
          chref: "mqqwpa://im/chat?chat_type=wpa&uin=2896301904&version=1&src_type=web&web_src=oicqzone.com",
          toas: false
        }
  },
  methods: {
     onValuesChange:function(picker, values) {
        let self = this
        self.getextra(values[0]);
        console.log(self.extra);
    },
      getextra(n){
        let self = this
        switch(n)
          {
            case '一周':
            self.extra = 1;
            break;
            case '二周':
            self.extra = 2;
            break;
            case '三周':
            self.extra = 3;
            break;
            case '四周':
            self.extra = 4;
            break;
            case '五周':
            self.extra = 5;
            break;
            case '六周':
            self.extra = 6;
            break;
            case '七周':
            self.extra = 7;
            break;
            case '八周':
            self.extra = 8;
            break;
            case '九周':
            self.extra = 9;
            break;
            default:
            self.extra = 0;
          }
      },
      //计算时间相差
        dateDif(enddate){
            const self = this;
            let date = enddate - new Date().getTime();
            console.log(date);
            let days    = date / 1000 / 60 / 60 / 24;
            let daysRound   = Math.floor(days);
            let hours    = date/ 1000 / 60 / 60 - (24 * daysRound);
            let hoursRound   = Math.floor(hours);
            let minutes   = date / 1000 /60 - (24 * 60 * daysRound) - (60 * hoursRound);
            let minutesRound  = Math.floor(minutes);
            let seconds   = date/ 1000 - (24 * 60 * 60 * daysRound) - (60 * 60 * hoursRound) - (60 * minutesRound);
            let secondsRound  = Math.floor(seconds);
            let time = "倒计时:"+(daysRound+"天"+hoursRound +"时"+minutesRound+"分"+secondsRound+"秒");
            console.log(time);
            self.auto_finished_at = time;
            },
      //定时器
        run(enddate){
            const self = this;
            let time = 1000;
            setInterval(function(){
            self.dateDif(enddate);
            },500,time);
        },
        delayt(serial){
         const self = this;
         self.extra = 1;
         self.popupVisible=true;
         self.serial = serial;
      },
    shop() {
        const self = this;
        //return;
        this.$router.push({
           path: 'shop?shop_id='+self.view.shop_id+'&company_id='+self.view.shop_info.company_id+'&select=2'
        })
      },
      detail(v,serial) {
        const self = this;
        //return;
        this.$router.push({
           path: 'detail?shop_id='+self.view.shop_id+'&company_id='+self.view.shop_info.company_id+'&goods_id='+v+'&serial='+serial
        })
      },
            activeSuccess(msg) {
                const self = this;
                if (+self.id === +self.selected) {
                  self.now_page = 1;
                  self.allLoad = false
                }
                self.setActive();
              },
            param() {
                  const self = this;
                  if (self.$route.query.serial) {
                    let query={
                      pover:self.$route.query.pover,
                      serial:self.$route.query.serial
                    }
                    self.query=query;
                  }
            },
            //延迟收货
            delay(){
                const self = this;
                self.popupVisible=false;
                MessageBox.confirm('您确定吗？').then(action => {
                    let params = {
                      system_serial:self.serial,
                      status: 'DELAY',
                      extra:self.extra
                    }
                    self.$store.dispatch('updateOrderStatus', params).then(function(res) {
                      location.reload();
                    }).catch(function(fail) {
                      console.log('fail', fail)
                    })
                  })
            },
            setActive(){
                const self=this;
                self.$store.dispatch('getOrderDetail',{'system_serial':self.query.serial}).then(function (res) { //商品
                      let result=res.data;
                        if(result.code){
                             self.view=result.msg;
                             self.goodsrows=result.msg.goods_info;
                             let enddate = new Date(result.msg.auto_finished_at);
                             if(result.msg.auto_finished_at!=null){
                                  self.run(enddate.getTime());
                             }
                        }else{
                          console.log(result.error);
                        }
                });
            },
    QQurl1(){
      let browser = detector.browser.name;
      if(browser === 'micromessenger'){
        this.chref = "#";
        this.toas = true;
      }
    },
    tauch(){
      this.toas = false;
    }
        },
        mounted(){
          const self=this;
          self.param();
          self.setActive();
        }
}
</script>

<style lang="less" scoped>
  @import '../../assets/index/style.css';
  @import '../../assets/fz.less';
@import '../../assets/index/style.css';
header {
  background: #f74b27;
  color: #fff;
  text-align: center;
  position: fixed;
  width: 92%;
  z-index: 1000;
  height: 12vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 4vw;
  h1 {
    .fz(font-size,34);
    letter-spacing: .2vw;
    font-weight: 600;
    margin-right: 36vw;
  }
  span,a {
    display: inline-block;
    //.fz(font-size,46);
    font-size: 5vw;
    transform: rotate(-180deg);
    &::before {
      color:#fff;
    }
  }
}
  .orderdetial {
    background: #F3F3F3;
    min-height: 100%;
    header {
      .or-header {
        width: 100%;
      }
    }
    .order1 {
      font-size: 3.8vw;
      height: 12vw;
      line-height: 12vw;
      padding-top: 12%;
      .span-1 {
        color: #333;
        width: 45%;
        display: inline-block;
        padding-left: 5%;
      }
      .span-2 {
        display: inline-block;
        width: 46.1%;
        text-align: right;
        background: linear-gradient(to bottom right, #FF8E00,#F72b27);
        -webkit-text-fill-color: transparent;
        -webkit-background-clip: text;
      }
    }
    .order-huabian{
      height: 0.7vw;
      background: url("/static/images/huabian_02.jpg") repeat-x;
      background-size: 100% 100%;
    }
    .order2{
      padding: 4% 3% 4% 5%;
      background: #fff;
      .order2-1{
        display: flex
        .order-1-address{
          padding: 0vw 2vw;
          background: url("/static/images/weizhi_03.png") no-repeat;
          background-size: 100% 100%;
        }
        .order-1-span{
          display: inline-block;
          width: 64.7%;
          padding-left: 4%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: #333;
          font-size: 4vw;
        }
        .order2-span{
          color: #333;
          padding-top: 0.4vw;
          font-size: 4vw;
        }
      }
      .order2-2{
        font-size: 4vw;
        color: #999;
        text-indent: 8%;
        line-height: 1.7;
        padding-top: 2%;
      }
    }
    .order3-1{
      height: 10vw;
      line-height: 10vw;
      border-bottom: 0.3vw solid #E3E3E3;
      .order3-span{
        font-size: 3.7vw;
        padding-left: 7%;
        display: inline-block;
        width: 86.6%;
        color: #333;
      }
      i{
        vertical-align: middle;
      }
    }
    .order3{
      margin-top: 3%;
      background: #fff;
      .order3-2{
        padding-left:7%;
        background: #fff;
        border-bottom: 0.3vw solid #E3E3E3;
        .order3-2-1{
          display: flex;
          height: 18vw;
          line-height: 18vw;
          border-bottom: 0.3vw solid #E3E3E3;
          padding: 5% 0;
          .order-1-img{
            .order-img{
              height: 17vw;
              width: 18vw;
              background: #dcdcdc;
            }
          }
          .order-1-span{
            margin-left: 3%;
            width: 65%;
            padding-top: 3%;
            .order1-span{
              line-height: 1.7;
              display: block;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              width: 80%;
            }
            .span-1{
              font-size: 3.8vw;
              color: #333;
            }
            .span-2{
              font-size: 3.3vw;
              color: #999;
            }
            .span-3{
              font-size: 3.8vw;
              color: #333;
              padding-top: 4.9%;
              line-height: 1;
            }
          }
          .order-1-num{
            letter-spacing: 0.5vw;
            font-size: 3.7vw;
            color: #666;
          }
        }
        .order3-2-1:last-child{
          border-bottom: none;
        }
      }
      .order3-3{
        color: #999;
        height: 100%;
        padding-left: 6%;
        line-height: 8vw;
        font-size: 3.5vw;
        border-bottom: 0.3vw solid #E3E3E3;
        input{
          color: #999;
          font-size: 3.5vw;
        }
        input::-webkit-input-placeholder{
          color: #999;
        }
      }
      .order3-4{
        .order3-div{
          margin-left: 6%;
          margin-right: 3.5%;
        }
        .order3-div-1{
          font-size: 3.5vw;
          color: #666;
          padding-top: 1%;
          .div-1{
            margin-right: 57%;
          }
          .order3-span-1{
            display: inline-block;
            width: 35%;
            text-align: right;
          }
        }
        .order3-div-2{
          padding-top: 2.5%;
          font-size: 3.8vw;
          color: #333;
          padding-bottom: 3%;
          .div-2{
            margin-right: 57%;

          }
          .order3-span-2{
            color: #F74B27;
            display: inline-block;
            width: 19%;
            text-align: right;
           /* float: right;
            padding-right: 4vw;*/
          }
        }
      }
    }
    .order4{
      background: #fff;
      margin: 3% 0;
      .order4-1{
        margin-left: 7%;
        padding: 2% 0;
        .order4-1-span{
          display: block;
          color: #999;
          padding-top: 2%;
          font-size: 3.3vw;
        }
      }
    }
  /*  .order5{
      height: 13vw;
      background: #fff;
      line-height: 13vw;
      text-align: right;
      padding-right: 3%;
      font-size: 3.3vw;
      .order5-1{
        padding: 1.5vw 2vw 1vw;
        border: 0.3vw solid #CCC;
        color: #CCC;
        border-radius: 6vw;
      }
      .order5-2{
        margin-left: 2%;
        padding: 1.5vw 2vw 1vw;
        border: 0.3vw solid #F74B27;
        color: #fff;
        background: linear-gradient(to bottom right,#FF8E00,#F74B27);
        border-radius: 6vw;
      }
    }*/
    .bottoms {
      display: flex;
      height: 16vw;
      line-height: 16vw;
      padding-left: 17.5%;
      /deep/ .span-2 {
        padding: 2vw 3vw;
        border: 0.3vw solid #333;
        color: #333;
        border-radius: 6vw;
        margin-right: 2vw;
        font-size: 4vw;
      }
      /deep/ .span-3 {
        padding: 2vw 3vw;
        border: 0.3vw solid #f74b27;
        color: #f74b27;
        border-radius: 6vw;
        margin-right: 2vw;
        font-size: 4vw;
      }
    }
    .toast-div{
      width: 73%;
      height: 70%;
      position: fixed;
      background: #000;
      /* opacity: 0.5; */
      padding: 31% 14% 76%;
      z-index: 1000;
      left: 0;
      bottom: 0;
      top: 0;
      .toast-img{
        height: 100%;
        width: 100%;
        background: url("/static/images/wxtishi.jpg");
        background-size: 100% 100%;
      }
    }
  }
</style>
<style>
  .mint-popup-bottom{
    width: 100%;
  }
</style>
