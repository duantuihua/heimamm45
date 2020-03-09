<template>
  <!-- opened 事件会在对话框打开后执行 -->
  <el-dialog
    title="发布题目"
    :visible.sync="dialogFormVisible"
    fullscreen
    center
    class="edit_dialog"
    @opened="opened"
  >
    <el-form :model="form" label-position="left" :rules="rules" ref="form">
      <el-form-item label="学科" :label-width="formLabelWidth" prop="subject">
        <el-select v-model="form.subject" placeholder="请选择学科">
          <!-- 组件间传值进行渲染 -->
          <el-option
            :label="item.name"
            :value="item.id"
            v-for="item in $parent.subjectList"
            :key="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="阶段" :label-width="formLabelWidth" prop="step">
        <el-select v-model="form.step" placeholder="请选择阶段">
          <el-option label="初级" :value="1"></el-option>
          <el-option label="中级" :value="2"></el-option>
          <el-option label="高级" :value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="企业" :label-width="formLabelWidth" prop="enterprise">
        <el-select v-model="form.enterprise" placeholder="请选择企业">
          <el-option
            :label="item.name"
            :value="item.id"
            v-for="item in $parent.enterpriseList"
            :key="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <!-- 级联选择器 -->
      <el-form-item label="城市" :label-width="formLabelWidth" prop="city">
        <el-cascader v-model="form.city" :options="options" :props="{ expandTrigger: 'hover' }"></el-cascader>
      </el-form-item>

      <!-- 题型 -->
      <el-form-item label="题型" :label-width="formLabelWidth" prop="type">
        <el-radio-group v-model="form.type">
          <el-radio :label="1">单选</el-radio>
          <el-radio :label="2">多选</el-radio>
          <el-radio :label="3">简答</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="难度" :label-width="formLabelWidth" prop="difficulty">
        <el-radio-group v-model="form.difficulty">
          <el-radio :label="1">简单</el-radio>
          <el-radio :label="2">一般</el-radio>
          <el-radio :label="3">困难</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 分割线 -->
      <el-divider></el-divider>

      <el-form-item label="试题标题" :label-width="formLabelWidth" prop="title"></el-form-item>
      <div class="title"></div>
      <div class="title_content">
        <!-- <p>请输入标题</p> -->
      </div>

      <!-- 单选 -->
      <el-form-item label="单选" label-width="60px" prop="single_select_answer" v-if="form.type==1">
        <el-radio-group v-model="form.single_select_answer">
          <!-- AAA -->
          <div class="check">
            <el-radio label="A"></el-radio>
            <el-input v-model="form.select_options[0].text"></el-input>
            <!-- 图片上传框 -->
            <el-upload
              name="file"
              class="avatar-uploader"
              :action="uploadUrl"
              :show-file-list="false"
              :on-success="handleAvatarSuccessA"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrlA" :src="imageUrlA" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
          <!-- BBB -->
          <div class="check">
            <el-radio label="B"></el-radio>
            <el-input v-model="form.select_options[1].text"></el-input>
            <!-- 图片上传框 -->
            <el-upload
              name="file"
              class="avatar-uploader"
              :action="uploadUrl"
              :show-file-list="false"
              :on-success="handleAvatarSuccessB"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrlB" :src="imageUrlB" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
          <!-- CCC -->
          <div class="check">
            <el-radio label="C"></el-radio>
            <el-input v-model="form.select_options[2].text"></el-input>
            <!-- 图片上传框 -->
            <el-upload
              name="file"
              class="avatar-uploader"
              :action="uploadUrl"
              :show-file-list="false"
              :on-success="handleAvatarSuccessC"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrlC" :src="imageUrlC" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
          <!-- DDD -->
          <div class="check">
            <el-radio label="D"></el-radio>
            <el-input v-model="form.select_options[3].text"></el-input>
            <!-- 图片上传框 -->
            <el-upload
              name="file"
              class="avatar-uploader"
              :action="uploadUrl"
              :show-file-list="false"
              :on-success="handleAvatarSuccessD"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrlD" :src="imageUrlD" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </el-radio-group>
      </el-form-item>

      <!-- 多选 -->
      <el-form-item
        label="多选"
        label-width="60px"
        prop="multiple_select_answer"
        v-else-if="form.type==2"
      >
        <el-checkbox-group v-model="form.multiple_select_answer">
          <!-- AAA -->
          <div class="check">
            <el-checkbox label="A"></el-checkbox>
            <el-input v-model="form.select_options[0].text"></el-input>
            <!-- 图片上传框 -->
            <el-upload
              name="file"
              class="avatar-uploader"
              :action="uploadUrl"
              :show-file-list="false"
              :on-success="handleAvatarSuccessA"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrlA" :src="imageUrlA" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
          <!-- BBB -->
          <div class="check">
            <el-checkbox label="B"></el-checkbox>
            <el-input v-model="form.select_options[1].text"></el-input>
            <!-- 图片上传框 -->
            <el-upload
              name="file"
              class="avatar-uploader"
              :action="uploadUrl"
              :show-file-list="false"
              :on-success="handleAvatarSuccessB"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrlB" :src="imageUrlB" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
          <!-- CCC -->
          <div class="check">
            <el-checkbox label="C"></el-checkbox>
            <el-input v-model="form.select_options[2].text"></el-input>
            <!-- 图片上传框 -->
            <el-upload
              name="file"
              class="avatar-uploader"
              :action="uploadUrl"
              :show-file-list="false"
              :on-success="handleAvatarSuccessC"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrlC" :src="imageUrlC" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
          <!-- DDD -->
          <div class="check">
            <el-checkbox label="D"></el-checkbox>
            <el-input v-model="form.select_options[3].text"></el-input>
            <!-- 图片上传框 -->
            <el-upload
              name="file"
              class="avatar-uploader"
              :action="uploadUrl"
              :show-file-list="false"
              :on-success="handleAvatarSuccessD"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrlD" :src="imageUrlD" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </el-checkbox-group>
      </el-form-item>

      <!-- 简答题 -->
      <el-form-item
        label-width="80px"
        prop="short_answer"
        v-else-if="form.type==3"
        label="简答题"
        class="short_answer"
      >
        <el-input type="textarea" rows="2" v-model="form.short_answer"></el-input>
      </el-form-item>

      <!-- 分割线 -->
      <el-divider></el-divider>
      <!-- 视频上传 -->
      <el-form-item label="视频解析" :label-width="formLabelWidth" v-model="form.video">
        <el-upload
          class="upload-demo"
          :action="uploadUrl"
          :on-success="handleVideoSuccess"
          :before-upload="beforeVideoUpload"
        >
          <el-button size="small" type="success">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传视频，且大小为2KB</div>
        </el-upload>
      </el-form-item>
      <video :src="videoUrl" controls autoplay style="width:300px;" v-if="videoUrl"></video>

      <el-form-item label="答案解析" :label-width="formLabelWidth" prop="answer_analyze"></el-form-item>
      <div class="answer"></div>
      <div class="answer_content">
        <!-- <p>请输入答案</p> -->
      </div>

      <el-form-item label="试题备注" :label-width="formLabelWidth" class="martop" prop="remark">
        <el-input v-model="form.remark" type="textarea" rows="2"></el-input>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
