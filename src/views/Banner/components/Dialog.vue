<template>
  <el-dialog :title="info.title" :visible.sync="info.isShow">
    <el-form :model="form">
      <el-form-item label="标题" :label-width="formLabelWidth">
        <el-input v-model="form.title" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="图片" :label-width="formLabelWidth">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-change="changeImg"
        >
          <img
            v-if="form.img"
            :src="'http://localhost:3000' + form.img"
            class="avatar"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="状态" :label-width="formLabelWidth">
        <el-switch
          v-model="form.status"
          active-color="skyblue"
          inactive-color="grey"
          :active-value="1"
          :inactive-value="2"
        ></el-switch>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button v-if="info.isAdd" type="primary" @click="confirm"
        >确 定</el-button
      >
      <el-button v-else type="primary" @click="update">修 改</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { bannerAdd, bannerInfo, bannerEdit,bannerDelete } from "@/request/api";
import { successAlert, errorAlert } from "@/utils/alert";
export default {
  props: ["info"],
  data() {
    return {
      form: {
        title: "", //标题
        img: "", //图片
        status: 1, //状态  1:正常  2:禁用
      },
      formLabelWidth: "120px",
      imageUrl: "", //本地图片路径
      id:''
    };
  },
  computed: {
    ...mapGetters({
      banners: "banner/list",
    }),
  },
  methods: {
    ...mapActions({
      requestBanner: "banner/listActions",
    }),

    // 处理图片
    changeImg(file) {
      // 1.处理文件大小  判断文件大小不能超过2M,
      if (file.size > 10 * 1024 * 1024) {
        errorAlert("文件大小不能超过10M");
        return;
      }
      // 2.处理文件格式
      let ext = [".png", ".jpeg", ".jpg", ".gif"];
      let extName = file.name.slice(file.name.lastIndexOf("."));
      if (!ext.some((item) => item === extName)) {
        errorAlert("文件格式不正确");
        return;
      }
      // 3.生成本地图片地址
      this.imageUrl = URL.createObjectURL(file.raw);

      // 4.将文件资源存入img
      this.form.img = file.raw;
    },

    // 取消功能
    cancel() {
      this.info.isShow = false;
      this.form = {
        titile: "", //标题
        img: "", //图片
        status: 1, //状态  1:正常  2:禁用
      };
      this.imageUrl = "";
    },
    // banner添加
    confirm() {
      if (!this.form.titile && !this.form.img) {
        successAlert("取消添加");
        this.cancel();
        return;
      }
      console.log(this.form)
      bannerAdd(this.form).then((res) => {
        console.log(res);
        if (res.code === 200) {
          successAlert(res.msg);
          this.cancel();
          this.requestBanner();
        }
      });
    },

    getDetail(id) {
      bannerInfo({ id }).then((res) => {
        console.log(res);
        if (res.code === 200) {
          this.id = id;
          this.form.title = res.list.title;
          this.form.status = res.list.status;
          this.form.img = res.list.img;
        }
      });
    },
    // banner修改
    update() {
    //   if (!this.form.title && !this.form.img) {
    //     errorAlert("取消修改");
    //     this.cancel();
    //     return;
    //   }
    //   bannerEdit(this.form).then((res) => {
    //     successAlert(res.msg);
    //     this.cancel();
    //     this.requestBanner();
    //   });
    let id = this.id
    bannerDelete({ id }).then((res) => {
            if (res.code === 200) {
              // 更新列表
              this.requestBanner();
            }
          });
          bannerAdd(this.form).then((res) => {
        console.log(res);
        if (res.code === 200) {
          successAlert(res.msg);
          this.cancel();
          this.requestBanner();
        }
      });
    },
  },
  mounted() {
    // 1.发起列表请求
    this.requestBanner();
  },
};
</script>

<style scoped>
/* >>> : 穿透 */
.avatar-uploader >>> .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader >>> .el-upload:hover {
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
</style>