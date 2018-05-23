<template>
  <div class="addass">
    <v-header>
      <div class="addheader" slot="title">发表评价</div>
    </v-header>
 <!--   <div class="add1">
      <img class="add1-img" />
      <span class="add1-span">这是一个很特别的名字，所以你也记不住名字，哈哈哈哈哈</span>
    </div>-->
    <div class="add2">
      <div class="add-span">宝贝描述</div>
      <textarea class="add2-text"  v-model="comment" placeholder="在这里写下您对这件商品的看法吧!"></textarea>
    </div>
    <div class="add3" @click="handSubmit">发表评价</div>
  </div>
</template>
<script>
  import Header from '../../../components/common/_header.vue'
  import { Toast } from 'mint-ui'
  export default{
    components:{
      'v-header' : Header
    },
  data(){
    return {
      datas:[],
      selected:"1",
      f1:true,
      query:{},
      page_size:30,
      now_page:1,
      length:0,
      comment:''
    }
  },
 methods: {
            param() {
                  const self = this;
                  console.log(self.$route.serial);
                  console.log('self.$route.query.serial');
                  console.log(self.$route.query.serial);
                  if (self.$route.query.serial) {
                    let query={
                      serial:self.$route.query.serial
                    }
                    self.query=query;
                  }
            },
             handSubmit(){
                const self=this;
                let comment_info={
                    "commentinfo":[self.comment],
                    "comment_status":0,
                    "service_status":3,
                    "logistics_status":0
                };
                let images=[
                  {
                    "images":"http://tva1.sinaimg.cn/crop.79.114.313.313.50/a33d1690jw8eqgfhcx55fj20c80fogmy.jpg"
                  }
                ];
                self.$store.dispatch('addComment',{'comment_info':JSON.stringify(comment_info),'pid':0,'serial':self.query.serial,'images':JSON.stringify(images)}).then(function (res) { //商品
                      let result=res.data;
                        if(result.code){
                            Toast('谢谢您用心写评价，这会帮助到更多想买的他们！');
                           setTimeout(()=>{
                              location.assign('indent.html?selected=5')
                        },1000);
            
                        }else{
                          console.log(result.error);
                        }
                });
            }
        },
         mounted(){
           const self=this;
           self.param();
           //self.setActive();
        }
  }
</script>
<style lang="less" scoped>
  .addass{
    background: #f0f0f0;
    height: 100%;
    header{
      .addheader{
        width: 100%;
        font-size: 4.3vw;
      }
    }
    .add1{
      padding-top: 12%;
      height: 18vw;
      line-height: 18vw;
      border-bottom: 0.3vw solid #d0d0d0;
      background: #fff;
      .add1-img{
        width: 12vw;
        height: 12vw;
        background: #e0e0e0;
        margin-left: 5%;
      }
      .add1-span{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 4vw;
        display: inline-block;
        width: 80%;
        vertical-align: middle;
        padding-left: 1%;
      }
    }
    .add2{
      padding-top: 12vw;
      background: #fff;
      padding-bottom: 5%;
      .add-span{
        height: 12vw;
        line-height: 12vw;
        font-size: 4.5vw;
        padding-left: 5%;
        color: #1a1515;
      }
      .add2-text{
        border: 1px solid #f74b27;
        border-radius: 4px;
        height: 40vw;
        width: 90%;
        margin-left: 5%;
        border: none;
        font-size: 4.0vw;
        color: #999;
      }
      .add2-text::-webkit-input-placeholder{
        color: #999;
      }
    }
    .add3{
      height: 10vw;
      font-size: 4.5vw;
      background: #f74b27;
      color: white;
      text-align: center;
      line-height: 10vw;
      width: 60%;
      border-radius: 7vw;
      margin: 8% auto 0;
    }
  }
</style>
