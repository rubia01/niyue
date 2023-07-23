<template>
  <div>
    <el-button type="success" @click="add">添加</el-button>
    <!-- 3.使用组件 -->
    <v-dialog :info="info" ref="dialog"></v-dialog>
    <v-list @edit="edit"></v-list>
  </div>
</template>

<script>

import vDialog from './components/Dialog.vue'
import vList from './components/List'

export default {
    data(){
        return {
            info:{
                isShow:false,
                title:'',
                isAdd:true
            }
        }
    },
    components:{
        vDialog,
        vList,
    },
    methods:{
        //添加
        add(){
            this.info.isShow = true,
            this.info.title = '添加管理员',
            this.info.isAdd = true
        },
        // 编辑
        edit(uid){ 
            this.info.isShow = true;
            this.info.title = "编辑菜单";
            this.info.isAdd = false;
            // 通过父组件操作子组件的方法
            this.$refs.dialog.getDetail(uid);
        }
    }
}
</script>

<style>

</style>