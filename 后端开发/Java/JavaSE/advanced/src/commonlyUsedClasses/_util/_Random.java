package commonlyUsedClasses._util;

import java.util.Random;

/**
 * Random 类示例演示
 *
 * Random 类特点：
 * 1. 用于生成伪随机数
 * 2. 可以设置种子(seed)保证随机序列可重复
 * 3. 线程安全(多线程使用可能影响性能)
 *
 * 主要功能：
 * - 生成各种类型的随机数
 * - 生成随机布尔值
 * - 生成随机字节数组
 */
public class _Random {

  /**
   * 演示基本随机数生成
   *
   * 包含方法：
   * - nextInt() - 生成随机整数
   * - nextInt(n) - 生成[0,n)范围的随机整数
   * - nextLong() - 生成随机长整数
   * - nextDouble() - 生成[0.0,1.0)范围的随机双精度浮点数
   * - nextFloat() - 生成[0.0,1.0)范围的随机单精度浮点数
   */
  public static void demonstrateBasicRandomNumbers() {
    Random random = new Random();

    System.out.println("===== 基本随机数生成 =====");
    System.out.println("随机整数: " + random.nextInt());
    System.out.println("0-99随机整数: " + random.nextInt(100));
    System.out.println("随机长整数: " + random.nextLong());
    System.out.println("随机双精度浮点数: " + random.nextDouble());
    System.out.println("随机单精度浮点数: " + random.nextFloat());
  }

  /**
   * 演示种子(seed)的作用
   *
   * 注意：
   * 1. 相同种子会产生相同的随机数序列
   * 2. 不设置种子会使用系统时间作为默认种子
   */
  public static void demonstrateSeedEffect() {
    long seed = 12345L;

    System.out.println("\n===== 种子效果演示 =====");

    Random random1 = new Random(seed);
    Random random2 = new Random(seed);

    System.out.println("相同种子的Random实例1: " + random1.nextInt(100));
    System.out.println("相同种子的Random实例2: " + random2.nextInt(100));

    Random random3 = new Random();
    System.out.println("不同种子的Random实例: " + random3.nextInt(100));
  }

  /**
   * 演示随机布尔值和字节数组
   *
   * 包含方法：
   * - nextBoolean() - 生成随机布尔值
   * - nextBytes(byte[]) - 用随机值填充字节数组
   */
  public static void demonstrateBooleanAndBytes() {
    Random random = new Random();

    System.out.println("\n===== 随机布尔值和字节数组 =====");
    System.out.println("随机布尔值: " + random.nextBoolean());

    byte[] bytes = new byte[5];
    random.nextBytes(bytes);
    System.out.print("随机字节数组: ");
    for (byte b : bytes) {
      System.out.print(b + " ");
    }
    System.out.println();
  }

  /**
   * 演示高斯(正态)分布随机数
   *
   * 包含方法：
   * - nextGaussian() - 生成均值为0.0，标准差为1.0的高斯分布随机数
   *
   * 注意：
   * 1. 可用于模拟自然现象中的随机分布
   * 2. 值可能超出常见范围，需要适当处理
   */
  public static void demonstrateGaussianDistribution() {
    Random random = new Random();

    System.out.println("\n===== 高斯分布随机数 =====");
    for (int i = 0; i < 5; i++) {
      System.out.println("高斯随机数: " + random.nextGaussian());
    }
  }

  /**
   * 演示实用随机数生成方法
   *
   * 实用场景：
   * 1. 生成指定范围的随机数
   * 2. 生成随机字符串
   */
  public static void demonstratePracticalMethods() {
    Random random = new Random();

    System.out.println("\n===== 实用随机数生成 =====");

    // 生成指定范围随机数
    int min = 10, max = 20;
    int randomInRange = random.nextInt(max - min + 1) + min;
    System.out.println(min + "-" + max + "范围内的随机数: " + randomInRange);

    // 生成随机字符串
    String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    StringBuilder sb = new StringBuilder();
    for (int i = 0; i < 8; i++) {
      sb.append(chars.charAt(random.nextInt(chars.length())));
    }
    System.out.println("8位随机字符串: " + sb.toString());
  }

  public static void main(String[] args) {
    System.out.println("===== Random 类示例 =====");

    demonstrateBasicRandomNumbers();
    demonstrateSeedEffect();
    demonstrateBooleanAndBytes();
    demonstrateGaussianDistribution();
    demonstratePracticalMethods();
  }
}