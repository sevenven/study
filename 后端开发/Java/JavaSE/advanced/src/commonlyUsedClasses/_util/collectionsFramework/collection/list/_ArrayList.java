package commonlyUsedClasses._util.collectionsFramework.collection.list;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.Iterator;
import java.util.List;
import java.util.ListIterator;
import java.util.stream.Collectors;

/**
 * ArrayList 完整示例类
 *
 * 核心特性说明：
 * - 实现原理：基于动态数组实现的List接口
 * - 元素特性：允许存储null值，允许重复元素
 * - 线程安全：非线程安全（非同步）
 * - 扩容机制：默认初始容量10，扩容时增加50%（如10→15→22→33...）
 *
 * 时间复杂度：
 * 1. 随机访问(get/set)：O(1)
 * 2. 尾部添加/删除：O(1)（摊销时间）
 * 3. 中间插入/删除：O(n)
 * 4. 搜索操作：O(n)
 *
 * 与LinkedList比较：
 * - 随机访问：ArrayList快（O(1)），LinkedList慢（O(n)）
 * - 头部插入：ArrayList慢（O(n)），LinkedList快（O(1)）
 * - 内存占用：ArrayList较小（仅需存储元素），LinkedList较大（需要存储节点信息）
 *
 * 最佳实践：
 * 1. 预估数据量时指定初始容量（避免频繁扩容）
 * 2. 多线程环境使用Collections.synchronizedList或CopyOnWriteArrayList
 * 3. 批量操作使用addAll()而非循环add
 * 4. 遍历时避免在循环条件中调用size()方法
 */
public class _ArrayList {

  public static void main(String[] args) {
    operations(); // 按照Collection接口的15个方法分类展示
    iterationMethods(); // 数组遍历
    conversionExamples(); // 数组转换
    sortingExamples(); // 数组排序
    advancedOperations(); // 高级操作
  }

  /**
   * 按照Collection接口的15个方法分类展示：
   * 1. 基础操作方法
   * 2. 批量操作方法
   * 3. 条件操作方法
   * 4. 数组转换方法
   * 5. 迭代器方法
   */
  public static void operations() {
    basicOperations(); // 基础操作方法
    batchOperations(); // 批量操作方法
    conditionalOperations(); // 条件操作方法
    arrayConversion(); // 数组转换方法
    iterationMethods(); // 迭代器方法
  }

  /**
   * 1. 基础操作方法（6个）
   * - int size()
   * - boolean isEmpty()
   * - boolean add(E e)
   * - boolean remove(Object o)
   * - boolean contains(Object o)
   * - void clear()
   */
  public static void basicOperations() {
    System.out.println("\n=== 基础操作方法 ===");

    List<String> list = new ArrayList<>();

    // 添加元素
    list.add("Apple");
    list.add("Banana");
    System.out.println("添加后: " + list);

    // 检查状态
    System.out.println("大小: " + list.size());
    System.out.println("是否为空: " + list.isEmpty());
    System.out.println("包含Banana: " + list.contains("Banana"));

    // 删除元素
    list.remove("Apple");
    System.out.println("删除后: " + list);

    // 清空集合
    list.clear();
    System.out.println("清空后: " + list);
  }

  /**
   * 2. 批量操作方法（4个）
   * - boolean addAll(Collection<? extends E> c)
   * - boolean removeAll(Collection<?> c)
   * - boolean retainAll(Collection<?> c)
   * - boolean containsAll(Collection<?> c)
   */
  public static void batchOperations() {
    System.out.println("\n=== 批量操作方法 ===");

    List<String> fruits = new ArrayList<>(Arrays.asList("Apple", "Banana", "Orange"));
    List<String> addList = Arrays.asList("Grape", "Peach");
    List<String> removeList = Arrays.asList("Banana", "Peach");

    // 批量添加
    fruits.addAll(addList);
    System.out.println("批量添加后: " + fruits);

    // 批量删除
    fruits.removeAll(removeList);
    System.out.println("批量删除后: " + fruits);

    // 保留交集
    fruits.retainAll(Arrays.asList("Apple", "Orange", "Mango"));
    System.out.println("保留交集后: " + fruits);

    // 检查包含
    System.out.println("是否包含全部: " +
      fruits.containsAll(Arrays.asList("Apple", "Orange")));
  }

  /**
   * 3. 条件操作方法（2个）
   * - boolean removeIf(Predicate<? super E> filter) (Java8+)
   * - void forEach(Consumer<? super E> action) (Java8+)
   */
  public static void conditionalOperations() {
    System.out.println("\n=== 条件操作方法 ===");

    List<Integer> numbers = new ArrayList<>(Arrays.asList(1, 2, 3, 4, 5));

    // 条件删除
    numbers.removeIf(n -> n % 2 == 0);
    System.out.println("删除偶数后: " + numbers);

    // 遍历操作
    System.out.print("元素平方: ");
    numbers.forEach(n -> System.out.print(n * n + " "));
  }

