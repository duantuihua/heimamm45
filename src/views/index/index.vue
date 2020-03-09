<template>
  <div class="index">
    <el-container>
      <el-header class="my-header">
        <div class="left">
          <i class="el-icon-s-fold" @click="isCollapse = !isCollapse"></i>
          <img src="../../assets/index_login.png" alt />
          <span>黑马面面</span>
        </div>

        <div class="right">
          <img :src="useravatar" alt />
          <span>{{userinfo.username}} , 你好</span>
          <el-button size="mini" round @click="getLogout">退出</el-button>
        </div>
      </el-header>

      <el-container class="my-aside">
        <!-- 侧边栏 -->
        <el-aside width="auto">
          <el-menu
            :default-active="$route.path"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            :collapse="isCollapse"
            router
          >
            <!--数据预览  -->
            <el-menu-item
              index="/index/chart"
              v-if="['超级管理员','管理员','老师'].includes(getUserInfo.role)==true"
            >
              <i class="el-icon-pie-chart"></i>
              <span slot="title">数据预览</span>
            </el-menu-item>

            <!-- 用户列表 -->
            <el-menu-item
              index="/index/user"
              v-if="['超级管理员','管理员'].includes(getUserInfo.role) == true"
            >
              <i class="el-icon-user"></i>
              <span slot="title">用户列表</span>
            </el-menu-item>

            <!-- 题库列表 -->
            <el-menu-item
              index="/index/question"
              v-if="['超级管理员','管理员','老师'].includes(getUserInfo.role)==true"
            >
              <i class="el-icon-edit"></i>
              <span slot="title">题库列表</span>
            </el-menu-item>

            <!-- 企业列表 -->
            <el-menu-item
              index="/index/enterprise"
              v-if="['超级管理员','管理员'].includes(getUserInfo.role)==true"
            >
              <i
                class="el-icon-office-building"
                v-if="['超级管理员','管理员','老师'].includes(getUserInfo.role)==true"
              ></i>
              <span slot="title">企业列表</span>
            </el-menu-item>

            <!-- 学科列表 -->
            <el-menu-item
              index="/index/subject"
              v-if="['超级管理员','管理员','老师','学生'].includes(getUserInfo.role)==true"
            >
              <i class="el-icon-notebook-2"></i>
              <span slot="title">学科列表</span>
            </el-menu-item>
          </el-menu>
        </el-aside>

        <!-- 主体内容 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { info, logout } from "../../api/index";
export default {
  data() {
    return {
      isCollapse: false,
      // 用户信息
      userinfo: "",
      useravatar: ""
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      window.console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      window.console.log(key, keyPath);
    },

    // 退出登录
    getLogout() {
      this.$confirm("此操作将永久退出登录, 是否继续?", "友情提示", {
        confirmButtonText: "残忍离去",
        cancelButtonText: "留下来!!!",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "你已经退出"
          });
          logout().then(res => {
            window.console.log(res);
            // 清空token,跳转到登录页
            if (res.data.code == 200) {
              localStorage.removeItem("token");
              this.$router.push("/");
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "退出已取消"
          });
        });
    }
  },
  computed: {
    getUserInfo() {
      return this.$store.state.userinfo;
    }
  },
  created() {
    info().then(res => {
      // window.console.log(res.data.data);
      this.userinfo = res.data.data;
      this.useravatar =
        process.env.VUE_APP_BASEURL + "/" + res.data.data.avatar;
    });
  }
};
</script>

<style lang="less">
html,
body {
  height: 100%;
}
.index {
  // 头部
  height: 100%;
  .el-container {
    height: 100%;
  }
  .my-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    // line-height: 60px;
    background: rgba(255, 255, 255, 1);
    .left {
      img {
        padding: 0 15px;
      }
      .el-icon-s-fold {
        font-size: 24px;
        cursor: pointer;
      }
    }

    .right {
      span {
        padding: 0 10px;
      }
      img {
        border-radius: 50%;
        width: 43px;
        height: 43px;
      }
    }
  }

  // 侧边栏
  .el-aside {
    background: rgba(255, 255, 255, 1);
    .my-side {
      height: 100%;
    }

    .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 200px;
      min-height: 400px;
    }
  }
}
</style>