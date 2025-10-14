package commonlyUsedClasses._time;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;

/**
 * LocalTime 示例类
 *
 * LocalTime 是 Java 8 引入的时间类，表示不带日期的时间（时:分:秒.纳秒）
 *
 * 核心知识点：
 * 1. 不可变性：
 *    - 所有修改操作都返回新实例
 *    - 原始对象不会被改变
 *    - 天生线程安全
 *
 * 2. 主要功能：
 *    - 获取当前时间：LocalTime.now()
 *    - 创建特定时间：LocalTime.of()
 *    - 时间加减：plus/minus 方法
 *    - 时间比较：isBefore/isAfter
 *    - 时间格式化：format()
 *
 * 3. 常用方法：
 *    - getHour()/getMinute()/getSecond()/getNano(): 获取时分秒纳秒
 *    - plusHours()/plusMinutes()/plusSeconds(): 增加时间
 *    - until(): 计算时间差
 *    - truncatedTo(): 截断时间
 *
 * 4. 时间运算：
 *    - 支持加减小时、分钟、秒、纳秒
 *    - 自动处理24小时制循环
 *
 * 5. 格式化：
 *    - 使用DateTimeFormatter格式化
 *    - 内置ISO格式（如ISO_LOCAL_TIME）
 *
 * 6. 典型应用场景：
 *    - 计时器、闹钟等时间相关功能
 *    - 营业时间计算
 *    - 时间段测量
 */
public class _LocalTime {

  public static void main(String[] args) {
    demonstrateCreation();      // 创建LocalTime
    demonstrateManipulation();  // 时间操作
    demonstrateComparison();    // 时间比较
    demonstrateFormatting();    // 时间格式化
    demonstrateTruncation();    // 时间截断
  }

  // ========== 创建LocalTime ==========
  private static void demonstrateCreation() {
    System.out.println("\n=== 创建LocalTime ===");

    // 1. 获取当前时间
    LocalTime now = LocalTime.now();
    System.out.println("当前时间: " + now);

    // 2. 创建特定时间
    LocalTime time1 = LocalTime.of(14, 30); // 14:30
    System.out.println("指定时间(时分): " + time1);

    LocalTime time2 = LocalTime.of(9, 15, 30); // 09:15:30
    System.out.println("指定时间(时分秒): " + time2);

    LocalTime time3 = LocalTime.of(23, 59, 59, 999_999_999); // 23:59:59.999999999
    System.out.println("指定时间(含纳秒): " + time3);

    // 3. 解析字符串
    LocalTime parsedTime = LocalTime.parse("08:45:20");
    System.out.println("解析字符串: " + parsedTime);
  }

  // ========== 时间操作 ==========
  private static void demonstrateManipulation() {
    System.out.println("\n=== 时间操作 ===");
    LocalTime time = LocalTime.of(23, 45);

    // 1. 增加小时（自动处理24小时制）
    LocalTime newTime = time.plusHours(2);
    System.out.println("23:45 加2小时: " + newTime); // 01:45

    // 2. 减少分钟
    newTime = newTime.minusMinutes(30);
    System.out.println("减30分钟: " + newTime);

    // 3. 使用with方法修改特定字段
    LocalTime midnight = time.withHour(0).withMinute(0);
    System.out.println("午夜时间: " + midnight);

    // 4. 计算到下一小时还有多少分钟
    long minutesToNextHour = time.until(time.plusHours(1), ChronoUnit.MINUTES);
    System.out.println("到下一小时还有: " + minutesToNextHour + "分钟");
  }

  // ========== 时间比较 ==========
  private static void demonstrateComparison() {
    System.out.println("\n=== 时间比较 ===");
    LocalTime morning = LocalTime.of(8, 0);
    LocalTime afternoon = LocalTime.of(14, 30);
    LocalTime evening = LocalTime.of(20, 0);

    // 1. 基本比较
    System.out.println("早上在下午之前？ " + morning.isBefore(afternoon));
    System.out.println("晚上在早上之后？ " + evening.isAfter(morning));
    System.out.println("14:30等于14:30:00？ " + afternoon.equals(LocalTime.of(14, 30)));

    // 2. 计算时间间隔
    long hoursBetween = ChronoUnit.HOURS.between(morning, evening);
    System.out.println("早上8点到晚上8点的小时间隔: " + hoursBetween);
  }

  // ========== 时间格式化 ==========
  private static void demonstrateFormatting() {
    System.out.println("\n=== 时间格式化 ===");
    LocalTime time = LocalTime.of(14, 30, 45);

    // 1. 默认toString格式
    System.out.println("默认格式: " + time);

    // 2. 使用预定义格式
    DateTimeFormatter isoFormat = DateTimeFormatter.ISO_LOCAL_TIME;
    System.out.println("ISO格式: " + time.format(isoFormat));

    // 3. 自定义格式
    DateTimeFormatter customFormat = DateTimeFormatter.ofPattern("HH时mm分ss秒");
    System.out.println("自定义格式: " + time.format(customFormat));

    // 4. 12小时制格式
    DateTimeFormatter amPmFormat = DateTimeFormatter.ofPattern("hh:mm:ss a");
    System.out.println("12小时制格式: " + time.format(amPmFormat));
  }

  // ========== 时间截断 ==========
  private static void demonstrateTruncation() {
    System.out.println("\n=== 时间截断 ===");
    LocalTime preciseTime = LocalTime.of(14, 30, 45, 123_456_789);

    // 1. 截断到分钟
    LocalTime truncatedToMinutes = preciseTime.truncatedTo(ChronoUnit.MINUTES);
    System.out.println("截断到分钟: " + truncatedToMinutes);

    // 2. 截断到小时
    LocalTime truncatedToHours = preciseTime.truncatedTo(ChronoUnit.HOURS);
    System.out.println("截断到小时: " + truncatedToHours);

    // 3. 截断到秒
    LocalTime truncatedToSeconds = preciseTime.truncatedTo(ChronoUnit.SECONDS);
    System.out.println("截断到秒: " + truncatedToSeconds);
  }
}