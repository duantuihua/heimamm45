<template>
  <el-dialog title="编辑企业" :visible.sync="dialogFormVisible">
    <el-form :model="editForm" ref="editEnterprise" :rules="editRules">
      <el-form-item label="企业名称" :label-width="formLabelWidth" prop="name">
        <el-input v-model="editForm.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="企业简称" :label-width="formLabelWidth" prop="short_name">
        <el-input v-model="editForm.short_name" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="所属领域" :label-width="formLabelWidth">
        <el-input v-model="tag" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="企业简介" :label-width="formLabelWidth" prop="intro">
        <el-input v-model="editForm.intro" autocomplete="off" type="textarea"></el-input>
      </el-form-item>

      <el-form-item label="企业备注" :label-width="formLabelWidth" prop="remark">
        <el-input v-model="editForm.remark" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { enterpriseEdit } from "@/api/enterprise";
export default {
  data() {
    return {
      dialogFormVisible: false,
      editForm: "",
      tag: "互联网",
      formLabelWidth: "100px",
      // 新增企业
      editRules: {
        name: [
          { required: true, message: "请输入企业名称", trigger: "change" },
          { min: 2, max: 8, message: "长度在 3 到 8 个字符", trigger: "change" }
        ],
        short_name: [
          { required: true, message: "请输入企业简称", trigger: "change" },
          {
            min: 2,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "change"
          }
        ],
        intro: [
          { required: true, message: "请输入企业简介", trigger: "change" },
          {
            min: 5,
            max: 20,
            message: "长度在 5 到 20 个字符",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    // 企业编辑提交
    submit() {
      enterpriseEdit({
        tag: this.tag,
        ...this.editForm
      }).then(res => {
        window.console.log(res);
        if (res.code == 200) {
          this.$parent.getList();
          this.dialogFormVisible = false;
          this.$message.success("企业编辑成功");
        } else {
          this.$message.error("企业编辑失败");
        }
      });
    }
  }
};
</script>

<style>
</style>