<template>
  <div>
    <el-button type="success" @click="add">添加</el-button>
    <!-- 3.使用组件 -->
    <v-dialog ref="dialog" :info="info"></v-dialog>
    <v-list @edit="edit"></v-list>
  </div>
</template>

<script>
// 1.引入组件
import vDialog from './components/Dialog.vue'
import vList from './components/List.vue'
export default {
  data(){
    return { 
      info:{ 
        isShow:false,  //控制dialog组件显示
        title:'', //定义dialog标题
        isAdd:true, //是否添加
      }
    }
  },
  methods:{
    add(){ 
      this.info.isShow = true;
      this.info.title = '添加菜单'
      this.info.isAdd = true;
    },
    // 编辑
    edit(id){ 
      this.info.isShow = true;
      this.info.title = "编辑菜单";
      this.info.isAdd = false;
      // 通过父组件操作子组件的方法
      this.$refs.dialog.getDetail(id);
    }
  },
  // 2.注册组件
  components:{ 
    vDialog,
    vList,
  }
}
</script>

<style>

</style>