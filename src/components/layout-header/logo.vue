<template>
    <div class="logo">
        <img src="../../assets/image/logo.png" height="32" alt="">
        <span class="text">贵阳经济技术开发区农房确权数据资源</span>
<!--        <img v-if="showText" class="text" src="../../assets/image/data-center.png" height="32" alt="">-->
    </div>
</template>

<script>
    export default {
        name: "logo",
        props: {
            "show-text": {
                type: Boolean,
                default: false
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "@/common/style/theme.scss";
.logo{
    width: auto;
    height: 100%;
    display: flex;
    align-items: center;
    .text{
        line-height: inherit;
        margin-left: 10px;
        color: #0986CE;
        font-size: 48px;
    }
}
</style>
