// 1. 泛型函数-identity 函数可以接受任何类型的参数并返回相同类型的值
function identity<T>(arg: T): T {
	return arg;
}
console.log(identity<string>('Hello')); // 输出: Hello
console.log(identity<number>(42)); // 输出: 42

// 2. 泛型接口
interface GenericIdentityFn<T> {
	(arg: T): T;
}
let myIdentity: GenericIdentityFn<number> = identity;
console.log(myIdentity(100)); // 输出: 100

// 3. 泛型类
// 定义一个泛型类 GenericNumber，T 是类型参数
class GenericNumber<T> {
	zeroValue: T; // 定义一个属性 zeroValue，类型为泛型 T
	add: (x: T, y: T) => T; // 定义一个方法 add，接受两个类型为 T 的参数，并返回类型为 T 的结果

	// 构造函数，接受两个参数：
	// 	1. zeroValue：类型为 T，用于初始化 zeroValue 属性
	// 	2. add：一个函数，类型为 (x: T, y: T) => T，用于初始化 add 方法
	constructor(zeroValue: T, add: (x: T, y: T) => T) {
		// 将传入的 zeroValue 赋值给类的 zeroValue 属性
		this.zeroValue = zeroValue;
		// 将传入的 add 函数赋值给类的 add 方法
		this.add = add;
	}
}
// 创建一个 GenericNumber 的实例，指定泛型 T 为 number 类型 传入 0 作为 zeroValue，传入一个箭头函数 (x, y) => x + y 作为 add 方法
let myGenericNumber = new GenericNumber<number>(0, (x, y) => x + y);
console.log(myGenericNumber.add(5, 3)); // 输出: 8

// 4. 泛型约束
// 定义一个接口 Lengthwise，要求实现该接口的对象必须具有 length 属性，且类型为 number
interface Lengthwise {
	length: number;
}
// 定义一个泛型函数 loggingIdentity，泛型 T 必须满足 Lengthwise 接口的约束 即传入的参数 arg 必须具有 length 属性
function loggingIdentity<T extends Lengthwise>(arg: T): T {
	console.log(arg.length);
	return arg;
}
// 调用 loggingIdentity 函数，传入字符串 'Hello' 字符串具有 length 属性，值为 5
loggingIdentity('Hello'); // 输出: 5
// 调用 loggingIdentity 函数，传入数组 [1, 2, 3] 数组具有 length 属性，值为 3
loggingIdentity([1, 2, 3]); // 输出: 3

// 5. 多个泛型参数
// 定义一个泛型函数 getProperty，接受两个泛型参数：
// 1. T：表示对象的类型
// 2. K：表示对象 T 的键的类型，且 K 必须是 T 的键之一（通过 `keyof T` 约束）
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
	return obj[key];
}
let x = { a: 1, b: 2, c: 3, d: 4 };
console.log(getProperty(x, 'a'));
console.log(getProperty(x, 'b'));

// 6. 默认泛型类型
// 定义一个泛型类 Box，泛型 T 的默认类型为 string 这意味着如果创建 Box 实例时没有显式指定泛型类型，T 会默认为 string
class Box<T = string> {
	contents: T; // 定义一个属性 contents，类型为泛型 T
	constructor(contents: T) {
		this.contents = contents;
	}
	describe(): string {
		return `Box containing ${this.contents}`;
	}
}
const box1 = new Box('hello');
console.log(box1.describe());
const box2 = new Box<number>(42);
console.log(box2.describe());
