import axios from 'axios'
import qs from 'qs'

// 区分环境
// development:开发环境
// production:生产环境
let baseURL = null;
if (process.env.NODE_ENV === 'development') {
    baseURL = '/api'
} else if (process.env.NODE_ENV === 'production') {
    baseURL = '';
}


// 创建自定义axios
const instance = axios.create({
    baseURL,
    timeout: 500,
})

// 请求拦截器
// instance.interceptors.request.use(config=>{
//     console.group('本次请求的地址为:',config.url);
//     // 统一处理令牌校验
//     if(config.url != '/api/userlogin'){
//         if(sessionStorage.getItem('user')){
//             let user = JSON.parse(sessionStorage.getItem('user'))
//             config.headers.authorization = user.token
//             return config
//         }
//     }else{
//         return config
//     }  
// },err=>{
//     return Promise.reject(err)
// })

// 请求拦截器
instance.interceptors.request.use(config => {
    console.group('本次请求的地址为:', config.url);
    // 统一处理令牌校验,token
    if (config.url !== '/login') {
        if (sessionStorage.getItem('user')) {
            let user = JSON.parse(sessionStorage.getItem('user'));
            config.headers.authorization = user.token;
        }
    }
    //权限验证
    // if(sessionStorage.getItem('user')){
    //     let user = JSON.parse(sessionStorage.getItem('user'));
    //     let flag = user.menus_url.some(function(item){
    //         return item.substr(0,5) == String(config.url).substr(4,5)
    //     })
    //     if(config.url !== '/login'){
    //         if(!flag){
    //             location.replace("http://localhost:8080/#/login");
    //         }
    //     }

    // }

    console.groupEnd()
    return config
}, err => {
    return Promise.reject(err)
})

// 响应拦截器
instance.interceptors.response.use(res => {
    // console.group('本次响应的地址为:',res.config.url);
    // 统一处理响应代码错误的结果
    // console.log(res.data);
    // console.groupEnd()
    if (res.data.code == 200) {
        return res
    }
    // return res
}, err => {
    return Promise.reject(err)
})

/**
 * 封装get请求
 * @params  url地址
 * @params  params数据   有默认值: null
 * */
export function get(url, params = null) {
    return new Promise((resolve, reject) => {
        // 发请求
        instance.get(url, { params }).then(res => {
            // 响应成功的结果数据
            resolve(res.data)
        }).catch(err => {
            // 响应失败的结果数据
            reject(err.data)
        })
    })
}

/**
 * 封装post请求
 * @params  url地址
 * @params  params数据
 * @params  isFile   是否带有文件的表单  默认值: false
 * */
export function post(url, params, isFile = false) {
    // 1,处理表单数据,不带有文件的参数序列化
    let data = qs.stringify(params);

    // 2.处理配置项
    let config = {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }
    // 判断是否带有文件
    if (isFile) {
        // 1.处理数据,带有文件的参数序列化
        data = new FormData();
        for (let i in params) {
            data.append(i, params[i])
        }
        // 2.处理配置项
        config = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
    }

    return new Promise((resolve, reject) => {
        instance.post(url, data, config).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err.data)
        })
    })
}