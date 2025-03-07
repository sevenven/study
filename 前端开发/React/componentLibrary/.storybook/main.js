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
		config.module.rules.push({
			test: /\.less$/,
			use: [
				'style-loader',
				'css-loader',
				{
					loader: 'less-loader',
					options: {
						lessOptions: {
							// 启用 JavaScript 表达式解析（Ant Design 等库需要）
							// 允许在 LESS 中使用类似 @color: `function(){}` 的 JS 表达式
							javascriptEnabled: true
						}
					}
				}
			]
		});

		return config;
	}
};
