<template lang="html">
  <div class="asscontent">
    <div class="ass-span">宝贝评价 ( <span class="ass-num"> {{length}} </span> )</div>
    <div class="ass-div" v-for="(row,index) in datas" :key="index">
      <div class="ass-1 ass1" >
        <b class="a-span span-1">{{row.user_mobile}}</b>
        <span class="a-span span-2">规格:{{row.good_format}}</span>
        <span class="a-span span-3">{{row.comment}}</span>
      </div>
      <div class="ass-1 ass2">{{row.created_at}}</div>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  props: ['datas', 'length']
  /*  data(){
     return{
     length:this.datas.length
     }
   } */
}
</script>
<style lang="less" scoped>
  .asscontent{
    .ass-span{
      font-size: 4vw;
      background: #fff;
      height: 10vw;
      line-height: 10vw;
      padding-left: 4.5%;
      border-bottom: 0.3vw solid #f3f3f3;
      .ass-num{
        color: #f47b27;
      }
    }
    .ass-div{
      background: #fff;
      height: 30vw;
      margin-bottom: 4%;
      display: flex;
      .ass1{
        width: 74%;
        .a-span{
          display: block;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          padding-top: 4%;
          padding-left: 6%;
        }
        .span-1{
          color: #000;
          font-size: 4.3vw;
          margin-top: 2%;
        }
        .span-2{
          color: #999;
          font-size: 4vw;
        }
        .span-3{
          font-size: 4.5vw;
          padding-top: 2.5%;
        }
      }
      .ass2{
        width: 23%;
        line-height: 15vw;
        color: #999;
        font-size: 4vw;
        text-align: center;
      }
    }
  }
</style>