  /**
   * 4. 数组转换方法（2个）
   * - Object[] toArray()
   * - <T> T[] toArray(T[] a)
   */
  public static void arrayConversion() {
    System.out.println("\n\n=== 数组转换方法 ===");

    List<String> list = new ArrayList<>(Arrays.asList("A", "B", "C"));

    // 转换为Object数组
    Object[] objArray = list.toArray();
    System.out.println("Object数组: " + Arrays.toString(objArray));

    // 转换为指定类型数组
    String[] strArray = list.toArray(new String[0]);
    System.out.println("String数组: " + Arrays.toString(strArray));
  }

  /**
   * 5. 迭代器方法（1个）
   * - Iterator<E> iterator()
   *
   * 额外展示List接口特有的：
   * - ListIterator<E> listIterator()
   * - ListIterator<E> listIterator(int index)
   */
  public static void iteratorMethods() {
    System.out.println("\n=== 迭代器方法 ===");

    List<String> colors = new ArrayList<>(Arrays.asList("Red", "Green", "Blue"));

    // 普通迭代器
    System.out.print("正向遍历: ");
    Iterator<String> it = colors.iterator();
    while (it.hasNext()) {
      System.out.print(it.next() + " ");
    }

    // 列表迭代器
    System.out.print("\n逆向遍历: ");
    ListIterator<String> lit = colors.listIterator(colors.size());
    while (lit.hasPrevious()) {
      System.out.print(lit.previous() + " ");
    }
  }

  /**
   * 遍历方式演示方法
   * 展示5种不同的ArrayList遍历方式：
   * 1. 普通for循环
   * 2. 增强for循环
   * 3. 迭代器
   * 4. ListIterator（双向遍历）
   * 5. Java8 forEach方法
   */
  public static void iterationMethods() {
    System.out.println("\n=== 遍历方式 ===");

    ArrayList<String> colors = new ArrayList<>(Arrays.asList("红", "绿", "蓝", "黄"));
    System.out.println("原始列表: " + colors);

    for (int i = 0; i < colors.size(); i++) {
      String color = colors.get(i);
      System.out.println("普通for循环: " + color);
    }

    for (String color : colors) {
      System.out.println("增强for循环: " + color);
    }

    Iterator<String> it = colors.iterator();
    while (it.hasNext()) {
      String color = it.next();
      if ("绿".equals(color)) {
        it.remove();
      }
    }
    System.out.println("迭代器遍历后: " + colors);

    ListIterator<String> lit = colors.listIterator(colors.size());
    while (lit.hasPrevious()) {
      String color = lit.previous();
    }
    System.out.println("ListIterator遍历后: " + colors);

    colors.forEach(color -> System.out.print("Java8 forEach遍历: " + color + " "));
  }

  /**
   * 数组与List转换方法
   * 演示ArrayList与数组之间的相互转换：
   * - ArrayList转数组的两种方式
   * - 数组转ArrayList的注意事项（Arrays.asList返回固定大小List）
   */
  public static void conversionExamples() {
    ArrayList<String> list = new ArrayList<>(Arrays.asList("A", "B", "C"));
    String[] array = list.toArray(new String[0]); // 转换为数组
    System.out.println("数组内容: " + Arrays.toString(array));

    String[] fruits = {"苹果", "香蕉"};
    List<String> fixedList = Arrays.asList(fruits); // 转换为固定大小List
    ArrayList<String> mutableList = new ArrayList<>(Arrays.asList(fruits)); // 转换为可变大小List
    System.out.println("固定大小List内容: " + fixedList);
    System.out.println("可变大小List内容: " + mutableList);
  }

  /**
   * 排序操作演示方法
   * 展示三种不同的排序方式：
   * 1. Collections.sort自然排序
   * 2. 自定义比较器排序
   * 3. Java8 Stream排序
   */
  public static void sortingExamples() {
    ArrayList<Integer> numbers = new ArrayList<>(Arrays.asList(5, 2, 9, 1));

    Collections.sort(numbers);
    Collections.sort(numbers, Comparator.reverseOrder());

    List<Integer> sorted = numbers.stream()
      .sorted(Comparator.naturalOrder())
      .collect(Collectors.toList());
  }

  /**
   * 高级操作演示方法
   * 展示ArrayList的高级特性：
   * - 子列表操作（视图，影响原列表）
   * - 批量替换元素
   * - 条件删除元素
   * - 容量优化
   * - 创建不可变列表
   */
  public static void advancedOperations() {
    ArrayList<String> list = new ArrayList<>(Arrays.asList("a", "b", "c", "d", "e"));

    List<String> subList = list.subList(1, 4);
    subList.set(0, "B");

    list.replaceAll(String::toUpperCase);
    list.removeIf(s -> s.equals("C"));
    list.trimToSize();

    List<String> immutable = List.copyOf(list);
  }


}