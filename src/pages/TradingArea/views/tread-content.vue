<template lang="html">
  <div class="tread-content">
    <ul class="tcontent-ul" v-if="address" v-for="k in address" :key="k.store">
      <li class="tcontent-li icon2-service" @click="shop(k.company_id,k.id)">
        <img class="li-img" :src="$helper.getRealPicURL(k.face,1,1,'w100_h100')" />
        <div class="total-span">
          <span class="li-span span-1">{{k.shop_name}}</span>
          <div class="span-i">
            <span class="i1"><i class="path1"></i></span>
            <span class="i2"><i class="path1"></i></span>
            <span class="i3"><i class="path1"></i></span>
            <span class="i4"><i class="path1"></i></span>
            <span class="i5"><i class="path2"></i></span>
          </div>
          <p style="color: #FF834B;margin-top:2%;line-height: 1.17;">{{k.area}}</p>
          <span class="li-span span-3"></span>
        </div>
        <!--<div><span class="dis-span"></span><span class="discount"></span></div>-->
        <hr/>
      </li>
    </ul>
    <ul class="tcontent-ul">
    </ul>
  </div>
</template>

<script type="text/javascript">
import {mapState} from 'vuex'
export default {
  props: ['address'],
  methods: {
    shop (c, s) {
      this.setLocal().then(() => {
        location.assign('shop.html#/shop?shop_id=' + s + '&company_id=' + c + '&codeid=' + this.$localStorage.get('CODEID') + '&select=2')
      }).catch((err) => {
        console.log(err)
      })
    },
    setLocal () {
      let self = this
      return new Promise((resolve, reject) => {
        self.$localStorage.set('TREADTAGVISITEDVIES', JSON.stringify(self.visitedViews))
        resolve()
      })
    }
  },
  computed: {
    ...mapState({
      visitedViews: state => state.tagsView.visitedViews
    })
  }
}
</script>

<style lang="less" scoped>
  .tread-content {
    background: #ffffff;
    .tcontent-li {
      padding: 6.5vw 0 0 3vw;
      position: relative;
      .li-img {
        width: 25vw;
        height: 25vw;
        background: dodgerblue;
      }
      .total-span {
        display: inline-block;
        vertical-align: middle;
        width: 68%;
        font-size: 4vw;
        .li-span {
          display: block;
          padding: 1.2vw 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          /*height: 4vw;*/
        }
        .span-1 {
          font-size: 4.5vw;
        }
        .span-2 {
          color: #FF834B;
        }
        .span-i {
          display: inline-block;
          margin-left: 1.3vw;
          margin-top: 3%;
        }
        .path1 {
          margin-left: -4%;
        }
        .path2 {
          margin-left: 10%;
          font-size: 3vw;
        }
      }
      .dis-span {
        display: block;
        border-color: transparent #F64D4A transparent transparent;
        border-width: 3.5vw 3vw 3.5vw 0;
        border-style: solid;
        position: absolute;
        top: 22%;
        right: 23%;
      }
      .discount {
        position: absolute;
        display: block;
        right: 0;
        top: 22%;
        background: #F64D4A;
        color: white;
        font-size: 3.8vw;
        width: 22vw;
        height: 7vw;
        line-height: 6.5vw;
        padding-left: 1vw;
      }
      hr {
        width: 98%;
        margin: 7vw 0 0 -1vw;
        border: none;
        border-top: 0.3vw solid #dcdcdc;
      }
    }
  }
</style>
