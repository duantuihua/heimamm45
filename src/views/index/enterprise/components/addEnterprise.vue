<template>
  <el-dialog title="新增企业" :visible.sync="dialogFormVisible">
    <el-form :model="form" ref="addEnterprise" :rules="rules">
      <el-form-item label="企业编号" :label-width="formLabelWidth" prop="eid">
        <el-input v-model="form.eid" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="企业名称" :label-width="formLabelWidth" prop="name">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="企业简称" :label-width="formLabelWidth" prop="short_name">
        <el-input v-model="form.short_name" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="企业简介" :label-width="formLabelWidth" prop="intro">
        <el-input v-model="form.intro" autocomplete="off" type="textarea"></el-input>
      </el-form-item>

      <el-form-item label="企业备注" :label-width="formLabelWidth" prop="remark">
        <el-input v-model="form.remark" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
// 导入新增企接口
import { enterpriseAdd } from "@/api/enterprise";
export default {
  data() {
    return {
      
      dialogFormVisible: false,
      form: {
        eid: "", // 企业编号
        name: "", // 企业名称
        short_name: "", // 简称
        intro: "", // 企业简介
        remark: "" // 备注
      },
      formLabelWidth: "100px",
      // 新增企业
      rules: {
        eid: [
          { required: true, message: "请输入企业编号", trigger: "change" },
          { min: 3, max: 6, message: "长度在 3 到 6 个字符", trigger: "change" }
        ],
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
    // 企业新增提交
    submit() {
      this.$refs.addEnterprise.validate(valid => {
        if (valid) {
          // 表单验证通过,调用接口
          enterpriseAdd({
            eid: this.form.eid,
            name: this.form.name,
            short_name: this.form.short_name,
            intro: this.form.intro,
            remark: this.form.remark
          }).then(res => {
            window.console.log(res);
            if (res.code == 200) {
              this.dialogFormVisible = false;
              // 清空表单
              this.$refs.addEnterprise.resetFields();
              // 调用接口刷新列表
              this.$parent.getList();
              this.$message.success("企业添加成功");
            }
            else if (res.code == 201) {
              return this.$message.error("该企业已经存在了");
            } else {
              return this.$message.error("企业添加失败");

            }
          });
        } else {
          // 表单验证失败
          this.$message.error("输入的格式不正确");
          return false;
        }
      });
    },
  }
};
</script>

<style>
</style>