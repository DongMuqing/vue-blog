<template>
  <div class="main">
    <div v-for="dynamic in dynamics" :key="dynamic.id" class="dynamic">

      <div class="list_user_meta">
        <div class="headpic"><img :src="dynamic.avatar">
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
            <el-image :src="src" :preview-src-list="dynamic.imgSrclist" :key="index" lazy>
            </el-image>
          </template>
        </div>

        <span class="ip_loca"><img src="../../assets/img/地址.png" alt="">{{ dynamic.location }}</span>
      </div>


      <div class="entry-footer">
        <div class="left" @click="giveLike(dynamic.id)">
          <img :src='dynamic.giveLikeFlag ? like : Unliked'>{{ dynamic.upvoteNum }}
        </div>
        <div class="right" @click="show(dynamic.id)">评论{{ dynamic.comments.length }}</div>
        <!-- 显示评论 -->
      </div>

      <Transition name="bounce">
        <div v-if="dynamic.showflag" class="comment">
          <div>comments | {{ dynamic.comments.length }}条</div>

          <div class="sub">
            <el-input :autosize="{ minRows: 4, maxRows: 8 }" type="textarea" placeholder="请输入评论"
              v-model.trim="dynamic.textarea">
            </el-input>
            <el-button @click="submitComments(dynamic.id, dynamic.textarea)">发送</el-button>
          </div>

          <div v-for="comment in dynamic.comments " :key="comment.commentId" class="comments">
            <div class="info">
              <el-image :src="comment.avatar" lazy></el-image>

            </div>
            <div class="concrete">
              <p>{{ comment.username }} {{ comment.createTime }} {{ comment.address }}</p>
              <p>{{ comment.content }}</p>
            </div>

          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script>
import dynamics from '@/api/dynamic';
import { getNowTime } from '@/utils/getNowTime'
import comment from '@/api/comment/index'
import { formatTime } from '@/utils/formatTime';

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
      },
      backdrops: [
      ],
      avatar: '',
      like: require('@/assets/img/like.png'),
      Unliked: require('@/assets/img/Unlike.png'),
      giveLikeFlag: false,
      upvote: {
        id: '',
        upvoteNum: ''
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
            //格式化时间 区别昨天今天 今年和往年
            dynamic.createTime = formatTime(dynamic.createTime)
            for (const comment of dynamic.comments) {
              comment.createTime = formatTime(comment.createTime)
            }
            // 添加 showflag 和 textarea 到每个动态对象
            //对应每个评论框的显示与隐藏 以及对应每个动态的评论提交
            //默认隐藏
            dynamic.showflag = true;
            dynamic.giveLikeFlag = false
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
      if (content.length > 0) {
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
            //新增评论
            // 找到匹配的动态对象，并将评论添加到对应的评论数组中
            for (const dynamic of this.dynamics) {
              if (dynamic.id === id) {
                for (const time of res.data.data) {
                  time.createTime = formatTime(time.createTime)
                }
                dynamic.comments = res.data.data
                break; // 找到匹配的动态后，中断循环
              }
            }
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
      } else {
        this.$message({
          message: '不可以提交为空哦！',
          type: 'warning'
        });
      }

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
    },
    selectAvatar(index) {
      this.avatar = this.backdrops[index].url
    },
    giveLike(id) {
      this.dynamics.forEach(dynamic => {
        if (dynamic.id === id) {
          //与评论的显示同理 都是当前动态被点赞
          //true 已经点赞了
          if (dynamic.giveLikeFlag) {
            dynamic.upvoteNum--
            dynamic.giveLikeFlag = !dynamic.giveLikeFlag
            this.upvote.id = id
            this.upvote.upvoteNum = dynamic.upvoteNum
            dynamics.Upvote(this.upvote)
              .then(res => {

              })
              .catch(error => {
                // 处理错误
              });
          } else {
            //未点赞
            dynamic.upvoteNum++
            dynamic.giveLikeFlag = !dynamic.giveLikeFlag
            this.upvote.id = id
            this.upvote.upvoteNum = dynamic.upvoteNum
            dynamics.Upvote(this.upvote)
              .then(res => {
              })
              .catch(error => {
                // 处理错误
              });
          }
        }
      });
    }
  },
  mounted() {
    this.fetchDynamcis()
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
      font-size: 18px;

      @media screen and (max-width: 600px) {
        margin-left: 30px;
      }

      .headpic {
        img {
          width: 80px;
          height: 80px;
          border-radius: 10px;
        }
      }

      .name-time {
        width: 100px;
        height: 40px;

        p {
          margin: 0 0 0 0;
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
        color: var(--pColor);
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
          @media screen and (max-width: 600px) {
            width: 25vw;
          }
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
    color: var(--pColor);
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
    color: var(--pColor);
    @media screen and (max-width: 600px) {
      margin: 30px 30px 0px 40px;
      width: 80vw;
    }
    .sub {
      margin-top: 20px;
      border-radius: 5px;

      .userpics {
        margin-bottom: 20px;

        .select {
          img {
            padding-left: 5px;
            width: 60px;
            height: 60px;
            float: right;
          }

          img:hover {
            transform: scale(1.4);
          }
        }

        .avatar-list {
          display: flex;
          flex-wrap: wrap;

          img {
            padding-left: 5px;
            width: 60px;
            height: 60px;
          }

          img:hover {
            transform: scale(1.4);
          }
        }


      }

      .el-input {
        width: 300px;
        height: 100px;
      }

      .el-button {
        float: right;
      }
    }

    .comments {
      padding-top: 10px;
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;

      .info {
        width: 62px;

        .el-image {
          width: 62px;
          height: 62px;
        }
      }

      .concrete {
        margin-right: 10px;

        p {
          margin: 10px;
          font-size: 16px;
          line-height: 18px;
          text-align: left;
          word-wrap: break-word;
          word-break: break-all;
        }
      }
    }

    p {
      text-align: left;
    }
  }
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}

.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }

  50% {
    transform: scale(1.25);
  }

  100% {
    transform: scale(1);
  }
}
</style>