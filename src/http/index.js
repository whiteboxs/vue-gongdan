import axios from 'axios';
import { diffTokenTime } from '../utils/auth.js';
import router from '../router/index.js'
//pinia
import {useAuthStore} from '../store/user.js'
import { ElMessage } from 'element-plus';
//import{logout} from '../components/commonheader.vue'
const BASE_URL = 'http://192.168.3.173:9002' // 设置基础 URL

// 创建 Axios 实例
const http = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 请求超时时间
  withCredentials: false, // 允许发送跨域凭证
});

    // 请求拦截器：在发送请求前做一些处理
http.interceptors.request.use(
      (config) => { 
        if (localStorage.getItem('userinfo')) {
          if (diffTokenTime()) {
              const usestore =useAuthStore()
                // 在这里执行退出系统的操作，例如清理本地存储或使JWT失效等
              usestore.logout();
                // 导航到登录页面
                router.replace('/login');
              };
            }
        //pinia拿token数据
        const usestore =useAuthStore()
        const token = usestore.userinfo.token
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// http.interceptors.response.use(
//   (response) => {
//     // 在响应接收后可以对响应进行处理，例如处理错误状态码、解析数据等
//     //const data = response.data;
//     return response;
//   },
//   (error) => {
//     // 响应错误处理
//     return Promise.reject(error);
//   }
// );





http.interceptors.response.use(
  (response) => {
    // 在响应接收后可以对响应进行处理，例如处理错误状态码、解析数据等
    // const data = response.data;
    return response;
  },
  (error) => {
    // 响应错误处理
    if (error.response) {
      const responseData = error.response.data;
      console.log('e1',error.response.status)
      console.log('er',responseData)
      if (error.response.status === 401) {
        // 执行注销操作
        const usestore = useAuthStore();
        usestore.logout();
        // 跳转到登录页面
        router.replace('/login');
      } else if (responseData.msg) {
        ElMessage({
          type: 'warning',
          message: responseData.msg
        })
      }
    }
    return Promise.reject(error);
  } 
);

//响应拦截器：在接收到响应后做一些处理
// http.interceptors.response.use(
//   res => res.data,
//   async e => {
//     if (e.response)   {
//       ElMessage({
//         type: 'warning',
//         message: e.response.data.msg || '服务器异常，请稍后再试'
//       });

//       // if (e.response.status === 401) {
//       //   const usestore = useAuthStore();
//       //   usestore.logout();
//       //   router.replace('/login');
//       // }
//     } else {
//       // 处理没有响应的情况，例如网络错误等
//       ElMessage({
//         type: 'warning',
//         message: '网络异常，请稍后再试'
//       });
//     }

//     return Promise.reject(e);
//   }
// );

export default http;