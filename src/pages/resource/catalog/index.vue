<template>
    <el-container class="catalog">
        <el-aside width="360px" :style="{ height: height + 'px' }">
<!--            <div class="search-box">-->
<!--                <el-input type="text" v-model="keyword" placeholder="输入关键字以检索..." clearable></el-input>-->
<!--            </div>-->
            <vue-scroll :ops="ops" style="background-color: #ffffff;padding: 15px 0">
<!--                <el-tree ref="tree"-->
<!--                         :props="treeProps"-->
<!--                         :load="loadNode"-->
<!--                         :highlight-current="true"-->
<!--                         @node-click="nodeClick"-->
<!--                         lazy>-->
<!--                </el-tree>-->
                <div class="all" :class="{ 'active': !$route.params.id }" @click="$router.replace({params: { id: 0}})"><i class="el-icon-menu"></i>&nbsp;所有</div>
                <el-menu :default-active="String($route.params.id)"
                         :router="false"
                         active-text-color="#286fa7"
                         @select="selectCategory">
                    <el-submenu :index="String(childIndex)" v-for="(child, childIndex) in menus" :key="childIndex">
                        <template slot="title">
                            <i class="jly-data-icon" v-html="child.icon"></i>
                            <span>{{ child.name }}</span>
                        </template>
                        <template v-for="(grandson, grandsonIndex) in child.children">
                            <template v-if="grandson.children">
                                <el-submenu :index="String(child.id)+'_'+String(grandson.id)" :key="grandsonIndex">
                                    <template slot="title">{{ grandson.label }}</template>
                                    <el-menu-item :index="String(child.id)+'_'+String(grandson.id)+'_'+String(greatGrandson.id)"
                                                  v-for="(greatGrandson, greatGrandsonIndex) in grandson.children"
                                                  :key="greatGrandsonIndex">
                                        <i class="jly-data-icon" v-html="greatGrandson.icon"></i>
                                        <span>{{ greatGrandson.name }}</span>
                                    </el-menu-item>
                                </el-submenu>
                            </template>
                            <template v-else>
                                <el-menu-item :index="String(grandson.id)" :key="grandsonIndex"><i class="jly-data-icon" v-html="grandson.icon"></i>{{ grandson.name }}</el-menu-item>
                            </template>
                        </template>
                    </el-submenu>
                </el-menu>
            </vue-scroll>
        </el-aside>
        <el-main :style="{ height: height + 'px' }">
            <vue-scroll :ops="ops">
                <div class="API-list">
                    <div class="api" v-for="(api, index) in list" :key="index">
                        <api-card @view="view" :data="api"></api-card>
                    </div>
                </div>
                <list-is-null v-if="list.length === 0"></list-is-null>
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
import ListIsNull from '@/components/list-is-null'
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
        [ListIsNull.name]: ListIsNull,
    },
    data() {
        return {
            menus: [
                { name: '贵阳经济技术开发区', children: [] }
            ],
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
        $route: {
            handler($route) {
                this.getApiList($route.params.id)
            },
            immediate: true,
            deep: true,
        }
    },
    mounted() {
        this.$api.unit.getUnit().then(({ list }) => {
            list.forEach(item => {
                item.isLeaf = typeof item.isLeaf === 'undefined' ? true : item.isLeaf
            })
            this.menus[0].children = list
        })
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
        selectCategory(id) {
            this.$router.replace({
                params: { id}
            })
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
            .all{
                line-height: 50px;
                padding-left: 20px;
                font-size: $font-size-base;
                cursor: pointer;
                &:hover{
                    background-color: #eaf1f6;
                }
                &.active{
                    color: $color-primary;
                }
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
