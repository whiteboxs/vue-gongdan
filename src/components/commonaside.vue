<template>
    <el-aside :width="!hanbaoStore.collapse ? '300px' : '64px'">
        
        <el-menu class="el-menu-vertical-demo" 
        background-color="#545c64" 
        text-color="#fff" 
        active-text-color="#ffd04b"
        :default-active="defaultactive"
        :collapse="hanbaoStore.collapse"
        :collapse-transition="false"
        router
        >
              <!--不带子层的边框-->
            <!-- <h3>工单管理系统</h3>    -->
            <el-menu-item :index="item.path" v-for="item in nochildren()" :key="item.path" @click="savepath(item.path)">
                <component class="icons" :is="item.icon"></component>
                <span>{{ item.label }}</span>             
            </el-menu-item>
              <!--带子层的边框-->
            <el-sub-menu :index="item.path" v-for="item in haschildren()" :key='item.path'  style="font-size: 16px"   >
                <template #title>
                    <component class="icons" :is="item.icon"></component>
                    <span>{{ item.label }}</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item :index="subitem.path" v-for="(subitem, subindex) in item.children" :key="subindex" @click="savepath(subitem.path)">
                        <component class="icons" :is="subitem.icon" ></component>
                        <span>{{ subitem.label }}</span>
                    </el-menu-item>
                </el-menu-item-group>
            </el-sub-menu>
        </el-menu>
    </el-aside>
</template>



<script setup>
import {usehanbaoStore} from '../store/hanbaoanniu.js'
const hanbaoStore = usehanbaoStore()
const list = [
    {
        path: '/home',
        name: 'home',
        label: '首页',
        icon: 'HomeFilled',
        url: '/home'
    },
    {
        path: '/usermanage',
        name: 'usermanage',
        label: '用户管理',
        icon: 'user',
        url: '/usermanage'
    },
    {
        path: '/ticketlist',
        name: '/ticketlist',
        label: '工单列表',
        icon: 'Document',
        url: '/ticket/ticketlist'
    },
    {
        path: '/ticket',
        name: 'ticket',
        label: '工单管理',
        icon: 'List',
        children: [
            {
                path: '/user_tickets',
                name: 'createticket',
                label: '创建工单',
                icon: 'CirclePlus',
                url: '/user_ticket/myticketlist'
            },
            {
                path: '/ticket_processing',
                name: 'ticket_processing',
                label: '工单处理',
                icon: 'Document',
                url: '/ticket//ticket_processing'
            },
        ]
    },
];
const nochildren = () => {
    return list.filter((item) => !item.children)
};

const haschildren = () => {
    return list.filter((item) => item.children)
};
const defaultactive = ref(sessionStorage.getItem('path'));
const savepath = (path) =>{
    sessionStorage.setItem('path',`$(path)`)


}

</script>

<style lang="less" scoped>
.icons {
    width: 16px;
    height: 16px;
}
.el-menu{
    height: 100vh;
    border-right: none;
    h3 {
        color:#fff;
        text-align: center;
        line-height: 48px;
        font-size: 18px;
        font-weight: 400;
    }
}
.el-menu-item{
    font-size: 16px;
    font-weight: 400;
}
.el-menu-item-group{
    font-size: 16px;
    font-weight: 400;
}
:root {
  --el-font-size-medium: 16px !important;
}
.el-meement 
.el-sub-menu{
    font-size: 16px;
    font-weight: 400;
}




</style>



