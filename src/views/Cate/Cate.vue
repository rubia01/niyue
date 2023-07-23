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
            },
        }
    },
    methods:{
        add(){
            this.info.isShow = true,
            this.info.title = '添加分类',
            this.info.isAdd = true
        },
        edit(id){
            this.info.isShow = true,
            this.info.title = '修改分类',
            this.info.isAdd = false,
            // 通过父组件操作子组件的方法
            this.$refs.dialog.getDetail(id);
        }
    },
    components:{
        vDialog,
        vList,
    },
}
</script>

<style>

</style>