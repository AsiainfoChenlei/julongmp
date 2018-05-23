<template lang="html">
  <div class="tread" id="tread">
    <div class="headFixed">
      <div class="tread-header">
        <i class="icon-index" @click="$router.go(-1)"></i>
        <span class="th-span">
        <select class="select1" v-model="selected" >
           <option v-for="item in options" :key="item.label" class="optin1" :value ="item">{{item.label}}</option>
        </select>
        <!-- <i class="span-1"></i>-->
        </span>
        <!--  <i class="icon-search"></i> -->
      </div>
      <div class="classify">
        <ul class="tread-ul">
          <li class="tread-li" v-for="(k,i) in selected.children" :key="i" :class="{'is-select1':i==secondSelected}" @click="choseSecondSelected(i,k)">
            {{k.label}}
          </li>
        </ul>
      </div>
    </div>
    <div class="content" id="vcontent" v-infinite-scroll="loadMore" :style="style" infinite-scroll-disabled="allLoad" infinite-scroll-distance="10">
      <div v-for="(item,index) in indexlist" :key="index" :id="index">
        <v-tdcontent :address="item"></v-tdcontent>
      </div>
    </div>
    <!--<div class="tread-footer">-->
      <!--<ul class="tread-ul">-->
        <!--<li class="tread-li" v-for="(k,i) in circle" :class="{'is-select2':circleSelected==i}" @click="choseCircleSelected(i,k)" :id="'circle'+i">-->
          <!--{{k.circle_name}}-->
        <!--</li>-->
      <!--</ul>-->
    <!--</div>-->
    <!--<div class="spinner-center">-->
      <!--<mt-spinner v-show="isLoading" type="triple-bounce" :size="50"></mt-spinner>-->
    <!--</div>-->
    <!--<mt-popup v-model="popupVisible" position="bottom">-->
      <!--<mt-picker :slots="slots" @change="onValuesChange"></mt-picker>-->
    <!--</mt-popup>-->
  </div>
</template>
<script type="text/javascript">
export default {
  watch: {
    selected (value) {
      let self = this
      if (value) {
        self.$localStorage.set('currentTopCategory', value.value)
        self.categoryid = value.children[self.secondSelected].value
        self.circleSelected = 0
        self.now_page = 1
        self.allLoad = false
        self.indexlist = []
        self.circleid = ''
        setTimeout(() => {
          // 切换路由
          self.$router.replace({
            name: '商圈',
            query: {
              cid: value.value,
              second: self.secondSelected
            }
          })
        }, 300)
        self.loadMore()
      }
    }
  },
  data () {
    return {
      selected: {},
      loadedData: false,
      allLoad: false,
      scroll: '',
      isLoading: false
    }
  }
}
</script>
<style lang="less" scoped>
  @import '../../../assets/user/style.css';
  @import '../../../assets/user/icon/carstyle.css';
  .slot1 {
    width: 100%;
  }
  .is-select2 {
    background-color: #FB701B;
  }
  .tread {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    .headFixed {
      position: fixed;
      margin: 0px;
      padding: 0px;
      height: 24vw;
      z-index: 100;
      width: 100%;
      .tread-header {
        top: 0;
        height: 12vw;
        background: #f9f9f9;
        line-height: 12vw;
        padding: 0 5vw;
        .th-span {
          vertical-align: super;
          display: inline-block;
          width: 82%;
          text-align: center;
        }
        .select1 {
          border: none;
          background: #f9f9f9;
          font-size: 5.2vw;
          height: 9vw;
          color: #333;
          option {
            background: #fff;
            font-size: 3vw;
            overflow: scroll;
          }
        }
        .icon-index:before,
        .icon-search:before {
          font-size: 6vw;
          line-height: 12vw;
          color: #292929;
        }
        .header-span {
          font-size: 6vw;
          color: #000;
        }
        .span-1 {
          border-color: #000 transparent transparent transparent;
          border-width: 2.5vw 1.5vw 0 1.5vw;
          border-style: solid;
          display: inline-block;
        }
      }
      .classify {
        top: 12vw;
        background: #f86141;
        color: #fff;
        white-space: nowrap;
        overflow-x: auto;
        height: 12vw;
        line-height: 12vw;
      }
    }
    .content {
      margin-top: 24vw;
      overflow: scroll;
    }
    .tread-ul {
      height: 100%;
      margin-left: 2%;
      background-color: inherit;
      .tread-li {
        display: inline-block;
        height: 100%;
        background-color: inherit;
        /*min-width: 15vw;*/
        /*text-align: center;*/
        margin-right: 2vw;
        font-size: 4.5vw;
        padding: 0 2vw;
      }
      .is-select1 {
        color: #fbec04;
        border-bottom: 1vw solid #fbec04;
        height: 92%;
      }
      .is-select2 {
        color: #fbec04;
        border-bottom: 1vw solid #fbec04;
        height: 92%;
      }
    }
    .classify::-webkit-scrollbar,
    .tread-footer::-webkit-scrollbar {
      display: none;
    }
    .spinner-center {
      display: flex;
      width: 100%;
      justify-content: center;
      align-items: center;
      bottom: 12vw;
      position: fixed;
    }
    .tread-footer {
      position: fixed;
      bottom: 0;
      background: #f86141;
      color: #fff;
      white-space: nowrap;
      overflow-x: auto;
      height: 12vw;
      line-height: 12vw;
      right: 0;
      left: 0;
    }
  }
</style>
