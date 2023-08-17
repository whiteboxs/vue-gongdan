import http from './index.js';

//登录接口
export const login = (data) => { 
    return http.post('/api/user/login', data);
  };
  

// 获取all工单接口
export const getalltickets = (data) => {
  return http.get('/api/all/tickets',{params:data});
};
// 获取登录用户的工单
export const getusertickets = (data) => {
  return http.get('/api/user_tickets',{params:data});
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
export const putticket = (id,data) => {
  const formDataConfig = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
    return http.put(`/api/ticket/${id}`,data,formDataConfig);
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
