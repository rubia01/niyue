<template>
  <div>
    <el-button type="success" @click="add">添加</el-button>
    <!-- 3.使用组件 -->
    <v-dialog  :info="info" ref="dialog"></v-dialog>
    <v-list @edit="edit"></v-list>
  </div>
</template>

<script>
import vDialog from './components/Dialog.vue'
import vList from './components/List.vue'
export default {
  data(){
    return { 
      info:{ 
        isShow:false,
        title:'', 
        isAdd:true,
      }
    }
  },
  components:{
    vDialog,
    vList,
  },
  methods:{
    add(){ 
      this.info.isShow = true;
      this.info.title = '添加角色';
      this.info.isAdd = true;
    },
    edit(id){
      this.info.isShow = true,
      this.info.title = '编辑角色',
      this.info.isAdd = false,
      // 通过父组件操作子组件的方法
      this.$refs.dialog.getDetail(id);
     }
  }
}
</script>

<style>

</style>