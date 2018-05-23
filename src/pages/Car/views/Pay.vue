<template lang="html">

  <div class="pay">
    <!-- <iframe id="geoPage" width=0 height=0 frameborder=0 style="display:none;" scrolling="no" src="https://apis.map.qq.com/tools/geolocation?key=EVIBZ-LL5CS-P4ZOB-6NRPW-H7DRZ-LOBS7&referer=yuconora">
                    </iframe> -->
    <v-header>
      <h1 slot="title">支付订单</h1>
    </v-header>

    <div class="pay1">
      <span class="pay1-1" :class="{'pay11':!is1,'pay12':is1}" @click="byMail">付费邮寄</span>
      <span class="pay1-2" :class="{'pay11':is1,'pay12':!is1}" @click="bySelf">到店自提(无邮费)</span>
    </div>
    <mt-cell title="选择收货地址"  :to="{name: '地址管理',query:{order: 1}}"  is-link>
     </mt-cell>
    <div class="huabian"></div>
    <div v-if="address" class="pay-address">
      <div>
        <i class="weizhi"></i>
        <!--<span class="main-address-per" v-if="!query.address" style="color:#ee7150;line-height: 9vw"><span>默认地址</span></span>
        <span class="main-address-per" v-if="query.address" style="color:#ee7150;line-height: 9vw;"><span>选后地址</span></span>-->
        <span class="main-address-per"  style="color:#ee7150;line-height: 9vw;"><span>收货地址</span></span>
        <div v-if="!sendWay==1">
        <span class="main-address-per per-1">收货人:<span>{{address.address_name}}</span></span>
        <span class="main-address-tel">{{address.address_phone}}</span>
        </div>
      </div>
      <p v-if="sendWay==1">收货地址:<span>门店自提</span></p>
      <p v-if="!sendWay==1">收货地址:<span>{{address.province}}{{address.city}}{{address.area}}{{address.street}}{{address.address}}</span></p>
    </div>

    <div class="huabian"></div>
    <div class="pay-product">

      <ul v-if="!confirm">

        <li v-for="k in carList" :key="k.shop_name">
          <mt-cell :title='k.shop_name' ></mt-cell>
          <a>
            <img v-lazy="$helper.getRealPicURL(k.image_url,k.company_id,k.shop_id,'w100_h100')" alt="">
            <div>
              <h2><span style="color:#ee7150">品名:{{k.title}} </span></h2>
              <h2><span>规格:{{k.standard}} </span></h2>
              <h2><span>单价:{{k.price}} </span></h2>

            </div>
          </a>
          <div class="fan">
            <span class="f-span">商品数量：</span>
            <div class="numberop">
                           <span @click="countChange('reduce')" class="right last"><img src="../../../assets/car/images/reduce.png"/></span>
                           <span @click="editNumber()">{{num}}</span>
                           <span @click="countChange('add')" class="left one"><img src="../../../assets/car/images/add.png"/></span>

             </div>
           <!--  <span class="f-span">备注:</span><input type="text" class="f-input" placeholder="给店家留言"/> -->
          </div>
          <!--<div class="fan fan1">-->
             <!--运费:{{carList[0].freight}}-->
          <!--</div>-->
        </li>
      </ul>

      <!-- 支付成功后的提示 -->
      <div class="pay-confirm" v-else>
        支付成功!!!<br>
        当页面数据清空<br>
        购物车列表重新设置
      </div>
    </div>
    <h3 class="pay-allpay ">商品总额 : <i>￥</i><span>{{sumGoodMoney}}</span>元</h3>
    <h3 class="pay-allpay" v-if="sendWay==1">运费:<i>￥</i><span>0.00</span>元</h3>
    <h3 class="pay-allpay" v-if="sendWay==0">运费:<i>￥</i><span>{{carList[0].freight}}</span>元</h3>
    <h3 class="pay-allpay ">总需要支付 : <i>￥</i><span>{{sumPayMoney}}</span>元</h3>
    <h3 class="remark payfor">备注 : <span>{{carList[0].remark}}</span></h3>

    <footer class="pay-footer" ontouchstrat="" @click="payConfirm">
      <span>立即支付</span>
    </footer>
   <!-- <router-view v-show="halert"></router-view> -->
   <mt-actionsheet
  :actions="actions"
  v-model="sheetVisible" style="color: #999">
  </mt-actionsheet>
  </div>
