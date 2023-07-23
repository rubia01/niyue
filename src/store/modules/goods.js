import { goodsCount, goodsList } from "@/request/api"

const state = {
    list:[],
    size:1000,//每页数
    page:1,//当前页
    count:0,//总数
}
const mutations = {
    changeList(state , arr){
        state.list = arr
    },
    changeCount(state,count){
        state.count = count
    },
    changePage(state,page){
        state.page = page
    }
}
const actions = {
    listActions(context){
        let params = {
            size:context.state.size,
            page:context.state.page,
        }
        //发起列表请求
        goodsList(params).then(res => {
            if(res.code === 200){
                if(res.list === null || res.list.length === 0){
                    let page = context.state.page - 1
                    context.commit('changePage',page);
                    //自调
                    context.dispatch('listActions');
                    return;
                }
                context.commit('changeList',res.list)
            }
        })
    },
    //总数
    countActions(context){
        goodsCount().then(res => {
            if(res.code === 200){
                context.commit('changeCount',res.list[0].total)
            }
        })
    },
    //
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
export default { 
    state,
    mutations,
    actions,
    getters,
    namespaced:true,
}