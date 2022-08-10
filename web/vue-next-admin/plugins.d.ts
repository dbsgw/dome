/**
 * 在.d.ts声明变量或者模块等东西之后，在其他地方可以不用import导入这些东西就可以直接用，用，而且有语法提示。
 *
 * 通过declare声明的类型或者变量或者模块，在include包含的文件范围内，都可以直接引用而不用去import或者import type相应的变量或者类型。
 *
 * 在编辑ts文件的时候，如果你想导入一个.css/.less/.png格式的文件，如果没有经过declare的话是会提示语法错误的
 */
declare module 'vue-grid-layout';
declare module 'qrcodejs2-fixes';
declare module 'splitpanes';
declare module 'js-cookie';
