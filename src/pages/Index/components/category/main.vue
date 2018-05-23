<template lang="html">

  <div class="main" >
  <div class="main2" v-for="(k1,i) in datas.rows[tabIndex].children" :key="i" >
    <b>{{k1.label}}</b><span class="span-1">查看更多&nbsp;&gt;</span>
    <ul>
      <li v-for="(k2,j) in k1.children" :key="j">
        <a  @click="toGoodslist(k2.label, k2.value)">
          <img v-lazy="k2.img_complete"><span>{{k2.label}}</span>
           <!--<v-lazylz>{{k.label}}</v-lazylz>-->
        </a>
      </li>
    </ul>
   </div>
  </div>

</template>

<script>
// import Lazylz from '@/components/catcategory/lazylz.vue'
export default {
  props: ['datas'],
  /*  components:{
    'v-lazylz':Lazylz,
  }, */
  data () {
    return {
      url: 'www.baidu.com',
      imgUrl: 'http://ozrdx2iqj.bkt.clouddn.com/Fi778COgfOuDinhP8XW2Z3mIQdO0',
      qiniuUrl: 'http://ozrdx2iqj.bkt.clouddn.com/',
      children1: [],
      currentIndex: 0
    }
  },
  computed: {
    // 获取当前aside栏选择的是第几个
    tabIndex () {
      // console.log(this.tabIndex);
      /*  let index1=this.$store.state.category.tabIndex;
       console.log(index1);
       console.log(this.datas);
       this.children1=this.datas.rows[index1].children */
      return this.$store.state.category.tabIndex
    },
    fixedImgurl (v) {
      return this.qiniuUrl + v
    }
  },
  methods: {
    toGoodslist (k, v) {
      this.$localStorage.set('TREADTAGVISITEDVIES', JSON.stringify([]))
      location.assign('goodslist.html?keyword=' + k + '&cid=' + v)
    }
  }
}
</script>

<style lang="less" scoped>
.main{
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  flex: 9.8;
  height: 100%;
  background: #fff;
  &::-webkit-scrollbar {display:none}
}
.main2 {
 /* overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  flex: 9.8;
  height: 100%;
  &::-webkit-scrollbar {display:none}*/
  b{
    font-size: 4.5vw;
    margin: 3vw 0 3vw 5vw;
    display: inline-block;
    width: 30%;
  }
  .span-1{
    padding-left: 37%;
    font-size: 4vw;
  }
  /*>h2 {*/
    /*font-size: 24px;*/
    /*padding: 2vw 4vw;*/
    /*color:#333;*/
    /*letter-spacing: 2px;*/
    /*!*background-color: rgb(247, 247, 247);*!*/
  /*}*/
  >ul {
    /*width: 100%;*/
    /*display: -webkit-flex;*/
    /*display: -ms-flex;*/
    /*display: flex;*/
    /*justify-content: space-around;*/
    /*flex-wrap: wrap;*/
    /*background-color: rgb(247, 247, 247);*/
    padding-bottom: 3vw;
    li {
      /*background-color: rgb(247, 247, 247);*/
      display: inline-block;
      width: 33%;
      text-align: center;
      a {
        color: #666;
        display: block;
        img {
          display: block;
          width: 60%;
          margin: 4vw auto;
        }
        span {
          text-align: center;
          font-size: 4vw;
        }
      }
    }
  }
}
</style>
