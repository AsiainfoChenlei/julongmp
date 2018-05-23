<template lang="html">
  <div class="login">
    <v-header>
      <h1 slot="title">验证码</h1>
    </v-header>
        <h6  style="font-size:12px;text-align:center;padding-top: 13vw">我们已经发送了验证码到您的手机</h6>
        <h5  style="font-size:16px;color:red;text-align:center;margin-bottom:10px;">{{phone}}</h5>
        {{serial}}
    <section>
      <mt-field   label="验证码"
        placeholder="请输入验证码"
        type = "text"
        v-model = "code">
      </mt-field>

    </section>
    <mt-button style="margin-top:10px;"
     plain
     size="large"
     @click="handleSubmit"
    >下一步</mt-button>

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
      code: '',
      phone: ''
    }
  },
  methods: {
    // 验证
    handleSubmit () {
      const self = this
      if (self.code !== '') {
        self.$store.dispatch('checkCode', {'mobile': self.phone, 'code': self.code}).then(function (res) { // 广告
          console.log(res)
          let result = res.data
          if (result.code) {
            Toast('验证成功')
            self.$localStorage.set('REGISTERMOBILE', self.phone)
            setTimeout(() => { // 跳转
              self.$router.replace({
                path: '/setPassword'
              })
            }, 1000)
          } else {
            Toast(result.msg)
          }
        })
      } else {
        Toast('验证码为空')
      }
    },
    param () {
      const self = this
      if (self.$route.query.phone) {
        this.phone = self.$route.query.phone
        this.serial = self.$route.query.serial
      }
    }
  },
  mounted () {
    const self = this
    self.param()
    console.log(self.$route.query.serial);
  }
}

</script>

<style lang="less" scoped>
.login {
  >section {
    .tip {
      padding: 6vw 3vw;
      color:rgb(224, 145, 71);
      letter-spacing: 2px;
      font-size: 16px;
    }
  }
}
</style>
