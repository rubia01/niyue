<template>
  <el-table
    :data="tableData"
    style="width: 100%;margin-bottom: 20px;"
    row-key="id"
    border
    default-expand-all
    :tree-props="{children: 'children'}">
    <el-table-column prop="id" label="分类编号"  width="180"> </el-table-column>
    <el-table-column prop="catename" label="分类名称"  width="180"></el-table-column>

    <el-table-column  label="图片"  width="180">
        <template v-slot="scope">
            <img style="width:60px; height:60px" :src="$getImg + scope.row.img? $getImg + scope.row.img : ``" alt="顶级菜单">
        </template>
    </el-table-column>

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
import { mapActions, mapGetters } from 'vuex'
import { cateDel } from '@/request/api'
import { successAlert } from '@/utils/alert'

export default {
    data(){
        return {
            
        }
    },
    computed:{
        ...mapGetters({
            tableData:'cate/list'
        })
    },
    methods:{
        ...mapActions({
            requestCate:'cate/listActions'
        }),
        
        //修改一条数据
        edit(id){ 
            // 子传父
            this.$emit('edit',id)
        },
        //删除一条数据
        del(id){
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
            // 删除请求
            //发起删除请求
                cateDel({id}).then(res=>{
                    if(res.code === 200){ 
                        // 消息提示
                        successAlert(res.msg);
                        // 更新列表
                        this.requestCate();
                        //更新总数
                        // this.requestManagerCount()
                    }
                })
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
    },
    mounted(){
        //发起商品分离列表请求
        this.requestCate();
    }
}
</script>

<style>

</style>