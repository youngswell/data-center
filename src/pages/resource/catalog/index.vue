<template>
    <el-container class="catalog">
        <el-aside width="320px" :style="{ height: height + 'px' }">
<!--            <div class="search-box">-->
<!--                <el-input type="text" v-model="keyword" placeholder="输入关键字以检索..." clearable></el-input>-->
<!--            </div>-->
            <vue-scroll :ops="ops" style="background-color: #ffffff;padding: 15px 0">
                <el-tree ref="tree"
                         :props="treeProps"
                         :load="loadNode"
                         :highlight-current="true"
                         @node-click="nodeClick"
                         lazy>
                </el-tree>
            </vue-scroll>
        </el-aside>
        <el-main :style="{ height: height + 'px' }">
            <vue-scroll :ops="ops">
                <div class="API-list">
                    <div class="api" v-for="(api, index) in list" :key="index">
                        <api-card @view="view" :data="api"></api-card>
                    </div>
                </div>
                <api-info ref="info"></api-info>
            </vue-scroll>
        </el-main>
    </el-container>
</template>

<script>
import {
    Aside, Main, Container,
    Menu, Submenu, MenuItem,
    Input,
    Tree,
} from 'element-ui';
import ApiCard from '@/pages/public/api-card'
import ApiInfo from '@/pages/public/api-info'
export default {
    name: "catalog",
    components: {
        [Container.name]: Container,
        [Aside.name]: Aside,
        [Main.name]: Main,
        [Input.name]: Input,
        [Menu.name]: Menu,
        [Submenu.name]: Submenu,
        [MenuItem.name]: MenuItem,
        [Tree.name]: Tree,
        [ApiCard.name]: ApiCard,
        [ApiInfo.name]: ApiInfo,
    },
    data() {
        return {
            list: [],
            keyword: "",
            current: '',
            ops: {
                bar: {
                    color: '#ccc'
                }
            },
            treeProps: {
                label: 'name',
                children: 'zones',
                isLeaf: 'isLeaf'
            }
        }
    },
    computed: {
        height() {
            return (this.$store.getters.system).clientHeight - 90
        },
    },
    watch: {

    },
    mounted() {
        this.getApiList()
    },
    methods: {
        getApiList(id) {
            const params = id ? { provider: id } : {}
            this.$api.meta.getApiListByCategoryId(params).then(({ list }) => {
                this.list = list
            })
        },
        loadNode(node, resolve) {
            // console.log(node)
            if (node.level === 0) {
                return resolve([{ name: '贵州铝厂有限责任公司' }]);
            }
            this.$api.unit.getUnit().then(({ list }) => {
                list.forEach(item => {
                    item.isLeaf = typeof item.isLeaf === 'undefined' ? true : item.isLeaf
                })
                resolve(list);
            })
        },
        nodeClick(e) {
            console.log(e)
            this.getApiList(e.id)
        },
        view(id) {
            const loading = this.$loading('加载中...');
            Promise.all([
                this.$api.meta.getApiInfoById(id).then(res => {
                    this.$refs.info.open(res)
                })
            ]).then(() => {
                loading.close()
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    @import "@/common/style/theme.scss";
    .catalog{
        aside{
            display: flex;
            flex-direction: column;
            .search-box{
                padding-bottom: 15px;
            }
            .el-menu{
                flex: 1;
            }
            vue-scroll{
                flex: 1;
            }
        }
        main{
            padding: 0 0 0 15px;
            margin-right: -15px;
            .API-list{
                display: flex;
                flex-wrap: wrap;
                .api{
                    margin: 0 15px 15px 0;
                }
            }
        }
    }
</style>
