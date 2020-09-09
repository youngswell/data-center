<template>
    <el-upload class="upload-app" action="https://jsonplaceholder.typicode.com/posts/" drag>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <!--            <div class="el-upload__tip" slot="tip">只能上传.apk,.ipk文件，且不超过200Mb</div>-->
    </el-upload>
</template>

<script>
    import { Upload } from 'element-ui';
    export default {
        name: "upload-app",
        components: {
            [Upload.name]: Upload,
        }
    }
</script>
1
<style lang="scss" scoped>
.upload-app{
    .el-upload{
        .el-upload-dragger{
            display: block;
            width: auto;
        }
    }
}
</style>
