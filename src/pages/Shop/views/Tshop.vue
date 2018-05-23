<template lang="html">
  <div class="tshop">
    <div class="sheader">
      <i class="si"><i class="icon-go" @click="$router.go(-1)"></i></i>
      <span class="stspan">{{name}}</span>
      <!--<i class="icon-search"></i>-->
    </div>
    <ul class="tab2-ul" v-infinite-scroll="loadMore" infinite-scroll-disabled="spinnerloading" infinite-scroll-distance="10">
      <keep-alive>
      <div class="left">
        <li v-if="circle.length > 0" class="tab2-li" v-for="(item,index) in list1" @click="oto(item)" :key="index">
            <img class="tab2-li-img" :src="$helper.getRealPicURL(item.cover,item.company_id,item.shop_id)" />
            <div class="tab2-li-span">
              <span class="li-span-name">{{item.title}}</span>
              <span class="li-span-price">
                ￥<span  class="big-price">{{item.min_price}}</span>
                <span v-if="parseInt(item.max_price) > parseInt(item.min_price)" class="big-price">~{{item.max_price}}</span>
              </span>
              <i class="li-span-i"></i>
            </div>
        </li>
      </div>
      </keep-alive>
      <keep-alive>
      <div id="rightColumn" class="right">
        <li v-if="circle.length > 0" class="tab2-li" v-for="(item,index) in list2"  @click="oto(item)" :key="index">
            <img class="tab2-li-img" :src="$helper.getRealPicURL(item.cover,item.company_id,item.shop_id)"  />
            <div class="tab2-li-span">
              <span class="li-span-name">{{item.title}}</span>
              <span class="li-span-price">
                ￥<span  class="big-price">{{item.min_price}}</span>
                <span v-if="parseInt(item.max_price) > parseInt(item.min_price)" class="big-price">~{{item.max_price}}</span>
              </span>
              <i class="li-span-i"></i>
            </div>
        </li>
      </div>
      </keep-alive>
    </ul>
    <div class="spinner-center">
      <mt-spinner v-show="!spinnerloading" type="triple-bounce" :size="10"></mt-spinner>
    </div>
    <div v-show="spinnerloading" class="tab2-ul-footer">已经是全部啦~~~</div>
  </div>
