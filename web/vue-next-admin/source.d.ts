/**
 * 原因:typeScript 中导入样式文件报错？静态文件.css,.scss,.less,.jpg,.png,.json
 *
 * 解决办法:
 * 第一步，在 src目录下新建一个 typings.d.ts 文件
 * 在更目录新建一个tsconfig.json文件
 * 详情解答:https://blog.dbsgw.com/post-323.html
 */


declare module '*.json';
declare module '*.png';
declare module '*.jpg';
declare module '*.scss';
declare module '*.ts';
declare module '*.js';
