<template>
  <div class="apply">
    <v-header>
      <div class="aheader" slot="title">申请入驻</div>
    </v-header>
    <form class="apply-form">
      <div class="f-label"><label for="1">姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：</label><input id="1" type="text" v-model="username" /></div>
      <div class="f-label"><label for="2">电&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;话：</label><input id="2" type="text" v-model="mobile" /></div>
      <div class="f-label"><label for="3">法人/经营者：</label><input id="3" type="text" v-model="legal_person" /></div>
      <div class="f-label"><label for="4">门店名称：</label><input id="4" type="text" v-model="name" /></div>
      <div class="f-label"><label for="5">身份证号：</label><input id="5" type="text" v-model="id_number" /></div>
      <div class="f-label"><label for="6">营业执照：</label><input id="6" type="text" v-model="license" /></div>
      <div class="photo">
        <div class="p-li">
          <div class="p-span">营业执照：</div>
          <div class="p-img" @click="changeState(0)">
            <v-upload :choosedImageFile="choosedZZImage"></v-upload>
            <img v-if="imgKeys[0].showImage" class="preView" :src="imgKeys[0].url" />
          </div>
        </div>
        <div class="p-li">
          <div class="p-span">身份证正面照：</div>
          <div class="p-img" @click="changeState(1)">
            <v-upload :choosedImageFile="choosedSFImage"></v-upload>
            <img v-if="imgKeys[1].showImage" class="preView" :src="imgKeys[1].url" />
          </div>
        </div>
        <div class="p-li">
          <div class="p-span">身份证背面照：</div>
          <div class="p-img">+</div>
        </div>
      </div>
      <div class="m-photo">
        <div class="m-span">门店照：</div>
        <div class="m-img" @click="changeState(2)">
          <v-upload :choosedImageFile="choosedMM1Image"></v-upload>
          <img v-if="imgKeys[2].showImage" class="preView" :src="imgKeys[2].url" />
        </div>
        <div class="m-img" @click="changeState(3)">
          <v-upload :choosedImageFile="choosedMM2Image"></v-upload>
          <img v-if="imgKeys[3].showImage" class="preView" :src="imgKeys[3].url" />
        </div>
        <div class="m-img" @click="changeState(4)">
          <v-upload :choosedImageFile="choosedMM3Image"></v-upload>
          <img v-if="imgKeys[4].showImage" class="preView" :src="imgKeys[4].url" />
        </div>
      </div>
      <div class="f-label">
        <router-link :to="{ path:'/agreement_enter'}">
          《巨龙商城入驻协议》
        </router-link>
      </div>
      <div class="f-label">
        入驻客服微信:julongmall
      </div>
      <div class="sub" @click="apply">同意巨龙入驻协议并申请</div>
    </form>
  </div>
</template>

