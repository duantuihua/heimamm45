<template>
  <div class="login_box">
    <!-- <el-button type="success">成功按钮</el-button> -->
    <router-view></router-view>
  </div>
</template>

<script>
window.console.log(process.env.VUE_APP_BASEURL);
export default {};
</script>

<style>
  body,html {
    height: 100%;
    background:linear-gradient(225deg,rgba(1,198,250,1),rgba(20,147,250,1));
  }
  .login_box {
    height: 100%;
  }
</style>