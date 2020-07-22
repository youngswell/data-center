<template>
    <div class="logo">
        <img src="../../assets/logo.png" height="32" alt="">
        <img v-if="showText" class="text" src="../../assets/data-center.png" height="32" alt="">
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
        margin-left: 10px;
    }
}
</style>