<template>
  <mt-tabbar v-model="selected" fixed>
    <mt-tab-item id="首页">
      <i slot="icon" class="icon-index"></i>
      <span style="font-size: 4vw;">首页</span>
    </mt-tab-item>
    <mt-tab-item id="分类页">
      <i slot="icon" class="icon-category"></i>
      <span style="font-size: 4vw;">新品</span>
    </mt-tab-item>
    <mt-tab-item id="购物车页">
      <i slot="icon" class="icon-car"></i>
      <span style="font-size: 4vw;">搜索</span>
    </mt-tab-item>
    <mt-tab-item id="收藏夹">
      <i slot="icon" class="icon-car"></i>
      <span style="font-size: 4vw;">聊天</span>
    </mt-tab-item>
    <mt-tab-item id="用户页">
      <i slot="icon" class="icon-user"></i>
      <span style="font-size: 4vw;">个人中心</span>
    </mt-tab-item>
  </mt-tabbar>
</template>
<style>
  .mint-tab-item-icon {
    width: 7vw;
    height: 5vw;
    font-size: 4vw;
    padding-top: 1vw;
  }
</style>
