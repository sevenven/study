package commonlyUsedClasses._time;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.Month;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;

/**
 * LocalDateTime 示例类
 *
 * LocalDateTime 是 Java 8 引入的日期时间类，组合了 LocalDate 和 LocalTime
 * 表示不带时区的日期时间（年-月-日 时:分:秒.纳秒）
 *
 * 核心知识点：
 * 1. 不可变性：
 *    - 所有修改操作都返回新实例
 *    - 原始对象不会被改变
 *    - 天生线程安全
 *
 * 2. 创建方式：
 *    - LocalDateTime.now(): 当前日期时间
 *    - LocalDateTime.of(): 指定日期时间
 *    - LocalDate.atTime(): 日期+时间组合
 *    - LocalTime.atDate(): 时间+日期组合
 *
 * 3. 主要功能：
 *    - 获取日期时间各部分
 *    - 日期时间加减运算
 *    - 日期时间比较
 *    - 格式化输出
 *
 * 4. 常用方法：
 *    - getYear()/getMonthValue()/getDayOfMonth(): 获取年月日
 *    - getHour()/getMinute()/getSecond(): 获取时分秒
 *    - plusDays()/plusHours()/plusMinutes(): 增加时间量
 *    - until(): 计算时间差
 *    - format(): 格式化输出
 *
 * 5. 应用场景：
 *    - 需要同时处理日期和时间的场景
 *    - 不涉及时区转换的业务逻辑
 *    - 日程安排、定时任务等
 */
public class _LocalDateTime {

  public static void main(String[] args) {
    demonstrateCreation();      // 创建LocalDateTime
    demonstrateManipulation();  // 日期时间操作
    demonstrateComparison();    // 日期时间比较
    demonstrateFormatting();    // 日期时间格式化
    demonstrateConversion();    // 类型转换
  }

  // ========== 创建LocalDateTime ==========
  private static void demonstrateCreation() {
    System.out.println("\n=== 创建LocalDateTime ===");

    // 1. 获取当前日期时间
    LocalDateTime now = LocalDateTime.now();
    System.out.println("当前日期时间: " + now);

    // 2. 指定日期时间创建
    LocalDateTime datetime1 = LocalDateTime.of(2023, Month.JUNE, 15, 14, 30);
    System.out.println("指定日期时间: " + datetime1);

    // 3. 组合LocalDate和LocalTime
    LocalDate date = LocalDate.of(2023, 6, 15);
    LocalTime time = LocalTime.of(14, 30);
    LocalDateTime datetime2 = date.atTime(time);
    System.out.println("组合创建: " + datetime2);

    // 4. 解析字符串
    LocalDateTime parsed = LocalDateTime.parse("2023-06-15T14:30:45");
    System.out.println("解析字符串: " + parsed);
  }

  // ========== 日期时间操作 ==========
  private static void demonstrateManipulation() {
    System.out.println("\n=== 日期时间操作 ===");
    LocalDateTime datetime = LocalDateTime.of(2023, 12, 31, 23, 59);

    // 1. 增加时间量（自动处理溢出）
    LocalDateTime newDatetime = datetime.plusDays(1);
    System.out.println("12月31日加1天: " + newDatetime); // 次年1月1日

    // 2. 减少时间量
    newDatetime = newDatetime.minusHours(12);
    System.out.println("减12小时: " + newDatetime);

    // 3. 修改特定字段
    LocalDateTime firstDay = datetime.withDayOfMonth(1);
    System.out.println("当月第一天: " + firstDay);

    // 4. 计算时间差
    long hours = datetime.until(newDatetime, ChronoUnit.HOURS);
    System.out.println("时间差(小时): " + hours);
  }

  // ========== 日期时间比较 ==========
  private static void demonstrateComparison() {
    System.out.println("\n=== 日期时间比较 ===");
    LocalDateTime dt1 = LocalDateTime.of(2023, 6, 15, 10, 0);
    LocalDateTime dt2 = LocalDateTime.of(2023, 6, 15, 14, 30);
    LocalDateTime dt3 = LocalDateTime.of(2023, 6, 16, 9, 0);

    // 1. 基本比较
    System.out.println("dt1在dt2之前？ " + dt1.isBefore(dt2));
    System.out.println("dt3在dt2之后？ " + dt3.isAfter(dt2));
    System.out.println("dt1等于dt1？ " + dt1.equals(dt1));

    // 2. 计算时间差
    long days = ChronoUnit.DAYS.between(dt1, dt3);
    System.out.println("天数差: " + days);

    long hours = ChronoUnit.HOURS.between(dt1, dt2);
    System.out.println("小时差: " + hours);
  }

  // ========== 日期时间格式化 ==========
  private static void demonstrateFormatting() {
    System.out.println("\n=== 日期时间格式化 ===");
    LocalDateTime datetime = LocalDateTime.of(2023, 6, 15, 14, 30, 45);

    // 1. 默认格式
    System.out.println("默认格式: " + datetime);

    // 2. 使用预定义格式
    DateTimeFormatter isoFormat = DateTimeFormatter.ISO_LOCAL_DATE_TIME;
    System.out.println("ISO格式: " + datetime.format(isoFormat));

    // 3. 自定义格式
    DateTimeFormatter customFormat = DateTimeFormatter.ofPattern("yyyy年MM月dd日 HH时mm分ss秒");
    System.out.println("自定义格式: " + datetime.format(customFormat));

    // 4. 本地化格式
    DateTimeFormatter localizedFormat = DateTimeFormatter.ofPattern("EEE, MMM d, yyyy h:mm a");
    System.out.println("本地化格式: " + datetime.format(localizedFormat));
  }

  // ========== 类型转换 ==========
  private static void demonstrateConversion() {
    System.out.println("\n=== 类型转换 ===");
    LocalDateTime datetime = LocalDateTime.now();

    // 1. 转换为LocalDate
    LocalDate date = datetime.toLocalDate();
    System.out.println("转换为LocalDate: " + date);

    // 2. 转换为LocalTime
    LocalTime time = datetime.toLocalTime();
    System.out.println("转换为LocalTime: " + time);

    // 3. 与字符串相互转换
    String str = datetime.format(DateTimeFormatter.ISO_LOCAL_DATE_TIME);
    System.out.println("转换为字符串: " + str);
    LocalDateTime parsed = LocalDateTime.parse(str);
    System.out.println("解析回LocalDateTime: " + parsed);
  }
}