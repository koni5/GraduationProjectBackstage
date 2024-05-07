import { http } from "@/utils/request";
export const loginAPI = (data) => {
    return http({
        method: 'POST',
        url: '/admin/employee/login',
        data
    })
}