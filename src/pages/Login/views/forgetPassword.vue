<template lang="html">
  <div class="login">
    <v-header>
      <h1 slot="title">忘记密码</h1>
    </v-header>
    <section>
      <mt-field
       label="手机号"
        placeholder="目前仅限国内的手机号"
        type = "text"
        v-model = "phone"
    >
        </mt-field>
    </section>
    <mt-button style="margin-top:10px;"
     plain
     size="large"
     @click="agree"
    >手机验证码发送</mt-button>

  </div>
</template>

<script>
import Header from '@/components/common/_header.vue'
import { Toast } from 'mint-ui'
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
    }
  },
  methods: {
    // 同意协议
    agree () {
      const self = this
      let reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/
      let result = reg.test(self.phone)
      if (self.phone !== '' && result) {
        self.code()
      } else {
        Toast('电话为空或不规范')
      }
    },

    code () {
      const self = this
      self.$store.dispatch('getCode', {'mobile': self.phone}).then(function (res) { // 广告
        let result = res.data
        if (result.code) {
          Toast('验证码发送成功')
          setTimeout(() => { // 跳转
            self.$router.replace({
              path: '/verificationSecCode?phone=' + self.phone + '&serial=2'
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
      color:rgb(224, 145, 71);
      letter-spacing: 2px;
      font-size: 16px;
    }
  }
}
</style>
