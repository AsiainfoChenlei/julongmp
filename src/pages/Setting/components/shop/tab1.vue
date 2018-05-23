<template>
  <div class="tab1">
    <div class="tab1-title">
      <div class="title-span">
        <span class="span-lable">NEW ARRIVALS<hr class="span-hr"/></span>
        <span class="span-today">今日上新</span>
      </div>
    </div>
    <div class="area1">
      <ul class="area1-ul">
        <li class="area1-li"></li>
        <li class="area1-li"></li>
        <li class="area1-li"></li>
        <li class="area1-li"></li>
      </ul>
    </div>
    <div class="area2">
      <div style="padding: 10px 0 0 15px;">
        <div class="area2-title">
          <span class="area2-hot">HOT</span><span>/畅销尖货</span>
        </div>
      </div>
      <div class="area2-one">
        <div class="part-one"></div>
        <span class="part-one-span"><span class="triangle_border_right"></span>BEST SELLER</span>
        <span class="area2-span">￥<span>239</span></span>
      </div>
      <div class="area2-two">
        <div class="two-1">
          <img class="two-1-img"/>
          <span class="two-1-span span-1">￥<span>239</span></span>
          <span class="two-1-span span-2">2017新款时尚大衣</span>
        </div>
        <div class="two-2"></div>
      </div>
      <div class="area2-three">
        <div class="three-1">
          <span class="three-2">￥<span>239</span></span>
        </div>
        <span class="three-span span-1">/时尚前沿/</span>
        <span class="three-span">FASHION FRONTIER</span>
      </div>
      <div class="area2-four">
        <div class="four-1">fashion</div>
        <div class="four-2">时尚毛衣</div>
        <!--<div style="text-decoration-style:wavy"></div>-->
        <div class="four-3"></div>
      </div>
      <div class="area2-five">
        <ul class="five-ul">
          <li class="five-li li-one">
            <div class="li-one-part1">>>>>>>>>>>>>></div>
            <div class="li-one-part2">
              <div class="li2">
                <div class="li2-span">商品名商品名</div>
                <div class="li2-span li2-span-1">￥129</div>
              </div>
            </div>
          </li>
             <li class="five-li">
            <div class="li2">
              <div class="li2-span">商品名商品名</div>
              <div class="li2-span li2-span-1">￥129</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="area3">查看全部商品</div>
    <div class="footer"><a :href="QQurl" target="_blank">联系客服{{this.shopinfo.qq}}</a></div>
  </div>
</template>
<script>
export default {
  props: ['shopinfo'],
  computed: {
    QQurl: function () {
      // return "mqqwpa://im/chat?chat_type=wpa&amp;uin="+this.shopinfo.qq+"&amp;version=1";
      // return "http://wpa.qq.com/msgrd?v=3&uin="+this.shopinfo.qq+"&site=oicqzone.com&menu=yes"
      return 'mqqwpa://im/chat?chat_type=wpa&uin=' + this.shopinfo.qq + '&version=1&src_type=web&web_src=oicqzone.com'
    }
  }
}
</script>

