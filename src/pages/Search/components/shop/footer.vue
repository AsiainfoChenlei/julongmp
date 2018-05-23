<template lang="html">
  <footer class="footer">
    <div class="footer-index" @click="shop">
      <i class="icon-index"></i>
      <div>商铺</div>
    </div>
    <!--<router-link :to="{name:'商家首页'}" class="footer-index">
                <i class="icon-index"></i>
                <div>商铺</div>
              </router-link>-->
    <!--  <router-link  :to="{name:'购物车页'}" class="footer-gocar">
                <i class="icon-car"></i>
                <span v-if="count">{{count}}</span>
              </router-link>-->
    <a :href="QQurl" class="kefu"></a>
    <span class="footer-addcar" v-show="!co" @click="CoGoodsadd">
                &#9825;&nbsp;收藏
              </span>
    <span class="footer-addcar addcar-1" v-show="co" @click="CoGoodsDelete">
                &#10084;&nbsp;取消收藏
              </span>
    <!-- <span class="footer-addcar"   @click="addCart(view.shop_id,view.shop_name,view.id,1,0)">
                加入购物车
              </span>-->
    <span class="footer-addcar addcar2" @click="popvisible = true">
                立即购买
              </span>
    <mt-popup v-model="popvisible" position="bottom" class="mint-popup-1">
      <div class="pop-1">
        <div class="pop1-absolo">
          <img class="pop1-img" :src="$helper.getRealPicURL(view.stock[this.colSelected].images,+query.company_id,+query.shop_id,'wfellow_h410')" />
        </div>
        <div class="pop1-div">
          <!--<span class="pop1-span pop1-span1">￥{{view.min_price}}</span>-->
          <span class="pop1-span pop1-span1">价格：￥{{priceText}}</span>
          <span class="pop1-span pop1-span2">运费：￥{{view.stock[this.colSelected].freight}}</span>
          <span class="pop1-span pop1-span2">库存：{{view.description}}</span>
          <span class="pop1-span pop1-span3">已选：{{standardText}}</span>
        </div>
      </div>
      <div class="pop-2">
        <b>规格</b>
        <span class="f-span">备注:</span><input v-model="remarkVal" type="text" class="f-input" placeholder="给店家留言(大小尺码等)"/>
        <div class="pop2">
         <!-- <span class="pop2-color" v-for="(k,i) in view.stock" :class="{'color-active':i==firstselect}" @click="colChose(i)">{{k.standard}}</span>-->
              <span class="pop2-color" v-for="(k,i) in view.stock" :class="{'color-active':i==colSelected}" @click="colChose(i)">{{k.standard}}</span>
        </div>
      </div>
      <div class="paycar" @click="addOrder">立即结算</div>
    </mt-popup>
  </footer>
</template>

