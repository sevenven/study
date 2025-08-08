package thread.deadlock;

/**
 * Java死锁示例
 *
 * 死锁是指不同的线程分别占用对方需要的同步资源不放弃，都在等待对方放弃自己需要的同步资源
 * 若无外力干涉，这些线程都无法继续执行下去。
 *
 * 死锁产生的四个必要条件：
 * 1. 互斥条件：资源一次只能由一个线程占用
 * 2. 请求与保持条件：线程持有至少一个资源，并请求另一个被其他线程占用的资源
 * 3. 不剥夺条件：线程已获得的资源在未使用完之前不能被其他线程强行剥夺
 * 4. 循环等待条件：多个线程形成头尾相接的循环等待资源关系
 */
public class Deadlock {

  // 创建两个资源对象
  private static final Object resource1 = new Object();
  private static final Object resource2 = new Object();

  public static void main(String[] args) {
    // 线程1：先获取resource1，然后尝试获取resource2
    Thread thread1 = new Thread(() -> {
      synchronized (resource1) {
        System.out.println("线程1获取resource1的锁");

        try {
          // 添加延迟，确保死锁发生
          Thread.sleep(100);
        } catch (InterruptedException e) {
          e.printStackTrace();
        }

        System.out.println("线程1尝试获取resource2的锁...");
        synchronized (resource2) {
          System.out.println("线程1获取resource2的锁");
        }
      }
    });

    // 线程2：先获取resource2，然后尝试获取resource1
    Thread thread2 = new Thread(() -> {
      synchronized (resource2) {
        System.out.println("线程2获取resource2的锁");

        try {
          // 添加延迟，确保死锁发生
          Thread.sleep(100);
        } catch (InterruptedException e) {
          e.printStackTrace();
        }

        System.out.println("线程2尝试获取resource1的锁...");
        synchronized (resource1) {
          System.out.println("线程2获取resource1的锁");
        }
      }
    });

    // 启动两个线程
    thread1.start();
    thread2.start();

    System.out.println("主线程继续执行...");
  }
}
