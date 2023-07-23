<template>
 <div>
     <el-table
    :data="tableData"
    style="width: 100%;margin-bottom: 20px;"
    row-key="id"
    border
    default-expand-all
    :tree-props="{children: 'children'}">
    <el-table-column prop="id" label="商品编号"  width="100"> </el-table-column>
    <el-table-column prop="goodsname" label="商品名称"  width="150"></el-table-column>

    <el-table-column prop="price" label="商品价格"  width="150"></el-table-column>
    <el-table-column prop="market_price" label="市场价格"  width="150"></el-table-column>

    <el-table-column  label="图片"  width="180">
        <template v-slot="scope">
            <img style="width:60px; height:60px" :src="$getImg + scope.row.img" alt="">
        </template>
    </el-table-column>

    <el-table-column prop="status" label="是否新品"  width="100">
        <template v-slot="scope">
            <el-button v-if="scope.row.status === 1" type="success">是</el-button>
            <el-button v-else type="danger">否</el-button>
        </template>
    </el-table-column>

    <el-table-column prop="status" label="是否热卖"  width="100">
        <template v-slot="scope">
            <el-button v-if="scope.row.status === 1" type="success">是</el-button>
            <el-button v-else type="danger">否</el-button>
        </template>
    </el-table-column>

    <el-table-column prop="status" label="菜单状态"  width="100">
        <template v-slot="scope">
            <el-button v-if="scope.row.status === 1" type="success">启用</el-button>
            <el-button v-else type="danger">禁用</el-button>
        </template>
    </el-table-column>
    
    <el-table-column  label="操作"  width="180">
        <!-- 插槽作用域 -->
        <template v-slot="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
        </template>
    </el-table-column>
  </el-table>
  <!-- <el-pagination
        background
        :page-size='size'
        @current-change='curlPage'
        layout="prev, pager, next"
        :total="count">
    </el-pagination> -->
 </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { goodsDelete } from '@/request/api'
import { successAlert } from '@/utils/alert'

export default {
    data(){
        return {
            currentPage:1
        }
    },
    computed:{
        ...mapGetters({
            tableData:'goods/list',
            count:'goods/count',
            size:'goods/size'
        })
    },
    methods:{
        ...mapActions({
            requestGoods:'goods/listActions',
            requestGoodsCount:'goods/countActions',
            requestPage:'goods/pageActions'
        }),
        curlPage(page){
            //发起当前页请求
            this.requestPage(page)
            //发起列表请求
            this.requestGoods()
        },
        //修改一条数据
        edit(uid){ 
            // 子传父
            this.$emit('edit',uid)
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
                goodsDelete({id}).then(res=>{
                    if(res.code === 200){ 
                        // 消息提示
                        successAlert(res.msg);
                        // 更新列表
                        this.requestManager();
                        //更新总数
                        this.requestManagerCount()
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
        //发起列表请求
        this.requestGoods();
        //发起列表总数的请求
        this.requestGoodsCount()
    }
}
</script>

<style>

</style>