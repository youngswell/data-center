<template>
    <div class="row-item">
        <label :class="{'show-colon': showColon}" :style="{'width': (/px/.test(labelWidth) ? labelWidth : /auto/.test(labelWidth) ? labelWidth : (labelWidth + 'px')), 'text-align': algin}">{{ label }}</label>
        <div class="row-content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "row-item",
        props: {
            label: {
                type: [String, Number],
                default: ''
            },
            algin: {
                type: String,
                default: 'right'
            },
            "label-width": {
                type: [String, Number],
                default: '100px'
            },
            "show-colon": Boolean
        }
    }
</script>

<style lang="scss" scoped>
    @import "@/common/style/theme.scss";
    .row-item{
        display: flex;
        line-height: inherit;
        label{
            display: block;
            color: $text-color-grey;
            &.show-colon:after{
                content: ":";
            }
        }
        .row-content{
            flex: 1;
            padding-left: 15px;
        }
    }
</style>
