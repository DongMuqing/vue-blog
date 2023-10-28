<template>
  <div class="main">
    <el-button type="" @click="flush" >刷 新</el-button>
    <el-button type="" @click="goPublish">去发布</el-button>
    <div class="info">
      <el-table :data="articles" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="封面">
                <div class="demo-image__preview">
                  <template  class="test">
                    <el-image :src="props.row.cover" :preview-src-list="articles.cover" :key="index" lazy>
                    </el-image>
                  </template>
                </div>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>

        <el-table-column label="文章ID" prop="id"></el-table-column>
        <el-table-column label="封面">
          <template slot-scope="scope">
            <el-avatar :src="scope.row.cover"></el-avatar>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" prop="createTime"></el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
            <el-button size="mini" type="primary" @click="handleInfo(scope.row.content)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="block">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4"
        :page-sizes="[5, 10, 20, 30, 40]" :page-size=size layout="total, sizes, prev, pager, next, jumper" :total=total>
      </el-pagination>
    </div>
  </div>
</template>

<script>
import Vditor from 'vditor'
import 'vditor/dist/index.css'
import articles from '@/api/admin/article'
export default {
  data() {
    return {
      contentEditor: '',
      //文章实体
      article: {
        cover: '',
        title: '',
        content: '',
      },
      labelPosition: 'top',
      Releasetime: {
        date: '',
        time: ''
      },
      // 文章数据
      articles: [],

      total: '',
      pages: '',
      //默认查询第一页每页10条
      size: 10,
      current: 1,
    }
  },
  methods: {
    flush(){
      this.getArticle()
    },
    goPublish(){
      this.$router.push('/main/publish')
    },
    handleSizeChange(val) {
      this.size = val
      this.getArticle()
    },
    handleCurrentChange(val) {
      this.current = val
      this.getArticle()
    },
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
    //获取文章信息
    getArticle() {
      articles.getArticleByUser(this.current,this.size)
        .then(res => {
          console.log(res.data);
          const { msg } = res.data
          const { total, pages, data } = res.data.data;
          this.articles = data;
          this.total = total
          this.pages = pages
          this.$message({
            message: msg,
            type: 'success'
          });
        })
    },
    //删除文章
    handleDelete(id){
        articles.delById(id)
          .then(res=>{
            this.$message({
            message: res.data.msg,
            type: 'success'
          });
          this.getArticle()
          })
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
    this.createEditor(),
      this.getArticle()
  },
}
</script>

<style lang="less" scoped>
.main {
  height: 80vh;
 

  .info {
    .el-table {
      overflow-y: hidden;
    }
  }

  #vditor {
    margin-left: 30vw;
    margin-top: 20px;
  }
}
.demo-image__preview {
  width: 100%;

  .el-image {
    width: 108px;
    height: 108px;
    margin-right: 10px;
    margin-top: 20px;
    border-radius: 15% 15%;
  }
}
</style>