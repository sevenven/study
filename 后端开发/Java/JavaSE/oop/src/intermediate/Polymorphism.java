package intermediate;


/**
 * 多态核心概念：
 * 1. 多态的实现条件：
 * - 继承关系：基于继承关系
 * - 方法重写：子类重写基类方法
 * - 向上转型：基类引用指向子类对象 (Animal a = new Dog())
 * 2. 多态的表现形式：
 * Animal animal = new Dog();  // 向上转型
 * animal.makeSound();         // 调用的是Dog类的makeSound()
 * 3. 多态的类型：
 * - 编译时多态：方法重载(Overload)
 * - 运行时多态：方法重写(Override)，也称为动态绑定
 * 4. 类型转换：
 * - 向上转型：自动进行，安全 (Dog -> Animal)
 * - 向下转型：需要强制转换，应先使用instanceof检查 (Animal -> Dog)
 * 5. 多态的优点：
 * - 可替换性：子类对象可以替换基类对象
 * - 可扩展性：易于添加新子类而不影响现有代码
 * - 接口性：基类提供统一接口，子类实现具体功能
 * - 灵活性：提高代码的灵活性和可维护性
 * 6. 多态的应用场景：
 * - 方法参数多态：方法参数声明为基类类型，可接受任何子类对象
 * - 集合多态：使用基类类型集合存储不同子类对象
 * - 工厂模式：返回基类类型的对象，实际可能是各种子类实例
 * - 策略模式：通过多态实现不同的算法策略
 */
public class Polymorphism {
    public static void main(String[] args) {
        // 多态示例
        System.out.println("\n==== 多态示例 ====");

        // 向上转型(Upcasting): 基类引用指向子类对象
        Animal myDog = new Dog("小黑", "拉布拉多");
        Animal myCat = new Cat("小花", 3);

        // 多态方法调用 - 实际调用的是子类重写的方法
        animalSound(myDog);
        animalSound(myCat);

        // instanceof和向下转型(Downcasting)
        checkAnimalType(myDog);
        checkAnimalType(myCat);
    }

    // 多态方法示例 - 接受任何Animal子类对象
    public static void animalSound(Animal animal) {
        // 编译时类型是Animal，运行时类型是实际子类类型
        animal.makeSound();  // 动态绑定，调用实际子类的方法

        // 注意：这里不能直接调用子类特有方法
        // animal.bark(); // 编译错误
    }

    // 类型检查和向下转型示例
    public static void checkAnimalType(Animal animal) {
        // 使用instanceof进行类型检查
        if (animal instanceof Dog) {
            Dog dog = (Dog) animal;  // 向下转型
            System.out.println(dog.getName() + "是一只" + dog.getBreed() + "犬");
            dog.bark();  // 现在可以调用Dog特有方法
        }
        else if (animal instanceof Cat) {
            Cat cat = (Cat) animal;  // 向下转型
            System.out.println(cat.getName() + "是一只" + cat.getAge() + "岁的猫");
            cat.purr();  // 现在可以调用Cat特有方法
        }
    }
}


/**
 * 子类 - 猫类，继承自动物类
 */
class Cat extends Animal {
    private int age;

    public Cat(String name, int age) {
        super(name);
        this.age = age;
        System.out.println("Cat构造方法被调用: " + name);
    }

    // 重写基类makeSound方法(实现多态)
    @Override
    public void makeSound() {
        System.out.println(getName() + "喵喵叫!");
    }

    // 子类特有方法
    public void purr() {
        System.out.println(getName() + "发出呼噜声...");
    }

    public int getAge() {
        return age;
    }
}