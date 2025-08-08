package thread.lazySingle;


public class SafeLazySingleton {
  private static SafeLazySingleton instance;

  // 私有构造器防止外部实例化
  private SafeLazySingleton() {
    System.out.println("SafeLazySingleton实例被创建");
  }

  // 使用同步方法解决线程安全问题
  public static synchronized SafeLazySingleton getInstance1() {
    if (instance == null) {
      // 模拟创建实例前的耗时操作
      try {
        Thread.sleep(100);
      } catch (InterruptedException e) {
        e.printStackTrace();
      }
      instance = new SafeLazySingleton();
    }
    return instance;
  }

  // 双重检查锁定（推荐）
  // tips: 最优实现是使用静态内部类实现懒汉式单例模式
  public static SafeLazySingleton getInstance2() {
    if (instance == null) {
      synchronized (SafeLazySingleton.class) {
        if (instance == null) instance = new SafeLazySingleton();
      }
    }
    return instance;
  }

  // 测试方法
  public static void main(String[] args) {
    // 模拟多线程环境
    for (int i = 0; i < 10; i++) {
      new Thread(() -> {
        SafeLazySingleton.getInstance1();
      }).start();
    }
  }
}
