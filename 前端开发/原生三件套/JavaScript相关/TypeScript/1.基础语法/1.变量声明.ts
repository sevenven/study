// 使用 var 声明全局变量
var globalVar: string = 'I am a global variable';

function exampleFunction() {
	// 使用 let 声明块级作用域变量
	let localVar: number = 42;
	console.log(localVar); // 输出: 42

	// 尝试修改 const 变量会导致编译错误
	const constantVar: boolean = true;
	// constantVar = false; // 这行代码会报错

	console.log(constantVar); // 输出: true

	if (true) {
		let blockScopedVar: string = 'Block scoped';
		console.log(blockScopedVar); // 输出: Block scoped
	}

	// 在此无法访问 blockScopedVar，因为它是块级作用域的
	// console.log(blockScopedVar); // 这行代码会报错
}

exampleFunction();
console.log(globalVar); // 输出: I am a global variable
