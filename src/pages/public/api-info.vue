<template>
    <el-dialog custom-class="api-info"
               width="960px"
               :visible.sync="visible"
               :title="info.name"
               center>
        <div class="container">
            <table>
                <tr>
                    <td class="label">名称</td><td class="content" colspan="3">{{ info.name }}</td>
                    <td class="label">简介</td><td class="content" colspan="3">{{ info.digest }}</td>
                </tr>
                <tr>
                    <td class="label">关键词</td><td class="content" colspan="3">{{ info.keyword }}</td>
                    <td class="label">来源</td><td class="content" colspan="3">{{ info.sourceSystem }}</td>
                </tr>
                <tr>
                    <td class="label">主题</td><td class="content" colspan="2">{{ info.domainName }}</td>
                    <td class="label">行业</td><td class="content" colspan="2">{{ info.themeName }}</td>
                    <td class="label">服务</td><td class="content" colspan="2">{{ info.serviceName }}</td>
                </tr>
                <tr>
                    <td class="label">开放方式</td><td class="content" colspan="2">{{ info.openModule }}</td>
                    <td class="label">更新频率</td><td class="content" colspan="2">{{ info.refreshRate }}</td>
                    <td class="label">发布日期</td><td class="content" colspan="2">{{ info.releaseTime }}</td>
                </tr>
                <tr>
                    <td class="label">更新日期</td><td class="content" colspan="2">{{ info.refreshTime }}</td>
                    <td class="label">资源格式</td><td class="content" colspan="2">{{ info.format }}</td>
                    <td class="label">发布者</td><td class="content" colspan="2">{{ info.providerName }}</td>
                </tr>
                <tr>
                    <td class="label">维护者</td><td class="content" colspan="2">{{ info.managementName }}</td>
                    <td class="label">语言</td><td class="content" colspan="2">{{ info.language }}</td>
                    <td class="label">存储大小</td><td class="content" colspan="2">{{ info.size }}</td>
                </tr>
                <tr>
                    <td class="label">数据量</td><td class="content" colspan="2">{{ info.count }}</td>
                    <td class="label">浏览量</td><td class="content" colspan="2">{{ info.pageView }}</td>
                    <td class="label">下载量</td><td class="content" colspan="2">{{ info.downloads }}</td>
                </tr>
            </table>
            <div class="footer">
                <el-button type="primary" @click="getData"><i class="jly-data-icon">&#xe628;</i>获取数据</el-button>
            </div>
        </div>
    </el-dialog>
</template>

<script>
    import {
        Dialog,
        Button,
    } from 'element-ui';
    export default {
        name: "api-info",
        components: {
            [Dialog.name]: Dialog,
            [Button.name]: Button,
        },
        props: {
            id: String,
        },
        data() {
            return {
                visible: false,
                info: {

                }
            }
        },
        methods: {
            open(data) {
                this.info = data;
                this.visible = true
            },
            getData() {
                this.$router.push({
                    name: 'resource-info',
                    params: {
                        id: this.info.id
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "@/common/style/theme.scss";
    .api-info{
        .container{
            //border-top: 1px solid $border-color;
            //padding-top: 15px;
            table{
                width: 100%;
                border: 1px solid $border-color;
                border-collapse: collapse;
                td{
                    border: 1px solid $border-color;
                    vertical-align: middle;
                    line-height: 42px;
                    font-size: $font-size-base;
                    color: $text-color-content;
                    &.label{
                        text-align: center;
                        background-color: transparentize($bg-color-grey,.6);
                    }
                    &.content{
                        padding: 0 15px;
                    }
                }
            }
            .footer{
                margin-top: 15px;
                text-align: center;
                i{
                    color: $text-color-inverse;
                    margin-right: 5px;
                }
            }
        }
    }
</style>
