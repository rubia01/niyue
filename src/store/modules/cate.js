import { cateList } from '@/request/api'

const state = {
    list:[]
}
const mutations = {
    changeList(state , arr){
        state.list = arr
    }
}
const actions = {
    listActions(context){
        cateList({istree:true}).then(res => {
            if(res.code === 200){
                context.commit('changeList',res.list)
            }
        })
    }
}
const getters = {
    list(state){
        return state.list
    }
}
export default { 
    state,
    mutations,
    actions,
    getters,
    namespaced:true,
}