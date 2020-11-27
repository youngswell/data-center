<template>
    <layout class="page">
        <div slot="header" class="header">
            <div class="left">
                <row-item label="项目ID" show-colon><el-input class="filter-item" v-model="fillter.projectid" placeholder="请输入项目ID"></el-input></row-item>
                <row-item label="身份证号" show-colon><el-input class="filter-item" v-model="fillter.code" placeholder="请输入身份证号"></el-input></row-item>
                <row-item label="姓名" show-colon><el-input class="filter-item" v-model="fillter.name" placeholder="请输入姓名"></el-input></row-item>
                <row-item label="件袋号" show-colon><el-input class="filter-item" v-model="fillter.jdh" placeholder="请输入件袋号"></el-input></row-item>
                <row-item label="住宅地址" show-colon><el-input class="filter-item" v-model="fillter.address" placeholder="请输入住宅地址"></el-input></row-item>
            </div>
            <div class="right">
                <el-button type="default">重置</el-button>
                <el-button type="primary">检索</el-button>
            </div>
        </div>
        <div class="main" slot="page">
            <el-table :data="list" style="width: 100%;">
                <el-table-column prop="order_list" label="排序" min-width="60"></el-table-column>
                <el-table-column prop="id" label="ID" min-width="80"></el-table-column>
                <el-table-column prop="admin_name" label="创建人" min-width="100"></el-table-column>
                <el-table-column prop="name" label="标题" min-width="100"></el-table-column>
                <el-table-column prop="category_name" label="分类" min-width="80"></el-table-column>
                <el-table-column prop="integral" label="积分" min-width="60"></el-table-column>
                <el-table-column prop="download_number" label="下载次数" min-width="60"></el-table-column>
                <el-table-column prop="create_time" label="创建时间" min-width="100"></el-table-column>
                <el-table-column label="操作" min-width="120">
                    <!-- eslint-disable -->
                    <!-- eslint-enable  -->
<!--                    <template slot-scope="scope">-->
<!--                        <el-button type="text" size="small" @click="view(scope.$index)">查看</el-button>-->
<!--                        <el-button type="text" size="small" @click="edit(scope.$index)">编辑</el-button>-->
<!--                        <el-button type="text" size="small" @click="remove(scope.$index)">删除</el-button>-->
<!--                    </template>-->
                </el-table-column>
            </el-table>
            <div class="footer">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :hide-on-single-page="true"
                        :background="true"
                        :current-page="pageInfo.current_page"
                        :page-sizes="[10, 20, 30]"
                        :page-size="pageInfo.per_page"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="pageInfo.total">
                </el-pagination>
            </div>
        </div>
    </layout>
</template>

<script>
    import Layout from '@/layout/index';
    import RowItem from '@/layout/row-item';
    import {
        Row, Col,
        Input, Button,
        Tabel, TableColumn,
        Pagination,
    } from 'element-ui';
    import loading from "@/utils/loading";
    export default {
        name: 'levy',
        components: {
            [Row.name]: Row,
            [Col.name]: Col,
            [Input.name]: Input,
            [Button.name]: Button,
            [Tabel.name]: Tabel,
            [TableColumn.name]: TableColumn,
            [Pagination.name]: Pagination,
            [Layout.name]: Layout,
            [RowItem.name]: RowItem,
        },
        data() {
            return {
                list: [],
                fillter: {
                    projectid: '',
                    code: '',
                    name: '',
                    jdh: '',
                    address: '',
                },
                pageInfo: {
                    current_page: 1,
                    length: 1,
                    last_page: 1,
                    per_page: 10,
                    total: 0,
                },
            }
        },
        methods: {
            loading,
            getList() {
                const filter = {

                }
                console.log(filter)
                this.$api.levy.getList(filter).then(res => {
                    // console.log(res)
                    if (res.data) {
                        this.list = res.data
                        delete res.data
                        res.per_page = Number(res.per_page)
                        this.pageInfo = res
                        // console.log(res)
                    }
                    console.log(this.list)
                })
            },
            getProjects() {
                this.$api.levy.getProjects().then(res => {
                    // console.log(res)
                    this.cates = res.data || res
                })
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.pageInfo.per_page = val;
                this.pageInfo.current_page = 1;
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.pageInfo.current_page = val
                this.getList()
            },
            toFilter() {
                this.pageInfo.current_page = 1;
                this.getList()
            },
            // view(index) {
            //     this.$router.push('/levy/info/'+this.list[index].id)
            // },
            // edit(index) {
            //     this.$router.push({
            //         path: '/' + this.moduleName + '/edit/'+this.list[index].id,
            //         query: { cates: JSON.stringify(this.cates) }
            //     })
            // },
            // add() {
            //     this.$router.push({
            //         path: '/' + this.moduleName + '/edit/0',
            //         query: { cates: JSON.stringify(this.cates) }
            //     })
            // },
            // remove(index) {
            //     this.$confirm("确定删除该条记录?").then(() => {
            //         this.$api[this.moduleName].remove(this.list[index].id).then(() => {
            //             this.$message.success("删除成功!");
            //             this.getList()
            //         })
            //     })
            // }
        }
    }
</script>

<style lang="scss" scoped>
    @import "@/common/style/theme.scss";
    .page{
        .header{
            padding: 0 $space-col-base;
            line-height: 60px;
            background-color: $bg-color;
            display: flex;
            .left{
                flex: 1;
                display: flex;
                .row-item{
                    flex: 1;
                    .filter-item{

                    }
                }
            }
            .right{
                margin-left: $space-col-base;
            }
        }
    }
</style>
