<template>
  <div v-infinite-scroll="loadMore" infinite-scroll-disabled="allLoad" infinite-scroll-distance="10">
    <div v-for="item in shopContent" :key="item.shop_info.shop_name">
      <div class="box">
        <div class="box_buiness">
          <p class="box_buiness_left dark"><img scr="">{{item.shop_info.shop_name}}</p>
          <p class="box_buiness_right">{{item.status}}</p>
        </div>
        <div class="box_top" v-for="(val,index) in item.goods_info" @click="orderdetail(item.system_serial)" :key="index">
          <div class="box_thumb"><img v-bind:src="$helper.getRealPicURL(val.stock.images,+item.shop_info.company_id,+item.shop_info.id)" alt=""></div>
          <div class="box_detail_desc">
            <span class="dark box-span bs-1">{{val.name}}</span>
            <span class="box-span bs-2">规格：{{val.stock.title}}</span>
            <!-- <span class="box-span bs-2">备注：{{val.stock[0].standard}}</span>-->
          </div>
          <div class="box_detail_money">
            <b class="box-b">￥<span class="b-span">{{val.stock.price}}</span></b>
            <p class="box-num">*{{val.num}}</p>
          </div>
        </div>
        <div class='bottoms' style="margin: 2vw 2vw;">备注:{{item.remark}}</div>
        <div class='box_bottom'>
          <span class="span-1">合计：{{item.pay_price}}</span>

          <div class="bottoms_box">
            <div><span class="span-13" @click="delayt(item.system_serial)" v-if="item.can_delay==1">延迟收货</span></div>
            <v-order :type="+item.status_code" :serial="item.system_serial" v-on:doActive="activeSuccess"></v-order>
          </div>
          <mt-popup
            v-model="popupVisible"
            position="bottom">
            <mt-button type="default" @click="delay()" style="border:none;float:right;font-size:4vw;">确定</mt-button>
             <mt-picker style="width:100%;" :slots="slots" @change="onValuesChange"></mt-picker>
          </mt-popup>
        </div>
      </div>
    </div>
    <div class="spinner-center">
      <mt-spinner v-show="!allLoad" type="triple-bounce" :size="50"></mt-spinner>
    </div>
  </div>
</template>

<script>
import {
  Spinner, Popup, Picker, MessageBox, Toast
} from 'mint-ui'
import OrderBtn from './activebutton.vue'
export default {
  components: {
    'v-spinner': Spinner,
    'v-order': OrderBtn,
    'v-popup': Popup,
    'v-picker': Picker
  },
  props: ['shopid', 'selected', 'id'],
  data () {
    return {
      slots: [
        {
          flex: 1,
          values: ['一周', '二周', '三周', '四周', '五周', '六周', '七周', '八周', '九周'],
          className: 'slot1'
        }],
      popupVisible: false,
      allLoad: false,
      imgPath: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511425212198&di=1d1760ece9c54f71e9bd5be50c6b2c49&imgtype=0&src=http%3A%2F%2Fimg.fuwo.com%2Fattachment%2F1608%2F03%2Fa5cb936658db11e6a40d00163e00254c.jpg',
      allowUpdate: true,
      shopContent: [],
      now_page: 1,
      page_size: 10,
      extra: 0,
      serial: '',
      auto_finished_at: ''
    }
  },
  watch: {
    selected (value) {
      let self = this
      if (+value === +self.id && self.shopContent.length < 1) {
        // 加载数据
        console.log('loadMore')
        self.loadMore()
      }
    }
  },
  methods: {
    onValuesChange: function (picker, values) {
      let self = this
      self.getextra(values[0])
      console.log(self.extra)
    },
    getextra (n) {
      let self = this
      switch (n) {
        case '一周':
          self.extra = 1
          break
        case '二周':
          self.extra = 2
          break
        case '三周':
          self.extra = 3
          break
        case '四周':
          self.extra = 4
          break
        case '五周':
          self.extra = 5
          break
        case '六周':
          self.extra = 6
          break
        case '七周':
          self.extra = 7
          break
        case '八周':
          self.extra = 8
          break
        case '九周':
          self.extra = 9
          break
        default:
          self.extra = 0
      }
    },
    orderdetail (v) {
      this.$router.push({
        path: 'orderdetail?serial=' + v
      })
    },
    activeSuccess (msg) {
      console.log('activeSuccess1111111')
      console.log('activeSuccess1111111', msg)
      const self = this
      if (+self.id === +self.selected) {
        self.now_page = 1
        self.allLoad = false
      }
      self.setActive()
    },
    // 计算时间相差
    dateDif (enddate) {
      const self = this
      let date = enddate * 1000 - new Date().getTime()
      console.log(date)
      let days = date / 1000 / 60 / 60 / 24
      let daysRound = Math.floor(days)
      let hours = date / 1000 / 60 / 60 - (24 * daysRound)
      let hoursRound = Math.floor(hours)
      let minutes = date / 1000 / 60 - (24 * 60 * daysRound) - (60 * hoursRound)
      let minutesRound = Math.floor(minutes)
      let seconds = date / 1000 - (24 * 60 * 60 * daysRound) - (60 * 60 * hoursRound) - (60 * minutesRound)
      let secondsRound = Math.floor(seconds)
      let time = '倒计时:' + (daysRound + '天' + hoursRound + '时' + minutesRound + '分' + secondsRound + '秒')
      console.log(time)
      self.auto_finished_at = time
    },
    // 定时器
    run (enddate) {
      const self = this
      let time = 1000
      setInterval(function () {
        self.dateDif(enddate)
      }, 500, time)
    },

    loadMore () {
      const self = this
      if (+self.id !== +self.selected) {
        return false
      }
      if (self.allLoad) {
        return false
      }
      setTimeout(() => {
        self.setActive()
      }, 500)
    },
    setActive () {
      const self = this
      console.log('self.shopid')
      console.log(self.shopid)
      if (+self.selected === +self.id && !self.allLoad) {
        self.$store.dispatch('getOrderByType', {
          'type': self.shopid,
          'now_page': self.now_page,
          'page_size': self.page_size
        }).then(function (res) { // 广告
          let result = res.data
          // console.log(result.msg);
          if (result.code) {
            if (self.now_page === 1) {
              self.shopContent = []
            }
            self.shopContent = self.shopContent.concat(result.msg.rows)
            console.log('gggggg', self.id)
            if (+result.msg.pagination.total_count <= self.shopContent.length) {
              self.allLoad = true
            } else {
              self.now_page++
            }
            // self.stock=result.msg.stock;
            // self.stock=JSON.parse(result.msg.stock);
          } else {
            console.log(result.error)
          }
        }).catch(function (fail) {
          console.log(fail)
        })
      }
    },
    delayt (serial) {
      const self = this
      self.extra = 1
      self.popupVisible = true
      self.serial = serial
    },
    // 延迟收货
    delay () {
      const self = this
      MessageBox.confirm('您确定吗？').then(action => {
        let params = {
          system_serial: self.serial,
          status: 'DELAY',
          extra: self.extra
        }
        self.popupVisible = false
        self.$store.dispatch('updateOrderStatus', params).then(function (res) {
          this.$router.replace({path: '/Order', query: {selected: self.selected}})
        }).catch(function (fail) {
          console.log('fail', fail)
        })
      })
    },
    addCart (businessID, businessName, goodID, num, index) {
      console.log('addCart')
      const self = this
      // let goodlist=new Array();
      // let goodlist=[{"good_id":"27","index":"1","num":"2"}];
      self.$store.dispatch('addCart', {
        business_id: businessID,
        business_name: businessName,
        goods_list: JSON.stringify([{
          'good_id': goodID,
          'num': num,
          'index': index
        }])
      }).then(function (res) { // 广告
        console.log(res)
        // return;
        let result = res.data
        if (result.code) {
          Toast('登录成功')
          console.log(result.msg)
        } else {
          Toast(result.error)
          //       self.dis=true;
        }
      })
    }
  },

  mounted () {
    const self = this
    // let r=self.$helper.getRealPicURL('@QINIU:julong@a@2018/1/13/1515855362095.jpg',1,1);
    // console.log('r');
    // console.log(r);
    //  self.param();
    // this.$store.dispatch('setDatas');
    // self.$helper.bus.$on( "activeSuccess", function (msg) {    //关闭上传
    //        console.log('activeSuccess');
    //        console.log(msg);
    //        self.setActive();
    // } );
    // 这里可以先加载第一个数据 或者不加载 页面出现的时候loadMore或被自动调用
    // console.log(new Date().getTime());
    self.setActive()
  }
}
</script>

