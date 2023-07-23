<template>
  <el-dialog :title="info.title" :visible.sync="info.isShow">
    <el-form :model="form">
      <el-form-item label="规格名称" :label-width="formLabelWidth">
        <el-input v-model="form.specsname" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item
        v-for="(item, index) in attrArr"
        :key="index"
        label="规格属性"
        :label-width="formLabelWidth"
      >
        <el-col :span="18">
          <el-input v-model="item.value"></el-input>
        </el-col>
        <el-button @click="add" v-if="index === 0" type="primary"
          >添加规格属性</el-button
        >
        <el-button @click="del(index)" v-else type="danger">删除</el-button>
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
import { warnningAlert, successAlert } from "@/utils/alert";
import { specsAdd, specsInfo, specsEdit, specsDel } from "@/request/api";

export default {
  props: ["info"],
  data() {
    return {
      form: {
        specsname: "", //规格名称
        attrs: [], //规格属性
        status: 1,
      },
      formLabelWidth: "120px",
      attrArr: [{ value: "" }],
      id: "",
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({
      requestSpecs: "specs/listActions",
      requestCount: "specs/countActions",
    }),
    add() {
      this.attrArr.push({ value: "" });
    },
    //删除
    del(index) {
      this.attrArr.splice(index, 1);
    },
    //取消
    cancel() {
      this.info.isShow = false;
      this.form = {
        specsname: "", //商品规格名称
        attrs: "", //规格属性
        status: 1,
      };
      this.attrArr = [{ value: "" }];
    },
    //添加-完成
    confirm() {
      if (!this.attrArr.every((item) => item.value)) {
        warnningAlert("规格属性不能为空");
        return;
      }
      this.form.attrs = this.attrArr.map((item) => item.value).join(",");
      specsAdd(this.form).then((res) => {
        if (res.code === 200) {
          successAlert(res.msg);
          this.cancel();
          // 更新规格列表
          this.requestSpecs();
          this.requestCount();
        }
      });
    },

    getDetail(id) {
      this.id = id;
      specsInfo({ id }).then((res) => {
        if (res.code === 200) {
          this.form = res.list[0];
          this.form.id = res.list[0].id;
        }
      });
    },
    //修改
    update() {
      let id = this.id;
      specsDel({ id }).then((res) => {
        if (res.code === 200) {
          // 消息提示
          // 更新列表
          this.requestSpecs();
          //更新总数
          this.requestCount();
        }
      });
      this.confirm();
    },
  },
  mounted() {
    //请求商品分类列表
    // this.requestCate()
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