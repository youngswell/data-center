<template>
    <layout>
        <layout-header slot="header"></layout-header>
        <router-view slot="page"></router-view>
    </layout>
</template>

<script>
    import layout from "@/layout";
    import Header from "@/components/layout-header"
    export default {
        name: "datas",
        components: {
            "layout": layout,
            "layout-header": Header,
        },
        data() {
            return {

            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "@/common/style/theme.scss";
</style>