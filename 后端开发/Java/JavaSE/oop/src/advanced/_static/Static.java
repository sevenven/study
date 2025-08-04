package advanced._static;

// 静态导入示例
import static java.lang.Math.PI;
import static java.lang.Math.pow;

/**
 * static关键字示例类
 *
 * static是Java中的修饰符，用于表示静态成员，具有以下特性：
 * 1. 静态成员属于类，而非类的实例
 * 2. 在类加载时初始化，且只初始化一次
 * 3. 可以通过类名直接访问，不需要创建对象
 *
 * 主要应用场景：
 * - 工具类方法
 * - 共享常量
 * - 静态工厂方法
 * - 静态代码块初始化
 */
public class Static {
    public static void main(String[] args) {
        // 访问静态变量
        System.out.println("公司名称: " + Employee.COMPANY);

        // 调用静态方法
        Employee.printCompanyInfo();

        // 使用静态导入的常量和方法
        System.out.println("PI的值: " + PI);
        System.out.println("半径为5的圆面积: " + circleArea(5));

        // 静态代码块演示
        new Employee("张三");
        new Employee("李四");
    }

    // 静态方法计算圆面积
    public static double circleArea(double r) {
        return PI * pow(r, 2);
    }
}

/**
 * 员工类 - 演示static关键字用法
 */
class Employee {
    // 静态变量（类变量） - 所有实例共享
    public static final String COMPANY = "阿里集团";  // 静态常量

    // 实例变量 - 每个对象独立
    private String name;

    // 静态代码块 - 类加载时执行一次
    static {
        System.out.println("员工类已加载，初始化静态资源...");
        // 可以在这里初始化静态变量
    }

    // 实例初始化块 - 每次创建对象时执行
    {
        System.out.println("创建新的员工对象...");
    }

    // 构造方法
    public Employee(String name) {
        this.name = name;
        System.out.println("员工" + name + "已创建");
    }

    // 静态方法 - 只能访问静态成员
    public static void printCompanyInfo() {
        System.out.println("公司信息: " + COMPANY);
        // System.out.println(name); // 错误：不能访问实例成员
    }

    // 实例方法 - 可以访问静态和实例成员
    public void printInfo() {
        System.out.println("员工姓名: " + this.name);
        System.out.println("所属公司: " + COMPANY);  // 可以访问静态变量
    }
}

/**
 * 工具类 - 演示静态方法的典型用法
 */
class StringUtils {
    // 私有构造方法防止实例化
    private StringUtils() {}

    // 静态工具方法
    public static boolean isEmpty(String str) {
        return str == null || str.trim().isEmpty();
    }

    public static String reverse(String str) {
        if (isEmpty(str)) return str;
        return new StringBuilder(str).reverse().toString();
    }
}