// 导入富文本编辑器
import wangeditor from "wangeditor";
// 导入省市区数据
import { regionDataPlus } from "element-china-area-data";

// 导入接口
import { questionAdd } from "@/api/question";

export default {
  data() {
    return {
      options: regionDataPlus, // 级联选择器的数据
      city: [], // 级联选择器绑定的值
      subjectList: "",
      videoUrl: "", // 本地视频预览地址
      uploadUrl: process.env.VUE_APP_BASEURL + "/question/upload", // 图片上传地址
      imageUrlA: "", //本地图片路径
      imageUrlB: "", //本地图片路径
      imageUrlC: "", //本地图片路径
      imageUrlD: "", //本地图片路径
      dialogFormVisible: false,
      formLabelWidth: "120px",
      // 标题富文本编辑器
      titleEditor: undefined,
      // 答案富文本编辑器
      answerEditor: undefined,
      form: {
        subject: "", // 学科
        step: "", //阶段
        enterprise: "", // 企业
        city: [], // 城市
        single_select_answer: "", // 单选题答案
        multiple_select_answer: [], // 多选题答案
        short_answer: "", // 简答题
        difficulty: "", // 难度
        type: "", // 题型
        video: "", // 表单提交的视频地址
        remark: "", // 备注
        title: "", // 题目标题
        answer_analyze: "", // 答案解析
        radio: 3,
        name: "",
        delivery: false,
        // 单选题选项，介绍，图片介绍
        select_options: [
          {
            label: "A",
            text: "狗不理",
            image: "upload/20191129/fd5f03a07d95e3948860240564b180e4.jpeg"
          },
          {
            label: "B",
            text: "猫不理",
            image: "upload/20191129/e93e7bb72accda7f3159cdabc4203991.jpeg"
          },
          {
            label: "C",
            text: "麻花",
            image: "upload/20191129/b7caf98be9d0aa6764b0112ba0dfa19e.jpeg"
          },
          {
            label: "D",
            text: "炸酱面",
            image: "upload/20191129/4067f19ab53a5e8388ad3459e23110f0.jpeg"
          }
        ]
      },
      // 表单验证
      rules: {
        subject: [{ required: true, message: "请输入学科", trigger: "blur" }],
        step: [{ required: true, message: "请输入阶段", trigger: "blur" }],
        enterprise: [
          { required: true, message: "请输入企业", trigger: "blur" }
        ],
        city: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
        type: [{ required: true, message: "请选择题型", trigger: "blur" }],
        difficulty: [
          { required: true, message: "请选择难度", trigger: "blur" }
        ],
        single_select_answer: [
          { required: true, message: "请输入答案", trigger: "blur" }
        ],
        multiple_select_answer: [
          { required: true, message: "请输入答案", trigger: "blur" }
        ],
        short_answer: [
          { required: true, message: "请输入答案", trigger: "blur" }
        ],
        remark: [{ required: true, message: "请输入备注", trigger: "blur" }],
        title: [{ required: true, message: "请输入试题标题", trigger: "blur" }],
        answer_analyze: [
          { required: true, message: "请输入答案解析", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    opened() {
      // 如果已经存在富文本,则不再创建
      if (this.titleEditor == undefined) {
        this.titleEditor = new wangeditor(".title", ".title_content");
        // 获取富文本中输入的内容
        this.titleEditor.customConfig.onchange = html => {
          // html 即变化之后的内容
          // window.console.log(html);
          this.form.title = html;
        };
        this.titleEditor.create();
      }
      if (this.answerEditor == undefined) {
        this.answerEditor = new wangeditor(".answer", ".answer_content");
        // 获取富文本中输入的内容
        this.answerEditor.customConfig.onchange = html => {
          // html 即变化之后的内容
          // window.console.log(html);
          this.form.answer_analyze = html;
        };
        this.answerEditor.create();
      }
    },

    // 图片上传方法
    // AAA
    handleAvatarSuccessA(res, file) {
      // 本地路径,用来图片预览
      this.imageUrlA = URL.createObjectURL(file.raw);
      // res 图片上传接口返回来的数据
      this.form.select_options[0].image = res.data.url;
    },
    // BBB
    handleAvatarSuccessB(res, file) {
      this.imageUrlB = URL.createObjectURL(file.raw);
      this.form.select_options[1].image = res.data.url;
    },
    // CCC
    handleAvatarSuccessC(res, file) {
      this.imageUrlC = URL.createObjectURL(file.raw);
      this.form.select_options[2].image = res.data.url;
    },
    // DDD
    handleAvatarSuccessD(res, file) {
      this.imageUrlD = URL.createObjectURL(file.raw);
      this.form.select_options[3].image = res.data.url;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片是 JPG 格式或者 png格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 视频上传
    handleVideoSuccess(res, file) {
      this.videoUrl = URL.createObjectURL(file.raw);
      window.console.log(res);
      this.form.video = res.data.url;
      // this.form.select_options[3].image = res.data.url;
    },
    beforeVideoUpload(file) {
      const isJPG = file.type === "video/mp4";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传视频是MP4格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传视频大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },

    // 发布题目
    submit() {
      questionAdd(this.form).then(res => {
        window.console.log(res);
        if (res.code == 200) {
          this.$message.success("添加成功啦!!");
          this.dialogFormVisible = false;
          // 清空表单
          this.$refs.form.resetFields();
          // 清空富文本中的内容
          this.titleEditor.txt.html("");
          this.answerEditor.txt.html("");
          // 清空选项图片
          this.imageUrlA = ""; //本地图片路径
          this.imageUrlB = ""; //本地图片路径
          this.imageUrlC = ""; //本地图片路径
          this.imageUrlD = ""; //本地图片路径
          // 清空ABCD选项

          this.form.select_options.forEach(item => {
            item.text = "";
            item.image = "";
          });
        } else {
          this.$message.error("题目添加失败啦,检查格式是否正确");
        }
      });
    }
  }
};
</script>

<style lang="less">
.edit_dialog {
  .el-dialog__header {
    background-color: #0da7fa;
    .el-dialog__close {
      color: #fff;
    }
  }

  .el-dialog__body {
    width: 840px;
    margin: 0 auto;
    .el-select input {
      width: 364px;
    }
    .martop {
      margin-top: 30px;
    }
    .el-cascader {
      input {
        width: 364px;
      }
    }

    // 富文本编辑器样式
    .title {
      border: 1px solid #3f3f3f;
    }
    .title_content {
      height: 100px;
      border: 1px solid #3f3f3f;
      border-top: none;
    }
    .answer {
      border: 1px solid #3f3f3f;
    }
    .answer_content {
      height: 100px;
      border: 1px solid #3f3f3f;
      border-top: none;
    }
    .w-e-text::-webkit-scrollbar {
      display: none;
    }

    // 单选框
    .check {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 30px 0;
      input {
        width: 476px;
        margin: 0 20px;
      }
    }
    // 简答题
    .short_answer {
      .el-form-item {
        margin-top: 30px;
      }
    }
    // 图片上传的样式
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
  }
}
</style>