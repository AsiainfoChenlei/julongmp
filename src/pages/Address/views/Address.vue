<template lang="html">
  <div class="main" >
    <v-header class="header">
    <div class="header-d" slot="title">管理收货地址</div>
    <!--  <h1 slot="title">管理收货地址</h1> -->
    </v-header>

        <!-- tab-container -->
        <mt-tab-container v-model="selected" >
          <mt-tab-container-item id="1">
             <div class="company">
                 <div class="address" v-for="(v1,index) in datas" :key="index">
                      <div class="info">
                           <div><a class="info_left">{{v1.address_name}}</a><a class="info_right"> {{v1.address_phone}}</a></div>
                           <div v-if="!query.order" class="info_left" style="color:#ee7150">{{v1.province}}{{v1.city}}{{v1.area}}{{v1.street}}{{v1.address}}</div>
                           <div v-if="query.order" @click="bakckToPay(v1.a_id)" class="info_left" style="color:#ee7150">{{v1.province}}{{v1.city}}{{v1.area}}{{v1.street}}{{v1.address}}</div>
                      </div>
                      <div class="acition">
                        <div  class="something-left">
                          <label  class="true" :class="{false:!v1.is_default2}"  @click="toggle(v1.a_id)">
                             <input  type="checkbox" v-model="v1.is_default2" />&nbsp;&nbsp;&nbsp;设为默认地址
                           </label>
                         </div>

                             <router-link class="my-service-top" :to="{ name: '编辑地址',query:{'a_id':v1.a_id}}">
                              <span class="lh lh-1">编辑&nbsp;&nbsp;&nbsp;&nbsp;</span>
                               </router-link>

                               <span class="lh" @click="addressDelete(v1.a_id)" >删除</span>
                      </div>
                 </div>
              </div>
          </mt-tab-container-item>

        </mt-tab-container>
        <div>
        <router-link class="my-service-top" :to="{ name: '地址添加'}">
           <button  class="mint-button">添加新地址</button>
        </router-link>
        </div>
  </div>
</template>

<script>
import Header from '@/components/common/_header.vue'
import { Cell, MessageBox } from 'mint-ui'

export default {
  components: {
    'v-header': Header,
    Cell
  },
  data () {
    return {
      datas: [],
      selected: '1',
      f1: true,
      query: {}
    }
  },
  methods: {
    bakckToPay (v) {
      location.assign('car.html?address=' + v)
      /* this.$router.push({
        path: 'car/pay?address=' + v
      }) */
    },
    toggle (v) {
      console.log('setDefault')
      console.log(v)
      const self = this
      self.$store.dispatch('setDefault', {'a_id': v}).then(function (res) { // 广告
        let result = res.data
        if (result.code) {
          console.log('result.msg')
          console.log(result.msg)
          self.setActive()
          // self.datas=result.msg.rows;
          // self.property=result.msg.property;
          // self.property=JSON.parse(result.msg.property);
        } else {
          console.log(result.error)
        }
      })
    },
    addressDelete (v) {
      MessageBox.confirm('你确定要删除吗?').then(action => {
        console.log('addressDelete')
        console.log(v)
        const self = this
        self.$store.dispatch('addressDelete', {'a_id': v}).then(function (res) { // 广告
          let result = res.data
          if (result.code) {
            console.log('result.msg')
            console.log(result.msg)
            self.setActive()
            // self.datas=result.msg.rows;
            // self.property=result.msg.property;
            // self.property=JSON.parse(result.msg.property);
          } else {
            console.log(result.error)
          }
        })
      })
    },
    setActive () {
      const self = this
      self.$store.dispatch('addressList').then(function (res) { // 广告
        let result = res.data
        if (result.code) {
          console.log('result.msg')
          console.log(result.msg)
          self.datas = result.msg.rows
          // self.property=result.msg.property;
          // self.property=JSON.parse(result.msg.property);
        } else {
          console.log(result.error)
        }
      })
    },
    param () {
      const self = this
      console.log(self.$route.query)
      console.log('self.$route.query.order')
      console.log(self.$route.query.order)
      if (self.$route.query.order) {
        self.query.order = self.$route.query.order
      }
    }
  },

  mounted () {
    const self = this
    self.param()
    // this.$store.dispatch('setDatas');
    self.setActive()
  }
}
</script>

<style lang="less" scoped>
@import '../../../assets/fz.less';
.main{
  header {
    .header-d {
      width: 100%;
      font-size: 4.5vw;
    }
  }
.company{
padding-top: 12%;
font-size:16px;
width:100%;
  padding-bottom: 10vw;
   .address{
     margin: 4vw 0;
     line-height: 11vw;
     padding: 2vw 4vw 2vw 3vw;
     background: #fffefe;
     font-size: 4.3vw;
   }
   .info_right{
     float:right;
    }
  .lh{
    line-height: 14vw;
  }
  .lh-1{
    margin-left: 32%;
  }
    .acition{
     border-top:1px solid #d2c8c8;
      display: inline-block;
      width: 100%;
            .something-left {
                -ms-flex: 2;
                -webkit-box-flex: 2;
                flex: 2;
                label {
                    float: left;
                    background: url("../../../assets/car/images/t.svg") no-repeat center left/50% 50%;
                    margin-left: -7vw;
                    line-height: 14vw;
                    input {
                        width: 14vw;
                        opacity: 0;
                        filter: alpha(opacity=0);
                    }
                }
                .false {
                    background: url("../../../assets/car/images/f.svg") no-repeat left /50% 50%!important;
                }
            }
    }
    .danger{
       width: 100%;
     }

}
  .mint-button{
    position: fixed;
    height: 12vw;
    width: 100%;
    bottom: 0;
    background:#f74b27;
    color:#fff;
    font-size: 4vw;
  }
}
</style>
