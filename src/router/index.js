import { createRouter, createWebHashHistory } from 'vue-router'
import { useAuthStore } from '../store/user.js'

const routes = [
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/login.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('../views/register.vue'),
        meta: { requiresAuth: true }

    },
    {
        path: '/pathMatch(.*)*',
        name: 'NotFoud',
        component: () => import('../views/404.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/',
        name: 'home',
        component: () => import('../views/home.vue'),
        meta: { requiresAuth: true },
        children: [
            {
                path: '/home',
                name: 'home-main',
                component: () => import('../views/home-main.vue'),
                meta: { requiresAuth: true }
            },
            {
                path: '/usermanage',
                name: 'usermanage',
                component: () => import('../views/usermanage.vue'),
                meta: { requiresAuth: true }
            },
            {
                path: '/ticketlist',
                name: 'ticketlist',
                component: () => import('../views/ticketlist.vue'),
                meta: { requiresAuth: true }
            },
            {
                path: '/createticket',
                name: 'createticket',
                component: () => import('../views/createticket.vue'),
                meta: { requiresAuth: true }
            },
            {
                path: '/myticket',
                name: 'myticket',
                component: () => import('../views/myticket.vue'),
                meta: { requiresAuth: true }
            },
            {
                path: '/ticket',
                name: 'ticket',
                component: () => import('../views/ticket.vue'),
                meta: { requiresAuth: true }
            }
        ]
    }
]


const router = createRouter({
    history: createWebHashHistory(),
    routes
});

//导航守卫
const whiteList = ['/login']
router.beforeEach((to, from, next) => {
    //调用pinia的函数要放在导航函数内部不然无法调用
    const authstore = useAuthStore();
    const isAuthenticated = authstore.isAuthenticated;
    //和路由里面的meta.requiresAuth标签来确认打上true
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
    if (requiresAuth && isAuthenticated)  {
        // 需要登录但未认证，重定向到登录页面
            if (to.path === '/login') {
                next('/')
            } else {
                next()
            }
        } else {
            if (whiteList.includes(to.path)) {
                next()
            } else {
                next('/login')
            }
        }
});



// router.beforeEach((to, from, next) => {
//   if (store.getters.token) {
//     if (to.path === '/login') {
//       next('/')
//     } else {
//       next()
//     }
//   } else {
//     if (whiteList.includes(to.path)) {
//       next()
//     } else {
//       next('/login')
//     }
//   }
// })

export default router