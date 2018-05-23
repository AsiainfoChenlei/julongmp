<template lang="html">

  <div class="gologin">
       <span>请注意</span>
      <span>每次只能结算一个商户的商品</span>

  </div>


</template>

<script>
  export default {}
</script>

<style lang="less" scoped>
  @import "../../../../assets/fz.less";
  .gologin {
    display: -webkit-flex;
    display: -ms-flex;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16vw 6vw 4vw;
    color: #333;
    //.bd();
    span {
      letter-spacing: .2vw;
    }
    span:last-of-type {
      color: rgba(0, 0, 0, .54);
      //position: relative;
      .fz(font-size,26);
      padding-right: 2vw;
      &::after {
        content: "";
        position: absolute;
        right: -.8vw;
        top: 46%;
        width: 1.8vw;
        height: 1.8vw;
        border-left: 1px solid currentColor;
        border-top: 1px solid currentColor;
        transform: translate3d(0, -50%, 0) rotateZ(135deg);
        -webkit-transform: translate3d(0, -50%, 0) rotateZ(135deg);
      }
    }
  }
</style>
