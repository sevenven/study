package commonlyUsedClasses._lang;

/**
 * System 示例类
 *
 * System 类提供与系统相关的实用方法和字段
 *
 * 核心功能：
 * 1. 标准输入/输出/错误流
 * 2. 系统属性访问
 * 3. 环境变量访问
 * 4. 系统时间获取
 * 5. 数组复制
 * 6. 垃圾回收控制
 * 7. 程序终止
 */
public class _System {
  public static void main(String[] args) {
    demonstrateStandardIO();    // 标准输入输出
    demonstrateSystemProperties(); // 系统属性
    demonstrateEnvironmentVariables(); // 环境变量
    demonstrateTimeMethods();   // 时间方法
    demonstrateArrayCopy();     // 数组复制
    demonstrateGarbageCollection(); // 垃圾回收
    demonstrateExit();          // 程序终止
  }

  // ========== 标准输入输出 ==========
  private static void demonstrateStandardIO() {
    System.out.println("\n=== 标准输入输出 ===");

    // 标准输出流
    System.out.println("这是标准输出(System.out)");

    // 标准错误流
    System.err.println("这是标准错误(System.err)");

    // 标准输入流(示例)
    try {
      System.out.print("请输入一个字符: ");
      int inputChar = System.in.read();
      System.out.println("你输入的字符ASCII码是: " + inputChar);
    } catch (Exception e) {
      System.err.println("输入错误: " + e.getMessage());
    }
  }

  // ========== 系统属性 ==========
  private static void demonstrateSystemProperties() {
    System.out.println("\n=== 系统属性 ===");

    // 获取单个属性
    String javaVersion = System.getProperty("java.version");
    String osName = System.getProperty("os.name");
    System.out.println("Java版本: " + javaVersion);
    System.out.println("操作系统: " + osName);

    // 设置属性
    System.setProperty("custom.property", "hello");
    System.out.println("自定义属性: " + System.getProperty("custom.property"));

    // 获取所有属性
    System.out.println("\n所有系统属性:");
    System.getProperties().list(System.out);
  }

  // ========== 环境变量 ==========
  private static void demonstrateEnvironmentVariables() {
    System.out.println("\n=== 环境变量 ===");

    // 获取单个环境变量
    String path = System.getenv("PATH");
    System.out.println("PATH环境变量: " + (path != null ? path.substring(0, 50) + "..." : "null"));

    // 获取所有环境变量
    System.out.println("\n所有环境变量:");
    System.getenv().forEach((key, value) ->
      System.out.println(key + "=" + value));
  }

  // ========== 时间方法 ==========
  private static void demonstrateTimeMethods() {
    System.out.println("\n=== 时间方法 ===");

    // 当前时间毫秒数(适合测量时间间隔)
    long startTime = System.currentTimeMillis();

    // 高精度纳秒时间(适合测量短时间间隔)
    long nanoStart = System.nanoTime();

    // 模拟耗时操作
    try {
      Thread.sleep(100);
    } catch (InterruptedException e) {
      e.printStackTrace();
    }

    long endTime = System.currentTimeMillis();
    long nanoEnd = System.nanoTime();

    System.out.println("操作耗时(毫秒): " + (endTime - startTime));
    System.out.println("操作耗时(纳秒): " + (nanoEnd - nanoStart));
  }

  // ========== 数组复制 ==========
  private static void demonstrateArrayCopy() {
    System.out.println("\n=== 数组复制 ===");

    int[] source = {1, 2, 3, 4, 5};
    int[] dest = new int[10];

    System.out.println("复制前目标数组:");
    printArray(dest);

    // 参数说明: 源数组, 源起始位置, 目标数组, 目标起始位置, 复制长度
    System.arraycopy(source, 0, dest, 2, source.length);

    System.out.println("复制后目标数组:");
    printArray(dest);
  }

  private static void printArray(int[] arr) {
    for (int num : arr) {
      System.out.print(num + " ");
    }
    System.out.println();
  }

  // ========== 垃圾回收 ==========
  private static void demonstrateGarbageCollection() {
    System.out.println("\n=== 垃圾回收 ===");

    // 创建大量临时对象
    for (int i = 0; i < 10000; i++) {
      new Object();
    }

    // 建议JVM运行垃圾回收(不保证立即执行)
    System.gc();

    System.out.println("已建议垃圾回收");
  }

  // ========== 程序终止 ==========
  private static void demonstrateExit() {
    System.out.println("\n=== 程序终止 ===");

    // 正常终止
    System.out.println("程序即将正常退出");
    System.exit(0); // 0表示正常退出

    // 非正常终止(不会执行)
    System.out.println("这行不会被执行");
    System.exit(1); // 非零表示异常退出
  }
}