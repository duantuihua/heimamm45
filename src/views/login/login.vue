<template>
  <div class="login_container">
    <div class="login_from">
      <div class="title">
        <img src="../../assets/login.png" alt />
        <div class="titMM">黑马面面</div>
        <div class="line"></div>
        <div class="title_login">用户登录</div>
      </div>
      <!-- ele 表单 -->

      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <!-- 手机号 -->
        <el-form-item prop="phone">
          <el-input v-model="ruleForm.phone"></el-input>
        </el-form-item>
        <!-- 密码框 -->
        <el-form-item prop="password">
          <el-input v-model="ruleForm.password"></el-input>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item prop="code">
          <el-row>
            <el-col :span="18">
          <el-input v-model="ruleForm.code"></el-input>
            </el-col>
            <el-col :span="6">
              <img :src="codeURL" alt="">
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="bg">
      <img src="../../assets/login_banner_ele.png" alt />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      codeURL: process.env.VUE_APP_BASEURL + '/captcha?type=login',
      ruleForm: {
        phone: "",
        password: "",
        code: "",
      },
      rules: {
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { min: 11, max: 11, message: "长度为11位", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 12, message: "长度在 6 到 12 个字符", trigger: "blur" }
        ],
        code: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { min: 4, max: 4, message: "长度为4 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          window.console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="less">
.login_container {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  .login_from {
    box-sizing: border-box;
    width: 478px;
    height: 550px;
    background: rgba(245, 245, 245, 1);

    // 表单标题
    .title {
      display: flex;
      align-items: center;

      img {
        width: 22px;
        height: 17px;
        margin-left: 48px;
        margin-top: 50px;
      }
      .titMM {
        margin-left: 13px;
        margin-top: 48px;
        height: 22px;
        font-size: 24px;
        font-family: SourceHanSansCN;
        font-weight: 400;
        color: rgba(12, 12, 12, 1);
      }
      .title_login {
        height: 21px;
        margin-top: 47px;
        font-size: 22px;
        font-family: PingFangSC;
        font-weight: 400;
        color: rgba(12, 12, 12, 1);
      }
      .line {
        margin: 44px 12px 0 14px;
        width: 1px;
        height: 28px;
        background: rgba(199, 199, 199, 1);
      }
    }

    // 表单
  }
}
</style>