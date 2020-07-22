<template>
  <el-upload
          class="img-uploader"
          :ref="name + '_uploader'"
          :class="{ ['img-uploader__' + size]: true, 'selected': src }"
          :show-file-list="false"
          :drag="drag"
          name="file"
          action="-"
          :on-success="handleSuccess"
          :on-error="handleError"
          :http-request="upload"
          :before-upload="beforeUpload">
    <div class="mask" @click="clickMask">
      <div class="btn-container" v-show="src">
        <i class="handle el-icon-view view" @click="handleView"></i>
        <i class="handle el-icon-refresh toggle" v-if="!disabled"></i>
        <i class="handle el-icon-delete delete" v-if="!disabled" @click="handleDelete"></i>
      </div>
    </div>
    <div class="img-view"><img :src="src" class="img" @click.stop=""></div>
    <div class="add" v-if="!src && !disabled"><i class="el-icon-plus img-uploader-icon"></i></div>
  </el-upload>
</template>

<script>
  import { Upload, Message, MessageBox } from "element-ui"
  import imageViewer from "./image-viewer";
  export default {
    name: "img-uploader",
    components: {
      "el-upload": Upload
    },
    props: {
      path: {
        type: String,
        default: ""
      },
      name: {
        type: String,
        default: ""
      },
      src: {
        type: String,
        default: ""
      },
      size: {
        type: String,
        default: "lg"
      },
      drag: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        img: "",
        file: "",
        uploading: ""
      };
    },
    methods: {
      clickMask(e) {
        e = e || event;
        // console.log(e.target.getAttribute("class"));
        if (/delete|btn|mask|view/.test(e.target.getAttribute("class"))) {
          e.cancelBubble = true;
          e.stopPropagation();
        }
      },
      handleView() {
        imageViewer({ title: this.name, src: [this.src] });
      },
      handleDelete() {
        MessageBox.confirm('删除图片, 是否继续?', '提示', {
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // this.src = "";
          this.$emit("completed", { url: "" }, this.name);
          Message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
        });
      },
      handleSuccess(res, file, data) {
        console.log(res, file, data);
        Message.success("上传成功！");
        this.$emit("completed", res);
        this.uploading = false;
      },
      handleError(e) {
        console.error(e);
        this.uploading = false;
        Message.error("上传失败！");
      },
      beforeUpload(file) {
        // console.log(file);
        const reg = new RegExp("image");
        if (reg.test(file.type)) {
          if (file.size / 1024 / 1024 > 2) {
            Message.error("文件大小不能超过2M！");
            return false;
          } else {
            this.uploading = true;
            return true;
          }
        } else {
          Message.error("请选择正确的文件格式！");
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
  };
</script>

<style scoped lang="scss">
  @import "@/common/style/theme.scss";
  .img-uploader {
    cursor: pointer;
    position: relative;
    overflow: hidden;
    border: 1px dashed $border-color;
    transition: all .5s;
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
      border-color: $color-primary;
    }
    &.selected:hover{
      border-color: $bg-color;
      .mask{
        background-color: rgba(0,0,0,.3);
      }
    }
    .mask{
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      transition: all .5s;
      z-index: 2;
      display: flex;
      justify-content: center;
      align-items: center;
      &:hover{
        .btn-container{
          display: flex;
        }
      }
      .btn-container{
        display: none;
        .handle{
          color: $text-color-inverse;
          &:hover{
            color: $color-primary;
          }
        }
      }
    }
    .add{
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      z-index: 3;
      .img-uploader-icon {
        color: #8c939d;
        text-align: center;
        transition: all .5s;
        &:hover{
          color: $color-primary;
        }
      }
    }
    .el-upload{
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }
    .img-view{
      .img {
        display: block;
      }
    }
    &.img-uploader__lg{
      width: 178px;
      height: 178px;
      border-radius: 6px;
      .img {
        min-width: 178px;
        min-height: 178px;
      }
      .el-upload{
        width: 178px;
        height: 178px;
      }
      .img-uploader-icon{
        font-size: 28px;
        width: 178px;
        height: 178px;
        line-height: 178px;
      }
      .mask{
        .btn-container{
          .handle{
            font-size: 24px;
            padding-right: 20px;
            &:last-child{
              padding: 0;
            }
          }
        }
      }
    }
    &.img-uploader__md{
      width: 120px;
      height: 120px;
      border-radius: 3px;
      .img {
        min-width: 120px;
        min-height: 120px;
      }
      .el-upload{
        width: 120px;
        height: 120px;
      }
      .img-uploader-icon{
        font-size: 18px;
        width: 120px;
        height: 120px;
        line-height: 120px;
      }
      .mask{
        .btn-container{
          .handle{
            font-size: 24px;
            padding-right: 5px;
            &:last-child{
              padding: 0;
            }
          }
        }
      }
    }
    &.img-uploader__sm{
      width: 36px;
      height: 36px;
      border-radius: 3px;
      .img {
        min-width: 36px;
        min-height: 36px;
      }
      .el-upload{
        width: 36px;
        height: 36px;
      }
      .img-uploader-icon{
        font-size: 14px;
        width: 36px;
        height: 36px;
        line-height: 36px;
      }
      .mask{
        .btn-container{
          .handle{
            font-size: 12px;
          }
        }
      }
      .el-loading-spinner .circular{
        width: 21px;
      }
    }
  }
</style>