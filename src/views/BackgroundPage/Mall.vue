<template>
  <div>
    <el-upload
      :limit="1"
      class="upload-demo"
      ref="upload"
      action
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :file-list="fileList"
      :auto-upload="false"
      :http-request="UploadSubmit"
    >
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button
        style="margin-left: 10px"
        size="small"
        type="success"
        @click="submitUpload"
        >上传到服务器</el-button
      >
      <div slot="tip" class="el-upload__tip">
        只能上传jpg/png文件，且不超过500kb
      </div>
    </el-upload>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fileList: [],
    };
  },
  methods: {
    UploadSubmit(param) {
      console.log(param);
      var file = param.file;
      //console.log(param.file);
      var file_form = new FormData(); //获取上传表单（文件）
      file_form.append("image", file);
      this.$axios({
        url: "http://localhost:81/oss/upload",
        method: "POST",
        headers: {
          'Content-Type' : 'multipart/form-data'
        },
        data: file_form,
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
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
  },
  created() {},
}
</script>

<style>

</style>