import {createApp} from 'vue'
// 状态管理
import { createPinia } from 'pinia'
// 引入app
import App from './App.vue'
// 路由
import router from './router'
// element-ui 和 i18n语言切换
import installElementPlus from './plugins/element'
// css 不知道什么css
import './assets/css/icon.css'
const app = createApp(App)
installElementPlus(app)
app.use(createPinia())
    .use(router)
    .mount('#app')
