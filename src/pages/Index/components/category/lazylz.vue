<template lang="html">
    <img v-lazy="imgUrl"><span>{{k.label}}</span>
</template>

<script>
import { Lazyload } from 'mint-ui';

  export default {
    props:['v'],

    computed:{
      imgUrl(){
        return "http://ozrdx2iqj.bkt.clouddn.com/Fi778COgfOuDinhP8XW2Z3mIQdO0";
      }
    },
    methods:{
      changeTabIndex(i) {
         this.$store.commit('CHANGE_TABINDEX',i)
      }
    }
  }
</script>

<style lang="less" scoped>
 
</style>
