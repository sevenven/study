package thread.lazySingle;

/**
 * 懒汉式单例模式（非线程安全版本）
 *
 * 问题分析：
 * 1. 懒汉式特点：延迟加载，只在第一次使用时创建实例
 * 2. 线程安全问题：当多个线程同时调用getInstance()时，可能创建多个实例
 * 3. 根本原因：if(instance == null)判断和instance = new Singleton()操作不是原子操作
 */
public class UnsafeLazySingleton {
  private static UnsafeLazySingleton instance;

  // 私有构造器防止外部实例化
  private UnsafeLazySingleton() {
    System.out.println("UnsafeLazySingleton实例被创建");
  }

  /**
   * 非线程安全的获取实例方法
   *
   * 多线程问题场景：
   * 线程A执行到if(instance == null)判断为true
   * 线程B也执行到if(instance == null)判断为true
   * 然后线程A和线程B都会执行new创建实例
   * 最终导致创建多个实例
   */
  public static UnsafeLazySingleton getInstance() {
    if (instance == null) {
      // 模拟创建实例前的耗时操作
      try {
        Thread.sleep(100);
      } catch (InterruptedException e) {
        e.printStackTrace();
      }
      instance = new UnsafeLazySingleton();
    }
    return instance;
  }

  // 测试方法
  public static void main(String[] args) {
    // 模拟多线程环境
    for (int i = 0; i < 10; i++) {
      new Thread(() -> {
        UnsafeLazySingleton.getInstance();
      }).start();
    }
  }
}
