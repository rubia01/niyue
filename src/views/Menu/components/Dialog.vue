<template>
 <el-dialog :title="info.title" :visible.sync="info.isShow">
    <el-form :model="form">
        <el-form-item label="菜单名称" :label-width="formLabelWidth">
            <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单" :label-width="formLabelWidth">
            <el-select v-model="form.pid" placeholder="请选择">
                <el-option label="顶级菜单" :value="0"></el-option>
                <el-option v-for="item in menus" :key="item.id" :label="item.title" :value="item.id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="菜单类型" :label-width="formLabelWidth">
            <el-radio v-model="form.type" :label="1">目录</el-radio>
            <el-radio v-model="form.type" :label="2">菜单</el-radio>
        </el-form-item>

        <el-form-item v-if="form.type === 1" label="菜单图标" :label-width="formLabelWidth">
            <el-select v-model="form.icon" placeholder="请选择">
                <el-option v-for="item in icons" :key="item" :label="item" :value="item"></el-option>
            </el-select>
        </el-form-item>

        <el-form-item v-else label="菜单地址" :label-width="formLabelWidth">
            <el-select v-model="form.url" placeholder="请选择">
                <el-option v-for="item in urls" :key="item" :label="item" :value="item"></el-option>
            </el-select>
        </el-form-item>

         <el-form-item label="状态" :label-width="formLabelWidth">
           <el-switch v-model="form.status" :active-value="1" :inactive-value="2" active-color="skyblue" inactive-color="gray">
            </el-switch>
        </el-form-item>


    </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button v-if="info.isAdd" type="primary" @click="confirm" >确 定</el-button>
        <el-button v-else type="primary" @click="update" >修 改</el-button>
    </div>
    </el-dialog>
</template>

<script>
import { menuAdd,menuOne,menuUpdate } from '@/request/api'
import { successAlert } from '@/utils/alert'
import { mapActions, mapGetters } from 'vuex'
export default {
    props:['info'],
    data(){ 
        return { 
            icons:['el-icon-setting','el-icon-s-goods','el-icon-menu'],
            urls:['menu','role','manager', 'cate','spacs','member','goods','banner'],
            form: {
              pid:0, //上级分类  0: 顶级菜单
              title:'', //菜单名称
              icon:'', //菜单图标
              type:1, //菜单类型 1:目录， 2:菜单
              url:'', //菜单地址
              status:1, // 状态  1:正常 2:禁用
            },
            formLabelWidth: '120px'
        }
    },
    computed:{
        ...mapGetters({
            menus:'menu/list',
        })
    },
    methods:{ 
        ...mapActions({
            requestMenu:'menu/listActions',
        }),
        // 1.取消弹框
        cancel(){ 
            this.info.isShow = false;
            // 清空表单
            this.form = {
              pid:0, //上级分类  0: 顶级菜单
              title:'', //菜单名称
              icon:'', //菜单图标
              type:1, //菜单类型 1:目录， 2:菜单
              url:'', //菜单地址
              status:1, // 状态  1:正常 2:禁用
            };
        },
        // 添加
        confirm(){
            // 发起添加请求
            menuAdd(this.form).then(res=>{
                if(res.code === 200){ 
                    // 消息提示
                    successAlert(res.msg);
                    // 取消弹框
                    this.cancel();
                    // 更新列表
                    this.requestMenu();
                }
            })
        },
        // 获取一条数据信息
        getDetail(id){ 
            menuOne({id}).then(res=>{
                if(res.code === 200){ 
                    this.form = res.list;
                    this.form.id = id;
                }
            })
        },
        // 更新
        update(){
            menuUpdate(this.form).then(res=>{
                if(res.code === 200){ 
                    // 消息提示
                    successAlert(res.msg);
                    // 弹框消失
                    this.cancel();
                    // 列表的更新
                    this.requestMenu();
                }
            })
        }
    },
    mounted(){
        // 1.请求菜单列表
        this.requestMenu();
    }
}
</script>

<style>

</style>