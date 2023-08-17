import { defineStore } from "pinia";
export const useAuthStore = defineStore({
  id: 'user',
  state: () => {
    return {
      token: ''
      
    }
  },
  getters: {
      isAuthenticated: (state) => !!state.token,
    },
  actions: {
    login(token){
      // 在这里可以进行登录验证逻辑，验证成功后将token存储在state中
      this.token = token;
      // this.$state.token = token;
      // 还可以将token存储在本地或cookie等地方，以便在页面刷新后保持认证状态
      // localStorage.setItem('token', token);
    },
    logout(){
      // 在这里可以进行登出逻辑，清除token并执行其他操作
      this.token = '';
      // 同样要清除本地存储的token
      //localStorage.removeItem('token');
    }
  },
    //开启数据缓存
    persist: {
      enabled: true,
      strategies: [{
        key: 'token',
        storage: localStorage,
     //   path: ['token']
      }]
  }
  });