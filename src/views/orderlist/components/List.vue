<template>
  <el-table
    :data="orderlist.orderData"
    style="width: 100%;margin-bottom: 20px;"
    row-key="id"
    border
    default-expand-all
    :tree-props="{children: 'children'}">
    <el-table-column prop="ordernumber" label="订单编号"  width="180"> </el-table-column>
    <!-- <el-table-column prop="tradeno" label="交易号"  width="260"></el-table-column> -->
    <el-table-column prop="countmoney" label="支付金额"  width="100"></el-table-column>
    <el-table-column prop="countnumber" label="商品数量"  width="80"></el-table-column>
    <el-table-column prop="addtime" label="交易时间"  width="180"></el-table-column>
    <el-table-column prop="nickname" label="用户名"  width="140"></el-table-column>

    <el-table-column prop="status" label="状态"  width="140">
        <template v-slot="scope">
            <el-button v-if="scope.row.status === 1" type="success">待发货</el-button>
            <el-button v-else-if="scope.row.status === 0" type="danger">待付款</el-button>
            <el-button v-else-if="scope.row.status === 2" type="info">已发货</el-button>
        </template>
    </el-table-column>
    
    <el-table-column  label="操作"  width="180">
        <!-- 插槽作用域 -->
        <template v-slot="scope">
          <el-button v-if="scope.row.status === 1" type="success" @click="issue(scope.row)">确认发货</el-button>
            <el-button v-else-if="scope.row.status === 0" type="danger">用户未付款</el-button>
            <el-button v-else-if="scope.row.status === 2" type="info">已发货</el-button>
        </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import {successAlert } from '@/utils/alert'
export default {
  data(){ 
    return { 
    }
  },
  computed:{
    ...mapGetters({
      orderlist:'order/orderlist'
    })
  },
  methods:{
    ...mapActions({
      orderall:'order/orderallActions'
    }),
    // 设置
    issue(data){ 
      console.log(data)
      // 子传父
      this.$emit('edit',data)
    }
  },
  mounted(){ 
    this.orderall({size:'10000'})
  }
}
</script>

<style>

</style>