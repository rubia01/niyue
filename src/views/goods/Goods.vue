<template>
  <div>
     <el-button @click="add" type="success">添加</el-button>
     <v-dialog :info="info" ref="dialog"></v-dialog>
     <v-list @edit="edit"></v-list>
  </div>
</template>

<script>
import vDialog from './components/Dialog'
import vList from './components/List'
export default {
    data(){
        return{
            info:{
                isShow:false,
                title:'',
                isAdd:true
            }
        }
    },
    methods:{
        add(){
            this.info.isShow = true;
            this.info.title = '添加分类';
            this.info.isAdd = true;
        },
        // 编辑
        edit(uid){ 
            this.info.isShow = true;
            this.info.title = "编辑菜单";
            this.info.isAdd = false;
            // 通过父组件操作子组件的方法
            this.$refs.dialog.getDetail(uid);
        }
    },
    components:{
        vDialog,
        vList
    }
}
</script>

<style>

</style>