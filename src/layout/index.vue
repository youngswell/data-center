<template>
    <div class="layout">
        <div class="header">
            <slot name="header"></slot>
        </div>
        <div class="main">
            <vue-scroll :ops="ops">
                <slot name="page"></slot>
            </vue-scroll>
        </div>
    </div>
</template>

<script>
    export default {
        name: "layout",
        components: {},
        data() {
            return {
                ops: {

                }
            }
        }
    }
</script>

<style lang="scss" scoped>
@import "@/common/style/theme.scss";
.layout{
    height: 100%;
    display: flex;
    flex-direction: column;
    .header{

    }
    .main{
        flex: 1;
        overflow: hidden;
    }
}
</style>