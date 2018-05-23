<template>
  <div class="upload">
    <slot name="tips"></slot>
    <img v-if="temfile && showImage" class="preView" :src="temfile"/>
    <input type="file" name="file" :id="inputId" class="inputfile" style="display:none" @change="handleFileChange" ref="inputer" />
    <label :for="inputId" class="label">
    </label>
  </div>
</template>

<script>
export default {
  props: {
    choosedImageFile: {
      type: Function,
      default: () => {}
    },
    onErrorUpload: {
      type: Function,
      default: () => {}
    },
    onSuccessUpload: {
      type: Function,
      default: () => {}
    },
    showImage: {
      required: false
    },
    autoUpload: {
      required: false
    },
    identifier: {
      type: String,
      default: ''
    },
    prefix: {
      type: String,
      default: '1/1/a/'
    }
  },
  data () {
    return {
      temfile: null,
      qiniuUrl: 'http://ozrdx2iqj.bkt.clouddn.com/',
      inputId: '',
      dbPrefix: '@QINIU:julong@a@'
    }
  },
  methods: {
    imgPreview (file) {
      let self = this
      // 看支持不支持FileReader
      if (!file || !URL.createObjectURL) return
      if (/^image/.test(file.type)) {
        // 创建一个reader
        self.temfile = URL.createObjectURL(file)
        console.log(self.temfile)
      }
    },
    getUpToken () {
      const self = this
      return self.$store.dispatch('getUpToken', {})
    },
    uploadStart (file) {
      let self = this
      if (file != null) {
        // 上传
        self.getUpToken().then(function (res) {
          if (+res.data.code === 1) {
            self.token = res.data.msg
            const formData = new FormData()
            let d = new Date()
            let type = file.name.split('.')
            let suffix = d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.valueOf() + '.' + type[type.length - 1]
            let filename = self.prefix + suffix
            formData.append('token', self.token)
            formData.append('file', file)
            formData.append('key', filename)
            self.$store.dispatch('uploadImageTo7N', formData).then(function (res) {
              if (+res.status === 200) {
                self.temfile = self.qiniuUrl + res.data.key
                self.onSuccessUpload(self.temfile, self.dbPrefix + suffix, self.identifier || self.inputId)
                return false
              } else {
                self.onErrorUpload(new Error('返回状态错误'))
                return false
              }
            }).catch(function (err) {
              console.log(err)
              self.onErrorUpload(new Error('图片上传失败'))
              return false
            })
          }
        })
      } else {
        self.onErrorUpload(new Error('开始上传失败，图片不存在'))
        return false
      }
    },
    finishedChoosedImageFile (e) {
      let self = this
      self.choosedImageFile(e)
      if (self.autoUpload && e) {
        self.uploadStart(e)
      } else {
        self.imgPreview(e)
      }
    },
    handleFileChange (e) {
      let self = this
      let inputDOM = self.$refs.inputer
      // // 通过DOM取文件数据
      console.log(inputDOM.files)
      self.file = inputDOM.files[0]
      if (!self.file) {
        self.onErrorUpload(new Error('图片读取失败'))
        return false
      }
      let size = Math.floor(self.file.size / 1024)
      // 10M 限制
      if (size > 1024 * 10) {
        self.onErrorUpload(new Error('图片过大'))
        return false
      }
      self.finishedChoosedImageFile(self.file)
    }
  },
  mounted () {
    this.inputId = this.id || Math.round(Math.random() * 100000)
  }
}

</script>

<style lang="less" scoped>
  .upload {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    position: relative;
    .label {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }
    .preView {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }
  }
</style>
