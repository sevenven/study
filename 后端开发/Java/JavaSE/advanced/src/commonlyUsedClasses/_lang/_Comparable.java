package commonlyUsedClasses._lang;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

/**
 * Comparable 示例类
 *
 * Comparable 接口用于定义对象的自然排序顺序
 *
 * 核心知识点：
 * 1. 自然排序：实现类对象的默认排序方式
 * 2. 接口方法：int compareTo(T o)
 * 3. 排序规则：
 *    - 返回负数：当前对象小于参数对象
 *    - 返回零：当前对象等于参数对象
 *    - 返回正数：当前对象大于参数对象
 * 4. 使用场景：
 *    - Arrays.sort()
 *    - Collections.sort()
 *    - TreeSet/TreeMap等有序集合
 *
 * 与Comparator的区别：
 * 1. Comparable是对象自身实现的排序，Comparator是外部比较器
 * 2. Comparable定义自然顺序，Comparator定义多种排序方式
 */
public class _Comparable {

  public static void main(String[] args) {
    demonstrateStudentSorting();  // 学生对象排序
    demonstrateStringSorting();   // 字符串排序(内置Comparable)
  }

  // ========== 学生对象排序 ==========
  private static void demonstrateStudentSorting() {
    System.out.println("=== 学生对象排序(实现Comparable) ===");

    List<Student> students = Arrays.asList(
      new Student("张三", 20, 88.5),
      new Student("李四", 22, 92.0),
      new Student("王五", 20, 85.0),
      new Student("赵六", 21, 90.5)
    );

    System.out.println("排序前:");
    students.forEach(System.out::println);

    // 使用Collections.sort()排序(依赖Comparable实现)
    Collections.sort(students);

    System.out.println("\n排序后(按年龄升序，年龄相同按分数降序):");
    students.forEach(System.out::println);
  }

  // ========== 字符串排序 ==========
  private static void demonstrateStringSorting() {
    System.out.println("\n=== 字符串排序(String已实现Comparable) ===");

    List<String> names = Arrays.asList("张三", "李四", "王五", "赵六", "Alice", "Bob");

    System.out.println("排序前:");
    names.forEach(System.out::println);

    // String类已经实现了Comparable接口
    Collections.sort(names);

    System.out.println("\n排序后(自然顺序):");
    names.forEach(System.out::println);
  }
}

/**
 * 学生类实现Comparable接口
 * 排序规则：先按年龄升序，年龄相同按分数降序
 */
class Student implements Comparable<Student> {
  private String name;
  private int age;
  private double score;

  public Student(String name, int age, double score) {
    this.name = name;
    this.age = age;
    this.score = score;
  }

  @Override
  public int compareTo(Student other) {
    // 先按年龄升序排序
    int ageCompare = Integer.compare(this.age, other.age);
    if (ageCompare != 0) {
      return ageCompare;
    }

    // 年龄相同则按分数降序排序
    return Double.compare(other.score, this.score);
  }

  @Override
  public String toString() {
    return String.format("Student{name='%s', age=%d, score=%.1f}", name, age, score);
  }
}