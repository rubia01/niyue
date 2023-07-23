import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import { state, mutations, getters} from './mutations'

import actions  from "./actions";

import menu from './modules/menu';
import role from './modules/role';
import manager from './modules/manager'
import cate from './modules/cate'
import specs from './modules/specs'
import member from './modules/member'
import banner from './modules/banner'
import seckill from './modules/seckill';
import goods from './modules/goods';
import order from './modules/order';

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: { //子模块
    menu,
    role,
    manager,
    cate,
    specs,
    member,
    banner,
    seckill,
    goods,
    order
  }
})
