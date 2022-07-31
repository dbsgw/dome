// 引入 eleinet-ui
import ElementPlus from 'element-plus'
// 引入 i18n 多语言
import {createI18n} from 'vue-i18n'
// element-ui 的css样式
import 'element-plus/lib/theme-chalk/index.css'
// element中文语言
import localeZH from 'element-plus/lib/locale/lang/zh-cn'
// element英文语言
import localeEN from 'element-plus/lib/locale/lang/en'
// 定义的 一个中/英 语言片段
import messages from '../utils/i18n'

// 创建 i18n实例
const i18n = createI18n({
    // 传入默认语言
    locale: localeZH.name,
    fallbackLocale: localeEN.name,
    // 语言 实体（切换语言的实体）
    messages,
})

export default (app) => {
    // 使用 element-ui 和 多语言配置
    app.use(ElementPlus, {locale: localeZH})
    // 使用 多语言i18n
    app.use(i18n)
}
