<template>
    <div class="layout-header" :style="styles">
        <logo :show-text="options.logo.showText"></logo>
        <breadcrumb v-if="false && $route.matched.length > 1"></breadcrumb>
        <div class="null"></div>
        <el-menu :router="true" class="menus"
                 :default-active="activeIndex"
                 mode="horizontal"
                 @select="handleSelect">
            <el-menu-item index="/home">首页</el-menu-item>
            <el-submenu index="/datas">
                <template slot="title">DATA</template>
                <el-menu-item index="/datas/list">数据目录</el-menu-item>
                <el-menu-item index="/datas/API">API</el-menu-item>
            </el-submenu>
        </el-menu>
        <user></user>
    </div>
</template>

<script>
    import {
        Menu,
        MenuItem,
        Submenu,
    } from "element-ui"
    import Logo from "@/components/layout-header/logo"
    import breadcrumb from "@/components/layout-header/breadcrumb"
    import user from "@/components/layout-header/user"
    export default {
        name: "layout-header",
        components: {
            Logo,
            breadcrumb,
            user,
            "el-menu": Menu,
            "el-menu-item": MenuItem,
            "el-submenu": Submenu,
        },
        props: {
            styles: {
                type: String,
                default: ""
            },
            options: {
                type: Object,
                default() {
                    return {
                        logo: {
                            showText: true
                        }
                    }
                }
            }
        },
        data() {
            return {
                // activeIndex: "1"
            }
        },
        computed: {
            activeIndex() {
                return this.$route.path
            }
        },
        methods: {
            handleSelect(e) {
                console.log(e)
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "@/common/style/theme.scss";
.layout-header{
    height: 60px;
    line-height: 60px;
    padding: 0 15px;
    background-color: $bg-color;
    display: flex;
    flex-direction: row;
    .breadcrumb{
        margin-left: 15px;
    }
    .user{
        margin-left: 15px;
    }
    .null{
        flex: 1;
    }
}
</style>