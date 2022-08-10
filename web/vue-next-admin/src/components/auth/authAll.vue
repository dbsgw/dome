<template>
	<slot v-if="getUserAuthBtnList" />
</template>

<script lang="ts">
/**
 * value = ['add','del']
 * 权限 要全部  匹配的上 就显示按钮
 */
import { computed, defineComponent } from 'vue';
import { storeToRefs } from 'pinia';
import { useUserInfo } from '/@/stores/userInfo';
// 判断两个数组是否相同
import { judementSameArr } from '/@/utils/arrayOperation';

export default defineComponent({
	name: 'authAll',
	props: {
		value: {
			type: Array,
			default: () => [],
		},
	},
	setup(props) {
    // 获取用户信息
		const stores = useUserInfo();
    // 用户信息
		const { userInfos } = storeToRefs(stores);
		// 获取 pinia 中的用户权限
		const getUserAuthBtnList = computed(() => {
      // 判断两个数组是否相同
			return judementSameArr(props.value, userInfos.value.authBtnList);
		});
		return {
			getUserAuthBtnList,
		};
	},
});
</script>
