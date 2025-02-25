// 基本数据类型
// 	number: 表示数字，包括整数和浮点数。
// 	string: 表示字符串。
// 	boolean: 表示布尔值，即真 (true) 或假 (false)。
// 	null: 表示空值（注意：null 是所有类型的子类型）。
// 	undefined: 表示未定义的值。
let num: number = 42;
let str: string = 'Hello, TypeScript!';
let bool: boolean = true;
let nul: null = null;
let undef: undefined = undefined;

// 特殊数据类型
// 	void: 用于表示没有任何返回值的函数。
// 	any: 表示任意类型，可以是任何值。
// 	unknown: 表示未知类型，类似于 any，但更安全，需要进行类型检查才能操作。
// 	never: 表示永远不会发生的值，通常用于抛出异常或无限循环的函数。
function sayHello(): void {
	console.log('Hello!');
}

let anything: any = 'This can be any type';
anything = 42;

let unknownValue: unknown = 'Unknown value';
if (typeof unknownValue === 'string') {
	console.log(unknownValue.toUpperCase()); // 需要类型检查才能操作
}

function throwError(message: string): never {
	throw new Error(message);
}

// 复合数据类型
// 	object: 表示对象。
// 	array: 表示数组。
// 	tuple: 表示固定长度的数组，每个元素都有特定的类型。
// 	enum: 枚举类型，用于定义一组命名常量。
let obj: object = { key: 'value' };
let arr: number[] = [1, 2, 3];
let tuple: [string, number] = ['hello', 42];
enum Color {
	Red,
	Green,
	Blue
}
let color: Color = Color.Green;

// 类型别名
type Point = { x: number; y: number };
let point: Point = { x: 10, y: 20 };

// 接口
interface Person {
	name: string;
	age?: number; // 可选属性
	greet(): string;
}
class Student implements Person {
	constructor(public name: string, public age: number) {}
	greet(): string {
		return `Hello, my name is ${this.name} and I am ${this.age} years old.`;
	}
}
let student: Person = new Student('Alice', 20);
console.log(student.greet());

// 联合类型
let id: number | string = 123;
id = 'abc';

// 交叉类型
type Employee = {
	employeeId: number;
};
type Manager = {
	managerId: number;
};
type Executive = Employee & Manager;
let executive: Executive = { employeeId: 1, managerId: 2 };
