<template lang="html">
  <!-- gotoRouter:点击后路由跳转到与id名相同的route.name所对应的路径 -->
  <div class="footer" @click.stop='gotoRouter' >
    <mt-tabbar v-model="selected" fixed :style="showTabbar ? '' : 'display:none'">
      <mt-tab-item id="首页">
        <span class="test"><i slot="icon" class="icon-index"></i></span>
        <span style="font-size: 4vw;">首页</span>
      </mt-tab-item>
      <mt-tab-item id="分类页">
        <span class="test"><i slot="icon" class="icon-category"></i></span>
        <span style="font-size: 4vw;">分类</span>
      </mt-tab-item>
      <mt-tab-item id="购物车页">
        <span class="test"><i class="icon-car1" slot="icon"></i></span>
          <span style="font-size: 4vw;">购物车</span>
        </mt-tab-item>
      <mt-tab-item id="收藏夹">
        <span class="test"><i slot="icon" class="icon-car"></i></span>
        <span style="font-size: 4vw;">收藏夹</span>
      </mt-tab-item>
      <mt-tab-item id="用户页">
        <span class="test"><i slot="icon" class="icon-user"></i></span>
        <span style="font-size: 4vw;">我的</span>
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
export default {
  props: ['showTabbar'],
  methods: {
    gotoRouter () {
      if (this.selected === '首页') {
        this.$router.push({
          name: this.selected,
          query: {codeid: this.$localStorage.get('CODEID')}
        })
      } else {
        this.$router.push({
          name: this.selected
        })
      }
    }
  },
  computed: {
    selected: {
      get () {
        return this.$store.state.selected
      },
      set (value) {
        this.$store.commit('currentTab', value)
      }
    }
  },
  data () {
    return {
    }
  },
  mounted () {
    // let url = location.href
    // // 匹配 home category collection user
    // switch (true) {
    //   case /home/.test(url):
    //     this.selected = '首页'
    //     break
    //   case /category/.test(url):
    //     this.selected = '分类页'
    //     break
    //   case /collection/.test(url):
    //     this.selected = '收藏夹'
    //     break
    //   case /user/.test(url):
    //     this.selected = '用户页'
    //     break
    //   default:
    //     this.selected = '首页'
    //     break
    // }
  }
}
</script>

<style lang="less" scoped>
  @import '../../assets/style/fz.less';
  @import '../../assets/style/index/style.css';
  .mint-tab-item-label:hover {
    color: #333;
  }
  .footer {
    .mint-tabbar {
      background-color: #fff;
      background-image: none;
      box-shadow: 0 0 2.2vw 0 hsla(0, 6%, 50%, .13);
      -webkit-box-shadow: 0 0 2.2vw 0 hsla(0, 6%, 50%, .13);
      .is-selected {
        color: #f74b27;
        background-color: #fff;
        i {
          &::before {
            color: #f74b27;
          }
        }
      }
      .test {
        display: block;
        margin: auto;
        width: 7vw;
        height: 5vw;
        font-size: 4vw;
        padding-top: 1vw;
      }
    }
    .icon-car1{
      background: url("../../images/cart.png") no-repeat;
      background-size: 100% 100%;
      display: block;
      width: 9.9vw;
      height: 8.5vw;
      margin-top: -2.3vw;
      margin-left: -1.9vw;
    }
  }
</style>
