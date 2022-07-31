import {createApp} from 'vue'
// 状态管理
import {createPinia} from 'pinia'
// 引入app
import App from './App.vue'
// 路由
import router from './router'
// element-ui 和 i18n语言切换
import installElementPlus from './plugins/element'
// css 不知道什么css //TODO 不知道什么css
import './assets/css/icon.css'
// 创建 vue实例
const app = createApp(App)
// 创建element-ui 和 i18n 多语言
installElementPlus(app)
// 使用 状态管理，路由，挂载 #app 元素
app.use(createPinia())
    .use(router)
    .mount('#app')
