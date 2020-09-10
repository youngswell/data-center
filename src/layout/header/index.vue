<template>
    <div class="layout-header" :style="styles">
        <logo :show-text="options.logo.showText"></logo>
        <breadcrumb v-if="false && $route.matched.length > 1"></breadcrumb>
        <div class="null"></div>
        <el-menu :router="true" class="menus"
                 :default-active="activeIndex"
                 mode="horizontal"
                 @select="handleSelect">
            <template v-for="item in routers">
                <template v-if="item.children">
                    <el-submenu :index="item.path" :key="item.path">
                        <template slot="title">{{ item.meta.title }}</template>
                        <template v-for="v in item.children">
                            <el-menu-item :index="v.path" :key="v.path" v-if="v.meta">{{ v.meta.title }}</el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.path" :key="item.path" v-if="item.meta">{{ item.meta.title }}</el-menu-item>
                </template>
            </template>
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
    import Logo from "./logo"
    import breadcrumb from "./breadcrumb"
    import user from "./user"
    import { routers } from "@/router"
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
                // activeIndex: '',
                routers,
            }
        },
        computed: {
            activeIndex() {
                // let path = this.$route.path.split('/');
                // path.splice(0,1);
                // path.splice(path.length - 1,1);
                // path = '/' + path.join('/')
                return this.$route.path
            }
        },
        created() {
            let i = 0;
            // console.log(this.routers)
            for (i in this.routers) {
                if (this.routers[i].name === "home") {
                    break;
                }
            }
            const temp = JSON.parse(JSON.stringify(this.routers[i]));
            this.routers.splice(i,1);
            this.routers.unshift(temp);
        },
        methods: {
            handleSelect() {
                // console.log(e)
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