<style lang="less" scoped>
  .tab1{
    background: #F3F3F3;
    padding-bottom: 13.5vw;
    img{
      width: 100%;
      height: 100%;
    }
    .tab1-title{
      height: 54vw;
      background: #DDDDDD;
      overflow: hidden;
      .title-span{
        width: 40%;
        height: 65%;
        background: #fff;
        margin: 8.3vw;
        .span-lable{
          width: 70%;
          display: inline-block;
          margin: 5vw;
          font: 4.5vw bold;
          font-weight: 550;
          .span-hr{
            margin-left: -17%;
            width: 98%;
            margin-top: 0;
          }
        }
        .span-today{
          padding: 1.5vw;
          background: #000;
          color: #fff;
          font-size: 3.7vw;
          margin-left: 3.5vw;
        }
      }
    }
    .area1{
      height: 41vw;
      background: #fff;
      margin: 3vw auto;
      padding: 3% 3% 4%;
      .area1-ul{
        height: 100%;
        font-size: 0;
        .area1-li{
          height: 50%;
          width: 49%;
          margin: 0.3vw;
          display: inline-block;
          background: #ECECEC;
        }
      }
    }
    .area2{
      background: #fff;
      .area2-title{
        padding: 2vw 0 0 3vw;
        font-size: 4vw;
      }
      .area2-hot{
        font-size: 15vw;
        font-weight: 700;
        color: #E8E8E8;
      }
      .area2-one{
        position: relative;
        margin-top: -2.7vw;
        .part-one{
          height: 79vw;
          background: #E8E8E8;
          width: 90%;
          display: inline-block;
        }
        .area2-span{
          position: absolute;
          bottom: 6vw;
          right: 15vw;
          background: #000;
          color: #fff;
          padding: 1vw 1vw 0.9vw;
          letter-spacing: 0.1vw;
          font-size: 4vw;
        }
        .part-one-span{
          width: 15vw;
          transform: rotate(90deg);
          display: inline-block;
          position: absolute;
          bottom: 28%;
          right: -1%;
          white-space: nowrap;
          font-size: 4vw;
          .triangle_border_right{
            display: block;
            border-width: 1.7vw 0 1.7vw 2vw;
            border-style: solid;
            border-color: transparent transparent transparent #000;
            position: absolute;
            left: -5vw;
            top: 0.5vw;
          }
        }
      }
      .area2-two{
        height: 61.5vw;
        padding: 5.5vw 10% 5.5vw 7vw;
        .two-1,.two-2{
          display: inline-block;
          width: 49%;
          height: 100%;
          vertical-align: middle;
        }
        .two-1{
          .two-1-img{
            width: 98%;
            height: 70%;
            background: #E8E8E8;
          }
          .two-1-span{
            display: block;
            float: right;
            margin-right: 2%;
          }
          .span-1{
            letter-spacing: 0.2vw;
            font-weight: 749;
            color: #000;
            margin-top: 14%;
            font-size: 5vw;
          }
          .span-2{
            letter-spacing: 0.2vw;
            color: #a9a4a4;
            margin-top: 2%;
            font-size: 4.2vw;
          }
        }
        .two-2{
          background: #E8E8E8;
        }
      }
      .area2-three{
        height: 64vw;
        background: #B6B6B6;
        margin-top: 23vw;
        position: relative;
        .three-1{
          position: absolute;
          height: 68vw;
          width: 56%;
          background: #E8E8E8;
          top: -17.5vw;
          left: 5.2vw;
        }
        .three-span{
          transform: rotate(90deg);
          position: absolute;
          color: #fff;
          white-space: nowrap;
          top: 35%;
          right: 15%;
          font-size: 4.3vw;
        }
        .span-1{
          transform: rotate(0deg);
          writing-mode: vertical-lr;
          top: 10%;
          right: 25%;
          font-size: 5vw;
        }
        .three-2{
          position: absolute;
          bottom: 6%;
          right: 8%;
          letter-spacing: 0.2vw;
          color: #000;
          font-size: 4.3vw;
        }
      }
      .area2-four{
        height: 26.9vw;
        background: #F3F3F3;
        margin: 5vw auto 0;
        text-align: center;
        overflow: hidden;
        .four-1{
          text-transform: uppercase;
          margin-top: 5vw;
          letter-spacing: 0.2vw;
          font-size: 5.3vw;
        }
        .four-2{
          color: #000;
          margin: 1vw auto;
          font-size: 4.2vw;
        }
        .four-3{
          background: url("../../../../images/bolang_1.png") repeat-x;
          width: 13.7vw;
          height: 3.5vw;
          margin-left: 43.5%;
          background-size: 100% 100%;
        }
      }
      .area2-five{
        padding: 5.5vw 0 0 4.3vw;
        .five-ul{
          .five-li{
            height: 61.5vw;
            background: #F3F3F3;
            width: 47%;
            display: inline-block;
            margin-right: 1.4vw;
            margin-bottom: 2.7vw;
            vertical-align: middle;
            position: relative;
            .li2{
              position: absolute;
              height: 11vw;
              text-align: center;
              background: #000;
              opacity: 0.3;
              color: #fff;
              bottom: 0;
              width: 100%;
              line-height: 1.3;
              padding-top: 3%;
              .li2-span{
                font-size: 4vw;
              }
              .li2-span-1{
                font-weight: 700;
              }
            }
          }
          .li-one{
            background: inherit;
            .li-one-part1{
              height: 5.4vw;
              margin: 3.2vw 0 1.4vw 12.6vw;
              color: #e0dddd;
              font-size: 4.2vw;
            }
            .li-one-part2{
              height: 44vw;
              background: #F3F3F3;
              position: relative;
            }
          }
        }
      }
    }
    .area3{
      height: 11vw;
      text-align: center;
      line-height: 11vw;
      color: #B6B6B6;
      font-size: 4.2vw;
    }
    .footer{
      width: 100%;
      height: 13.5vw;
      background: #fff;
      position: fixed;
      bottom: 0;
      line-height: 13.5vw;
      font-size: 4.3vw;
      text-align: center;
    }
  }
</style>
