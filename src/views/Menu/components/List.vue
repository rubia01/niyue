<template>
  <el-table
    :data="tableData"
    style="width: 100%;margin-bottom: 20px;"
    row-key="id"
    border
    default-expand-all
    :tree-props="{children: 'children'}">
    <el-table-column prop="id" label="菜单编号"  width="180"> </el-table-column>
    <el-table-column prop="title" label="菜单名称"  width="180"></el-table-column>
    <el-table-column prop="icon" label="菜单图标"  width="180"></el-table-column>
    <el-table-column prop="url" label="菜单地址"  width="180"></el-table-column>

    <el-table-column prop="status" label="菜单状态"  width="180">
        <template v-slot="scope">
            <el-button v-if="scope.row.status === 1" type="success">启用</el-button>
            <el-button v-else type="danger">禁用</el-button>
        </template>
    </el-table-column>
    
    <el-table-column  label="菜单操作"  width="180">
        <!-- 插槽作用域 -->
        <template v-slot="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
        </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import {menuDel } from '@/request/api'
import {successAlert } from '@/utils/alert'
export default {
  data(){ 
    return { 
    }
  },
  computed:{
    ...mapGetters({
      tableData:'menu/list'
    })
  },
  methods:{
    ...mapActions({
      requestMenu:'menu/listActions',
    }),
    // 删除一条数据
    del(id){ 
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 删除请求
          //发起删除请求
            menuDel({id}).then(res=>{
              if(res.code === 200){ 
                // 消息提示
                successAlert(res.msg);
                // 更新列表
                this.requestMenu();
              }
      })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    // 编辑
    edit(id){ 
      // 子传父
      this.$emit('edit',id)
    }
  },
  mounted(){ 
    // 发起菜单列表请求
    this.requestMenu();
  }
}
</script>

<style>

</style>