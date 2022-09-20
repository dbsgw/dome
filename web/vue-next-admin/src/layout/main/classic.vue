<template>
  <!--  可视区 滑动 滚动区域-->
	<el-container class="layout-container flex-center">
    <!--      顶部-->
		<Header />
    <!--  可视区 滑动 滚动区域-->
		<el-container class="layout-mian-height-50">
<!--      测边栏-->
			<Aside />
			<div class="flex-center layout-backtop">
<!--        标签页-->
				<TagsView v-if="themeConfig.isTagsview" />
<!--        主内容-->
				<Main />
			</div>
		</el-container>
<!--    回到顶部-->
		<el-backtop target=".layout-backtop .el-main .el-scrollbar__wrap"></el-backtop>
	</el-container>
</template>

<script lang="ts">
// setup导出
import { defineComponent } from 'vue';
// 解构状态管理 响应式
import { storeToRefs } from 'pinia';
// 模板状态
import { useThemeConfig } from '/@/stores/themeConfig';
// 测边栏
import Aside from '/@/layout/component/aside.vue';
// 顶部
import Header from '/@/layout/component/header.vue';
// 主内容
import Main from '/@/layout/component/main.vue';
// 标签页
import TagsView from '/@/layout/navBars/tagsView/tagsView.vue';

export default defineComponent({
	name: 'layoutClassic',
  // 注册组件
	components: { Aside, Header, Main, TagsView },
	setup() {
    // 初始化模板状态管理
		const storesThemeConfig = useThemeConfig();
    // 解构响应式  状态管理
		const { themeConfig } = storeToRefs(storesThemeConfig);
		return {
			themeConfig,
		};
	},
});
</script>
