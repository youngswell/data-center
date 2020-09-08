<template>
    <div class="list">
        <el-container>
            <el-aside width="220px">
                <div class="search-box">
                    <el-input type="text" v-model="keyword" placeholder="输入关键字以检索..." clearable></el-input>
                </div>
                <el-menu :default-active="'/datas/list/'+defaultActiveId"
                         :router="true"
                         active-text-color="#ff6666"
                         class="el-menu-vertical-demo">
                    <el-submenu :index="'/datas/list/'+String(child.id)" v-for="(child, childIndex) in menus" :key="childIndex">
                        <template slot="title">
<!--                            <i class="el-icon-location"></i>-->
                            <span>{{ child.label }}</span>
                        </template>
                        <template v-for="(grandson, grandsonIndex) in child.children">
                            <template v-if="grandson.children">
                                <el-submenu :index="'/datas/list/'+String(grandson.id)" :key="grandsonIndex">
                                    <template slot="title">{{ grandson.label }}</template>
                                    <el-menu-item :index="'/datas/list/'+String(greatGrandson.id)" v-for="(greatGrandson, greatGrandsonIndex) in grandson.children" :key="greatGrandsonIndex">{{ greatGrandson.label }}</el-menu-item>
                                </el-submenu>
                            </template>
                            <template v-else>
                                <el-menu-item :index="'/datas/list/'+String(grandson.id)" :key="grandsonIndex">{{ grandson.label }}</el-menu-item>
                            </template>
                        </template>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-main>
                <div class="API-list">
                    <div class="api" v-for="(api, index) in list" :key="index">
                        <div class="name">{{ api.name }}</div>
                    </div>
                </div>
            </el-main>
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
        // MenuItemGroup,
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
            // "el-menu-item-group": MenuItemGroup,
            "el-submenu": Submenu,
            "el-input": Input,
        },
        data() {
            return {
                menus: list,
                list: list,
                keyword: ""
            }
        },
        computed: {
            defaultActiveId() {
                return this.$route.params.id
            }
        },
        watch: {
            defaultActiveId: {
                handler(id) {
                    // console.log(id)
                    this.list = this.getData(id)
                },
                immediate: true
            }
        },
        mounted() {
            // console.log(this.$route.params)
        },
        methods: {
            getData(id) {
                let list = []
                let length = Math.round(Math.random()*100)
                for (let i = 0; i < length; i++) {
                    list.push({
                        id: id + i,
                        name: "API-" + id + i
                    })
                }
                // console.log(list)
                return list
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "@/common/style/theme.scss";
    .list{
        aside{
            display: flex;
            flex-direction: column;
            .search-box{
                padding: 15px 0;
            }
            .el-menu{
                flex: 1;
            }
        }
        main{
            padding: 15px;
            .API-list{
                display: flex;
                flex-wrap: wrap;
                .api{
                    $height: 100px;
                    height: $height;
                    line-height: $height;
                    min-width: 120px;
                    margin: 0 15px 15px 0;
                    text-align: center;
                    cursor: pointer;
                    padding: $space-row-base $space-col-base;
                    border-radius: $border-radius-base;
                    background-color: $bg-color;
                    box-shadow: 5px 5px 10px transparentize($box-shadow-color,.2);
                    transition: all .5s;
                    &:hover{
                        transform: scale(1.08);
                    }
                }
            }
        }
    }

</style>