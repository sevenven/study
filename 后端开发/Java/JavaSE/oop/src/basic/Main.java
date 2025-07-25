package basic;

public class Main {
    public static void main(String[] args) {
        // ========== 内存分析 ==========
        // 1. 类加载阶段（JVM方法区）：
        // - 加载MyClass的字节码
        // - 初始化静态变量staticVar
        // - 执行静态初始化块

        // 2. 创建对象（堆内存）：
        MyClass obj = new MyClass(10);
        /* 内存分配过程：
           a. 在堆中分配内存空间（包含instanceVar和内部类引用）
           b. 执行实例初始化块
           c. 执行构造器代码
           d. 将堆内存地址赋给栈中的obj引用变量
        */

        obj.displayInfo(); // 通过对象引用访问实例方法

        // 3. 静态成员访问（方法区）：
        System.out.println("Static variable: " + MyClass.staticVar);
        MyClass.staticMethod();

        // 4. 内部类实例化（堆内存）：
        MyClass.InnerClass innerObj = obj.new InnerClass();
        /* 内存特点：
           - 内部类对象持有外部类对象的引用（可访问外部类成员）
           - 与外部类对象共享堆内存空间
        */
        innerObj.innerDisplay();
    }
}

/**
 * 定义一个类 MyClass--类定义存储在JVM方法区
 * 属性：
 * -实例变量 instanceVar：用于存储实例级别的数据。
 * -静态变量 staticVar：用于存储类级别的数据，所有对象共享。
 * 方法：
 * -实例方法
 * displayInfo()：用于显示实例变量的值。
 * -静态方法
 * staticMethod()：用于显示静态变量的值。
 * 构造器：
 * -构造器用于创建对象并初始化实例变量。
 * 初始化块：
 * -实例初始化块：在创建对象时执行，用于初始化实例变量。
 * -静态初始化块：在类加载时执行，用于初始化静态变量。
 * 内部类：
 * -实例化内部类：定义在 MyClass 内部的类，用于访问外部类的实例变量。
 * -静态内部类：定义在 MyClass 内部的静态类，用于访问外部类的静态变量。
 */
class MyClass {
    // 实例变量--存储在堆内存中
    private int instanceVar;

    // 静态变量--存储在方法区中
    public static int staticVar = 100;

    // 初始化块--每次new对象时执行，编译后合并到构造器头部
    {
        System.out.println("Instance Initialization Block");
    }

    // 静态块--类加载时执行一次，存储在方法区
    static {
        System.out.println("Static Initialization Block");
    }

    // 构造器--对象初始化最后一步执行
    public MyClass(int value) {
        this.instanceVar = value;
        System.out.println("Constructor called with value: " + value);
    }

    // 实例方法--方法区存储，调用时压栈执行
    public void displayInfo() {
        System.out.println("Instance Variable: " + instanceVar);
    }

    // 静态方法--方法区存储，与类关联而非对象
    public static void staticMethod() {
        System.out.println("Static Method called");
    }

    /*
     * 实例化内部类（持有外部类对象的隐式引用）
     * 内存特点：
     * - 每个内部类对象都关联一个外部类实例
     * - 编译后会生成独立的.class文件（MyClass$InnerClass.class）
     */
    public class InnerClass {
        // 内部类的方法
        public void innerDisplay() {
            System.out.println("Inner Class Method called");
            // 访问外部类的实例变量
            System.out.println("Accessing outer class instance variable: " + instanceVar);
        }
    }
}



