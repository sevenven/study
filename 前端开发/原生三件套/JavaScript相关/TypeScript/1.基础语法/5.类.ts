// 1. 定义一个简单的类
class Animal {
	name: string;
	constructor(name: string) {
		this.name = name;
	}
	makeSound(): void {
		console.log('Some generic animal sound');
	}
}
const animal = new Animal('Generic Animal');
animal.makeSound();

// 2. 构造函数 - Dog 类通过 super 调用了父类的构造函数并添加了新的属性
class Dog extends Animal {
	breed: string;
	constructor(name: string, breed: string) {
		super(name);
		this.breed = breed;
	}
	makeSound(): void {
		console.log('Woof! Woof!');
	}
}
const dog = new Dog('Buddy', 'Golden Retriever');
dog.makeSound();

// 3. 成员变量和方法 - Cat 类定义了私有属性 age 并提供了一个公共方法 getAge
class Cat extends Animal {
	private age: number; // 私有属性 age只能在类内部访问
	constructor(name: string, age: number) {
		super(name);
		this.age = age;
	}
	makeSound(): void {
		console.log('Meow!');
	}
	getAge(): number {
		return this.age;
	}
}
const cat = new Cat('Whiskers', 3);
cat.makeSound();
console.log(cat.getAge());

// 4. 访问修饰符
class Bird extends Animal {
	protected wingspan: number; // protected 属性只能在类内部和子类中访问
	constructor(name: string, wingspan: number) {
		super(name);
		this.wingspan = wingspan;
	}
	makeSound(): void {
		console.log('Chirp chirp!');
	}
	getWingspan(): number {
		return this.wingspan;
	}
}
const bird = new Bird('Sparrow', 0.2);
bird.makeSound();
console.log(bird.getWingspan());

// 5. 只读属性
class Fish extends Animal {
	readonly species: string; // 只读属性 species只能在声明时或构造函数中赋值，之后不能修改
	constructor(name: string, species: string) {
		super(name);
		this.species = species;
	}
	makeSound(): void {
		console.log('Blub blub!');
	}
}
const fish = new Fish('Nemo', 'Clownfish');
fish.makeSound();
// fish.species = "Goldfish"; // 错误: 无法分配到 'species' 因为它是只读属性

// 6. 静态成员
class MathUtils {
	static PI: number = 3.14159; // 静态属性 PI可以在类内部和外部访问，但不属于类的实例
	static calculateCircumference(radius: number): number {
		// 静态方法 calculateCircumference可以在类内部和外部调用，但不属于类的实例
		return 2 * MathUtils.PI * radius;
	}
}
console.log(MathUtils.PI);
console.log(MathUtils.calculateCircumference(5)); // 输出: 31.4159

// 7. 继承 - Reptile 类继承自 Animal，并添加了 habitat 属性
class Reptile extends Animal {
	habitat: string;
	constructor(name: string, habitat: string) {
		super(name);
		this.habitat = habitat;
	}
	makeSound(): void {
		console.log('Hiss hiss!');
	}
	getHabitat(): string {
		return this.habitat;
	}
}
const reptile = new Reptile('Snake', 'Desert');
reptile.makeSound(); // 输出: Hiss hiss!
console.log(reptile.getHabitat()); // 输出: Desert

// 8. 抽象类 - Vehicle 是一个抽象类，包含抽象方法 makeNoise 和具体方法 move
abstract class Vehicle {
	abstract makeNoise(): void;
	move(): void {
		console.log('Moving along...');
	}
}
class Car extends Vehicle {
	makeNoise(): void {
		console.log('Vroom vroom!');
	}
}
const car = new Car();
car.makeNoise(); // 输出: Vroom vroom!
car.move(); // 输出: Moving along...

// 9. 接口实现
interface Swimmer {
	swim(): void;
}
// Dolphin 类实现了 Swimmer 接口，并提供了 swim 方法
class Dolphin extends Animal implements Swimmer {
	constructor(name: string) {
		super(name);
	}
	makeSound(): void {
		console.log('Click click!');
	}
	swim(): void {
		console.log('Swimming in the ocean!');
	}
}
const dolphin = new Dolphin('Flipper');
dolphin.makeSound(); // 输出: Click click!
dolphin.swim(); // 输出: Swimming in the ocean!
