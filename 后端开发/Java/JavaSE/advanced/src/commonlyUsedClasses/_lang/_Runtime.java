package commonlyUsedClasses._lang;

/**
 * Runtime 类示例演示
 *
 * Runtime 类特点：
 * 1. 每个 Java 应用程序都有一个 Runtime 实例
 * 2. 通过 getRuntime() 方法获取实例
 * 3. 提供了与运行时环境交互的方法
 *
 * 主要功能：
 * - 执行系统命令
 * - 内存管理
 * - 关闭钩子
 * - 退出虚拟机
 */
public class _Runtime {

  /**
   * 演示内存管理方法
   *
   * 包含方法：
   * - totalMemory() - JVM 总内存量
   * - freeMemory() - JVM 空闲内存量
   * - maxMemory() - JVM 最大可用内存量
   * - gc() - 建议 JVM 执行垃圾回收
   */
  public static void demonstrateMemoryManagement() {
    Runtime runtime = Runtime.getRuntime();

    System.out.println("===== 内存信息 =====");
    System.out.println("总内存: " + runtime.totalMemory() / 1024 / 1024 + " MB");
    System.out.println("空闲内存: " + runtime.freeMemory() / 1024 / 1024 + " MB");
    System.out.println("最大内存: " + runtime.maxMemory() / 1024 / 1024 + " MB");

    System.out.println("\n执行垃圾回收前...");
    System.out.println("空闲内存: " + runtime.freeMemory() / 1024 / 1024 + " MB");

    runtime.gc(); // 建议 JVM 执行垃圾回收

    System.out.println("执行垃圾回收后...");
    System.out.println("空闲内存: " + runtime.freeMemory() / 1024 / 1024 + " MB");
  }

  /**
   * 演示执行系统命令
   *
   * 包含方法：
   * - exec() - 执行系统命令
   *
   * 注意：
   * 1. 命令执行是平台相关的
   * 2. 需要处理可能的 IOException
   */
  public static void demonstrateExecCommand() {
    Runtime runtime = Runtime.getRuntime();

    try {
      System.out.println("\n===== 执行系统命令 =====");

      // Windows 示例
      // Process process = runtime.exec("cmd /c dir");

      // Linux/Mac 示例
      Process process = runtime.exec("ls -l");

      // 读取命令输出
      java.util.Scanner scanner = new java.util.Scanner(process.getInputStream());
      while (scanner.hasNextLine()) {
        System.out.println(scanner.nextLine());
      }
      scanner.close();

      // 等待命令执行完成
      int exitValue = process.waitFor();
      System.out.println("命令执行完成，退出值: " + exitValue);

    } catch (Exception e) {
      e.printStackTrace();
    }
  }

  /**
   * 演示关闭钩子
   *
   * 包含方法：
   * - addShutdownHook() - 添加关闭钩子
   * - removeShutdownHook() - 移除关闭钩子
   *
   * 注意：
   * 1. 关闭钩子在 JVM 关闭时执行
   * 2. 不能保证所有钩子都能执行完成
   */
  public static void demonstrateShutdownHook() {
    Runtime runtime = Runtime.getRuntime();

    Thread hook = new Thread(() -> {
      System.out.println("\n===== 执行关闭钩子 =====");
      System.out.println("正在清理资源...");
      System.out.println("保存数据...");
      System.out.println("关闭钩子执行完成");
    });

    runtime.addShutdownHook(hook);
    System.out.println("已添加关闭钩子");

    // 可以取消注册
    // runtime.removeShutdownHook(hook);
  }

  /**
   * 演示虚拟机退出
   *
   * 包含方法：
   * - exit() - 终止当前运行的虚拟机
   * - halt() - 强制终止虚拟机
   *
   * 注意：
   * 1. exit() 会触发关闭钩子
   * 2. halt() 不会触发关闭钩子
   */
  public static void demonstrateExit() {
    Runtime runtime = Runtime.getRuntime();

    System.out.println("\n===== 虚拟机退出 =====");
    System.out.println("调用 exit() 方法前");

    // 实际使用时取消注释
    // runtime.exit(0); // 正常退出，会执行关闭钩子
    // runtime.halt(1); // 强制退出，不会执行关闭钩子

    System.out.println("调用 exit() 方法后 - 这行不会执行");
  }

  public static void main(String[] args) {
    System.out.println("===== Runtime 类示例 =====");

    demonstrateMemoryManagement();
    demonstrateExecCommand();
    demonstrateShutdownHook();
    demonstrateExit();

    // 为了演示关闭钩子，这里主动退出
    System.out.println("\n主方法执行完成，即将退出...");
    // Runtime.getRuntime().exit(0);
  }
}