<script>
import {
  mapState
} from 'vuex'
import {
  MessageBox
} from 'mint-ui'
import {
  Toast
} from 'mint-ui'
export default {
  props: ['view', 'query'],
  data () {
    return {
      co: false,
      popvisible: false,
      // firstselect: 0,

      property: [],
      colSelected: 0
    }
  },
  computed: {
    QQurl () {
      // return "mqqwpa://im/chat?chat_type=wpa&amp;uin="+this.shopinfo.qq+"&amp;version=1";
      // return "http://wpa.qq.com/msgrd?v=3&uin="+this.shopinfo.qq+"&site=oicqzone.com&menu=yes"
      return 'mqqwpa://im/chat?chat_type=wpa&uin=' + this.view.shop_info.qq + '&version=1&src_type=web&web_src=oicqzone.com';
      //  return  "mqqwpa://im/chat?chat_type=wpa&uin=2211821490&version=1&src_type=web&web_src=oicqzone.com"
    },
    count () {
      console.log('count')
      //页面刷新后 数据会消失,解决:加判断
      if (this.$store.state.detail.count == '') {
        this.$store.commit('CHANGE_COUNT')
      }
      return this.$store.state.detail.count
    },
    productDatasView () {
      return this.$store.state.detail.productDatas.view
    },
    /*  colSelected() {
        return this.$store.state.detail.colSelected
      }, */
    sizeSelected () {
      return this.$store.state.detail.sizeSelected
    },
    ...mapState({
      // view: state => state.detail.productDatas.view,
      // colSelected: state => state.detail.colSelected,
      // sizeSelected: state => state.detail.sizeSelected,
      // 返回当前选择颜色的值(innerText)
      standardText () {
        console.log('standardText')
        if (this.property !== undefined) {
          if (this.colSelected < this.property.length && this.property[this.colSelected].standard) {
            return this.property[this.colSelected].standard
          }
        }
        return ''
      },
      // 返回当前选择规格的值(innerText)
      priceText () {
        console.log('priceText')
        if (this.property !== undefined) {
          if (this.colSelected < this.property.length && this.property[this.colSelected].price) {
            return this.property[this.colSelected].price
          }
        }
        return 0
      }
    })
  },
  mounted () {
    const self = this
    const token = self.$localStorage.get('TOKEN')
    self.$store.commit('CHANGE_COL_SELECTED', self.firstselect)
    self.$nextTick(function () {
    self.property = self.view.stock
    //  console.log('self.property');
    console.log(self.property)
    if (self.query.goods_id && token) {
    self.iSCoGoods()
        }
    })
  },
  methods: {
    colChose (i) {
      const self = this
      self.colSelected = i
      this.$store.commit('CHANGE_COL_SELECTED', i)
    },
    sizeChose (i) {
      this.$store.commit('CHANGE_SIZE_SELECTED', i)
    },
    doCoSuccess (r) {
      const self = this
      if (r === '0') {
        self.co = false
      } else {
        self.co = true
      }
    },
    iSCoGoods () {
      const self = this
      console.log('self.view')
      console.log(self.view)
      console.log('Footerself.query222222222222')
      console.log(self.query)
      self.$store.dispatch('iSCoGoods', {
        'good_id': self.query.goods_id
      }).then(function (res) {
        // self.$store.dispatch('iSCoGoods',{'good_id':self.view.id}).then(function (res) { //商品
        let result = res.data
        if (result.code) {
          console.log('iSCoSeller')
          console.log(result.msg)
          self.doCoSuccess(result.msg)
        } else {
          console.log(result.error)
        }
      })
    },
    CoGoodsadd () {
      const self = this
      console.log('self.view')
      console.log(self.view)
      console.log('self.query')
      console.log('footer')
      console.log(self.query)
      //return;
      self.$store.dispatch('CoGoodsadd', {
        'company_id': self.query.company_id,
        'shop_id': self.query.shop_id,
        'good_id': self.query.goods_id,
        'good_name': self.view.name,
        'good_pic': self.view.cover,
        'serial': self.view.serial,
        // 'good_addr': self.view.stock[0].price
        'good_money': self.view.min_price
      }).then(function (res) { // 商品
        let result = res.data
        if (result.code) {
          console.log('iSCoSeller')
          console.log(result.msg)
          self.co = true
          //self.doCoSuccess(result.msg)
        } else {
          Toast(result.error[0])
        }
      })
    },
    CoGoodsDelete () {
      const self = this
      console.log('self.view')
      console.log(self.view)
      console.log('self.query')
      console.log(self.query)
      //return;
      self.$store.dispatch('CoGoodsDelete', {
        'good_id': self.query.goods_id
      }).then(function (res) { // 商品
        let result = res.data
        if (result.code) {
          console.log('iSCoSeller')
          console.log(result.msg)
          self.co = false
          //self.doCoSuccess(result.msg)
        } else {
          Toast(result.error[0])
        }
      })
    },
    shop () {
      const self = this
      self.$router.push({name: '商家首页',
        query: {
          shop_id: self.view.shop_info.shop_id,
          company_id: self.view.shop_info.company_id,
          select: '2'
        }})
    },
    /* addOrder(){
          this.$router.push({
                      path: 'car/pay'
              })
       }, */
    addOrder () {
      const self = this
      const product = [{
        company_id: self.query.company_id,
        shop_id: self.query.shop_id,
        // shop_name: self.query.shop_name,
        shop_name: self.view.shop_info.shop_name,
        title: self.view.name,
        price: self.view.stock[this.colSelected].price,
        standard: self.view.stock[this.colSelected].standard,
        stock_id: self.view.stock[this.colSelected].id,
        col: self.colSelected,
        id: self.view.id,
        image_url: self.view.stock[this.colSelected].images,
        freight: self.view.stock[this.colSelected].freight,
        serial: self.view.serial,
        remark: self.remarkVal
        // choseBool:false
      }]
      self.$localStorage.set('oneGoodsForOrder', JSON.stringify(product))
      let text = self.$localStorage.get('oneGoodsForOrder')
      console.log(JSON.parse(text))
      location.assign('car.html');
      /* this.$router.push({
        path: 'car/pay'
      }) */
    },
    addCart (business_id, business_name, good_id, num, index) {
      console.log('addCart')
      const self = this
        //let goodlist=new Array();
        //let goodlist=[{"good_id":"27","index":"1","num":"2"}];
      self.$store.dispatch('addCart', {
        business_id: business_id,
        business_name: business_name,
        goods_list: JSON.stringify([{
          'good_id': good_id,
          'num': num,
          'index': index
        }])
      }).then(function (res) { // 广告
        let result = res.data
        if (result.code) {
          Toast('登录成功')
        } else {
          Toast(result.error)
        }
      })
    },
    addIntoCollection () {
      const self = this
      return;
    self.$store.dispatch('CoGoodsadd', {
       'good_id': self.view.id,
      'good_name': self.view.title,
        'good_pic': 'good_pic',
        'good_money': 100
      }).then(function (res) { // 商品
        let result = res.data
          if (result.code) {
          Toast(result.msg)
            console.log('result.msg')
            console.log(result.msg)
            // self.goods=result.msg.rows;
            // self.datas=result.msg;
            // self.property=JSON.parse(result.msg.property);
          } else {
          console.log(result.error)
        }
      })
    },
    addIntoCar () {
      //  mint-ui的弹出式提示框
      const product = [{
        title: this.productDatasView.title,
        price: this.productDatasView.price,
        size: this.productDatasView.chose[this.sizeSelected].size,
        col: this.productDatasView.chose[this.colSelected].col,
        id: this.productDatasView.id,
        imgPath: this.$store.state.detail.productDatas.swiper[0].imgSrc,
        choseBool: false
      }]
      MessageBox
        .confirm(
          `商品名称:${product[0].title}</br>` +
            `价格:${product[0].price}</br>` +
            `规格:${product[0].size}</br>` +
            `颜色:${product[0].col}</br>` +
            `商品ID:${product[0].id}</br>`
        )
        .then(action => { // 点击成功执行这里的函数
          this.$store.dispatch('setLocalCount', true)
          this.$store.dispatch('addCarList', product)
          Toast({
            message: '添加成功',
            duration: 1000
          })
        }, function (err) {})
    },
    chos (i) {
      this.firstselect = i
      this.$store.commit('CHANGE_COL_SELECTED', this.firstselect)
    }
  }
}
</script>

