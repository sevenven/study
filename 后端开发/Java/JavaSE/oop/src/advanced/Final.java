package advanced;

/**
 * final关键字示例类
 *
 * final是Java中的修饰符，用于表示"不可改变"的特性，可以修饰：
 * 1. 变量：表示常量，值不可改变
 * 2. 方法：表示方法不可被重写
 * 3. 类：表示类不可被继承
 */
public class Final {
    public static void main(String[] args) {
        // final变量示例
        final double PI = 3.14159;
        // PI = 3.14; // 编译错误：不能修改final变量

        final Person person = new Person("张三");
        // person = new Person("李四"); // 编译错误：不能修改final引用
        person.setName("张伟"); // 允许：修改对象内部状态

        // final参数示例
        printMessage("Hello, World!");

        // final类和方法示例
        Circle circle = new Circle(5.0);
        System.out.println("圆面积: " + circle.calculateArea());
        // circle.radius = 10.0; // 编译错误：final变量不可修改
    }

    // final参数：方法内不能修改参数值
    public static void printMessage(final String msg) {
        // msg = "Changed"; // 编译错误：不能修改final参数
        System.out.println(msg);
    }
}

/**
 * final变量示例类
 */
class Person {
    private final String id;  // final实例变量（必须在构造器中初始化）
    private String name;

    // final静态变量（必须在声明时或静态代码块中初始化）
    public static final String SPECIES = "Human";

    public Person(String name) {
        this.id = generateId();  // 在构造器中初始化final变量
        this.name = name;
    }

    private String generateId() {
        return "ID_" + System.currentTimeMillis();
    }

    public void setName(String name) {
        this.name = name;
    }

    // final方法：不能被子类重写
    public final String getId() {
        return id;
    }
}

/**
 * final类示例：不能被继承
 */
final class Circle {
    public final double radius;  // public final字段（罕见但合法）

    public Circle(double radius) {
        this.radius = radius;
    }

    public double calculateArea() {
        return Math.PI * radius * radius;
    }
}

// class SubCircle extends Circle {} // 编译错误：final类不能被继承

/**
 * 非final类中的final方法示例
 */
class Shape {
    // final方法：不能被子类重写
    public final void printDescription() {
        System.out.println("这是一个形状");
    }

    public void draw() {
        System.out.println("绘制形状");
    }
}

class Rectangle extends Shape {
    // @Override
    // public void printDescription() {} // 编译错误：不能重写final方法

    @Override
    public void draw() {
        System.out.println("绘制矩形");
    }
}