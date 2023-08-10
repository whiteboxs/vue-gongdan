import axios from 'axios';
import { diffTokenTime } from '../utils/auth.js';
import router from '../router/index.js'
//pinia
import {useAuthStore} from '../store/user.js'
//import{logout} from '../components/commonheader.vue'
const BASE_URL = 'http://192.168.3.173:9002' // 设置基础 URL

// 创建 Axios 实例
const http = axios.create({
  baseURL: BASE_URL,
  timeout: 5000, // 请求超时时间
  withCredentials: false, // 允许发送跨域凭证
});

    // 请求拦截器：在发送请求前做一些处理
    http.interceptors.request.use(
      (config) => {
        if (localStorage.getItem('token')) {
          if (diffTokenTime()) {
          const usestore =useAuthStore()
                // 在这里执行退出系统的操作，例如清理本地存储或使JWT失效等
              usestore.logout();
                // 导航到登录页面
                router.replace('/login');
              };
            }
    // 在请求发送前可以对请求进行处理，例如添加请求头、修改请求参数等

      const tokenString = localStorage.getItem('token');
      // 将 token 字符串解析为 JavaScript 对象

      const tokenObject = tokenString ? JSON.parse(tokenString) : null;

      // // 现在，您可以直接通过 tokenObject.token 获取 token 的值
      const token = tokenObject ? tokenObject.token : null;
  
      // 打印 token，以确保提取成功
      // console.log('444,',token);
      
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器：在接收到响应后做一些处理
http.interceptors.response.use(
  (response) => {
    // 在响应接收后可以对响应进行处理，例如处理错误状态码、解析数据等
    //const data = response.data;
    return response;
  },
  (error) => {
    // 响应错误处理
    return Promise.reject(error);
  }
);

export default http;