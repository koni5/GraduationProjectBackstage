import { createApp } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import App from './App.vue'
import router from './router'
import pinia from './stores'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'; // 引入中文语言包
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
// 使用 Element Plus 并设置中文语言
app.use(ElementPlus, {
    locale: zhCn, // 设置语言为中文
});
app.use(pinia)
app.use(router)
app.mount('#app')
