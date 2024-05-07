import axios from 'axios';
import { useEmployeeStore } from "@/stores"
//获取店员仓库信息
let employeeStore = useEmployeeStore()
export const http = axios.create({
  baseURL: 'http://localhost:8080',
});
// 请求拦截器
http.interceptors.request.use(
  config => {
    const token = employeeStore.profile?.token
    if (token) {
      config.headers.token = token
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