</template>

<script>
import Header from '@/components/common/_header.vue'
import { MessageBox, Actionsheet } from 'mint-ui'
export default {
  components: {
    'v-header': Header, Actionsheet
  },
  data () {
    return {
      sheetVisible: false,
      actions: [
        {
          name: '微信支付',
          method: this.weixin
        },
        {
          name: '支付宝支付',
          method: this.alipay
        }
      ],
      lat: '',
      lng: '',
      sendWay: 0,
      confirm: '',
      have_default: false,
      address: {},
      carList: [],
      num: 1,
      sumGoodMoney: 0,
      sumPayMoney: 0,
      query: {},
      remark: '',
      is1: true,
      order_serial: '',
      halert: true

    }
  },
  mounted () {
    const self = this
    console.log('self.query.address')
    console.log(self.query.address)
    self.param()
    if (self.query.address) {
      self.checkedAddress()
    } else {
      self.defaultAddress()
      console.log('defaultAddress')
      console.log(self.address)
      console.log(self.address.a_id)
      // self.query.address=self.address.a_id;
    }
    self.setCartList()
    self.sumTotalPrice()

    /* 以下是定位用的 */
    //  let loc;
    //  window.addEventListener('message', function(event) {
    //   // 接收位置信息
    //   loc = event.data;
    //   if (loc && loc.module == 'geolocation') { //定位成功,防止其他应用也会向该页面post信息，需判断module是否为'geolocation'
    //     self.address = loc.addr.length > 0 ? loc.addr : loc.nation + loc.province
    //     self.lat = loc.lat
    //     self.lng = loc.lng
    //     console.log('ggggggg', self.lat, self.lng, loc)
    //   } else {
    //     if (navigator.geolocation) {
    //       navigator.geolocation.getCurrentPosition(self.successCallback, self.handleLocationError, {
    //         maximumAge: 15000,
    //         timeout: 10000,
    //         enableHighAccuracy: true
    //       })
    //     } else {
    //       alert("对不起，您的浏览器不支持html5定位");
    //     }
    //   }
    // }, false);
    // document.getElementById("geoPage").contentWindow.postMessage('getLocation', '*')
    // //设置6s超时，防止定位组件长时间获取位置信息未响应
    // setTimeout(function() {
    //   if (!loc) {
    //     document.getElementById("geoPage")
    //       .contentWindow.postMessage('getLocation.robust', '*');
    //   }
    // }, 2000); //6s
  },
  computed: {

    // 所有商品列表
  /*  carList() {

      return this.$store.state.detail.selectedList
    }, */

    // 商品价格总和
    /* allpay() {
      let allpay = 0;
      for (let i = 0; i < this.$store.state.detail.selectedList.length; i++) {
        allpay += this.$store.state.detail.selectedList[i].price
      }
      return allpay
    } */
  },

  methods: {
    alipay () {
      const self = this
      self.createOrder_sure('ALIPAY')
    },
    weixin () {
      const self = this
      self.createOrder_sure('WEIXIN')
    },
    bySelf () {
      /*   const self=this;
      self.sendWay=1;
      self.sumTotalPrice(); */
      // this.is1 = !this.is1;
      const self = this
      self.is1 = !this.is1
      self.sendWay = 1
      self.sumTotalPrice()
    },
    byMail () {
      // this.is1 = !this.is1;
      const self = this
      self.is1 = !this.is1
      self.sendWay = 0
      self.sumTotalPrice()
    },
    param () {
      const self = this
      console.log(self.$route.query)
      console.log('self.$route.query.address')
      console.log(self.$route.query.address)
      if (self.$route.query.address) {
        self.query.address = self.$route.query.address
      }
    },
    sumTotalPrice () {
      const self = this
      if (self.sendWay === 1) {
        self.sumPayMoney = parseFloat(self.num * self.carList[0].price)
      } else {
        self.sumPayMoney = parseFloat(self.num * self.carList[0].price) + parseFloat(self.carList[0].freight)
      }
      self.sumGoodMoney = parseFloat(self.num * self.carList[0].price)
    },
    countChange (type) {
      console.log('countChange')
      console.log(type)
      const self = this
      if (type === 'reduce') {
        self.num--
      }
      if (type === 'add') {
        self.num++
      }
      self.sumTotalPrice()
      self.sumGoodMoney = parseFloat(self.num * self.carList[0].price)
      console.log(self.num)
    },
    /*  editNumber(item){
        MessageBox.prompt('请输入商品数量').then(({ value, action }) => {
          if(parseInt(value) > 0)
          item.counts = parseInt(value)
          this.sumTotalPrice()
        })
      }, */
    /*   countChange (item,type) {
        const self=this;
          if(type == 'reduce')
           self.num--
          if(type == 'add')
           self.num++
        //this.sumTotalPrice()
      }, */
    createOrder_sure (vmethod) {
      const self = this
      let goodsInfoArr = [{
        'serial': self.carList[0].serial, 'goods_id': self.carList[0].id, 'num': self.num, 'stock_id': self.carList[0].stock_id, 'remark': self.carList[0].remark
      }]
      let goodsInfo = JSON.stringify(goodsInfoArr)
      if (self.sendWay === 1) {
        self.query.address = 0
      }

      // console.log(isWechat);
      // return;
      self.$store.dispatch('createOrder', {freight: self.carList[0].freight, shop_id: self.carList[0].shop_id, goods_info: goodsInfo, total_price: self.sumPayMoney, sale_price: self.sumPayMoney, real_price: self.sumPayMoney, pay_price: self.sumPayMoney, address_id: self.query.address, remark: self.carList[0].remark}).then(function (res) { // 广告
        let result = res.data
        if (result.code) {
          console.log(result)
          window.location.href = 'http://back.jlgo.shop/ucenter/pay_order?system_serial=' + result.msg.system_serial + '&pay_type=' + vmethod
          /*   if(isWechat){
                // window.location.href=Util.ajaxUrl + ':8002/ucenter/pay_order?system_serial='+result.msg.system_serial +'&pay_type=WEIXIN';
                 window.location.href='http://back.jlgo.shop/ucenter/pay_order?system_serial='+result.msg.system_serial +'&pay_type=WEIXIN';
                 }else{
                 // window.location.href=Util.ajaxUrl + ':8002/ucenter/pay_order?system_serial='+result.msg.system_serial +'&pay_type=ALIPAY';
                     window.location.href='http://back.jlgo.shop/ucenter/pay_order?system_serial='+result.msg.system_serial +'&pay_type=ALIPAY';
                 } */
          //   window.location.href=Util.ajaxUrl + ':8002/ucenter/pay_order?system_serial='+result.msg.system_serial
          /* self.payed(result.msg.system_serial);

                    MessageBox('提示', '交易成功！');
                    return;
                    self.$router.push({
                              path: '/order'
                         })
                         */
        } else {
          console.log(result.error)
        }
      })
    },
    createOrder_cancel () {
      const self = this
      let goodsInfoArr = [{
        'serial': self.carList[0].serial, 'goods_id': self.carList[0].id, 'num': self.num, 'stock_id': self.carList[0].stock_id
      }]
      let goodsInfo = JSON.stringify(goodsInfoArr)
      if (self.sendWay === 1) {
        self.query.address = 0
      }
      self.$store.dispatch('createOrder', {freight: self.carList[0].freight, shop_id: self.carList[0].shop_id, goods_info: goodsInfo, total_price: self.sumPayMoney, sale_price: self.sumPayMoney, real_price: self.sumPayMoney, pay_price: self.sumPayMoney, address_id: self.query.address, remark: self.carList[0].remark}).then(function (res) { // 广告
        let result = res.data
        if (result.code) {
          console.log(result)
          //  console.log(system_serial)

          // self.order_serial=result.system_serial;
          // self.payed(result.msg.system_serial);
          // console.log('addressOne');
          // console.log(result.msg);
          // self.address=result.msg.rows;
          MessageBox('提示', '未成功支付')
          //  return;
          self.$router.push({
            path: '/order'
          })
        } else {
          console.log(result.error)
        }
      })
    },
    checkedAddress () {
      const self = this
      self.$store.dispatch('addressOne', {a_id: self.query.address}).then(function (res) { // 广告
        let result = res.data
        if (result.code) {
          console.log('addressOne')
          console.log(result.msg)
          self.address = result.msg.rows
        } else {
          console.log(result.error)
        }
      })
    },
    defaultAddress () {
      const self = this
      self.$store.dispatch('defaultAddress').then(function (res) { // 广告
        let result = res.data
        if (result.code) {
          console.log('result.msgdefaultAddress ')
          console.log(result.msg)
          self.address = result.msg.rows
          self.query.address = self.address.a_id
        } else {
          console.log(result.error)
        }
      })
    },
    setCartList () { // 得到订单数据
      const self = this
      let text = self.$localStorage.get('oneGoodsForOrder')
      console.log(JSON.parse(text))
      self.carList = JSON.parse(text)
    },
    payConfirm () {
      const self = this
      // const isWechat = require('is-wechat')
      if (this.carList) { // 还未提交了订单,数据还未清空
        MessageBox
          .confirm(
            `确定支付${this.sumPayMoney}元`
          )
          .then(action => { // 点击成功执行这里的函数
            self.createOrder_sure('ALIPAY')
            /* console.log(isWechat());
            alert(isWechat());
            if(isWechat()){
              createOrder_sure('WEIXIN');
            }else{
              self.sheetVisible=true;
            } */
            // return;
            // self.createOrder_sure();
            // return;
            // self.payed();
            /* this.confirm = false;
            this.$store.commit('SET_LOADING', true);
            this.$store.dispatch('resetCarList'); //重置购物车（用unSelectedList替换）
            this.$store.dispatch('resetCount'); //重置购物车数量
            setTimeout(() => {
              this.$store.commit('SET_LOADING', false); //关闭loading
              this.confirm = true; //支付完成后切换视图
            }, 300) */
          }, function (err) {
            console.log(err)
            // 点击取消执行这里的函数
            // self.createOrder_cancel();
          })
      } else { // 提交了订单,数据清空
        // self.$router.go(-1);
        // self.createOrder_cancel();
        /*     self.$router.push({
                              path: '/order'
                         }) */
        // alert('请勿重复提交订单')
      }
    },
    payed (v) {
      const self = this
      let params = {
        // system_serial: self.order_serial,
        system_serial: v,
        status: 'PAYED'
      }
      self.$store.dispatch('updateOrderStatus', params).then(function (res) {
        if (+res.data.code === 1) {
          // self.$helper.bus.$emit('activeSuccess', 'activeSuccess');
          self.$router.push({
            path: '/order'
          })
          console.log('修改状态成功')
        } else {
          console.log('修改失败')
        }
      }).catch(function (fail) {
        console.log('fail', fail)
      })
    },
    getlocation () {
      document.getElementById('geoPage').contentWindow.postMessage('getLocation', '*')
    },
    successCallback (pos) {
      let self = this
      var crd = pos.coords
      console.log('Your current position is:')
      console.log(`Latitude : ${crd.latitude}`)
      console.log(`Longitude: ${crd.longitude}`)
      self.lat = crd.latitude
      self.lng = crd.longitude
      let param = {
        location: crd.latitude + ',' + crd.longitude,
        key: 'EVIBZ-LL5CS-P4ZOB-6NRPW-H7DRZ-LOBS7'
      }
      self.$store.dispatch('getCurrentPosition', param).then(function (res) {
        if (+res.data.status === 0) {
          self.address = res.data.result.address
        } else {
          console.log('定位失败')
        }
      })
    },
    handleLocationError (error) {
      switch (error.code) {
        case 0:
          console.log('获取位置信息出错！')
          break
        case 1:
          console.log('您设置了阻止该页面获取位置信息！')
          break
        case 2:
          console.log('浏览器无法确定您的位置！')
          break
        case 3:
          console.log('获取位置信息超时！')
          break
        default:
          console.log('不明原因')
          break
      }
    }
  }

}
</script>

