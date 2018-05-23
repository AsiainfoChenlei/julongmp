<template lang="html">
  <div class="login">
    <v-header class="header">
     <div class="header-d" slot="title">设置密码</div>
    </v-header>

    <section>
      <mt-field   label="密码"
        placeholder="请输入密码"
        type = "text"
        v-model = "password"  >
      </mt-field>

    </section>
    <mt-button style="margin-top:10px;"
     plain
     size="large"
     @click="submit"
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
      mobile: this.$localStorage.get('REGISTERMOBILE'),
      password: ''
    }
  },
  methods: {
    // 验证
    submit () {
      const self = this
      if (self.password !== '') {
        self.$store.dispatch('resetPWD', {'mobile': self.mobile, 'password': self.password}).then(function (res) { // 广告
          console.log(res)
          let result = res.data
          if (result.code) {
            Toast('修改密码成功')
            setTimeout(() => { // 跳转
              self.$router.replace({
                path: '/login'
              })
            }, 1000)
          } else {
            let error = result.error
            Toast(error[0])
          }
        })
      } else {
        Toast('密码不能为空')
      }
    }

  }
}

</script>

<style lang="less" scoped>
.login {
  header {
    .header-d {
      width: 100%;
      font-size: 4.5vw;
    }
  }
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
