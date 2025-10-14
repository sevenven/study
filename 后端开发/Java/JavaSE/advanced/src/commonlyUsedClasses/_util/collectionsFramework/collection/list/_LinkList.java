package commonlyUsedClasses._util.collectionsFramework.collection.list;

import java.util.LinkedList;
import java.util.Arrays;
import java.util.Iterator;
import java.util.ListIterator;
import java.util.Deque;

/**
 * LinkedList 示例类
 *
 * LinkedList 核心特性：
 * 1. 基于双向链表实现的List和Deque接口
 * 2. 允许存储null值和重复元素
 * 3. 非线程安全（非同步）
 * 4. 不需要预先分配空间，动态增长
 *
 * 时间复杂度：
 * - 头部/尾部插入/删除：O(1)
 * - 指定位置插入/删除：平均O(n)
 * - 随机访问：O(n)
 * - 搜索操作：O(n)
 *
 * 与ArrayList比较：
 * - 插入删除：LinkedList在任意位置更快（特别适合频繁修改的场景）
 * - 随机访问：ArrayList明显更快（适合读多写少的场景）
 * - 内存占用：LinkedList每个元素需要额外空间存储前后节点引用
 *
 * 最佳实践：
 * 1. 需要频繁在列表中间插入/删除时使用LinkedList
 * 2. 需要实现栈或队列功能时可作为首选
 * 3. 避免使用get(index)进行随机访问
 * 4. 多线程环境使用Collections.synchronizedList或并发集合
 */
public class _LinkList {

  public static void main(String[] args) {
    basicOperations(); // 基本操作
    dequeOperations(); // 双端队列操作
    iterationMethods(); // 迭代器操作
    performanceSensitiveOperations(); // 性能敏感操作
  }

  /**
   * 基本操作演示
   * 展示LinkedList的创建、添加、访问和删除等基本操作
   */
  public static void basicOperations() {
    System.out.println("\n=== 基本操作 ===");

    // 创建LinkedList
    LinkedList<String> list = new LinkedList<>();

    // 添加元素
    list.add("苹果");          // 尾部添加
    list.addFirst("香蕉");    // 头部添加
    list.addLast("橙子");     // 尾部添加
    list.add(1, "葡萄");      // 指定位置插入
    list.addAll(Arrays.asList("西瓜", "芒果")); // 批量添加

    System.out.println("添加后列表: " + list);

    // 访问元素
    String first = list.getFirst();  // 获取头部元素
    String last = list.getLast();   // 获取尾部元素
    String element = list.get(2);   // 获取指定位置元素（效率低）

    System.out.println("头部元素: " + first);
    System.out.println("尾部元素: " + last);
    System.out.println("索引2元素: " + element);

    // 删除元素
    list.removeFirst();             // 删除头部
    list.removeLast();             // 删除尾部
    list.remove(1);                // 删除指定位置
    list.remove("葡萄");           // 删除指定元素

    System.out.println("删除后列表: " + list);

    // 其他常用方法
    System.out.println("是否包含芒果: " + list.contains("芒果"));
    System.out.println("当前大小: " + list.size());
    System.out.println("是否为空: " + list.isEmpty());
  }

  /**
   * 作为双端队列(Deque)使用
   * 展示LinkedList的队列和栈操作
   */
  public static void dequeOperations() {
    System.out.println("\n=== 双端队列操作 ===");

    // 作为队列使用（FIFO）
    Deque<String> queue = new LinkedList<>();
    queue.offer("第一人");  // 入队
    queue.offer("第二人");
    queue.offer("第三人");

    System.out.println("当前队列: " + queue);
    System.out.println("出队元素: " + queue.poll());  // 出队
    System.out.println("查看队首: " + queue.peek());

    // 作为栈使用（LIFO）
    Deque<String> stack = new LinkedList<>();
    stack.push("第一层");  // 压栈
    stack.push("第二层");
    stack.push("第三层");

    System.out.println("当前栈: " + stack);
    System.out.println("弹出栈顶: " + stack.pop());  // 弹栈
    System.out.println("查看栈顶: " + stack.peek());
  }

  /**
   * 遍历方式演示
   * 展示LinkedList的多种遍历方式
   */
  public static void iterationMethods() {
    System.out.println("\n=== 遍历方式 ===");
    LinkedList<String> colors = new LinkedList<>(Arrays.asList("红", "绿", "蓝", "黄"));

    // 1. 普通for循环（不推荐，效率低）
    System.out.print("普通for循环: ");
    for (int i = 0; i < colors.size(); i++) {
      System.out.print(colors.get(i) + " ");
    }

    // 2. 增强for循环
    System.out.print("\n增强for循环: ");
    for (String color : colors) {
      System.out.print(color + " ");
    }

    // 3. 迭代器
    System.out.print("\n迭代器遍历: ");
    Iterator<String> it = colors.iterator();
    while (it.hasNext()) {
      System.out.print(it.next() + " ");
    }

    // 4. 降序迭代器
    System.out.print("\n降序迭代器: ");
    Iterator<String> dit = colors.descendingIterator();
    while (dit.hasNext()) {
      System.out.print(dit.next() + " ");
    }

    // 5. ListIterator（可双向遍历）
    System.out.print("\nListIterator: ");
    ListIterator<String> lit = colors.listIterator(colors.size());
    while (lit.hasPrevious()) {
      System.out.print(lit.previous() + " ");
    }
  }

  /**
   * 性能敏感操作演示
   * 展示LinkedList的性能特点和注意事项
   */
  public static void performanceSensitiveOperations() {
    System.out.println("\n\n=== 性能敏感操作 ===");

    // 创建大容量LinkedList
    LinkedList<Integer> numbers = new LinkedList<>();
    for (int i = 0; i < 100000; i++) {
      numbers.add(i);
    }

    // 测试随机访问性能（不推荐）
    long start = System.currentTimeMillis();
    for (int i = 0; i < 1000; i++) {
      int num = numbers.get(i * 100);
    }
    long duration = System.currentTimeMillis() - start;
    System.out.println("随机访问1000个元素耗时: " + duration + "ms");

    // 测试迭代器访问性能（推荐）
    start = System.currentTimeMillis();
    Iterator<Integer> it = numbers.iterator();
    int count = 0;
    while (it.hasNext() && count++ < 1000) {
      int num = it.next();
    }
    duration = System.currentTimeMillis() - start;
    System.out.println("迭代器访问1000个元素耗时: " + duration + "ms");
  }

}