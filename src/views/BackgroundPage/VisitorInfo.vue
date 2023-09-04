<template>
  <div>
    <div class="main">
      <div class="info">
        <el-table :data="VisitorInfo" style="width: 100%">
          <!-- <el-table-column prop="id" label="id" >
        </el-table-column> -->

          <el-table-column prop="accessTime" label="时间">
          </el-table-column>

          <el-table-column prop="ip" label="ip">
          </el-table-column>

          <el-table-column prop="address" label="地址">
          </el-table-column>
          <el-table-column prop="clientType" label="浏览设备">
          </el-table-column>
          <el-table-column prop="os" label="操作系统">
          </el-table-column>
          <el-table-column prop="browser" label="浏览器">
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="block">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4"
        :page-sizes="[5,10, 20, 30, 40]" :page-size=size layout="total, sizes, prev, pager, next, jumper" :total=total>
      </el-pagination>
    </div>
  </div>
</template>

<script>
import address from '@/api/address';
export default {
  data() {
    return {
      VisitorInfo: [],
      total: '',
      pages: '',
      //默认查询第一页每页20条
      size: 20,
      current:1,
    }
  },
  methods: {
    fetchVisitorInfo() {
      address.VisitorInfo(this.current,this.size)
        .then(response => {
          const data = response.data.data.data;
          this.VisitorInfo = data;
          this.total = response.data.data.total
          this.pages = response.data.data.pages
          this.$message({
            message: response.data.msg,
            type: 'success'
          });
        })
        .catch(error => {
          // 处理错误
        });
    },
    handleSizeChange(val) {
      this.size = val
      this.fetchVisitorInfo()
    },
    handleCurrentChange(val) {
      this.current=val
      this.fetchVisitorInfo()
    }
  },
  mounted() {
    this.fetchVisitorInfo()
  }
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