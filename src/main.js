import { createApp } from 'vue'
//import './style.css'
import App from './App.vue'
//import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import pinia from './store/index.js'
import router from './router'
import './assets/less/index.less'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'


const app = createApp(App)
//全局注册 Element Plus 的图标组件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
//app.use(ElementPlus)
app.use(pinia)
app.use(router)
app.mount('#app')