<template>
  <div>
   
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
  created(){},
}
</script>

<style>

</style>