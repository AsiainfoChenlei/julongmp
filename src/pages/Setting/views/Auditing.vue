<template>
  <div class="auditing">
    <v-header>
      <div class="header" slot="title">申请入驻</div>
    </v-header>
    <div class="title" style="padding-top: 12%;"><span class="title-span">1</span>基本信息</div>
    <div class="f-label" style="padding-left: 7vw;padding-bottom: 3vw">
        <router-link :to="{ path:'/agenter'}">
          《巨龙商城入驻协议》
        </router-link>
      </div>
    <div class="content1">
      <div class="c-label"><label for="1"><span class='mustbe'>*</span>法人/经营者：</label><input id="1" type="text" placeholder="请输入您的姓名" v-model="legal_person" /></div>
      <div class="c-label"><label for="2"><span class='mustbe'>*</span>电&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;话：</label><input id="2" type="text" placeholder="请输入您的电话号码" v-model="mobile" /></div>
      <div class="c-label"><label for="3"><span class='mustbe'>*</span>身份证号：</label><input id="3" type="text" placeholder="请输入您的身份证号" v-model="id_number" /></div>
      <div class="c-label"><label for="4"><span class='mustbe'>*</span>营业执照：</label><input id="4" type="text" placeholder="请输入您的营业执照号" v-model="license" /></div>
      <div class="photo">
        <div class="p-li">
          <div class="p-span">营业执照：</div>
          <div class="p-img">
            <v-upload :onSuccessUpload="onSuccessUpload" :onErrorUpload="onErrorUpload" :autoUpload="true" :showImage="true" identifier="businesslicense">
              <div slot="tips" class="tips">+</div>
            </v-upload>
          </div>
        </div>
        <div class="p-li">
          <div class="p-span">身份证正面照：</div>
          <div class="p-img">
            <v-upload :onSuccessUpload="onSuccessUpload" :onErrorUpload="onErrorUpload" :autoUpload="true" :showImage="true" identifier="identitycardfront">
              <div slot="tips" class="tips">+</div>
            </v-upload>
          </div>
        </div>
        <div class="p-li">
          <div class="p-span">身份证背面照：</div>
          <div class="p-img">
            <v-upload :onSuccessUpload="onSuccessUpload" :onErrorUpload="onErrorUpload" :autoUpload="true" :showImage="true" identifier="identitycardback">
              <div slot="tips" class="tips">+</div>
            </v-upload>
          </div>
        </div>
      </div>
    </div>
    <div class="title"><span class="title-span">2</span>店铺信息</div>
    <div class="content2">
      <div class="content2-1">
        <v-upload :onSuccessUpload="onSuccessUpload" :onErrorUpload="onErrorUpload" :autoUpload="true" :showImage="true" identifier="shopImagesfirst">
          <div slot="tips">
            <span class="c2-1 c2-2">+ <span class='mustbe'>*</span>请上传您门面的正门图片</span>
            <span class="c2-1">( <span class="c2-3">招牌完整</span> )</span>
          </div>
        </v-upload>
      </div>
      <div class="content3">
        <div class="c-label"><label for="5"><span class='mustbe'>*</span>门店名称：</label><input id="5" type="text" placeholder="请输入您的门店名称" v-model="name" /></div>
        <div class="c-label"><label for="6"><span class='mustbe'>*</span>门店面积：</label><input id="6" type="text" placeholder="请输入您的门店面积" v-model="area" /></div>
        <div class="c-label"><label for="7"><span class='mustbe'>*</span>门店地址：</label><input id="7" class="i-address" type="text" :placeholder="icon" v-model="address" /></div>
        <div class="c3-photo">
          <div class="c3-span"><span class='mustbe'>*</span>门店照：</div>
          <div class="p-img">
            <v-upload :onSuccessUpload="onSuccessUpload" :onErrorUpload="onErrorUpload" :autoUpload="true" :showImage="true" identifier="shopImagessecond">
              <div slot="tips" class="tips">+</div>
            </v-upload>
          </div>
          <div class="p-img">
            <v-upload :onSuccessUpload="onSuccessUpload" :onErrorUpload="onErrorUpload" :autoUpload="true" :showImage="true" identifier="shopImagesthree">
              <div slot="tips" class="tips">+</div>
            </v-upload>
          </div>
          <div class="p-img">
            <v-upload :onSuccessUpload="onSuccessUpload" :onErrorUpload="onErrorUpload" :autoUpload="true" :showImage="true" identifier="shopImagesfour">
              <div slot="tips" class="tips">+</div>
            </v-upload>
          </div>
        </div>
      </div>

      <div class="content4">
        <div class="but button1" @click="apply">提交申请</div>
        <!--<div class="but button2">不通过</div>-->
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import Header from '../../../components/common/_header.vue'
import upload from '../../../components/common/_upload.vue'
import {
  Toast
} from 'mint-ui'
export default {
  components: {
    'v-header': Header,
    'v-upload': upload
  },
  data () {
    return {
      legal_person: this.$localStorage.get('APPLY_legal_person') ? this.$localStorage.get('APPLY_legal_person') : '',
      mobile: this.$localStorage.get('APPLY_mobile') ? this.$localStorage.get('APPLY_mobile') : '',
      id_number: this.$localStorage.get('APPLY_id_number') ? this.$localStorage.get('APPLY_id_number') : '',
      license: this.$localStorage.get('APPLY_license') ? this.$localStorage.get('APPLY_license') : '',
      license_img: this.$localStorage.get('APPLY_license_img') ? this.$localStorage.get('APPLY_license_img') : '',
      idcard_front: this.$localStorage.get('APPLY_idcard_front') ? this.$localStorage.get('APPLY_idcard_front') : '',
      idcard_back: this.$localStorage.get('APPLY_idcard_back') ? this.$localStorage.get('APPLY_idcard_back') : '',
      show_imgs: this.$localStorage.get('APPLY_show_imgs') ? this.$localStorage.get('APPLY_show_imgs') : '',
      infoImages: JSON.parse(this.$localStorage.get('APPLY_infoImages')) ? JSON.parse(this.$localStorage.get('APPLY_infoImages')) : ['', '', '', ''],
      name: this.$localStorage.get('APPLY_name') ? this.$localStorage.get('APPLY_name') : '',
      area: this.$localStorage.get('APPLY_area') ? this.$localStorage.get('APPLY_area') : '',
      address: this.$localStorage.get('APPLY_address') ? this.$localStorage.get('APPLY_address') : '',
      icon: '\u2708 请输入您的店铺地址',
      interval: null
    }
  },
  watch: {
    id_number (value) {
      let self = this
      if (value.length === 18) {
        if (self.checkID(value) !== true) {
          Toast('身份证输入有误,请重新输入')
        }
      } else if (value.length > 18) {
        Toast('请输入正确的身份证号')
      }
    },
    mobile (value) {
      let self = this
      if (value.length === 11) {
        if (!self.checkMobile(value)) {
          Toast('请输入正确的手机号码')
        }
      } else if (value.length > 11) {
        Toast('请输入11位的手机号码')
      }
    }
  },
  methods: {
    onSuccessUpload (url, key, identifier) {
      let self = this
      switch (identifier) {
        case 'businesslicense':
          self.license_img = key.length > 10 ? key : ''
          break
        case 'identitycardfront':
          self.idcard_front = key.length > 10 ? key : ''
          break
        case 'identitycardback':
          self.idcard_back = key.length > 10 ? key : ''
          break
        case 'shopImagesfirst':
          self.infoImages[0] = key.length > 10 ? key : ''
          break
        case 'shopImagessecond':
          self.infoImages[1] = key.length > 10 ? key : ''
          break
        case 'shopImagesthree':
          self.infoImages[2] = key.length > 10 ? key : ''
          break
        case 'shopImagesfour':
          self.infoImages[3] = key.length > 10 ? key : ''
          break
        default:
          break
      }
    },
    onErrorUpload (err) {
      console.log(err)
      Toast('上传失败请稍后尝试')
    },
    apply () {
      let self = this
      // self.removeLocalStorage();
      if (self.legal_person.length < 1) {
        Toast('请输入法人/经营者姓名')
        return false
      }
      if (self.mobile.length < 1 || self.mobile.length > 11 || !self.checkMobile(self.mobile)) {
        Toast('请输入正确的手机号')
        return false
      }
      if (self.id_number.length < 1 || self.id_number.length > 18 || self.checkID(self.id_number) !== true) {
        Toast('请输入正确的身份证号码')
        return false
      }
      if (self.license.length < 1) {
        Toast('请输入营业执照号码')
        return false
      }
      if (self.name.length < 1) {
        Toast('请输入门店名')
        return false
      }
      if (self.area.length < 1) {
        Toast('请输入门店面积')
        return false
      }
      if (self.address.length < 1) {
        Toast('请输入门店地址')
        return false
      }
      let str = ''
      for (let index = 0; index < self.infoImages.length; index++) {
        if (self.infoImages[index].length > 0) {
          str += self.infoImages[index] + ','
        }
      }
      if (self.infoImages[0].length < 1) {
        Toast('正门图片为空')
        return false
      }
      if (self.infoImages[1].length < 1) {
        Toast('店铺其他图片不完整需上传3张')
        return false
      }
      if (self.infoImages[2].length < 1) {
        Toast('店铺其他图片不完整需上传3张')
        return false
      }
      if (self.infoImages[3].length < 1) {
        Toast('店铺其他图片不完整需上传3张')
        return false
      }
      if (str.length < 1) {
        Toast('图片为空')
        return false
      }
      let param = {
        name: self.name,
        mobile: self.mobile,
        license: self.license,
        legal_person: self.legal_person,
        show_imgs: str,
        license_img: self.license_img,
        idcard_back: self.idcard_back,
        idcard_front: self.idcard_front,
        id_number: self.id_number,
        size: self.area,
        address: self.address
      }
      self.$store.dispatch('businessApply', param).then(function (res) {
        console.log(res)

        let result = res.data
        if (result.code) {
          Toast(result.msg)
          self.removeLocalStorage()
          setTimeout(() => { // 此为我的页面
            location.assign('setting.html#/auditingstatus')
          }, 1000)
        } else {
          Toast(result.error[0])
        }
      }).catch(function (err) {
        console.log(err)
      })
    },
    checkID (ID) {
      if (typeof ID !== 'string') return '非法字符串'
      let city = {
        11: '北京',
        12: '天津',
        13: '河北',
        14: '山西',
        15: '内蒙古',
        21: '辽宁',
        22: '吉林',
        23: '黑龙江 ',
        31: '上海',
        32: '江苏',
        33: '浙江',
        34: '安徽',
        35: '福建',
        36: '江西',
        37: '山东',
        41: '河南',
        42: '湖北 ',
        43: '湖南',
        44: '广东',
        45: '广西',
        46: '海南',
        50: '重庆',
        51: '四川',
        52: '贵州',
        53: '云南',
        54: '西藏 ',
        61: '陕西',
        62: '甘肃',
        63: '青海',
        64: '宁夏',
        65: '新疆',
        71: '台湾',
        81: '香港',
        82: '澳门',
        91: '国外'
      }
      let birthday = ID.substr(6, 4) + '/' + Number(ID.substr(10, 2)) + '/' + Number(ID.substr(12, 2))
      let d = new Date(birthday)
      let newBirthday = d.getFullYear() + '/' + Number(d.getMonth() + 1) + '/' + Number(d.getDate())
      let currentTime = new Date().getTime()
      let time = d.getTime()
      let arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
      let arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']
      let sum = 0
      let i
      let residue
      if (!/^\d{17}(\d|x)$/i.test(ID)) return '非法身份证'
      if (city[ID.substr(0, 2)] === undefined) return '非法地区'
      if (time >= currentTime || birthday !== newBirthday) return '非法生日'
      for (i = 0; i < 17; i++) {
        sum += ID.substr(i, 1) * arrInt[i]
      }
      residue = arrCh[sum % 11]
      if (residue !== ID.substr(17, 1)) return '非法身份证哦'
      console.log(city[ID.substr(0, 2)] + ',' + birthday + ',' + (ID.substr(16, 1) % 2 ? ' 男' : '女'))
      return true
    },
    checkMobile (mobile) {
      let reg = /^1[3|4|5|6|7|8|9][0-9]{9}$/
      return reg.test(mobile)
    },

    removeLocalStorage () {
      const self = this
      self.$localStorage.remove('APPLY_legal_person')// 设置缓存
      self.$localStorage.remove('APPLY_mobile')// 设置缓存
      self.$localStorage.remove('APPLY_id_number')// 设置缓存
      self.$localStorage.remove('APPLY_license')// 设置缓存
      self.$localStorage.remove('APPLY_license_img')// 设置缓存
      self.$localStorage.remove('APPLY_idcard_front')// 设置缓存
      self.$localStorage.remove('APPLY_idcard_back')// 设置缓存
      self.$localStorage.remove('APPLY_show_imgs')// 设置缓存
      self.$localStorage.remove('APPLY_name')// 设置缓存
      self.$localStorage.remove('APPLY_area')// 设置缓存
      self.$localStorage.remove('APPLY_address')// 设置缓存,
      self.$localStorage.remove('APPLY_infoImages')// 设置缓存
    },
    setLocalStorage () {
      const self = this
      self.$localStorage.set('APPLY_legal_person', self.legal_person)// 设置缓存
      self.$localStorage.set('APPLY_mobile', self.mobile)// 设置缓存
      self.$localStorage.set('APPLY_id_number', self.id_number)// 设置缓存
      self.$localStorage.set('APPLY_license', self.license)// 设置缓存
      self.$localStorage.set('APPLY_license_img', self.license_img)// 设置缓存
      self.$localStorage.set('APPLY_idcard_front', self.idcard_front)// 设置缓存
      self.$localStorage.set('APPLY_idcard_back', self.idcard_front)// 设置缓存
      self.$localStorage.set('APPLY_show_imgs', self.show_imgs)// 设置缓存
      self.$localStorage.set('APPLY_name', self.name)// 设置缓存
      self.$localStorage.set('APPLY_area', self.area)// 设置缓存
      self.$localStorage.set('APPLY_address', self.address)// 设置缓存
      console.log(self.infoImages)
      self.$localStorage.set('APPLY_infoImages', JSON.stringify(self.infoImages))// 设置缓存
    },
    timer () {
      const self = this
      self.setLocalStorage()
    }
  },
  beforeDestroy () {
    clearInterval(this.interval)
  },
  mounted () {
    const self = this
    self.$nextTick(function () {
      self.interval = setInterval(self.timer, 2000)
    })
  }
}
</script>

