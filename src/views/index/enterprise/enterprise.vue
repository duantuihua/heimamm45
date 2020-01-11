<template>
  <div class="enterprise">
    <!-- 卡片盒子 -->
    <el-card class="form_card">
      <!-- 企业表单 -->
      <el-form :inline="true" :model="formInline" class="demo-form-inline" ref="enterpriseForm">
        <el-form-item label="企业编号" class="number" prop="eid">
          <el-input v-model="formInline.eid" placeholder="企业编号"></el-input>
        </el-form-item>
        <el-form-item label="企业名称" class="name" prop="name">
          <el-input v-model="formInline.name" placeholder="企业名称"></el-input>
        </el-form-item>
        <el-form-item label="创建者" class="user" prop="username">
          <el-input v-model="formInline.username" placeholder="创建者"></el-input>
        </el-form-item>
        <el-form-item label="状态" class="status" prop="status">
          <el-select v-model="formInline.status" placeholder="请选择状态">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">搜索</el-button>
          <el-button @click="clear">清除</el-button>
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
        :current-page="currentPage"
        :page-sizes="[3, 6, 9]"
        :page-size="limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>

    <!-- 新增企业组件 -->
    <addEnterprise ref="addEnterprise"></addEnterprise>
    <editEnterprise ref="editEnterprise"></editEnterprise>
  </div>
</template>

<script>
// 导入新增企业组件
import addEnterprise from "./components/addEnterprise";
// 企业编辑组件
import editEnterprise from "./components/editEnterprise";
// 导入接口
import {
  enterpriseList,
  enterpriseStatus,
  enterpriseRemove
} from "@/api/enterprise";
export default {
  // 注册组件
  components: {
    addEnterprise,
    editEnterprise
  },
  created() {
    this.getList();
  },
  data() {
    return {
      // 分页
      currentPage: 1, // 每次请求,显示的都是第一页
      total: 0, // 消息总条数
      page: 1, // 当前请求页
      limit: 3, // 每页请求的消息条数
      // 企业表单数据
      formInline: {
        eid: "", // 企业编号
        name: "", // 企业名称
        username: "", // 创建者
        status: "" // 状态
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
        this.page = res.data.pagination.page;
        this.total = res.data.pagination.total;
      });
    },
    //状态切换
    disabled(index, row) {
      // window.console.log(index, row);
      if (row.status == 1) {
        enterpriseStatus({
          id: row.id
        }).then(res => {
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
      this.$refs.editEnterprise.dialogFormVisible = true;
      // 深拷贝
      this.$refs.editEnterprise.editForm = JSON.parse(JSON.stringify(row));
    },
    // 删除
    deleted(index, row) {
      // window.console.log(index, row);
      enterpriseRemove({
        id: row.id
      }).then(res => {
        window.console.log(res);
        if (res.code == 200) {
          // 刷新列表
          this.getList();
          this.$notify({
            title: "删除成功",
            type: "success"
          });
        } else {
          this.$notify({
            title: "删除失败",
            type: "error"
          });
        }
      });
    },

    // 企业搜索
    onSubmit() {
      enterpriseList({
        page: this.page, // 页码
        limit: this.limit, // 页尺寸
        ...this.formInline
      }).then(res => {
        // window.console.log(res);
        if (res.code == 200) {
          // 表格数据
          this.tableData = res.data.items;
          this.page = res.data.pagination.page;
          this.total = res.data.pagination.total;
        } else {
          this.$message.error("搜索失败");
        }
      });
    },
    // 清除
    clear() {
      this.getList();
      // 清空表单
      this.$refs.enterpriseForm.resetFields();
    },

    handleSizeChange(val) {
      // window.console.log(`每页 ${val} 条`);
      this.limit = val;
      this.getList();
    },
    handleCurrentChange(val) {
      // window.console.log(`当前页: ${val}`);
      this.page = val;
      this.getList();
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