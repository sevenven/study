package commonlyUsedClasses._lang;

/**
 * StringBuilder 示例类
 *
 * StringBuilder 是非线程安全的可变字符序列
 * 位于 java.lang 包，无需显式导入
 * 适用于单线程环境下的字符串操作
 */
public class _StringBuilder {
  public static void main(String[] args) {
    demonstrateCreation();      // 创建方式
    demonstratePerformance();    // 性能对比
    demonstrateAllMethods(); // 所有方法
  }

  // ========== 创建方式 ==========
  private static void demonstrateCreation() {
    System.out.println("\n=== StringBuilder 创建方式 ===");

    // 默认构造器（初始容量16）
    StringBuilder sb1 = new StringBuilder();
    System.out.println("空StringBuilder: " + sb1 + " | 容量: " + sb1.capacity());

    // 指定初始容量
    StringBuilder sb2 = new StringBuilder(32);
    System.out.println("指定容量32: " + sb2 + " | 容量: " + sb2.capacity());

    // 从字符串创建
    StringBuilder sb3 = new StringBuilder("Hello");
    System.out.println("从字符串创建: " + sb3 + " | 容量: " + sb3.capacity());
  }

  // ========== 性能对比 ==========
  private static void demonstratePerformance() {
    System.out.println("\n=== 性能对比 ===");
    final int ITERATIONS = 100000;

    // String拼接测试
    long start1 = System.currentTimeMillis();
    String str = "";
    for (int i = 0; i < ITERATIONS; i++) {
      str += i;
    }
    long duration1 = System.currentTimeMillis() - start1;
    System.out.println("String拼接耗时: " + duration1 + "ms");

    // StringBuilder测试
    long start2 = System.currentTimeMillis();
    StringBuilder sb = new StringBuilder();
    for (int i = 0; i < ITERATIONS; i++) {
      sb.append(i);
    }
    long duration2 = System.currentTimeMillis() - start2;
    System.out.println("StringBuilder耗时: " + duration2 + "ms");

    // StringBuffer测试
    long start3 = System.currentTimeMillis();
    StringBuffer buffer = new StringBuffer();
    for (int i = 0; i < ITERATIONS; i++) {
      buffer.append(i);
    }
    long duration3 = System.currentTimeMillis() - start3;
    System.out.println("StringBuffer耗时: " + duration3 + "ms");
  }

  // ========== 所有方法 ==========
  private static void demonstrateAllMethods() {
    System.out.println("\n=== StringBuilder 所有方法演示 ===");

    // 1. 字符串构建方法
    demonstrateAppendMethods();    // append() 系列方法
    demonstrateInsertMethods();    // insert() 系列方法
    demonstrateDeleteMethods();    // delete() 和 deleteCharAt()
    demonstrateReplaceMethods();   // replace() 和 setCharAt()

    // 2. 字符串转换方法
    demonstrateReverseMethod();    // reverse()
    demonstrateSubstringMethods(); // substring()
    demonstrateToStringMethod();   // toString()

    // 3. 查询和检查方法
    demonstrateCharMethods();      // charAt() 和 codePointAt()
    demonstrateIndexOfMethods();   // indexOf() 和 lastIndexOf()
    demonstrateLengthMethods();    // length() 和 setLength()

    // 4. 容量管理方法
    demonstrateCapacityMethods();  // capacity() 和 ensureCapacity()
    demonstrateTrimMethod();       // trimToSize()

    // 5. 其他实用方法
    demonstrateGetCharsMethod();   // getChars()
  }

  // ========== append() 系列方法 ==========
  private static void demonstrateAppendMethods() {
    System.out.println("\n--- append() 方法演示 ---");
    StringBuilder sb = new StringBuilder("Start");

    // append(String)
    sb.append("_String");
    System.out.println("append(String): " + sb);

    // append(int)
    sb.append(123);
    System.out.println("append(int): " + sb);

    // append(Object)
    sb.append(new Object());
    System.out.println("append(Object): " + sb);

    // append(char[])
    sb.append(new char[]{'A','B','C'});
    System.out.println("append(char[]): " + sb);
  }

  // ========== insert() 系列方法 ==========
  private static void demonstrateInsertMethods() {
    System.out.println("\n--- insert() 方法演示 ---");
    StringBuilder sb = new StringBuilder("Java");

    // insert(int, String)
    sb.insert(0, "Hello ");
    System.out.println("insert(0, String): " + sb);

    // insert(int, int)
    sb.insert(5, 123);
    System.out.println("insert(5, int): " + sb);

    // insert(int, char[])
    sb.insert(sb.length(), new char[]{'!','!'});
    System.out.println("insert(char[]): " + sb);
  }

