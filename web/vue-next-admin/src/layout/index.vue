<template>
<!--  切换组件的-->
	<component :is="themeConfig.layout" />
</template>

<script lang="ts">
// onBeforeMount,  DOM即将挂载生命周期
// onUnmounted,   销毁完毕完毕生命周期
// getCurrentInstance,   获取实例的的 类型 vue2的 this
// defineComponent,  默认加载 setup的
// defineAsyncComponent  异步加载组件的
import { onBeforeMount, onUnmounted, getCurrentInstance, defineComponent, defineAsyncComponent } from 'vue';
// 状态管理工具， 导出解构赋值 响应式的
import { storeToRefs } from 'pinia';
// 模板的状态管理
import { useThemeConfig } from '/@/stores/themeConfig';
// localStorage缓存
import { Local } from '/@/utils/storage';

export default defineComponent({
	name: 'layout',
  // 注册组件
	components: {
    // 导入异步组件
		defaults: defineAsyncComponent(() => import('/@/layout/main/defaults.vue')),
		classic: defineAsyncComponent(() => import('/@/layout/main/classic.vue')),
		transverse: defineAsyncComponent(() => import('/@/layout/main/transverse.vue')),
		columns: defineAsyncComponent(() => import('/@/layout/main/columns.vue')),
	},
	setup() {
    // 获取 当前组件实例，
		const { proxy } = <any>getCurrentInstance();
    // 模板状态 初始化
		const storesThemeConfig = useThemeConfig();
    // 模板状态 解构响应式 出来
		const { themeConfig } = storeToRefs(storesThemeConfig);
		// 窗口大小改变时(适配移动端)
		const onLayoutResize = () => {
      // 缓存有没有 oldLayout 模板，没有就 存一个，从  状态里面获取的
			if (!Local.get('oldLayout')) Local.set('oldLayout', themeConfig.value.layout);
      // 当前body 的宽度
			const clientWidth = document.body.clientWidth;

			if (clientWidth < 1000) {
        // 宽度小于 1000
        // 模板的 侧边栏 是否开启菜单水平折叠效果
				themeConfig.value.isCollapse = false;
        // 跨组件通讯 传入默认 模板 和当前 宽度
				proxy.mittBus.emit('layoutMobileResize', {
					layout: 'defaults',
					clientWidth,
				});
			} else {
        // 宽度大于1000
        // 跨组件通讯 传入 缓存模板/没有就传入 状态里面的初始化模板，和宽度
				proxy.mittBus.emit('layoutMobileResize', {
					layout: Local.get('oldLayout') ? Local.get('oldLayout') : themeConfig.value.layout,
					clientWidth,
				});
			}
		};
		// 页面加载前
		onBeforeMount(() => {
      // 初始化了 窗口大小
			onLayoutResize();
      // 注册监听 页面 响应大小时间  触发 改变窗口大小事件
			window.addEventListener('resize', onLayoutResize);
		});
		// 页面卸载时
		onUnmounted(() => {
      // 页面 关闭时候 卸载 监听事件
			window.removeEventListener('resize', onLayoutResize);
		});
		return {
			themeConfig,
		};
	},
});
</script>
