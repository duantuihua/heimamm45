<template>
  <div class="question">
    <!-- 头卡 -->
    <el-card class="box-card">
      <!-- 表单 -->
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="作者">
          <el-input v-model="formInline.username"></el-input>
        </el-form-item>
        <el-form-item label="学科">
          <el-select v-model="formInline.subject" placeholder="请选择学科">
            <el-option
              :label="item.name"
              :value="item.id"
              v-for="item in subjectList"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="阶段">
          <el-select v-model="formInline.step" placeholder="请选择阶段">
            <el-option label="初级" :value="1"></el-option>
            <el-option label="中级" :value="2"></el-option>
            <el-option label="高级" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业">
          <el-select v-model="formInline.enterprise" placeholder="请选择企业">
            <el-option
              :label="item.name"
              :value="item.id"
              v-for="item in enterpriseList"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="题型">
          <el-select v-model="formInline.type" placeholder="请选择题型">
            <el-option label="单选" :value="1"></el-option>
            <el-option label="多选" :value="2"></el-option>
            <el-option label="简单" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="难度">
          <el-select v-model="formInline.difficulty" placeholder="请选择难度">
            <el-option label="简单" :value="1"></el-option>
            <el-option label="一般" :value="2"></el-option>
            <el-option label="困难" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="formInline.status" placeholder="请选择状态">
            <el-option label="启用" :value="1"></el-option>
            <el-option label="禁用" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <div class="block">
            <el-date-picker v-model="formInline.create_date" type="date" placeholder="选择日期"></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="标题">
          <el-input v-model="formInline.title"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">搜索</el-button>
          <el-button @click="onSubmit">清除</el-button>
          <el-button type="primary" class="el-icon-plus" @click="onSubmit">新增试题</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 身卡 -->
    <el-card>
      <!-- 表格 -->
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column label="序号" type="index" width="60"></el-table-column>
        <el-table-column prop="name" label="题目"></el-table-column>
        <el-table-column prop="name" label="学科.阶段"></el-table-column>
        <el-table-column prop="name" label="题型"></el-table-column>
        <el-table-column prop="name" label="企业"></el-table-column>
        <el-table-column prop="name" label="创建者"></el-table-column>
        <el-table-column prop="name" label="状态"></el-table-column>
        <el-table-column prop="name" label="访问量"></el-table-column>
        <el-table-column prop="address" label="操作">
          <el-button type="text">编辑</el-button>
          <el-button type="text">启用</el-button>
          <el-button type="text">删除</el-button>
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

    <!-- 编辑对话框组件 -->
    <addDialog ref="addDialog"></addDialog>
  </div>
</template>

<script>
// 导入编辑框组件
import addDialog from "./components/addDialog";

// 导入学科列表接口
import { subjectList } from "@/api/subject";
// 导入企业列表接口
import { enterpriseList } from "@/api/enterprise";

export default {
  created() {
    // 学科列表
    subjectList().then(res => {
      // window.console.log(res);
      this.subjectList = res.data.items;
    });
    // 企业列表
    enterpriseList().then(res => {
      // window.console.log(res);
      this.enterpriseList = res.data.items;
    });
  },
  // 注册组件
  components: {
    addDialog
  },
  data() {
    return {
      // 分页
      subjectList: "", // 学科数组
      
      enterpriseList: "", // 企业数组
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      formInline: {
        username: "", // 作者
        subject: "", // 学科
        step: "", // 阶段
        enterprise: "", // 企业
        type: "", //题型
        difficulty: "", //难度
        status: "", // 状态
        create_date: "", // 创建日期
        title: "", // 标题
      },
      // 表格
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
      ]
    };
  },
  methods: {
    onSubmit() {
      this.$refs.addDialog.dialogFormVisible = true;
    },
    // 分页方法
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
.question {
  .el-pagination {
    width: 550px;
    margin: 0 auto;
    padding-top: 30px;
  }
}
</style>