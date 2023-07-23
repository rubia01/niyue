export const state ={
    user:sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : null
}
export const mutations ={
    changeUser(state,user){
        if(user){
            //存储到vuex
            state.user = user
            //存储到sexxion
            sessionStorage.setItem('user',JSON.stringify(user))
        }else{
            sessionStorage.removeItem('user')
        }
        
    }
}
export const getters ={
    user(state){
        return state.user
    }
}
