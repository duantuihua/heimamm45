<template>
  <div class="chart">
    <!-- 搜索表单 -->
    <el-card class="box-card">
      <div class="card">
        <!-- 搜索表单 -->
        <el-form :inline="true" :model="formInline" class="demo-form-inline" ref="searchForm">
          <el-form-item label="学科编号" class="subjectNumber" prop="subjectNumber">
            <el-input v-model="formInline.subjectNumber"></el-input>
          </el-form-item>

          <el-form-item label="学科名称" class="subjectName" prop="subjectName">
            <el-input v-model="formInline.subjectName"></el-input>
          </el-form-item>

          <el-form-item label="创建者" class="creator" prop="creator">
            <el-input v-model="formInline.creator"></el-input>
          </el-form-item>

          <el-form-item label="状态" class="state" prop="status">
            <el-select v-model="formInline.status" placeholder="请选择状态">
              <el-option label="禁用" value="0"></el-option>
              <el-option label="启用" value="1"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="subSearch">搜索</el-button>
            <el-button @click="onSubmit">清除</el-button>
            <el-button
              type="primary"
              class="el-icon-plus"
              @click="$refs.addForm.dialogFormVisible = true"
            >新增学科</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>

    <!-- 卡片盒子 -->
    <el-card class="table-card">
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
              <!-- <span @click="handleEdit(scope.$index, scope.row)">编辑</span> -->
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
          :current-page="page"
          :page-sizes="pageSizes"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </el-card>
    <!-- 新增学科弹出框 -->
    <addForm ref="addForm"></addForm>
    <!-- 编辑学科弹出框 -->
    <editForm ref="editForm"></editForm>
  </div>
</template>

<script>
// 导入组件
import addForm from "./components/addForm";
import editForm from "./components/editForm";

import { subjectList, subjectStatus, subjectRemove } from "@/api/subject";

export default {
  // 挂在组件
  components: {
    // editForm
    addForm,
    editForm
  },
  created() {
    // 页面一加载,请求学科列表
    this.getSubList();
  },
  data() {
    return {
      tableData: [],
      total: 0, // 数据总条数
      // 分页
      page: 1, // 页面一加载, 默认显示的页数
      limit: "3", // 每页消息数
      pageSizes: [3, 6, 9],
      formInline: {
        subjectNumber: "", // 学科编号
        subjectName: "", // 学科名称
        creator: "", // 创建者
        status: "" // 状态
      }
    };
  },
  methods: {
    // 分页的方法
    handleSizeChange(val) {
      window.console.log(`每页 ${val} 条`);
      this.limit = val;
      this.page = 1;
      this.getSubList();
    },
    handleCurrentChange(val) {
      window.console.log(`当前页: ${val}`);
      this.page = val;
      this.getSubList();
    },

    // 编辑学科
    handleEdit(index, row) {
      // window.console.log(index, row);
      this.$refs.editForm.dialogFormVisible = true;
      // 把当前行的信息传递给学科编辑框
      // 进行深拷贝
      this.$refs.editForm.editForm = JSON.parse(JSON.stringify(row));
    },
    // 删除学科
    handleDelete(index, row) {
      // window.console.log(index, row);
      subjectRemove({ id: row.id }).then(res => {
        // window.console.log(res);
        if (res.code == 200) {
          // 当最后一页只有一条数据时,此时点击删除,虽然数据库中的数据已经被删除了,但是页面中 tableData 中的数组是没有变化的,
          // 因为还没有调用接口刷新数据,所以当 tableData 中的长度为1时,此时最后一页已经没有数据了
          if (this.tableData.length == 1) {
            this.page--;
            // 如果是最后一页
            
            if (this.page == 0) {
              this.page = 1;
            }
          }
          this.getSubList();
          this.$notify.success({
            title: "删除成功"
          });
        } else {
          this.$notify.error({
            title: "删除失败"
          });
        }
      });
    },
    // 禁用
    handleDisable(index, row) {
      // window.console.log(index, row);
      if (row.status == 1) {
        subjectStatus({ id: row.id, status: 0 }).then(res => {
          // window.console.log(res);
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
          // window.console.log(res);
          if (res.code == 200) {
            this.$message.success("状态已切换为启用");
            this.getSubList();
          }
        });
      }
    },
    // 学科搜索
    subSearch() {
      this.page = 1;
      subjectList({
        page: this.page, // 当前页
        limit: this.limit, // 每页消息数量
        rid: this.formInline.subjectNumber,
        name: this.formInline.subjectName,
        username: this.formInline.creator,
        status: this.formInline.status
      }).then(res => {
        window.console.log(res);
        this.tableData = res.data.items;
      });
    },
    // 清空搜索
    onSubmit() {
      this.$refs.searchForm.resetFields();
      this.getSubList();
    },
    // 封装获取学科列表的方法
    getSubList() {
      subjectList({
        page: this.page, // 当前页
        limit: this.limit // 每页消息数量
      }).then(res => {
        window.console.log(res);
        this.tableData = res.data.items;
        this.total = res.data.pagination.total;
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