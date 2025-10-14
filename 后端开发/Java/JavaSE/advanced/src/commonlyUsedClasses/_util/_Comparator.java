package commonlyUsedClasses._util;

import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

/**
 * Comparator 示例类
 *
 * Comparator 接口用于定义对象的定制排序顺序
 *
 * 核心知识点：
 * 1. 外部比较器：与Comparable不同，Comparator是独立于比较对象的
 * 2. 接口方法：int compare(T o1, T o2)
 * 3. 排序规则：
 *    - 返回负数：o1 < o2
 *    - 返回零：o1 == o2
 *    - 返回正数：o1 > o2
 * 4. 优势：
 *    - 可以定义多种排序方式
 *    - 不需要修改被比较类的源代码
 *    - Java 8+提供了更简洁的Lambda实现方式
 *
 * 使用场景：
 * - Collections.sort()
 * - Arrays.sort()
 * - Stream.sorted()
 * - TreeSet/TreeMap等有序集合
 */
public class _Comparator {
  public static void main(String[] args) {
    demonstrateStudentSorting();  // 学生对象排序
    demonstrateMultiLevelSorting(); // 多级排序
    demonstrateJava8Features();   // Java 8特性
  }

  // ========== 学生对象排序 ==========
  private static void demonstrateStudentSorting() {
    System.out.println("=== 学生对象排序(使用Comparator) ===");

    List<Student> students = Arrays.asList(
      new Student("张三", 20, 88.5),
      new Student("李四", 22, 92.0),
      new Student("王五", 20, 85.0),
      new Student("赵六", 21, 90.5)
    );

    System.out.println("原始顺序:");
    students.forEach(System.out::println);

    // 方式1：使用匿名内部类按分数排序
    Collections.sort(students, new Comparator<Student>() {
      @Override
      public int compare(Student s1, Student s2) {
        return Double.compare(s1.getScore(), s2.getScore());
      }
    });
    System.out.println("\n按分数升序排序:");
    students.forEach(System.out::println);

    // 方式2：使用Lambda表达式按姓名排序
    Collections.sort(students, (s1, s2) -> s1.getName().compareTo(s2.getName()));
    System.out.println("\n按姓名排序:");
    students.forEach(System.out::println);
  }

  // ========== 多级排序 ==========
  private static void demonstrateMultiLevelSorting() {
    System.out.println("\n=== 多级排序 ===");

    List<Student> students = Arrays.asList(
      new Student("张三", 20, 88.5),
      new Student("李四", 22, 92.0),
      new Student("王五", 20, 85.0),
      new Student("赵六", 21, 90.5),
      new Student("钱七", 20, 90.0)
    );

    // 方式1：传统写法
    Comparator<Student> traditionalComparator = new Comparator<Student>() {
      @Override
      public int compare(Student s1, Student s2) {
        // 先按年龄升序
        int ageCompare = Integer.compare(s1.getAge(), s2.getAge());
        if (ageCompare != 0) return ageCompare;

        // 年龄相同按分数降序
        return Double.compare(s2.getScore(), s1.getScore());
      }
    };

    // 方式2：Java 8写法
    Comparator<Student> java8Comparator = Comparator
      .comparingInt(Student::getAge)          // 先按年龄
      .thenComparing(                         // 然后按分数
        Student::getScore,
        Comparator.reverseOrder()           // 降序
      );

    Collections.sort(students, java8Comparator);
    System.out.println("按年龄升序，年龄相同按分数降序:");
    students.forEach(System.out::println);
  }

  // ========== Java 8特性 ==========
  private static void demonstrateJava8Features() {
    System.out.println("\n=== Java 8 Comparator特性 ===");

    List<Student> students = Arrays.asList(
      new Student("张三", 20, 88.5),
      new Student("李四", 22, 92.0),
      new Student(null, 20, 85.0),  // 测试null值
      new Student("赵六", 21, 90.5)
    );

    // 1. 方法引用
    Comparator<Student> byName = Comparator.comparing(Student::getName);

    // 2. 处理null值
    Comparator<Student> byNameNullsFirst = Comparator.comparing(
      Student::getName,
      Comparator.nullsFirst(String::compareTo)
    );

    // 3. 逆序
    Comparator<Student> byScoreDesc = Comparator.comparingDouble(Student::getScore)
      .reversed();

    // 组合比较器
    Comparator<Student> combined = byNameNullsFirst
      .thenComparingInt(Student::getAge)
      .thenComparing(byScoreDesc);

    students.sort(combined);
    System.out.println("按姓名(nulls first)、年龄、分数降序排序:");
    students.forEach(System.out::println);
  }
}

/**
 * 学生类(未实现Comparable)
 */
class Student {
  private String name;
  private int age;
  private double score;

  public Student(String name, int age, double score) {
    this.name = name;
    this.age = age;
    this.score = score;
  }

  // Getter方法
  public String getName() { return name; }
  public int getAge() { return age; }
  public double getScore() { return score; }

  @Override
  public String toString() {
    return String.format("Student{name='%s', age=%d, score=%.1f}",
      name, age, score);
  }
}