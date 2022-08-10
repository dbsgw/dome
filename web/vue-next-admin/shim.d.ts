/* eslint-disable */

/**
 * 原因: 此时会发现编译器会提示个错误：找不到模块“./app.vue”，.css，.less，.json或其相应的类型声明
 * 因为直接引入.vue文件 TS会找不到对应的类型声明；所以需要新建typings（命名没有明确规定，TS会自动寻找.d.ts文件）文件夹来专门放这些声明文件。
 *
 * TypeScriptTS默认只认ES 模块。如果你要导入.vue文件就要declare module把他们声明出来。
 */

// 声明文件，*.vue 后缀的文件交给 vue 模块来处理
declare module '*.vue' {
    import type {DefineComponent} from 'vue';
    const component: DefineComponent<{}, {}, any>;
    export default component;
}

/**
 * typescript 扩展 window  方便用ts类型 ,不加也可以直接 就是any 只是不推荐而已
 */
// 声明文件，定义全局变量。其它 app.config.globalProperties.xxx，使用 getCurrentInstance() 来获取
interface Window {
    nextLoading: boolean;
    nliuyang: boolean;
}
