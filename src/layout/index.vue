<template>
    <div class="layout">
        <div class="header" :class="{'float': scrollTop > 10}">
            <slot name="header"></slot>
        </div>
        <div class="main">
            <vue-scroll :ops="ops" @handle-scroll="scroll">
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

                },
                scrollTop: 0
            }
        },
        methods: {
            scroll(e) {
                this.scrollTop = e.scrollTop
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
        .float{
            position: relative;
            z-index: 10;
            box-shadow: 5px 0 10px transparentize($box-shadow-color,.2);
        }
    }
    .main{
        flex: 1;
        overflow: hidden;
    }
}
</style>