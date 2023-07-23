import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 1.引入重置样式
import './assets/css/reset.css'

// 2.公共组件的封装
import comComponents from './components'
for(let i in comComponents){
  Vue.component(i,comComponents[i]);
}

// 3.公共过滤器的封装
import comFilters from './filters'
for(let i in  comFilters){
  Vue.filter(i,comFilters[i]);
}

// 4.引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//图片前缀
if(process.env.NODE_ENV === 'development'){
  Vue.prototype.$getImg = 'http://localhost:3000'
}else if(process.env.NODE_ENV === 'production'){
  Vue.prototype.$getImg = ''
}


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
