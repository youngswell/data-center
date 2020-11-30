<template>
    <div class="layout">
        <div class="header" :class="{'float': scrollTop > 10}">
            <slot name="header">
                <layout-header></layout-header>
            </slot>
        </div>
        <div class="main">
            <vue-scroll :ops="ops" @handle-scroll="scroll">
                <div class="router-container">
                    <slot name="page">
                        <transition name="fade" mode="in-out">
                            <keep-alive>
                                <router-view></router-view>
                            </keep-alive>
                        </transition>
                    </slot>
                </div>
            </vue-scroll>
        </div>
    </div>
</template>

<script>
    import layoutHeader from "./header"
    export default {
        name: "layout",
        components: {
            [layoutHeader.name]: layoutHeader,
        },
        props: {
            options: Object,
        },
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

<style lang="scss">
@import "@/common/style/theme.scss";
.layout{
    height: 100%;
    display: flex;
    flex-direction: column;
    & > .header{
        .float{
            position: relative;
            z-index: 10;
            box-shadow: 5px 0 10px transparentize($box-shadow-color,.2);
        }
    }
    & > .main{
        flex: 1;
        overflow: hidden;
        .router-container{
            padding: $space-row-base $space-col-base;
            .page{

            }
        }
    }
}
</style>
