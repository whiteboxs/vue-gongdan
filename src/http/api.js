import http from './index.js';

//登录接口
export const login = (data) => { 
    return http.post('/api/user/login', data);
  };
  

// 获取工单接口
export const getallticket = (data) => {
  return http.get('/api/all/tickets',data);
};


  // 获取环境信息接口
  export const getenvironments = (data) => {
    return http.get('/api/all/environments',data);
  };


// 获取经办人信息接口
export const getassignees = (data) => {
  return http.get('/api/all/assignees',data);
};

// 获取指派人信息接口
export const getusers = (data) => {
    return http.get('/api/all/users',data);
  };

  //删除工单接口
export const delticket = (id) => {
    return http.delete(`/api/ticket/${id}`);
  };

//编辑工单接口
export const putticket = (id) => {
  const formDataConfig = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
    return http.put(`/api/ticket/${id}`,formDataConfig);
  };

  //创建工单
  export const createticket = (data) => {
    const formDataConfig = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    return http.post('/api/ticket', data, formDataConfig);
  };