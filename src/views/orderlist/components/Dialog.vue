<template>
  <el-dialog :title="info.title" :visible.sync="info.isShow">

     <el-form :model="form" ref="form" label-width="100px" class="demo-form">
        <el-form-item label="快递公司" prop="couriercode">
          <el-select v-model="form.couriercode" placeholder="请选择快递">
            <el-option value="0" label="快递公司"></el-option>
            <el-option
              v-for="item in courier"
              :key="item.id"
              :label="item.companyname"
              :value="item.companycode"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="订单物流号" prop="couriernumber">
          <el-input v-model="this.data.ordernumber"></el-input>
        </el-form-item>
      </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="update">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import {courier,orderedit} from "@/request/api";
import { successAlert } from "@/utils/alert";
export default {
  props: ["info"],
  data() {
    return {
      data: {
        status:'',
        ordernumber:''
      },
      formLabelWidth: "120px",
      courier:[],
      form: {
        couriernumber: "",
        couriercode: "",
      },
    };
  },
  computed: {
  },
  methods: {
    
    // 1.取消弹框
    cancel() {
      this.info.isShow = false;
      // 清空表单
    },
    // //进入
    getDetail(data) {
      this.data = data;
      courier().then(res => {
        this.courier = res.list;
      })
    },
    // 更新
    update() {
      this.data.status = 2
      // params.status = 
      orderedit(this.data).then(res => {
        if(res.data.code == 200){
          successAlert(res.msg);
          // 取消弹框
          this.cancel();
        }
      })
    },
  },
};
</script>

<style>
</style>