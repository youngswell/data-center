<template>
    <layout>
        <layout-header slot="header"></layout-header>
        <div slot="page" class="page">
            <div class="page-container">
                <div class="sub-bar"></div>
            </div>
            <div class="tabs">
                <div class="page-container">
                    <nav>
                        <div class="tab-item" :class="{ 'active': current === 0 }" @mouseover="current = 0">
                            <i class="jly-data-icon">&#xe66f;</i>
                            <span class="text">主题</span>
                        </div>
                        <div class="tab-item" :class="{ 'active': current === 1 }" @mouseover="current = 1">
                            <i class="jly-data-icon">&#xe60b;</i>
                            <span class="text">行业</span>
                        </div>
                        <div class="tab-item" :class="{ 'active': current === 2 }" @mouseover="current = 2">
                            <i class="jly-data-icon">&#xe60c;</i>
                            <span class="text">领域</span>
                        </div>
                    </nav>
                    <div class="content-container">
                        <div class="content" v-show="current === 0">
                            <el-row>
                                <el-col :span="4">
                                    <div class="item">
                                        <div class="icon"><i class="jly-data-icon">&#xe625;</i></div>
                                        <div class="title">党建引领</div>
                                    </div>
                                </el-col>
                                <el-col :span="4">
                                    <div class="item">
                                        <div class="icon"><i class="jly-data-icon">&#xe682;</i></div>
                                        <div class="title">企业经营</div>
                                    </div>
                                </el-col>
                                <el-col :span="4">
                                    <div class="item">
                                        <div class="icon"><i class="jly-data-icon">&#xe61d;</i></div>
                                        <div class="title">转型升级</div>
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                        <div class="content" v-show="current === 1">
                            <el-row>
                                <el-col :span="4">
                                    <div class="item">
                                        <div class="icon"><i class="jly-data-icon">&#xe620;</i></div>
                                        <div class="title">宾馆酒楼</div>
                                    </div>
                                </el-col>
                                <el-col :span="4">
                                    <div class="item">
                                        <div class="icon"><i class="jly-data-icon">&#xe614;</i></div>
                                        <div class="title">房产物业</div>
                                    </div>
                                </el-col>
                                <el-col :span="4">
                                    <div class="item">
                                        <div class="icon"><i class="jly-data-icon">&#xe61c;</i></div>
                                        <div class="title">养老</div>
                                    </div>
                                </el-col>
                                <el-col :span="4">
                                    <div class="item">
                                        <div class="icon"><i class="jly-data-icon">&#xe64a;</i></div>
                                        <div class="title">建筑物流</div>
                                    </div>
                                </el-col>
                                <el-col :span="4">
                                    <div class="item">
                                        <div class="icon"><i class="jly-data-icon">&#xe695;</i></div>
                                        <div class="title">合金型材</div>
                                    </div>
                                </el-col>
                                <el-col :span="4">
                                    <div class="item">
                                        <div class="icon"><i class="jly-data-icon">&#xe648;</i></div>
                                        <div class="title">机械设备</div>
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                        <div class="content" v-show="current === 2">
                            <el-row>
                                <el-col :span="4">
                                    <div class="item">
                                        <div class="icon"><i class="jly-data-icon">&#xe665;</i></div>
                                        <div class="title">政务</div>
                                    </div>
                                </el-col>
                                <el-col :span="4">
                                    <div class="item">
                                        <div class="icon"><i class="jly-data-icon">&#xe629;</i></div>
                                        <div class="title">安全生产</div>
                                    </div>
                                </el-col>
                                <el-col :span="4">
                                    <div class="item">
                                        <div class="icon"><i class="jly-data-icon">&#xe6fa;</i></div>
                                        <div class="title">数智化</div>
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                </div>
            </div>
            <home-footer></home-footer>
        </div>
    </layout>
</template>

<script>
    import {
        Row,
        Col
    } from "element-ui"
    import layout from "@/layout";
    import Header from "@/components/layout-header"
    import footer from "./footer"
    export default {
        name: "home",
        components: {
            "el-row": Row,
            "el-col": Col,
            "layout": layout,
            "layout-header": Header,
            "home-footer": footer,
        },
        data() {
            return {
                current: 0,
                list: [
                    { id: 0, label: "主题", icon: "&#xe66f;" },
                    { id: 1, label: "行业", icon: "&#xe60b;" },
                    { id: 2, label: "领域", icon: "&#xe60c;" },
                ]
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "@/common/style/theme.scss";
    .page{
        .sub-bar{
            height: 200px;
        }
        .tabs{
            background-color: $bg-color;
            padding: 15px 0;
            nav{
                height: 48px;
                line-height: 48px;
                display: flex;
                .tab-item{
                    flex: 1;
                    font-size: 16px;
                    text-align: center;
                    cursor: pointer;
                    transition: all .3s;
                    .text{
                        margin-left: 5px;
                        color: $color-primary;
                    }
                    i{
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
                padding: 15px;
                border: 1px solid $border-color;
                .content{
                    transition: all .3s;
                    .item{
                        margin-top: 15px;
                        text-align: center;
                        border: 1px solid transparent;
                        transition: all .3s;
                        cursor: pointer;
                        i{
                            font-size: 60px;
                            transition: all .3s;
                        }
                        .title{
                            line-height: 32px;
                            color: $text-color-grey;
                            font-size: 14px;
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
                }
            }
        }
    }
</style>