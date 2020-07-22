<template>
    <div class="image-viewer"
         :class="{'close': !visible}">
        <div class="header">
            <div class="left"></div>
            <div class="title">{{ options.title }}</div>
            <div class="right" @click="imgViewerClosed">
                <i class="el-icon-close"></i>
            </div>
        </div>
        <div class="body" @click="imgViewerClosed">
            <img :src="src" class="img-item" v-for="(src, key) in options.src" :key="key" @mousewheel="wheel" @click.stop.prevent="">
            <!-- @drag="drag" @dragstart="dragStart" @dragend="dragEnd" -->
        </div>
    </div>
</template>

<script>
    export default {
        name: "image-viewer",
        data() {
            return {
                visible: false,
                options: {
                    title: "",
                    src: []
                },
                scale: 1
            };
        },
        props: {

        },
        mounted() {
            if (this.options.title) {
                this.visible = true;
            }
        },
        watch: {
            visible() {
            }
        },
        methods: {
            // dragStart(e) {
            //   e.target.style.left = "0px";
            //   e.target.style.top = "0px";
            //   console.log("dragStart", e.offsetX, e.offsetY);
            // },
            // drag(e) {
            //   e.target.style.left = e.offsetY + "px";
            //   e.target.style.top = e.offsetX + "px";
            //   console.log("drag", e.target);
            // },
            // dragEnd(e) {
            //   e.target.style.left = e.offsetY + "px";
            //   e.target.style.top = e.offsetX + "px";
            //   console.log("dragEnd", e.offsetX, e.offsetY);
            // },
            wheel(e) {
                // console.log(e);
                if (e.deltaY > 0) {
                    this.narrow(e.target);
                } else {
                    this.enlarge(e.target);
                }
            },
            enlarge(target) {
                if (this.scale < 3) {
                    this.scale += 0.1;
                    target.style.transform = "scale(" + this.scale + ")";
                }
            },
            narrow(target) {
                if (this.scale > 0.2) {
                    this.scale -= 0.1;
                    target.style.transform = "scale(" + this.scale + ")";
                }
            },
            imgViewerClosed() {
                this.visible = false;
                this.options = {
                    title: "",
                    src: ""
                };
                this.$el.parentNode.removeChild(this.$el);
            }
        }
    };
</script>

<style scoped lang="scss">
    @import "@/common/style/theme.scss";
    .image-viewer{
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: 100000;
        background-color: rgba(0,0,0,.9);
        color: $text-color-inverse;
        display: flex;
        flex-direction: column;
        &.close{
            display: none;
        }
        .header{
            height: 36px;
            line-height: 36px;
            text-align: center;
            display: flex;
            z-index: 2;
            .left{
                width: 36px;
            }
            .title{
                flex: 1;
            }
            .right{
                width: 36px;
                cursor: pointer;
                transition: color .5s;
                &:hover{
                    color: $color-primary;
                }
            }
        }
        .body{
            flex: 1;
            overflow: hidden;
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            z-index: 1;
            .img-item{
                position: relative;
                max-width: 1920px;
                max-height: 768px;
                transition: all .2s;
            }
        }
    }
</style>