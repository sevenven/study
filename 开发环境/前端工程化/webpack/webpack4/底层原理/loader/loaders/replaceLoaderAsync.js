module.exports = function (source) {
	const callback = this.async();
	setTimeout(() => {
		// 异步处理source内容
		const result = source.replace('webpack', '~webpack~');
		callback(null, result);
	}, 1000);
};
