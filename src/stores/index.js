import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'
// 创建 pinia 实例
const pinia = createPinia()
// 使用持久化存储插件
pinia.use(persist)
//给main.js使用
export default pinia;
export * from "./modules/employee"
export * from "./modules/sidebar"
export * from "./modules/orderDetail.js"