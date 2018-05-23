<template>
  <div class="auditing-1">
    <v-header>
      <div class="header" slot="title">入驻状态</div>
    </v-header>
    <div class="amain">
      <div class="amian-1" :class="Ctype"></div>
      <div class="amian-2">
        <div class="a2-1">
          <div class="a21-1">
            <span class="a2-span1">【已提交】</span>
            <span class="a2-span2">商户已提交审核资料</span>
          </div>
          <div class="a21-2">{{status.company_created_at}}</div>
        </div>
        <div class="a2-1">
          <div class="a21-1">
            <span class="a2-span1">【审核中】</span>
            <span class="a2-span2">为了打造良好的购物平台，审核周期一般为1-3个工作日，敬请见谅！
              <br/>如有问题，请联系微信<span class="a2-span1">julongmall</span>
            </span>
          </div>
          <div class="a21-2">{{status.company_created_at}}</div>
        </div>

        <div class="a2-1" v-if="type == 3 &&  +status.company_status==1">
          <div class="a21-1">
            <span class="a2-span1">【审核结果】</span>
            <span class="a2-span2">您的入驻申请<span class="a2-span3">已通过</span>，巨龙欢迎您的加入！
                 <div v-if="+status.has_apply_shop===1" style="color:#999">您现在只是获取了巨龙商城的开店资格,此资格允许开多家店哦！<br>目前您还需要在<span class="a2-span3" @click="shopManager">【店铺管理】</span>中【申请开店】来获取对应的"店铺编码"去登录"巨龙商户APP",来进行店铺管理。</div>
                <!-- <div v-if="+status.has_apply_shop===1 && +status.shop_status===0">【申请开店】管理员审核中,店铺编码请等待...</div>
                 <div v-if="+status.shop_status===1">您的店铺编码为：<span class="a2-span4">{{status.shop_id}}</span></div>
                 <div v-if="+status.shop_status===2">【申请开店】审核不通过,请重新审请</div>-->
               </span>
          </div>
          <div class="a21-2">{{status.company_updated_at}}</div>
        </div>

         <div class="a2-1" v-if="type == 3  && +status.company_status==2">
          <div class="a21-1">
            <span class="a2-span1">【审核结果】</span>
            <span class="a2-span2">您的入驻申请<span class="a2-span4">未通过</span>
               <br/>如有问题，请联系微信<span class="a2-span1">julongmall</span>并重新提交入驻申请
            </span>
          </div>
          <div class="a21-2">{{status.company_updated_at}}</div>
        </div>
      </div>
    </div>
<!-- <div class="content4"  v-if="(+status.company_status===1 &&  +status.has_apply_shop===0) || (+status.shop_status===2) ">
      <router-link :to="{name:'申请开店'}">
        <div class="but button1">申请开店</div>
      </router-link>
    </div>-->
    <v-footer></v-footer>
  </div>
</template>
<script type="text/javascript">
import Header from '../../../components/common/_header.vue'
import Footer from '../../../components/common/_footer.vue'
export default {
  components: {
    'v-header': Header,
    'v-footer': Footer
  },
  data () {
    return {
      type: 2, // 这个表示流程到了哪一步
      status: {}
    }
  },
  computed: {
    Ctype: function () {
      // if(this.type == 1) return 'a1';
      if (this.type === 2) return 'a2'
      if (this.type === 3) return 'a3'
    }
  },
  methods: {
    shopManager () {
      const self = this
      self.$router.push({name: '店铺管理'})
    },
    setActive () {
      const self = this
      self.$store.dispatch('getUserStatus').then(function (res) {
        console.log(res)
        let result = res.data
        //   console.log(self.status);
        if (result.code) {
          console.log('result.msg')
          console.log(result.msg)
          self.status = result.msg
          self.$localStorage.set('STATUS', JSON.stringify(result.msg))
          if (+self.status.company_status > 0) {
            self.type = 3
          }
          console.log(self.status.company_status)
          //   self.datas=result.msg;
          //   self.goodsid=result.msg.id;
          //   self.property=result.msg.stock;

          // self.property=JSON.parse(result.msg.property);
        } else {
          // MessageBox('提示',result.error[0]);
          console.log(result.error)
        }
      })
    }
  },
  mounted () {
    const self = this
    self.setActive()
  }
}
</script>
<style lang="less" scoped>
.content4 {
      font-size: 4vw;
      color: #fff;
      .but {
        height: 10vw;
        margin: 20% auto;
        line-height: 10vw;
        text-align: center;
        width: 85%;
        border-radius: 1vw;
      }
      .button1 {
        background: #00DA86;
      }
      .button2 {
        background: #CC0D10;
      }
    }

  .auditing-1{
    background: #f3f3f3;
    min-height: 100%;
    padding-bottom: 0.01%;
    .header{
      width: 100%;
      font-size: 4.5vw;
    }
    .amain{
      padding-top: 12%;
      height: 130vw;
      background: #fff;
      .amian-1{
        display: inline-block;
        width: 6%;
        height: 63%;
        margin: 7% 6% 0 9%;
      }
      .a1{
        height: 5%;
        background: url("/static/images/1_03.png") no-repeat;
        background-size: 100% 100%;
      }
      .a2{
        height: 25%;
        background: url("/static/images/3_03.png") no-repeat;
        background-size: 100% 100%;
      }
      .a3{
        background: url("/static/images/2_03.png") no-repeat;
        background-size: 100% 100%;
      }
      .amian-2{
        display: inline-block;
        width: 74%;
        font-size: 3.8vw;
        vertical-align: top;
        margin-top: 3%;
        .a2-1{
          border-bottom: 0.3vw solid #f0f0f0;
          .a21-1{
            line-height: 1.7;
            padding-top: 5%;
            letter-spacing: 0.3vw;
            .a2-span1{
              color: #f74b27;
            }
            .a2-span3{
              color: #15FA3E;
            }
            .a2-span4{
              color: #f74b27;
            }
          }
          .a21-2{
            height: 10vw;
            line-height: 10vw;
            color: #999;
          }
        }
      }
    }
  }
</style>
