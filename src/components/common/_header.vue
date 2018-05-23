<template>
  <header>
    <router-link
     class="icon-go"
     :to="{ name: '首页'}"
     v-if="$route.matched[0].path=='/category'">
    </router-link>
    <span class="icon-go" @click="$router.go(-1)" v-else></span>
    <slot name="title"></slot>
    <slot name="right"></slot>
  </header>
</template>

<style lang="less" scoped>
@import '../../assets/fz.less';
@import '../../assets/index/style.css';
header {
  background: #f74b27;
  color: #fff;
  text-align: center;
  position: fixed;
  width: 92%;
  z-index: 1000;
  height: 12vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 4vw;
  h1 {
    .fz(font-size,34);
    letter-spacing: .2vw;
    font-weight: 600;
    margin-right: 36vw;
  }
  span,a {
    display: inline-block;
    //.fz(font-size,46);
    font-size: 5vw;
    transform: rotate(-180deg);
    &::before {
      color:#fff;
    }
  }
}

</style>

<script>
export default {

}
</script>
