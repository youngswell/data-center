<template>
    <div class="page login">
        <div class="login-form-container">
            <el-form :rules="rules" :model="formData" ref="loginForm">
                <el-form-item align="center">
                    <img src="../assets/image/logo.png" height="42" style="margin-right: 15px">
                    <img src="../assets/image/data-center.png" height="42">
                </el-form-item>
                <el-form-item prop="name">
                    <el-input placeholder="请输入账户名" v-model="formData.name">
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input placeholder="请输入密码" v-model="formData.password" show-password>
                    </el-input>
                </el-form-item>
                <el-form-item prop="captcha">
                    <el-input placeholder="请输入验证码" v-model="formData.captcha">
                        <template slot="append">
                            <img :src="captchaImage + random" height="35" style="margin-right: -20px;margin-left: -20px;cursor: pointer" @click="refreshCaptcha">
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item align="center" style="margin: 0 30px">
                    <el-button type="primary" style="width: 100%;border-radius: 20px;" @click="login" @keyup.enter="login">登录</el-button>
                </el-form-item>
                <div class="footer">技术支持：贵阳金利沅科技有限公司</div>
            </el-form>
        </div>
    </div>
</template>

<script>
    import {Button, Form, FormItem, Input} from "element-ui"
    export default {
        name: "login",
        components: {
            "el-button": Button,
            "el-input": Input,
            "el-form": Form,
            "el-form-item": FormItem,
        },
        data() {
            return {
                formData: {
                    name: "",
                    password: "",
                    captcha: "",
                },
                random: "",
                captchaImage: Object.is(process.env.NODE_ENV, 'production') ? "/api/home/Activity/verifyImg" : "http://gj.jlykj.cn/api/home/Activity/verifyImg",
                rules: {
                    name: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                    ],
                    captcha: [
                        { required: true, message: '请输入验证码', trigger: 'blur' },
                    ]
                }
            }
        },
        mounted() {
            // this.$api.screen.getCaptcha().then(res => {
            //     // console.log(res)
            //     this.captchaImage = res
            // })
        },
        methods: {
            refreshCaptcha() {
                this.formData.captcha = "";
                this.random = "?radon=" + Math.random()
            },
            login() {
                this.$refs.loginForm.validate(pass => {
                    if (pass) {
                        this.$api.screen.login({
                            "user_login": this.formData.name,
                            "password": this.formData.password,
                            "code": this.formData.captcha,
                        }).then(({ token, touch_screen_info }) => {
                            if (token) {
                                this.$store.commit("token", token)
                            }
                            if (touch_screen_info) {
                                this.$store.commit("screen", touch_screen_info)
                            }
                            this.$router.push("/viewer")
                        })
                    }
                })
            }
        }
    }
</script>

<style lang="scss">
    @import "@/common/style/theme.scss";
    html,body,#app{
        height: 100%;
    }
    .login{
        height: 100%;
        background-image: radial-gradient(closest-side at 70% 50%, red 5%, orange, black 20%);
        display: flex;
        align-items: center;
        justify-content: center;
        .login-form-container{
            width: 320px;
            padding: 30px;
            overflow: hidden;
            border-radius: $border-radius-lg;
            background-color: transparentize($bg-color, .2);
            .footer{
                margin-top: 40px;
                line-height: $font-size-sm;
                font-size: $font-size-sm;
                color: $text-color-grey;
                text-align: center;
            }
        }
    }
</style>