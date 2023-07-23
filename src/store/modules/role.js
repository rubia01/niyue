import { roleList , roleInfo} from '@/request/api'
const state = { 
    list:[], //角色列表
    info:[],//一条用户信息
}

const mutations = { 
    changeList(state,arr){ 
        state.list = arr;
    },
    changeInfo(state,arr){
        state.info = arr
    }
}

const actions = { 
    listActions(context){ 
        // 发起角色列表请求
        roleList().then(res=>{
            if(res.code === 200){ 
                context.commit('changeList',res.list);
            }
        })
    },
    infoActions(context , params){
        roleInfo(params).then(res => {
            if(res.code === 200){
                context.commit('changeInfo',res.list)
            }
        })
    }
}

const getters = { 
    list(state){ 
        return state.list;
    },
    info(state){
        return state.info
    }
}

export default { 
    state,
    mutations,
    actions,
    getters,
    namespaced:true,
}