<style lang="less" scoped>
  @import '../../../../assets/fz.less';
  @import '../../../../assets/index/style.css';
  .footer {
    width: 100%;
    display: -webkit-flex;
    display: -ms-flex;
    display: flex;
    height: 14vw;
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: #ffffff;
    -moz-user-select: none;
    -webkit-user-select: none;
    .bt();
    .footer-index,
    .footer-gocar,
    .footer-addcar {
      text-align: center;
    }
    .footer-index {
      -webkit-flex: 3;
      -ms-flex: 3;
      flex: 3;
      height: 14vw;
      font-size: 3.7vw;
      padding-top: 1.5vw;
      border-right-color: #f7f7f7;
      border-right-style: solid;
      .fz(border-right-width, 1);
      i {
        font-size: 5vw;
      }
      &:active {
        background-color: #f1f1f1;
      }
    }
    .footer-gocar {
      position: relative;
      -webkit-flex: 3;
      -ms-flex: 3;
      flex: 3;
      height: 14vw;
      line-height: 14vw;
      padding-top: 1.6vw;
      span {
        height: 5.5vw;
        width: 5.5vw;
        line-height: 5.5vw;
        position: absolute;
        top: .5vw;
        right: 5.5vw;
        background-color: @cl;
        border-radius: 50%;
        color: #fff;
        .fz(font-size, 24);
      }
      &:active {
        background-color: #f1f1f1;
      }
      i {
        .fz(font-size, 48);
      }
    }
    .kefu {
      -webkit-flex: 1.7;
      -ms-flex: 1.7;
      flex: 1.7;
      /*line-height: 11vw;*/
      height: 9vw;
      text-align: center;
      color: #fff;
      background: url("/static/images/kefu.png") no-repeat;
      margin: auto 4% auto 0;
      background-size: 100% 100%;
    }
    .footer-addcar {
      -webkit-flex: 6;
      -ms-flex: 6;
      flex: 6;
      line-height: 14vw;
      height: 14vw;
      color: #fff;
      background-color: @cl;
      letter-spacing: .2vw;
      font-size: 3.7vw;
      &:active {
        background-color: #ff7d00;
      }
    }
    .addcar-1 {
      background-color: #ccc;
    }
    .addcar2 {
      background: linear-gradient(to bottom right, #FF8E00, #F74B27);
    }
    .mint-popup-1 {
      width: 100%;
      background: #fff;
      .pop-1 {
        position: relative;
        .pop1-absolo {
          position: absolute;
          width: 25vw;
          height: 24vw;
          top: -13%;
          left: 2%;
          text-align: center;
          line-height: 24vw;
          .pop1-img {
            padding: 1.5%;
            border-radius: 2vw;
            max-width: 100%;
            max-height: 100%;
            background: #fff;
          }
        }
        .pop1-div {
          width: 56%;
          margin-left: 34%;
          padding-top: 2%;
          padding-bottom: 4%;
          .pop1-span {
            display: block;
            padding-top: 2%;
            font-size: 3.7vw;
            color: #333;
          }
          .pop1-span1 {
            color: #f74b27;
          }
          .pop1-span2 {}
          .pop1-span3 {}
        }
      }
      .pop-2 {
        border-bottom: 0.03vw solid #ececec;
        margin: 4% 3% 21%;
        height: 50vw;
        overflow: scroll;
        b {
          font-size: 4.3vw;
          padding-bottom: 3%;
          display: inline-block;
        }
        .f-span{
          padding-left: 4%;
          font-size: 4vw;
        }
        .f-input{
          height: 6vw;
          text-indent: 3%;
          color: #999;
          font-size: 3.3vw;
          width: 70%;
          border: 1px solid #FF9800;
          margin-left: 3%;
        }
        .pop2 {
          .pop2-color {
            border: 0.07vw solid #333;
            padding: 1.5% 2%;
            border-radius: 9vw;
            font-size: 3.3vw;
            margin: 1.5% 2% 1.5% 0;
            display: inline-block;
            white-space: nowrap;
          }
          .color-active {
            color: #f74b27;
            border-color: #f74b27;
          }
        }
      }
      .paycar {
        background: #f74b27;
        width: 50%;
        font-size: 5vw;
        text-align: center;
        color: white;
        height: 10vw;
        line-height: 10vw;
        border-radius: 6vw;
        position: fixed;
        margin: auto 25%;
        bottom: 6vw;
      }
    }
  }
</style>
