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
            <el-button type="primary" class="el-icon-plus" @click="dialogFormVisible = true">新增学科</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>

    <!-- 卡片盒子 -->
    <el-card class="table-card">
      <!-- 表格 -->
      <div class="table">
        <el-table :data="tableData" style="width: 100%">
          <!-- 序号列 -->
          <el-table-column type="index" width="180" label="序号"></el-table-column>

          <el-table-column prop="name" label="学科编号" width="180"></el-table-column>
          <el-table-column prop="name" label="简称"></el-table-column>
          <el-table-column prop="name" label="创建者"></el-table-column>
          <el-table-column prop="name" label="创建日期"></el-table-column>
          <el-table-column prop="name" label="状态"></el-table-column>
          <el-table-column prop="name" label="操作"></el-table-column>

          <el-table-column label="操作">
            <template slot-scope="scope">
              <span @click="handleEdit(scope.$index, scope.row)">编辑</span>
              <span @click="handleDelete(scope.$index, scope.row)" class="space-between">禁用</span>
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

    <!-- 新增学科弹出框 -->
    <el-dialog title="新增学科" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="ruleForm">
        <el-form-item label="学科编号" :label-width="formLabelWidth" prop="subNumber">
          <el-input v-model="form.subNumber" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学科名称" :label-width="formLabelWidth" prop="subName">
          <el-input v-model="form.subName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学科简称" :label-width="formLabelWidth">
          <el-input v-model="form.subAbbreviation" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学科简介" :label-width="formLabelWidth">
          <el-input v-model="form.subIntro" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学科备注" :label-width="formLabelWidth">
          <el-input v-model="form.subRemarks" autocomplete="off"></el-input>
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
      // 新增学科弹出框
      dialogFormVisible: false,
      // 新增学科弹出框表单
      form: {
        subNumber: "",
        subName: "",
        // 学科简称
        subAbbreviation: "",
        // 简介
        subIntro: "",
        // 备注
        subRemarks: ""
      },
      formLabelWidth: "100px",

      formInline: {
        user: "",
        region: ""
      },
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      rules: {
          subNumber: [
            { required: true, message: '请输入学科编号', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          subName: [
            { required: true, message: '请输入学科名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
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
        color: #FFFFFF;
      }
    }
    .dialog-footer {
      width: 160px;
      margin: 0 auto;
    }
  }
}
</style>