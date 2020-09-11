<template>
    <div class="page" :style="{height: height + 'px'}">
        <div class="page-container">
            <div class="sub-bar"></div>
        </div>
        <div class="tabs">
            <div class="page-container">
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
    } from 'element-ui'
    import Footer from "./footer"
    export default {
        name: "home",
        components: {
            [Row.name]: Row,
            [Col.name]: Col,
            [Footer.name]: Footer,
        },
        data() {
            return {
                current: 0,
                tabs: [],
                cates: [],
                loading: false,
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
