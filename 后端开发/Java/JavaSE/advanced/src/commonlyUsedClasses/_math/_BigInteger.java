package commonlyUsedClasses._math;

import java.math.BigInteger;
import java.util.Random;

/**
 * BigInteger 示例类
 *
 * BigInteger 提供任意精度的整数运算，解决了long类型溢出的问题
 *
 * 核心知识点：
 * 1. 不可变性：所有运算都返回新对象，原对象不变
 * 2. 无范围限制：可以表示任意大小的整数
 * 3. 适用场景：密码学、大数计算等需要大整数运算的场景
 *
 * 重要方法：
 * - 算术运算：add(), subtract(), multiply(), divide(), mod()
 * - 位运算：and(), or(), xor(), shiftLeft(), shiftRight()
 * - 比较：compareTo()
 * - 素数测试：isProbablePrime()
 * - 值转换：intValue(), longValue()等
 */
public class _BigInteger {
  public static void main(String[] args) {
    demonstrateCreation();      // 创建BigInteger对象
    demonstrateArithmetic();    // 算术运算
    demonstrateBitOperations(); // 位运算
    demonstrateModularArithmetic(); // 模运算
    demonstratePrimeTesting();  // 素数测试
    demonstrateConversion();    // 类型转换
    demonstrateFactorial();     // 大数阶乘示例
  }

  // ========== 创建BigInteger对象 ==========
  private static void demonstrateCreation() {
    System.out.println("=== 创建BigInteger对象 ===");

    // 1. 使用字符串构造（十进制）
    BigInteger bi1 = new BigInteger("123456789012345678901234567890");
    System.out.println("字符串创建(十进制): " + bi1);

    // 2. 使用字符串构造（指定进制）
    BigInteger bi2 = new BigInteger("10101010101010101010", 2);
    System.out.println("字符串创建(二进制): " + bi2);

    // 3. 使用valueOf方法（long类型转换）
    BigInteger bi3 = BigInteger.valueOf(1234567890L);
    System.out.println("valueOf创建: " + bi3);

    // 4. 生成随机大整数
    BigInteger bi4 = new BigInteger(100, new Random());
    System.out.println("100位随机数: " + bi4);

    // 5. 使用常量
    System.out.println("BigInteger.ZERO: " + BigInteger.ZERO);
    System.out.println("BigInteger.ONE: " + BigInteger.ONE);
    System.out.println("BigInteger.TEN: " + BigInteger.TEN);
  }

  // ========== 算术运算 ==========
  private static void demonstrateArithmetic() {
    System.out.println("\n=== 算术运算 ===");
    BigInteger a = new BigInteger("12345678901234567890");
    BigInteger b = new BigInteger("98765432109876543210");

    // 加法
    BigInteger sum = a.add(b);
    System.out.println("加法: " + a + " + " + b + " = " + sum);

    // 减法
    BigInteger difference = a.subtract(b);
    System.out.println("减法: " + a + " - " + b + " = " + difference);

    // 乘法
    BigInteger product = a.multiply(b);
    System.out.println("乘法: " + a + " * " + b + " = " + product);

    // 除法
    BigInteger quotient = a.divide(b);
    System.out.println("除法: " + a + " / " + b + " = " + quotient);
  }

  // ========== 位运算 ==========
  private static void demonstrateBitOperations() {
    System.out.println("\n=== 位运算 ===");
    BigInteger a = new BigInteger("13"); // 1101
    BigInteger b = new BigInteger("10"); // 1010

    // 与运算
    System.out.println(a + " AND " + b + " = " + a.and(b)); // 8 (1000)

    // 或运算
    System.out.println(a + " OR " + b + " = " + a.or(b));   // 15 (1111)

    // 异或运算
    System.out.println(a + " XOR " + b + " = " + a.xor(b)); // 7 (0111)

    // 左移
    System.out.println(a + " << 2 = " + a.shiftLeft(2));   // 52 (110100)

    // 右移
    System.out.println(a + " >> 1 = " + a.shiftRight(1));  // 6 (110)
  }

  // ========== 模运算 ==========
  private static void demonstrateModularArithmetic() {
    System.out.println("\n=== 模运算 ===");
    BigInteger a = new BigInteger("123456789");
    BigInteger m = new BigInteger("98765");

    // 取模
    BigInteger mod = a.mod(m);
    System.out.println(a + " mod " + m + " = " + mod);

    // 模幂运算（高效计算大数幂模）
    BigInteger exp = new BigInteger("1000");
    BigInteger modPow = a.modPow(exp, m);
    System.out.println(a + "^" + exp + " mod " + m + " = " + modPow);

    // 模逆元（用于密码学）
    try {
      BigInteger modInverse = a.modInverse(m);
      System.out.println(a + "^-1 mod " + m + " = " + modInverse);
    } catch (ArithmeticException e) {
      System.out.println("逆元不存在: " + a + " 和 " + m + " 不互质");
    }
  }

  // ========== 素数测试 ==========
  private static void demonstratePrimeTesting() {
    System.out.println("\n=== 素数测试 ===");
    BigInteger primeCandidate = new BigInteger("12345678910987654321");

    // 确定性测试（较慢）
    // boolean isPrime = primeCandidate.isProbablePrime(1); // 1表示确定性测试

    // 概率性测试（较快，参数为确定性程度）
    int certainty = 100; // 错误概率小于2^(-certainty)
    boolean isProbablePrime = primeCandidate.isProbablePrime(certainty);
    System.out.println(primeCandidate + " 可能是素数吗？ " + isProbablePrime);

    // 生成素数
    BigInteger prime = BigInteger.probablePrime(256, new Random());
    System.out.println("256位可能素数: " + prime);
  }

  // ========== 类型转换 ==========
  private static void demonstrateConversion() {
    System.out.println("\n=== 类型转换 ===");
    BigInteger big = new BigInteger("12345678901234567890");

    // 转换为基本类型（可能丢失精度）
    System.out.println("intValue: " + big.intValue());
    System.out.println("longValue: " + big.longValue());

    // 安全转换
    try {
      System.out.println("intValueExact: " + big.intValueExact());
    } catch (ArithmeticException e) {
      System.out.println("无法精确转换为int: 值太大");
    }

    // 转换为字符串
    System.out.println("toString: " + big.toString());
    System.out.println("toString(16): " + big.toString(16)); // 十六进制
  }

  // ========== 大数阶乘示例 ==========
  private static void demonstrateFactorial() {
    System.out.println("\n=== 计算100的阶乘 ===");
    BigInteger factorial = BigInteger.ONE;
    for (int i = 1; i <= 100; i++) {
      factorial = factorial.multiply(BigInteger.valueOf(i));
    }
    System.out.println("100! = " + factorial);
    System.out.println("位数: " + factorial.toString().length());
  }
}