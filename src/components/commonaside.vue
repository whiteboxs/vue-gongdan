<template>
    <el-aside width="300px">
        
        <el-menu class="el-menu-vertical-demo" 
        background-color="#545c64" 
        text-color="#fff" 
        active-text-color="#ffd04b"
        :default-active="defaultactive"
        router
        >
              <!--不带子层的边框-->
            <h3>工单管理系统</h3>   
            <el-menu-item :index="item.path" v-for="item in nochildren()" :key="item.path" @click="savepath(item.path)">
                <component class="icons" :is="item.icon"></component>
                <span>{{ item.label }}</span>             
            </el-menu-item>
              <!--带子层的边框-->
            <el-sub-menu :index="item.path" v-for="item in haschildren()" :key='item.path'>
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
<script>
export default {
    setup() {
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
                path: '/ticket',
                name: 'ticket',
                label: '工单管理',
                icon: 'List',
                url: '/ticket',
            },
            {
                path: '/ticketlist',
                name: '/ticketlist',
                label: '工单列表',
                icon: 'Document',
                url: '/ticket/ticketlist'
            },
            {
                label: '其他',
                icon: 'location',
                path: '/other',
                name: 'other',
                url: '/others',
                children: [
                    {
                        path: '/createticket',
                        name: 'createticket',
                        label: '创建工单',
                        icon: 'CirclePlus',
                        url: '/ticket/ticketlist'
                    },
                    {
                        path: '/myticket',
                        name: '/myticket',
                        label: '我的工单',
                        icon: 'Ticket',
                        url: '/ticket/ticketlist'
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
        return {
            nochildren,
            haschildren,
            defaultactive,
            savepath
        }
    }
}
</script>

<style lang="less" scoped>
.icons {
    width: 16px;
    height: 16px;
}
.el-menu{
    height: 100vh;
    h3 {
        color:#fff;
        text-align: center;
        line-height: 48px;
        font-size: 16px;
        font-weight: 400;
    }
.el-menu-item{
    font-size: 16px;
    font-weight: 400;
}
.el-sub-menu{
    font-size: 16px;
    font-weight: 400;
}
}
</style>



