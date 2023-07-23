<template>
  <el-dialog :title="info.title" :visible.sync="info.isShow">
    <el-form :model="form">
      <el-form-item label="角色名称" :label-width="formLabelWidth">
        <el-input v-model="form.rolename" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="角色权限" :label-width="formLabelWidth">
        <el-tree
          ref="tree"
          :data="data"
          show-checkbox
          node-key="id"
          :default-checked-keys="defaultKeys"
          :default-expanded-keys="[2, 3]"
          :props="defaultProps"
        >
        </el-tree>
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
import { roleAdd, roleOne, roleEdit } from "@/request/api";
import { successAlert } from "@/utils/alert";

export default {
  props: ["info"],
  data() {
    return {
      form: {
        rolename: "", //角色名称
        menus: [], //角色权限
        status: 1, //状态：1正常 2禁用
      },
      formLabelWidth: "120px",
      defaultProps: {
        children: "children",
        label: "title",
      },
      defaultKeys: [], //默认选中
      nodekey: "",
    };
  },
  computed: {
    ...mapGetters({
      data: "menu/list",
    }),
  },
  methods: {
    ...mapActions({
      requestMenu: "menu/listActions",
      requestRole: "role/listActions",
    }),
    // 取消弹框
    cancel() {
      this.info.isShow = false;
      this.form = {
        rolename: "", //角色名称
        menus: "", //角色权限
        status: 1, //状态：1正常 2禁用
      };
      // 取消勾选
      this.$refs.tree.setCheckedKeys([]);
    },
    // 提交
    confirm() {
      // 1.给menus设置数据
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      const regex = /^[0-9a-zA-Z,]/;
      if (!regex.test(this.form.menus.charAt(0))) {
        console.log(this.form.menus);
        let menus = String(this.form.menus).substr(1);
        menus = menus.substring(0, menus.length - 1);
        this.form.menus = menus;
      }
      // 角色添加的请求
      roleAdd(this.form).then((res) => {
        if (res.code === 200) {
          // 消息提示
          successAlert(res.msg);
          // 取消弹框
          this.cancel();
          // 更新列表
          this.requestRole();
        }
      });
    },
    getDetail(id) {
      roleOne({ id }).then((res) => {
        if (res.code === 200) {
          this.form = res.list;
          this.form.id = id;
          this.form.menus = res.list.menus;
          this.$refs.tree.setCheckedKeys(
            res.list.menus.split(",").map((item) => {
              return Number(item);
            }),
            false
          );
        }
      });
    },
    // 更新
    update() {
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      console.log(typeof this.form.menus);
      const regex = /^[0-9a-zA-Z,]/;
      if (!regex.test(this.form.menus.charAt(0))) {
        console.log(this.form.menus);
        let menus = String(this.form.menus).substr(1);
        menus = menus.substring(0, menus.length - 1);
        this.form.menus = menus;
      }
      roleEdit(this.form).then((res) => {
        console.log(res);
        // 消息提示
        successAlert(res.msg);
        // 弹框消失
        this.cancel();
        // 列表的更新
        this.requestRole();
      });
    },
  },
  mounted() {
    // 1.发起菜单列表请求
    this.requestMenu();
  },
};
</script>

<style>
</style>