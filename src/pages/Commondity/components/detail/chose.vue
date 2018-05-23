<template lang="html">
  <section class="chose" v-if="view">
    <div class="chose-view">
      <h1 view="chose-view-title">
        {{view.name}}
        <!-- ~~
        <span>(已选 {{standardText}}-{{priceText}}元)</span>-->
      </h1>
      <span></span>
      <p class="chose-view-intro">{{view.intro}}</p>
    </div>
    <!-- 添加空函数 解决Safari浏览器 :active无效 -->
    <!--  <div class="chose-mychosed" ontouchstart="">
      <div class="colChose" v-if="property.length > 0">
        <span v-for="(k,i) in  property" :class="{active:colSelected==i}" @click="colChose(i)">{{k.standard}}</span>
      </div>
    </div>-->
    <div class="chose-pay">
      <span class="cp-color">价格：
        <span v-if="property.length > 0" class="cp-number" style="color: #f74b27">￥{{view.min_price}}</span>
        <span v-if="property.length > 0 &&  (view.max_price>view.min_price)" class="cp-number" style="color: #f74b27">—{{view.max_price}}</span>
      </span>
    </div>
    <div class="chose-pay">
      <span class="cp-color" style="text-decoration:line-through;">实体店内零售价：
        <span v-if="property.length > 0" class="cp-number">￥{{property[0].offline_price}}</span>
      </span>
    </div>
    <div class="chose-pay">
      <span class="cp-color">运费：
        <span v-if="property.length > 0" class="cp-number">￥{{property[0].freight}}</span>
      </span>
    </div>
  </section>
</template>

<script>
import {
  mapState
} from 'vuex'
export default {
  data () {
    return {
      property: [],
      colSelected: 0
      // sizeSelected:1,
    }
  },
  props: ['view'],
  mounted () {
    let self = this
    self.$nextTick(function () {
      self.property = self.view.stock
    })
  },
  computed: mapState({
    // view: state => state.detail.productDatas.view,
    // colSelected: state => state.detail.colSelected,
    // sizeSelected: state => state.detail.sizeSelected,
    // 返回当前选择颜色的值(innerText)
    standardText () {
      if (this.colSelected < this.property.length && this.property[this.colSelected].standard) {
        return this.property[this.colSelected].standard
      }
      return ''
    },
    // 返回当前选择规格的值(innerText)
    priceText () {
      if (this.colSelected < this.property.length && this.property[this.colSelected].price) {
        return this.property[this.colSelected].price
      }
      return 0
    }
  }),
  methods: {
    // 点击后把i赋值给colSelected,再通过判断决定是否添加选中样式 (active)
    colChose (i) {
      const self = this
      self.colSelected = i
      this.$store.commit('CHANGE_COL_SELECTED', i)
    },
    sizeChose (i) {
      this.$store.commit('CHANGE_SIZE_SELECTED', i)
    }
  }
}

</script>

<style lang="less" scoped>
  @import '../../../../assets/fz.less';
  .chose {
    padding: 3% 3% 4%;
    line-height: 1.5;
    background: #fff;
    .chose-view {
      >h1 {
        font-size: 5.2vw;
        color: #2c3e50;
        >span {
          color: rgb(238, 113, 80);
        }
      }
      >span {
        line-height: 10vw;
        color: @cl;
        .fz(font-size, 34);
        font-weight: 600;
      }
    }
    .chose-mychosed {
      background-color: #fff;
      >div {
        /*padding-top: 20px;*/
        /*display: -ms-flex;*/
        /*display: -webkit-box;*/
        /*display: -ms-flexbox;*/
        /*display: flex;*/
        span {
          font-size: 3.5vw;
          padding: 1.5% 3%;
          border: 1px solid rgb(111, 111, 111);
          color: rgb(111, 111, 111);
          margin-right: 4%;
          white-space: nowrap;
          display: inline-block;
          margin-top: 5%;
          border-radius: 4vw;
          &.active,
          &:active {
            color: @cl;
            border-color: @cl;
            -webkit-transform: scale(1.1);
            transform: scale(1.1);
          }
        }
      }
    }
    .chose-pay {
      padding-top: 0%;
      .cp-color {
        font-size: 3.4vw;
        color: #999;
      }
      .cp-number {}
    }
    .footer {
      width: 100%;
      display: -webkit-flex;
      display: -ms-flex;
      display: flex;
      height: 14vw;
      position: fixed;
      bottom: 0;
      left: 0;
      background-color: #ffffff;
      -moz-user-select: none;
      -webkit-user-select: none;
      .bt();
      .footer-addcar,
      .footer-gocar,
      .footer-index {
        text-align: center;
      }
      .footer-index {
        -webkit-flex: 3;
        -ms-flex: 3;
        flex: 3;
        line-height: 14vw;
        height: 14vw;
        padding-top: 1.5vw;
        border-right-color: #f7f7f7;
        border-right-style: solid;
        .fz(border-right-width, 1);
        i {
          .fz(font-size, 45);
        }
        &:active {
          background-color: #f1f1f1;
        }
      }
      .footer-gocar {
        position: relative;
        -webkit-flex: 3;
        -ms-flex: 3;
        flex: 3;
        height: 14vw;
        line-height: 14vw;
        padding-top: 1.6vw;
        span {
          height: 5.5vw;
          width: 5.5vw;
          line-height: 5.5vw;
          position: absolute;
          top: 0.5vw;
          right: 5.5vw;
          background-color: @cl;
          border-radius: 50%;
          color: #fff;
          .fz(font-size, 24);
        }
        &:active {
          background-color: #f1f1f1;
        }
        i {
          .fz(font-size, 48);
        }
      }
      .footer-addcar {
        -webkit-flex: 6;
        -ms-flex: 6;
        flex: 6;
        line-height: 14vw;
        height: 14vw;
        color: #fff;
        background-color: @cl;
        letter-spacing: 0.2vw;
        &:active {
          background-color: #ff7d00;
        }
      }
    }
  }

</style>