<style lang="less" scoped>
  @import '../../../assets/fz.less';
  .numberop img{
    height: 20px ;
    width: 20px;
    margin:5px;
  }
  .numberop {
    font-size: 20px;
    line-height: 30px;
  }
  .numberop .one{
    border-left:1px solid #cccccc;
  }
  .numberop .last{
    border-right:1px solid #cccccc;
  }
  .numberop{
    margin-left: 15px;
    text-align: center;
    border:1px solid #cccccc;
  }
  .mint-cell-allow-right::after{
    width: 1.5vw;
    height: 1.5vw;
  }

.fan{
  margin-top: 5%;
  .f-span{
    padding-left: 4%;
  }
  .numberop{
    display: inline-block;
    margin-left: 47%;
    text-align: center;
    border:1px solid #cccccc;
  }
  .f-input{
    height: 12vw;
    text-indent: 8%;
    color: #999;
    font-size: 4.3vw;
    width: 80%;
  }
}
.fan1{
  text-align: right;
  margin-right: 4%;
  line-height: 8vw;
}
.mint-cell-wrapper{
  background-image: none;
}

.pay {
  width: 100%;
  background-color: #F7F7F7;
  .pay1{
    padding-top: 12%;
    height: 13vw;
    line-height: 13vw;
    .pay1-1{
      margin-left: 5%;
      padding: 0.5% 9%;
      font-size: 4vw;
      background-position: left center;
      background-size: 17% 100%;
    }
    .pay11{
      color: #333;
      background-image: url("/static/images/1gou.png");
      background-repeat: no-repeat;
    }
    .pay1-2{
      margin-left: 15.5%;
      padding: 0.5% 0 0.5% 9%;
      font-size: 4vw;
      background-position: left center;
      background-size: 12.5% 100%;
    }
    .pay12{
      color: #f74b27;
      background-image: url("/static/images/2gou.png");
      background-repeat: no-repeat;
    }
  }
  .huabian{
    height: 0.7vw;
    background: url("/static/images/huabian_02.jpg") repeat-x;
    background-size: 100% 100%;
  }
    .pay-address {
        background-color: #fff;
        border-bottom: 1*10vw/75 solid #DEDEDE;
        font-size: 4vw;
        padding: 2vw 4vw;
      .per-1{
        padding-left: 6%;
      }
        > div {
            p {
              padding-left: 6%;
                color: #868686;
                font-size: 4vw;
            }
        }

        > p {
            padding-left: 6%;
            color: #868686;
            font-size: 4vw;
            padding-top: 30*10vw/75;
            letter-spacing: 3*10vw/75;
            line-height: 45*10vw/75;
        }
    }
  .weizhi{
    padding: 0vw 2vw;
    background: url("/static/images/weizhi_03.png") no-repeat;
    background-size: 100% 100%;
    margin-right: 2%;
  }
    .pay-product {
        background-color: #fff;
        overflow: auto;
        margin-bottom: 5%;
        li {
            a {
                display: -webkit-flex;
                display: -ms-flex;
                display: flex;
                box-sizing: border-box;
                padding: 20*10vw/75 30*10vw/75;
                color: #4D4D4D;
                .fz(font-size,30px);
                border-bottom: 1*10vw/75 solid #DEDEDE;

                > img {
                    display: block;
                    width: 2.5*10vw;
                    height: 2.5*10vw;
                }

                > div {
                  padding-left: 3%;
                  width: 70%;
                  line-height: 1.5;
                  padding-top: 2%;
                    h2 {
                        padding-top: 0.09*10vw;
                        overflow: hidden;
                        word-break: keep-all;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        font-size: 4vw;
                    }

                    p {
                        text-align: right;
                        .fz(font-size,24px);
                        padding-top: 1.4*10vw;
                    }
                }
            }
        }
    }

    .pay-allpay {
      font-size: 4.2vw;
      color: #999999;
      text-align: center;
        i,
        span {
            color: #f74b27;
        }
      span{
        padding-right: 1%;
      }
    }
  .remark{
    font-size: 4.2vw;
    color: #666;
    text-align: center;
    i,
    /*span {*/
      /*color: #;*/
    /*}*/
    span{
      padding-right: 1%;
    }
  }
    .payfor{
      padding-bottom: 25vw;
    }
    .pay-footer {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
      /*  padding-bottom: 4vw;*/
        span {
            display: block;
            width: 92%;
            background-color: #f74b27;
            border-radius: 1.3vw;
            color: #fff;
            font-size: 17px;
            padding: 4vw;
            margin: 0 auto;
            text-align: center;
            &:active {
                background-color: @cl;
            }
        }

    }

    .pay-confirm {
        padding: 20px 0;
        background-color: @cl;
        text-align: center;
        color: #fff;
        line-height: 30px;
        .fz(font-size,40);
    }
}
</style>
