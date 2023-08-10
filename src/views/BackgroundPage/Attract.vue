<template>
  <div class="main">
    <div id="vditor"></div>
    <div><el-button @click="submitForm">提交</el-button></div>
  </div>
</template>

<script>
import Vditor from 'vditor'
import 'vditor/dist/index.css'
import articles from '@/api/article/index'
export default {
  data() {
    return {
      contentEditor: '',
      //文章实体
      article:{
        content:''
      }
    }
  },
  methods: {
    createEditor() {
      this.contentEditor = new Vditor('vditor', {
        //宽高类似 可不写为自适应
        height: 660,
        //图标配置
        icon: "material",
        placeholder: '开始编辑',
        toolbarConfig: {
          //固定顶部工具栏
          pin: true,
        },
        // after(){
        //   this.contentEditor.setValue('')
        // },
        cache: {
          //缓存回调
          after(text) {

          },
        },
        // blur(){
        //   console.log("离开了");
        // },
        //大纲的显示
        outline: {
          enable: true,
          position: "right"
        },
        //字数统计
        counter: {
          enable: true
        },
        //启用拖拽
        resize: {
          enable: true,
          position: "bottom"
        },
        //废弃 使用单独api进行文件上传
        // upload: {
        //   accept: 'image/*,.mp3, .wav, .rar',
        //   url: '/api/upload/editor',
        //   linkToImgUrl: '/api/upload/fetch',
        //   filename(name) {
        //     return name.replace(/[^(a-zA-Z0-9\u4e00-\u9fa5\.)]/g, '').
        //       replace(/[\?\\/:|<>\*\[\]\(\)\$%\{\}@~]/g, '').
        //       replace('/\\s/g', '')
        //   },
        // },
      })
    },
    submitForm() {
      const value = this.contentEditor.getValue()
      this.article.content=value
      if (value.length === 1 || value == null || value === '') {
        this.$message({
          message: '不可以为空！',
          type: 'warning'
        });
      } else {
        //提交
        articles.addArticles(this.article)
          .then(response => {
            this.$message({
              message: response.data.msg,
              type: 'success'
            });
            //提交过后将value置空
            this.contentEditor.setValue('')
          })
          .catch(error => {

          });
      }

    },

  },
  mounted() {
    this.createEditor()
  },
}
</script>

<style lang="less" scoped>
.main {
  #vditor {
    margin-top: 20px;
  }
}
</style>