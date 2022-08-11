<template>
<!--  可视区 滑动 滚动区域-->
	<el-container class="layout-container">
<!--    测边栏-->
		<Aside />
    <!--  可视区 滑动 滚动区域-->
		<el-container class="flex-center" :class="{ 'layout-backtop': !isFixedHeader }">
<!--      顶部-->
			<Header v-if="isFixedHeader" />
      <!--  可视区 滑动 滚动区域-->
			<el-scrollbar ref="layoutDefaultsScrollbarRef" :class="{ 'layout-backtop': isFixedHeader }">
<!--        内部顶部-->
				<Header v-if="!isFixedHeader" />
<!--        主内容区域-->
				<Main />
			</el-scrollbar>
		</el-container>
<!--    回到顶部-->
		<el-backtop target=".layout-backtop .el-scrollbar__wrap"></el-backtop>
	</el-container>
</template>

<script lang="ts">
//computed,   计算属性
//getCurrentInstance,  当前组件实例
//watch,  监听
//defineComponent  默认导出 setup的
import { computed, getCurrentInstance, watch, defineComponent } from 'vue';
// 接收路由参数的
import { useRoute } from 'vue-router';
// 状态管理 引入响应式的
import { storeToRefs } from 'pinia';
// 模板组件
import { useThemeConfig } from '/@/stores/themeConfig';
// 测边栏
import Aside from '/@/layout/component/aside.vue';
// 顶部
import Header from '/@/layout/component/header.vue';
// 主内容
import Main from '/@/layout/component/main.vue';

export default defineComponent({
	name: 'layoutDefaults',
  // 注册组件
	components: { Aside, Header, Main },
	setup() {
    // 获取当前组件实例
		const { proxy } = <any>getCurrentInstance();
    // 获取当前路由实例
		const route = useRoute();
    // 初始化 状态管理
		const storesThemeConfig = useThemeConfig();
    // 响应式状态管理
		const { themeConfig } = storeToRefs(storesThemeConfig);
    // 计算属性 计算 在哪里显示 顶部栏
		const isFixedHeader = computed(() => {
			return themeConfig.value.isFixedHeader;
		});
		// 监听路由的变化
		watch(
			() => route.path,
			() => {
        // 路由变化  手动把  可视区 滑动 滚动区域  跳转到 顶部
				proxy.$refs.layoutDefaultsScrollbarRef.wrap$.scrollTop = 0;
			}
		);
		return {
			isFixedHeader,
		};
	},
});
</script>
