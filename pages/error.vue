<template>
    <div class="page">
        <h1><strong>404</strong></h1>
        <p class="text">找不到文件...</p>
    </div>
</template>

<script>
    export default {
        name: "error"
    }
</script>

<style lang="scss" scoped>
    @import "@/common/style/theme.scss";
    .page{
        padding: 100px;
        h1{
            font-size: 42px;
            color: $color-error;
        }
        .text{
            line-height: 50px;
            font-size: $font-size-sm;
            color: $text-color-grey;
        }
    }
</style>