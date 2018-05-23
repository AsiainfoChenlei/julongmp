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
      <div class="span-de"></div>
     <div class="sd4-span1">
     <p class="title_des">购物须知</p>
     <p class="textContent">1.本店商品主要为同城购物，若大件商品异地购物下单，需咨询商家是否可发货。</p>
     <p class="textContent">2.签收商品前，请确认商品是否完整，确认无误后，方可签收。</p>
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
    .span-de{
      height: 6%;
      width: 100%;
      background-color: #f0f0f0;
      padding-top: 3%;
    }
    .sd4-span1{
      color:#FF8E00;
      .title_des{
        text-align: center;
        font-size: 3vw;
      }
      .textContent{
        font-size: 3vw;
        margin: 1% 3% 1%;
      }
    }
  }

</style>
