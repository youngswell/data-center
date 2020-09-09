<template>
    <footer class="footer">
        <div class="null"></div>
        <div class="page-container">
            <p>联系电话：0851-85824918  手机：0851-85824918转8018  邮箱：gyjlykj888@163.com</p>
            <p>Copyright 2020   贵阳金利沅科技有限公司  版权所有.  地址：贵阳市花果园中央商务区2号楼1单元44层</p>
            <p>免责声明：本网站部分资料来自互联网，如果涉及到版权问题，请及时通知本站，我们尽快删除或更改。<span>黔ICP备12002272号-1</span></p>
        </div>
    </footer>
</template>

<script>
    export default {
        name: "home-footer"
    }
</script>

<style lang="scss" scoped>
    @import "@/common/style/theme.scss";
    .footer{
        background-color: $color-primary;
        color: $text-color-inverse;
        text-align: center;
        line-height: 32px;
        font-size: 14px;
        padding: 30px 0;
        display: flex;
        flex-direction: column;
        .null{
            flex: 1;
        }
        .page-container{

        }
    }
</style>
