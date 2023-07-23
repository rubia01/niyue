import { orderall } from '@/request/api'
// 1.声明state
const state = {
    list:[], //列表
}

// 2.修改state
const mutations = {
    changeList(state,arr){
        arr.orderData.sort(function(a,b){
            return b.status-a.status
        })
        console.log(arr)
        state.list = arr;
    }
}

/**
 *  1.提交mutations
 *  2.异步请求
 *  3.自调
 */
const actions = { 
    orderallActions(context,data){ 
        console.log(data)
        orderall(data).then(res=>{
            context.commit('changeList',res.list)
        })
    }
}
// 派生state
const getters = { 
    orderlist(state){ 
        console.log(state.list)
        return state.list;
    }
}

export default { 
    state,
    mutations,
    actions,
    getters,
    namespaced:true,
}