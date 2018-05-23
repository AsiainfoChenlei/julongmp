<template>
  <div class="bottoms">
    <div v-if="type==1">
      <span class="span-2" @click="doActive('CANCEL')">取消订单</span>
      <span class="span-3" @click="doActive('PAYED')">去支付</span>
    </div>
    <div v-else-if="type==2">
      <!--<span class="span-2" @click="doActive('BUYERCANCEL')">取消订单</span>-->
      <span class="span-3" @click="doActive('RECEIVED')">确认收货</span>
    </div>
    <div v-else-if="type==3">
      <!-- <span class="span-2" @click="doActive('BUYERCANCEL')">取消订单</span>-->
      <span class="span-3" @click="doActive('RECEIVED')">确认收货</span>
    </div>
    <div v-else-if="type==4">
      <span class="span-3" @click="doActive('COMMENTED')">去评价</span>
    </div>
    <!--<div v-else-if="type==7"></div>
        <div v-else-if="type==8"></div>
        <div v-else-if="type==9"></div>
        <div v-else-if="type==10"></div>
        <div v-else-if="type==12"></div>-->
    <div v-else-if="type==13">
      <span class="span-2" @click="doActive('COMMENTED')">去评价</span>
    </div>
    <div v-else-if="type==14">
      <span class="span-3" @click="doActive('RECEIVED')">确认收货</span>
    </div>
    <div v-else-if="type==16">
      <span class="span-3" @click="doActive('RECEIVED')">确认收货</span>
    </div>
    <div v-else>
      <!--<span class="span-2" @click="doActive('DELIVAERYED')">提醒发货</span>
          <span class="span-2" @click="doActive('REFUNDED')">申请退款</span>-->
    </div>
    <!-- <div>
        <span class="span-3" @click="doActive('COMMENTED')">去评价</span>
      </div>-->
  </div>
</template>

<script>
import {
  MessageBox
} from 'mint-ui'
import Util from '../../../../../util/common'
export default {
  props: ['type', 'serial', 'className'],
  data () {
    return {
      isall: false,
      spinnerloading: false,
      imgPath: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511425212198&di=1d1760ece9c54f71e9bd5be50c6b2c49&imgtype=0&src=http%3A%2F%2Fimg.fuwo.com%2Fattachment%2F1608%2F03%2Fa5cb936658db11e6a40d00163e00254c.jpg',
      allowUpdate: true,
      shopContent: [],
      now_page: 1,
      page_size: 10
    }
  },
  methods: {
    doActive (order) {
      console.log(order, this.serial)
      const self = this
      //  self.$helper.bus.$emit('activeSuccess', 'activeSuccess');
      if (self.serial !== undefined && self.serial.length > 0) {
        if (order === 'PAYED') { // 跳到详情页
          window.location.href = Util.ajaxUrl + '/ucenter/pay_order?system_serial=' + self.serial
          /*  this.$router.push({
                      path: 'orderdetail?serial='+self.serial
                 }) */
          return
        }
        if (order === 'COMMENTED') { // 跳到详情页
          this.$router.push({
            path: 'commentadd?serial=' + self.serial
          })
          return
        }
        MessageBox.confirm('您确定吗？').then(action => {
          let params = {
            system_serial: self.serial,
            status: order
          }
          self.$store.dispatch('updateOrderStatus', params).then(function (res) {
            if (+res.data.code === 1) {
              // self.$helper.bus.$emit('activeSuccess', 'activeSuccess');
              console.log('修改状态成功')
              self.$emit('doActive', {
                'order': order,
                'serial': self.serial
              })
            } else {
              console.log('修改失败')
            }
          }).catch(function (fail) {
            console.log('fail', fail)
          })
        })
      }
    }
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
        width: 40%;
        .box-span {
          display: block;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          padding: 0.7vw 0;
        }
        .bs-1 {
          font-size: 5vw;
          color: #333;
        }
        .bs-2 {
          font-size: 4.2vw;
          color: #999;
        }
      }
      .box_detail_money {
        padding-top: 4vw;
        display: inline-block;
        width: 20%;
        .box-b {
          font-size: 4vw;
          padding-top: 4vw;
        }
        .box-num {
          text-align: right;
          width: 75%;
          padding-top: 2vw;
          font-size: 4.3vw;
        }
        .b-span {
          font-size: 5vw;
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
        padding-left: 3vw;
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
      .bottoms {
        height: 16vw;
        line-height: 16vw;
        display: flex;
        width: 40%;
        .span-2 {
          padding: 2vw 3vw;
          border: 0.3vw solid #333;
          color: #333;
          border-radius: 6vw;
          margin-right: 1.5vw;
          font-size: 3.3vw;
        }
        .span-3 {
          padding: 2vw 3vw;
          border: 0.3vw solid #f74b27;
          color: #f74b27;
          border-radius: 6vw;
          margin-right: 1.5vw;
          font-size: 3.3vw;
        }
      }
    }
  }
  .dark {
    color: #333;
    font-size: 4.5vw;
  }
</style>
