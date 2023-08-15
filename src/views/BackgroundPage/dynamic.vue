<template>
  <div class="main">
    <div class="publish"> <el-button @click="showSub()">去发布</el-button></div>


    <el-table :data="dynamic" style="width: 100%">

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
            <el-form-item label="音乐">
              <span>{{ props.row.musicUrl }}</span>
            </el-form-item>
            <el-form-item label="图片">
              <!-- <span>{{ props.row.imgSrclist }}</span> -->
              <div class="demo-image__preview">
                <template v-for="(src, index) in props.row.imgSrclist" class="test">
                  <el-image :src="src" :preview-src-list="dynamic.imgSrclist" :key="index" lazy>
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
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
import dynamics from '@/api/dynamic';
import submitPost from '@/views/BackgroundPage/sub/submitPost.vue'
export default {
  data() {
    return {
      fileList: [],

      //获取动态的数据
      dynamic: [
      ],
      subflag: false,
      id:''
    };
  },
  methods: {
    fetchDynamcis() {
      dynamics.getDynamics()
        .then(response => {
          // 处理接口返回的数据
          const data = response.data.data;
          // 遍历动态数组，将每个动态对象的 `imgSrclist` 转换为数组
          data.forEach(dynamic => {
            dynamic.imgSrclist = dynamic.imgSrclist.split(",").map(item => item.trim().replace(/'/g, ''));
          });
          this.dynamic = data;
        })
        .catch(error => {
          // 处理错误
        });
    },
    //模态框的加载
    showSub() {
      this.$modal.show(submitPost, {
        text: '发布'
      }, {
        width: 750,
        height: 500
      }, {
        draggable: true,
        clickToClose: false
      })
    },
    handleChange(val) {
      console.log(val);
    },
    handleDelete(post) {
      this.id=post.id
      console.log(JSON.stringify(this.id));
      dynamics.delPost(this.id)
        .then(res => {
          this.$message({
            message: res.data.msg,
            type: 'success'
          });
          this.dynamic=res.data.data
        })
        .catch(error => {
          // 处理错误
        });
    }
  },
  mounted() {
    this.fetchDynamcis();
  },
  created() {

  },
  components: {
    submitPost
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