  // ========== delete() 方法 ==========
  private static void demonstrateDeleteMethods() {
    System.out.println("\n--- delete() 方法演示 ---");
    StringBuilder sb = new StringBuilder("HelloWorldJava");

    // delete(int, int)
    sb.delete(5, 10);
    System.out.println("delete(5,10): " + sb);

    // deleteCharAt(int)
    sb.deleteCharAt(0);
    System.out.println("deleteCharAt(0): " + sb);
  }

  // ========== replace() 方法 ==========
  private static void demonstrateReplaceMethods() {
    System.out.println("\n--- replace() 方法演示 ---");
    StringBuilder sb = new StringBuilder("HelloJava");

    // replace(int, int, String)
    sb.replace(5, 9, "World");
    System.out.println("replace(5,9,\"World\"): " + sb);

    // setCharAt(int, char)
    sb.setCharAt(0, 'h');
    System.out.println("setCharAt(0,'h'): " + sb);
  }

  // ========== reverse() 方法 ==========
  private static void demonstrateReverseMethod() {
    System.out.println("\n--- reverse() 方法演示 ---");
    StringBuilder sb = new StringBuilder("Hello");
    sb.reverse();
    System.out.println("reverse(): " + sb);
  }

  // ========== substring() 方法 ==========
  private static void demonstrateSubstringMethods() {
    System.out.println("\n--- substring() 方法演示 ---");
    StringBuilder sb = new StringBuilder("HelloWorld");

    // substring(int)
    System.out.println("substring(5): " + sb.substring(5));

    // substring(int, int)
    System.out.println("substring(3,7): " + sb.substring(3,7));
  }

  // ========== toString() 方法 ==========
  private static void demonstrateToStringMethod() {
    System.out.println("\n--- toString() 方法演示 ---");
    StringBuilder sb = new StringBuilder("Hello");
    String str = sb.toString();
    System.out.println("toString(): " + str);
  }

  // ========== 字符相关方法 ==========
  private static void demonstrateCharMethods() {
    System.out.println("\n--- 字符相关方法演示 ---");
    StringBuilder sb = new StringBuilder("Java");

    // charAt(int)
    System.out.println("charAt(1): " + sb.charAt(1));

    // codePointAt(int)
    System.out.println("codePointAt(1): " + sb.codePointAt(1));
  }

  // ========== 查找方法 ==========
  private static void demonstrateIndexOfMethods() {
    System.out.println("\n--- 查找方法演示 ---");
    StringBuilder sb = new StringBuilder("HelloHello");

    // indexOf(String)
    System.out.println("indexOf(\"ell\"): " + sb.indexOf("ell"));

    // lastIndexOf(String)
    System.out.println("lastIndexOf(\"ell\"): " + sb.lastIndexOf("ell"));
  }

  // ========== 长度方法 ==========
  private static void demonstrateLengthMethods() {
    System.out.println("\n--- 长度方法演示 ---");
    StringBuilder sb = new StringBuilder("Hello");

    // length()
    System.out.println("length(): " + sb.length());

    // setLength(int)
    sb.setLength(3);
    System.out.println("setLength(3): " + sb);
  }

  // ========== 容量方法 ==========
  private static void demonstrateCapacityMethods() {
    System.out.println("\n--- 容量方法演示 ---");
    StringBuilder sb = new StringBuilder(10);

    // capacity()
    System.out.println("初始capacity(): " + sb.capacity());

    // ensureCapacity(int)
    sb.ensureCapacity(100);
    System.out.println("ensureCapacity(100)后: " + sb.capacity());
  }

  // ========== trimToSize() 方法 ==========
  private static void demonstrateTrimMethod() {
    System.out.println("\n--- trimToSize() 方法演示 ---");
    StringBuilder sb = new StringBuilder(100);
    sb.append("Hello");

    System.out.println("原capacity(): " + sb.capacity());
    sb.trimToSize();
    System.out.println("trimToSize()后: " + sb.capacity());
  }

  // ========== getChars() 方法 ==========
  private static void demonstrateGetCharsMethod() {
    System.out.println("\n--- getChars() 方法演示 ---");
    StringBuilder sb = new StringBuilder("Hello");
    char[] chars = new char[5];
    sb.getChars(0, sb.length(), chars, 0);
    System.out.println("getChars(): " + new String(chars));
  }

}