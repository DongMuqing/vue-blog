<template>
    <div class="main">
        <div class="publish"><el-button @click="dialogFormVisible = true">发 布</el-button></div>
        <div id="vditor"></div>
        <!-- 提交post dialog -->
        <div>
            <el-dialog title="文章信息" :visible.sync="dialogFormVisible">
                <el-form :model="form">
                    <el-form-item label="标题">
                        <el-input v-model="article.title"></el-input>
                    </el-form-item>
                </el-form>
                <el-form :model="form">
                    <el-form-item label="封面">
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="publish">发 布</el-button>
                </div>

                <!-- 图片上传 -->
                <div class="upload" accept="image/*">
                    <el-upload action="#" list-type="picture-card" :auto-upload="false" ref="upload" :drag="true"
                        :multiple="true" :on-change="handleFileChange" style="height: 150px;">
                        <i slot="default" class="el-icon-plus"></i>
                        <div slot="file" slot-scope="{file}">
                            <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
                            <span class="el-upload-list__item-actions">
                                <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                                    <i class="el-icon-zoom-in"></i>
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
            </el-dialog>
        </div>
    </div>
</template>
  
<script>
import Vditor from 'vditor'
import 'vditor/dist/index.css'
import articles from '@/api/admin/article'
import { uploadArticleImage } from '@/utils/upload'
export default {
    data() {
        return {
            //dialog 相关属性
            dialogFormVisible: false,
            contentEditor: '',
            //提交文章实体
            article: {
                cover: '',
                title: '',
                content: ''
            },
            labelPosition: 'top',
            //上传文件
            fileList: [],
        }
    },
    methods: {
        async publish() {
            const value = this.contentEditor.getValue()
            if (value.length === 1 || value == null || value === '') {
                this.$message({
                    message: '请填写文章内容！',
                    type: 'warning'
                });
                return;//中断
            }
            if (this.article.title === '') {
                this.$message({
                    message: '请填写文章标题！',
                    type: 'warning'
                });
                return;
            }
            if (this.fileList.length === 0) {
                this.$message({
                    message: '请上传文章封面！',
                    type: 'warning'
                });
                return;
            }
            if (this.fileList.length > 1) {
                this.$message({
                    message: '只能上传一张封面！',
                    type: 'warning'
                });
                return;
            }
            try {
                // 判断数据格式通过，开始异步上传图片
                const cover = await uploadArticleImage(this.fileList);
                // 返回结果后执行提交方法
                this.article.content = value;
                this.article.cover = cover;

                articles.addArticles(this.article)
                    .then(res => {
                        this.$message({
                            message: res.data.msg,
                            type: 'success'
                        });
                        // 提交后清空数据
                        this.contentEditor.setValue('');
                        const newEmptyArticle = {
                            cover: '',
                            title: '',
                            content: '',
                        };
                        this.article = newEmptyArticle;
                        //置空文件list
                        this.fileList = [];
                        //移除存在的文件
                        this.remove();
                    })
            } catch (error) {

            }
        },
        // 上传文件改变
        handleFileChange() {
            // 绑定到on-change  文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
            let uploadFiles = this.$refs.upload.uploadFiles;
            this.fileList = uploadFiles
        },
        remove() {
            //清空文件
            this.$refs.upload.clearFiles()
        },
        createEditor() {
            this.contentEditor = new Vditor('vditor', {
                //宽高类似 可不写为自适应
                height: 660,
                //图标配置
                icon: "material",
                placeholder: '开始编辑',
                toolbarConfig: {
                    //固定顶部工具栏
                    pin: true,
                },
                // after(){
                //   this.contentEditor.setValue('')
                // },
                cache: {
                    //缓存回调
                    after(text) {

                    },
                },
                // blur(){
                //   console.log("离开了");
                // },
                //大纲的显示
                // outline: {
                //   enable: true,
                //   position: "right"
                // },
                //字数统计
                counter: {
                    enable: true
                },
                //启用拖拽
                resize: {
                    enable: true,
                    position: "bottom"
                },
                //废弃 使用单独api进行文件上传
                // upload: {
                //   accept: 'image/*,.mp3, .wav, .rar',
                //   url: '/api/upload/editor',
                //   linkToImgUrl: '/api/upload/fetch',
                //   filename(name) {
                //     return name.replace(/[^(a-zA-Z0-9\u4e00-\u9fa5\.)]/g, '').
                //       replace(/[\?\\/:|<>\*\[\]\(\)\$%\{\}@~]/g, '').
                //       replace('/\\s/g', '')
                //   },
                // },
            })
        },

    },
    mounted() {
        this.createEditor()
    },
}
</script>
  
<style lang="less" scoped>
.main {
    #vditor {
        margin-left: 20px;
        margin-top: 20px;
    }
}
</style>