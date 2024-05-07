import {http} from "@/utils/request.js";

export const getOrdersAPI = (page, pageSize, shopId, status) => {
    if (status === null) {
        return http({
            method: 'GET',
            url: `/admin/order/historyOrders?page=${page}&pageSize=${pageSize}&shopId=${shopId}`
        })
    } else {
        return http({
            method: 'GET',
            url: `/admin/order/historyOrders?page=${page}&pageSize=${pageSize}&status=${status}&shopId=${shopId}`
        })
    }
}