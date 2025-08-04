package variable;

/**
 * Java包装类(Wrapper Class)示例类
 *
 * 包装类是Java为8种基本数据类型提供的对象表示形式，位于java.lang包中。
 *
 * 一、基本数据类型与对应包装类：
 * byte->Byte, short->Short, int->Integer, long->Long
 * float->Float, double->Double, boolean->Boolean, char->Character
 *
 * 二、包装类的主要用途：
 * 1. 让基本数据类型具有对象的特性，可以参与面向对象的操作
 * 2. 提供各种实用方法（如类型转换、进制转换等）
 * 3. 用于泛型（泛型不能使用基本类型）
 * 4. 允许null值表示"无数据"状态
 *
 * 三、自动装箱(Autoboxing)和拆箱(Unboxing)：
 * - 装箱：基本类型->包装类（自动调用valueOf()）
 * - 拆箱：包装类->基本类型（自动调用xxxValue()）
 * - Java 5引入的特性，简化转换代码
 *
 * 四、重要特性说明：
 * 1. 缓存机制：
 *    - Integer/Byte/Short/Long缓存-128到127的值
 *    - Character缓存0到127的字符
 *    - Boolean缓存TRUE和FALSE
 *
 * 2. 自动装箱原理：
 *    Integer i = 100; => Integer i = Integer.valueOf(100);
 *
 * 3. 拆箱原理：
 *    int n = i; => int n = i.intValue();
 *
 * 4. 注意事项：
 *    - 包装类对象不可变（所有修改操作都返回新对象）
 *    - 比较包装类对象应使用equals()而非==（缓存范围内除外）
 *    - 拆箱null值会抛出NullPointerException
 *
 * 5. 实用方法：
 *    - parseXxx(): 字符串转基本类型
 *    - valueOf(): 字符串或基本类型转包装类
 *    - toString(): 转为字符串
 *    - compare(): 比较两个值
 *    - 各种进制转换方法
 */
public class WrapperClass {

    /**
     * 演示基本类型与包装类的转换
     *
     * @param args 命令行参数
     */
    public static void main(String[] args) {
        // 1. 手动转换（Java 5之前的方式）
        int primitiveInt = 100;
        Integer wrapperInt = Integer.valueOf(primitiveInt); // 手动装箱
        int unboxedInt = wrapperInt.intValue();            // 手动拆箱

        // 2. 自动装箱与拆箱（Java 5+）
        Integer autoBoxed = 200;      // 自动装箱
        int autoUnboxed = autoBoxed;  // 自动拆箱

        // 3. 包装类实用方法
        String numberStr = "123";
        int parsedInt = Integer.parseInt(numberStr);  // 字符串转int
        String binaryStr = Integer.toBinaryString(10); // 转二进制字符串

        // 4. 特殊值处理演示
        try {
            Integer nullValue = null;
            int riskyUnbox = nullValue; // 抛出NullPointerException
        } catch (NullPointerException e) {
            System.out.println("空指针异常: 不能对null值拆箱");
        }

        // 5. 缓存机制演示
        Integer a = 100, b = 100;  // 使用缓存对象
        Integer c = 200, d = 200;  // 新建对象
    }

    /**
     * 性能比较：基本类型 vs 包装类
     *
     * 测试结果说明：
     * - 包装类对象比基本类型占用更多内存（对象开销）
     * - 包装类访问速度稍慢（需要拆箱）
     * - 建议：需要对象特性时用包装类，大量计算用基本类型
     */
    public static void performanceComparison() {
        long sumPrimitive = 0;  // 基本类型
        Long sumWrapper = 0L;    // 包装类

        // 基本类型性能测试...
        // 包装类性能测试...
    }
}
