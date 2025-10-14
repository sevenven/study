package commonlyUsedClasses._util.collectionsFramework;

import java.util.*;

/**
 * 数组与集合框架对比示例
 *
 * 数组特点：
 *  - 初始化后长度不可变
 *  - 存储单一类型元素
 *  - 内存连续分配，访问效率高
 *  - 支持基本数据类型和对象类型
 *
 * 数组弊端：
 *  - 长度固定，无法动态扩展
 *  - 缺少高级操作方法（如查找、排序等需手动实现）
 *  - 插入/删除元素效率低（需要移动元素）
 *
 * 集合框架体系：
 *  - Collection 接口 (单列集合-存储单个数据)
 *    - List 接口 (有序、可重复)
 *      - ArrayList (数组实现，随机访问快)
 *      - LinkedList (链表实现，插入删除快)
 *      - Vector (线程安全版ArrayList)
 *    - Set 接口 (无序、不可重复)
 *      - HashSet (哈希表实现)
 *        - LinkedHashSet (保持插入顺序)
 *      - TreeSet (红黑树实现，有序)
 *    - Queue 接口 (先进先出)
 *      - PriorityQueue (优先级队列)
 *      - ArrayDeque (数组实现双端队列)
 *      - PriorityBlockingQueue (优先级阻塞队列)
 *      - SynchronousQueue (同步队列)
 *
 *  - Map 接口 (双列集合-存储键值对数据)
 *    - HashMap (哈希表实现)
 *    - TreeMap (红黑树实现，键有序)
 *    - LinkedHashMap (保持插入顺序)
 *    - Hashtable (线程安全版HashMap)
 *      - Properties (键值对存储，线程安全)
 *
 * 集合选择策略
 *  - 随机访问多：ArrayList
 *  - 插入删除多：LinkedList
 *  - 需要去重： HashSet
 *  - 需要排序：TreeSet
 *  - 键值对存储：HashMap
 *  - 线程安全需求：ConcurrentHashMap/CopyOnWriteArrayList
 *
 * 最佳实践
 *  - 数组：当需要随机访问和简单数据存储时使用
 *  - 集合框架：当需要动态大小、频繁插入删除、复杂操作时使用
 */
public class _ArrayVsCollection {

  /**
   * 演示数组的基本使用
   */
  public static void demonstrateArray() {
    System.out.println("===== 数组示例 =====");

    // 数组声明和初始化
    int[] intArray = new int[5]; // 固定长度
    String[] strArray = {"Java", "Python", "C++"};

    // 数组赋值
    intArray[0] = 10;
    intArray[1] = 20;

    // 数组遍历
    System.out.println("int数组内容:");
    for (int i = 0; i < intArray.length; i++) {
      System.out.println("索引 " + i + ": " + intArray[i]);
    }

    System.out.println("\nstr数组内容:");
    for (String s : strArray) {
      System.out.println(s);
    }

    // 数组的局限性演示
    try {
      strArray[3] = "JavaScript"; // 抛出ArrayIndexOutOfBoundsException
    } catch (ArrayIndexOutOfBoundsException e) {
      System.out.println("\n数组长度固定，无法扩展: " + e.getMessage());
    }
  }

  /**
   * 演示集合框架的基本使用
   */
  public static void demonstrateCollections() {
    System.out.println("\n===== 集合框架示例 =====");

    // List示例 - ArrayList
    List<String> arrayList = new ArrayList<>();
    arrayList.add("Apple");
    arrayList.add("Banana");
    arrayList.add(1, "Orange"); // 在指定位置插入

    System.out.println("ArrayList内容: " + arrayList);
    System.out.println("包含Banana? " + arrayList.contains("Banana"));

    // List示例 - LinkedList
    // 修改：将 List<Integer> 改为 LinkedList<Integer>，以支持 addFirst 方法
    LinkedList<Integer> linkedList = new LinkedList<>();
    linkedList.add(100);
    linkedList.add(200);
    linkedList.addFirst(50); // 链表特有的方法

    System.out.println("\nLinkedList内容: " + linkedList);

    // Set示例 - HashSet
    Set<String> hashSet = new HashSet<>();
    hashSet.add("Red");
    hashSet.add("Green");
    hashSet.add("Red"); // 重复元素不会被添加

    System.out.println("\nHashSet内容: " + hashSet);
    System.out.println("Set大小: " + hashSet.size());

    // Map示例 - HashMap
    Map<String, Integer> hashMap = new HashMap<>();
    hashMap.put("Math", 90);
    hashMap.put("English", 85);
    hashMap.put("Math", 95); // 更新已有键的值

    System.out.println("\nHashMap内容: " + hashMap);
    System.out.println("Math成绩: " + hashMap.get("Math"));
  }

  /**
   * 演示数组与集合的转换
   */
  public static void demonstrateConversion() {
    System.out.println("\n===== 数组与集合转换 =====");

    // 数组转集合
    String[] languages = {"Java", "Python", "C++"};
    List<String> languageList = Arrays.asList(languages);
    System.out.println("数组转集合: " + languageList);

    // 注意：Arrays.asList()返回的是固定大小的列表
    try {
      languageList.add("JavaScript"); // 抛出UnsupportedOperationException
    } catch (UnsupportedOperationException e) {
      System.out.println("Arrays.asList()创建的列表不可修改");
    }

    // 集合转数组
    List<Integer> numbers = new ArrayList<>();
    numbers.add(1);
    numbers.add(2);
    numbers.add(3);

    Integer[] numbersArray = numbers.toArray(new Integer[0]);
    System.out.println("\n集合转数组: " + Arrays.toString(numbersArray));
  }

  /**
   * 演示集合框架的高级操作
   */
  public static void demonstrateAdvancedOperations() {
    System.out.println("\n===== 集合框架高级操作 =====");

    List<Integer> numbers = new ArrayList<>(Arrays.asList(3, 1, 4, 1, 5, 9, 2, 6));

    // 排序
    Collections.sort(numbers);
    System.out.println("排序后: " + numbers);

    // 查找
    int index = Collections.binarySearch(numbers, 5);
    System.out.println("数字5的索引: " + index);

    // 过滤(Java 8+)
    numbers.removeIf(n -> n < 4); // 移除小于4的元素
    System.out.println("过滤后: " + numbers);

    // 遍历(Java 8+)
    System.out.println("遍历元素:");
    numbers.forEach(System.out::println);
  }

  public static void main(String[] args) {
    demonstrateArray();
    demonstrateCollections();
    demonstrateConversion();
    demonstrateAdvancedOperations();
  }
}
