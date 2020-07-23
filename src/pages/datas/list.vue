<template>
    <div class="list">
        <el-container>
            <el-aside width="220px">
                <div class="search-box">
                    <el-input type="text" v-model="keyword" placeholder="输入关键字以检索..." clearable></el-input>
                </div>
                <el-menu default-active="2"
                         class="el-menu-vertical-demo">
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>导航一</span>
                        </template>
                        <el-menu-item-group>
                            <template slot="title">分组一</template>
                            <el-menu-item index="1-1">选项1</el-menu-item>
                            <el-menu-item index="1-2">选项2</el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group title="分组2">
                            <el-menu-item index="1-3">选项3</el-menu-item>
                        </el-menu-item-group>
                        <el-submenu index="1-4">
                            <template slot="title">选项4</template>
                            <el-menu-item index="1-4-1">选项1</el-menu-item>
                        </el-submenu>
                    </el-submenu>
                    <el-menu-item index="2">
                        <i class="el-icon-menu"></i>
                        <span slot="title">导航二</span>
                    </el-menu-item>
                    <el-menu-item index="3" disabled>
                        <i class="el-icon-document"></i>
                        <span slot="title">导航三</span>
                    </el-menu-item>
                    <el-menu-item index="4">
                        <i class="el-icon-setting"></i>
                        <span slot="title">导航四</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-main>{{ JSON.stringify(list) }}</el-main>
        </el-container>
    </div>
</template>

<script>
    import {
        Container,
        Aside,
        Main,
        Menu,
        MenuItem,
        MenuItemGroup,
        Submenu,
        Input,
    } from "element-ui"
    import list from "../../assets/json/categories.json"
    export default {
        name: "list",
        components: {
            "el-container": Container,
            "el-aside": Aside,
            "el-main": Main,
            "el-menu": Menu,
            "el-menu-item": MenuItem,
            "el-menu-item-group": MenuItemGroup,
            "el-submenu": Submenu,
            "el-input": Input,
        },
        data() {
            return {
                list,
                keyword: ""
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import "@/common/style/theme.scss";
    .list{
        aside{
            .search-box{
                padding: 15px 0;
            }
        }
        main{
            padding: 15px;
        }
    }

</style>