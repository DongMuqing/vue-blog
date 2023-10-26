<template>
    <div>
        <div class="main">
            <div class="info">
                <el-table :data="Comments" style="width: 100%">
                    <el-table-column label="评论id" prop="commentId"></el-table-column>
                    <el-table-column label="动态ID" prop="postId"></el-table-column>
                    <el-table-column label="日期" prop="createTime"></el-table-column>

                    <el-table-column label="头像" prop="avatar">
                        <template slot-scope="scope">
                            <el-avatar :src="scope.row.avatar"></el-avatar>
                        </template>
                    </el-table-column>
                    <el-table-column label="内容" prop="content"></el-table-column>

                    <el-table-column label="评论时间" prop="createTime">
                        <template slot-scope="scope">
                            <i class="el-icon-time"></i>
                            <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="地址" prop="address"></el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
                            <el-button size="mini" type="danger" @click="deleteComment(scope.row.commentId)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class="block">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="currentPage4" :page-sizes="[5, 10, 20, 30, 40]" :page-size=size
                layout="total, sizes, prev, pager, next, jumper" :total=total>
            </el-pagination>
        </div>
    </div>
</template>

<script>
import comments from '@/api/admin/comment';
export default {
    data() {
        return {
            Comments: [],
            total: '',
            pages: '',
            //默认查询第一页每页10条
            size: 10,
            current: 1,
            id: ''
        }
    },
    methods: {
        fetchComments() {
            comments.getComments(this.current, this.size)
                .then(res => {
                    const { msg } = res.data
                    const { total, pages, data } = res.data.data;
                    this.Comments = data;
                    this.total = total
                    this.pages = pages
                    this.$message({
                        message: msg,
                        type: 'success'
                    });
                })
                .catch(error => {
                    // 处理错误
                });
        },
        deleteComment(id) {
            comments.delComments(id)
                .then(res => {
                    this.$message({
                        message: res.data.msg,
                        type: 'success'
                    });
                    this.fetchComments()
                })
                .catch(error => {
                    // 处理错误
                });
        },
        handleSizeChange(val) {
            this.size = val
            this.fetchComments()
        },
        handleCurrentChange(val) {
            this.current = val
            this.fetchComments()
        }
    },
    mounted() {
        this.fetchComments()
    },
}
</script>

<style lang="less" scoped>
.main {
    height: 80vh;
    overflow-y: auto;

    .info {
        .el-table {
            overflow-y: hidden;
        }
    }
}
</style>