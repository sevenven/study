package advanced;

/**
 * 这个类演示Java中import关键字的使用方法
 *
 * import关键字的主要作用：
 * 1. 导入其他包中的类，使代码中可以省略包名前缀
 * 2. 提高代码可读性和编写效率
 * 3. 避免类名冲突
 *
 * import使用注意事项：
 * - 必须位于package声明之后，类定义之前
 * - 可以导入单个类(精确导入)或整个包(通配符导入)
 * - java.lang包中的类自动导入，无需显式声明
 * - 静态导入(static import)可以导入类的静态成员
 *
 * 导入方式比较：
 * 1. 单类型导入：import java.util.ArrayList; (推荐)
 * 2. 通配符导入：import java.util.*; (不推荐)
 * 3. 静态导入：import static java.lang.Math.PI;
 *
 * 最佳实践：
 * - 优先使用单类型导入
 * - 避免使用通配符导入(可能引起类名冲突)
 * - 静态导入应谨慎使用，避免滥用
 */

// 单类型导入示例
import java.util.ArrayList;   // 导入ArrayList类
import java.util.Date;       // 导入Date类

// 通配符导入示例(不推荐)
import java.io.*;            // 导入java.io包中所有类

// 静态导入示例
import static java.lang.Math.PI;     // 导入Math类的PI常量
import static java.lang.Math.pow;    // 导入Math类的pow方法

public class Import {
    public static void main(String[] args) {
        // 使用导入的类
        ArrayList<String> list = new ArrayList<>();
        Date now = new Date();

        // 使用通配符导入的类
        File file = new File("test.txt");

        // 使用静态导入的成员
        double circleArea = PI * pow(2, 2);  // 相当于Math.PI * Math.pow(2, 2)

        System.out.println("当前时间: " + now);
        System.out.println("圆的面积: " + circleArea);
    }

    /**
     * 处理同名类冲突的方法
     */
    public void handleNameConflict() {
        // 当导入的两个包中有同名类时，必须使用全限定名
        java.sql.Date sqlDate = new java.sql.Date(System.currentTimeMillis());
        java.util.Date utilDate = new java.util.Date();

        System.out.println("SQL日期: " + sqlDate);
        System.out.println("Util日期: " + utilDate);
    }
}

/**
 * 自定义类用于演示默认导入
 */
class MyClass {
    // java.lang包自动导入，无需显式声明
    String str = new String("Hello");  // java.lang.String
    Integer num = 10;                  // java.lang.Integer
}