<template lang="html" >
  <div class="shopdetail4" @click="shop">
     <!-- <img class="sd-img"  v-lazy="$helper.getRealPicURL(view.cover,1,query.shop_id)" />-->
     <img class="sd-img"  v-lazy="$helper.getRealPicURL(view.shop_info.face,1,1,'w100_h100')" />
      <div class="shopdetail4-div icon2-service">
        <span class="sd-span">{{view.shop_info.shop_name}}</span>
        <i class="path1"></i><i class="path1"></i><i class="path1"></i><i class="path1"></i>
      </div>

      <div class="sd4-span" >
        <span class="span-1">进店看看</span><i class="icon-go"></i>
      </div>

    </div>
</template>
<script>
export default {
  props: ['view', 'query'],
  data () {
    return {

    }
  },
  methods: {
    shop () {
      const self = this
      console.log('self.view')
      console.log(self.view)
      console.log(self.query)
      // return;
      if (self.view.shop_info.shop_id) {
        /*   self.$router.push({
                      path: 'shop?shop_id='+self.view.shop_info.shop_id+'&company_id='+self.view.shop_info.company_id
                    //path: 'shop?shop_id=1&company_id=1'
          }) */
        self.$router.push({name: '商家首页',
          query: {
            shop_id: self.view.shop_info.shop_id,
            company_id: self.view.shop_info.company_id,
            select: '2'
          }})
      }
    }
  },
  mounted () {
    let self = this
    self.$nextTick(function () {
      // if (self.query.shop_id!==undefined) {
      //   //self.iSCoGoods()
      // }
    })
  }
}
</script>

<style lang="less" scoped>
  .shopdetail4{
    background: #fff;
    padding: 3% 0;
    margin-bottom: 3%;
    .sd-img{
      width: 12vw;
      height: 12vw;
      background: #999;
      margin-left: 5%;
      vertical-align: middle;
    }
    .shopdetail4-div{
      display: inline-block;
      width: 45%;
      padding-left: 2%;
      vertical-align: middle;
      margin-right: 10%;
      .sd-span{
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        line-height: 1.5;
        font-size: 4vw;
        color: #333;
      }
      .path1{
        font-size: 3.5vw;
      }
    }
    .sd4-span{
      display: inline-block;
      vertical-align: middle;
      width: 21%;
      text-align: right;
      font-size: 3.7vw;
      .span-1{
        vertical-align: baseline;
        padding-right: 1%;
      }
    }
  }
</style>
