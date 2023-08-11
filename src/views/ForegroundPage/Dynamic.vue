<template>
  <div class="main">
    <div v-for="dynamic in dynamics" :key="dynamic.id" class="dynamic">

      <div class="list_user_meta">
        <div class="headpic"><img src="https://oss.qingmumu.xyz/Blog/friendlink/28d6da82fd2b40689561a0beb4e8daff.png">
        </div>
        <div class="name-time">
          <p> 冬木青</p>
          <p> {{ dynamic.createTime }}</p>
        </div>
      </div>

      <div class="blog_content">
        <div class="p_title">
          <p>{{ dynamic.title }}</p>
        </div>
        <div class="t_content">
          <p>{{ dynamic.content }}</p>
        </div>

        <div class="demo-image__preview">
          <template v-for="(src, index) in dynamic.imgSrclist" class="test">
            <el-image :src="src" :preview-src-list="dynamic.imgSrclist" :key="index">
            </el-image>
          </template>
        </div>

        <span class="ip_loca"><img src="../../assets/img/地址.png" alt="">{{ dynamic.location }}</span>
      </div>


      <div class="entry-footer">
        <div class="left">
          <img src="../../assets/img/点赞.png" alt="">
          <!-- <img src="../../assets/img/分享.png" alt=""> -->
        </div>
        <div class="right" @click="show(dynamic.id)">评论</div>
        <!-- 显示评论 -->
      </div>

      <div v-show="dynamic.showflag" class="comment">
        <div class="sub">
          <el-input  :autosize="{ minRows: 4, maxRows: 8}" type="textarea" placeholder="请输入评论" v-model="dynamic.textarea">
          </el-input>
          <el-button @click="submitComments(dynamic.id, dynamic.textarea)">发送</el-button>
        </div>
        <div v-for="comment in dynamic.comments " :key="comment.commentId">
          <p>{{ comment.username }}---{{ comment.createTime }}---{{ comment.address }}</p>
          <p>{{ comment.content }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dynamics from '@/api/dynamic';
import { getNowTime } from '@/utils/getNowTime'
import comment from '@/api/comment/index'
export default {
  data() {
    return {
      dynamics: [
      ],
      textarea1: '',
      submitComment: {
        postId: '',
        content: '',
        createTime: ''
      }
    }
  },
  methods: {
    fetchDynamcis() {
      dynamics.getDynamics()
        .then(response => {
          // 处理接口返回的数据
          const data = response.data.data;
          const dynamicKeys = Object.keys(data);
          dynamicKeys.forEach(key => {
            const dynamic = data[key];
            dynamic.imgSrclist = dynamic.imgSrclist.split(",").map(item => item.trim().replace(/'/g, ''));
            // 添加 showflag 和 textarea 到每个动态对象
            //对应每个评论框的显示与隐藏 以及对应每个动态的评论提交
            //默认隐藏
            dynamic.showflag = false;
            //默认为空
            dynamic.textarea = '';
            this.dynamics.push(dynamic);
          });
        })
        .catch(() => {
          // 处理错误
        });
    },
    submitComments(id, content) {
      const dynamic = this.dynamics.find(d => d.id === id);
      //提交数据
      this.submitComment.postId = id,
        this.submitComment.content = content,
        this.submitComment.createTime = getNowTime()
      comment.submitComments(this.submitComment)
        .then(res => {
          this.$message({
            message: res.data.msg,
            type: 'success'
          });
          //当前评论框置空
          dynamic.textarea = '';
          //提交信息置空
          // this.submitComment = ''
          // 创建一个新的提交评论对象，以防止属性冲突 不能单纯直接置空属性
          const newSubmitComment = {
            postId: id,
            content: '',
            createTime: ''
          };
        })
        .catch(() => {

        });
    },
    show(id) {
      this.dynamics.forEach(dynamic => {
        if (dynamic.id === id) {
          dynamic.showflag = !dynamic.showflag;
          dynamic.textarea = ''; // Clear the textarea for each dynamic
        }
      });
    },
    getNowTime(key) {
      //获取当前评论的动态id和当前时间
      this.submitComment.postId = key
      this.submitComment.createTime = getNowTime()
    }
  },
  mounted() {
    this.fetchDynamcis();
  },
  components: {

  },
}
</script>

<style lang="less" scoped>
.main {
  margin-top: 10px;
  padding: 40px 0;
  background-color: var(--bgc--center);

  .dynamic {
    margin-bottom: 40px;
    padding-bottom: 40px;
    border-bottom: 2px solid #ebf2ed;

    .list_user_meta {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: flex-start;
      position: relative;
      margin-left: 80px;

      @media screen and (max-width: 600px) {
        margin-left: 30px;
      }

      .headpic {
        img {
          width: 80px;
          height: 80px;
        }
      }

      .name-time {
        width: 100px;
        height: 40px;

        p {
          margin: 0 0 10px 0;
          color: var(--pColor);
        }
      }
    }

    .blog_content {
      margin-left: 80px;
      margin-right: 80px;
      //文本进行换行
      white-space: pre-line;

      @media screen and (max-width: 600px) {
        margin: 0 30px;
      }

      span {
        color: var(--pColor);
      }

      p {
        color: var(--pColor);
      }

      .t_content {
        word-break: break-all;
        color: #0d0d0d;
        margin-bottom: 5px;
        white-space: pre-wrap;
      }

      .demo-image__preview {
        width: 100%;

        .el-image {
          width: 108px;
          height: 108px;
          margin-right: 10px;
          border-radius: 15% 15%;
        }
      }
    }
  }

  .entry-footer {
    width: 450px;
    margin-left: 80px;
    margin-top: 30px;
    background-color: var(--entry--footer);
    border-radius: 30px;

    @media screen and (max-width: 1200px) {
      width: 40vw;
    }

    @media screen and (max-width: 600px) {
      margin: 30px 30px 0px 40px;
      width: 80vw;
    }

    .left {
      width: 200px;

      img {
        margin: 10px 15px;
        padding-right: 10px;
      }
    }

    .right {
      float: right;
      margin-top: -30px;
      margin-right: 10px;
    }
  }

  .comment {
    width: 450px;
    margin-left: 80px;
    margin-top: 30px;
    border-radius: 15px;
    background-color: var(--entry--footer);

    .sub {

      .el-input {
        width: 300px;
        height: 100px;
      }

      .el-button {
        float: right;
      }
    }

    p {
      text-align: left;
    }
  }
}
</style>