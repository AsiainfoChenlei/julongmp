<template>
  <div class="applyshop">
    <iframe id="geoPage" allow="geolocation" width=0 height=0 frameborder=0 style="display:none;" scrolling="no" src="https://apis.map.qq.com/tools/geolocation?key=EVIBZ-LL5CS-P4ZOB-6NRPW-H7DRZ-LOBS7&referer=yuconora">
    </iframe>
    <v-header class="asheader">
      <div class="aheader" slot="title">申请开店</div>
      <!-- <i class="icon-set" @click="getlocation" slot="right"></i> -->
    </v-header>
    <form class="apply-form">
      <div class="section1">
        <div class="tips">店铺门面照</div>
        <div class="uploadContainer">
          <v-upload :onSuccessUpload="onSuccessUpload" :onErrorUpload="onErrorUpload" :autoUpload="true" :showImage="true">
            <div slot="tips" class="uploadtips">+</div>
          </v-upload>
        </div>
      </div>
      <div class="section2">
        <div class="iputter">
          <input placeholder="请输入店铺名" v-model="shop_name" />
        </div>
        <div class="iputter">
          <input placeholder="请输入店铺地址" v-model="addressWrite" />
        </div>
        <div class="iputter">
          <input placeholder="管理员账号(用于商户app登录,需牢记)" v-model="manager" />
        </div>
        <div class="iputter">
          <input placeholder="密码(用于商户app登录,需牢记)" type="password" v-model="password" />
        </div>
        <div class="iputter">
          <input placeholder="请输入QQ号" v-model="qq" />
        </div>
        <div class="iputter">
          <input placeholder="请输入支付宝号" v-model="alipay" />
        </div>
      </div>
      <div class="section3">
        <label style="display:none" class="locationMap" id="getlocation"></label>
        <label class="location" id="showValue">{{address}}</label>
        <div class="pickAddress">
          <select class="select" v-model="circle">
                    <option disabled value="">商圈选择</option>
                    <option v-for="item in options1" :value="item" :key="item.name">{{item.name}}</option>
                  </select>
        </div>
      </div>
      <div class="section4">
        <div class="category1">
          <select class="select" v-model="category_1">
                    <option disabled value="">请选择开店一级类别</option>
                    <option v-for="item in options" :value="item" :key="item.label">{{item.label}}</option>
                  </select>
        </div>
        <div class="category2">
          <select class="select" v-model="second_1">
                    <option disabled value="">二级类别</option>
                    <option v-if="category_1.children" v-for="item in category_1.children" :key="item.label" :value="item">{{item.label}}</option>
                  </select>
        </div>
      </div>
      <div class="section4">
        <div class="category1">
          <select class="select" v-model="category_2">
                    <option disabled value="">请选择开店一级类别</option>
                    <option v-for="item in options" :value="item" :key="item.label">{{item.label}}</option>
                  </select>
        </div>
        <div class="category2">
          <select class="select" v-model="second_2">
                    <option disabled value="">二级类别</option>
                    <option v-if="category_2.children" v-for="item in category_2.children" :key="item.label" :value="item">{{item.label}}</option>
                    </select>
        </div>
      </div>
      <div class="section4">
        <div class="category1">
          <select class="select" v-model="category_3">
                    <option disabled value="">请选择开店一级类别</option>
                    <option v-for="item in options" :value="item" :key="item.label">{{item.label}}</option>
                  </select>
        </div>
        <div class="category2">
          <select class="select" v-model="second_3">
                    <option disabled value="">二级类别</option>
                    <option v-if="category_3.children" v-for="item in category_3.children" :key="item.label" :value="item">{{item.label}}</option>
                  </select>
        </div>
      </div>
      <div class="section4">
        <div class="category1">
          <select class="select" v-model="category_4">
                    <option disabled value="">请选择开店一级类别</option>
                    <option v-for="item in options" :value="item" :key="item.label">{{item.label}}</option>
                  </select>
        </div>
        <div class="category2">
          <select class="select" v-model="second_4">
                    <option disabled value="">二级类别</option>
                    <option v-if="category_4.children" v-for="item in category_4.children" :key="item.label" :value="item">{{item.label}}</option>
                  </select>
        </div>
      </div>
      <div class="section4">
        <div class="category1">
          <select class="select" v-model="category_5">
                    <option disabled value="">请选择开店一级类别</option>
                    <option v-for="item in options" :value="item" :key="item.label">{{item.label}}</option>
                  </select>
        </div>
        <div class="category2">
          <select class="select" v-model="second_5">
                    <option disabled value="">二级类别</option>
                    <option v-if="category_5.children" v-for="item in category_5.children" :key="item.label" :value="item">{{item.label}}</option>
                  </select>
        </div>
      </div>
      <div class="section5">
        <label class="tip">(最多选五个)</label>
      </div>
    </form>
    <div class="but">
      <div class="button1" @click="apply">申请</div>
    </div>
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
      query: {},
      circle: '',
      category_1: '',
      second_1: '',
      category_2: '',
      second_2: '',
      category_3: '',
      second_3: '',
      category_4: '',
      second_4: '',
      category_5: '',
      second_5: '',
      address: '请上传定位',
      addressWrite: this.$localStorage.get('APPLY_addressWrite') ? this.$localStorage.get('APPLY_addressWrite') : '',
      position: null,
      options1: [],
      options: [],
      lat: 0,
      lng: 0,
      interval: null,
      face: this.$localStorage.get('APPLY_face') ? this.$localStorage.get('APPLY_face') : '',
      shop_name: this.$localStorage.get('APPLY_shop_name') ? this.$localStorage.get('APPLY_shop_name') : '',
      area: this.$localStorage.get('APPLY_area') ? this.$localStorage.get('APPLY_area') : '',
      qq: this.$localStorage.get('APPLY_qq') ? this.$localStorage.get('APPLY_qq') : '',
      alipay: this.$localStorage.get('APPLY_alipay') ? this.$localStorage.get('APPLY_alipay') : '',
      manager: this.$localStorage.get('APPLY_manager') ? this.$localStorage.get('APPLY_manager') : '',
      password: this.$localStorage.get('APPLY_password') ? this.$localStorage.get('APPLY_password') : ''
    }
  },
  methods: {
    apply () {
      let self = this
      let str = ''
      let label = ''
      /* if (self.category_1.value) {
           str += self.category_1.value
           label += self.category_1.label
         }
         if (self.category_2.value) {
           str += ','
           str += self.category_2.value
           label += ','
           label += self.category_2.label
         }
         if (self.category_3.value) {
           str += ','
           str += self.category_3.value
           label += ','
           label += self.category_3.label
         } */
      if (self.second_1.value) {
        str += self.second_1.value
        label += self.second_1.label
      }
      if (self.second_2.value) {
        str += ','
        str += self.second_2.value
        label += ','
        label += self.second_2.label
      }
      if (self.second_3.value) {
        str += ','
        str += self.second_3.value
        label += ','
        label += self.second_3.label
      }
      if (self.second_4.value) {
        str += ','
        str += self.second_4.value
        label += ','
        label += self.second_4.label
      }
      if (self.second_5.value) {
        str += ','
        str += self.second_5.value
        label += ','
        label += self.second_5.label
      }
      if (self.shop_name.length < 1) {
        Toast('请输入店铺名')
        return false
      }
      if (self.manager.length < 1) {
        Toast('请输入管理员账号')
        return false
      }
      if (self.password.length < 1) {
        Toast('请输入密码')
        return false
      }
      if (!self.checkQQ(+self.qq)) {
        Toast('请输入正确的qq号码')
        return false
      }
      if (self.alipay.length < 1) {
        Toast('请输入支付宝收款帐号')
        return false
      }
      if (self.addressWrite.length < 1) {
        Toast('请输入店铺地址')
        return false
      }
      if (str.length < 1) {
        Toast('请至少选择一个分类')
        return false
      }
      if (self.face.length < 10) {
        Toast('请上传店铺logo')
        return false
      }
      const param = {
        shop_name: self.shop_name,
        // area: self.address !== '请上传定位' ? self.address : '',
        area: self.addressWrite,
        qq: self.checkQQ(self.qq) ? self.qq : '',
        alipay: self.alipay,
        manager: self.manager,
        password: self.password,
        face: self.face,
        coordinate: self.lat + ',' + self.lng,
        circle_id: self.circle.id,
        category: str.length > 0 ? str : '',
        category_name: label.length > 0 ? label : ''
      }
      if (+self.query.shop_id) {
        param.shop_id = self.query.shop_id
      }
      self.$store.dispatch('applyForShopV2', param).then(function (res) {
        if (+res.data.code === 1) {
          self.removeLocalStorage()
          Toast('已提交申请请等待审核通过')
          self.$router.push({
            // path: 'auditing1'
            name: '店铺管理'
          })
        } else {
          Toast('输入有误，请检查提交数据后重试')
        }
      }).catch(function (err) {
        console.log(err)
      })
    },
    onSuccessUpload (url, key, identifier) {
      let self = this
      console.log(key)
      self.face = key.length > 10 ? key : ''
    },
    onErrorUpload (err) {
      console.log(err)
      Toast('上传失败请稍后尝试')
    },
    getBusinessCircle () {
      let self = this
      return self.$store.dispatch('getBusinessCircle')
    },
    checkQQ (qq) {
      var regexp = /^[1-9][0-9]{4,10}$/g
      if (regexp.test(qq)) {
        return true
      } else {
        return false
      }
    },
    getCategorys () {
      const self = this
      self.$store.dispatch('getSecond', {
        'id': 0,
        type: 1
      }).then(function (res) { // 广告
        let result = res.data
        if (result.code) {
          console.log(result.msg)
          self.options = result.msg.rows
        } else {
          console.log(result.error)
        }
      })
    },
    getlocation () {
      document.getElementById('geoPage').contentWindow.postMessage('getLocation', '*')
    },
    removeLocalStorage () {
      const self = this
      self.$localStorage.remove('APPLY_category_1') // 设置缓存
      self.$localStorage.remove('APPLY_second_1') // 设置缓存
      self.$localStorage.remove('APPLY_category_2') // 设置缓存
      self.$localStorage.remove('APPLY_second_2') // 设置缓存
      self.$localStorage.remove('APPLY_category_3') // 设置缓存
      self.$localStorage.remove('APPLY_second_3') // 设置缓存
      self.$localStorage.remove('APPLY_category_4') // 设置缓存
      self.$localStorage.remove('APPLY_second_4') // 设置缓存
      self.$localStorage.remove('APPLY_category_5') // 设置缓存
      self.$localStorage.remove('APPLY_second_5') // 设置缓存
      self.$localStorage.remove('APPLY_addressWrite') // 设置缓存
      self.$localStorage.remove('APPLY_face') // 设置缓存
      self.$localStorage.remove('APPLY_shop_name') // 设置缓存
      self.$localStorage.remove('APPLY_area') // 设置缓存,
      self.$localStorage.remove('APPLY_qq') // 设置缓存
      self.$localStorage.remove('APPLY_alipay') // 设置缓存,
      self.$localStorage.remove('APPLY_manager') // 设置缓存
      self.$localStorage.remove('APPLY_password') // 设置缓存,
    },
    setLocalStorage () {
      const self = this
      self.$localStorage.set('APPLY_addressWrite', self.addressWrite) // 设置缓存
      self.$localStorage.set('APPLY_face', self.face) // 设置缓存
      self.$localStorage.set('APPLY_shop_name', self.shop_name) // 设置缓存
      self.$localStorage.set('APPLY_area', self.area) // 设置缓存
      self.$localStorage.set('APPLY_qq', self.qq) // 设置缓存
      self.$localStorage.set('APPLY_alipay', self.alipay) // 设置缓存
      self.$localStorage.set('APPLY_manager', self.manager) // 设置缓存
      self.$localStorage.set('APPLY_password', self.password) // 设置缓存
      // }
    },
    timer () {
      const self = this
      self.setLocalStorage()
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
          alert('获取位置信息出错！')
          break
        case 1:
          alert('您设置了阻止该页面获取位置信息！')
          break
        case 2:
          alert('浏览器无法确定您的位置！')
          break
        case 3:
          alert('获取位置信息超时！')
          break
        default:
          alert('不明原因')
          break
      }
    },
    param () {
      const self = this
      console.log('self.$route.query.shop_id')
      console.log(self.$route.query.shop_id)
      if (self.$route.query.shop_id) {
        self.query.shop_id = self.$route.query.shop_id
      }
    }
  },
  created () {},
  beforeDestroy () {
    clearInterval(this.interval)
  },

  mounted () {
    let self = this
    self.param()
    self.getCategorys()
    self.getBusinessCircle().then(function (res) {
      if (+res.data.code === 1) {
        self.options1 = res.data.msg
      }
    }).catch(function (err) {
      console.log(err)
    })
    self.$nextTick(function () {
      console.log(self.face)
      self.interval = setInterval(self.timer, 3000)
    })
    let loc
    window.addEventListener('message', function (event) {
      // 接收位置信息
      loc = event.data
      if (loc && loc.module === 'geolocation') { // 定位成功,防止其他应用也会向该页面post信息，需判断module是否为'geolocation'
        self.address = loc.addr.length > 0 ? loc.addr : loc.nation + loc.province
        self.lat = loc.lat
        self.lng = loc.lng
        console.log('ggggggg', self.lat, self.lng, loc)
      } else {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(self.successCallback, self.handleLocationError, {
            maximumAge: 15000,
            timeout: 10000,
            enableHighAccuracy: true
          })
        } else {
          alert('对不起，您的浏览器不支持html5定位')
        }
      }
    }, false)
    document.getElementById('geoPage').contentWindow.postMessage('getLocation', '*')
    // 设置6s超时，防止定位组件长时间获取位置信息未响应
    setTimeout(function () {
      if (!loc) {
        document.getElementById('geoPage')
          .contentWindow.postMessage('getLocation.robust', '*')
      }
    }, 6000) // 6s
  }
}
</script>

