<template>
  <el-dialog :title="info.title" :visible.sync="info.isShow">
    <el-form :model="form">
      <el-form-item label="上层分类" :label-width="formLabelWidth">
        <el-select v-model="form.pid" placeholder="请选择上级分类">
          <el-option label="顶级分类" :value="0"></el-option>
          <!-- 遍历顶级分类 -->
          <el-option
            v-for="item in cates"
            :key="item.id"
            :label="item.catename"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="分类名称" :label-width="formLabelWidth">
        <el-input v-model="form.catename" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="图片" :label-width="formLabelWidth">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-change="changeImg"
          :show-file-list="false"
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
          :active-value="1"
          :inactive-value="2"
          active-color="skyblue"
          inactive-color="gray"
        >
        </el-switch>
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
import { cateAdd, cateInfo, cateEdit, cateDel } from "@/request/api";
import { successAlert, errorAlert } from "@/utils/alert";

export default {
  props: ["info"],
  data() {
    return {
      form: {
        pid: 0, //上级分类属性
        catename: "", //商品分类
        img: "", //图片地址
        status: 1, //状态
      },
      id: "",
      formLabelWidth: "120px",
      imageUrl: "", //本地文件地址
      // id分类编号pid上级分类编号catename商品分类名称img图片status
    };
  },
  computed: {
    ...mapGetters({
      cates: "cate/list",
    }),
  },
  methods: {
    ...mapActions({
      requestCate: "cate/listActions",
    }),
    //取消
    cancel() {
      this.info.isShow = false;
      this.form = {
        pid: 0, //上级分类属性
        catename: "", //商品分类
        img: "", //图片地址
        status: 1, //状态
      };
      this.imageUrl = "";
    },
    //添加-完成
    confirm() {
      cateAdd(this.form).then((res) => {
        if (res.code === 200) {
          successAlert(res.msg);
          this.cancel();
          this.requestCate();
        }
      });
    },
    changeImg(file) {
      //处理文件大小
      if (file.size > 1024 * 1024 * 10) {
        errorAlert("文件不能超过2M");
        return;
      }
      //处理文件格式
      let ext = [".jpg", ".png", "jpeg", "gif"];
      let extName = file.name.slice(file.name.lastIndexOf("."));

      if (
        ext.some((item) => {
          item == extName;
        })
      ) {
        errorAlert("文件格式不正确");
        return;
      }
      //生成本地文件地址
      this.imageUrl = URL.createObjectURL(file.raw);
      //将文件资源存入form.img
      this.form.img = file.raw;
    },
    getDetail(id) {
      this.id = id;
      cateInfo({ id }).then((res) => {
        console.log(res);
        if (res.code === 200) {
          this.form = res.list;
          this.form.id = res.id;
        }
      });
    },
    //修改
    update() {
      this.form.id = this.id;
      cateDel({ id:this.id }).then((res) => {
        if (res.code === 200) {
          // 更新列表
          this.requestCate();
        }
      });
      cateAdd(this.form).then((res) => {
        if (res.code === 200) {
          successAlert(res.msg);
          this.cancel();
          this.requestCate();
        }
      });
      
    },
  },
  mounted() {
    //请求商品分类列表
    this.requestCate();
  },
};
</script>

<style scoped>
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