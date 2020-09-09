<template>
    <el-upload
            ref="upload-files"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :multiple="multiple"
            :limit="limit"
            :show-file-list="true"
            action="-"
            :drag="drag"
            :on-success="handleSuccess"
            :on-error="handleError"
            :http-request="upload"
            :before-upload="beforeUpload"
            :on-exceed="handleExceed"
            :auto-upload="false"
            :on-change="handleListChange"
            :file-list="value">
        <slot>
            <el-button size="small" slot="trigger" type="primary">选择文件</el-button>
        </slot>
        <slot name="tip" slot="tip">
            <div style="margin-left: 15px" class="el-upload__tip">{{ fileTypeLabel }}</div>
        </slot>
    </el-upload>
</template>

<script>
    import {Upload, Button, MessageBox, Message} from "element-ui"
    import imageViewer from "@/components/image-viewer"
    import loading from "@/utils/loading"
    export default {
        name: "upload-files",
        components: {
            [Button.name]: Button,
            [Upload.name]: Upload,
        },
        props: {
            name: {
                type: String,
                default: ""
            },
            limit: {
                type: Number,
                default: 5
            },
            size: {
                type: Number,
                default: 2
            },
            multiple: {
                type: Boolean,
                default: false
            },
            value: {
                type: Array,
                default() {
                    return []
                }
            },
            drag: Boolean,
            "file-type": {
                type: Array,
                default() {
                    return ["image"]
                }
            },
            "file-type-label": {
                type: String,
                default: "支持.jpg,.png,.jpeg类型文件"
            },
        },
        data() {
            return {
                uploading: "",
                // fileList: [],
                loading: null,
                timer: null
            };
        },
        watch: {
            uploading(uploading) {
                if (uploading) {
                    this.loading = loading("上传中...")
                } else {
                    this.loading.close()
                }
            },
            // value: {
            //     handler(files) {
            //         if (files.lenght) {
            //             this.fileList = files
            //         }
            //     },
            //     deep: true
            // }
        },
        methods: {
            getFileList(fileList) {
                const list = []
                fileList.forEach(item => {
                    if (item.url || item.response) {
                        list.push({
                            name: item.name,
                            id: item.id || item.response.id
                        })
                    }
                })
                console.log(fileList,list)
                return list
            },
            beforeRemove(file) {
                // console.log(file)
                if (file.response) return MessageBox.confirm(`确定移除 ${ file.name }？`);
            },
            handleRemove(file,fileList) {
                console.log(file, fileList);
                this.$emit("input", this.getFileList(fileList));
            },
            handlePreview(file) {
                // console.log(file);
                if (/image/.test(file.type)) imageViewer({ title: file.name, src: [file.response.url] })
            },
            handleExceed(files, fileList) {
                Message.warning(`当前限制选择 ${this.limit} 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            handleListChange() {
                // console.log(this.timer)
                if (this.timer) clearTimeout(this.timer)
                this.timer = setTimeout(() => {
                    this.$refs["upload-files"].submit()
                    this.timer = null
                },300)
            },
            handleSuccess(res, file, fileList) {
                console.log(res, file, fileList);
                Message.success("上传成功！");
                this.$emit("input", this.getFileList(fileList));
                this.uploading = false;
            },
            handleError(e) {
                console.error(e);
                this.uploading = false;
                Message.error("上传失败！");
            },
            beforeUpload(file) {
                let types = ""
                this.fileType.forEach(item => {
                    types += "|" + item
                })
                types = types.slice(1)
                const reg = new RegExp(types);
                // console.log(file.type,reg.test(file.type));
                if (reg.test(file.type)) {
                    if (file.size / 1024 / 1024 > this.size) {
                        Message.error(file.name + " 文件大小超过了" + this.size + "M！");
                        return false;
                    } else {
                        this.uploading = true;
                        return true;
                    }
                } else {
                    Message.error("请选择正确的文件格式！" + this.fileTypeLabel);
                    return false;
                }
            },
            upload(params) {
                // console.log(params);
                const form = new FormData();
                form.append("file", params.file);
                this.$api.base.upload("", form)
                    .then(res => {
                        // console.log(res);
                        params.onSuccess(res, form.get("file"));
                    })
                    .catch(err => {
                        // console.error(err);
                        params.onError(err);
                    });
            }
        }
    }
</script>
