package commonlyUsedClasses._text;

import java.text.SimpleDateFormat;
import java.text.ParseException;
import java.util.Date;
import java.util.Locale;

/**
 * SimpleDateFormat 示例类
 *
 * SimpleDateFormat 是 Java 中用于日期格式化和解析的类，继承自 DateFormat 类。
 *
 * 核心知识点：
 * 1. 模式字符：
 *    - y: 年（yyyy表示4位年份）
 *    - M: 月（MM表示2位月份）
 *    - d: 日（dd表示2位日期）
 *    - H: 24小时制小时
 *    - h: 12小时制小时
 *    - m: 分钟
 *    - s: 秒
 *    - S: 毫秒
 *    - E: 星期
 *    - a: 上午/下午标记
 *
 * 2. 主要方法：
 *    - format(Date date): 将Date格式化为字符串
 *    - parse(String source): 将字符串解析为Date
 *    - applyPattern(String pattern): 应用新模式
 *
 * 3. 线程安全性：
 *    - SimpleDateFormat 是非线程安全的
 *    - 多线程环境应使用ThreadLocal或同步处理
 *
 * 4. 异常处理：
 *    - parse()方法可能抛出ParseException
 *    - 应处理可能的解析异常
 *
 * 5. 本地化支持：
 *    - 可通过Locale指定地区格式
 *    - 不同地区的日期格式会自动适配
 *
 * 6. Java 8+替代方案：
 *    - DateTimeFormatter (线程安全且更强大)
 */
public class _SimpleDateFormat {

  public static void main(String[] args) {
    demonstrateFormatting();   // 日期格式化
    demonstrateParsing();     // 日期解析
    demonstratePatternChange();// 模式变更
    demonstrateLocalization(); // 本地化
    demonstrateThreadSafety(); // 线程安全
  }

  // ========== 日期格式化 ==========
  private static void demonstrateFormatting() {
    System.out.println("\n=== 日期格式化 ===");
    Date now = new Date();

    // 1. 基础格式化
    SimpleDateFormat sdf1 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    System.out.println("基础格式: " + sdf1.format(now));

    // 2. 包含毫秒
    SimpleDateFormat sdf2 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS");
    System.out.println("含毫秒: " + sdf2.format(now));

    // 3. 12小时制
    SimpleDateFormat sdf3 = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss a");
    System.out.println("12小时制: " + sdf3.format(now));
  }

  // ========== 日期解析 ==========
  private static void demonstrateParsing() {
    System.out.println("\n=== 日期解析 ===");
    String dateStr = "2023-06-15 14:30:45";

    try {
      SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
      Date date = sdf.parse(dateStr);
      System.out.println("解析结果: " + date);

      // 解析错误格式示例
      String wrongFormat = "2023/06/15";
      try {
        Date wrongDate = sdf.parse(wrongFormat);
        System.out.println(wrongDate);
      } catch (ParseException e) {
        System.out.println("解析失败: " + e.getMessage());
      }
    } catch (ParseException e) {
      e.printStackTrace();
    }
  }

  // ========== 模式变更 ==========
  private static void demonstratePatternChange() {
    System.out.println("\n=== 模式变更 ===");
    Date now = new Date();
    SimpleDateFormat sdf = new SimpleDateFormat();

    // 初始模式（默认）
    System.out.println("默认模式: " + sdf.format(now));

    // 应用新模式
    sdf.applyPattern("yyyy年MM月dd日 EEE");
    System.out.println("中文日期: " + sdf.format(now));

    sdf.applyPattern("EEE, MMM d, yyyy");
    System.out.println("英文格式: " + sdf.format(now));
  }

  // ========== 本地化 ==========
  private static void demonstrateLocalization() {
    System.out.println("\n=== 本地化 ===");
    Date now = new Date();

    // 美国格式
    SimpleDateFormat usFormat = new SimpleDateFormat("EEE, MMM d, yyyy", Locale.US);
    System.out.println("美国格式: " + usFormat.format(now));

    // 中国格式
    SimpleDateFormat cnFormat = new SimpleDateFormat("yyyy年MM月dd日 EEE", Locale.CHINA);
    System.out.println("中国格式: " + cnFormat.format(now));

    // 法国格式
    SimpleDateFormat frFormat = new SimpleDateFormat("EEE d MMM yyyy", Locale.FRANCE);
    System.out.println("法国格式: " + frFormat.format(now));
  }

  // ========== 线程安全 ==========
  private static void demonstrateThreadSafety() {
    System.out.println("\n=== 线程安全 ===");
    // 错误示例：多线程共享SimpleDateFormat
    // 正确做法应使用ThreadLocal或每次创建新实例

    System.out.println("提示：SimpleDateFormat是非线程安全的");
    System.out.println("推荐解决方案：");
    System.out.println("1. 每次使用创建新实例");
    System.out.println("2. 使用ThreadLocal包装");
    System.out.println("3. Java 8+使用DateTimeFormatter");
  }

  // ========== 线程安全的解决方案示例 ==========
  private static class SafeDateFormat {
    // ThreadLocal解决方案
    private static final ThreadLocal<SimpleDateFormat> threadLocalFormat =
      ThreadLocal.withInitial(() -> new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"));

    public static String format(Date date) {
      return threadLocalFormat.get().format(date);
    }

    public static Date parse(String str) throws ParseException {
      return threadLocalFormat.get().parse(str);
    }
  }
}