<style lang="less" scoped>
  @import "../../../assets/index/style.css";
  .applyshop {
    background: #ffffff;
    width: 100%;
    padding-top: 12vw;
    .asheader {
      position: fixed;
      width: 93%;
      top: 0;
      line-height: 12vw;
      .aheader {
        width: 100%;
        font-size: 4.4vw;
      }
      i {
        padding-right: 1%;
      }
      .icon-set:before {
        color: #fff;
        font-size: 5.5vw;
      }
    }
    .apply-form {
      background: #ffffff;
      .section1 {
        width: 90vw;
        height: 38vw;
        margin: 5vw;
        display: flex;
        background: #f0f0f0;
        .uploadContainer {
          width: 100%;
          height: 100%;
          position: relative;
          .uploadtips {
            position: absolute;
          }
          .uploader {
            font-size: 8vw;
          }
        }
        .tips {
          position: absolute;
          width: 90vw;
          height: 5vw;
          line-height: 5vw;
          font-size: 5vw;
          color: #7D7C7B;
          text-align: center;
          margin: 30vw 0vw 0vw 0vw;
        }
      }
      .section2 {
        width: 90vw;
        margin: 0vw 5vw;
        display: flex;
        flex-direction: column;
        .iputter {
          width: 100%;
          height: 10vw;
          line-height: 10vw;
          background: #f2f2f2;
          margin-bottom: 2vw;
          color: #7D7C7B;
          input {
            background: #f2f2f2;
            width: 96%;
            margin: 0 2%;
            font-size: 4.5vw;
          }
        }
      }
      .section3 {
        width: 90vw;
        margin: 0vw 5vw;
        display: flex;
        justify-content: space-between;
        .location {
          height: 10vw;
          line-height: 10vw;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          flex: 0.4;
        }
        .pickAddress {
          flex: 0.4;
          .select {
            width: 100%;
            height: 10vw;
            background: #f2f2f2;
            border: none;
            border-radius: 0;
            color: #7D7C7B;
            font-size: 4.5vw;
          }
        }
      }
      .section4 {
        width: 90vw;
        margin: 2vw 5vw;
        display: flex;
        justify-content: space-between;
        .category1 {
          flex: 0.55;
          .select {
            width: 100%;
            height: 10vw;
            background: #f2f2f2;
            border: none;
            border-radius: 0;
            color: #7D7C7B;
            font-size: 4.5vw;
          }
        }
        .category2 {
          flex: 0.4;
          .select {
            width: 100%;
            height: 10vw;
            background: #f2f2f2;
            border: none;
            border-radius: 0;
            color: #7D7C7B;
            font-size: 4.5vw;
          }
          .select2 {
            height: auto;
          }
        }
      }
      .section5 {
        width: 90vw;
        margin: 0vw 5vw;
      }
    }
    .but {
      height: 10vw;
      margin: 5% auto;
      line-height: 10vw;
      text-align: center;
      width: 85%;
      border-radius: 1vw;
      .button1 {
        background: #00DA86;
      }
    }
  }
</style>
