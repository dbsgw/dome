<template>
	<slot v-if="getUserAuthBtnList" />
</template>

<script lang="ts">
/**
 * value = 'add'
 * 权限 匹配一个 匹配的上 就显示按钮
 */
import { computed, defineComponent } from 'vue';
import { storeToRefs } from 'pinia';
import { useUserInfo } from '/@/stores/userInfo';

export default defineComponent({
	name: 'auth',
	props: {
		value: {
			type: String,
			default: () => '',
		},
	},
	setup(props) {
    // 获取用户信息
		const stores = useUserInfo();
    // 用户信息
		const { userInfos } = storeToRefs(stores);
		// 获取 vuex 中的用户权限
		const getUserAuthBtnList = computed(() => {
      // 获取按钮权限   和 传入的 value 对比  看是否存在  返回 bool
			return userInfos.value.authBtnList.some((v: string) => v === props.value);
		});
		return {
			getUserAuthBtnList,
		};
	},
});
</script>
