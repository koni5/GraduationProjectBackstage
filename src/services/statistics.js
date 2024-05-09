import { http } from "@/utils/request.js";
export const getTurnoverAPI = (begin, end) => {
    return http({
        method: 'GET',
        url: `/admin/statistics/turnoverStatistics?begin=${begin}&end=${end}`
    })
}
export const getOrdersAPI = (begin, end) => {
    return http({
        method: 'GET',
        url: `/admin/statistics/ordersStatistics?begin=${begin}&end=${end}`
    })
}
export const getExcelAPI = () => {
    return http({
        method: 'GET',
        url: "/admin/statistics/exportExcel",
        responseType: 'blob', // 期望返回的类型
    })
}