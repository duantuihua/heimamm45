<template>
  <div class="user">
    <!-- 搜索表单 -->
    <el-card class="box-card">
      <div class="card">
        <el-form :inline="true" :model="formInline" class="demo-form-inline" ref="clear">
          <el-form-item label="用户名称" class="subjectNumber">
            <el-input v-model="formInline.username"></el-input>
          </el-form-item>

          <el-form-item label="用户邮箱" class="subjectName">
            <el-input v-model="formInline.email"></el-input>
          </el-form-item>

          <el-form-item label="角色" class="state">
            <el-select v-model="formInline.role_id" placeholder="请选择状态">
              <el-option label="管理员" value="2"></el-option>
              <el-option label="老师" value="3"></el-option>
              <el-option label="学生" value="4"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="userSearch">搜索</el-button>
            <el-button @click="onSubmit">清除</el-button>
            <el-button type="primary" class="el-icon-plus" @click="dialogFormVisible = true">新增用户</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>

    <!-- 表格卡片 -->
    <el-card class="table-card">
      <div class="table">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column type="index" label="序号" width="180"></el-table-column>
          <el-table-column prop="username" label="用户名" width="180"></el-table-column>
          <el-table-column prop="phone" label="电话"></el-table-column>
          <el-table-column prop="email" label="邮箱"></el-table-column>
          <el-table-column prop="role" label="角色"></el-table-column>
          <el-table-column prop="remark" label="备注"></el-table-column>
          <el-table-column prop="status" label="状态">
            <template slot-scope="scope">
              <span v-if="scope.row.status == 1">启用</span>
              <span v-else>禁用</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <!-- 插槽的使用 -->
            <template slot-scope="scope">
              <span @click="handleEdit(scope.$index, scope.row)">编辑</span>
              <span
                @click="handleDisabled(scope.$index, scope.row)"
                class="space disable"
                v-if="scope.row.status==1"
              >禁用</span>
              <span @click="handleDisabled(scope.$index, scope.row)" class="space" v-else>启用</span>
              <span @click="handleDelete(scope.$index, scope.row)">删除</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页插件 -->
      <div class="block">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="1"
          :page-sizes="[3, 6, 9]"
          :page-size="limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </el-card>

    <!-- 新增用户弹出框 -->
    <el-dialog title="新增用户" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="userForm" :rules="userRules">
        <el-form-item label="用户名" :label-width="formLabelWidth" prop="userName">
          <el-input v-model="form.userName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="userEmail">
          <el-input v-model="form.userEmail" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth" prop="userPhone">
          <el-input v-model="form.userPhone" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="角色" :label-width="formLabelWidth" prop="userRole">
          <el-select v-model="form.userRole" placeholder="请选择角色">
            <el-option label="管理员" value="2"></el-option>
            <el-option label="老师" value="3"></el-option>
            <el-option label="学生" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth" prop="usertate">
          <el-select v-model="form.usertate" placeholder="请选择状态">
            <!-- form.usertate 绑定的是 option 的 value 值 -->
            <el-option label="禁用" value="0"></el-option>
            <el-option label="启用" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户备注" :label-width="formLabelWidth" prop="userRemarks">
          <el-input v-model="form.userRemarks" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑用户弹出框 -->
    <el-dialog title="编辑用户" :visible.sync="dialogEditFormVisible">
      <el-form :model="editForm" ref="editForm" :rules="editRules">
        <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
          <el-input v-model="editForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
          <el-input v-model="editForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth" prop="phone">
          <el-input v-model="editForm.phone" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="角色" :label-width="formLabelWidth" prop="role">
          <el-select v-model="editForm.role" placeholder="请选择角色">
            <el-option label="管理员" value="2"></el-option>
            <el-option label="老师" value="3"></el-option>
            <el-option label="学生" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth" prop="status">
          <el-select v-model="editForm.status" placeholder="请选择状态">
            <!-- form.usertate 绑定的是 option 的 value 值 -->
            <el-option label="禁用" value="0"></el-option>
            <el-option label="启用" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户备注" :label-width="formLabelWidth" prop="remark">
          <el-input v-model="editForm.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEditFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitEdit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 邮箱正则
let userEmailReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
// 手机正则
let userPhoneReg = /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
// 邮箱验证
let validateEmail = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请输入邮箱"));
  } else if (userEmailReg.test(value) == false) {
    callback(new Error("邮箱格式不正确"));
  } else {
    callback();
  }
};
// 手机验证
let validatePhone = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请输入手机号"));
  } else if (userPhoneReg.test(value) == false) {
    callback(new Error("手机号码不正确"));
  } else {
    callback();
  }
};

// 导入接口
import {
  addUser,
  userList,
  userSstatus,
  userRemove,
  userEdit
} from "@/api/user";

