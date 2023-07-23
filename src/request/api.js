import { get,post } from "./http";

// 菜单添加
export const menuAdd = (data)=>post('/api/menuadd',data);
// 菜单列表
export const menuList = (params)=>get('/api/menulist',params);
// 菜单删除
export const menuDel = (data)=>post('/api/menudelete',data);
// 一条菜单数据的获取
export const menuOne = (params)=>get('/api/menuinfo',params);
// 菜单更新
export const menuUpdate = (data)=>post('/api/menuedit',data);

// 角色添加
export const roleAdd = (data)=>post('/api/roleadd',data);
// 角色列表
export const roleList = ()=>get('/api/rolelist');
//角色删除
export const roleDelete = (data) => post('/api/roledelete',data);
//角色数据获取
export const roleOne = (params) => get ('/api/roleinfo', params);
//角色修改
export const roleEdit = (data) => post ('/api/roleedit',data);

//管理员登录
export const managerLogin = (data) => post ('/api/userlogin',data);
//管理员添加
export const mangerAdd = (data) => post('/api/useradd' , data)
//管理员列表
export const managerList = (params) => get('/api/userlist',params);
//管理员总数
export const managerCount = () => get('/api/usercount');
//管理员删除
export const managerDel = (data) => post('/api/userdelete',data)
//获取一条管理员信息
export const managerOne = (params) => get('/api/userinfo',params)
//管理员修改
export const managerDit = (data) => post('/api/useredit',data)

//===========================================================

//商品分类添加
export const cateAdd = (data) => post('/api/cateadd',data,true )
//商品列表分类
export const cateList = (params) => get('/api/catelist',params)
//获取一条商品分类
export const cateInfo = (params) => get('/api/cateinfo',params)
//商品分类修改
export const cateEdit = (data) => post('/api/cateedit',data)
//商品分类删除
export const cateDel = (data) => post('/api/catedelete',data)


//商品规格添加
export const specsAdd = (data) => post('/api/specsadd',data)
//商品规格总数
export const specsCount = () => get('/api/specscount')
//商品规格列表(分页)
export const specsList = (params) => get('/api/specslist',params)
//获取一条商品规格
export const specsInfo = (params) => get('/api/specsinfo',params)
//商品规格修改
export const specsEdit = (data) => post('/api/specsedit',data) 
//商品规格删除
export const specsDel = (data) => post('/api/specsdelete',data)


// 商品添加 有文件
export const goodsAdd = (data)=>post('/api/goodsadd',data,true)
//商品总数
export const goodsCount = () => get('/api/goodscount')
//商品列表
export const goodsList = (params) => get('/api/goodslist',params)
//商品获取(一条)
export const goodsInfo = (params) => get('api/goodsinfo',params)
//商品修改
export const goodsEdit = (data) => post('/api/goodsedit',data,true)
//商品删除
export const goodsDelete = (data) => post('/api/goodsdelete',data)


//会员列表
export const memberList = (params)=>get('/api/memberlist',params)
//会员获取（一条）
export const memberInfo = (params)=>get('/api/memberinfo',params)
//会员修改
export const memberEdit = (data)=>post('/api/memberedit',data)
//会员总数
export const memberCount = ()=>get('/api/membercount')



//轮播图添加
export const bannerAdd = (data)=>post('/api/banneradd',data,true)
//轮播图列表
export const bannerList = (params)=>get('/api/bannerlist',params)
//轮播图获取（一条）
export const bannerInfo = (params) => get('/api/bannerinfo',params)
//轮播图修改
export const bannerEdit = (data) => post('/api/banneredit',data,true)
//轮播图删除
export const bannerDelete = (data) => post('/api/bannerdelete',data)
//轮播图总页
export const bannerCount = (params) => get('/api/bannercount',params)

//限时活动
export const seckillBySid = (params) => get('/api/getgoodslistbysid',params)
//限时活动添加
export const seckAdd = (data) => post('/api/seckadd',data)
//限时活动列表
export const seckList = () => get('/api/secklist')
//限时活动获取(一条)
export const seckInfo =(params) =>get('/api/seckinfo',params)
//限时活动修改
export const seckEdit = (data) => post('/api/seckedit',data)
//限时活动删除
export const seckDelete = (params) => post('/api/seckdelete',params)



//订单详情
export const orderall = (data) => get('/api/orderall',data)

//快递公司
export const courier = () => get('/api/courier')
//更改订单状态
export const orderedit = (data) => post('/api/orderedit',data)
