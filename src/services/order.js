import { http } from "@/utils/request.js";

export const getOrdersAPI = (str) => {
    return http({
        method: 'GET',
        url: "/admin/order/conditionSearch?"+str
    })

}
export const receiveOrderAPI = (orderId) => {
    return http({
        method: 'PUT',
        url: `/admin/order/receive/${orderId}`
    })
}
export const completeOrderAPI = (orderId) => {
    return http({
        method: 'PUT',
        url: `/admin/order/completed/${orderId}`
    })
}
export const rejectOrderAPI = (orderId, rejectReason) => {
    return http({
        method: 'PUT',
        url: `/admin/order/reject/${orderId}/${rejectReason}`
    })
}