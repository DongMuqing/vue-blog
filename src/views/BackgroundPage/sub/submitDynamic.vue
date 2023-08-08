<template>
    <div class="submitDynamic" >
        <el-form ref="form" :model="dynamics" label-width="80px">
  
          <el-form-item label="活动时间">
            <el-col :span="11">
              <el-date-picker type="date" placeholder="选择日期" v-model="dynamics.createTime" style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-time-picker placeholder="选择时间" v-model="dynamics.createTime" style="width: 100%;"></el-time-picker>
            </el-col>
          </el-form-item>
  
          <el-form-item label="标题">
            <el-input v-model="dynamics.title"></el-input>
          </el-form-item>
  
          <el-form-item label="内容">
            <el-input type="textarea" v-model="dynamics.content"></el-input>
          </el-form-item>
  
          <el-form-item label="音乐">
            <el-input type="textarea" v-model="dynamics.musicUrl"></el-input>
          </el-form-item>
  
          <el-form-item label="图片">
            <el-input type="textarea" v-model="dynamics.imgSrclist"></el-input>
          </el-form-item>
        </el-form>
      </div>
</template>

<script>
export default {
data(){
    return{
         //提交动态数据
      dynamics: {
        createTime: '',
        title: '',
        content: '',
        location: '',
        musicUrl: '',
        imgSrclist: ''
      },
    }
},
}
</script>

<style lang="less" scoped>
.submitDynamic{
    width: 500px;
    height: 300px;
    z-index: 999;
    background-color: pink;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }
</style>