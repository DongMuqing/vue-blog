<template>
  <div class="submitDynamic">
    <div slot="top-right" class="publish">
      <div> <el-button @click="submitPost">Submit</el-button></div>
      <div> <el-button @click="goBack">Back</el-button></div>
    </div>
    <el-form ref="form" :model="posts" label-width="80px">

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

      <el-form-item label="标题">
        <el-input v-model="posts.title"></el-input>
      </el-form-item>

      <el-form-item label="内容">
        <el-input type="textarea" v-model="posts.content"></el-input>
      </el-form-item>

      <el-form-item label="音乐">
        <el-input type="textarea" v-model="posts.musicUrl"></el-input>
      </el-form-item>

      <el-form-item label="图片">
        <el-input type="textarea" v-model="posts.imgSrclist"></el-input>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
import post from '@/api/dynamic/index'
import { formaDate, formaTime } from '@/utils/submitTime'
export default {
  data() {
    return {
      //提交动态数据
      posts: {
        createTime: '',
        title: '',
        content: '',
        musicUrl: '',
        imgSrclist: ''
      },
      Releasetime: {
        date: '',
        time: ''
      }
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    submitPost() {
      this.formatDate()
      if (this.posts.createTime != '' && this.posts.title != '' && this.posts.content != '') {
        post.submitPost(this.posts)
          .then(res => {
            this.$message({
              message: res.data.msg,
              type: 'success'
            })
            // 提交成功后新建一个空的对象并返回
            const newEmptyPosts = {
              createTime: '',
              title: '',
              content: '',
              location: '',
              musicUrl: '',
              imgSrclist: ''
            };
            this.posts = newEmptyPosts;
          })
          .catch(error => {
            // 处理错误
          });
      } else {
        this.$message({
          message: '请输入必要数据',
          type: 'warning'
        })
      }
    },
    formatDate() {
      this.Releasetime.date = formaDate(this.Releasetime.date)
      this.Releasetime.time = formaTime(this.Releasetime.time)
      this.posts.createTime = this.Releasetime.date + " " + this.Releasetime.time
      this.Releasetime.date = ''
      this.Releasetime.time = ''
    }
  }
}
</script>

<style lang="less" scoped>
.submitDynamic {
  width: 500px;
  height: 300px;
  position: absolute;
  left: 50%;
  top: 33%;
  transform: translate(-50%, -50%);

  .publish {
    display: flex;
  }
}
</style>