<script>
import Header from '../../../components/common/_header.vue'
import Upload from '../../../components/common/_upload.vue'
import {
  Toast
} from 'mint-ui'
export default {
  components: {
    'v-header': Header,
    'v-upload': Upload
  },
  data () {
    return {
      uploadToken: '',
      qiniuUrl: 'http://ozrdx2iqj.bkt.clouddn.com/', // 此为返回图片的域名前缀。self.qiniuUrl+ result.key=完整的图片
      action: 'http://up.qiniu.com', // 被上传的目标地址,
      /*    imgKeys: [{
          showImage: false,
          url: '',
          key:''
        }, {
          showImage: false,
          url: '',
          key:''
        }, {
          showImage: false,
          url: '',
          key:''
        }, {
          showImage: false,
          url: '',
          key:''
        }, {
          showImage: false,
          url: '',
          key:''
        }],
        username: '',
        mobile: '',
        legal_person: '',
        name: '',
        id_number: '',
        license: ''  */

      imgKeys: JSON.parse(this.$localStorage.get('APPLAY_imgKeys')),
      username: this.$localStorage.get('APPLAY_username'),
      mobile: this.$localStorage.get('APPLAY_mobile'),
      legal_person: this.$localStorage.get('APPLAY_legal_person'),
      name: this.$localStorage.get('APPLAY_name'),
      id_number: this.$localStorage.get('APPLAY_id_number'),
      license: this.$localStorage.get('APPLAY_license')
    }
  },
  watch: {
    id_number (value) {
      let self = this
      if (value.length === 18) {
        if (self.checkID(value) !== true) {
          Toast(self.checkID(value))
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
      let reg = /^1[3|4|5|7|6|8|9][0-9]{9}$/
      return reg.test(mobile)
    },
    apply () {
      let self = this
      if (self.username.length < 1) {
        Toast('请输入姓名')
        return false
      }
      if (self.name.length < 1) {
        Toast('请输入门店名')
        return false
      }
      if (self.mobile.length < 1 || self.mobile.length > 11 || !self.checkMobile(self.mobile)) {
        Toast('请输入正确的手机号')
        return false
      }
      if (self.legal_person.length < 1) {
        Toast('请输入法人姓名')
        return false
      }
      if (self.license.length < 1) {
        Toast('请输入营业执照号码')
        return false
      }
      if (self.id_number.length < 1 || self.id_number.length > 18 || self.checkID(self.id_number) !== true) {
        Toast('请输入正确的身份证号码')
        return false
      }
      let str = ''
      for (let index = 2; index < self.imgKeys.length; index++) {
        if (self.imgKeys[index].key) {
          str += self.imgKeys[index].key + ','
        }
      }
      if (!self.imgKeys[0].key) {
        Toast('营业执照为空')
        return false
      }
      if (!self.imgKeys[1].key) {
        Toast('身份证照为空')
        return false
      }
      if (str.length < 1) {
        Toast('图片为空')
        return false
      }

      let param = {
        user_id: self.username,
        name: self.name,
        mobile: self.mobile,
        license: self.license,
        legal_person: self.legal_person,
        show_imgs: str,
        license_img: self.imgKeys[0].key,
        idcard_front: self.imgKeys[1].key
      }
      self.$store.dispatch('addApply', param).then(function (res) {
        console.log(res)
      }).catch(function (err) {
        console.log(err)
      })
    },
    changeState (index) {
      let self = this
      self.imgKeys[+index].showImage = false
    },
    choosedZZImage (e) {
      let self = this
      self.uploadFileToQiniu(e, 0)
    },
    choosedSFImage (e) {
      let self = this
      self.uploadFileToQiniu(e, 1)
    },
    choosedMM1Image (e) {
      let self = this
      self.uploadFileToQiniu(e, 2)
    },
    choosedMM2Image (e) {
      let self = this
      self.uploadFileToQiniu(e, 3)
    },
    choosedMM3Image (e) {
      let self = this
      self.uploadFileToQiniu(e, 4)
    },
    getUpToken () {
      console.log('8888')
      const self = this
      return self.$store.dispatch('getUpToken', {})
    },
    uploadFileToQiniu (file, index) {
      let self = this
      console.log('upload')
      if (file != null) {
        // 构建表单
        // 上传
        self.getUpToken().then(function (res) {
          if (+res.data.code === 1) {
            self.token = res.data.msg
            const formData = new FormData()
            formData.append('token', self.token)
            formData.append('file', file)
            self.$store.dispatch('uploadImageTo7N', formData).then(function (res) {
              console.log(res)
              if (+res.status === 200) {
                self.imgKeys[+index].url = self.qiniuUrl + res.data.key
                self.imgKeys[+index].showImage = true
                self.imgKeys[+index].key = res.data.key
                console.log(self.imgKeys)
              } else {
                Toast('上传失败，重新上传')
              }
            }).catch(function (err) {
              console.log(err)
            })
          }
        })
      } else {
        this.error = '上传文件到七牛异常'
      }
    },
    removeLocalStorage () {
      const self = this
      self.$localStorage.remove('APPLAY_username')// 设置缓存
      self.$localStorage.remove('APPLAY_mobile')// 设置缓存
      self.$localStorage.remove('APPLAY_legal_person')// 设置缓存
      self.$localStorage.remove('APPLAY_id_number')// 设置缓存
      self.$localStorage.remove('APPLAY_name')// 设置缓存
      self.$localStorage.remove('APPLAY_id_number')// 设置缓存
      self.$localStorage.remove('APPLAY_license')// 设置缓存
      self.$localStorage.remove('APPLAY_imgKeys')// 设置缓存
    },
    setLocalStorage () {
      const self = this
      self.$localStorage.set('APPLAY_username', self.username)// 设置缓存
      self.$localStorage.set('APPLAY_mobile', self.mobile)// 设置缓存
      self.$localStorage.set('APPLAY_legal_person', self.legal_person)// 设置缓存
      self.$localStorage.set('APPLAY_id_number', self.id_number)// 设置缓存
      self.$localStorage.set('APPLAY_name', self.name)// 设置缓存
      self.$localStorage.set('APPLAY_id_number', self.id_number)// 设置缓存
      self.$localStorage.set('APPLAY_license', self.license)// 设置缓存
      self.$localStorage.set('APPLAY_imgKeys', JSON.stringify(self.imgKeys))// 设置缓存
    },
    timer () {
      const self = this
      self.setLocalStorage()
    }
  },
  mounted () {
    const self = this
    self.$nextTick(function () {
      setInterval(self.timer, 2000)
    })
  }
}
</script>

<style lang="less" scoped>
  .apply {
    .aheader {
      width: 100%;
      font-size: 4.4vw;
    }
    .apply-form {
      padding-top: 15%;
      .f-label {
        height: 10vw;
        line-height: 10vw;
        font-size: 4.2vw;
        margin-left: 4%;
        label {
          text-align: left;
          width: 30vw;
          display: inline-block;
        }
        input {
          margin-left: 3%;
          border: 0.1vw solid #dedbdb;
          height: 7vw;
          width: 63vw;
        }
      }
      .photo {
        width: 100%;
        margin-top: 5%;
        .p-li {
          width: 29%;
          display: inline-block;
          margin-left: 3.2%;
          vertical-align: middle;
          .p-span {
            font-size: 4vw;
          }
          .p-img {
            background: #f0f0f0;
            width: 28vw;
            height: 28vw;
            margin-top: 6%;
            position: relative;
            font-size: 17vw;
            line-height: 27vw;
            text-align: center;
            color: #CAC9C9;
            .preView {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              height: 100%;
            }
          }
        }
      }
      .m-photo {
        .m-span {
          font-size: 4vw;
          margin-top: 5%;
          margin-left: 4%;
        }
        .m-img {
          background: #f0f0f0;
          width: 28vw;
          height: 28vw;
          margin-left: 4%;
          margin-top: 5%;
          display: inline-block;
          font-size: 13vw;
          text-align: center;
          line-height: 28vw;
          color: #cac9c9;
          position: relative;
          .preView {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
          }
        }
      }
      .sub {
        font-size: 4.5vw;
        color: #fff;
        background: #f74b27;
        height: 10vw;
        line-height: 10vw;
        text-align: center;
        width: 66%;
        margin: 5% auto;
        border-radius: 6vw;
      }
    }
  }
</style>
