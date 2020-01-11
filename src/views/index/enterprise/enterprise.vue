<template>
  <div class="enterprise">
    <!-- 卡片盒子 -->
    <el-card class="form_card">
      <!-- 企业表单 -->
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="企业编号" class="number">
          <el-input v-model="formInline.user" placeholder="企业编号"></el-input>
        </el-form-item>
        <el-form-item label="企业名称" class="name">
          <el-input v-model="formInline.user" placeholder="企业名称"></el-input>
        </el-form-item>
        <el-form-item label="创建者" class="user">
          <el-input v-model="formInline.user" placeholder="创建者"></el-input>
        </el-form-item>
        <el-form-item label="状态" class="status">
          <el-select v-model="formInline.region" placeholder="请选择状态">
            <el-option label="启用" value="shanghai"></el-option>
            <el-option label="禁用" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">搜索</el-button>
          <el-button @click="onSubmit">清除</el-button>
          <el-button
            type="primary"
            @click="$refs.addEnterprise.dialogFormVisible = true"
            class="el-icon-plus"
          >新增企业</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 表格的卡片盒子 -->
    <el-card class="table_card">
      <!-- 企业表格 -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="eid" label="企业编号"></el-table-column>
        <el-table-column prop="name" label="企业名称"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column prop="create_time" label="创建日期"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status==1">启用</span>
            <span v-else>禁用</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <span @click="edit(scope.$index,scope.row)">编辑</span>
            <span
              class="space"
              style="color:red"
              @click="disabled(scope.$index,scope.row)"
              v-if="scope.row.status==1"
            >禁用</span>
            <span class="space" @click="disabled(scope.$index,scope.row)" v-else>启用</span>
            <span @click="deleted(scope.$index,scope.row)">删除</span>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      ></el-pagination>
    </el-card>

    <!-- 新增企业组件 -->
    <addEnterprise ref="addEnterprise"></addEnterprise>
  </div>
</template>

<script>
// 导入新增企业组件
import addEnterprise from "./components/addEnterprise";
// 导入接口
import { enterpriseList, enterpriseStatus } from "@/api/enterprise";
export default {
  // 注册组件
  components: {
    addEnterprise
  },
  created() {
    this.getList();
  },
  data() {
    return {
      // 分页
      page: 1,
      limit: 6,
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      // 企业表单数据
      formInline: {
        user: "",
        region: ""
      },
      // 表格数据
      tableData: []
    };
  },
  methods: {
    // 获取企业列表
    getList() {
      enterpriseList({
        page: this.page, // 页码
        limit: this.limit // 页尺寸
      }).then(res => {
        // window.console.log(res);
        this.tableData = res.data.items;
      });
    },
    //状态切换
    disabled(index, row) {
      window.console.log(index, row);
      if (row.status == 1) {
        enterpriseStatus({
          id: row.id
        }).then(res => {
          window.console.log(res);
          if (res.code == 200) {
            this.getList();
            this.$message.error("状态切换成功,当前状态为禁用");
          } else {
            this.$message.warning("状态切换失败");
          }
        });
      } else {
        enterpriseStatus({
          id: row.id
        }).then(res => {
          window.console.log(res);
          if (res.code == 200) {
            this.getList();
            this.$message.success("状态切换成功,当前状态为启用");
          } else {
            this.$message.warning("状态切换失败");
          }
        });
      }
    },
    // 编辑
    edit(index, row) {
      window.console.log(index, row);
    },
    // 删除
    deleted(index, row) {
      window.console.log(index, row);
    },

    onSubmit() {
      window.console.log("submit!");
    },
    handleSizeChange(val) {
      window.console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      window.console.log(`当前页: ${val}`);
    }
  }
};
</script>

<style lang="less">
.enterprise {
  .form_card {
    .number,
    .user {
      input {
        width: 100px;
        height: 40px;
      }
    }
    .name,
    .status {
      input {
        width: 150px;
        height: 40px;
      }
    }
  }
  // 表格样式
  .table_card {
    .cell span {
      cursor: pointer;
      color: #409eff;
    }
    .space {
      margin: 0 9px;
    }
  }
  // 分页样式
  .el-pagination {
    width: 545px;
    padding-top: 30px;
    margin: 0 auto;
  }
}
</style>