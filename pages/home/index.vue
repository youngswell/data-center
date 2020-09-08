<template>
    <div class="">home</div>
</template>

<script>

    export default {
        name: "home",
        components: {

        },
        data() {
            return {
                current: 0,
                list: [
                    { id: 0, label: "主题", icon: "&#xe66f;" },
                    { id: 1, label: "行业", icon: "&#xe60b;" },
                    { id: 2, label: "领域", icon: "&#xe60c;" },
                ]
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "@/common/style/theme.scss";
    .page{
        .sub-bar{
            height: 200px;
        }
        .tabs{
            background-color: $bg-color;
            padding: 15px 0;
            nav{
                height: 60px;
                line-height: 60px;
                display: flex;
                background-color: $border-color;
                border-radius: $border-radius-base $border-radius-base 0 0;
                .tab-item{
                    flex: 1;
                    font-size: 18px;
                    text-align: center;
                    cursor: pointer;
                    transition: all .3s;
                    border-radius: $border-radius-base $border-radius-base 0 0;
                    .text{
                        margin-left: 5px;
                        color: $color-primary;
                    }
                    i{
                        font-size: 18px;
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
                height: 320px;
                padding: 15px;
                border: 1px solid $border-color;
                border-top: none;
                .content{
                    transition: all .3s;
                    .item{
                        margin-top: 15px;
                        text-align: center;
                        border: 1px solid transparent;
                        transition: all .3s;
                        cursor: pointer;
                        i{
                            font-size: 60px;
                            transition: all .3s;
                            color: $text-color-grey;
                        }
                        .title{
                            line-height: 32px;
                            color: $text-color-grey;
                            font-size: 14px;
                            transition: all .3s;
                        }
                        &:hover{
                            /*<!--border-color: $color-primary;-->*/
                            i{
                                color: $color-primary;
                            }
                            .title{
                                color: $color-primary;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
