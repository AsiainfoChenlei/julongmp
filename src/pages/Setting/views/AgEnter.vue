<template lang="html">

  <div class="rzxy_main">
    <div class="back" @click="$router.go(-1)">
      <span class="icon-go"></span>
    </div>
    <h5>入驻协议</h5>
    <span>
      甲方（商家）：
      <br/> 乙方：湖北与友携行电子商务有限公司
    </span>
    <p class="spacetwo">
      乙方为甲方提供乙方电子商务平台（巨龙）上的免费开店技术服务，甲方入驻乙方电子商务平台诚信开店，免缴纳保证金。为保障市场的正常发展，甲、乙双方应遵守如下条例：
    </p>

    <h6>
      入驻商家基本标准：
    </h6>

    <p>
      1、入驻商家须为实体店，有相关合法的个体经营户营业执照或公司执照等，食品、医疗特殊行业需提供相关资质；
      <br/> 2、实体店内装修整洁，灯饰明亮。店面大小至少在30平米以上（根据行业不同，面积可适当考虑，根据行业调整）；
      <br/> 3、实体店所售商品价格与该区域行业价格相符,所售商品保质保价；
      <br/> 4、实体店具有正常经营的能力；
    </p>

    <h6>
      遵守条例：
    </h6>

    <p>1、甲方必须诚信经营，不得买卖假冒产品，欺诈消费者；如甲方经营期间因违法违规造成损害的，由甲方承担一切责任。甲方依法义务缴纳商品销售增值税。
      <br/> 2、甲方向乙方提供合法、真实、有效相关证件（如个体营业执照等）
      <br/> 3、甲乙双方相互促进彼此的合作关系，双方之间不得恶意损害对方的利益。
      <br/> 4、甲方所售商品需保质保价，在乙方平台上所售商品须小于或等于线下实体店商品售价，且商品售价须与区域行业价格相符；所售产品需符合巨龙商城以及国家法律法规。
      <br/> 5、甲方上传店铺的商品以及库存须与实体店内相符，不能上传非店面内所售商品；
      <br/> 6、甲方发货至消费者，所发货商品须从店内发货，不得代销其他区域产品，从他区发货。
      <br/> 7、甲方收到消费者订单，须及时发货（快递或自送），及时更新相关物流信息。
      <br/> 8、甲方如因商品原因，不得与消费者发生冲突、恐吓等有损平台形象和消费者利益行为。应及时与消费者和谐沟通，调节矛盾。
      <br/> 9、甲方有权随时终止在乙方提供的电子商务平台上关闭网店，乙方作为自由零售贸易市场平台，不得采取不正当方式损害甲方利益。
      <br/> 10、甲方需提供真实可靠的有效、准确的信息、实体店地址、联系方式等
      <br/> 11、甲方保证在使用乙方提供的电子商务平台服务时实施的所有行为均遵守国家法律、法规和巨龙商城的相关规定以及各种社会公共利益或公共道德。如有违反导致任何法律后果的发生，甲方将以自己的名义独立承担所有相应的法律责任；
      <br/> 12、乙方监督巨龙商城电子商务平台的正常发展，保障甲方与消费者的切身利益。
      <br/> 13、甲方在乙方电子商务平台上产生重大不良影响，乙方有权关闭甲方在其电子商务平台上所经营的店铺；
      <br/> 14、未尽详细事项，甲乙双方协商后可做补充协议添加至本协议。乙方拥有本协议最终解释权。
    </p>

  </div>

</template>

<script>
// import { Lazyload } from 'mint-ui';
// import Lazylz from '@/components/catcategory/lazylz.vue'
export default {

}

</script>

<style lang="less" scoped>
  @import '../../../assets/fz.less';
  @import '../../../assets/agreement.css';
  @import '../../../assets/back.less';
  .rzxy_main {
    width: 92%;
    margin: 0 auto;
  }

  .spacetwo {
    text-indent: 8%;
  }

  .rzxy_main h5 {
    width: 100%;
    text-align: center;
    font-size: 30px;
    color: #333;
  }

  .rzxy_main h6 {
    font-size: 18px;
    margin: 0;
    line-height: 50px;
    color: #333;
    font-weight: bold;
  }

  .rzxy_main p {
    word-spacing: inherit;
    font-size: 15px;
    text-align: justify;
    color: #666;
    text-justify: inter-ideograph;
    line-height: 30px;
  }

  .rzxy_main span {
    font-size: 18px;
    line-height: 35px;
    color: #333;
    font-weight: bold;
  }

</style>
