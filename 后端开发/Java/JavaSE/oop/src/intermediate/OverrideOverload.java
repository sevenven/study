package intermediate;

/**
 * 这个类演示了Java中方法重写(Override)和方法重载(Overload)的区别
 *
 * 关键知识点总结：
 *
 * 重载(Overload)特点：
 * - 发生在同一个类中
 * - 方法名相同但参数列表不同(类型、数量或顺序)
 * - 返回类型可以不同
 * - 访问修饰符可以不同
 * - 可以抛出不同的异常
 * - 编译时确定调用哪个方法(静态绑定)
 *
 * 重写(Override)特点：
 * - 发生在继承关系中(子类重写父类方法)
 * - 方法名和参数列表必须完全相同
 * - 返回类型可以相同或是父类方法返回类型的子类(协变返回类型)
 * - 访问修饰符不能比父类方法更严格
 * - 抛出的异常不能比父类方法更宽泛
 * - 运行时确定调用哪个方法(动态绑定)
 * - 可以使用@Override注解明确表示这是重写
 *
 * 注意事项：
 * - 仅返回类型不同不构成重载
 * - 静态方法不能被重写(只能隐藏)
 * - 私有方法不能被重写
 * - final方法不能被重写
 * - 构造方法不能被重写
 */
public class OverrideOverload {

    public static void main(String[] args) {
        // 重载示例
        MathOperations math = new MathOperations();
        System.out.println("整数相加: " + math.add(5, 3));
        System.out.println("小数相加: " + math.add(5.2, 3.8));
        System.out.println("三个数相加: " + math.add(5, 3, 2));

        // 重写示例
        Animal myAnimal = new Animal("普通动物");
        Animal myDog = new Dog("sugar", "比熊"); // 多态
        myAnimal.makeSound();
        myDog.makeSound();
    }
}

/**
 * 演示方法重载的类
 */
class MathOperations {
    // 整数相加
    public int add(int a, int b) {
        return a + b;
    }

    // 小数相加 - 重载(参数类型不同)
    public double add(double a, double b) {
        return a + b;
    }

    // 三个数相加 - 重载(参数数量不同)
    public int add(int a, int b, int c) {
        return a + b + c;
    }
}

