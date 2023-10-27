<template>
  <div class="main">
    <!-- <div class="publish"> <el-button @click="showSub()">去发布</el-button></div> -->

    <div class="publish"><el-button @click="dialogFormVisible = true">去发布</el-button></div>
    <div class="info">
      <el-table :data="post" style="width: 100%">

        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="id">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="日期">
                <span>{{ props.row.createTime }}</span>
              </el-form-item>
              <el-form-item label="标题">
                <span>{{ props.row.title }}</span>
              </el-form-item>
              <el-form-item label="内容">
                <span>{{ props.row.content }}</span>
              </el-form-item>
              <el-form-item label="发布地点">
                <span>{{ props.row.location }}</span>
              </el-form-item>
              <el-form-item label="点赞数">
                <span>{{ props.row.upvoteNum }}</span>
              </el-form-item>
              <el-form-item label="图片">
                <!-- <span>{{ props.row.imgSrclist }}</span> -->
                <div class="demo-image__preview">
                  <template v-for="(src, index) in props.row.imgSrcList" class="test">
                    <el-image :src="src" :preview-src-list="post.imgSrcList" :key="index" lazy>
                    </el-image>
                  </template>
                </div>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>

        <el-table-column label="动态ID" prop="id"></el-table-column>
        <el-table-column label="日期" prop="createTime"></el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="block">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4"
        :page-sizes="[5, 10, 20, 30, 40]" :page-size=size layout="total, sizes, prev, pager, next, jumper" :total=total>
      </el-pagination>
    </div>
    <!-- 提交post dialog -->
    <div>
      <el-dialog title="动态内容" :visible.sync="dialogFormVisible">
        <el-form :model="form">

          <el-form-item label="标题" :label-width="formLabelWidth">
            <el-input v-model="posts.title" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="内容" :label-width="formLabelWidth">
            <el-input type="textarea" v-model="posts.content"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitPost">提 交</el-button>
        </div>

        <!-- 图片上传 -->
        <div class="upload" accept="image/*">
          <el-upload action="#" list-type="picture-card" :auto-upload="false" ref="upload" :drag="true" :multiple="true"
            :on-change="handleFileChange" style="height: 150px;">
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{file}">
              <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
              <span class="el-upload-list__item-actions">
                <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                  <i class="el-icon-zoom-in"></i>
                </span>
                <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import post from '@/api/admin/post';
import { uploadPostImage } from '@/utils/upload'
export default {
  data() {
    return {
      //获取动态的数据
      post: [
      ],
      subflag: false,
      id: '',
      total: '',
      pages: '',
      //默认查询第一页每页10条
      size: 10,
      current: 1,
      //dialog 相关属性
      dialogFormVisible: false,
      form: {
        title: '',
        content: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px',
      //提交动态数据
      posts: {
        title: '',
        content: '',
        imgSrcList: ''
      },
      //上传文件
      fileList: [],
    };
  },
  methods: {
    //获取动态
    fetchDynamcis() {
      post.postPage(this.current, this.size)
        .then(response => {
          // 处理接口返回的数据
          const { total, pages, data } = response.data.data
          this.total = total
          this.pages = pages
          // 遍历动态数组，将每个动态对象的 `imgSrclist` 转换为数组
          data.forEach(post => {
            post.imgSrcList = post.imgSrcList.split(",").map(item => item.trim().replace(/'/g, ''));
          });
          this.post = data;
        })
        .catch(error => {
          // 处理错误
        });
    },
    //动态的提交
    async submitPost() {
      try {
        if (this.posts.title !== '' && this.posts.content !== '' && this.fileList.length > 0) {
          // 先异步上传图片并获取URL
          const imgUrl = await uploadPostImage(this.fileList);
          this.posts.imgSrcList = imgUrl;
          post.submitPost(this.posts)
            .then(res => {
              this.$message({
                message: res.data.msg,
                type: 'success'
              });
              // 提交成功后新建一个空的对象并返回
              const newEmptyPosts = {
                title: '',
                content: '',
                imgSrcList: ''
              };
              //获取发布后的新数据
              this.fetchDynamcis()
              //置空文件list
              this.fileList = [];
              //移除存在的文件
              this.remove();
              //置空post对象
              this.posts = newEmptyPosts;
            })
        } else {
          this.$message({
            message: '请输入必要数据或选择上传图片！',
            type: 'warning'
          });
        }
      } catch (error) {
        // 处理错误
        console.error('提交失败', error);
      }
    },
    remove() {
      //清空文件
      this.$refs.upload.clearFiles()
    },
    // 分页数据变化
    handleSizeChange(val) {
      this.size = val
      this.fetchDynamcis()
    },
    handleCurrentChange(val) {
      this.current = val
      this.fetchDynamcis()
    },
    // 动态的删除
    handleDelete(id) {
      post.delPost(id)
        .then(res => {
          this.$message({
            message: res.data.msg,
            type: 'success'
          });
          this.fetchDynamcis()
        })
        .catch(error => {
          // 处理错误
        });
    },
    // 上传文件改变
    handleFileChange() {
      // 绑定到on-change  文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
      let uploadFiles = this.$refs.upload.uploadFiles;
      this.fileList = uploadFiles
    },
  },

  mounted() {
    this.fetchDynamcis();
  },
  created() {

  },
}
</script>

<style lang="less" scoped>
.main {
  height: 80vh;
  overflow-y: visible;

  .publish {
    float: right;

  }

  .el-table {

    .demo-table-expand {
      font-size: 0;

      .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;

        /*
        scoped会影响到label的获取
        使用deep进行样式穿透
        */
        /deep/ label {
          width: 90px;
          color: #99a9bf;
          font-size: 18px;
        }

        span {
          font-size: 16px;
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
      }
    }
  }
}
</style>