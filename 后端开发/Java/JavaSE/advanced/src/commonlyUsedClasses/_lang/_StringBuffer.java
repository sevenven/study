package commonlyUsedClasses._lang;

/**
 * StringBuffer 示例类
 *
 * StringBuffer 是线程安全的可变字符序列
 * 位于 java.lang 包，无需显式导入
 */
public class _StringBuffer {

  public static void main(String[] args) {
    demonstrateCreation(); // StringBuffer的创建方式
    demonstrateThreadSafety(); // 线程安全
    demonstrateAllMethods(); // 所有方法
  }

  // StringBuffer的创建方式
  private static void demonstrateCreation() {
    System.out.println("\n=== StringBuffer 创建方式 ===");

    // 方式1：默认构造器（初始容量16）
    StringBuffer sb1 = new StringBuffer();
    System.out.println("空StringBuffer: " + sb1 + " | 容量: " + sb1.capacity());

    // 方式2：指定初始容量
    StringBuffer sb2 = new StringBuffer(32);
    System.out.println("指定容量32: " + sb2 + " | 容量: " + sb2.capacity());

    // 方式3：从字符串创建
    StringBuffer sb3 = new StringBuffer("Hello");
    System.out.println("从字符串创建: " + sb3 + " | 容量: " + sb3.capacity()); // 容量=字符串长度+16
  }

  // 线程安全
  private static void demonstrateThreadSafety() {
    System.out.println("\n=== StringBuffer 线程安全 ===");
    final StringBuffer sharedBuffer = new StringBuffer();
    final int THREAD_COUNT = 5;

    Thread[] threads = new Thread[THREAD_COUNT];
    for (int i = 0; i < THREAD_COUNT; i++) {
      final int threadId = i;
      threads[i] = new Thread(() -> {
        for (int j = 0; j < 3; j++) {
          sharedBuffer.append("Thread-").append(threadId).append(" ");
          try {
            Thread.sleep(100);
          } catch (InterruptedException e) {
            e.printStackTrace();
          }
        }
      });
      threads[i].start();
    }

    for (Thread t : threads) {
      try {
        t.join();
      } catch (InterruptedException e) {
        e.printStackTrace();
      }
    }

    System.out.println("最终结果: " + sharedBuffer.toString());
    System.out.println("长度: " + sharedBuffer.length());
  }

  // ========== 所有方法 ==========
  private static void demonstrateAllMethods() {
    System.out.println("\n=== StringBuffer 所有方法演示 ===");

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
    StringBuffer sb = new StringBuffer("Start");

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
    StringBuffer sb = new StringBuffer("Java");

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
    StringBuffer sb = new StringBuffer("HelloWorldJava");

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
    StringBuffer sb = new StringBuffer("HelloJava");

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
    StringBuffer sb = new StringBuffer("Hello");
    sb.reverse();
    System.out.println("reverse(): " + sb);
  }

  // ========== substring() 方法 ==========
  private static void demonstrateSubstringMethods() {
    System.out.println("\n--- substring() 方法演示 ---");
    StringBuffer sb = new StringBuffer("HelloWorld");

    // substring(int)
    System.out.println("substring(5): " + sb.substring(5));

    // substring(int, int)
    System.out.println("substring(3,7): " + sb.substring(3,7));
  }

  // ========== toString() 方法 ==========
  private static void demonstrateToStringMethod() {
    System.out.println("\n--- toString() 方法演示 ---");
    StringBuffer sb = new StringBuffer("Hello");
    String str = sb.toString();
    System.out.println("toString(): " + str);
  }

  // ========== 字符相关方法 ==========
  private static void demonstrateCharMethods() {
    System.out.println("\n--- 字符相关方法演示 ---");
    StringBuffer sb = new StringBuffer("Java");

    // charAt(int)
    System.out.println("charAt(1): " + sb.charAt(1));

    // codePointAt(int)
    System.out.println("codePointAt(1): " + sb.codePointAt(1));
  }

  // ========== 查找方法 ==========
  private static void demonstrateIndexOfMethods() {
    System.out.println("\n--- 查找方法演示 ---");
    StringBuffer sb = new StringBuffer("HelloHello");

    // indexOf(String)
    System.out.println("indexOf(\"ell\"): " + sb.indexOf("ell"));

    // lastIndexOf(String)
    System.out.println("lastIndexOf(\"ell\"): " + sb.lastIndexOf("ell"));
  }

  // ========== 长度方法 ==========
  private static void demonstrateLengthMethods() {
    System.out.println("\n--- 长度方法演示 ---");
    StringBuffer sb = new StringBuffer("Hello");

    // length()
    System.out.println("length(): " + sb.length());

    // setLength(int)
    sb.setLength(3);
    System.out.println("setLength(3): " + sb);
  }

  // ========== 容量方法 ==========
  private static void demonstrateCapacityMethods() {
    System.out.println("\n--- 容量方法演示 ---");
    StringBuffer sb = new StringBuffer(10);

    // capacity()
    System.out.println("初始capacity(): " + sb.capacity());

    // ensureCapacity(int)
    sb.ensureCapacity(100);
    System.out.println("ensureCapacity(100)后: " + sb.capacity());
  }

  // ========== trimToSize() 方法 ==========
  private static void demonstrateTrimMethod() {
    System.out.println("\n--- trimToSize() 方法演示 ---");
    StringBuffer sb = new StringBuffer(100);
    sb.append("Hello");

    System.out.println("原capacity(): " + sb.capacity());
    sb.trimToSize();
    System.out.println("trimToSize()后: " + sb.capacity());
  }

  // ========== getChars() 方法 ==========
  private static void demonstrateGetCharsMethod() {
    System.out.println("\n--- getChars() 方法演示 ---");
    StringBuffer sb = new StringBuffer("Hello");
    char[] chars = new char[5];
    sb.getChars(0, sb.length(), chars, 0);
    System.out.println("getChars(): " + new String(chars));
  }

}