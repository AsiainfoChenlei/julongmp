<template lang="html">
  <aside class="aside" v-if="datas">
    <ul>
      <li v-for="(k,i) in datas.rows" :key='i' @click='changeTabIndex(i)' :class='{active:i==tabIndex}'>
        <router-link :to="{path:'/category/'+k.label}">{{k.label}}</router-link>
      </li>

    </ul>

  </aside>
</template>

<script>
export default {
  props: ['datas'],

  computed: {
    tabIndex () {
      return this.$store.state.category.tabIndex
    }
  },
  methods: {
    changeTabIndex (i) {
      this.$store.commit('CHANGE_TABINDEX', i)
    }
  }
}

</script>

<style lang="less" scoped>
  .aside {
    flex: 2.2;
    height: 100%;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    background-color: gold;
    &::-webkit-scrollbar {
      display: none
    }
    >ul {
      height: 100%;
      width: 100%;
      li {
        text-align: center;
        background: #f0f0f0;
        a {
          display: block;
          padding: 4vw 0;
          position: relative;
          font-size: 4.3vw;
        }
      }
      .active {
        position: relative;
        font-size: 6vw;
        background: #fff;
        a {
          color: #f74b27;
        }
        &::before {
          width: 3px;
          height: 28px;
          content: "";
          position: absolute;
          left: 0;
          top: 50%;
          margin-top: -14px;
          background-color: #f74b27;
        }
      }
    }
  }

</style>
