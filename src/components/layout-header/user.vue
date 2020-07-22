<template>
    <div class="user">
        <template v-if="$store.getters.user">
            <el-dropdown class="dropdown" trigger="click" @command="handleCommand">
                <div class="user">
                    <el-avatar class="avatar" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                    <span class="name">{{ $store.getters.user.real_name }}</span>
                </div>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="viewUserInfo" disabled>用户信息</el-dropdown-item>
                    <el-dropdown-item command="logout" divided>登出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </template>
        <template v-else>
            <el-button type="primary" @click="login">登录</el-button>
            <el-button type="default">注册</el-button>
        </template>
    </div>
</template>

<script>
    import {
        Button,
        Avatar,
        Dropdown,
        DropdownMenu,
        DropdownItem,
    } from "element-ui"
    import loading from "@/utils/loading";
    export default {
        name: "user",
        components: {
            "el-avatar": Avatar,
            "el-button": Button,
            "el-dropdown": Dropdown,
            "el-dropdown-item": DropdownItem,
            "el-dropdown-menu": DropdownMenu,
        },
        methods: {
            logout() {
                this.$confirm("确认退出登录？","",{}).then(() => {
                    this.$store.dispatch("logout");
                })
            },
            login() {
                loading({ text: "登录中..." },2000).then(() => {
                    this.$message.success("登录成功！")
                    this.$store.commit("user", {id:0,real_name: "Tony"})
                })
            },
            handleCommand(command) {
                switch (command) {
                    case "logout": this.logout(); break;
                    case "viewUserInfo": this.$message.info("查看用户信息"); break;
                    default:  break;
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "@/common/style/theme.scss";
    .user{
        height: inherit;
        display: flex;
        align-items: center;
        user-select: none;
        cursor: pointer;
        .dropdown{
            height: inherit;
            display: flex;
            align-items: center;
        }
        .avatar{

        }
        .name{
            margin-left: 8px;
        }
    }
</style>