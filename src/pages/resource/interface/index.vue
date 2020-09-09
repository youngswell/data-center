<template>
    <el-container class="catalog">
        <el-aside width="220px" :style="{ height: height + 'px' }">
<!--            <div class="search-box">-->
<!--                <el-input type="text" v-model="keyword" placeholder="输入关键字以检索..." clearable></el-input>-->
<!--            </div>-->
            <vue-scroll :ops="ops" style="background-color: #ffffff">
                <el-menu default-active=""
                         :router="false"
                         active-text-color="#286fa7"
                         @select="selectCategory"
                         @open="menuOpen">
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
                                <el-menu-item :index="String(child.id)+'_'+String(grandson.id)" :key="grandsonIndex">{{ grandson.name }}</el-menu-item>
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
        [ApiInfo.name]: ApiInfo,
        [ApiCard.name]: ApiCard,
    },
    data() {
        return {
            menus: [],
            list: [],
            keyword: "",
            ops: {
                bar: {
                    color: '#ccc'
                }
            }
        }
    },
    computed: {
        height() {
            return (this.$store.getters.system).clientHeight - 90
        },
    },
    watch: {
        defaultActiveId: {
            handler(id) {
                // console.log(id)
                this.list = this.getApiList(id)
            },
            immediate: true
        }
    },
    mounted() {
        this.getApiList();
        this.getCategory()
    },
    methods: {
        getApiList(id,cid) {
            const params = id ? { categoryPid: id, categoryId: cid } : {};
            const loading = this.$loading('加载中...');
            this.$api.meta.getApiListByCategoryId(params).then(({ list }) => {
                this.list = list
            }).finally(() => {
                loading.close()
            })
        },
        getCategory() {
            this.$api.meta.category().then(({ list }) => {
                this.menus = list
            })
        },
        selectCategory(id) {
            this.getApiList(...id.split('_'))
        },
        menuOpen(index) {
            if (!this.menus[index].children) {
                this.$api.meta.getCategoryByPId(this.menus[index].id).then(({ list }) => {
                    this.$set(this.menus[index], 'children', list)
                })
            }
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
                .jly-data-icon{
                    font-size: $font-size-base;
                    margin-right: 5px;
                }
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
