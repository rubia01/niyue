<template>
 <el-dialog :title="info.title" :visible.sync="info.isShow">
    <el-form :model="form">

        <el-form-item label="手机号" :label-width="formLabelWidth">
            <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="昵称" :label-width="formLabelWidth">
            <el-input v-model="form.nickname" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="密码" :label-width="formLabelWidth">
            <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>



         <el-form-item label="状态" :label-width="formLabelWidth">
           <el-switch v-model="form.status" :active-value="1" :inactive-value="2" active-color="skyblue" inactive-color="gray">
            </el-switch>
        </el-form-item>


    </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button  type="primary" @click="update" >修 改</el-button>
    </div>
    </el-dialog>
</template>

<script>

import { mapActions, mapGetters } from 'vuex';
import { warnningAlert, successAlert } from '@/utils/alert';
import { memberInfo , memberEdit} from '@/request/api'

export default {
    props:['info'],
    data(){
        return {
            form:{
                uid:'',
                nickname:'',
                phone:'',
                password:'',
                status:1
            },
            formLabelWidth:'120px',
        }
    },
    computed:{
        ...mapGetters({
            
        })
    },
    methods:{
        ...mapActions({
            requestSpecs:'member/listActions',
            requestCount:'member/countActions'
        }),
        //取消
        cancel(){
            this.info.isShow = false;
            this.form = {
                nickname:'',//商品规格名称
                phone:'',//规格属性
                password:'',
                status:1
            };
            this.attrArr = [{value:''}]
        },
        
        getDetail(uid){ 
            memberInfo({uid}).then(res=>{
                console.log(res)
                if(res.code === 200){ 
                    this.form.uid = res.list.uid,
                    this.form.nickname = res.list.nickname;
                    this.form.phone = res.list.phone;
                    this.form.status = res.list.status
                }
            })
        },
        //修改
        update(){
            if(!this.form.password){
                warnningAlert('取消修改');
                this.cancel();
                return
            }
            memberEdit(this.form).then(res => {
                if(res.code === 200){
                    // 消息提示
                    successAlert(res.msg);
                    // 弹框消失
                    this.cancel();
                    // 列表的更新
                    this.requestSpecs();
                }
            })
        },
    },
}
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
        border-color: #409EFF;
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