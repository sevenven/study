class CopyrightWebpackPlugin {
	constructor(options) {
		console.log(options);
	}

	// compiler-webpack实例
	apply(compiler) {
		debugger;
		// compiler.hooks-钩子
		// compile|emit-时刻
		// tap|tapAsync-同步|异步
		compiler.hooks.compile.tap('CopyrightWebpackPlugin', compilation => {
			console.log('compiler');
		});

		compiler.hooks.emit.tapAsync('CopyrightWebpackPlugin', (compilation, cb) => {
			debugger;
			const str = 'copyright by seven';
			compilation.assets['copyright.txt'] = {
				source: () => str,
				size: () => str.length
			};
			cb();
		});
	}
}

module.exports = CopyrightWebpackPlugin;
