import {defineStore} from 'pinia';
import {ref} from 'vue';

export const useOrderDetailStore = defineStore('orderDetail', () => {
    const info = ref()
    const setInfo = (val) => {
        info.value = val
    }
    return {
        info,
        setInfo,
    }
})