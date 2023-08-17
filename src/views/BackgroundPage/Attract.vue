<template>
  <div class="main">
    <div class="info">
      <div style="margin: 20px;"></div>
      <el-form label-width="80px">
        <el-form-item label="活动时间">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="Releasetime.date" ref="date" style="width: 100%;">
            </el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-time-picker placeholder="选择时间" v-model="Releasetime.time" style="width: 100%;" ref="time">
            </el-time-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="封面">
          <el-input v-model="article.cover"></el-input>
        </el-form-item>
        <el-form-item label="标题">
          <el-input v-model="article.title"></el-input>
        </el-form-item>
      </el-form>
      <div><el-button @click="submitForm">提交</el-button></div>
    </div>
    <div id="vditor"></div>

  </div>
</template>

<script>
import { formaDate, formaTime } from '@/utils/submitTime'
import Vditor from 'vditor'
import 'vditor/dist/index.css'
import articles from '@/api/article/index'
export default {
  data() {
    return {
      contentEditor: '',
      //文章实体
      article: {
        cover: '',
        title: '',
        content: '',
        createTime: ''
      },
      labelPosition: 'top',
      Releasetime: {
        date: '',
        time: ''
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
        // outline: {
        //   enable: true,
        //   position: "right"
        // },
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
      this.formatDate()
      const value = this.contentEditor.getValue()
      this.article.content = value
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
            const newEmptyArticle = {
              cover: '',
              title: '',
              content: '',
              createTime: ''
            };
            this.article = newEmptyArticle;
          })
          .catch(error => {

          });
      }

    },
    formatDate() {
      this.Releasetime.date = formaDate(this.Releasetime.date)
      this.Releasetime.time = formaTime(this.Releasetime.time)
      this.article.createTime = this.Releasetime.date + " " + this.Releasetime.time
      this.Releasetime.date = ''
      this.Releasetime.time = ''
    }
  },
  mounted() {
    this.createEditor()
  },
}
</script>

<style lang="less" scoped>
.main {
  .info {
    height: 660px;
    width: 25vw;
    float: left;
    margin-left: 30px;
  }

  #vditor {
    margin-left: 30vw;
    margin-top: 20px;
  }
}
</style>