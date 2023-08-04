<template>
  <div>
    <!-- <el-upload class="upload-demo" ref="upload" action :on-preview="handlePreview" :on-remove="handleRemove"
      :file-list="fileList" :auto-upload="false">
      <el-button slot="trigger" size="small" type="primary">选取网站头像</el-button>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
      <div slot="tip" class="el-upload__tip">注意！只能上传一个头像</div>
    </el-upload> -->
    <input type="file" name="logo"  @change="handleFileChange">
    <el-form ref="form" :model="formData" label-width="100px" @submit.native.prevent>
      <el-form-item label="网站地址" prop="url">
        <el-input v-model="formData.url" placeholder="请输入网站地址"></el-input>
      </el-form-item>
      <el-form-item label="网站名字" prop="name">
        <el-input v-model="formData.name" placeholder="请输入网站名字"></el-input>
      </el-form-item>
      <el-form-item label="网站简介" prop="intro">
        <el-input v-model="formData.intro" placeholder="请输入网站简介"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import submitFriendlink from '@/api/friendlink/index'
export default {
  data() {
    return {
      formData: {
        url: '',
        name: '',
        intro: '',

      },
      imageUrl: '',
      fileList: []
    }
  },
  methods: {
    submitForm() {
      const formData = new FormData();
      formData.append('url', this.formData.url)
      formData.append('name', this.formData.name)
      formData.append('intro', this.formData.intro)
      formData.append('logo', this.fileList);
      submitFriendlink.submitFriendlinks(formData)
        .then(res => {
        if(res.data.code==20011){
        
          this.$message({
            message: res.data.msg,
            type: 'success'
          });
          this.$refs.form.resetFields();
          this.fileList=[]
        }
          
        })
        .catch(error => {
          // 处理错误
        });
    
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleFileChange(event) {
      // 当用户选择文件时，这个方法会被调用
      // 你可以在这里处理文件选择的逻辑
      const selectedFile = event.target.files[0];
      this.fileList=selectedFile
    },
  },
  mounted() {
  }
}
</script>

<style lang="less" scoped>
input{
  margin: 50px;
}

.avatar-uploader .el-upload {
  border: 1px dashed pink;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.el-form {


  .el-form-item {
    .el-input {
      width: 30vw;

      @media screen and (max-width: 600px) {
        width: 70vw;
      }
    }
  }
}
</style>