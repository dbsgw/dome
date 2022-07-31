import { defineStore } from 'pinia'
// tags 标签控制的
export const useTagsStore = defineStore('tags', {
    state: () => {
        return {
            list: []
        }
    },
    getters: {
        // 判断 list的 胀肚
        show: (state) => {
            return state.list.length > 0;
        },
        // 返回所以的name
        nameList: (state) => {
            return state.list.map(item => item.name);
        }
    },
    actions: {
        // 删除标签
        delTagsItem(index) {
            this.list.splice(index, 1);
        },
        setTagsItem(data) {
            this.list.push(data)
        },
        // 关闭 全部标签
        clearTags() {
            this.list = []
        },
        // 关闭 其他标签
        closeTagsOther(data) {
            this.list = data;
        },
        closeCurrentTag(data) {
            console.log(data)
            for (let i = 0, len = this.list.length; i < len; i++) {
                const item = this.list[i];
                if (item.path === data.$route.fullPath) {
                    if (i < len - 1) {
                        data.$router.push(this.list[i + 1].path);
                    } else if (i > 0) {
                        data.$router.push(this.list[i - 1].path);
                    } else {
                        data.$router.push("/");
                    }
                    this.list.splice(i, 1);
                    break;
                }
            }
        },
    }
})
