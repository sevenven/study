package variable;

public class ReferenceDataTypes {
    public static void main(String[] args) {
        System.out.println("===== Java 引用类型详解 =====");

        // ===========================================
        // 1. 引用类型概述
        // ===========================================
        /*
         * 引用类型特点：
         *   - 存储对象的引用（内存地址），而不是对象本身
         *   - 默认值为 null
         *   - 包括类、数组、接口、枚举、注解、记录等
         *   - 分配在堆内存中
         *
         * 与基本类型的区别：
         *   - 基本类型存储实际值，引用类型存储对象地址
         *   - 基本类型有固定大小，引用类型大小取决于对象
         *   - 基本类型直接操作值，引用类型通过引用操作对象
         */
        System.out.println("\n1. 引用类型概述");

        // 基本类型变量
        int primitiveNum = 10;
        System.out.println("基本类型变量: " + primitiveNum);

        // 引用类型变量
        String referenceStr = null;
        System.out.println("引用类型变量默认值: " + referenceStr);

        // ===========================================
        // 2. 字符串 (String) - 最常用的引用类型
        // ===========================================
        /*
         * String 特性：
         *   - 不可变性（Immutable）
         *   - 字符串常量池优化
         *   - 支持丰富的操作方法
         */
        System.out.println("\n2. 字符串 (String)");

        // 创建字符串的两种方式
        String str1 = "Java"; // 使用字符串字面量（常量池）
        String str2 = new String("Java"); // 使用 new 关键字（堆内存）

        System.out.println("str1: " + str1);
        System.out.println("str2: " + str2);

        // == 比较引用，equals() 比较内容
        System.out.println("str1 == str2: " + (str1 == str2)); // false
        System.out.println("str1.equals(str2): " + str1.equals(str2)); // true

        // 字符串操作
        String combined = str1 + " Programming"; // 字符串拼接
        System.out.println("拼接结果: " + combined);
        System.out.println("长度: " + combined.length());
        System.out.println("大写: " + combined.toUpperCase());

        // ===========================================
        // 3. 数组 (Array) - 存储相同类型元素的集合
        // ===========================================
        /*
         * 数组特性：
         *   - 固定长度
         *   - 支持基本类型和引用类型
         *   - 通过索引访问元素（从0开始）
         */
        System.out.println("\n3. 数组 (Array)");

        // 一维数组
        int[] intArray = new int[3]; // 声明并分配空间
        intArray[0] = 10; // 初始化元素
        intArray[1] = 20;
        intArray[2] = 30;

        // 数组字面量初始化
        String[] names = {"Alice", "Bob", "Charlie"};

        System.out.println("整型数组:");
        for (int i = 0; i < intArray.length; i++) {
            System.out.println("索引 " + i + ": " + intArray[i]);
        }

        System.out.println("\n字符串数组:");
        for (String name : names) { // 增强for循环
            System.out.println(name);
        }

        // 多维数组
        int[][] matrix = {
                {1, 2, 3},
                {4, 5, 6},
                {7, 8, 9}
        };

        System.out.println("\n二维数组:");
        for (int i = 0; i < matrix.length; i++) {
            for (int j = 0; j < matrix[i].length; j++) {
                System.out.print(matrix[i][j] + " ");
            }
            System.out.println();
        }

        // ===========================================
        // 4. 自定义类 (Custom Class)
        // ===========================================
        /*
         * 自定义类：
         *   - 封装数据和行为
         *   - 使用 new 关键字创建对象实例
         *   - 通过引用访问对象成员
         */
        System.out.println("\n4. 自定义类");

        // 创建Person对象
        Person person1 = new Person("Alice", 25);
        Person person2 = new Person("Bob", 30);

        System.out.println(person1);
        System.out.println(person2);

        // 修改对象状态
        person1.setAge(26);
        System.out.println("修改后: " + person1);

        // ===========================================
        // 5. 接口 (Interface) 作为引用类型
        // ===========================================
        /*
         * 接口引用：
         *   - 可以指向实现该接口的任何类的对象
         *   - 实现多态
         */
        System.out.println("\n5. 接口引用");

        // 接口引用指向不同实现类
        Shape circle = new Circle(5.0);
        Shape rectangle = new Rectangle(4.0, 6.0);

        System.out.println("圆形面积: " + circle.calculateArea());
        System.out.println("矩形面积: " + rectangle.calculateArea());

        // ===========================================
        // 6. 枚举 (Enum) - 固定数量的常量集合
        // ===========================================
        /*
         * 枚举特性：
         *   - 类型安全
         *   - 可添加方法和字段
         *   - 实现接口
         */
        System.out.println("\n6. 枚举类型");

        Day today = Day.WEDNESDAY;
        System.out.println("今天是: " + today);
        System.out.println("工作日? " + today.isWeekday());

        // 遍历枚举值
        System.out.println("\n一周中的所有天:");
        for (Day day : Day.values()) {
            System.out.println(day + ": " + day.getDescription());
        }

        // ===========================================
        // 7. 引用传递与值传递
        // ===========================================
        /*
         * Java参数传递规则：
         *   - 基本类型：值传递（传递值的副本）
         *   - 引用类型：值传递引用（传递引用的副本）
         *
         * 重要区别：
         *   - 修改引用类型参数会影响原始对象
         *   - 重新赋值引用不会影响原始引用
         */
        System.out.println("\n7. 引用传递与值传递");

        int num = 10;
        Person person = new Person("Charlie", 40);

        System.out.println("调用前: num = " + num + ", person = " + person);

        // 调用方法
        modifyValues(num, person);

        System.out.println("调用后: num = " + num + ", person = " + person);

        // ===========================================
        // 8. null 值处理
        // ===========================================
        /*
         * null 处理：
         *   - 所有引用类型都可以为 null
         *   - 访问 null 引用会导致 NullPointerException
         *   - 使用前应进行 null 检查
         */
        System.out.println("\n8. null 值处理");

        String text = null;

        // 安全访问方法
        if (text != null) {
            System.out.println("长度: " + text.length());
        } else {
            System.out.println("text 为 null");
        }

        // 使用 Optional 处理 null (Java 8+)
        java.util.Optional<String> optionalText = java.util.Optional.ofNullable(text);
        System.out.println("Optional 值: " + optionalText.orElse("默认值"));

        // ===========================================
        // 9. 引用类型内存管理
        // ===========================================
        /*
         * 内存管理：
         *   - 堆内存：存储对象实例
         *   - 栈内存：存储局部变量和引用
         *   - 垃圾回收：自动回收无引用对象
         */
        System.out.println("\n9. 内存管理与垃圾回收");

        // 创建对象
        Person tempPerson = new Person("Temp", 99);
        System.out.println("创建对象: " + tempPerson);

        // 解除引用
        tempPerson = null;
        System.gc(); // 建议JVM进行垃圾回收（不保证立即执行）
        System.out.println("解除引用后: " + tempPerson);
    }

