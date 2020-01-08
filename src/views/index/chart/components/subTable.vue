<template>
  <div class="table">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" width="180" label="序号"></el-table-column>
      <el-table-column prop="rid" label="学科编号" width="180"></el-table-column>
      <el-table-column prop="short_name" label="简称"></el-table-column>
      <el-table-column prop="username" label="创建者"></el-table-column>
      <el-table-column prop="create_time" label="创建日期"></el-table-column>
      <el-table-column prop="status" label="状态"></el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <span @click="handleEdit(scope.$index, scope.row)">编辑</span>
          <span @click="handleDelete(scope.$index, scope.row)" class="space-between">禁用</span>
          <span @click="handleDelete(scope.$index, scope.row)">删除</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
    // 编辑
    handleEdit(index, row) {
      window.console.log(index, row);
    },
    // 删除
    handleDelete(index, row) {
      window.console.log(index, row);
    },
    // 禁用
    handleDisable(index, row) {
      window.console.log(index, row);
    }
  }
};
</script>

<style>
</style>