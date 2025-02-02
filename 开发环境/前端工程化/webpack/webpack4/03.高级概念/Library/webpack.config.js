const path = require('path');
module.exports = {
	mode: 'production',
	entry: './src/index.js',
	// 可以考虑在package.json中使用peerDependencies声明 externals依赖  https://blog.csdn.net/weixin_43459866/article/details/112392975
	// https://blog.csdn.net/weixin_33722405/article/details/88954002
	externals: ['lodash'],
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'library.js',
		library: 'library', // https://yes-1-am.gitbook.io/blog/webpack-shi-jian/ru-he-pei-zhi-output.library
		libraryTarget: 'umd' // https://blog.csdn.net/Frank_YLL/article/details/78992778
	}
};
