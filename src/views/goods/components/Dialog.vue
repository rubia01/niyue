<template>
  <el-dialog :title="info.title" :visible.sync="info.isShow" @opened="opened">
    <el-form :model="form">
      <el-form-item label="一级分类" :label-width="formLabelWidth">
        <el-select
          v-model="form.first_cateid"
          placeholder="请选择一级分类"
          @change="changeCate"
        >
          <!-- 遍历一级分类列表 -->
          <el-option
            v-for="item in cates"
            :key="item.id"
            :label="item.catename"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类" :label-width="formLabelWidth">
        <el-select v-model="form.second_cateid" placeholder="请选择二级分类">
          <!-- 遍历二级分类列表 -->
          <el-option
            v-for="item in second_cates"
            :key="item.id"
            :label="item.catename"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品名称" :label-width="formLabelWidth">
        <el-input v-model="form.goodsname" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="价格" :label-width="formLabelWidth">
        <el-input v-model="form.price" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="市场价格" :label-width="formLabelWidth">
        <el-input v-model="form.market_price" autocomplete="off"></el-input>
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
      <el-form-item label="商品规格" :label-width="formLabelWidth">
        <el-select
          v-model="form.specsid"
          placeholder="请选择商品规格"
          @change="changeSpecs"
        >
          <!-- 遍历商品规格列表 -->
          <el-option
            v-for="item in specs"
            :key="item.id"
            :label="item.specsname"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="规格属性" :label-width="formLabelWidth">
        <el-select
          v-model="form.specsattr"
          placeholder="请选择规格属性"
          multiple
        >
          <!-- 遍历规格属性列表 -->
          <el-option
            v-for="item in second_specs"
            :key="item"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否新品" :label-width="formLabelWidth">
        <el-radio v-model="form.isnew" :label="1">是</el-radio>
        <el-radio v-model="form.isnew" :label="2">否</el-radio>
      </el-form-item>
      <el-form-item label="是否热卖" :label-width="formLabelWidth">
        <el-radio v-model="form.ishot" :label="1">是</el-radio>
        <el-radio v-model="form.ishot" :label="2">否</el-radio>
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
      <el-form-item label="描述" :label-width="formLabelWidth">
        <div id="div1"></div>
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
import E from "wangeditor";
import { goodsAdd, goodsInfo, goodsDelete } from "@/request/api";
import { successAlert } from "@/utils/alert";
export default {
  props: ["info"],
  data() {
    return {
      form: {
        first_cateid: "", //一级分类id
        second_cateid: "", //二级分类id
        goodsname: "", //商品名称
        price: "", //价格
        market_price: "", //市场价格
        img: "", //图片
        specsid: "", //商品规格编号id
        specsattr: [], //规格属性
        isnew: 1, //是否新品  1:是  2:否
        ishot: 1, //是否热卖  1:是  2:否
        status: 1, //状态  1:正常  2:禁用
        description: "", //描述
      },
      formLabelWidth: "120px",
      imageUrl: "", //本地图片路径
      second_cates: [], //二级分类列表
      second_specs: [], //规格属性
      editor: null, //富文本对象

      id: "", //当前ID
    };
  },
  computed: {
    ...mapGetters({
      cates: "cate/list",
      specs: "specs/list",
    }),
  },
  methods: {
    ...mapActions({
      requestCate: "cate/listActions",
      requestSpecs: "specs/listActions",
      requestGoods:'goods/listActions',
    }),
    // 根据一级分类获取对应的二级分类
    changeCate() {
      // 1.清空二级分类
      this.form.second_cateid = "";
      // 2.获取下标
      let index = this.cates.findIndex(
        (item) => item.id === this.form.first_cateid
      );
      // 3.获取二级分类列表
      this.second_cates = this.cates[index].children;
    },
    // 根据商品规格获取对应规格属性
    changeSpecs() {
      // 清空规格属性
      this.form.specsattr = [];
      //获取下标
      let index = this.specs.findIndex((item) => item.id === this.form.specsid);
      // 获取规格属性
      this.second_specs = this.specs[index].attrs;
    },
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
      console.log(this.form.img);
    },
    // 打开dialog组件结束时的回调
    opened() {
      if (this.editor === null) {
        // 得到富文本对象
        this.editor = new E("#div1");
        // 创建富文本
        this.editor.create();
      }
    },
    // 取消功能
    cancel() {
      this.info.isShow = false;
      this.form = {
        first_cateid: "", //一级分类id
        second_cateid: "", //二级分类id
        goodsname: "", //商品名称
        price: "", //价格
        market_price: "", //市场价格
        img: "", //图片
        specsid: "", //商品规格编号id
        specsattr: [], //规格属性
        isnew: 1, //是否新品  1:是  2:否
        ishot: 1, //是否热卖  1:是  2:否
        status: 1, //状态  1:正常  2:禁用
        description: "", //描述
      };
      this.imageUrl = "";
      // html() 不传递参数为获取,传递参数为设置
      this.editor.txt.html(this.form.description);
    },
    // 商品添加
    confirm() {
      // 处理富文本
      this.form.description = this.editor.txt.html();
      goodsAdd(this.form).then((res) => {
        if (res.code === 200) {
          successAlert(res.msg);
          this.cancel();
          //更新商品列表
        }
      });
    },
    // 获取一条商品数据
    getDetail(e) {
      this.id = e;
      goodsInfo({ id: e }).then((res) => {
        if (res.code == 200) {
          this.form = res.list;
          this.changeCate();
          this.changeSpecs();
        }
      });
    },
    update() {
      console.log(this.form);
      goodsDelete({id:this.id}).then((res) => {
        if (res.code === 200) {
          // 消息提示
          successAlert(res.msg);
        }
      });

      this.form.description = this.editor.txt.html();
      goodsAdd(this.form).then((res) => {
        if (res.code === 200) {
          successAlert(res.msg);
          this.cancel();
        }
      });
    },
  },
  mounted() {
    // 1.发起商品分类请求
    this.requestCate();
    // 2.发起商品规格请求
    this.requestSpecs();
    this.requestGoods();
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