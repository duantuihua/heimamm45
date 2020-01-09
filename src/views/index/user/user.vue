<template>
  <div class="user">
    <!-- 搜索表单 -->
    <el-card class="box-card">
      <div class="card">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="用户名称" class="subjectNumber">
            <el-input v-model="formInline.user"></el-input>
          </el-form-item>

          <el-form-item label="用户邮箱" class="subjectName">
            <el-input v-model="formInline.user"></el-input>
          </el-form-item>

          <el-form-item label="角色" class="state">
            <el-select v-model="formInline.region" placeholder="请选择状态">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button type="primary">搜索</el-button>
            <el-button @click="onSubmit">清除</el-button>
            <el-button type="primary" class="el-icon-plus" @click="dialogFormVisible = true">新增用户</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>

    <!-- 表格卡片 -->
    <el-card class="table-card">
      <div class="table">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="date" label="序号" width="180"></el-table-column>
          <el-table-column prop="name" label="用户名" width="180"></el-table-column>
          <el-table-column prop="address" label="电话"></el-table-column>
          <el-table-column prop="address" label="邮箱"></el-table-column>
          <el-table-column prop="address" label="角色"></el-table-column>
          <el-table-column prop="address" label="备注"></el-table-column>
          <el-table-column prop="address" label="状态"></el-table-column>
          <el-table-column prop="address" label="操作"></el-table-column>
        </el-table>
      </div>
      <!-- 分页插件 -->
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

    <!-- 新增用户弹出框 -->
    <el-dialog title="新增用户" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="ruleForm" :rules="userRules">
        <el-form-item label="用户名" :label-width="formLabelWidth" prop="userNumber">
          <el-input v-model="form.userName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="userName">
          <el-input v-model="form.userEmail" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="form.userPhone" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="角色" :label-width="formLabelWidth">
          <el-select v-model="form.userRole" placeholder="请选择角色">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-select v-model="form.userState" placeholder="请选择状态">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户备注" :label-width="formLabelWidth">
          <el-input v-model="form.userRemarks" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 分页
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      formInline: {
        user: "",
        region: ""
      },
      tableData: [],
      // 新增学科弹出框
      dialogFormVisible: false,
      // 新增学科弹出框表单
      form: {
        userName: "",
        userEmail: "",
        userPhone: "",
        userRole: "",
        usertate: "",
        userRemarks: ""
      },
      formLabelWidth: "100px",
      userRules: {
        subNumber: [
          { required: true, message: "请输入学科编号", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    onSubmit() {
      window.console.log("submit!");
    },
    // 分页的方法
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
.user {
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

  // 表格
  .table-card {
    margin-top: 20px;
    .table {
      .cell span {
        color: #46a0ff;
        cursor: pointer;
      }
      .space-between {
        margin: 0 9px;
      }
    }
  }
  .block {
    .el-pagination {
      width: 550px;
      margin: 30px auto 22px;
    }
  }
  // 学科弹出框
  .el-dialog {
    width: 478px;
    height: 555px;
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