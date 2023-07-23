<template>
 <el-dialog :title="info.title" :visible.sync="info.isShow">
    <el-form :model="form">

        <el-form-item label="所属角色" :label-width="formLabelWidth">
            <el-select v-model="form.roleid" placeholder="请选择角色">
                <el-option v-for="item in roles" :key="item.id" :label="item.rolename" :value="item.id"></el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="用户名" :label-width="formLabelWidth">
            <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="密码" :label-width="formLabelWidth">
            <el-input type="password" v-model="form.password" autocomplete="off"></el-input>
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
import { mapActions, mapGetters } from 'vuex';
import { mangerAdd , managerOne , managerDit} from '@/request/api'
import {successAlert} from '@/utils/alert'

export default {
    props:['info'],
    data(){
        return {
            form:{
                roleid:'',//角色编号
                username:'',//管理员名称
                password:'',//密码
                status:1//状态 1正常 2禁用
            },
            formLabelWidth:'120px',
        }
    },
    computed:{
        ...mapGetters({
            roles:'role/list'
        })
    },
    methods:{
        ...mapActions({
            requestRole:'role/listActions',
            requestManager:'manager/listActions',
            requestManagerCount:'manager/countActions'
        }),
        //取消
        cancel(){
            this.info.isShow = false,
            this.form = {
                roleid:'',//角色编号
                username:'',//管理员名称
                password:'',//密码
                status:1//状态 1正常 2禁用
            }
        },
        //添加
        confirm(){
            mangerAdd(this.form).then(res => {
                if(res.code === 200){
                    //消息提示
                    successAlert(res.msg)
                    //关闭弹窗
                    this.cancel()
                    //列表刷新
                    this.requestManager()
                    //总数更新
                    this.requestManagerCount()
                }
            })
        },
        getDetail(uid){ 
            managerOne({uid}).then(res=>{
                if(res.code === 200){ 
                    this.form = res.list;
                    this.form.id = res.id;
                }
            })
        },
        //修改
        update(){
            managerDit(this.form).then(res => {
                if(res.code === 200){
                    //消息提示
                    successAlert(res.msg)
                    //关闭弹窗
                    this.cancel()
                    //列表刷新
                    this.requestManager()
                    //总数更新
                    this.requestManagerCount()
                }
            })
        },
    },
    mounted(){
        this.requestRole();
    }
}
</script>

<style>

</style>