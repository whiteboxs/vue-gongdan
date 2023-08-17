<template>
    <div class="login">
        <h4>工单管理系统</h4>
        <el-form label-width="100px" :model="loginData">
            <el-form-item label="用户名">
                <el-input v-model="loginData.username" placeholder="请输入账号" />
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="loginData.password" type="password" placeholder="请输入密码" show-password />
            </el-form-item>
            <el-form-item>
                <el-button :plain="true" class="sub-btn" type="primary" @click="subfun">登录</el-button>
            </el-form-item>

        </el-form>
    </div>
</template>


<script setup>
import { reactive } from 'vue'
import { ElMessage } from 'element-plus'
import router from '../router/index.js'
import { setTokenTime } from '../utils/auth.js'
//pinia
import {useAuthStore} from '../store/user.js'
const usestore =useAuthStore();
const loginData = reactive({
    username: '',
    password: ''
})


const subfun = async () => { // 将subfun函数声明为异步函数
    if (!loginData.username || !loginData.password) {
        ElMessage.error('请先输入账号和密码.');
        return;
    }
    try {
     //   const res = await login(loginData); // 使用await等待login函数返回的Promise结果
        await usestore.getuserinfo(loginData)
        //usestore.login(res.data);
        // 获取登录的时候获取token的时间
        setTokenTime()
        router.replace('/home');
    } catch (error) {
        console.error(error);
        // 处理登录失败情况
    }
}
// const subfun = () => {
//     if (!loginData.username || !loginData.password) {
//         ElMessage.error('请先输入账号和密码.');
//         return;
//     }
//     login(loginData).then(res => {
//         console.log(res.data)
//         // if(res.data.code!="200"){
//         //     ElMessage({
//         //         showClose:true,
//         //         message: '登录失败',
//         //         type:'error',
//         //     });
//         //     return;
//         // }
//         usestore.login(res .data.token)
//         console.log('store',usestore.token)
//         console.log('111',usestore.$state)

//         // console.log(usestore.token)
//         //     ElMessage({
//         //         showClose: true,
//         //         mseeage:"登录成功",
//         //         type:'success'
//                 // })
        

//             //将token传给pinia里写的存储
//         // console.log(res)
//         //  const token=res.data.token
//         //  localStorage.setItem('token', token); // 将 Token 存储到本地存储中
//             router.replace('/home')
//     })
//         .catch((error) => {
//             console.error(error);
//             // 处理登录失败情况
//         });
// }



</script>


<style lang="less" scoped>
.login {
width: 500px;
margin: 200px auto;
border-radius: 10px;
padding: 20px;
border: 1px solid #efefef;

.sub-btn {
width: 100%;
}

h4 {
text-align: center;
margin: 10px;
}

.ElMessage {
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
color: crimson;
}
}
</style>