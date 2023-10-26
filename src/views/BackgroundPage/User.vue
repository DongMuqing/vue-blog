<template>
  <div>
    <div class="main">
      <div class="info">
        <el-table :data="userInfo" style="width: 100%">

          <el-table-column prop="id" label="id">
          </el-table-column>

          <el-table-column prop="avatar" label="头像">
            <template slot-scope="scope">
              <el-avatar :src="scope.row.avatar"></el-avatar>
            </template>
          </el-table-column>

          <el-table-column prop="username" label="用户名">
          </el-table-column>

          <el-table-column prop="email" label="用户名">
          </el-table-column>

          <el-table-column prop="loginTime" label="上次登录时间">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.loginTime }}</span>
            </template>
          </el-table-column>

          <el-table-column prop="role" label="角色">
            <template slot-scope="scope">
              <el-select v-model="scope.row.role" placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </template>
          </el-table-column>

          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="editRole(scope.row.id, scope.row.role)">修改角色</el-button>
              <el-button size="mini" type="danger" @click="deleteUser(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>

        </el-table>
      </div>
    </div>
    <div class="block">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4"
        :page-sizes="[5, 10, 20, 30, 40]" :page-size=size layout="total, sizes, prev, pager, next, jumper" :total=total>
      </el-pagination>
    </div>
  </div>
</template>
<script>
import users from '@/api/admin/user';
export default {
  data() {
    return {
      userInfo: [],
      total: '',
      pages: '',
      //默认查询第一页每页20条
      size: 20,
      current: 1,
      options: [{
        value: '管理员',
      }, {
        value: '用户',
      },],
      // 选择中的值
      value: '',
      user: {
        id: '',
        role: ''
      }
    }
  },

  methods: {
    fetchUserInfo() {
      users.pagingUserInfo(this.current, this.size)
        .then(res => {
          const { msg } = res.data
          const { total, pages, data } = res.data.data;
          this.userInfo = data;
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
    editRole(id, role) {
      this.user.id = id
      this.user.role = role
      users.editRole(this.user)
        .then(res => {
          const { msg } = res.data
          this.$message({
            message: msg,
            type: 'success'
          });
        })
    },
    deleteUser(id) {
      users.deleteById(id)
        .then(res => {
          const { msg } = res.data
          this.fetchUserInfo()
          this.$message({
            message: msg,
            type: 'success'
          });
        })
    },
    handleSizeChange(val) {
      this.size = val
      this.fetchUserInfo()
    },
    handleCurrentChange(val) {
      this.current = val
      this.fetchUserInfo()
    }
  },
  mounted() {
    this.fetchUserInfo()
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