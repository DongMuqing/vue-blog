<template>
    <div>
        <el-row>
            <el-col :span="8" style="padding-right: 10px">
                <el-card class="box-card">
                    <div class="user">
                        <img :src="userinfo.avatar" alt="">
                        <div class="userinfo">
                            <p class="name">{{ userinfo.username }}</p>
                            <p class="access">{{ userinfo.role }}</p>
                        </div>
                    </div>
                    <div class="login-info">
                        <p>上次登录时间：<span>{{ userinfo.logintime }}</span></p>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import users from "@/api/user/index"
export default {
    props: ['user'],
    data() {
        return {
            userinfo: {
                // avatar:'',
                // role:'',
                // username:'',
                // logintime:''
            }
        }
    },
    methods: {
        getUserInfo() {
            var id = localStorage.getItem("loginId")
            users.getInfoById(id)
                .then(res => {
                    this.userinfo = res.data.data
                    localStorage.setItem("avatar", this.userinfo.avatar)
                })
                .catch(error => {
                    // 处理错误
                });
        }
    },
    mounted() {
        this.getUserInfo()
    }
}
</script>
<style lang="less" scoped>
.user {
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid #ccc;
    display: flex;
    align-items: center;

    img {
        margin-right: 40px;
        width: 150px;
        height: 150px;
        border-radius: 50%;
    }

    .userinfo {
        .name {
            font-size: 32px;
            margin-bottom: 10px;
        }

        .access {
            color: #999999;
        }
    }
}

.login-info {
    p {
        line-height: 28px;
        font-size: 14px;
        color: #999999;

        span {
            color: #666666;
            margin-left: 60px;
        }
    }
}

.num {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .icon {
        width: 80px;
        height: 80px;
        font-size: 30px;
        text-align: center;
        line-height: 80px;
        color: #fff;
    }

    .detail {
        margin-left: 15px;
        display: flex;
        flex-direction: column;
        justify-content: center;

        .price {
            font-size: 30px;
            margin-bottom: 10px;
            line-height: 30px;
            height: 30px;
        }

        .desc {
            font-size: 14px;
            color: #999;
            text-align: center;
        }
    }

    .el-card {
        width: 32%;
        margin-bottom: 20px;
    }
}

.graph {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;

    .el-card {
        width: 48%;
    }
}</style>