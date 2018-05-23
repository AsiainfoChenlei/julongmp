<template lang="html">
  <div class="logout">
     <div class="back" @click="$router.go(-1)">
        <span class="icon-go"></span>
      </div>
      <div class="logo"></div>
     <mt-button
     plain
     size="large"
     @click="logout"
    >退出登录</mt-button>
  </div>
</template>

<script>
// import { Toast } from 'mint-ui'
export default {
  methods: {
    success () {
      const self = this
      self.$localStorage.remove('TOKEN')
      self.$localStorage.remove('MOBILE')
      /*   this.$store.commit('CHANGE_TOKEN',0);
      this.$store.commit('CHANGE_MOBILE',null);
      this.mobile = '';
      this.password = ''; */
      setTimeout(() => {
        this.$router.push({
          path: '/'
        })
      }, 1000)
    },
    // 退出登录按钮
    logout () {
      const self = this
      self.success()// 无奈
      /* self.$store.dispatch('logOut').then(function (res) {
             //console.log(res);
             let result=res.data;
             if(result.code){
                   Toast('退出登录成功');
                  // self.success();
             }else{
                 Toast(result.error);
             }
      }); */
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../../assets/fz.less';
.logout{
  background: #e5e5e5;
  min-height: 100%;
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
        color:#333;
      }
    }

    &:active {
      transform: scale(1.3);
    }
  }
  .logo{
    width: 30%;
    height: 30vw;
    margin: 20% auto;
    background: url("/static/images/kk2.png") no-repeat top center;
    background-size: 100% 100%;
    .logo-span{
      display: inline-block;
      padding-top: 107%;
      width: 100%;
      text-align: justify;
      font-size: 3.8vw;
      text-align-last: justify;
      color: #fe4035;
    }
  }
  .mint-button{
    background: #fff;
    font-size: 5vw;
    width: 75%;
    margin: 26% auto 0;
    border-radius: 6vw;
    color: #fe4035;
    border: none;
    box-shadow: 0 0 9vw #fff;
    height: 12vw;
  }
}
</style>
