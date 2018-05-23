<template lang="html">
  <div class="stread">
    <div class="sheader">
      <i class="icon-index" @click="$router.go(-1)"></i>
      <span class="stspan">{{name}}</span>
      <!--<i class="icon-search"></i>-->
    </div>
   <ul class="sul">
      <li class="sli" v-for="k in list" :key="k.name"  @click="oto(k)">
        <img class="simg" :src="k.imgpath"/>
        <div class="sdiv">{{k.name}}</div>
      </li>
   </ul>
  </div>
</template>
<script>
export default {
  methods: {
    oto (k) {
      console.log(k)
      location.assign('shop.html#/tshop?circle_id=' + k.id + '&company_id=' + k.company_id + '&shop_id=' + k.shop_id)
      this.$localStorage.set('circle_id', k.id)
      this.$localStorage.set('name', k.name)
    }
  },
  beforeCreate () {
    var name = this.$localStorage.get('sname')
    var list = this.$localStorage.get('list')
    if (name && list != null) {
      this.name = name
      this.list = JSON.parse(list)
    }
  }
}
</script>
<style lang="less" scoped>
  @import "../../../assets/user/style.css";
  .stread{
    .sheader{
      top: 0;
      height: 12vw;
      background: #f9f9f9;
      line-height: 12vw;
      padding: 0 5vw;
      position: fixed;
      width: 100%;
      z-index: 1000;
      .stspan{
        display: inline-block;
        font-size: 4.7vw;
        width: 74%;
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: middle;
      }
      .icon-index:before,.icon-search:before{
        font-size: 6.4vw;
        vertical-align: middle;
      }
    }
    .sul{
      padding-top: 18%;
      .sli{
        display: inline-block;
        width: 38%;
        vertical-align: middle;
        margin: 0 3% 2% 7%;
        .simg{
          border: 1vw solid #ddd;
          width: 95%;
          height: 25vw;
          padding: 0.9%;
          margin-top: 2%;
        }
        .sdiv{
          text-align: center;
          padding-top: 3%;
          font-size: 4vw;
          height: 10vw;
          line-height: 6vw;
        }
      }
    }
  }
</style>