</template>
<script>
function checkDup (array, obj) {
  var value = obj.id
  for (var i = 0; i < array.length; i++) {
    if (obj) {
      if (array[i]) {
        var value1 = array[i].id
        if (value === value1) {
          return true
        }
      }
    }
  }
  return false
}
export default {
  name: 'Tshop',
  data () {
    return {
      name: this.$localStorage.get('name'),
      circle_id: this.$localStorage.get('circle_id'),
      company_id: this.$route.query.company_id,
      shop_id: this.$route.query.shop_id,
      circle: [],
      list1: [],
      list2: [],
      spinnerloading: false,
      isloading: false,
      now_page: 1,
      page_size: 10,
      total: 0
    }
  },
  methods: {
    scrollEvent () {
      this.$route.meta.position = {x: 0, y: document.documentElement.scrollTop || document.body.scrollTop}
      console.log(this.$route.meta.position)
    },
    oto (item) {
      this.$router.push({
        name: '详情页',
        query: {
          shop_name: item.shop_name,
          goods_id: item.goods_id,
          serial: encodeURIComponent(item.serial),
          company_id: item.company_id,
          shop_id: item.shop_id,
          codeid: this.$localStorage.get('CODEID')
        }
      })
    },
    loadMore () {
      const self = this
      if (self.spinnerloading) {
        return false
      }
      // 正在加载中 就直接返回
      if (self.isloading) {
        return false
      }
      setTimeout(() => {
        self.setActive()
      }, 1000)
    },
    setActive () {
      const self = this
      // spinnerloading 表示是否全部加载完成  isloading 用来表示是否正在加载
      if (!self.spinnerloading && !self.isloading) {
        self.isloading = true
        self.$store.dispatch('getGoodsByCircleId', {
          'circle_id': self.circle_id,
          page_size: self.page_size,
          now_page: self.now_page
        }).then(function (res) {
          self.isloading = false
          let result = res.data
          if (+result.code === 1) {
            if (self.now_page === 1) {
              self.circle = result.msg.rows
            }
            for (let i in result.msg.rows) {
              if (!checkDup(self.circle, result.msg.rows[i])) {
                self.circle.push(result.msg.rows[i])
              //  let goodsList = result.msg.rows
              }
            }
            let goodsList = result.msg.rows
            for (let i = 0; i < goodsList.length; i++) {
              if ((i % 2) === 0) {
                self.list1.push(goodsList[i])
              } else {
                self.list2.push(goodsList[i])
              }
            }
            // 这个条件表明数据已经全部加载完毕 设定 spinnerloading = true  loadmore 方法就不会在触发
            if (+result.msg.pagination.total_count <= self.circle.length) {
              // 强制刷新DOM  用set方法 禁止loadMore 调用
              self.$set(self, 'spinnerloading', true)
            } else {
              // 其余情况 就让page += 1 注意 滑动到底部的时候才会调用  数据不满一屏幕的时候 会自动调用loadMore
              self.now_page++
              console.log(self.now_page)
            }
          } else {
            self.isloading = false
            console.log(result.error)
          }
        })
      }
    }
  },
  watch: {
    select (value) {
      let self = this
      if (+value === +self.id && self.circle.length < 1) {
        self.loadMore()
      }
    }
  },
  created () {
    console.log('created')
    document.addEventListener('scroll', this.scrollEvent)
  },
  beforeDestroy () {
    document.removeEventListener('scroll', this.scrollEvent)
  }
}
</script>
<style lang="less" scoped>
  @import "../../../assets/user/style.css";
  .spinner-center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .tab2-ul-footer {
    text-align: center;
    height: 14.7vw;
    line-height: 14.7vw;
    font-size: 4.2vw;
  }
  .tshop{
    .sheader{
      top: 0;
      height: 12vw;
      background: #f9f9f9;
      line-height: 12vw;
      padding: 0 5vw;
      position: fixed;
      width: 100%;
      z-index: 1000;
      .stspan{
        display: inline-block;
        font-size: 4.7vw;
        width: 74%;
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: middle;
      }
      .si{
        transform: rotate(180deg);
        display: inline-block;
        vertical-align: middle;
      }
      .icon-go:before,.icon-search:before{
        font-size: 6.4vw;
        vertical-align: middle;
      }
    }
    .tab2-ul {
       width: 100vw;
       background: #f7f4f4;
       display: flex;
       padding: 12% 0 3%;
       .left,.right {
         width: 50vw;
         .tab2-li {
           width: 94%;
           margin-left: 3%;
           margin-top: 8%;
           border-radius: 6px;
           .tab2-li-img {
             width: 100%;
             height: 70%;
             border-radius: 6px 6px 3px 3px;
           }
           .tab2-li-span {
             padding: 0 1.4vw 1vw;
             position: relative;
             .li-span-name {
               display: block;
               overflow: hidden;
               text-overflow: ellipsis;
               white-space: nowrap;
               padding: 3vw 0 2vw;
               font-size: 4.2vw;
             }
             .li-span-price {
               color: red;
               font-size: 3vw;
               .big-price {
                 font-size: 3.2vw;
               }
             }
             .li-span-pay {
               font-size: 3vw;
               padding-left: 1.4vw;
               display: inline-block;
               width: 47%;
               overflow: hidden;
               text-overflow: ellipsis;
               white-space: nowrap;
               vertical-align: middle;
             }
             .li-span-i {
               padding: 3.4vw 4.8vw;
               background: url("../../../images/cart.png");
               background-size: 100% 100%;
               margin-left: 48%;
               position: absolute;
               height: 2.4vw;
               bottom: 0;
               right: 0;
             }
           }
         }
       }
     }
  }
</style>
