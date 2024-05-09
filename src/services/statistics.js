import {http} from "@/utils/request.js";
export const getTurnoverAPI = (begin, end) => {
    return http({
        method: 'GET',
        url: `/admin/statistics/turnoverStatistics?begin=${begin}&end=${end}`
    })
}