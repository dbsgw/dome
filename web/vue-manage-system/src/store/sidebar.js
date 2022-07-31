import { defineStore } from 'pinia'

export const useSidebarStore = defineStore('sidebar', {
    state: () => {
        return {
            // 测边菜单展开
            collapse: false
        }
    },
    getters: {

    },
    actions: {
        // 却反测边菜单展开的函数
        handleCollapse() {
            this.collapse = !this.collapse;
        }
    }
})