<style lang="less" scoped>
  .box {
    width: 100%;
    height: auto;
    margin: 5vw auto;
    border-bottom: 1px solid #ccc;
    .box_buiness {
      height: 5vw;
      margin-left: 4vw;
      .box_buiness_left {
        float: left;
      }
      .box_buiness_right {
        float: right;
        margin-right: 4vw;
      }
    }
    .box_top {
      height: 32vw;
      width: 100%;
      margin: 0 auto;
      overflow: hidden;
      .box_thumb {
        margin: 10px;
        >img {
          width: 35%;
          float: left;
        }
      }
      .box_detail_desc {
        float: left;
        width: 35%;
        .box-span {
          display: block;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          padding: 0.7vw 2vw;
        }
        .bs-1 {
          font-size: 4.5vw;
          color: #333;
          padding-top: 10%;
        }
        .bs-2 {
          font-size: 4.2vw;
          color: #999;
        }
      }
      .box_detail_money {
        padding-top: 4vw;
        display: inline-block;
        width: 23%;
        margin-left: 2%;
        text-align: right;
        .box-b {
          font-size: 4vw;
          padding-top: 4vw;
        }
        .box-num {
          text-align: right;
          padding-top: 2vw;
          font-size: 4.3vw;
        }
        .b-span {
          font-size: 4.3vw;
        }
        .detele {
          text-decoration: line-through;
        }
      }
    }
    .box_bottom {
      height: 20vw;
      margin-right: 5px;
      .span-1 {
        display: inline-block;
        height: 16vw;
        line-height: 16vw;
        padding-left: 4vw;
        font-size: 4.5vw;
      }
      .mint-button {
        font-size: 13px;
        height: 28px;
      }
      >p {
        margin-bottom: 8px;
        float: right;
      }
       .bottoms_box{
               float: right;
              height: 16vw;
              line-height: 16vw;
              width: 63%;
              display: flex;
              .span-13 {
                padding: 2vw 3vw;
                border: 0.3vw solid #f74b27;
                color: #f74b27;
                border-radius: 6vw;
                margin-right: 2vw;
                font-size: 3.3vw;
              }
        }
      .bottoms {
        float: right;
        height: 16vw;
        line-height: 16vw;
        width: 64% !important;
        .span-2 {
          padding: 2vw 3vw;
          border: 0.3vw solid #333;
          color: #333;
          border-radius: 6vw;
          margin-right: 2vw;
          font-size: 4vw;
        }

        .span-3 {
          padding: 2vw 3vw;
          border: 0.3vw solid #f74b27;
          color: #f74b27;
          border-radius: 6vw;
          margin-right: 2vw;
          font-size: 4vw;
        }

      }
    }
  }
  .spinner-center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .dark {
    color: #333;
    font-size: 4.5vw;
  }
</style>
<style>
  .mint-popup-bottom{
    width: 100%;
  }
</style>
