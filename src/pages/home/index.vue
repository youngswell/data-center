<template>
    <div class="page" :style="{height: height + 'px'}">
        <div class="sub-bar">
            <div class="page-container">
                <el-tabs tab-position="left" style="">
                    <el-tab-pane label="关键字搜索">
                        <el-input v-model="filter.keyword" placeholder="请输入您要搜索的内容" style="width: 420px">
                            <el-button slot="append" icon="el-icon-search"></el-button>
                        </el-input>
                    </el-tab-pane>
                    <el-tab-pane label="元数据搜索">
                        <el-form style="" label-width="80px">
                            <el-row :gutter="20">
                                <el-col :span="18">
                                    <el-form-item label="名称">
                                        <el-input v-model="filter.name" placeholder="请输入资源名称" style=""></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row :gutter="20">
                                <el-col :span="9">
                                    <el-form-item label="关键字">
                                        <el-input v-model="filter.keyword" placeholder="请输入资源关键字" style=""></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="9">
                                    <el-form-item label="摘要">
                                        <el-input v-model="filter.keyword" placeholder="请输入资源摘要" style=""></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row :gutter="20">
                                <el-col :span="6">
                                    <el-form-item label="主题分类">
                                        <el-select v-model="filter.keyword" placeholder="请选择主题分类" style="">
                                            <el-option :label="0">请选择</el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="行业分类">
                                        <el-select v-model="filter.keyword" placeholder="请选择行业分类" style="">
                                            <el-option :label="0">请选择</el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="服务分类">
                                        <el-select v-model="filter.keyword" placeholder="请选择服务分类" style="">
                                            <el-option :label="0">请选择</el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="组织">
                                        <el-select v-model="filter.keyword" placeholder="请选择组织" style="">
                                            <el-option :label="0">请选择</el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row :gutter="20">
                                <el-col :span="6">
                                    <el-form-item label="数据格式">
                                        <el-select v-model="filter.keyword" placeholder="请选择数据格式" style="">
                                            <el-option :label="0">请选择</el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="更新频率">
                                        <el-select v-model="filter.keyword" placeholder="请选择更新频率" style="">
                                            <el-option :label="0">请选择</el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="发布日期">
                                        <el-date-picker v-model="filter.keyword" type="date" placeholder="选择日期"></el-date-picker>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row :gutter="20">
                                <el-col :span="6">
                                    <el-form-item label="下架日期">
                                        <el-date-picker v-model="filter.keyword" type="date" placeholder="选择日期"></el-date-picker>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
        <div class="tabs">
            <div class="page-container">
                <div class="title">数据分类</div>
                <div class="divider">DATA CLASSIFICATION</div>
                <nav>
                    <div class="tab-item" v-for="(nav, index) in tabs" :key="index" :class="{ 'active': current === index }" @mouseover="current = index">
                        <i class="jly-data-icon" v-html="nav.icon"></i>
                        <span class="text">{{ nav.name }}</span>
                    </div>
                    <div class="tab-item" :key="tabs.length" :class="{ 'active': current === tabs.length }" @mouseover="current = tabs.length">
                        <i class="jly-data-icon">&#xe690;</i>
                        <span class="text">组织</span>
                    </div>
                </nav>
                <div class="content-container">
                    <div class="content" v-for="(cate, index) in tabs" :key="index" v-show="current === index">
                        <el-row>
                            <el-col :span="4" v-for="(child, key) in cate.children" :key="key">
                                <router-link class="item" :to="{ name: 'resource-interface', params: { id: child.id, pid: child.parentId } }">
                                    <div class="icon"><i class="jly-data-icon" v-html="child.icon"></i></div>
                                    <div class="title">{{ child.name }}</div>
                                </router-link>
                            </el-col>
                        </el-row>
                    </div>
                    <div class="content" :key="tabs.length" v-show="current === tabs.length">
                        <el-row>
                            <el-col :span="6" v-for="(child, key) in cates" :key="key">
                                <router-link class="organization" :to="{ name: 'resource-catalog', params: { id: child.id } }">
                                    <span class="icon"><i class="jly-data-icon">&#xe61f;</i></span>
                                    <span class="title">{{ child.name }}</span>
                                </router-link>
                            </el-col>
                        </el-row>
                    </div>
                    <div class="loadding" v-if="loading">
                        <div>
                            <i class="el-icon-loading" style="font-size: 42px"></i>
                            <p class="text">加载中...</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <home-footer></home-footer>
    </div>
</template>

