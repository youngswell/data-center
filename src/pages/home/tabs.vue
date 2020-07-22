<template>
    <div class="tabs">
        <nav>
            <div class="tab-item" :class="{ 'active': current === 0 }" @mouseover="selectItem(0)">
                <i class="jly-data-icon">&#xe66f;</i>
                <span class="text">主题</span>
            </div>
            <div class="tab-item" :class="{ 'active': current === 1 }" @mouseover="selectItem(1)">
                <i class="jly-data-icon">&#xe60b;</i>
                <span class="text">行业</span>
            </div>
            <div class="tab-item" :class="{ 'active': current === 2 }" @mouseover="selectItem(2)">
                <i class="jly-data-icon">&#xe60c;</i>
                <span class="text">领域</span>
            </div>
        </nav>
        <div class="content-container">
            <slot name="content-container">
                <div v-for="(item, index) in list"
                     v-show="current === index"
                     :key="index">{{ item.label }}</div>
            </slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "tabs",
        props: {
            list: {
                type: Array,
                default() {
                    return [];
                }
            },
            current: {
                type: [Number,String],
                default() {
                    return 0;
                }
            }
        },
        watch: {

        },
        methods: {
            selectItem(index) {
                this.$emit("change",index)
                this.$emit("update:current",index)
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "@/common/style/theme.scss";
    .tabs{
        nav{
            height: 48px;
            line-height: 48px;
            display: flex;
            .tab-item{
                flex: 1;
                font-size: 16px;
                text-align: center;
                cursor: pointer;
                transition: all .3s;
                .text{
                    margin-left: 5px;
                    color: $color-primary;
                }
                i{
                    color: $color-primary;
                }
                &.active{
                    background-color: $color-primary;
                    .text{
                        color: $text-color-inverse;
                    }
                    i{
                        color: $text-color-inverse;
                    }
                }
            }
        }
        .content-container{

        }
    }
</style>