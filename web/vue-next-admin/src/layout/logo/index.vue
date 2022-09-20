<template>
  <!--  正常显示logo图片 + 文字-->
  <div class="layout-logo" v-if="setShowLogo" @click="onThemeConfigChange">
    <img :src="logoMini" class="layout-logo-medium-img"/>
    <span>{{ themeConfig.globalTitle }}</span>
  </div>
  <!--  只显示logo图片-->
  <div class="layout-logo-size" v-else @click="onThemeConfigChange">
    <img :src="logoMini" class="layout-logo-size-img"/>
  </div>
</template>

<script lang="ts">
// 计算属性 和 默认导出setup
import {computed, defineComponent} from 'vue';
// 状态管理响应式 解构赋值
import {storeToRefs} from 'pinia';
// 导入状态管理的 模板状态
import {useThemeConfig} from '/@/stores/themeConfig';
// svg 图片 当作logo
import logoMini from '/@/assets/logo-mini.svg';

export default defineComponent({
  name: 'layoutLogo',
  setup() {
    // 初始化  模板状态管理
    const storesThemeConfig = useThemeConfig();
    // 响应式解构一下 模板状态管理
    const {themeConfig} = storeToRefs(storesThemeConfig);
    // 设置 logo 的显示。classic 经典布局默认显示 logo
    const setShowLogo = computed(() => {
      // 是否是折叠状态  和 模板是否是 == classic 和 当前元素是否小于 1000
      // TODO 这个小于1000 貌似没啥用
      let {isCollapse, layout} = themeConfig.value;
      return !isCollapse || layout === 'classic' || document.body.clientWidth < 1000;
    });
    // logo 点击实现菜单展开/收起
    const onThemeConfigChange = () => {
      // 当前 模板 ===  transverse  就不做处理
      if (themeConfig.value.layout === 'transverse') return false;
      // 折叠  取反
      themeConfig.value.isCollapse = !themeConfig.value.isCollapse;
    };
    return {
      logoMini,
      setShowLogo,
      themeConfig,
      onThemeConfigChange,
    };
  },
});
</script>

<style scoped lang="scss">
.layout-logo {
  width: 220px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: rgb(0 21 41 / 2%) 0px 1px 4px;
  color: var(--el-color-primary);
  font-size: 16px;
  cursor: pointer;
  animation: logoAnimation 0.3s ease-in-out;

  span {
    white-space: nowrap;
    display: inline-block;
  }

  &:hover {
    span {
      color: var(--color-primary-light-2);
    }
  }

  &-medium-img {
    width: 20px;
    margin-right: 5px;
  }
}

.layout-logo-size {
  width: 100%;
  height: 50px;
  display: flex;
  cursor: pointer;
  animation: logoAnimation 0.3s ease-in-out;

  &-img {
    width: 20px;
    margin: auto;
  }

  &:hover {
    img {
      animation: logoAnimation 0.3s ease-in-out;
    }
  }
}
</style>
