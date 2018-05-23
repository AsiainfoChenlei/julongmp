<template lang="html">

  <div class="car">
      <header class="header">
          <div class="header-icon">
              <span class="icon2-user"></span>
          </div>
          <span>登录/注册</span>
      </header>
      <div class="main">
          <router-link class="my-indent" :to="{ name: ''}">
              <span class="my-indent-left">我的订单</span>
              <div class="my-indent-right">
                  <span>全部订单</span>
                  <i class="icon-go"></i>
              </div>
          </router-link>

          <section class="my-pay">
              <router-link :to="{ name: ''}">
                  <span class="icon2-money"></span>
                  <p>代付款</p>
              </router-link>
              <router-link :to="{ name: ''}">
                  <span class="icon2-thecar"></span>
                  <p>待收货</p>
              </router-link>
              <router-link :to="{ name: ''}">
                  <span class="icon2-fixed"></span>
                  <p>退换修</p>
              </router-link>

          </section>

          <section class="my-vip">
            <router-link class="my-vip-top ho" :to="{ name: ''}" >
              <div class="my-vip-top-div">
                <span class="icon2-vip">
                    <span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span><span class="path7"></span><span class="path8"></span><span class="path9"></span>
                </span>
              </div>
              <p>
                <span>会员福利</span><i class="icon-go"></i>
              </p>
            </router-link>
            <router-link class="my-vip-bottom ho" :to="{ name: ''}">
              <div>
                <span class="icon2-money"></span>
              </div>
              <p>
                <span>我的优惠</span><i class="icon-go"></i>
              </p>
            </router-link>
          </section>

          <section class="my-service">
              <router-link class="my-service-top" :to="{ name: ''}">
                  <div>
                    <span class="icon2-service">
                        <span class="path1"></span><span class="path2"></span><span class="path3"></span>
                    </span>
                  </div>
                  <p>
                    <span>服务中心</span><i class="icon-go"></i>
                  </p>
              </router-link>
              <router-link class="my-service-bottom" :to="{ name: ''}">
                  <div>
                    <span class="icon2-milogo"></span>
                  </div>
                  <p>
                    <span>电商之家</span><i class="icon-go"></i>
                  </p>
              </router-link>
          </section>

          <section class="my-settle">
              <router-link :to="{ name: ''}" class="my-settle-top">
                  <div>
                    <span class="icon2-f"></span>

                  </div>

                  <p>
                    <span>F码通道</span><i class="icon-go"></i>
                  </p>
              </router-link>
              <router-link :to="{ name: ''}" class="my-settle-bottom">
                <div>
                  <span class="icon2-settle"></span>
                </div>
                <p>
                  <span>设置</span><i class="icon-go"></i>
                </p>
              </router-link>
          </section>

      </div>
      <v-baseline></v-baseline>
      <v-footer></v-footer>
    </div>
</template>

<script>
import Baseline from '@/components/common/_baseline.vue'
import Footer from '@/components/common/_footer.vue'
export default {
  components: {
    'v-baseline': Baseline,
    'v-footer': Footer
  }
}
</script>

<style lang="less" scoped>
</style>
