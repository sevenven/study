package commonlyUsedClasses._math;

import java.math.BigDecimal;
import java.math.MathContext;
import java.math.RoundingMode;
import java.util.Arrays;

/**
 * BigDecimal 示例类
 *
 * BigDecimal 提供高精度的十进制运算，解决了浮点数计算不精确的问题
 *
 * 核心知识点：
 * 1. 不可变性：所有运算都返回新对象，原对象不变
 * 2. 精度控制：可指定小数位数和舍入模式
 * 3. 适用场景：财务计算、科学计算等需要精确结果的场景
 *
 * 重要方法：
 * - 加减乘除：add(), subtract(), multiply(), divide()
 * - 比较：compareTo()
 * - 舍入：setScale()
 * - 值转换：intValue(), doubleValue()等
 */
public class _BigDecimal {
  public static void main(String[] args) {
    demonstrateCreation();      // 创建BigDecimal对象
    demonstrateArithmetic();   // 算术运算
    demonstrateRounding();     // 舍入控制
    demonstrateComparison();   // 比较操作
    demonstrateScale();        // 小数位数控制
    demonstrateMathContext();  // 数学上下文
  }

  // ========== 创建BigDecimal对象 ==========
  private static void demonstrateCreation() {
    System.out.println("=== 创建BigDecimal对象 ===");

    // 1. 使用字符串构造（推荐）
    BigDecimal bd1 = new BigDecimal("0.1");
    System.out.println("字符串创建: " + bd1);

    // 2. 使用double构造（不推荐，可能有精度问题）
    BigDecimal bd2 = new BigDecimal(0.1);
    System.out.println("double创建: " + bd2 + " ← 注意精度问题");

    // 3. 使用valueOf方法（内部会调用toString）
    BigDecimal bd3 = BigDecimal.valueOf(0.1);
    System.out.println("valueOf创建: " + bd3);

    // 4. 使用整数构造
    BigDecimal bd4 = new BigDecimal(10);
    System.out.println("整数创建: " + bd4);
  }

  // ========== 算术运算 ==========
  private static void demonstrateArithmetic() {
    System.out.println("\n=== 算术运算 ===");
    BigDecimal a = new BigDecimal("10.5");
    BigDecimal b = new BigDecimal("3.2");

    // 加法
    BigDecimal sum = a.add(b);
    System.out.println("加法: " + a + " + " + b + " = " + sum);

    // 减法
    BigDecimal difference = a.subtract(b);
    System.out.println("减法: " + a + " - " + b + " = " + difference);

    // 乘法
    BigDecimal product = a.multiply(b);
    System.out.println("乘法: " + a + " * " + b + " = " + product);

    // 除法（需要指定舍入模式）
    BigDecimal quotient = a.divide(b, 4, RoundingMode.HALF_UP);
    System.out.println("除法: " + a + " / " + b + " = " + quotient);
  }

  // ========== 舍入控制 ==========
  private static void demonstrateRounding() {
    System.out.println("\n=== 舍入控制 ===");
    BigDecimal num = new BigDecimal("2.34567");

    // 常用舍入模式
    RoundingMode[] modes = {
      RoundingMode.UP,          // 远离零方向舍入
      RoundingMode.DOWN,        // 向零方向舍入
      RoundingMode.CEILING,     // 向正无穷方向舍入
      RoundingMode.FLOOR,       // 向负无穷方向舍入
      RoundingMode.HALF_UP,     // 四舍五入
      RoundingMode.HALF_DOWN,   // 五舍六入
      RoundingMode.HALF_EVEN    // 银行家舍入法
    };

    // 展示不同舍入模式
    System.out.println("原始值: " + num);
    Arrays.stream(modes).forEach(mode -> {
      BigDecimal rounded = num.setScale(2, mode);
      System.out.println(mode + ": " + rounded);
    });
  }

  // ========== 比较操作 ==========
  private static void demonstrateComparison() {
    System.out.println("\n=== 比较操作 ===");
    BigDecimal a = new BigDecimal("1.00");
    BigDecimal b = new BigDecimal("1.0");
    BigDecimal c = new BigDecimal("1.01");

    // 使用compareTo比较（忽略小数位数）
    System.out.println(a + " compareTo " + b + " = " + a.compareTo(b));  // 0
    System.out.println(a + " compareTo " + c + " = " + a.compareTo(c));  // -1

    // 使用equals比较（考虑小数位数）
    System.out.println(a + " equals " + b + " = " + a.equals(b));        // false
  }

  // ========== 小数位数控制 ==========
  private static void demonstrateScale() {
    System.out.println("\n=== 小数位数控制 ===");
    BigDecimal num = new BigDecimal("123.456789");

    // 设置小数位数（舍入模式为HALF_UP）
    BigDecimal scaled1 = num.setScale(2, RoundingMode.HALF_UP);
    System.out.println("保留2位小数: " + scaled1);

    // 设置小数位数（舍入模式为向下舍入）
    BigDecimal scaled2 = num.setScale(3, RoundingMode.FLOOR);
    System.out.println("保留3位小数(向下舍入): " + scaled2);

    // 去掉小数部分
    BigDecimal integer = num.setScale(0, RoundingMode.DOWN);
    System.out.println("取整: " + integer);
  }

  // ========== 数学上下文 ==========
  private static void demonstrateMathContext() {
    System.out.println("\n=== 数学上下文 ===");
    MathContext mc = new MathContext(4, RoundingMode.HALF_UP);  // 4位精度，四舍五入

    BigDecimal a = new BigDecimal("3.1415926");
    BigDecimal b = new BigDecimal("2.7182818");

    // 使用数学上下文进行运算
    BigDecimal sum = a.add(b, mc);
    System.out.println("加法(4位精度): " + sum);

    BigDecimal product = a.multiply(b, mc);
    System.out.println("乘法(4位精度): " + product);
  }
}