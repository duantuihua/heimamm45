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

      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <!-- 手机号 -->
        <el-form-item prop="phone" class="phone">
          <el-input v-model="ruleForm.phone" placeholder="请输入手机号" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <!-- 密码框 -->
        <el-form-item prop="password" class="password">
          <el-input
            v-model="ruleForm.password"
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
            show-password
          ></el-input>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item prop="code" class="code">
          <el-row class="QRcode">
            <el-col :span="18">
              <el-input v-model="ruleForm.code" placeholder="请输入验证码" prefix-icon="el-icon-key"></el-input>
            </el-col>
            <el-col :span="6">
              <img :src="codeURL" class="code_img" @click="codeChange" />
            </el-col>
          </el-row>
        </el-form-item>

        <!-- 用户协议 -->

        <el-checkbox v-model="checked" class="agreement">
          我已同意并阅读
          <el-link type="primary">用户协议</el-link>和
          <el-link type="primary">隐私条款</el-link>
        </el-checkbox>

        <el-form-item class="btn">
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        </el-form-item>
        <el-form-item class="btn">
          <el-button type="primary" @click="dialogFormVisible = true">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="bg">
      <img src="../../assets/login_banner_ele.png" alt />
    </div>

    <!-- Dialog 对话框 -->
    <el-dialog
      title="用户注册"
      :visible.sync="dialogFormVisible"
      center
      width="603px"
      class="dialog_header"
      top="10vh"
    >
      <!-- 头像上传 -->
      <el-upload
        class="avatar-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <!-- 用户注册的表单验证 -->
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"
        label-width="65px"
      >
        <el-form-item label="昵称" prop="nickname" class="nickname">
          <el-input v-model="ruleForm.nickname"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email" class="email">
          <el-input v-model="ruleForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="phone" class="phone1">
          <el-input v-model="ruleForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" class="password1">
          <el-input v-model="ruleForm.password"></el-input>
        </el-form-item>

        <el-row>
          <el-col :span="18">
            <el-form-item label="图形码" prop="code" class="code">
              <el-input v-model="ruleForm.code"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <img :src="codeURL" class="codeImg" />
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="18">
            <el-form-item label="验证码" prop="QRcode" class="QRcode">
              <el-input v-model="ruleForm.QRcode"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-button>获取用户验证码</el-button>
          </el-col>
        </el-row>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 手机号验证
let reg1 = /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
let phoneReg = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请输入手机号"));
  } else if (reg1.test(value) == false) {
    callback(new Error("输入的手机号不正确"));
  } else {
    callback();
  }
};

// 邮箱验证
let reg2 = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
var emailReg = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请输入邮箱"));
  } else {
    if (reg2.test(value) == false) {
      callback(new Error("邮箱格式不正确"));
    }
    callback();
  }
};

import {login} from "../../api/login";

export default {
  data() {
    return {
      codeURL:
        process.env.VUE_APP_BASEURL + "/captcha?type=login&t=" + Math.random(),
      checked: false,
      imageUrl: "",
      ruleForm: {
        phone: "",
        password: "",
        code: "",
        nickname: "",
        email: ""
      },
      rules: {
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 12, message: "长度在 6 到 12 个字符", trigger: "blur" }
        ],
        nickname: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          { min: 2, max: 6, message: "长度在 2 到 6 个字符", trigger: "blur" }
        ],
        code: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 4, max: 4, message: "长度为4 个字符", trigger: "blur" }
        ],
        phone: [{ required: true, validator: phoneReg, trigger: "blur" }],
        email: [{ required: true, validator: emailReg, trigger: "blur" }]
      },

      // Dialog 对话框
      dialogFormVisible: false
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 表单非空判断和长度验证符合要求
          // 判断用户是否勾选用户协议
          if (this.checked == false) {
            this.$message.warning("请阅读用户协议和隐私条款并选中");
            return;
          }
          // axios 发送请求
          login({                                                                                                                                                                                               
            phone: this.ruleForm.phone,
            password: this.ruleForm.password,
            code: this.ruleForm.code
          }).then(res => {
            window.console.log(res);
            if (res.data.code == 200) {
              this.$message.success("登陆成功");
              return;
            }
            if (res.data.message == "验证码错误") {
              this.$message.warning("验证码错误");
              this.codeChange();
              return;
            }
            if (res.data.message == "登录名不匹配") {
              this.$message.warning("用户名不正确");
              return;
            }
            if (res.data.message == "登录密码不匹配") {
              this.$message.warning("密码不正确");
              return;
            }
          });
        } else {
          return false;
        }
      });
    },

    // 点击图片,刷新验证码
    codeChange() {
      this.codeURL =
        process.env.VUE_APP_BASEURL + "/captcha?type=login&t=" + Math.random();
    },

    // 文件上传
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
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
    padding: 0 43px 0 41px;
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
    .phone,
    .code {
      margin-bottom: 25px;
      margin-top: 25px;
    }
    .phone input,
    .code input,
    .password input {
      height: 45px;
    }

    .code_img {
      width: 110px;
      height: 42px;
      cursor: pointer;
    }
    .QRcode .el-input__inner {
      width: 284px;
      height: 44px;
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(204, 207, 213, 1);
      border-radius: 4px;
    }
    .agreement {
      margin: 8px 0 28px 0;
    }

    .btn span {
      display: block;
      width: 394px;
      height: 40px;
      background: rgba(20, 147, 250, 1);
      border-radius: 4px;
    }
    .btn .el-button--primary {
      line-height: 40px;
      padding: 0;
    }
    .btn {
      padding-bottom: 4px;
    }
  }
  // 注册表单
  .demo-ruleForm {
    .code,
    .QRcode {
      input {
        width: 325px;
        height: 39px;
        border: 1px solid rgba(211, 215, 223, 1);
        border-radius: 4px;
      }
    }
    .nickname,
    .password1,
    .email,
    .phone1 {
      input {
        width: 489px;
        height: 39px;
        border: 1px solid rgba(211, 215, 223, 1);
        border-radius: 4px;
      }
    }
    .codeImg {
      width: 143px;
      height: 41px;
    }
  }
}

// 文件上传
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

// 注册标题
.dialog_header {
  .el-dialog__header {
    background-color: #409eff;
    height: 53px;
    padding: 0;
    span {
      font-size: 18px;
      color: rgba(254, 254, 254, 1);
      line-height: 53px;
    }
  }
  .el-dialog__headerbtn {
    display: none;
  }

  .el-upload {
    margin-left: 201px;
    margin-bottom: 48px;
    .avatar-uploader-icon {
      line-height: 178px;
    }
  }
}
</style>