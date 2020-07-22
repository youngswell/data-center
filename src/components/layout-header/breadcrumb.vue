<template>
    <div class="breadcrumb">
        <el-button type="text" @click="back"><i class="el-icon-arrow-left"></i></el-button>
        <div class="partition"></div>
        <el-button type="text"><i class="el-icon-menu"></i></el-button>
    </div>
</template>

<script>
    import {
        Button
    } from "element-ui"
    export default {
        name: "breadcrumb",
        components: {
            "el-button": Button,
        },
        props: {
            current: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            back() {
                if (this.$route.matched.length > 1) this.$router.go(-1)
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "@/common/style/theme.scss";
.breadcrumb{
    display: inline-block;
    line-height: inherit;
    .partition{
        display: inline-block;
        height: 18px;
        width: 1px;
        vertical-align: middle;
        background-color: $border-color;
        margin: 0 5px;
        position: relative;
        top: -3px;
    }
    i{
        font-size: 20px;
        color: $text-color-content;
    }
}
</style>