<template>
  <!-- 用户新增对话框 -->
  <el-dialog title="编辑学科" :visible.sync="dialogFormVisible">
    <el-form :model="editForm" :rules="editRules" ref="ruleForm">
      <el-form-item label="学科编号" :label-width="formLabelWidth" prop="rid">
        <el-input v-model="editForm.rid" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科名称" :label-width="formLabelWidth" prop="name">
        <el-input v-model="editForm.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科简称" :label-width="formLabelWidth">
        <el-input v-model="editForm.short_name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科简介" :label-width="formLabelWidth">
        <el-input v-model="editForm.intro" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科备注" :label-width="formLabelWidth">
        <el-input v-model="editForm.remark" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="btnEditSub">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
// 编辑接口
import { subjectEdit } from "@/api/subject";

export default {
  data() {
    return {
      dialogFormVisible: false,
      // 新增学科弹出框表单
      editForm: {
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
      editRules: {
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
    btnEditSub() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          // 验证成功,发送请求
          subjectEdit(this.editForm).then(res => {
            // window.console.log(res);
            if (res.code == 200) {
              this.$message.success("编辑成功");
              // 关闭编辑框
              this.dialogFormVisible = false;
              // 重新调用接口渲染表格
              this.$parent.getSubList();
            } else if (res.code == 201) {
              this.$message.warning("学科编号不能重复!!!");
            } else {
              this.$message.error("编辑失败了");
              this.dialogFormVisible = false;
            }
          });
        } else {
          // 编辑失败
          this.$message.error("请输入正确的格式");
          return false;
        }
      });
    }
  }
};
</script>

<style>
</style>