    // 修改基本类型和引用类型的方法
    public static void modifyValues(int num, Person person) {
        // 修改基本类型参数（不影响原始值）
        num = 100;

        // 修改引用类型参数的状态（影响原始对象）
        person.setAge(41);

        // 重新分配引用（不影响原始引用）
        person = new Person("David", 50);

        System.out.println("方法内: num = " + num + ", person = " + person);
    }
}

// ===========================================
// 自定义类示例
// ===========================================
class Person {
    private String name;
    private int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    @Override
    public String toString() {
        return "Person [name=" + name + ", age=" + age + "]";
    }
}

// ===========================================
// 接口和实现类示例
// ===========================================
interface Shape {
    double calculateArea();
}

class Circle implements Shape {
    private double radius;

    public Circle(double radius) {
        this.radius = radius;
    }

    @Override
    public double calculateArea() {
        return Math.PI * radius * radius;
    }
}

class Rectangle implements Shape {
    private double width;
    private double height;

    public Rectangle(double width, double height) {
        this.width = width;
        this.height = height;
    }

    @Override
    public double calculateArea() {
        return width * height;
    }
}

// ===========================================
// 枚举类型示例
// ===========================================
enum Day {
    MONDAY("星期一", true),
    TUESDAY("星期二", true),
    WEDNESDAY("星期三", true),
    THURSDAY("星期四", true),
    FRIDAY("星期五", true),
    SATURDAY("星期六", false),
    SUNDAY("星期日", false);

    private final String description;
    private final boolean weekday;

    // 枚举构造函数
    Day(String description, boolean weekday) {
        this.description = description;
        this.weekday = weekday;
    }

    public String getDescription() {
        return description;
    }

    public boolean isWeekday() {
        return weekday;
    }
}