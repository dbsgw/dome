<template>
<!--  tags写的 上面轮回小条-->
    <div class="tags" v-if="tags.show">
        <ul>
            <li class="tags-li" v-for="(item,index) in tags.list" :class="{'active': isActive(item.path)}" :key="index">
                <router-link :to="item.path" class="tags-li-title">{{item.title}}</router-link>
                <span class="tags-li-icon" @click="closeTags(index)">
                    <i class="el-icon-close"></i>
                </span>
            </li>
        </ul>
        <div class="tags-close-box">
            <el-dropdown @command="handleTags">
                <el-button size="mini" type="primary">
                    标签选项
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <template #dropdown>
                    <el-dropdown-menu size="small">
                        <el-dropdown-item command="other">关闭其他</el-dropdown-item>
                        <el-dropdown-item command="all">关闭所有</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
import { useTagsStore } from '../store/tags'
// useRouter 传值的    useRoute 接收值的  onBeforeRouteUpdate组件复用是起作用
import { onBeforeRouteUpdate, useRoute, useRouter } from "vue-router";
export default {
    setup() {
      // 跳转 传值
        const route = useRoute();
        // 接收 跳转 传值
        const router = useRouter();
        // 如果 等于当前 路径 就激活当前选项
        const isActive = (path) => {
            return path === route.fullPath;
        };

        // tags 管理
        const tags = useTagsStore();
        // 关闭单个标签
        const closeTags = (index) => {
          // 存储了  当前 标签
            const delItem = tags.list[index];
            // 删除标签
            tags.delTagsItem(index);
            const item = tags.list[index] ? tags.list[index] : tags.list[index - 1];
            // 如果 当前标签存在值 就说明还有标签
            if (item) {
              // 删除的这个标签链接 和 当前 路径相同  就跳转到 下一个路径
                delItem.path === route.fullPath && router.push(item.path);
            } else {
              // 没有标签了  直接跳转到 首页
                router.push("/");
            }
        };

        // 设置标签
        const setTags = (route) => {

          // 判断  pania中是否有 当前页面的
            const isExist = tags.list.some((item) => {
                return item.path === route.fullPath;
            });
            // pania中没有才存储
            if (!isExist) {
              // 标签长度大于8 删除第一个标签
                if (tags.list.length >= 8) tags.delTagsItem(0);
                // 设置标签
                tags.setTagsItem({
                    name: route.name,
                    title: route.meta.title,
                    path: route.fullPath,
                });
            }
        };
        // 进来先将  当前路由设置一下
        setTags(route);
        // 组件再次打开 时候  在设置一下
        onBeforeRouteUpdate((to) => {
            setTags(to);
        });

        // 关闭全部标签
        const closeAll = () => {
            tags.clearTags();
            router.push("/");
        };
        // 关闭其他标签
        const closeOther = () => {
          // 找出当前的 路由的 item
            const curItem = tags.list.filter((item) => {
                return item.path === route.fullPath;
            });
            // 设置当前 路由
            tags.closeTagsOther(curItem);
        };
        // 选中， other 是 关闭其他，不是就关闭所有
        const handleTags = (command) => {
            command === "other" ? closeOther() : closeAll();
        };

        // 关闭当前页面的标签页
        // tags.closeCurrentTag({
        //     $router: router,
        //     $route: route
        // });

        return {
            isActive,
            tags,
            closeTags,
            handleTags,
        };
    },
};
</script>


<style>
.tags {
    position: relative;
    height: 30px;
    overflow: hidden;
    background: #fff;
    padding-right: 120px;
    box-shadow: 0 5px 10px #ddd;
}

.tags ul {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
}

.tags-li {
    float: left;
    margin: 3px 5px 2px 3px;
    border-radius: 3px;
    font-size: 12px;
    overflow: hidden;
    cursor: pointer;
    height: 23px;
    line-height: 23px;
    border: 1px solid #e9eaec;
    background: #fff;
    padding: 0 5px 0 12px;
    vertical-align: middle;
    color: #666;
    -webkit-transition: all 0.3s ease-in;
    -moz-transition: all 0.3s ease-in;
    transition: all 0.3s ease-in;
}

.tags-li:not(.active):hover {
    background: #f8f8f8;
}

.tags-li.active {
    color: #fff;
}

.tags-li-title {
    float: left;
    max-width: 80px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-right: 5px;
    color: #666;
}

.tags-li.active .tags-li-title {
    color: #fff;
}

.tags-close-box {
    position: absolute;
    right: 0;
    top: 0;
    box-sizing: border-box;
    padding-top: 1px;
    text-align: center;
    width: 110px;
    height: 30px;
    background: #fff;
    box-shadow: -3px 0 15px 3px rgba(0, 0, 0, 0.1);
    z-index: 10;
}
</style>
