package advanced;

/**
 * abstract关键字示例类
 *
 * abstract是Java中的修饰符，用于定义抽象类和抽象方法：
 * 1. 抽象类：不能实例化，只能被继承
 * 2. 抽象方法：只有声明没有实现，必须由子类实现
 *
 * 抽象类特点：
 * - 可以包含抽象方法和具体方法
 * - 可以包含成员变量
 * - 可以有构造方法（供子类调用）
 * - 设计目的是为了被继承
 */
public class Abstract {
    public static void main(String[] args) {
        // Animal animal = new Animal(); // 编译错误：抽象类不能实例化

        // 多态：抽象类引用指向子类对象
        Animal dog = new Dog("大黄");
        dog.eat();
        dog.makeSound();
        dog.sleep();

        Animal cat = new Cat("小花");
        cat.eat();
        cat.makeSound();
        cat.sleep();

        // 调用抽象类中的具体方法
        System.out.println("动物总数: " + Animal.getAnimalCount());
    }
}

/**
 * 抽象类示例：动物基类
 *
 * 包含：
 * - 抽象方法（子类必须实现）
 * - 具体方法（子类可以直接使用或重写）
 * - 成员变量
 * - 构造方法
 */
abstract class Animal {
    private String name;
    private static int animalCount = 0;

    // 抽象类可以有构造方法（供子类调用）
    public Animal(String name) {
        this.name = name;
        animalCount++;
        System.out.println(name + "被创建");
    }

    // 抽象方法：没有方法体，必须由子类实现
    public abstract void makeSound();

    // 具体方法：子类可以直接继承或重写
    public void eat() {
        System.out.println(name + "正在吃东西");
    }

    // final方法：子类不能重写
    public final void sleep() {
        System.out.println(name + "正在睡觉");
    }

    // 静态方法
    public static int getAnimalCount() {
        return animalCount;
    }

    // getter方法
    public String getName() {
        return name;
    }
}

/**
 * 具体子类：狗类
 *
 * 必须实现父类的所有抽象方法
 */
class Dog extends Animal {
    public Dog(String name) {
        super(name); // 调用父类构造方法
    }

    @Override
    public void makeSound() {
        System.out.println(getName() + "汪汪叫");
    }

    // 重写父类具体方法（可选）
    @Override
    public void eat() {
        System.out.println(getName() + "正在啃骨头");
    }
}

/**
 * 具体子类：猫类
 */
class Cat extends Animal {
    public Cat(String name) {
        super(name);
    }

    @Override
    public void makeSound() {
        System.out.println(getName() + "喵喵叫");
    }
}

/**
 * 抽象类的抽象子类示例
 *
 * 可以不实现父类的抽象方法
 * 但最终必须有具体子类实现所有抽象方法
 */
abstract class Bird extends Animal {
    public Bird(String name) {
        super(name);
    }

    // 没有实现makeSound()，所以仍然是抽象类
}

/**
 * 最终的具体子类
 */
class Sparrow extends Bird {
    public Sparrow(String name) {
        super(name);
    }

    @Override
    public void makeSound() {
        System.out.println(getName() + "叽叽喳喳");
    }
}