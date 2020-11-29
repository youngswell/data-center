<template>
  <layout class="page">
    <div class="header" slot="header">
      <div class="left">
        <row-item label="项目ID" show-colon>
          <el-select v-model="filter.projectid" placeholder="请选择项目" style="width: 100%" filterable clearable>
            <el-option v-for="(item, index) in projects"
                       :key="index"
                       :label="item.name + '（' + item.type + '）'"
                       :value="item.id">
            </el-option>
          </el-select>
        </row-item>
        <row-item label="身份证号" show-colon><el-input class="filter-item" v-model="filter.code" placeholder="请输入身份证号" clearable></el-input></row-item>
        <row-item label="姓名" show-colon><el-input class="filter-item" v-model="filter.name" placeholder="请输入姓名" clearable></el-input></row-item>
        <row-item label="件袋号" show-colon><el-input class="filter-item" v-model="filter.jdh" placeholder="请输入件袋号" clearable></el-input></row-item>
        <row-item label="住宅地址" show-colon><el-input class="filter-item" v-model="filter.address" placeholder="请输入住宅地址" clearable></el-input></row-item>
      </div>
      <div class="right">
        <el-button type="default" @click="reset">重置</el-button>
        <el-button type="primary" @click="toFilter">检索</el-button>
      </div>
    </div>
    <div class="main" slot="page">
      <el-table :data="list" style="width: 100%;">
        <el-table-column label="序号" type="index" min-width="40"></el-table-column>
        <el-table-column prop="jdh" label="件袋号" min-width="60"></el-table-column>
        <el-table-column prop="username" label="被征收人姓名" min-width="60"></el-table-column>
        <el-table-column prop="idCard" label="身份证" min-width="80"></el-table-column>
        <el-table-column prop="phone" label="联系方式" min-width="40"></el-table-column>
        <el-table-column prop="contractNO" label="合同编号" min-width="40"></el-table-column>
        <el-table-column prop="contractDate" label="签约日期" min-width="60"></el-table-column>
        <el-table-column prop="movingDate" label="搬迁日期" min-width="60"></el-table-column>
        <el-table-column prop="address" label="地址" min-width="80"></el-table-column>
        <el-table-column prop="structure" label="建筑类型" min-width="40"></el-table-column>
        <el-table-column prop="usage" label="用途" min-width="40"></el-table-column>

        <el-table-column prop="area" label="建筑面积（平方米）" min-width="60"></el-table-column>
        <el-table-column prop="legalArea" label="合法面积" min-width="60"></el-table-column>
        <el-table-column prop="provedArea" label="有证面积" min-width="60"></el-table-column>
        <el-table-column prop="authArea" label="确权面积" min-width="60"></el-table-column>
        <el-table-column prop="beChanged" label="住改非" min-width="40"></el-table-column>
        <el-table-column prop="unPovedArea" label="无证面积" min-width="60"></el-table-column>
      </el-table>
      <div class="footer">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :hide-on-single-page="true"
            :background="true"
            :current-page="pageInfo.current_page"
            :page-sizes="[10, 20, 30]"
            :page-size="pageInfo.per_page"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pageInfo.total">
        </el-pagination>
      </div>
<!--      <el-dialog title="选择项目"-->
<!--                 width="920px"-->
<!--                 :visible.sync="projects.visible">-->
<!--        <el-table :data="projects.list" @row-click="selectProject" style="width: 100%;">-->
<!--          <el-table-column prop="id" label="ID" min-width="80"></el-table-column>-->
<!--          <el-table-column prop="name" label="名称" min-width="300"></el-table-column>-->
<!--          <el-table-column prop="type" label="类型" min-width="80"></el-table-column>-->
<!--        </el-table>-->
<!--      </el-dialog>-->
    </div>
  </layout>
</template>

<script>
import Layout from '@/layout/index';
import RowItem from '@/layout/row-item';
import {
  Row, Col,
  Input, Button,
  Select, Option,
  Table, TableColumn,
  Pagination,
  Dialog,
} from 'element-ui';
import $loading from "@/utils/loading";
export default {
  name: "levy",
  components: {
    Layout,
    [Row.name]: Row,
    [Col.name]: Col,
    [Input.name]: Input,
    [Select.name]: Select,
    [Option.name]: Option,
    [Button.name]: Button,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Pagination.name]: Pagination,
    [Dialog.name]: Dialog,
    [Layout.name]: Layout,
    [RowItem.name]: RowItem,
  },
  data() {
    return {
      list: [],
      filter: {
        projectid: '',
        code: '',
        name: '',
        jdh: '',
        address: '',
      },
      pageInfo: {
        current_page: 1,
        length: 1,
        last_page: 1,
        per_page: 10,
        total: 0,
      },
      projects: [],
      // projects: {
      //   visible: false,
      //   list: [],
      //   checked: null,
      // }
    }
  },
  watch: {

  },
  created() {
    this.login().finally(() => {
      this.getProjects();
    })
  },
  methods: {
    getList() {
      let num = 0;
      for (let i in this.filter) {
        if (this.filter[i]) num++;
      }
      if (num > 0) {
        let loading = $loading('检索中...')
        this.$api.levy.getList(this.filter).then(res => {
          // console.log(res)
          loading.close();
          if (res.data) {
            this.list = res.data
            delete res.data
            res.per_page = Number(res.per_page)
            this.pageInfo = res
          }
          console.log(this.list)
        }).catch(() => {
          loading.close();
        })
      } else {
        this.$message.error('至少选择一项条件！')
      }
    },
    getProjects() {
      return this.$api.levy.getProjects().then(({ data }) => {
          this.projects = data;
      })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageInfo.per_page = val;
      this.pageInfo.current_page = 1;
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageInfo.current_page = val
      this.getList()
    },
    toFilter() {
      this.pageInfo.current_page = 1;
      this.getList()
    },
    reset() {
      for (let i in this.filter) {
        this.filter[i] = ""
      }
    },
    openProjectList() {
      console.log('selectProject')
      if (this.projects.list.length > 0) {
        this.projects.visible = true;
      } else {
        let loading = $loading('加载项目中...')
        this.$api.levy.getProjects().then(({ data, }) => {
          console.log(data);
          this.projects.list = data;
          loading.close();
          this.projects.visible = true;
        }).catch(() => {
          loading.close()
        })
      }
    },
    selectProject(item) {
      console.log(item)
      this.projects.visible = false;
      this.filter.projectid = item.id;
      this.filter.projectName = item.name;
    },
    login() {
      const loading = this.$loading('登录中...');
      return this.$api.base.login({
        appKey: 'gyjlykj',
        appSecret: 'f16610f5b44a27a56cc5bc8e8e2f16',
      }).then(({ token }) => {
        loading.close()
        if (token) {
          this.$store.commit("user", { id: 0, real_name: 'Admin'});
          this.$store.commit("token", token);
          this.$message.success('登录成功！')
        }
      }).catch(() => {
        loading.close()
      })
    },
  }
}
</script>

<style lang="scss" scoped>
@import "@/common/style/theme.scss";
.page{
  .header{
    padding: 0 $space-col-base;
    line-height: 60px;
    background-color: $bg-color;
    display: flex;
    .left{
      flex: 1;
      display: flex;
      .row-item{
        flex: 1;
        .filter-item{

        }
      }
    }
    .right{
      margin-left: $space-col-base;
    }
  }
}
</style>
