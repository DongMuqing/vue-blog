<template>
    <div>
        <el-table :data="Comments" style="width: 100%">
            <el-table-column label="动态ID" prop="postId"></el-table-column>
            <el-table-column label="日期" prop="createTime"></el-table-column>
            <el-table-column label="用户名" prop="username"></el-table-column>
            <el-table-column label="内容" prop="content"></el-table-column>
            <el-table-column label="地址" prop="address"></el-table-column>

            <el-table-column label="操作">
                <template slot-scope="scope">
                    <!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
                    <el-button size="mini" type="danger" @click="deleteComment(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

    </div>
</template>

<script>
import comments from '@/api/comment/index';
export default {
    data() {
        return {
            Comments: [],
            id:''
        }
    },
    methods: {
        fetchComments() {
            comments.getComments()
                .then(response => {
                    this.$message({
                        message: response.data.msg,
                        type: 'success'
                    });
                    const data = response.data.data;
                    this.Comments = data;
                })
                .catch(error => {
                    // 处理错误
                });
        },
       deleteComment(comment) {
            this.id = comment.commentId
            comments.delComments(this.id)
                .then(res => {
                    this.$message({
                        message: res.data.msg,
                        type: 'success'
                    });
                    this.Comments = res.data.data
                })
                .catch(error => {
                    // 处理错误
                });
        }
    },
    mounted() {
        this.fetchComments()
    },
}
</script>

<style lang="less" scoped></style>