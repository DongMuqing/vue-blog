<template>
  <div>
    <template>
      <el-table :data="tableData" style="width:500px">
        <el-table-column prop="id" label="id">
        </el-table-column>
        <el-table-column prop="username" label="姓名">
        </el-table-column>
        <el-table-column prop="password" label="密码">
        </el-table-column>
        <el-table-column prop="headpictureurl" label="头像">
          <template slot-scope="scope">
            <img :src="scope.row.headpictureurl" min-width="200px" height="70px" />
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [{

      }
      ],
    }
  },

  methods: {

  },
  mounted() {

  },
}
</script>

<style lang="less" scoped> div {
   width: 800px ! important;

   .el-table {
     height: 88vh;
     width: 100vw;
     display: flex;
     flex-wrap: wrap;
     justify-content: space-between;

     .el-table-column {
       height: 300px;

       img {
         width: 100px;
         height: 100px;
       }
     }
   }

   .el-table__row {
     height: 300px;
   }
 }
</style>