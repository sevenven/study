const merge = require('webpack-merge');
const commonConfig = require('../config/webpack.common.js');

module.exports = {
	stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'], // 配置 Storybook 要加载的故事文件
	// 配置 Storybook 插件系统
	// @storybook/addon-essentials 包含最常用的插件：Controls（动态属性调试）& Actions（事件处理监控）& Docs（自动生成文档）& Viewport（多设备视图）& Backgrounds（背景切换）
	addons: ['@storybook/addon-essentials'],
	// 指定 Storybook 使用 React 框架
	// 不同框架需要对应不同的包（如 @storybook/vue、@storybook/svelte）
	framework: '@storybook/react',
	// Webpack 最终配置扩展函数
	// 用于自定义 Storybook 的 Webpack 配置
	webpackFinal: async config => {
		// 合并项目的通用 webpack 配置
		const mergedConfig = merge(config, {
			module: commonConfig.module,
			resolve: commonConfig.resolve
		});
		return mergedConfig;
	}
};
