<template>
  <div class="address">
    <!--地址选择组件-->
    <mt-popup v-model="show" position="bottom" :closeOnClickModal="closeOnClickModal">
      <section style="width:100%; height: 100%;">
        <div class="padding">
          <span @click="hidePicker">取消</span>
          <span @click="saveAddress" class="float-right">完成</span>
        </div>
        <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
      </section>
    </mt-popup>
  </div>
</template>

<script>
import Address from './address.js'
import { Toast } from 'mint-ui'
let apid = 0
// 根据apid查找对象
function findcity (item) {
  return item.apid === apid
}
// 根据aname获取名字
function getAddressName (item) {
  return item.aname
}
// 筛选出各省级对象
let pObj = Address.filter(findcity)
// 获取各省级对象名字
let provinces = pObj.map(getAddressName)
console.log(provinces)
export default {
  name: 'addressPicker',
  props: {
    showAddressPicker: Boolean,
    init: String
  },
  created () {
    if (this.init) {
      this.initVal = this.init
    }
    this.initAddress()
  },
  mounted () {
    let vm = this
    vm.show = vm.showAddressPicker
  },
  data () {
    return {
      slots: [{
        flex: 1,
        values: [],
        className: 'slot1',
        textAlign: 'center',
        defaultIndex: 3
      }, {
        divider: true,
        content: '-',
        className: 'slot2'
      }, {
        flex: 1,
        values: [],
        className: 'slot3',
        textAlign: 'center'
      }, {
        divider: true,
        content: '-',
        className: 'slot4',
        defaultIndex: 0
      }, {
        flex: 1,
        values: [],
        className: 'slot5',
        textAlign: 'center',
        defaultIndex: 0
      }],
      cprovinces: '',
      ccity: '',
      ctown: '',
      addressValue: '',
      disableClear: true,
      show: true,
      initVal: '北京-北京市-东城区',
      closeOnClickModal: false
    }
  },
  watch: {
    showAddressPicker (old, val) {
      this.show = !val
    },
    init (val) {
      this.initVal = val
      this.initAddress()
    },
    cprovinces (value) {

    },
    ccity (value) {

    }
  },
  methods: {
    saveAddress () { // 保存所选地区
      let vm = this
      vm.show = false
      vm.$emit('save-address', vm.addressValue)
    },
    hidePicker () { // 取消选择
      this.$emit('hide-picker', false)
    },
    // initProvincesData () {
    //   let [p , c, a] = this.initVal.split('-')
    //   let provincesData = Address.filter(item => item.apid === 0)
    //   let currentIndex = 0
    //   provincesData.filter((item, index) => {
    //     if (item.aname === p) {
    //       currentIndex = index
    //       return true
    //     }
    //   })
    //   console.log(currentIndex)
    // },
    initAddress () { // 初始化地址组件
      let vm = this
      let initAddress = vm.initVal.split('-')
      let p = Address.filter(item => +item.apid === 0)
      vm.slots[0].values = p.map(i => i.aname)
      vm.slots[0].values.map((val, index) => {
        if (initAddress[0] === val) {
          vm.slots[0].defaultIndex = index
        }
      })
      p.map((val) => {
        if (val.aname === initAddress[0]) {
          apid = +val.aid
        }
      })
      let citys = Address.filter(item => +item.apid === apid)
      vm.slots[2].values = citys.map(item => item.aname)
      citys.map((val, index) => {
        if (val.aname === initAddress[1]) {
          apid = +val.aid
          vm.slots[2].defaultIndex = index
        }
      })
      let towns = Address.filter(item => +item.apid === apid)
      vm.slots[4].values = towns.map(item => item.aname)
      vm.slots[4].values.map((val, index) => {
        if (initAddress[2] === val) {
          vm.slots[4].defaultIndex = index
        }
      })
      vm.addressValue = vm.slots[0].values[vm.slots[0].defaultIndex] +
          '-' + vm.slots[2].values[vm.slots[2].defaultIndex] +
          '-' + vm.slots[4].values[vm.slots[4].defaultIndex]
    },
    onValuesChange (picker, values) {
      let vm = this
      if (!values[0]) {
        // 解决第一次选择不选省份出现的bug
        values[0] = vm.slots[0].values[vm.slots[0].defaultIndex]
      }
      let p = Address.filter(item => +item.apid === 0)
      let cp = p.filter(item => item.aname === values[0])[0]
      let citys = Address.filter(item => +item.apid === +cp.aid)
      let cc = citys.filter(item => item.aname === values[1])[0]
      if (cc !== undefined) {
        let areas = Address.filter(item => +item.apid === +cc.aid)
        this.$nextTick(() => {
          if (areas !== undefined) {
            picker.setSlotValues(2, areas.map(item => item.aname))
          } else {
            Toast('areas empty')
          }
        })
        this.$nextTick(() => {
          picker.setSlotValues(1, citys.map(item => item.aname))
        })
      } else {
        Toast('city empty')
      }
      vm.addressValue = values.join('-')
      // if (values[2]) { // 确保地址组件已经完成初始化
      // 城市数组, 市区数组
      // let [p, c, a] = values
      // let aaa = 0
      // let provinces = Address.filter(item => +item.apid === 0)
      // let citys = []
      // let areas = []
      // for (let i in provinces) {
      //   if (provinces[i].aname === p) { // 根据省份名找到对应的城市数组
      //     aaa = provinces[i].aid
      //     console.log(aaa)
      //     if (aaa) { // 防止直辖市选择时的报错
      //       citys = Address.filter(item => +item.apid === +aaa)
      //       // vm.slots[2].values = citys.map(item => item.aname)
      //     }
      //   }
      // }
      // for (let j in citys) {
      //   if (citys[j].aname === c) { // 根据城市名找到对应的市区数组
      //     aaa = citys[j].aid
      //     console.log(aaa)
      //     if (!aaa) return false
      //     areas = Address.filter(item => +item.apid === +aaa)
      //     // vm.slots[4].values = areas.map(item => item.aname)
      //   }
      // }
      // vm.slots[2].values = citys.map(item => item.aname)
      // vm.slots[4].values = areas.map(item => item.aname)
      // console.log(provinces, citys, areas)
      // 以`-`连接地址: 广东-深圳-福田
      // vm.addressValue = values.join('-')
      // }
    }
  }
}

</script>

<style scoped>
  .mint-popup {
    width: 100%;
  }

  .footer-btn {
    box-sizing: border-box;
    position: fixed;
    width: 100%;
    z-index: 2;
    left: 0;
    bottom: 3rem;
  }

  .input {
    border: none;
  }

  .padding {
    padding: 15px;
  }

  .float-right {
    float: right;
  }

</style>
