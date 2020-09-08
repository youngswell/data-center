<template>
    <div class="app">
        <div @click="open(data)"><slot></slot></div>
        <el-dialog :visible.sync="visible"
                   :title="title"
                   :before-close="beforeClose"
                   @open="open"
                   @closed="closed"
                   :destroy-on-close="true"
                   width="640px"
                   lock-scroll
                   center>
            <slot name="title" slot="title"></slot>
            <el-form ref="formData" :model="formData" :rules="rules" label-width="80px" style="padding-right: 30px">
                <el-form-item label="应用名称" prop="name">
                    <el-input v-model="formData.name" placeholder="请输入应用名称" style="width: 100%"></el-input>
                </el-form-item>
                <el-form-item label="appID" prop="appId">
                    <el-input v-model="formData.appId" placeholder="请输入应用ID" style="width: 100%"></el-input>
                </el-form-item>
                <el-form-item label="所属项目" prop="projectId">
                    <el-select v-model="formData.projectId" style="width: 100%" clearable>
                        <el-option v-for="project in projects" :label="project.showValue" :value="project.id" :key="project.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="所属平台" prop="platformId">
                    <el-select v-model="formData.platformId" style="width: 100%" clearable>
                        <el-option v-for="platform in platforms" :label="platform.showValue" :value="platform.id" :key="platform.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="应用描述" prop="description">
                    <el-input v-model="formData.description"
                              type="textarea"
                              placeholder="请输入应用描述"
                              :autosize="{ minRows: 5, maxRows: 8 }"
                              style="width: 100%"
                              maxlength="500"
                              show-word-limit></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button type="primary" @click="commit">保存</el-button>
                <el-button type="default" @click="beforeClose">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {
        Dialog,
        Form, FormItem,
        Button, Input,
        Select, Option,
        Row, Col,
        Dropdown, DropdownMenu, DropdownItem,
    } from "element-ui";
    import RowItem from '@/layout/row-item';
    export default {
        name: "app",
        components: {
            [Dialog.name]: Dialog,
            [Row.name]: Row,
            [Col.name]: Col,
            [Form.name]: Form,
            [FormItem.name]: FormItem,
            [Button.name]: Button,
            [Input.name]: Input,
            [Select.name]: Select,
            [Option.name]: Option,
            [Dropdown.name]: Dropdown,
            [DropdownMenu.name]: DropdownMenu,
            [DropdownItem.name]: DropdownItem,
            [RowItem.name]: RowItem,
        },
        props: {
            data: {
                type: Object,
                default() {
                    return {
                        id: '',
                        name: '',
                        appId: '',
                        platformId: '',
                        projectId: '',
                        description: '',
                    }
                }
            }
        },
        data() {
            return {
                visible: false,
                formData: {
                    id: '',
                    name: '',
                    appId: '',
                    platformId: '',
                    projectId: '',
                    description: '',
                },
                tempFormData: '',
                rules: {
                    name: [
                        { required: true, message: '请输入应用名称', trigger: 'blur' },
                        { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                    ],
                    appId: [
                        { required: true, message: '请输入应用ID', trigger: 'blur' },
                        { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
                    ],
                    platformId: [
                        { required: true, message: '请选择所属平台', trigger: 'change' }
                    ],
                    projectId: [
                        { required: true, message: '请选择所属项目', trigger: 'change' }
                    ],
                    description: [
                        { required: false, message: '请输入应用描述', trigger: 'blur' },
                        { min: 0, max: 500, message: '长度在 0 到 500 个字符', trigger: 'blur' }
                    ],
                },
                projects: [],
                platforms: [],
            }
        },
        computed: {
            title() {
                return this.formData.id ? '编辑应用' : '新增应用'
            },
        },
        watch: {

        },
        methods: {
            getOption() {
                return Promise.all([
                    this.$api.base.enums('platformEnum,projectEnum').then(({ platformEnum, projectEnum }) => {
                        this.platforms = platformEnum;
                        this.projects = projectEnum;
                    }),
                ])
            },
            open(data) {
                // console.log(data)
                if (data) {
                    this.tempFormData = JSON.stringify(data);
                    this.formData = JSON.parse(this.tempFormData);
                } else {
                    this.tempFormData = JSON.stringify(this.formData);
                }
                if (this.projects.length === 0 || this.platforms.length === 0) {
                    this.getOption();
                }
                this.visible = true;
            },
            beforeClose() {
                if (this.tempFormData !== JSON.stringify(this.formData)) {
                    this.$confirm('是否放弃保存？', '你改动了内容！', {
                        confirmButtonText: '放弃',
                        cancelButtonText: '不',
                        type: 'warning'
                    }).then(() => {
                        this.visible = false
                    })
                } else {
                    this.visible = false
                }
            },
            closed() {
                this.$refs.formData.resetFields();
                this.tempFormData = '';
                this.formData = {
                    id: 0,
                    name: '',
                    platformId: '',
                    projectId: '',
                    description: '',
                };
            },
            commit() {
                // console.log(this.formData)
                this.$refs.formData.validate(pass => {
                    if (pass) {
                        if (this.formData.id) {
                            this.$api[this.$route.matched[this.$route.matched.length - 1].meta.module].update(this.formData.id, this.formData).then(res => {
                                console.log(res)
                                this.$message.success('修改成功！');
                                this.$emit('listchange');
                                this.visible = false
                            })
                        } else {
                            this.$api[this.$route.matched[this.$route.matched.length - 1].meta.module].add(this.formData).then(res => {
                                console.log(res)
                                this.$message.success('新增成功！');
                                this.$emit('listchange');
                                this.visible = false
                            })
                        }
                    }
                })
            },
        },
    }
</script>

<style lang="scss" scoped>
.app{
    display: inline-block;
}
</style>
