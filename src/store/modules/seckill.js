import { seckList} from '@/request/api'


const state = {
    list:[],//商品规格总数
    oneInfo:{}
}
const mutations = {
    changeList(state,arr){
        state.list = arr
    },
    changeoneInfo(state,arr){
        state.oneInfo = arr
    }
}
const actions = {
      listActions(context){
        seckList().then(res => {
            if(res.code === 200){
                context.commit('changeList',res.list)
            }
        })
      },
      getOneInfo(context,data){
        let oneInfoIndex = state.list.findIndex(item => {
            return item.id == data
        })
        let oneinfo = state.list[oneInfoIndex]
        context.commit('changeoneInfo',oneinfo)
      }
}
const getters = {
    list(state){
        return state.list
    },
    oneinfo(state){
        return state.oneInfo
    }

}

export default{
    state,
    mutations,
    actions,
    getters,
    namespaced:true
}