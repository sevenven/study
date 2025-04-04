module.exports = {
	printWidth: 120, // 一行的字符数，如果超过会进行换行
	tabWidth: 2, // 一个tab代表几个空格数，默认就是2
	useTabs: true, // 是否启用tab取代空格符缩进，.editorconfig设置tab缩进，所以设置为true
	semi: true, // 行尾是否使用分号，默认为true
	singleQuote: true, // 字符串是否使用单引号
	bracketSpacing: true, // 对象大括号直接是否有空格，默认为true，效果：{ foo: bar }
	arrowParens: 'avoid', // 箭头函数如果只有一个参数则省略括号
	trailingComma: 'none' // 对象或数组末尾是否添加逗号 none| es5| all
};
