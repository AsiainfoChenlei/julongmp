<template lang="html">
  <div class="login">
    <div class="back" @click="home">
      <span class="icon-go"></span>
    </div>
    <section>
      <div class="logo"></div>
      <div class="linput">
        <span class="login-span">账号</span>
        <input class="login-input" placeholder="请输入账号" type="text" v-model="mobile" />
      </div>
      <div class="linput">
        <span class="login-span">密码</span>
        <input class="login-input" placeholder="请输入密码" type="password" v-model="password" />
      </div>
      <!--<p class="tip">Tip : 账号密码随便输</p>-->
      <router-link :to="{ name: '注册页'}" class="tip">
        <span>注册</span>
      </router-link>
      <router-link :to="{ name: '忘记密码'}" class="tip">
        <span>修改/忘记密码</span>
      </router-link>
    </section>
    <mt-button v-bind:disabled="dis" plain size="large" @click="login">登录</mt-button>
  </div>
</template>

<script>
// import VueLocalStorage from 'vue-localstorage'
import { Indicator, Toast } from 'mint-ui'
import Header from '@/components/common/_header.vue'
import Cookies from 'js-cookie'
export default {
  components: {
    'v-header': Header
  },
  data () {
    return {
      dis: false,
      mobile: '',
      password: ''
    }
  },
  methods: {
    home () {
      let self = this
      self.$router.push({
        path: '/'
      })
    },
    success (msg) {
      const self = this
      self.$localStorage.set('CODEID', msg.id)
      self.$localStorage.set('TOKEN', msg.token)
      self.$localStorage.set('MOBILE', msg.mobile)
      self.$localStorage.set('STATUS', JSON.stringify(msg.status))
      setTimeout(() => {
        /* this.$router.push({
          path: 'user'
        }) */
        // location.assign('index.html#/user')
        if (typeof (Cookies.get('DETAILURL')) === 'undefined') {
          location.assign('index.html#/user')
        } else {
          location.assign(Cookies.get('DETAILURL'))
        }
      }, 1000)
    },
    // 登录按钮
    login () {
      const self = this
      self.dis = false
      Indicator.open()
      if (self.mobile !== '' && self.password !== '') {
        self.$store.dispatch('userLogin', {
          'mobile': self.mobile.replace(/\s+/g, ''),
          'password': self.password.replace(/\s+/g, '')
        }).then(function (res) { // 广告
          // return;
          Indicator.close()
          let result = res.data
          if (+result.code === 1) {
            Toast('登录成功')
            self.success(result.msg)
          } else {
            Toast(result.error)
          }
        })
      } else {
        Toast('账号密码不能为空')
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .login {
    min-height: 100%;
    min-width: 100%;
    background: #fe4035;
    header {
      .header-d {
        width: 100%;
        font-size: 4.5vw;
      }
    }
    .back {
      width: 7vw;
      height: 7vw;
      padding: 3% 0 0 3%;
      span {
        display: inline-block;
        line-height: 7vw;
        transform: rotate(-180deg);
        &::before {
          font-size: 5vw;
          color: #fff;
        }
      }
      &:active {
        transform: scale(1.3);
      }
    }
    >section {
      .logo {
        width: 26%;
        height: 26vw;
        margin: 15% auto;
        background: url("../../../assets/images/kk.png") no-repeat top center;
        background-size: 100% 100%;
        .logo-span {
          display: inline-block;
          padding-top: 107%;
          width: 100%;
          text-align: justify;
          font-size: 3.8vw;
          text-align-last: justify;
          color: #fff;
        }
      }
      .linput {
        position: relative;
        text-align: center;
        margin-bottom: 5%;
        .login-input {
          border-radius: 6vw;
          height: 9.5vw;
          line-height: 9.5vw;
          text-indent: 30%;
          width: 75%;
          font-size: 4vw;
        }
        .login-span {
          position: absolute;
          left: 17.5%;
          line-height: 9.5vw;
          font-size: 4.3vw;
        }
        &:last-of-type {
          margin-bottom: 3%;
        }
      }
      .tip {
        color: #fff;
        letter-spacing: 2px;
        font-size: 3.7vw;
        display: inline-block;
        &:first-of-type {
          padding: 0 36% 0 14%;
        }
      }
    }
    .mint-button {
      background: #f95a03;
      border-radius: 6vw;
      width: 75%;
      margin: 12% auto 0;
      border: 0.1vw solid #fff;
      color: #fff;
      font-size: 5vw;
      height: 12vw;
      /*box-shadow: 3vw 2vw 25vw #FF5;*/
    }
  }
</style>
