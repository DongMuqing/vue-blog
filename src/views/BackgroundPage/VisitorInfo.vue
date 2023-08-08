<template>
  <div class="main">
    <el-table :data="VisitorInfo" style="width: 100%">
      <!-- <el-table-column prop="id" label="id" >
      </el-table-column> -->

      <el-table-column prop="accessTime" label="时间" >
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
</template>

<script>
import address from '@/api/address';
export default {
  data() {
    return {
      VisitorInfo: []
    }
  },
  methods: {
    fetchVisitorInfo() {
      address.VisitorInfo()
        .then(response => {
          const data = response.data.data;
          this.VisitorInfo = data;
          this.$message({
            message: response.data.msg,
            type: 'success'
          });
        })
        .catch(error => {
          // 处理错误
        });
    }
  },
  mounted() {
    this.fetchVisitorInfo()
  }
}
</script>

<style lang="less" scoped>
.main{
  height: 80vh;
  overflow-y: auto;
}
</style>