import { menuList } from '@/request/api'
// 1.声明state
const state = {
    list:[], //菜单列表
}

// 2.修改state
const mutations = {
    changeList(state,arr){
        state.list = arr;
    }
}

/**
 *  1.提交mutations
 *  2.异步请求
 *  3.自调
 */

const actions = { 
    listActions(context){ 
        // 发起菜单列表请求
        menuList({istree:true}).then(res=>{
            context.commit('changeList',res.list)
        })
    }
}

// 派生state
const getters = { 
    list(state){ 
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