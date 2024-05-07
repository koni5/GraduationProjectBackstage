import { defineStore } from 'pinia';
import { ref } from 'vue';
export const useEmployeeStore = defineStore('employee', () => {
    // 店员信息
    const profile = ref()

    // 保存会员信息，登录时使用
    const setProfile = (val) => {
        profile.value = val
    }

    // 清理会员信息，退出时使用
    const clearProfile = () => {
        profile.value = undefined
    }

    return {
        profile,
        setProfile,
        clearProfile,
    }
}, {
    persist: {
        storage: localStorage
    }
})