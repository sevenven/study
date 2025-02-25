// 1. 类装饰器
/**
 * 定义一个装饰器函数 `sealed`，它接受一个参数 `constructor`，表示被装饰的类的构造函数
 * @param constructor 需要密封的构造函数
 */
function sealed(constructor: Function) {
	Object.seal(constructor); // 使用 `Object.seal` 方法密封构造函数，防止添加或删除属性
	Object.seal(constructor.prototype); // 使用 `Object.seal` 方法密封构造函数的原型，防止添加或删除原型上的属性
}
@sealed
class Greeter {
	greeting: string;
	constructor(message: string) {
		this.greeting = message;
	}

	greet() {
		return `Hello, ${this.greeting}!`;
	}
}
const greeter = new Greeter('World');
console.log(greeter.greet()); // 输出: Hello, World!

// 2. 方法装饰器
/**
 * 定义一个装饰器，用于设置类属性的可枚举性。
 *
 * @param value 布尔值，表示属性是否可枚举。
 * @returns 返回一个装饰器函数，该函数接受三个参数：
 * - `target`: 类的原型（如果是实例成员）或构造函数（如果是静态成员）。
 * - `propertyKey`: 被装饰的属性的名称（字符串）。
 * - `descriptor`: 属性描述符对象，包含属性的配置信息（如 enumerable、writable、configurable 等）。
 */
function enumerable(value: boolean) {
	return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
		descriptor.enumerable = value; // 修改属性描述符的 `enumerable` 属性为传入的 `value`
	};
}
// 定义一个类 `MyClass`
class MyClass {
	greeting: string;
	constructor(message: string) {
		this.greeting = message;
	}
	@enumerable(false)
	greet() {
		return `Hello, ${this.greeting}!`;
	}
}
const myClassInstance = new MyClass('Universe');
// 使用 `for...in` 循环遍历 `myClassInstance` 的所有可枚举属性
for (let key in myClassInstance) {
	// 输出每个可枚举属性的键名 由于 `greet` 方法被 `@enumerable(false)` 修饰，因此不会输出 'greet'
	console.log(key);
}

// 3. 属性装饰器
/**
 * 定义一个装饰器工厂函数 `format`
 * @returns 返回一个属性装饰器函数，该函数会在应用装饰器时执行
 * - `target`: 类的原型（如果是实例属性）或构造函数（如果是静态属性）。
 * - `propertyName`: 被装饰的属性的名称（字符串）。
 */
function format() {
	return function (target: any, propertyName: string) {
		// 使用 `Object.defineProperty` 重新定义属性
		Object.defineProperty(target, propertyName, {
			get() {
				return this[`_${propertyName}`];
			},
			set(newValue: string) {
				this[`_${propertyName}`] = newValue.toUpperCase(); // 在设置值时，将新值转换为大写
			},
			enumerable: true, // 属性可枚举
			configurable: true // 属性可配置
		});
	};
}

// 定义一个类 `User`
class User {
	// 使用 `@format()` 装饰器修饰 `name` 属性 该装饰器会将 `name` 属性的值转换为大写
	@format()
	name: string;

	constructor(name: string) {
		this.name = name;
	}
}

const user = new User('alice');
console.log(user.name); // 输出: ALICE 由于 `@format()` 装饰器的作用，`name` 属性的值会被转换为大写
user.name = 'bob';
console.log(user.name); // 输出: BOB 由于 `@format()` 装饰器的 setter 逻辑，新值会被转换为大写

// 4. 参数装饰器
/**
 * 使用装饰器记录方法参数信息
 *
 * @param target 类的原型（如果是实例方法）或构造函数（如果是静态方法）
 * @param methodName 被装饰方法的名称（字符串）
 * @param index 被装饰参数在方法参数列表中的索引（数字）
 */
function logParameter(target: any, methodName: string, index: number) {
	console.log(`Parameter decorator called on method: ${methodName}, parameter index: ${index}`);
}

class Logger {
	// 在类的方法中使用参数装饰器
	logMethod(@logParameter param1: string, @logParameter param2: number) {
		console.log(`Method called with parameters: ${param1}, ${param2}`);
	}
}

const logger = new Logger();
logger.logMethod('test', 123);

// 5. 装饰器工厂
/**
 * 定义一个函数，该函数接收一个字符串类型的参数，并返回一个类装饰器函数。
 *
 * @param value 字符串类型的颜色值，用于设置类的颜色属性。
 * @returns 返回一个类装饰器函数，该函数会在应用装饰器时执行。
 */
function color(value: string) {
	return function (target: any) {
		// 将传入的颜色值 `value` 赋值给类的静态属性 `color`
		target.color = value;
	};
}
// 使用 `@color('blue')` 装饰器修饰 `ColoredBox` 类 该装饰器会将 `ColoredBox` 类的静态属性 `color` 设置为 'blue'
@color('blue')
class ColoredBox {
	content: string;

	constructor(content: string) {
		this.content = content;
	}
}
// 创建 `ColoredBox` 类的一个实例 `coloredBox`，并传入参数 'colored content'
const coloredBox = new ColoredBox('colored content');
console.log(ColoredBox.color); // 输出: blue
console.log(coloredBox.content); // 输出: colored content
