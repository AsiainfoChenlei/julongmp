<template lang="html">
  <div class="login">
    <v-header>
      <h1 slot="title">注册页</h1>
    </v-header>
    <section>
      <mt-field label="手机号" placeholder="目前仅限国内的手机号" type="text" v-model="phone">
      </mt-field>
      <!--<mt-button :disabled=yzm  @click="yzm=true" type="default">验证码</mt-button>-->
      <p class="tip" style="font-size:14px;">已阅读并同意以下协议接受免除或者限制责任。
        <router-link :to="{ path:'/agregister'}">《巨龙购平台服务协议》</router-link>
      </p>
    </section>
    <mt-button style="margin-top:10px;" plain size="large" @click="agree">同意协议并注册</mt-button>

  </div>
</template>

<script>
import Header from '@/components/common/_header.vue'
import Cookies from 'js-cookie'
import {
  Toast
} from 'mint-ui'
export default {
  components: {
    'v-header': Header
  },
  data () {
    return {
      yzm: false,
      phone: '',
      account: '',
      password: ''
      // toggle:!this.$store.state.login.token
    }
  },
  methods: {
    // 同意协议
    agree () {
      const self = this
      let reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/
      let r = reg.test(self.phone)
      if (self.phone !== '' && r) {
        console.log('-----111')
        self.$store.dispatch('checkMobile', {
          'mobile': self.phone
        }).then(function (res) { // 广告
          console.log(res)
          let result = res.data
          if (result.code) {
            self.code()
          } else {
            let error = result.error
            Toast(error[0])
          }
        })
      } else {
        Toast('电话为空或不规范')
      }
    },

    code () {
      const self = this
      self.$store.dispatch('getCode', {
        'mobile': self.phone
      }).then(function (res) { // 广告
        console.log(res)
        let result = res.data
        if (result.code) {
          Toast('验证码发送成功')
          setTimeout(() => { // 跳转
            self.$router.replace({
              path: '/verificationCode?phone=' + self.phone
            })
          }, 1000)
        } else {
          Toast(result.msg)
        }
      })
    },

    // 登录按钮
    login () {
      if (this.account !== '' && this.password !== '') {
        Toast('登录成功,存储token,跳转网页')
        this.toggle = false
        this.$store.commit('CHANGE_TOKEN', 1)
      } else {
        Toast('账号密码不能为空')
      }

      setTimeout(() => {
        this.$router.replace({
          path: 'user'
        })
      }, 1000)
    },

    // 退出登录按钮
    logout () {
      Toast('退出登录成功,清除token')
      this.$store.commit('CHANGE_TOKEN', 0)
      this.toggle = true
      this.account = ''
      this.password = ''
    }
  }
}

</script>

<style lang="less" scoped>
  .login {
    >section {
      padding-top: 12vw;
      .tip {
        padding: 6vw 3vw;
        color: rgb(224, 145, 71);
        letter-spacing: 2px;
        font-size: 16px;
      }
    }
  }

</style>
