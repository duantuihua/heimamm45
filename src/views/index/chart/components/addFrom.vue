<template>
  <!-- 用户新增对话框 -->
  <el-dialog title="新增学科" :visible.sync="dialogFormVisible">
    <el-form :model="form" :rules="rules" ref="ruleForm">
      <el-form-item label="学科编号" :label-width="formLabelWidth" prop="rid">
        <el-input v-model="form.rid" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科名称" :label-width="formLabelWidth" prop="name">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科简称" :label-width="formLabelWidth">
        <el-input v-model="form.short_name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科简介" :label-width="formLabelWidth">
        <el-input v-model="form.intro" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科备注" :label-width="formLabelWidth">
        <el-input v-model="form.remark" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="btnAddSubject">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
// 新增学科接口
import { addSubject, subjectList } from "@/api/subject";

export default {
  data() {
    return {
      dialogFormVisible: false,
      // 新增学科弹出框表单
      form: {
        rid: "",
        name: "",
        // 学科简称
        short_name: "",
        // 简介
        intro: "",
        // 备注
        remark: ""
      },
      formLabelWidth: "100px",
      formInline: {
        user: "",
        region: ""
      },
      rules: {
        rid: [
          { required: true, message: "请输入学科编号", trigger: "change" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "change" }
        ],
        name: [
          { required: true, message: "请输入学科名称", trigger: "change" },
          { min: 1, max: 8, message: "长度在 1 到 8 个字符", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    // 点击提交
    btnAddSubject() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          // 验证成功,发送请求
          addSubject(this.form).then(res => {
            window.console.log(res);
            if (res.code == 200) {
              // 添加成功,关闭弹窗
              this.$message.success("添加成功");
              this.dialogFormVisible = false;
              // 清空表单
              this.resetForm();
            } else {
              this.$message.error("添加失败");
            }
          });
        } else {
          this.$message.error("请输入正确的格式");
          return false;
        }
      });
    },

    // 清空表单
    resetForm() {
      this.$refs.ruleForm.resetFields();
    }
  },
  created() {
    // 页面一加载,请求学科列表
    subjectList({
      page: 1, // 当前页
      limit: 10 // 每页消息数量
    }).then(res => {
      window.console.log(res);
    });
  }
};
</script>

<style>
</style>