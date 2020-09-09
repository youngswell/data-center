<template>
    <div class="page">
        <div class="header">
            <div class="left"></div>
            <div class="right">
                <el-input class="input" v-model="filters.keyword" placeholder="输入关键字以检索" clearable></el-input>
                <el-button type="primary" @click="toFilter">搜索</el-button>
                <el-button type="primary" @click="add">添加应用</el-button>
            </div>
        </div>
        <div class="container">
            <el-table :data="list" row-key="id" style="width: 100%;">
                <el-table-column prop="name" label="应用名称" min-width="160"></el-table-column>
                <el-table-column prop="description" label="应用描述" min-width="220"></el-table-column>
                <el-table-column prop="projectName" label="所属项目" min-width="100"></el-table-column>
                <el-table-column prop="platformName" label="所属平台" min-width="80"></el-table-column>
                <el-table-column label="操作" min-width="120" center>
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
                        <el-button type="text" size="small" @click="remove(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
<!--            <div class="footer">-->
<!--                <el-pagination-->
<!--                        @size-change="handleSizeChange"-->
<!--                        @current-change="handleCurrentChange"-->
<!--                        :hide-on-single-page="true"-->
<!--                        :background="true"-->
<!--                        :current-page="pageInfo.current_page"-->
<!--                        :page-sizes="[10, 20, 30]"-->
<!--                        :page-size="pageInfo.per_page"-->
<!--                        layout="total, sizes, prev, pager, next, jumper"-->
<!--                        :total="pageInfo.total">-->
<!--                </el-pagination>-->
<!--            </div>-->
        </div>
        <app ref="app" @listchage="getList"></app>
    </div>
</template>

<script>
    import {
        Table,
        TableColumn,
        Pagination,
        Button, Input,
        Select, Option,
        Row, Col,
        Dialog, Alert,
        Dropdown, DropdownMenu, DropdownItem,
        Tag,
    } from "element-ui";
    import RowItem from '@/layout/row-item';
    import App from './app';
    export default {
        name: "list",
        components: {
            [Row.name]: Row,
            [Col.name]: Col,
            [Dialog.name]: Dialog,
            [Table.name]: Table,
            [TableColumn.name]: TableColumn,
            [Button.name]: Button,
            [Pagination.name]: Pagination,
            [Input.name]: Input,
            [Select.name]: Select,
            [Option.name]: Option,
            [Alert.name]: Alert,
            [Dropdown.name]: Dropdown,
            [DropdownMenu.name]: DropdownMenu,
            [DropdownItem.name]: DropdownItem,
            [Tag.name]: Tag,
            [RowItem.name]: RowItem,
            [App.name]: App,
        },
        data() {
            return {
                list: [],
                types: [],
                pageInfo: {
                    current_page: 1,
                    length: 1,
                    last_page: 1,
                    per_page: 10,
                    total: 0,
                },
                filters: {
                    type: "",
                    status: "",
                    keyword: ""
                }
            }
        },
        watch: {

        },
        created() {
            this.getList();
            this.$on("listchange", () => {
                this.getList()
            })
        },
        destroyed() {
            this.$off("listchange")
        },
        methods: {
            getList() {
                const filter = {
                    page: this.pageInfo.current_page,
                    limit: this.pageInfo.per_page,
                    ...this.filters
                }
                this.$api[this.$route.matched[this.$route.matched.length - 1].meta.module].list(filter).then(res => {
                    console.log(res)
                    if (res.list) {
                        this.list = res.list
                    }
                })
            },
            handleSizeChange(val) {
                this.pageInfo.per_page = val;
                this.pageInfo.current_page = 1;
            },
            handleCurrentChange(val) {
                this.pageInfo.current_page = val
                this.getList()
            },
            toFilter() {
                this.pageInfo.current_page = 1;
                this.getList()
            },
            view(index) {
                console.log(index)
            },
            edit(item) {
                this.$refs.app.open(item)
            },
            add() {
                this.$refs.app.open()
            },
            remove(id) {
                this.$confirm('删除前请确保该应用未在使用！确定删除?', '删除应用').then(() => {
                    this.$api[this.$route.matched[this.$route.matched.length - 1].meta.module].del(id).then(() => {
                        this.$message.success("删除成功!");
                        this.getList()
                    })
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "@/common/style/theme.scss";
    .page{
        background-color: $bg-color;
        border-radius: $border-radius-base;
        padding: $space-row-base $space-col-base;
        & > .header{
            display: flex;
            padding-bottom: $space-row-base;
            & > .left{
                flex: 1;
                label{
                    margin-right: 15px;
                    font-size: 14px;
                    font-weight: 500;
                }
            }
            & > .right{
                display: flex;
                .input{
                    margin-right: 15px;
                }
            }
        }
        & > .container {

        }
        .footer{
            margin-top: $space-row-base;
        }
    }
</style>
