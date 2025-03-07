module.exports = {
	// 指定 Jest 使用 ts-jest 预设
	// 用于支持 TypeScript 测试
	preset: 'ts-jest',

	// 设置测试环境为 jsdom
	// 模拟浏览器环境，支持 DOM API 测试
	testEnvironment: 'jsdom',

	// 配置模块路径映射
	moduleNameMapper: {
		// 处理样式文件（CSS/LESS）的模拟
		// 避免 Jest 无法解析样式文件
		'\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',

		// 配置路径别名映射
		// 将 @/ 开头的路径解析为 src/ 目录
		'^@/(.*)$': '<rootDir>/src/$1'
	},

	// 指定测试环境初始化文件
	// 在运行测试前执行 setupTests.ts 中的代码
	setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],

	// 配置文件转换规则
	transform: {
		// 使用 ts-jest 处理 TypeScript 文件
		'^.+\\.(ts|tsx)?$': [
			'ts-jest',
			{
				// 指定 TypeScript 配置文件路径
				tsconfig: 'tsconfig.json'
			}
		]
	}
};
