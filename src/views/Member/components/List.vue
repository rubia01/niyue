<template>
    <div>
        <el-table
            :data="tableData"
            style="width: 100%;margin-bottom: 20px;"
            row-key="id"
            border
            default-expand-all
            :tree-props="{children: 'children'}">
        <el-table-column prop="id" label="用户编号"  width="180"> </el-table-column>
        <el-table-column prop="nickname" label="昵称"  width="180"></el-table-column>

        <el-table-column prop="phone" label="手机号"  width="180"></el-table-column>

       

        <el-table-column prop="status" label="状态"  width="180">
        <template v-slot="scope">
            <el-button v-if="scope.row.status === 1" type="success">启用</el-button>
            <el-button v-else type="danger">禁用</el-button>
        </template>
        </el-table-column>
        <el-table-column  label="操作"  width="180">
        <template v-slot="scope">
            <el-button type="primary" @click="edit(scope.row.uid)">编辑</el-button>
        </template>
        </el-table-column>
    </el-table>

    <el-pagination
        background
        :page-size='size'
        @current-change='curlPage'
        layout="prev, pager, next"
        :total="count">
    </el-pagination>
    
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    data(){
        return {
            currentPage:1
        }
    },
    computed:{
        ...mapGetters({
            tableData:'member/list',
            count:'member/count',
            size:'member/size'
        })
    },
    methods:{
        ...mapActions({
            requestPage:'member/pageActions',
            requestSpecs:'member/listActions',
            requestCount:'member/countActions'
        }),
        curlPage(page){
            //发起当前页请求
            this.requestPage(page)
            //发起列表请求
            this.requestSpecs()
        },
        //编辑
        edit(uid){
            this.$emit('edit',uid)
        }
    },
    mounted(){
        //发起管理员列表请求
        this.requestSpecs();
        //发起列表总数的请求
        this.requestCount()
    }
}
</script>

<style>

</style>