<style lang="less" scoped>
  .auditing {
    background: #F3F3F3;
    min-height: 100%;
    padding-bottom: 0.1%;
    .header {
      width: 100%;
      font-size: 4.5vw;
    }
    .title {
      height: 13vw;
      line-height: 13vw;
      color: #333;
      font-size: 3.8vw;
      .title-span {
        border-radius: 50%;
        background: #f74b27;
        padding: 1vw 2.2vw 1.1vw 2vw;
        color: #F3f3f3;
        margin-left: 7%;
        margin-right: 3%;
        font-size: 3.5vw;
      }
    }
    .mustbe{
      color:red;
    }
    .c-label {
      font-size: 4vw;
      height: 13vw;
      line-height: 13vw;
      border-bottom: 0.1vw solid #e5e5e5;
      label {
        display: inline-block;
        text-align: left;
        width: 30%;
        padding-left: 9%;
      }
      input {
        font-size: 3.7vw;
      }
    }
    .content1 {
      background: #fff;
      .photo {
        margin-left: 3.5%;
        padding-bottom: 4%;
        margin-top: 4%;
        .p-li {
          width: 31%;
          display: inline-block;
          margin-right: 1.2%;
          .p-span {
            font-size: 3.8vw;
            color: #333;
            height: 10vw;
            line-height: 10vw;
            letter-spacing: 0.3vw;
          }
          .p-img {
            background: #f0f0f0;
            width: 28vw;
            height: 28vw;
            margin-top: 5%;
            display: inline-block;
            font-size: 13vw;
            text-align: center;
            line-height: 28vw;
            color: #cac9c9;
            position: relative;
            .tips {
              position: absolute;
            }
          }
        }
      }
    }
    .content2 {
      .content2-1 {
        height: 45vw;
        background: #EEE;
        text-align: center;
        .c2-1 {
          font-size: 4vw;
          display: block;
          line-height: 1.7;
        }
        .c2-2 {
          padding-top: 16%;
        }
        .c2-3 {
          color: #f74b27;
        }
      }
    }
    .content3 {
      background: #fff;
      padding: 2% 0 3%;
      .c3-span {
        text-align: center;
        font-size: 4vw;
        height: 10vw;
        line-height: 10vw;
      }
      .p-img {
        background: #f0f0f0;
        width: 28vw;
        height: 28vw;
        margin-top: 2%;
        display: inline-block;
        font-size: 13vw;
        text-align: center;
        line-height: 28vw;
        color: #cac9c9;
        margin-left: 3%;
        .tips {
          position: absolute;
        }
      }
    }
    .content4 {
      font-size: 4vw;
      color: #fff;
      .but {
        height: 10vw;
        margin: 5% auto;
        line-height: 10vw;
        text-align: center;
        width: 85%;
        border-radius: 1vw;
      }
      .button1 {
        background: #00DA86;
      }
      .button2 {
        background: #CC0D10;
      }
    }
  }
</style>
