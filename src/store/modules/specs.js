import { specsList , specsCount} from '@/request/api'


const state = {
    list:[],//商品规格总数
    size:100, //每页数
    page:1, //当前页
    count:0, //总数
}
const mutations = {
    changeList(state,arr){
        state.list = arr
    },
    changeCount(state,count){
        state.count = count
    },
    changePage(state , page){
        state.page = page
    }
}
const actions = {
      listActions(context){
        let params = {
            size:context.state.size,
            page:context.state.page,
        }
        specsList(params).then(res => {
            if(res.code === 200){
                if(res.list === null && res.list.length ===0){
                    let page = context.state.page - 1
                    context.commit('changePage',page)
                    context.dispatch('listActions');
                    return
                }
                context.commit('changeList',res.list)
            }
        })
      },
      countActions(context){
        specsCount().then(res => {
            if(res.code === 200){
                context.commit('changeCount',res.list[0].total)
            }
        })
      },
      pageActions(context,page){
        context.commit('changePage',page)
      }
}
const getters = {
    list(state){
        return state.list
    },
    count(state){
        return state.count
    },
    size(state){
        return state.size
    }
}

export default{
    state,
    mutations,
    actions,
    getters,
    namespaced:true
}