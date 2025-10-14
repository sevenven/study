package commonlyUsedClasses._time;

import java.time.Instant;
import java.time.Duration;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;

/**
 * Instant 示例类
 *
 * Instant 是 Java 8 引入的时间戳类，表示时间线上的一个瞬时点（从1970-01-01T00:00:00Z开始的纳秒数）
 *
 * 核心知识点：
 * 1. 时间基准：
 *    - 基于 Unix 时间戳（1970-01-01T00:00:00Z，即 Epoch）
 *    - 精确到纳秒级（旧Date类只到毫秒级）
 *
 * 2. 主要特性：
 *    - 不可变且线程安全
 *    - 适合机器处理的时间表示
 *    - 与时区无关（总是UTC时区）
 *
 * 3. 主要用途：
 *    - 记录事件时间戳
 *    - 计算时间间隔
 *    - 高精度时间测量
 *    - 与旧Date API互操作
 *
 * 4. 常用方法：
 *    - now(): 获取当前时刻
 *    - ofEpochSecond(): 从秒数创建
 *    - plus()/minus(): 时间加减
 *    - until(): 计算时间差
 *    - isBefore()/isAfter(): 时间比较
 *
 * 5. 转换方法：
 *    - atZone(): 转换为带时区的ZonedDateTime
 *    - toEpochMilli(): 转为毫秒时间戳
 *    - from(): 从其他时间对象转换
 */
public class _Instant {

  public static void main(String[] args) {
    demonstrateCreation();      // 创建Instant
    demonstrateManipulation();  // 时间操作
    demonstrateComparison();    // 时间比较
    demonstrateConversion();    // 类型转换
    demonstrateDuration();      // 持续时间计算
  }

  // ========== 创建Instant ==========
  private static void demonstrateCreation() {
    System.out.println("\n=== 创建Instant ===");

    // 1. 获取当前时刻
    Instant now = Instant.now();
    System.out.println("当前时刻: " + now);

    // 2. 从秒数创建
    Instant epoch = Instant.ofEpochSecond(0);
    System.out.println("Epoch起点: " + epoch);

    // 3. 从秒数+纳秒创建
    Instant specific = Instant.ofEpochSecond(1640995200L, 500_000_000);
    System.out.println("特定时刻: " + specific);

    // 4. 从毫秒创建
    Instant fromMillis = Instant.ofEpochMilli(1640995200000L);
    System.out.println("从毫秒创建: " + fromMillis);
  }

  // ========== 时间操作 ==========
  private static void demonstrateManipulation() {
    System.out.println("\n=== 时间操作 ===");
    Instant now = Instant.now();

    // 1. 增加时间量
    Instant future = now.plusSeconds(3600);
    System.out.println("1小时后: " + future);

    // 2. 减少时间量
    Instant past = now.minus(Duration.ofDays(1));
    System.out.println("1天前: " + past);

    // 3. 修改纳秒部分
    long epochSecond = now.getEpochSecond(); // 获取当前秒数
    Instant adjusted = Instant.ofEpochSecond(epochSecond, 500_000_000); // 秒数+纳秒数创建新实例
    System.out.println("调整纳秒: " + adjusted);
  }

  // ========== 时间比较 ==========
  private static void demonstrateComparison() {
    System.out.println("\n=== 时间比较 ===");
    Instant start = Instant.now();

    try {
      Thread.sleep(100); // 模拟耗时操作
    } catch (InterruptedException e) {
      e.printStackTrace();
    }

    Instant end = Instant.now();

    // 1. 基本比较
    System.out.println("开始时间在结束前？ " + start.isBefore(end));
    System.out.println("时间差(ns): " + start.until(end, ChronoUnit.NANOS));

    // 2. 判断相等
    System.out.println("相同时间？ " + start.equals(end));
  }

  // ========== 类型转换 ==========
  private static void demonstrateConversion() {
    System.out.println("\n=== 类型转换 ===");
    Instant now = Instant.now();

    // 1. 转换为毫秒时间戳
    long epochMillis = now.toEpochMilli();
    System.out.println("毫秒时间戳: " + epochMillis);

    // 2. 转换为LocalDateTime
    LocalDateTime ldt = LocalDateTime.ofInstant(now, ZoneId.systemDefault());
    System.out.println("本地日期时间: " + ldt.format(
      DateTimeFormatter.ISO_LOCAL_DATE_TIME));

    // 3. 从旧Date转换
    java.util.Date legacyDate = java.util.Date.from(now);
    System.out.println("转为旧Date: " + legacyDate);

    Instant fromDate = legacyDate.toInstant();
    System.out.println("转回Instant: " + fromDate);
  }

  // ========== 持续时间计算 ==========
  private static void demonstrateDuration() {
    System.out.println("\n=== 持续时间计算 ===");
    Instant start = Instant.now();

    try {
      Thread.sleep(1234); // 模拟耗时操作
    } catch (InterruptedException e) {
      e.printStackTrace();
    }

    Instant end = Instant.now();

    // 1. 计算持续时间
    Duration duration = Duration.between(start, end);
    System.out.println("操作耗时: " + duration.toMillis() + "ms");
    System.out.println("秒数: " + duration.getSeconds());
    System.out.println("纳秒部分: " + duration.getNano());

    // 2. Duration运算
    Duration doubled = duration.multipliedBy(2);
    System.out.println("两倍耗时: " + doubled.toMillis() + "ms");
  }
}