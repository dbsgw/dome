<template>
	<slot v-if="getUserAuthBtnList" />
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { storeToRefs } from 'pinia';
import { useUserInfo } from '/@/stores/userInfo';

/**
 * value = ['add','del']
 * 权限 只要一个  匹配的上 就显示按钮
 */
export default defineComponent({
	name: 'auths',
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
		// 获取 vuex 中的用户权限
		const getUserAuthBtnList = computed(() => {
			let flag = false;
      // 两个数组  一个相等就返回  true
			userInfos.value.authBtnList.map((val: string) => {
				props.value.map((v) => {
					if (val === v) flag = true;
				});
			});
			return flag;
		});
		return {
			getUserAuthBtnList,
		};
	},
});
</script>