export default {
  data() {
    return {
      // 分页
      total: 0, //
      limit: 6,
      page: 1, // 当前页
      tableData: [],
      formInline: {
        username: "",
        email: "",
        role_id: ""
      },
      // 新增学科弹出框
      dialogFormVisible: false,
      // 编辑学科弹出框
      dialogEditFormVisible: false,
      // 新增用户弹出框表单
      form: {
        userName: "",
        userEmail: "",
        userPhone: "",
        userRole: "",
        usertate: "",
        userRemarks: ""
      },
      // 编辑用户
      editForm: {
        username: "",
        email: "",
        phone: "",
        role: "",
        status: "",
        remark: ""
      },
      formLabelWidth: "100px",
      userRules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "change" },
          { min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "change" }
        ],
        userEmail: [
          { required: true, validator: validateEmail, trigger: "change" }
        ],
        userPhone: [
          { required: true, validator: validatePhone, trigger: "change" }
        ],
        userRole: [
          { required: true, message: "请输入角色", trigger: "change" }
        ],
        usertate: [{ message: "请输入角色", trigger: "change" }]
      },
      editRules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "change" },
          { min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "change" }
        ],
        email: [
          { required: true, validator: validateEmail, trigger: "change" }
        ],
        phone: [
          { required: true, validator: validatePhone, trigger: "change" }
        ],
        role: [{ required: true, message: "请输入角色", trigger: "change" }]
      }
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    // 添加用户
    addUser() {
      this.dialogFormVisible = true;
      this.$refs.userForm.validate(valid => {
        if (valid) {
          // 验证通过,调用接口
          addUser({
            username: this.form.userName,
            email: this.form.userEmail,
            phone: this.form.userPhone,
            role_id: this.form.userRole,
            status: this.form.usertate,
            remark: this.form.userRemarks
          }).then(res => {
            window.console.log(res);
            if (res.code == 200) {
              this.$message.success("用户新增成功");
              // 关闭弹窗
              this.dialogFormVisible = false;
              // 获取用户列表刷新页面
              this.getUserList();
              // 清空表单
              this.$refs.userForm.resetFields();
              return;
            }
            if (res.code == 201) {
              this.$message.warning("添加失败");
            }
          });
        } else {
          // 验证失败
          this.$message.error("输入的格式不正确");
          return false;
        }
      });
    },
    // 获取用户列表
    getUserList() {
      userList({
        page: this.page,
        limit: this.limit
      }).then(res => {
        window.console.log(res);
        if (res.code == 200) {
          this.tableData = res.data.items;
          this.total = res.data.pagination.total;
          this.page = res.data.pagination.page;
        }
        // window.console.log(this.tableData);
      });
    },
    // 编辑用户
    handleEdit(index, row) {
      window.console.log(index, row);
      this.dialogEditFormVisible = true;
      // 进行深拷贝
      this.editForm = JSON.parse(JSON.stringify(row));
    },
    // 编辑提交
    submitEdit() {
      userEdit(this.editForm).then(res => {
        window.console.log(res);
        if (res.code == 200) {
          this.$message.success("编辑成功");
          this.getUserList();
          this.dialogEditFormVisible = false;
        } else {
          this.$message.error("编辑失败了!!!");
        }
      });
    },
    // 删除用户
    handleDelete(index, row) {
      window.console.log(index, row);
      userRemove({ id: row.id }).then(res => {
        window.console.log(res);
        if (res.code == 200) {
          // 如果是最后一页的最后一条消息,删除后应该请求上一页的数据,因为当前页已经没有数据了
          // 代码执行到这里,虽然数据库中的数据已经被删除了,但是页面中 tableData的是还没有变化的
          if (this.tableData.length == 1) {
            this.page--;
          }
          this.getUserList();
          this.$notify({
            title: "删除成功",
            type: "success"
          });
        } else {
          this.$notify({
            title: "删除失败",
            type: "error"
          });
        }
      });
    },
    // 状态切换
    handleDisabled(index, row) {
      // window.console.log(index, row);
      if (row.status == 1) {
        userSstatus({ id: row.id }).then(res => {
          // window.console.log(res);
          if (res.code == 200) {
            this.$message.warning("状态切换成功,当前为禁用");
            this.getUserList();
          }
        });
      } else {
        userSstatus({ id: row.id }).then(res => {
          // window.console.log(res);
          if (res.code == 200) {
            this.$message.success("状态切换成功,当前为启用");
            this.getUserList();
          }
        });
      }
    },
    // 用户搜索
    userSearch() {
      userList({
        page: this.page,
        limit: this.limit,
        ...this.formInline
      }).then(res => {
        window.console.log(res);
        if (res.code == 200) {
          // 为表格重新赋值满足条件的数组
          this.tableData = res.data.items;
        }
      });
    },
    // 清除搜索
    onSubmit() {
      // 清空列表
      this.$refs.clear.resetFields();
      this.getUserList();
    },
    // 分页的方法
    handleSizeChange(val) {
      window.console.log(`每页 ${val} 条`);
      this.limit = val;
      this.getUserList();
    },
    handleCurrentChange(val) {
      window.console.log(`当前页: ${val}`);
      this.page = val;
      this.getUserList();
    }
  }
};
</script>

<style lang="less">
.user {
  .box-card {
    box-sizing: border-box;
    .card {
      height: 82px;
      .demo-form-inline {
        margin-top: 21px;
      }
      .subjectNumber {
        input {
          width: 100px;
          height: 39px;
        }
      }
      .subjectName {
        input {
          width: 149px;
          height: 39px;
        }
      }
      .creator {
        input {
          width: 100px;
          height: 39px;
        }
      }
      .state {
        input {
          width: 149px;
          height: 39px;
        }
      }
    }
  }

  // 表格
  .table-card {
    margin-top: 20px;
    .table {
      .cell span {
        color: #46a0ff;
        cursor: pointer;
      }
      .cell .space {
        padding: 0 9px;
      }
      .cell .disable {
        color: red;
      }
      .space-between {
        margin: 0 9px;
      }
    }
  }
  .block {
    .el-pagination {
      width: 550px;
      margin: 30px auto 22px;
    }
  }
  // 学科弹出框
  .el-dialog {
    width: 478px;
    height: 555px;
    .el-dialog__header {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 53px;
      padding: 0;
      line-height: 53px;
      background-color: #409eff;
      font-size: 18px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      .el-dialog__title {
        color: rgba(255, 255, 255, 1);
      }
      .el-icon-close {
        color: #ffffff;
      }
    }
    .dialog-footer {
      width: 160px;
      margin: 0 auto;
    }
  }
}
</style>