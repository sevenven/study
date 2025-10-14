package commonlyUsedClasses._time._format;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;
import java.util.Locale;

/**
 * DateTimeFormatter 示例类
 *
 * DateTimeFormatter 是 Java 8 引入的日期时间格式化类，用于替代旧的 SimpleDateFormat
 *
 * 核心知识点：
 * 1. 线程安全性：
 *    - 所有实例都是不可变的和线程安全的
 *    - 可以安全地在多线程环境中共享
 *
 * 2. 三种创建方式：
 *    - 预定义的标准格式（如ISO_LOCAL_DATE）
 *    - 本地化格式（如ofLocalizedDateTime）
 *    - 自定义模式（如ofPattern）
 *
 * 3. 格式化模式符号：
 *    - y: 年
 *    - M: 月
 *    - d: 日
 *    - H: 小时（24小时制）
 *    - h: 小时（12小时制）
 *    - m: 分钟
 *    - s: 秒
 *    - S: 毫秒
 *    - a: 上午/下午
 *    - E: 星期
 *
 * 4. 主要功能：
 *    - format(): 将日期时间对象格式化为字符串
 *    - parse(): 将字符串解析为日期时间对象
 *    - withLocale(): 设置地区
 *    - withZone(): 设置时区
 *
 * 5. 与旧API对比优势：
 *    - 线程安全
 *    - 更清晰的API设计
 *    - 更好的性能
 *    - 内置常用格式
 */
public class _DateTimeFormatter {

  public static void main(String[] args) {
    demonstratePredefinedFormats();  // 预定义格式
    demonstrateLocalizedFormats();   // 本地化格式
    demonstrateCustomPatterns();     // 自定义模式
    demonstrateParsing();            // 解析字符串
    demonstrateLocaleSpecific();     // 地区特定格式
  }

  // ========== 预定义格式 ==========
  private static void demonstratePredefinedFormats() {
    System.out.println("\n=== 预定义格式 ===");
    LocalDateTime now = LocalDateTime.now();

    // 1. ISO格式
    System.out.println("ISO_LOCAL_DATE: " +
      now.format(DateTimeFormatter.ISO_LOCAL_DATE));
    System.out.println("ISO_LOCAL_TIME: " +
      now.format(DateTimeFormatter.ISO_LOCAL_TIME));
    System.out.println("ISO_LOCAL_DATE_TIME: " +
      now.format(DateTimeFormatter.ISO_LOCAL_DATE_TIME));

    // 2. 基本ISO格式
    System.out.println("BASIC_ISO_DATE: " +
      now.format(DateTimeFormatter.BASIC_ISO_DATE));
  }

  // ========== 本地化格式 ==========
  private static void demonstrateLocalizedFormats() {
    System.out.println("\n=== 本地化格式 ===");
    LocalDateTime now = LocalDateTime.now();

    // 1. 短格式
    DateTimeFormatter shortFormatter =
      DateTimeFormatter.ofLocalizedDateTime(FormatStyle.SHORT);
    System.out.println("SHORT格式: " + now.format(shortFormatter));

    // 2. 中等格式
    DateTimeFormatter mediumFormatter =
      DateTimeFormatter.ofLocalizedDateTime(FormatStyle.MEDIUM);
    System.out.println("MEDIUM格式: " + now.format(mediumFormatter));

    // 3. 长格式
    DateTimeFormatter longFormatter =
      DateTimeFormatter.ofLocalizedDateTime(FormatStyle.LONG)
        .withLocale(Locale.CHINA);
    System.out.println("LONG格式(中国): " + now.format(longFormatter));
  }

  // ========== 自定义模式 ==========
  private static void demonstrateCustomPatterns() {
    System.out.println("\n=== 自定义模式 ===");
    LocalDateTime now = LocalDateTime.now();

    // 1. 基本日期时间格式
    DateTimeFormatter formatter1 = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
    System.out.println("自定义格式1: " + now.format(formatter1));

    // 2. 带星期和上午下午
    DateTimeFormatter formatter2 = DateTimeFormatter.ofPattern("yyyy年MM月dd日 EEEE a hh:mm:ss");
    System.out.println("自定义格式2: " + now.format(formatter2));

    // 3. 带时区的格式（适用于ZonedDateTime）
    ZonedDateTime zdt = ZonedDateTime.now();
    DateTimeFormatter formatter3 = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss z");
    System.out.println("带时区格式: " + zdt.format(formatter3));
  }

  // ========== 解析字符串 ==========
  private static void demonstrateParsing() {
    System.out.println("\n=== 解析字符串 ===");

    // 1. 解析日期
    String dateStr = "2023-06-15";
    LocalDate date = LocalDate.parse(dateStr, DateTimeFormatter.ISO_LOCAL_DATE);
    System.out.println("解析日期: " + date);

    // 2. 解析自定义格式
    String datetimeStr = "2023年06月15日 14:30:45";
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy年MM月dd日 HH:mm:ss");
    LocalDateTime datetime = LocalDateTime.parse(datetimeStr, formatter);
    System.out.println("解析日期时间: " + datetime);

    // 3. 解析失败处理
    String invalidStr = "2023/06/15";
    try {
      LocalDate invalidDate = LocalDate.parse(invalidStr, DateTimeFormatter.ISO_LOCAL_DATE);
      System.out.println(invalidDate);
    } catch (Exception e) {
      System.out.println("解析失败: " + e.getMessage());
    }
  }

  // ========== 地区特定格式 ==========
  private static void demonstrateLocaleSpecific() {
    System.out.println("\n=== 地区特定格式 ===");
    LocalDateTime now = LocalDateTime.now();

    // 1. 美国格式
    DateTimeFormatter usFormatter = DateTimeFormatter.ofPattern("EEE, MMM d, yyyy h:mm a")
      .withLocale(Locale.US);
    System.out.println("美国格式: " + now.format(usFormatter));

    // 2. 德国格式
    DateTimeFormatter deFormatter = DateTimeFormatter.ofPattern("EEEE, d. MMMM yyyy HH:mm")
      .withLocale(Locale.GERMANY);
    System.out.println("德国格式: " + now.format(deFormatter));

    // 3. 日本格式
    DateTimeFormatter jpFormatter = DateTimeFormatter.ofPattern("Gy年M月d日 EEEE a h時m分")
      .withLocale(Locale.JAPAN);
    System.out.println("日本格式: " + now.format(jpFormatter));
  }
}