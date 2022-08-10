<template>
  <!--  element-ui的全局配置-->
  <el-config-provider :size="getGlobalComponentSize" :locale="i18nLocale">
    <!--    router-view-->
    <router-view v-show="themeConfig.lockScreenTime > 1"/>
    <!--    锁屏页面-->
    <LockScreen v-if="themeConfig.isLockScreen"/>
    <!--    皮肤配置-->
    <Setings ref="setingsRef" v-show="themeConfig.lockScreenTime > 1"/>
    <!--    关闭全屏的icon-->
    <CloseFull v-if="!themeConfig.isLockScreen"/>
  </el-config-provider>
</template>

<script lang="ts">
// computed 计算属性
// ref 计算 ref获取元素的
// getCurrentInstance 方法获取当前组件实例
// onBeforeMount：DOM即将挂载
// onMounted：DOM挂载完毕
// onUnmounted：销毁完毕
// nextTick dome加载玩在加载
// defineComponent ，它并没有实现任何的逻辑 TypeScript 而存在的
// watch 监听没什么可说的
// reactive 提供实现响应式数据的方法
// toRef和toRefs是对元数据的引用, 问题: reactive 对象取出的所有属性值都是非响应式的
// 解决: 利用 toRefs 可以将一个响应式 reactive 对象的所有原始 属性转换为响应式的 ref 属性
import {
  computed,
  ref,
  getCurrentInstance,
  onBeforeMount,
  onMounted,
  onUnmounted,
  nextTick,
  defineComponent,
  watch,
  reactive,
  toRefs
} from 'vue';
// useRoute接 ,可在useRoute中接收各种参数
// useRouter接 ,可以通过useRouter跳转路由
import {useRoute} from 'vue-router';
// storeToRefs 使他变成响应式 数据管理
import {storeToRefs} from 'pinia';
// 视图 pinia
import {useTagsViewRoutes} from '/@/stores/tagsViewRoutes';
// 模板 ponia
import {useThemeConfig} from '/@/stores/themeConfig';
// 一些方法
import other from '/@/utils/other';
// localStorage和sessionStorage的封装同时  token带入到 cookies里面去
import {Local, Session} from '/@/utils/storage';
// 动态设置 字体图标和js
import setIntroduction from '/@/utils/setIconfont';
// 锁屏组件
import LockScreen from '/@/layout/lockScreen/index.vue';
// 布局组件
import Setings from '/@/layout/navBars/breadcrumb/setings.vue';
// 关闭全屏的icon
import CloseFull from '/@/layout/navBars/breadcrumb/closeFull.vue';

export default defineComponent({
  // 组件名称
  name: 'app',
  // 注册组件
  components: {LockScreen, Setings, CloseFull},
  // vue3的响应式处理,和create 生命周期一致
  setup() {
    // 获取上下文实例
    const {proxy} = <any>getCurrentInstance();
    console.log(window,"-----------")

    // 获取 皮肤组件的ref
    const setingsRef = ref();
    // 获取路由信息,同时能获取到 传参信息(params,query等...)
    const route = useRoute();
    // 状态管理 视图的 路由表的
    const stores = useTagsViewRoutes();
    // 状态管理 模板的
    const storesThemeConfig = useThemeConfig();
    // 将模板状态 变成响应式数据
    const {themeConfig} = storeToRefs(storesThemeConfig);
    // 创建一个 i18n的语言默认值null
    const state = reactive({
      i18nLocale: null,
    });
    // 获取全局组件大小
    const getGlobalComponentSize = computed(() => {
      // 读取  localStorage中 的组件大小 没有就读取 pinia中的组件大小
      return other.globalComponentSize();
    });
    // 布局配置弹窗打开
    const openSetingsDrawer = () => {
      // 通过 ref 打开 布局右侧弹框
      setingsRef.value.openDrawer();
    };
    // 设置初始化，防止刷新时恢复默认
    // 组件挂载之前执行

    // TODO 防止刷新的时候恢复默认值
    onBeforeMount(() => {
      // 设置批量第三方 icon 图标
      setIntroduction.cssCdn();
      // 设置批量第三方 js
      setIntroduction.jsCdn();
    });
    // 页面加载时
    onMounted(() => {
      nextTick(() => {
        // TODO 监听 感觉监听了个寂寞 不是很懂咋监听的
        // 监听布局配置弹窗点击打开
        proxy.mittBus.on('openSetingsDrawer', () => {
          openSetingsDrawer();
        });
        // TODO 监听 感觉监听了个寂寞 不是很懂咋监听的
        // 设置 i18n，App.vue 中的 el-config-provider
        proxy.mittBus.on('getI18nConfig', (locale: string) => {
          (state.i18nLocale as string | null) = locale;
        });
        // 获取缓存中的布局配置 有就使用缓存的 没有就使用  默认的pinia的配置
        if (Local.get('themeConfig')) {
          storesThemeConfig.setThemeConfig(Local.get('themeConfig'));
          document.documentElement.style.cssText = Local.get('themeConfigStyle');
        }
        // 获取缓存中的全屏配置 有缓存就用缓存 没有缓存就用pinia配置
        if (Session.get('isTagsViewCurrenFull')) {
          stores.setCurrenFullscreen(Session.get('isTagsViewCurrenFull'));
        }
      });
    });
    // 页面销毁时，关闭监听布局配置/i18n监听
    onUnmounted(() => {
      proxy.mittBus.off('openSetingsDrawer', () => {
      });
      proxy.mittBus.off('getI18nConfig', () => {
      });
    });
    // 监听路由的变化，设置网站标题
    watch(
        () => route.path,
        () => {
          // 设置国际化图标
          other.useTitle();
        },
        {
          deep: true,
        }
    );
    return {
      // 皮肤配置
      themeConfig,
      // 皮肤的ref
      setingsRef,
      // 全局组件大小
      getGlobalComponentSize,
      // 展开state里面的内容,加上toRefs方便响应式
      ...toRefs(state),
    };
  },
});
</script>
