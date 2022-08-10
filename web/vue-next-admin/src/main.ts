// 引入创建 vue实例
import { createApp } from 'vue';
// 引入pinia 实例
import pinia from '/@/stores/index';
// app文件
import App from './App.vue';
// 引入路由
import router from './router';
// 用户权限指令
import { directive } from '/@/utils/directive';
// 国际化实例
import { i18n } from '/@/i18n/index';
// 封装的方法
import other from '/@/utils/other';
// element-ui
import ElementPlus from 'element-plus';
// element-ui的css文件
import 'element-plus/dist/index.css';
// 模板css文件
import '/@/theme/index.scss';
// Vue2.x 使用 EventBus 事件总线进行兄弟组件通信，而在Vue3中事件总线模式已经被移除，官方建议使用外部的、实现了事件触发器接口的库,例如 mitt 或 tiny-emitter。
import mitt from 'mitt';
// 可拖拽的栅格布局
import VueGridLayout from 'vue-grid-layout';
// 创建 vue实例
const app = createApp(App);
// 注册指令 传入 vue实例
directive(app);
// 注册组件 传入 vue实例 （注册所有 element-ui的icon）
other.elSvg(app);
// 加载实例
app.use(pinia).use(router).use(ElementPlus, { i18n: i18n.global.t }).use(i18n).use(VueGridLayout).mount('#app');
// vue原型挂载 事务总线（兄弟传值的时候使用）vue3挂载全局属性和方法，使用app.config.globalProperties
app.config.globalProperties.mittBus = mitt();
