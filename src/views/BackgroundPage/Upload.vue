<template>
  <div class="main">

    <div class="search">
      <el-button @click="filePage">查询当前目录</el-button>
      <el-button @click="upload">上传到当前目录</el-button>
      <template>
        <el-select v-model="selectDirectory" placeholder="请选择文件目录">
          <el-option v-for="item in directory" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
      </template>

      <div class="upload" accept="image/*">
        <el-upload action="#" list-type="picture-card" :auto-upload="false" ref="upload" :drag="true" :multiple="true"
          :on-change="handleFileChange">
          <i slot="default" class="el-icon-plus"></i>
          <div slot="file" slot-scope="{file}">
            <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
            <span class="el-upload-list__item-actions">
              <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                <i class="el-icon-zoom-in"></i>
              </span>
              <!-- <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleDownload(file)">
                <i class="el-icon-download"></i>
              </span> -->
              <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
                <i class="el-icon-delete"></i>
              </span>
            </span>
          </div>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </div>
    </div>

    <div class="fileinfo">
      <template>
        <el-table :data="filepath" stripe style="width: 100%">
          <el-table-column prop="id" label="id" width="180">
          </el-table-column>
          <el-table-column prop="path" label="路径" width="180">
          </el-table-column>
          <el-table-column prop="lastModified" label="最后修改时间">
          </el-table-column>

          <el-table-column label="显示">
            <template slot-scope="scope">
              <el-image :src="scope.row.path" lazy style="height: 100px;"></el-image>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="danger" @click="handleDelete(scope.row.relativePath)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
    <div class="block">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4"
        :page-sizes="[5, 10, 20, 30, 40]" :page-size=size layout="total, sizes, prev, pager, next, jumper" :total=total>
      </el-pagination>
    </div>
  </div>
</template>

<script>
import ossUtil from '@/api/oss/index'
export default {
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      //oss文件目录
      directory: [],
      //oss文件路径
      filepath: [],
      selectDirectory: '',
      //上传文件
      fileList: [],

      total: '',
      pages: '',
      //默认查询第一页每页10条
      size: 10,
      current: 1,
    };
  },
  methods: {
    handleRemove(file) {
      //获取el-upload 删除对应文件的索引
      let uploadFiles = this.$refs.upload.uploadFiles;
      let index = uploadFiles.indexOf(file);
      //移除el-upload中的
      uploadFiles.splice(index, 1);
      // //移除选择的文件
      // this.fileList.splice(index, 1);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      console.log(file);
    },
    remove() {
      //清空文件
      this.$refs.upload.clearFiles()
    },
    //获取oss目录
    fetchDirectory() {
      ossUtil.getDirectory()
        .then(response => {
          // 处理接口返回的数据
          const data = response.data.data;
          this.directory = data;
        })
        .catch(error => {
          // 处理错误
        });
    },
    //获取所有指定目录文件
    getFilePaths() {
      if (this.selectDirectory != '') {
        ossUtil.getFilePath(this.selectDirectory)
          .then(response => {
            this.$message({
              message: response.data.msg,
              type: 'success'
            });
            const data = response.data.data;
            this.filepath = data;
          })
          .catch(error => {
            // 处理错误
          });
      } else {
        this.$message({
          message: "请选择一个目录",
          type: 'warning'
        });
      }
    },
    //获取指定目录分页数据
    filePage() {
      if (this.selectDirectory != '') {
        ossUtil.paging(this.selectDirectory, this.current, this.size)
          .then(response => {
            this.$message({
              message: response.data.msg,
              type: 'success'
            });
            const data = response.data.data.data[this.current]
            this.total = response.data.data.total
            this.pages = response.data.data.pages
            this.filepath = data;
          })
          .catch(error => {
            // 处理错误
          });
      } else {
        this.$message({
          message: "请选择一个目录",
          type: 'warning'
        });
      }
    },
    handleDelete(relativePath){
      ossUtil.delete(relativePath)
        .then(res=>{
          this.$message({
              message: res.data.msg,
              type: 'success'
            });
            //删除后重新请求数据
            this.filePage()
        })
    },
    handleSizeChange(val) {
      this.size = val
      this.filePage()
    },
    handleCurrentChange(val) {
      this.current = val
      this.filePage()
    },
    upload() {
      if (this.selectDirectory != '') {
        if (this.fileList.length>0) {
          const formData = new FormData();
          //直接将所有文件数组传过去不行
          // formData.append('files',this.fileList)
          for (const file of this.fileList) {
            formData.append('files', file.raw)
          }
          formData.append('path', this.selectDirectory)
          ossUtil.uploadFile(formData)
            .then(res => {
              this.$message({
                message: res.data.msg,
                type: 'success'
              })
              this.fileList = []
              this.remove()
            })
        } else {
          this.$message({
            message: "请选择上传文件",
            type: 'warning'
          });
        }
      } else {
        this.$message({
          message: "请选择一个目录",
          type: 'warning'
        });
      }
    },
    handleFileChange() {
      // 绑定到on-change  文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
      let uploadFiles = this.$refs.upload.uploadFiles;
      this.fileList = uploadFiles
    }
  },
  mounted() {
    this.fetchDirectory()
  }
}
</script>

<style lang="less" scoped>
.main {
  height: 80vh;

  .fileinfo {
    margin-top: 50px;
    height: 60vh;
    overflow-y: auto;
  }
}
</style>