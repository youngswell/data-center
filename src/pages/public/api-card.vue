<template>
    <div class="api-card">
        <div class="content">
            <div class="name" @click.stop="clickHandler">{{ data.name }}</div>
            <div class="date">
                <row-item label-width="auto" label="更新时间" show-colon>{{ data.refreshTime }}</row-item>
            </div>
            <div class="digest">
                <row-item label-width="auto" label="资源摘要" show-colon>{{ data.digest }}</row-item>
            </div>
        </div>
        <div class="doc-type">
            <i class="jly-data-icon">&#xe600;</i>
        </div>
    </div>
</template>

<script>
    import RowItem from '@/layout/row-item';
    export default {
        name: "api-card",
        components: {
            [RowItem.name]: RowItem,
        },
        props: {
            data: {
                type: Object,
                default() {
                    return {
                        id: 0,
                        name: '',
                        digest: '',
                        refreshTime: ''
                    }
                }
            }
        },
        methods: {
            clickHandler() {
                this.$emit('view',this.data.id)
            }
        }
    }
</script>

<style lang="scss" scoped>
@import "@/common/style/theme.scss";
.api-card{
    width: 450px;
    line-height: 32px;
    cursor: pointer;
    padding: $space-row-base $space-col-base;
    border-radius: $border-radius-base;
    background-color: $bg-color;
    transition: all .5s;
    box-shadow: 5px 5px 10px transparentize($box-shadow-color,.2);
    &:hover{
        box-shadow: 5px 5px 10px transparentize($box-shadow-color,.1);
    }
    display: flex;
    .content{
        flex: 1;
        .name{
            height: 44px;
            font-size: 18px;
            line-height: 22px;
            font-weight: bold;
            margin-bottom: 10px;
        }
    }
    .doc-type{
        display: flex;
        align-items: center;
        i{
            font-size: 80px;
        }
    }
}
</style>