<script>
    import {
        Row, Col,
        Tabs, TabPane,
        Form, FormItem,
        Input, Button, Select, Option, DatePicker,
    } from 'element-ui'
    import Footer from "./footer"
    export default {
        name: "home",
        components: {
            [Row.name]: Row,
            [Col.name]: Col,
            [Tabs.name]: Tabs,
            [TabPane.name]: TabPane,
            [Footer.name]: Footer,
            [Form.name]: Form,
            [FormItem.name]: FormItem,
            [Input.name]: Input,
            [Button.name]: Button,
            [Select.name]: Select,
            [Option.name]: Option,
            [DatePicker.name]: DatePicker,
        },
        data() {
            return {
                current: 0,
                tabs: [],
                cates: [],
                loading: false,
                filter: {
                    keyword: ''
                }
            }
        },
        computed: {
            height() {
                return (this.$store.getters.system).clientHeight - 75
            }
        },
        watch: {
            current: {
                handler(current) {
                    if (current !== undefined && current < this.tabs.length && this.tabs[current].id > 0 && !this.tabs[current].children) {
                        this.getCategoryByPId(current,this.tabs[current].id)
                    }
                },
                immediate: false,
            }
        },
        created() {
            this.getCategory().then(() => {
                this.getCategoryByPId(0,this.tabs[0].id)
            })
            this.$api.unit.getUnit().then(({ list }) => {
                this.cates = list;
            })
        },
        methods: {
            getCategory() {
                return Promise.all([
                    this.$api.meta.category().then(({list}) => {
                        this.tabs = list
                    })
                ])
            },
            getCategoryByPId(index,pid) {
                this.loading = true;
                return Promise.all([
                    this.$api.meta.getCategoryByPId(pid).then(({ list }) => {
                        this.$set(this.tabs[index], 'children', list)
                    })
                ]).finally(() => {
                    this.loading = false
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "@/common/style/theme.scss";
    .page{
        height: 500px;
        margin: 0 -15px -15px;
        display: flex;
        flex-direction: column;
        .sub-bar{
            /*height: 200px;*/
        }
        .tabs{
            flex: 1;
            padding: 0 0 $space-row-base;
            .page-container{
                // background-color: $bg-color;
            }
            .title{
                font-size: $font-size-lg;
                color: $text-color-title;
                line-height: 40px;
                text-align: center;
            }
            .divider{
                display: flex;
                height: 40px;
                align-items: center;
            }
            .divider::before{
                content: '';
                display: block;
                flex: 1;
                height: 1px;
                background-color: $border-color;
                margin-right: 15px;
            }
            .divider::after{
                content: '';
                display: block;
                flex: 1;
                height: 1px;
                background-color: $border-color;
                margin-left: 15px;

            }
            nav{
                height: 60px;
                line-height: 60px;
                display: flex;
                background-color: $border-color;
                border-radius: $border-radius-base $border-radius-base 0 0;
                .tab-item{
                    flex: 1;
                    font-size: $font-size-lg;
                    text-align: center;
                    cursor: pointer;
                    transition: all .3s;
                    border-radius: $border-radius-base $border-radius-base 0 0;
                    .text{
                        margin-left: 5px;
                        color: $color-primary;
                    }
                    i{
                        font-size: $font-size-lg;
                        color: $color-primary;
                    }
                    &.active{
                        background-color: $color-primary;
                        .text{
                            color: $text-color-inverse;
                        }
                        i{
                            color: $text-color-inverse;
                        }
                    }
                }
            }
            .content-container{
                height: 320px;
                padding: $space-row-base $space-col-base;
                border: 1px solid $border-color;
                border-top: none;
                background-color: $bg-color;
                .content{
                    transition: all .3s;
                    .item{
                        margin-top: $space-row-base;
                        text-align: center;
                        border: 1px solid transparent;
                        transition: all .3s;
                        cursor: pointer;
                        i{
                            font-size: 60px;
                            transition: all .3s;
                            color: $text-color-grey;
                        }
                        .title{
                            line-height: 32px;
                            color: $text-color-grey;
                            font-size: $font-size-base;
                            transition: all .3s;
                        }
                        &:hover{
                            /*<!--border-color: $color-primary;-->*/
                            i{
                                color: $color-primary;
                            }
                            .title{
                                color: $color-primary;
                            }
                        }
                    }
                    .organization{
                        transition: all .3s;
                        cursor: pointer;
                        .title{
                            line-height: 32px;
                            font-size: $font-size-base;
                            transition: all .3s;
                            color: $text-color-title;
                        }
                        i{
                            margin-right: 5px;
                        }
                        &:hover{
                            i{
                                color: $color-primary;
                            }
                            .title{
                                color: $color-primary;
                            }
                        }
                    }
                }
                .loadding{
                    height: 100%;
                    margin: -15px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background-color: transparentize($bg-color-grey, .5);
                    position: relative;
                    z-index: 10;
                    i{
                        color: $color-primary;
                    }
                    .text{
                        line-height: 32px;
                        color: $color-primary;
                    }
                }
            }
        }
    }
</style>
