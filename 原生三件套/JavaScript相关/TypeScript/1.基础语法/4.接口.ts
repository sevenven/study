// 在 TypeScript 中，接口（Interface）是一种定义对象形状的强大工具。
// 接口可以描述对象必须具有的属性和方法，从而确保代码的类型安全性和可维护性

// 1. 定义一个简单的接口
interface Person {
	firstName: string;
	lastName: string;
}
function greet(person: Person): string {
	return `Hello, ${person.firstName} ${person.lastName}!`;
}
const user: Person = { firstName: 'John', lastName: 'Doe' };
console.log(greet(user)); // 输出: Hello, John Doe!

// 2. 实现接口
class Student implements Person {
	constructor(public firstName: string, public lastName: string) {}
	getFullName(): string {
		return `${this.firstName} ${this.lastName}`;
	}
}
const student = new Student('Jane', 'Smith');
console.log(student.getFullName()); // 输出: Jane Smith

// 3. 可选属性
interface OptionalPerson {
	firstName: string;
	lastName?: string; // 可选属性
}
function greetOptional(person: OptionalPerson): string {
	if (person.lastName) {
		return `Hello, ${person.firstName} ${person.lastName}!`;
	}
	return `Hello, ${person.firstName}!`;
}
const optionalUser: OptionalPerson = { firstName: 'Alice' };
console.log(greetOptional(optionalUser)); // 输出: Hello, Alice!

// 4. 只读属性
interface ReadonlyPoint {
	readonly x: number;
	readonly y: number;
}
let p1: ReadonlyPoint = { x: 10, y: 20 };
// p1.x = 5; // 错误: 无法分配到 'x' 因为它是只读属性

// 5. 索引签名
interface StringArray {
	[index: number]: string;
}
let myArray: StringArray = ['Bob', 'Fred'];
let myStr: string = myArray[0];
console.log(myStr); // 输出: Bob

// 6. 函数类型接口
interface SearchFunc {
	(source: string, subString: string): boolean;
}
let mySearch: SearchFunc;
mySearch = function (source: string, subString: string) {
	let result = source.search(subString);
	return result > -1;
};
console.log(mySearch('Hello, world!', 'world')); // 输出: true

// 7. 继承接口
interface Shape {
	color: string;
}
interface Square extends Shape {
	sideLength: number;
}
let square: Square = { color: 'blue', sideLength: 10 };
console.log(square.color); // 输出: blue
console.log(square.sideLength); // 输出: 10

// 8. 混合类型接口
interface Counter {
	(start: number): string; // 表示 Counter 接口描述的对象可以像函数一样被调用。调用时，它接受一个 number 类型的参数 start，并返回一个 string 类型的值
	interval: number;
	reset(): void;
}
function getCounter(): Counter {
	let counter = function (start: number): string {
		return start.toString(); // 将 start 转换为字符串并返回
	} as Counter; // 强制类型转换为 Counter 类型
	counter.interval = 123;
	counter.reset = function () {};
	// 返回 counter 对象
	return counter;
}
let c: Counter = getCounter();
c(10);
c.reset();
c.interval = 5.0;
console.log(c(10)); // 输出: 10
