<template>
	<div class="editor-container">
		<div ref="editorToolbar"></div>
		<div ref="editorContent" :style="{ height }"></div>
	</div>
</template>

<script lang="ts">
/**
 * 编辑器 页面
 */
// toRefs  解构对象的
// reactive 初始化对象的
// onMounted 页面加载完成生命周期
// watch 监听
// defineComponent 定义setup的
import { toRefs, reactive, onMounted, watch, defineComponent } from 'vue';
// 编辑器函数
// createEditor  创建编辑器
// createToolbar  创建表头配置项
import { createEditor, createToolbar, IEditorConfig, IToolbarConfig, IDomEditor } from '@wangeditor/editor';
import '@wangeditor/editor/dist/css/style.css';

// toolbarKeys 配置 (编辑器表头配置)
import { toolbarKeys } from './toolbar';

// 定义接口来定义对象的类型
interface WangeditorState {
	editorToolbar: HTMLDivElement | null;
	editorContent: HTMLDivElement | null;
	editor: any;
}

export default defineComponent({
	name: 'wngEditor',
	props: {
		// 节点 id
		id: {
			type: String,
			default: () => 'wangeditor',
		},
		// 是否禁用
		isDisable: {
			type: Boolean,
			default: () => false,
		},
		// 内容框默认 placeholder
		placeholder: {
			type: String,
			default: () => '请输入内容',
		},
		// 双向绑定：双向绑定值，字段名为固定，改了之后将不生效
		// 参考：https://v3.cn.vuejs.org/guide/migration/v-model.html#%E8%BF%81%E7%A7%BB%E7%AD%96%E7%95%A5
    // modelValue 是默认数据双向绑定的
		modelValue: String,
		// https://www.wangeditor.com/v5/getting-started.html#mode-%E6%A8%A1%E5%BC%8F
		// 模式，可选 <default|simple>，默认 default
    // 模式配置  简洁版,默认版
		mode: {
			type: String,
			default: () => 'default',
		},
		// 高度
		height: {
			type: String,
			default: () => '310px',
		},
	},
	setup(props, { emit }) {
    // 初始化数据
		const state = reactive<WangeditorState>({
			editorToolbar: null,
			editor: null,
			editorContent: null,
		});
		// 富文本配置
		const wangeditorConfig = () => {
			const editorConfig: Partial<IEditorConfig> = { MENU_CONF: {} };
			props.isDisable ? (editorConfig.readOnly = true) : (editorConfig.readOnly = false);
			editorConfig.placeholder = props.placeholder;
			editorConfig.onChange = (editor: IDomEditor) => {
				// console.log('content', editor.children);
				// console.log('html', editor.getHtml());
				emit('update:modelValue', editor.getHtml());
			};
			(<any>editorConfig).MENU_CONF['uploadImage'] = {
				base64LimitSize: 10 * 1024 * 1024,
			};
			return editorConfig;
		};
		//
		const toolbarConfig = () => {
			const toolbarConfig: Partial<IToolbarConfig> = {};
			toolbarConfig.toolbarKeys = toolbarKeys;
			return toolbarConfig;
		};
		// 初始化富文本
		// https://www.wangeditor.com/
		const initWangeditor = () => {
			state.editor = createEditor({
				html: props.modelValue,
				selector: state.editorContent!,
				config: wangeditorConfig(),
				mode: props.mode,
			});
			createToolbar({
				editor: state.editor,
				selector: state.editorToolbar!,
				mode: props.mode,
				config: toolbarConfig(),
			});
		};
		// 页面加载时 初始化编辑器
		onMounted(() => {
			initWangeditor();
		});
		// 监听双向绑定值的改变
		// https://gitee.com/lyt-top/vue-next-admin/issues/I4LM7I
    // 监听双向数据绑定的 modelValue  变化了 就清空编辑器  重新赋值
		watch(
			() => props.modelValue,
			(value) => {
				state.editor.clear();
				state.editor.dangerouslyInsertHtml(value);
			}
		);
		return {
			...toRefs(state),
		};
	},
});
</script>
