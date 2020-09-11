<template>
    <div class="api-info">
        <div class="container">
            <div class="session">
                <div class="body">
                    <div class="left">
                        <div class="head">
                            <span class="title">{{ info.name }}</span>
                        </div>
                        <div class="sub">
                            <row-item label-width="auto" label="提供部门" show-colon>{{ info.providerName }}</row-item>
                            <row-item label-width="auto" label="发布日期" show-colon>{{ info.releaseTime }}</row-item>
                            <row-item label-width="auto" label="最后更新日期" show-colon>{{ info.refreshTime }}</row-item>
                            <row-item label-width="auto" label="更新频率" show-colon>{{ info.refreshRate }}</row-item>
                        </div>
                    </div>
                    <div class="right">
                        <div class="handler">
                            <el-button type="default" size="small"><i class="el-icon-warning-outline"></i>&nbsp;纠错</el-button>
                        </div>
                        <div class="num">
                            <span><i class="jly-data-icon">&#xe6d7;</i>{{ info.pageView }}</span>
                            <span><i class="jly-data-icon">&#xe601;</i>{{ info.downloads }}</span>
                        </div>
                    </div>
                </div>
                <div class="digest"><row-item label-width="auto" label="数据简介" show-colon></row-item>{{ info.digest }}</div>
            </div>

            <div class="session">
                <table>
                    <tr><th colspan="4">元数据</th></tr>
                    <tr><td class="label">名称</td><td class="content" colspan="3">{{ info.name }}</td></tr>
                    <tr><td class="label">简介</td><td class="content" colspan="3">{{ info.digest }}</td></tr>
                    <tr><td class="label">关键词</td><td class="content" colspan="3">{{ info.keyword }}</td></tr>
                    <tr><td class="label">来源</td><td class="content" colspan="3">{{ info.sourceSystem }}</td></tr>
                    <tr><td class="label">主题</td><td class="content" colspan="2">{{ info.domainName }}</td></tr>
                    <tr><td class="label">行业</td><td class="content" colspan="2">{{ info.themeName }}</td></tr>
                    <tr><td class="label">服务</td><td class="content" colspan="2">{{ info.serviceName }}</td></tr>
                    <tr><td class="label">开放方式</td><td class="content" colspan="2">{{ info.openModule }}</td></tr>
                    <tr><td class="label">更新频率</td><td class="content" colspan="2">{{ info.refreshRate }}</td></tr>
                    <tr><td class="label">发布日期</td><td class="content" colspan="2">{{ info.releaseTime }}</td></tr>
                    <tr><td class="label">更新日期</td><td class="content" colspan="2">{{ info.refreshTime }}</td></tr>
                    <tr><td class="label">资源格式</td><td class="content" colspan="2">{{ info.format }}</td></tr>
                    <tr><td class="label">发布者</td><td class="content" colspan="2">{{ info.providerName }}</td></tr>
                    <tr><td class="label">维护者</td><td class="content" colspan="2">{{ info.managementName }}</td></tr>
                    <tr><td class="label">语言</td><td class="content" colspan="2">{{ info.language }}</td></tr>
                    <tr><td class="label">存储大小</td><td class="content" colspan="2">{{ info.size }}</td></tr>
                    <tr><td class="label">数据量</td><td class="content" colspan="2">{{ info.count }}</td></tr>
                    <tr><td class="label">浏览量</td><td class="content" colspan="2">{{ info.pageView }}</td></tr>
                    <tr><td class="label">下载量</td><td class="content" colspan="2">{{ info.downloads }}</td></tr>
                </table>
            </div>

            <div class="session" v-if="JSON.stringify(data) !== '{}'">
                <table>
                    <tr><th colspan="4">Api接口信息</th></tr>
                    <tr><td class="label">接口描述</td><td class="content" colspan="3">{{ data.digest }}</td></tr>
                    <tr><td class="label">接口地址</td><td class="content" colspan="3">{{ data.url }}</td></tr>
                    <tr><td class="label">支持格式</td><td class="content" colspan="3">{{ data.format }}</td></tr>
                    <tr><td class="label">请求示例</td><td class="content" colspan="3">{{ '-' }}</td></tr>
                </table>
                <table v-if="data.headerParams">
                    <tr><th colspan="4">请求头</th></tr>
                    <tr>
                        <th>参数</th>
                        <th>参数名</th>
                        <th>参数类型</th>
                        <th>描述</th>
                    </tr>
                    <tr v-for="(item, index) in data.headerParams" :key="index">
                        <td>{{ item.name }}</td>
                        <td>{{ item.nameCn }}</td>
                        <td>{{ item.dataType }}</td>
                        <td>{{ item.description }}</td>
                    </tr>
                </table>
                <table v-if="data.queryParams">
                    <tr><th colspan="4">请求参数</th></tr>
                    <tr>
                        <th>参数</th>
                        <th>参数名</th>
                        <th>参数类型</th>
                        <th>描述</th>
                    </tr>
                    <tr v-for="(item, index) in data.queryParams" :key="index">
                        <td>{{ item.name }}</td>
                        <td>{{ item.nameCn }}</td>
                        <td>{{ item.dataType }}</td>
                        <td>{{ item.description }}</td>
                    </tr>
                </table>
                <table v-if="data.responseParams">
                    <tr><th colspan="4">返回参数说明</th></tr>
                    <tr>
                        <th>参数</th>
                        <th>参数名</th>
                        <th>参数类型</th>
                        <th>描述</th>
                    </tr>
                    <tr v-for="(item, index) in data.responseParams" :key="index">
                        <td>{{ item.name }}</td>
                        <td>{{ item.nameCn }}</td>
                        <td>{{ item.dataType }}</td>
                        <td>{{ item.description }}</td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        Button,
    } from 'element-ui';
    import RowItem from '@/layout/row-item';
    export default {
        name: "index",
        components: {
            [RowItem.name]: RowItem,
            [Button.name]: Button,
        },
        data() {
            return {
                info: {},
                data: {}
            }
        },
        created() {
            console.log(this.$route.params)
            this.getData(this.$route.params.id)
        },
        methods: {
            getData(id) {
                const loading = this.$loading('加载中...');
                return Promise.all([
                    this.$api.meta.getApiInfo(id).then(res => {
                        console.log(res);
                        this.info = res;
                    }),
                    this.$api.meta.getApiData(id).then(res => {
                        console.log(res);
                        this.data = res;
                    })
                ]).finally(() => {
                    loading.close()
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "@/common/style/theme.scss";
    .api-info{
        .container{
            width: 1200px;
            margin: 0 auto;
        }
        .session{
            background-color: $bg-color;
            padding: $space-row-base $space-col-base;
            margin-bottom: 15px;
            &:last-child{
                margin-bottom: 0;
            }
            .body{
                display: flex;
                .left{
                    flex: 1;
                    .head{
                        line-height: 40px;
                        //&:before{
                        //    content: "";
                        //    display: inline-block;
                        //    height: 24px;
                        //    width: 5px;
                        //    vertical-align: middle;
                        //    background-color: $color-primary;
                        //}
                        .title{
                            font-size: 24px;
                            font-weight: 500;
                            color: $color-primary;
                        }
                    }
                    .sub{
                        display: flex;
                        line-height: 40px;
                        & > *{
                            margin-right: 30px;
                            &:last-child{
                                margin-right: 0;
                            }
                        }
                    }
                }
                .right{
                    .handler{
                        height: 40px;
                        text-align: right;
                    }
                    .num{
                        line-height: 40px;
                        span{
                            margin-right: 10px;
                            i{
                                margin-right: 5px;
                            }
                            &:last-child{
                                margin-right: 0;
                            }
                        }
                    }
                }
            }
            .digest{
                background-color: transparentize($color-primary, .9);
                line-height: 22px;
                padding: 15px;
                color: transparentize($color-primary, .3);
                font-size: $font-size-lg;
                .row-item{
                    display: inline-block;
                }
            }
            table{
                width: 100%;
                border: 1px solid $border-color;
                border-collapse: collapse;
                vertical-align: middle;
                line-height: 42px;
                font-size: $font-size-base;
                color: $text-color-content;
                margin-top: $space-row-base;
                &:first-child{
                    margin-top: 0;
                }
                th{
                    text-align: center;
                    padding: 0 15px;
                    border: 1px solid $border-color;
                    background-color: transparentize($bg-color-grey,.6);
                }
                td{
                    border: 1px solid $border-color;
                    padding: 0 15px;
                    &.label{
                        width: 120px;
                        &:after{
                            content: ":";
                        }
                    }
                    &.content{
                        padding: 0 15px;
                    }
                }
            }
        }
    }
</style>
