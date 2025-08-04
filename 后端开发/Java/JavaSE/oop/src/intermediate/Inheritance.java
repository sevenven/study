package intermediate;


public class Inheritance {
    public static void main(String[] args) {
        // 创建基类对象
        Animal animal = new Animal("普通动物");
        animal.eat();
        animal.sleep();

        System.out.println("------------------");

        // 创建子类对象
        Dog dog = new Dog("大黄", "金毛");
        dog.eat();      // 继承自基类的方法
        dog.sleep();    // 继承自基类的方法
        dog.makeSound();    // 继承自基类的方法
        dog.bark();     // 子类特有的方法
    }
}

// 基类 - 动物类
class Animal {
    private String name;  // 私有属性，子类不能直接访问

    // 构造方法
    public Animal(String name) {
        this.name = name;
        System.out.println("Animal构造方法被调用");
    }

    // 公共方法 - 子类可以继承
    public void eat() {
        System.out.println(name + "正在吃东西...");
    }

    public void sleep() {
        System.out.println(name + "正在睡觉...");
    }

    public void makeSound() {
        System.out.println(name + "发出了声音");
    }

    // getter方法
    public String getName() {
        return name;
    }
}

/**
 * 继承示例类：子类 - 狗类，继承自动物类
 * 继承的核心概念
 * 1. 继承的特点
 * - 使用extends关键字实现继承
 * - 子类继承基类的非私有(public, protected, 默认)属性和方法
 * - 子类可以添加新的属性和方法
 * - 子类可以重写(override)基类的方法
 * - Java是单继承，一个类只能直接继承一个基类
 * 2. super关键字
 * - super.成员：访问基类的成员(属性和方法)
 * - super()：调用基类的构造方法，必须放在子类构造方法的第一行
 * 3. 继承的初始化顺序
 * - 基类静态代码块和静态变量初始化 -> 子类静态代码块和静态变量初始化 -> 基类实例变量初始化和代码块 -> 基类构造方法 -> 子类实例变量初始化和代码块 -> 子类构造方法
 */
class Dog extends Animal {
    private String breed;  // 子类特有的属性

    // 子类构造方法
    public Dog(String name, String breed) {
        super(name);  // 调用基类构造方法，必须放在第一行
        this.breed = breed;
        System.out.println("Dog构造方法被调用");
    }

    // 重写基类的方法
    @Override
    public void makeSound() {
        System.out.println(getName() + "汪汪叫!");
    }

    // 子类特有的方法
    public void bark() {
        System.out.println(getName() + "发出嗷嗷声...");
    }

    // getter方法
    public String getBreed() {
        return breed;
    }
}