<template lang="html">
  <div class="main" >
    <v-header class="header">
      <div class="header-d" slot="title">管理评论</div>
    </v-header>

        <!-- tab-container -->
        <mt-tab-container v-model="selected" class="show">
          <mt-tab-container-item id="1">
              <div class="countcom " >
                 <div class="commont">
                      <div class="info">
                           <div style='font-size: 20px;'><a class="info_left">全部评论<span>({{length}})</span></a></div>
                      </div>
                 </div>
              </div>
             <!-- <v-list></v-list>-->

             <div  class="company" v-for="(row,index) in datas">
                 <div class="commont">
                      <div class="info">
                           <div style='font-size: 20px;'><a class="info_left">用户名:{{row.user_mobile}}</a><a class="info_right">{{row.created_at}}</a></div>
                           <div  class="info_left" style="color:#988989;font-size: 16px;">商品名称：{{row.good_name}}</div>
                           <div  class="info_left" style="color:#988989;font-size: 16px;">商品规格：{{row.good_format}}</div>
                           <div  class="info_left" style="color:#211919">{{row.comment}}</div>
                      </div>
                      <div>
                      <!--<a class="lh" @click="addressDelete(v1.a_id)" >删除</a>-->
                       </div>
                 </div>
              </div>

          </mt-tab-container-item>
        </mt-tab-container>

  </div>
</template>

<script>
import Header from '../../../components/common/_header.vue'
import { Cell } from 'mint-ui';
import List from '../components/comment/list.vue'
export default {
   components:{
    'v-header':Header,
    'v-list':List,
    Cell
  },
  data(){
    return {
      datas:[],
      selected:"1",
      f1:true,
      query:{},
      page_size:30,
      now_page:1,
      length:0
    }
  },
 methods: {
            param() {
                  const self = this;
                  console.log(self.$route.goodsid);
                  console.log('self.$route.query.goodsid');
                  console.log(self.$route.query.goodsid);
                  if (self.$route.query.goodsid) {
                    self.query.goodsid = self.$route.query.goodsid;
                  }
            },
             setActive(){
                const self=this;
                self.$store.dispatch('commentList',{'good_id':self.query.goodsid,'page_size':self.page_size,'now_page':self.now_page}).then(function (res) { //商品
                      let result=res.data;
                        if(result.code){
                          /*  console.log('result.msg');
                            console.log(result.msg);
                            if(self.page===1){
                             self.datas=result.msg.rows;
                            }else{
                                result.msg.rows.forEach(v=>{
                                    self.datas.push(v);
                                });
                            }*/
                             self.datas=result.msg.rows;
                             self.length=result.msg.rows.length;
                        }else{
                          console.log(result.error);
                        }
                });
            }
        },

        mounted(){
          const self=this;
          self.param();
          self.setActive();
        }
    }
</script>

<style lang="less" scoped>
@import '../../../assets/fz.less';
.main{
background: #f0f0f0;
  .header {
    .header-d {
      width: 100%;
      font-size: 4.5vw;
    }
  }
  .show{
    padding-top: 12vw;
  }
  .countcom{
    line-height: 11vw;
    padding: 2vw 4vw 2vw 3vw;
    background: #fffefe;
    font-size: 4.3vw;
    span{
      color:#e62727;
    }
  }
.company{
font-size:16px;
width:100%;
  padding-bottom: 0vw;
   .commont{
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
        border: 1px solid #F00;
    color: red;
    border-radius: 5px;
    line-height: 14vw;
  }
  .lh-1{
    margin-left: 35.9%;
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
    height: 10vw;
    width: 100%;
    bottom: 0;
    background:#f74b27;
    color:#fff;
    font-size: 4vw;
  }
}
</style>
