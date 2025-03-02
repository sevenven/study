// 基本函数声明
function add(a: number, b: number): number {
	return a + b;
}
console.log(add(5, 3)); // 输出: 8

// 箭头函数
const multiply = (a: number, b: number): number => a * b;
console.log(multiply(4, 6)); // 输出: 24

// 默认参数
function greet(name: string = 'Guest'): string {
	return `Hello, ${name}!`;
}
console.log(greet()); // 输出: Hello, Guest!
console.log(greet('Alice')); // 输出: Hello, Alice!

// 可选参数
function printName(firstName: string, lastName?: string): string {
	if (lastName) {
		return `${firstName} ${lastName}`;
	}
	return firstName;
}
console.log(printName('John')); // 输出: John
console.log(printName('John', 'Doe')); // 输出: John Doe

// 剩余参数-定义了一个可以接受任意数量数字并求和的函数
function sum(...numbers: number[]): number {
	return numbers.reduce((acc, curr) => acc + curr, 0);
}
console.log(sum(1, 2, 3, 4)); // 输出: 10

// 函数类型-定义了一个函数类型的变量，并将其赋值为不同的函数
let operation: (x: number, y: number) => number;
operation = add;
console.log(operation(7, 2)); // 输出: 9
operation = multiply;
console.log(operation(5, 5)); // 输出: 25

// 匿名函数
const subtract = function (x: number, y: number): number {
	return x - y;
};
console.log(subtract(10, 3)); // 输出: 7

// 函数重载-定义了多个同名函数签名，根据传入参数的不同执行不同的逻辑
function overloadExample(x: string, y: string): string;
function overloadExample(x: number, y: number): number;
function overloadExample(x: any, y: any): any {
	return x + y;
}
console.log(overloadExample('Hello', 'World')); // 输出: HelloWorld
console.log(overloadExample(10, 20)); // 输出: 30

// 类型谓词-定义了一个类型谓词函数，用于类型保护
function isNumber(value: any): value is number {
	return typeof value === 'number';
}
let value: any = 42;
if (isNumber(value)) {
	console.log(`The value is a number: ${value}`); // 输出: The value is a number: 42
}
