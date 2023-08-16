<template>
  <div class="main">

    <div class="search">
      <el-button @click="getFilePaths">查询当前目录</el-button>
      <el-button @click="upload">上传到当前目录</el-button>
      <template>
        <el-select v-model="selectDirectory" placeholder="请选择文件目录">
          <el-option v-for="item in directory" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
      </template>

      <div class="upload" @change="handleFileChange" accept="image/*">
        <el-upload action="#" list-type="picture-card" 
        :auto-upload="false"
        ref="upload"
        >
          <i slot="default" class="el-icon-plus"></i>
          <div slot="file" slot-scope="{file}">
            <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
            <span class="el-upload-list__item-actions">
              <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                <i class="el-icon-zoom-in"></i>
              </span>
              <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleDownload(file)">
                <i class="el-icon-download"></i>
              </span>
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
        </el-table>
      </template>
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
    };
  },
  methods: {
    handleRemove(file) {
      console.log(file);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      console.log(file);
    },
    remove(){
      this.$refs.upload.clearFiles()
    },
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
    upload() {
      if (this.selectDirectory != '') {
        const formData = new FormData();
        //直接将所有文件数组传过去不行
        // formData.append('files',this.fileList)
        for (const file of this.fileList) {
          formData.append('files', file)
        }
        formData.append('path', this.selectDirectory)
        ossUtil.uploadFile(formData)
          .then(res => {
            this.$message({
              message: res.data.msg,
              type: 'success'
            })
            this.fileList=[]
            this.remove()
          })
      }else{
        this.$message({
          message: "请选择一个目录",
          type: 'warning'
        });
      }
    },
    handleFileChange(event) {
      const files = event.target.files[0];
      console.log(files);
      this.fileList.push(files)
      console.log(this.fileList);
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

  .search {}

  .fileinfo {
    height: 60vh;
  }
}
</style>