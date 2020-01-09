<template>
  <div class="chart">
    <!-- 搜索表单 -->
    <el-card class="box-card">
      <div class="card">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="学科编号" class="subjectNumber">
            <el-input v-model="formInline.user"></el-input>
          </el-form-item>

          <el-form-item label="学科名称" class="subjectName">
            <el-input v-model="formInline.user"></el-input>
          </el-form-item>

          <el-form-item label="创建者" class="creator">
            <el-input v-model="formInline.user"></el-input>
          </el-form-item>

          <el-form-item label="状态" class="state">
            <el-select v-model="formInline.region" placeholder="请选择状态">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button type="primary">搜索</el-button>
            <el-button @click="onSubmit">清除</el-button>
            <el-button
              type="primary"
              class="el-icon-plus"
              @click="$refs.addFrom.dialogFormVisible = true"
            >新增学科</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>

    <!-- 卡片盒子 -->
    <el-card class="table-card">
      <!-- 新增学科弹出框 -->
      <addFrom ref="addFrom"></addFrom>
      <!-- 学科表格组件 -->
      <div class="table">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column type="index" width="180" label="序号"></el-table-column>
          <el-table-column prop="rid" label="学科编号" width="180"></el-table-column>
          <el-table-column prop="short_name" label="简称"></el-table-column>
          <el-table-column prop="username" label="创建者"></el-table-column>
          <el-table-column prop="create_time" label="创建日期"></el-table-column>
          <el-table-column prop="status" label="状态">
            <template slot-scope="statusScope">
              <span v-if="statusScope.row.status == 1">启用</span>
              <span v-else id="red">禁用</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <span @click="handleEdit(scope.$index, scope.row)">编辑</span>
              <span
                @click="handleDisable(scope.$index, scope.row)"
                class="space-between"
                v-if="scope.row.status==0"
              >启用</span>
              <span
                @click="handleDisable(scope.$index, scope.row)"
                class="space-between"
                v-if="scope.row.status==1"
              >禁用</span>
              <span @click="handleDelete(scope.$index, scope.row)">删除</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页 -->
      <div class="block">
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
      </div>
    </el-card>
  </div>
</template>

<script>
// 导入组件
import addFrom from "./components/addFrom";

import { subjectList, subjectStatus } from "@/api/subject";

export default {
  // 挂在组件
  components: {
    addFrom
  },
  created() {
    // 页面一加载,请求学科列表
    this.getSubList();
  },
  data() {
    return {
      tableData: [],
      // 分页
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,

      page: "1", // 当前页
      limit: "6", // 每页消息数

      formInline: {
        user: "",
        region: ""
      }
    };
  },
  methods: {
    onSubmit() {
      window.console.log(111);
    },

    // 分页的方法
    handleSizeChange(val) {
      window.console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      window.console.log(`当前页: ${val}`);
    },

    // 表格方法
    handleEdit(index, row) {
      window.console.log(index, row);
    },
    handleDelete(index, row) {
      window.console.log(index, row);
    },
    // 禁用
    handleDisable(index, row) {
      // window.console.log(index, row);
      if (row.status == 1) {
        subjectStatus({ id: row.id, status: 0 }).then(res => {
          window.console.log(res);
          if (res.code == 200) {
            // 提示用户
            this.$message({
              message: "状态已切换为禁用",
              type: "error"
            });
            this.getSubList();
          }
        });
      }
      if (row.status == 0) {
        subjectStatus({ id: row.id, status: 1 }).then(res => {
          window.console.log(res);
          if (res.code == 200) {
            this.$message.success('状态已切换为启用');
            this.getSubList();
          }
        });
      }
    },
    // 封装获取学科列表的方法
    getSubList() {
      subjectList({
        page: this.page, // 当前页
        limit: this.limit // 每页消息数量
      }).then(res => {
        window.console.log(res);
        this.tableData = res.data.items;
      });
    }
  }
};
</script>

<style lang="less">
.chart {
  background: rgba(232, 233, 236, 1);
  height: 100%;

  // 学科编号
  .el-card__body {
    padding: 0;
  }
  .box-card {
    box-sizing: border-box;
    .card {
      height: 82px;
      .demo-form-inline {
        margin-top: 21px;
      }
      .subjectNumber {
        input {
          width: 100px;
          height: 39px;
        }
      }
      .subjectName {
        input {
          width: 149px;
          height: 39px;
        }
      }
      .creator {
        input {
          width: 100px;
          height: 39px;
        }
      }
      .state {
        input {
          width: 149px;
          height: 39px;
        }
      }
    }
  }

  //  卡片盒子
  .table-card {
    margin-top: 20px;
    .table {
      .cell span {
        color: #46a0ff;
        cursor: pointer;
      }
      #red {
        color: red;
      }
      .space-between {
        margin: 0 9px;
      }
    }
    // 分页
    .block {
      .el-pagination {
        width: 550px;
        margin: 30px auto 22px;
      }
    }
  }

  // 学科弹出框
  .el-dialog {
    width: 600px;
    height: 510px;
    .el-dialog__header {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 53px;
      padding: 0;
      line-height: 53px;
      background-color: #409eff;
      font-size: 18px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      .el-dialog__title {
        color: rgba(255, 255, 255, 1);
      }
      .el-icon-close {
        color: #ffffff;
      }
    }
    .dialog-footer {
      width: 160px;
      margin: 0 auto;
    }
  }
}
</style>