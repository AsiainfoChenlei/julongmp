<template lang="html">

<div class="nothing">
   <div class="nothing-img">
      <img style="width:70%" src="../../../../images/gologin.png" alt="">
    </div>
    <router-link class="nothing-toshop" :to="{name:'登录页'}">
      <p>您还没有登录</p>
      <router-link :to="{ name: '登录页', params: {} }">去登录</router-link>
    </router-link>
</div>

</template>

<script>
export default {}
</script>

<style lang="less" scoped>
  .nothing {
    width: 100%;
    text-align: center;
    .nothing-img {
      text-align: center;
      background-color: rgba(251, 240, 217,0.3);

    }
    .nothing-toshop {
      display: -webkit-flex;
      display: -ms-flex;
      display: flex;
      justify-content: space-between;
      padding: 2vw 6vw;
      align-items: center;
      background-color: rgba(244, 244, 244, 0.3);
      &:active {
        background-color: #f2f2f2;
      }
       a {
         padding:1vw 2vw;
         background-color: #ffb300;
         border-radius: 1.5vw;
         color:#fff;
       }
    }
  }
</style>
