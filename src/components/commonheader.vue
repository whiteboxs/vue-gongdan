<template>
    <el-header >
        <div class='l-content'> 
        <!--图标展示-->
         <el-button size="small" plain>
           <el-icon :szie="20">
            <Menu />
           </el-icon>
         </el-button>
         <h3>首页</h3>
        </div>
        <div class='r-content'>
            <el-dropdown>
                <span class="el-dropdown-link">
                    <img class=user src="../assets/百瑞赢公司标.png" alt="">
                <el-icon class="el-icon--right">
                </el-icon>
                </span>
             <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item @click="handleLogout">退出</el-dropdown-item>

                </el-dropdown-menu>
             </template>
           </el-dropdown>
        </div>
    </el-header>
</template>

<script setup>
import router from '../router/index.js'
//pinia
import {useAuthStore} from '../store/user.js'
const usestore =useAuthStore()
const handleLogout = () => {
  usestore.logout() // 调用 logout 方法
  // 导航到登录页面
  router.replace('/login')
}


</script>

<style lang="less" scoped>
header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    background: #333;
}
.r-content{
    .user{
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
}
.l-content {
    display: flex;
    align-items: center;
    .el-button{
        margin-right: 20px;
    }
    h3{
        color:#fff;

    };
    
}
</style>

