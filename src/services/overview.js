import { http } from "@/utils/request.js";
export const getBusinessDataAPI = () => {
    return http({
        method: 'GET',
        url: "/admin/overview/businessData"
    })
}