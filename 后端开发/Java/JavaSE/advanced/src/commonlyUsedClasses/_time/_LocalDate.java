package commonlyUsedClasses._time;

import java.time.LocalDate;
import java.time.Month;
import java.time.Period;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;

/**
 * LocalDate 示例类
 *
 * LocalDate 是 Java 8 引入的日期类，表示不带时间的日期（年-月-日）
 *
 * 核心知识点：
 * 1. 不可变性：
 *    - 所有修改操作都返回新实例
 *    - 原始对象不会被改变
 *
 * 2. 主要功能：
 *    - 获取当前日期：LocalDate.now()
 *    - 创建特定日期：LocalDate.of()
 *    - 日期加减：plus/minus 方法
 *    - 日期比较：isBefore/isAfter
 *    - 日期格式化：format()
 *
 * 3. 常用方法：
 *    - getYear()/getMonth()/getDayOfMonth(): 获取年月日
 *    - plusDays()/plusMonths()/plusYears(): 增加时间
 *    - until(): 计算日期差
 *    - isLeapYear(): 判断闰年
 *
 * 4. 日期运算：
 *    - 支持加减天数、周数、月数、年数
 *    - 自动处理月份和闰年
 *
 * 5. 格式化：
 *    - 使用DateTimeFormatter格式化
 *    - 内置ISO格式（如ISO_LOCAL_DATE）
 *
 * 6. 线程安全：
 *    - 所有实例都是不可变的
 *    - 天生线程安全
 *
 * 7. 与旧API互操作：
 *    - 可与java.util.Date相互转换
 *    - 需要借助Instant和ZoneId
 */
public class _LocalDate {

  public static void main(String[] args) {
    demonstrateCreation();      // 创建LocalDate
    demonstrateManipulation();  // 日期操作
    demonstrateComparison();    // 日期比较
    demonstrateFormatting();    // 日期格式化
    demonstratePeriod();        // 日期期间计算
  }

  // ========== 创建LocalDate ==========
  private static void demonstrateCreation() {
    System.out.println("\n=== 创建LocalDate ===");

    // 1. 获取当前日期
    LocalDate today = LocalDate.now();
    System.out.println("当前日期: " + today);

    // 2. 创建特定日期
    LocalDate date1 = LocalDate.of(2023, Month.JUNE, 15);
    System.out.println("指定日期: " + date1);

    // 3. 使用日数创建（从1970-01-01开始）
    LocalDate date2 = LocalDate.ofEpochDay(18000);
    System.out.println("从1970年开始18000天: " + date2);

    // 4. 使用年份日创建
    LocalDate date3 = LocalDate.ofYearDay(2023, 200);
    System.out.println("2023年第200天: " + date3);
  }

  // ========== 日期操作 ==========
  private static void demonstrateManipulation() {
    System.out.println("\n=== 日期操作 ===");
    LocalDate date = LocalDate.of(2023, Month.JANUARY, 31);

    // 1. 增加月份（自动调整日期）
    LocalDate newDate = date.plusMonths(1);
    System.out.println("1月31日加1个月: " + newDate); // 2月28日

    // 2. 减少天数
    newDate = newDate.minusDays(7);
    System.out.println("减7天: " + newDate);

    // 3. 使用with方法修改特定字段
    LocalDate firstDayOfMonth = date.withDayOfMonth(1);
    System.out.println("当月第一天: " + firstDayOfMonth);

    // 4. 判断闰年
    System.out.println("2023年是闰年吗？ " + date.isLeapYear());
  }

  // ========== 日期比较 ==========
  private static void demonstrateComparison() {
    System.out.println("\n=== 日期比较 ===");
    LocalDate today = LocalDate.now();
    LocalDate tomorrow = today.plusDays(1);
    LocalDate yesterday = today.minusDays(1);

    // 1. 基本比较
    System.out.println("今天在明天之前？ " + today.isBefore(tomorrow));
    System.out.println("今天在昨天之后？ " + today.isAfter(yesterday));
    System.out.println("今天等于今天？ " + today.equals(LocalDate.now()));

    // 2. 计算日期间隔
    long daysBetween = ChronoUnit.DAYS.between(yesterday, tomorrow);
    System.out.println("昨天到明天的天数差: " + daysBetween);
  }

  // ========== 日期格式化 ==========
  private static void demonstrateFormatting() {
    System.out.println("\n=== 日期格式化 ===");
    LocalDate date = LocalDate.of(2023, Month.JUNE, 15);

    // 1. 默认toString格式
    System.out.println("默认格式: " + date);

    // 2. 使用预定义格式
    DateTimeFormatter isoFormat = DateTimeFormatter.ISO_LOCAL_DATE;
    System.out.println("ISO格式: " + date.format(isoFormat));

    // 3. 自定义格式
    DateTimeFormatter customFormat = DateTimeFormatter.ofPattern("yyyy/MM/dd");
    System.out.println("自定义格式: " + date.format(customFormat));

    // 4. 本地化格式
    DateTimeFormatter localizedFormat = DateTimeFormatter.ofPattern("yyyy年MM月dd日 EEEE");
    System.out.println("本地化格式: " + date.format(localizedFormat));
  }

  // ========== 日期期间计算 ==========
  private static void demonstratePeriod() {
    System.out.println("\n=== 日期期间计算 ===");
    LocalDate birthDate = LocalDate.of(1990, Month.JANUARY, 1);
    LocalDate now = LocalDate.now();

    // 1. 计算期间
    Period period = Period.between(birthDate, now);
    System.out.printf("年龄: %d年%d个月%d天\n",
      period.getYears(), period.getMonths(), period.getDays());

    // 2. 计算总天数
    long totalDays = ChronoUnit.DAYS.between(birthDate, now);
    System.out.println("总天数: " + totalDays);

    // 3. 计算到下一个生日的天数
    LocalDate nextBirthday = birthDate.withYear(now.getYear());
    if (nextBirthday.isBefore(now)) {
      nextBirthday = nextBirthday.plusYears(1);
    }
    long daysToBirthday = ChronoUnit.DAYS.between(now, nextBirthday);
    System.out.println("距离下次生日还有: " + daysToBirthday + "天");
  }
}