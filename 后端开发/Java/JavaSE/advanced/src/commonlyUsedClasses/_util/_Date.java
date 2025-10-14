package commonlyUsedClasses._util;

import java.util.Date;
import java.text.SimpleDateFormat;
import java.util.Calendar;

/**
 * Date 示例类
 *
 * Date 类表示特定的瞬间，精确到毫秒
 * 位于 java.util 包，需要显式导入
 *
 * 注意：Date 类的大部分方法已过时(Deprecated)，推荐使用 Calendar 类或 Java 8 的 java.time 包
 * 这里展示主要是为了兼容旧代码的理解
 */
public class _Date {

  public static void main(String[] args) {
    demonstrateDateCreation();    // Date对象的创建
    demonstrateDateFormatting();  // 日期格式化
    demonstrateDateComparison();  // 日期比较
    demonstrateDateManipulation();// 日期操作
    demonstrateCalendarUsage();   // Calendar使用示例
  }

  // ========== Date对象的创建 ==========
  private static void demonstrateDateCreation() {
    System.out.println("\n=== Date对象创建 ===");

    // 1. 无参构造器 - 创建当前时间的Date对象
    Date now = new Date();
    System.out.println("当前时间: " + now);

    // 2. 使用long型毫秒数创建
    Date specificTime = new Date(1640995200000L); // 2022-1-1 00:00:00 UTC
    System.out.println("特定时间: " + specificTime);

    // 3. 已过时的方法(不推荐)
    @SuppressWarnings("deprecation")
    Date deprecatedDate = new Date(122, 0, 1); // 2022年1月1日(年份从1900开始，月份0-11)
    System.out.println("已过时方法创建: " + deprecatedDate);
  }

  // ========== 日期格式化 ==========
  private static void demonstrateDateFormatting() {
    System.out.println("\n=== 日期格式化 ===");
    Date now = new Date();

    // 1. 使用SimpleDateFormat格式化
    SimpleDateFormat sdf1 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    System.out.println("格式化1: " + sdf1.format(now));

    SimpleDateFormat sdf2 = new SimpleDateFormat("yyyy年MM月dd日 EEE a hh:mm:ss");
    System.out.println("格式化2: " + sdf2.format(now));

    // 2. 使用Date的toString()方法(默认格式)
    System.out.println("默认格式: " + now.toString());
  }

  // ========== 日期比较 ==========
  private static void demonstrateDateComparison() {
    System.out.println("\n=== 日期比较 ===");
    Date date1 = new Date(1640995200000L); // 2022-1-1
    Date date2 = new Date(1641081600000L); // 2022-1-2

    // 1. 使用compareTo()
    System.out.println("date1.compareTo(date2): " + date1.compareTo(date2));

    // 2. 使用before()和after()
    System.out.println("date1在date2之前: " + date1.before(date2));
    System.out.println("date1在date2之后: " + date1.after(date2));

    // 3. 使用getTime()比较毫秒数
    System.out.println("时间差(毫秒): " + (date1.getTime() - date2.getTime()));
  }

  // ========== 日期操作 ==========
  private static void demonstrateDateManipulation() {
    System.out.println("\n=== 日期操作 ===");
    Date date = new Date(1640995200000L); // 2022-1-1

    // 1. 获取时间毫秒数
    long timeInMillis = date.getTime();
    System.out.println("毫秒数: " + timeInMillis);

    // 2. 设置时间(已过时方法，不推荐)
    date.setYear(123); // 设置为2023年
    System.out.println("修改后的日期: " + date);

    // 注意：Date类修改日期的方法大多已过时，应该使用Calendar类
  }

  // ========== Calendar使用示例 ==========
  private static void demonstrateCalendarUsage() {
    System.out.println("\n=== Calendar使用示例 ===");

    // 1. 获取Calendar实例
    Calendar calendar = Calendar.getInstance();

    // 2. 设置日期
    calendar.set(2022, Calendar.JANUARY, 1, 0, 0, 0);

    // 3. 转换为Date对象
    Date date = calendar.getTime();
    System.out.println("Calendar设置的日期: " + date);

    // 4. 添加时间
    calendar.add(Calendar.DAY_OF_MONTH, 1); // 加1天
    System.out.println("加1天后: " + calendar.getTime());

    // 5. 获取各个字段
    System.out.println("年: " + calendar.get(Calendar.YEAR));
    System.out.println("月: " + (calendar.get(Calendar.MONTH) + 1)); // 月份从0开始
    System.out.println("日: " + calendar.get(Calendar.DAY_OF_MONTH));
  }
}