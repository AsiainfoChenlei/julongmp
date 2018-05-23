<template lang="html">
  <div class="main" >
    <v-header>
      <h1 slot="title">收货地址新增</h1>
    </v-header>
        <!-- tab-container -->
         <section style="padding-top: 12vw;">
        <mt-field label="收货人" placeholder="收货人" v-model="formData.address_name"></mt-field>
        <mt-field label="联系电话" placeholder="联系电话" type="tel" v-model="formData.address_phone"></mt-field>
        <mt-field label="所在区域" placeholder="省市区(县)" v-model="address" @click.native="showPicker" ></mt-field>
        <mt-field label="街道" placeholder="街道"  v-model="formData.street" ></mt-field>
        <mt-field label="详细地址" placeholder="详细地址" v-model="formData.address" ></mt-field>
        </section>
        <footer class="pay-footer" ontouchstrat="" @click="handleSubmit('addEdit')">
           <span>保存</span>
        </footer>
       <!-- <div>
        <button  class="mint-button" @click="handleSubmit('addEdit')" style="width:100%;background:#b91212;color:#fff;">保存</button>
        </div>-->
        <my-address :showAddressPicker="showAddressPicker" @save-address="saveAddress" @hide-picker="hidePicker" :init="address">
       </my-address>
  </div>
</template>

<script>

import Header from '@/components/common/_header.vue'
import MyAddress from '@/components/address-picker/Address.vue'
import { Toast } from 'mint-ui'
export default {
  components: {
    'v-header': Header,
    MyAddress
  },
  data () {
    return {
      datas: [],
      selected: '1',
      showAddressPicker: false,
      address: '湖北-武汉市-洪山区',
      formData: {}
    }
  },
  methods: {
    checkMobile (mobile) {
      let reg = /^1[3|4|5|6|7|8|9][0-9]{9}$/
      return reg.test(mobile)
    },
    handleSubmit (v) {
      const self = this
      let arr = [] // 定义一数组
      arr = self.address.split('-')
      self.formData.province = arr[0]
      self.formData.city = arr[1]
      self.formData.area = arr[2]
      console.log('arr')
      console.log(arr)
      if (self.formData.address_phone.length < 1 || self.formData.address_phone.length > 11 || !self.checkMobile(self.formData.address_phone)) {
        Toast('请输入正确的手机号')
        return false
      }
      // return;
      if (self.formData.address_name !== '' && self.formData.address_phone !== '' && self.address !== '' && self.formData.street !== '' && self.formData.address !== '') {
        self.$store.dispatch('addressAdd', self.formData).then(function (res) { // 广告
          console.log(res)
          // return;
          let result = res.data
          if (result.code) {
            Toast(result.msg)
            setTimeout(() => {
              self.$router.go(-1)
              /* self.$router.push({
                              path: '/address'
                         }) */
            }, 1000)
            // self.success(result.msg);
          } else {
            Toast(result.error[0])
            //       self.dis=true;
          }
        })
      } else {
        Toast('不能为空')
        // self.dis=true;
      }
    },
    hidePicker () {
      // 接受子组件关闭popup事件
      this.showAddressPicker = false
    },
    showPicker () {
      this.showAddressPicker = !this.showAddressPicker
    },
    saveAddress (val) {
      // 从子组件接受返回所选值 val
      this.address = val
      this.showAddressPicker = !this.showAddressPicker
    }
  }
}
</script>

<style lang="less" scoped>
.height {
    margin-top: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
.weui-cells {
    margin-top: 1.17647059em;
    background-color: #fff;
    line-height: 1.47058824;
    font-size: 17px;
    overflow: hidden;
    position: relative;
}
.weui-cell {
    padding: 10px 15px;
    position: relative;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
}
.weui-label {
    display: block;
    width: 105px;
    word-wrap: break-word;
    word-break: break-all;
}
  .main{

    .pay-footer {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      padding-bottom: 4vw;
      span {
        display: block;
        width: 85%;
        background-color: #f74b27;
        border-radius: 1.3vw;
        color: #fff;
        font-size: 17px;
        padding: 4vw;
        margin: 0 auto;
        text-align: center;
      }

    }
  }
</style>
