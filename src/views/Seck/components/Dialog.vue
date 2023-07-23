<template>
    <el-dialog :title="info.title" :visible.sync="info.isShow">
        <el-form :model="form">

            <el-form-item label="活动名称" :label-width="formLabelWidth">
                <el-input v-model="form.title" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="活动期限" :label-width="formLabelWidth">
                <el-date-picker
                    :label-width="formLabelWidth"
                    v-model="value1"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>

            <!-- <el-form-item label="一级分类" :label-width="formLabelWidth">
                <el-select
                    v-model="form.first_cateid"
                    placeholder="请选择分类"
                    @change="changeCate"> -->
                <!-- 遍历一级分类列表 -->
                <!-- <el-option
                    v-for="item in cates"
                    :key="item.id"
                    :label="item.catename"
                    :value="item.id"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="二级分类" :label-width="formLabelWidth">
                <el-select 
                  v-model="form.second_cateid" 
                  placeholder="请选择分类"
                  @change="changeCateTwo"> -->
                <!-- 遍历二级分类列表 -->
                    <!-- <el-option
                        v-for="item in second_cates"
                        :key="item.id"
                        :label="item.catename"
                        :value="item.id"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="商品" :label-width="formLabelWidth" >
                <el-select v-model="form.goodsid" placeholder="请选择商品"> -->
                <!-- 遍历二级分类列表 -->
                    <!-- <el-option
                        v-for="item in goods_cates"
                        :key="item.id"
                        :label="item.goodsname"
                        :value="item.id"></el-option>
                </el-select>
            </el-form-item> -->

            <el-form-item label="状态" :label-width="formLabelWidth">
                <el-switch
                    v-model="form.status"
                    :active-value="1"
                    :inactive-value="2"
                    active-color="skyblue"
                    inactive-color="gray">
                </el-switch>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button v-if="info.isAdd" type="primary" @click="confirm">确 定</el-button>
            <el-button v-else type="primary" @click="update">修 改</el-button>
        </div>
    </el-dialog>
</template>

<script>
import { seckInfo,seckillBySid,seckAdd,seckEdit} from "@/request/api";
import { successAlert } from "@/utils/alert";
import { mapActions, mapGetters } from "vuex";
import seckill from '@/store/modules/seckill';
export default {
  props: ["info"],
  data() {
    return {
      form: {
        title: "", //限时秒杀名称
        begintime:'',//开始时间
        endtime:'',//结束时间
        first_cateid:'',//商品一级分类编号
        second_cateid:'',//商品二级分类编号
        goodsid:'',//商品编号
        status: 1, // 状态  1:正常 2:禁用
      },
      formLabelWidth: "120px",
      second_cates:[],//二级分类列表
      goods_cates:[],//商品分类列表
      value1:[],
      id:''
    };
  },
  computed: {
    ...mapGetters({
      cates: "cate/list",
      oneinfo:'seckill/oneinfo'
    }),
  },
  methods: {
    ...mapActions({
      requestCate:'cate/listActions',
      requestSeckill:'seckill/listActions',
      getOneInfo:'seckill/getOneInfo'
    }),
    // 1.取消弹框
    cancel() {
      console.log(this.value1);
      this.info.isShow = false;
      // 清空表单
      this.form = {
        title: "", //限时秒杀名称
        begintime:'',//开始时间
        endtime:'',//结束时间
        first_cateid:'',//商品一级分类编号
        second_cateid:'',//商品二级分类编号
        goodsid:'',//商品编号
        status: 1, // 状态  1:正常 2:禁用
      };
      this.second_cates = [];//二级分类列表
      this.goods_cates = [];//商品分类列表
      this.value1 = [];
    },

    // 根据一级分类获取对应的二级分类
    changeCate(){
        // 1.清空二级分类
        this.form.second_cateid = '';
        // 2.获取下标
        let index =  this.cates.findIndex(item=>item.id===this.form.first_cateid);
        // 3.获取二级分类列表
        this.second_cates = this.cates[index].children;
    },
    //根据二级分类获取商品分类
    changeCateTwo(){
      let sid = this.form.second_cateid;
      seckillBySid({sid}).then(res => {
        this.goods_cates = res.list
      })
    },

    // 添加
    confirm() {
      this.form.begintime = (Date.parse(this.value1[0])).toString()
      this.form.endtime = Date.parse(this.value1[1]).toString()
      // 发起添加请求
      seckAdd(this.form).then((res) => {
        if (res.code === 200) {
          // 消息提示
          successAlert(res.msg);
          // 取消弹框
          this.cancel();
          // 更新列表
          this.requestSeckill()
        }
      });
    },
    // 获取一条数据信息
    getDetail(id) {
      this.id = id
      this.getOneInfo(id)
      
      seckInfo({id}).then((res) => {
        console.log(res)
        if (res.code === 200) {
          //开始与截至时间
          this.value1 = [new Date(Number(res.list.begintime)),new Date(Number(res.list.endtime))]
          console.log(res.list)
          this.form = res.list

          // 1.清空二级分类
          this.form.second_cateid = '';
          // 2.获取下标
          let index =  this.cates.findIndex(item=>item.id===this.form.first_cateid);
          this.second_cates = this.cates[index].children


          let indexTwo = this.cates[index].children.findIndex(item => item.id === this.form.goodsid);
          console.log(this.cates[index].children)
          console.log(indexTwo)

          // this.second_cates = this.cates[index].children[indexTwo];

          // this.form.second_cateid = this.cates[index].children[indexTwo]
          console.log(this.cates[index])

          this.changeCateTwo()
        }
      });
    },
    // 更新
    update() {
      this.form.id = this.id
      seckEdit(this.form).then((res) => {
        if (res.code === 200) {
          // 消息提示
          successAlert(res.msg);
          // 弹框消失
          this.cancel();
          // 列表的更新
          this.requestSeckill();
        }
      });
    },
  },
  mounted() {
    // 1.请求菜单列表
    this.requestCate();
  },
};
</script>

<style>
</style>