import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 引入一级路由
const Login = ()=>import('../pages/Login/Login.vue');
const Index = ()=>import('../pages/Index/Index.vue');


// 引入二级路由
//主页
const Home = ()=>import('../views/Home/Home.vue');
//菜单管理
const Menu = ()=>import('../views/Menu/Menu.vue');
// 角色管理
const Role = ()=>import('../views/Role/Role.vue');
//管理员管理
const Manager = () => import('../views/Manager/Manager.vue')
//商品分类
const Cate = () => import('../views/Cate/Cate.vue')
//商品规格
const Specs = () => import('../views/Specs/Specs.vue')
//商品管理
const Goods = ()=>import('../views/goods/Goods.vue')
//会员管理
const Member = ()=>import('../views/Member/Member.vue')
//轮播图
const Banner = () => import ('../views/Banner/Banner.vue')
//限时秒杀
const Seck = () => import ('../views/Seck/Seck.vue')
//订单详情
const Order = () => import('../views/orderlist/Order.vue')

const routes = [
  {
    path:'/login',
    component:Login,
  },
  {
    path:'/index',
    component:Index,
    children:[
      {
        path:'home',
        name:'首页', //命名路由
        component:Home,
      },
      {
        path:'menu',
        name:'菜单管理', //命名路由
        component:Menu,
      },
      {
        path:'role',
        name:'角色管理', //命名路由
        component:Role,
      },
      {
        path:'user',
        name:'管理员管理',
        component:Manager,
      },
      {
        path:'category',
        name:'商品分类',
        component:Cate
      },
      {
        path:'specs',
        name:'商品规格',
        component:Specs
      },
      {
        path:'goods',//访问路径  /index/goods
        component:Goods,
        name:'商品管理',//命名路由
      },
      {
        path:'member',
        component:Member,
        name:'会员管理'
      },
      {
        path:'banner',
        component:Banner,
        name:'轮播图列表'
      },
      {
        path:'seckill',
        component:Seck,
        name:'限时秒杀'
      },
      {
        path:'orders',
        component:Order,
        name:'订单详情'
      },
      {
        path:'/index',
        redirect:'/index/home'
      }
      
    ]
  },
  {
    path:'*',
    redirect:'/login'
  }
]

// routes.beforeEach((to,from,next)=>{
//   //判断用户有没有登录，如果没有登录，那就跳转到登录页面
//   var userinfo = sessionStorage.getItem("user") ? JSON.parse(sessionStorage.getItem("user")) : "";
//   if(userinfo){
//       //已登录
//       if(to.path === '/login'){
//           next('/');
//       }else{
//           if(to.path === '/index'){
//               next();//执行默认路由规则
//           }else{
//               //根据当前访问的路由进行验证权限
//               let isauth = userinfo.menus_url.find(d=>{
//                   return d == to.path
//               });
//               if(isauth){
//                   next();
//               }else{
//                   console.log('访问权限受限')
//               }
//           }
//       }
//   }else{
//       //如果当前访问的路由规则不是登录
//       if(to.path !='/login'){
//           next('/login')
//       }else{
//           next();
//       }
//   }
// })


const router = new VueRouter({
  routes
})

export default router
