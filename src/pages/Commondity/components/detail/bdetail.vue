<template lang="html">
  <div class="shopdetail5">
    <div class="sd5-span">宝贝详情</div>
    <!--<div class="sd5-text"><img style="width:100%" v-lazy="$helper.getRealPicURL(view.show_imgs,query.company_id,query.shop_id)"  /></div>-->
    <div class="sd5-text">
      <img class="sd5-image" v-for="(k, i) in  pics" :key="i" v-lazy="$helper.getRealPicURL(k,query.company_id,query.shop_id,'w600_hfellow')" />
    </div>
  </div>
</template>

<script>
export default {
  props: ['view', 'query'],
  data () {
    return {
      pics: [],
      imgurl: ''
    }
  },
  mounted () {
    let self = this
    self.$nextTick(function () {
      self.pics = self.view.show_imgs
      /* if (self.pics.length > 0) {
           self.imgurl = self.$helper.getRealPicURL(self.pics[0], 1, 1)
         } */
      // self.pics = JSON.parse(self.view.show_imgs);
      // self.imgurl = self.$helper.getRealPicURL(self.pics[0], 1, 1)
    })
  }
}
</script>

<style lang="less" scoped>
  .shopdetail5 {
    background: #fff;
    padding-bottom: 5%;
    .sd5-span {
      height: 12vw;
      line-height: 12vw;
      font-size: 4.5vw;
      padding-left: 5%;
      color: #333;
    }
    .sd5-text {
      height: auto;
      width: 90%;
      margin-left: 5%;
      border: none;
      font-size: 3.8vw;
      color: #999;
      .sd5-image {
        background: #E3E3E3;
        width: 100%;
        margin-bottom: 5px;
      }

    }
  }
</style>
