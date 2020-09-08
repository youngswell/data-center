<template>
    <div class="page" :style="{height: height + 'px'}">
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
                        <i class="jly-data-icon">&#xe72e;</i>
                        <span class="text">服务</span>
                    </div>
                    <div class="tab-item" :class="{ 'active': current === 3 }" @mouseover="current = 3">
                        <i class="jly-data-icon">&#xe690;</i>
                        <span class="text">部门</span>
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
                    <div class="content" v-show="current === 3">
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
                // height: 860,
                list: [
                    { id: 0, label: "主题", icon: "&#xe66f;" },
                    { id: 1, label: "行业", icon: "&#xe60b;" },
                    { id: 2, label: "领域", icon: "&#xe60c;" },
                ]
            }
        },
        computed: {
            height() {
                return (this.$store.getters.system).clientHeight - 75
            }
        },
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
                }
            }
        }
    }
</style>
