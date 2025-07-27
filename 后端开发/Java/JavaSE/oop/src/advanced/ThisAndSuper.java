package advanced;

/**
 * 这个类演示Java中this和super关键字的使用方法
 *
 * this关键字代表当前对象的引用，主要用途：
 * 1. 解决成员变量与局部变量同名问题
 * 2. 调用当前类的其他构造方法(this())
 * 3. 作为参数传递当前对象
 * 4. 作为返回值返回当前对象
 *
 * super关键字代表父类对象的引用，主要用途：
 * 1. 访问父类被隐藏的成员变量
 * 2. 调用父类被重写的方法
 * 3. 调用父类的构造方法(super())
 *
 * 使用限制：
 * - this()和super()在构造方法中必须放在第一行
 * - 一个构造方法中不能同时使用this()和super()
 * - 静态方法中不能使用this和super
 */
public class ThisAndSuper {
    public static void main(String[] args) {
        // this关键字示例
        Individual p1 = new Individual("张三");
        p1.printName();

        Individual p2 = new Individual("李四", 25);
        p2.printInfo();

        // super关键字示例
        Student student = new Student("王五", 20, "清华大学");
        student.display();
    }
}

/**
 * this关键字示例类
 */
class Individual {
    private String name;
    private int age;

    // 构造方法1
    public Individual(String name) {
        this.name = name;  // 使用this区分成员变量和参数
    }

    // 构造方法2
    public Individual(String name, int age) {
        this(name);       // 使用this()调用其他构造方法
        this.age = age;
    }

    public void printName() {
        System.out.println("Name: " + this.name);  // 使用this访问成员变量
    }

    public void printInfo() {
        System.out.println("Name: " + this.getName() + ", Age: " + this.age);
    }

    // 返回当前对象
    public Individual getCurrentObject() {
        return this;
    }

    public String getName() {
        return name;
    }
}

/**
 * super关键字示例类
 */
class Student extends Individual {
    private String school;

    public Student(String name, int age, String school) {
        super(name, age);  // 使用super调用父类构造方法
        this.school = school;
    }

    public void display() {
        // 使用super调用父类方法
        super.printInfo();
        System.out.println("School: " + this.school);

        // 使用super访问父类成员变量(需父类变量为protected)
        // System.out.println("Parent name: " + super.name);
    }

    @Override
    public void printInfo() {
        // 先调用父类方法
        super.printInfo();
        // 再添加子类特有信息
        System.out.println("Student at: " + this.school);
    }
}
