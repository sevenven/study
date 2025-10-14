package commonlyUsedClasses._util;

import java.util.Calendar;
import java.util.GregorianCalendar;
import java.text.SimpleDateFormat;

/**
 * Calendar 示例类
 *
 * Calendar 是 Java 提供的日期时间操作抽象类，主要用于替代已过时的 Date 类方法。
 *
 * 核心知识点：
 * 1. 实例创建：
 *    - Calendar 是抽象类，通过静态方法 getInstance() 获取实例
 *    - 默认使用 GregorianCalendar（公历）实现
 *    - 可以指定时区和地区获取特定日历系统
 *
 * 2. 字段常量：
 *    - YEAR/MONTH/DAY_OF_MONTH 等日期字段
 *    - HOUR_OF_DAY/MINUTE/SECOND 等时间字段
 *    - 注意：MONTH 从 0 开始（0=1月，11=12月）
 *
 * 3. 主要功能：
 *    - get()/set() 方法操作特定字段
 *    - add() 方法进行日期算术运算（自动处理溢出）
 *    - roll() 方法滚动字段值（不影响更大字段）
 *    - before()/after()/compareTo() 进行日期比较
 *
 * 4. 转换方法：
 *    - getTime() 转为 Date 对象
 *    - setTime() 从 Date 对象设置时间
 *    - getTimeInMillis() 获取毫秒时间戳
 *
 * 5. 注意事项：
 *    - 线程不安全，多线程环境需要同步处理
 *    - 复杂日期计算优先使用 add() 而非直接 set()
 *    - Java 8+ 推荐使用 java.time 包（LocalDate等）
 *
 * 6. 典型应用场景：
 *    - 需要获取/设置日期各个字段时
 *    - 需要进行日期加减运算时
 *    - 处理不同时区/地区的日期时间
 */
public class _Calendar {

  public static void main(String[] args) {
    demonstrateCalendarCreation();    // Calendar对象创建
    demonstrateFieldOperations();     // 字段操作
    demonstrateDateManipulation();    // 日期运算
    demonstrateCalendarConversion();  // 日期转换
    demonstrateCalendarComparison();  // 日期比较
  }

  private static void demonstrateCalendarCreation() {
    System.out.println("\n=== Calendar对象创建 ===");

    // 获取默认实例（系统时区和地区）
    Calendar defaultCal = Calendar.getInstance();
    System.out.println("默认实例: " + format(defaultCal));

    // 创建指定日期的GregorianCalendar
    Calendar specificDate = new GregorianCalendar(2023, Calendar.JUNE, 15);
    System.out.println("指定日期: " + format(specificDate));

    // 设置完整日期时间
    Calendar fullDateTime = Calendar.getInstance();
    fullDateTime.set(2023, Calendar.DECEMBER, 31, 23, 59, 59);
    System.out.println("完整日期时间: " + format(fullDateTime));
  }

  private static void demonstrateFieldOperations() {
    System.out.println("\n=== 字段操作 ===");
    Calendar cal = Calendar.getInstance();

    // 获取各字段值
    System.out.printf("当前日期: %d年%d月%d日 %s %d:%d:%d\n",
      cal.get(Calendar.YEAR),
      cal.get(Calendar.MONTH) + 1,  // 月份+1显示
      cal.get(Calendar.DAY_OF_MONTH),
      cal.get(Calendar.AM_PM) == 0 ? "AM" : "PM",
      cal.get(Calendar.HOUR),
      cal.get(Calendar.MINUTE),
      cal.get(Calendar.SECOND));

    // 设置字段值
    cal.set(Calendar.YEAR, 2024);
    cal.set(Calendar.MONTH, Calendar.FEBRUARY);
    cal.set(Calendar.DAY_OF_MONTH, 29);
    System.out.println("设置闰年2月29日: " + format(cal));
  }

  private static void demonstrateDateManipulation() {
    System.out.println("\n=== 日期运算 ===");
    Calendar cal = new GregorianCalendar(2023, Calendar.JANUARY, 31);

    // add()方法自动处理月份溢出
    cal.add(Calendar.MONTH, 1);
    System.out.println("1月31日加1个月: " + format(cal));  // 2月28日

    // roll()方法不改变更大字段
    cal.roll(Calendar.MONTH, 12);
    System.out.println("滚动12个月（年份不变）: " + format(cal));

    // 复合运算
    cal.add(Calendar.DAY_OF_MONTH, 5);
    cal.add(Calendar.HOUR_OF_DAY, -3);
    System.out.println("加5天减3小时: " + format(cal));
  }

  private static void demonstrateCalendarConversion() {
    System.out.println("\n=== 日期转换 ===");
    Calendar cal = Calendar.getInstance();

    // Calendar与Date互转
    java.util.Date date = cal.getTime();
    System.out.println("转为Date对象: " + date);

    Calendar newCal = Calendar.getInstance();
    newCal.setTime(date);
    System.out.println("转回Calendar: " + format(newCal));

    // 毫秒时间戳
    System.out.println("毫秒时间戳: " + cal.getTimeInMillis());
  }

  private static void demonstrateCalendarComparison() {
    System.out.println("\n=== 日期比较 ===");
    Calendar today = Calendar.getInstance();
    Calendar tomorrow = (Calendar) today.clone();
    tomorrow.add(Calendar.DAY_OF_MONTH, 1);

    System.out.println("今天: " + format(today));
    System.out.println("明天: " + format(tomorrow));

    // 三种比较方式
    System.out.println("今天在明天之前: " + today.before(tomorrow));
    System.out.println("比较结果值: " + today.compareTo(tomorrow));
    System.out.println("时间差(毫秒): " +
      (tomorrow.getTimeInMillis() - today.getTimeInMillis()));
  }

  // 格式化输出辅助方法
  private static String format(Calendar cal) {
    return new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(cal.getTime());
  }
}