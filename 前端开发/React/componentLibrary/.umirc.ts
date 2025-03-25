import { defineConfig } from 'dumi';

export default defineConfig({
	title: 'kunlun',
	mode: 'site',
	themeConfig: {
		search: {
			position: 'header'
		}
	},
	extraBabelPlugins: [
		[
			'babel-plugin-import',
			{
				libraryName: 'antd',
				libraryDirectory: 'es',
				style: true
			}
		]
	]
});
