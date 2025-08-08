package thread.deadlock;

public class DeadlockFree {
  private static final Object resource1 = new Object();
  private static final Object resource2 = new Object();

  public static void main(String[] args) {
    // 两个线程都按resource1 -> resource2的顺序获取锁
    Thread thread1 = new Thread(() -> {
      synchronized (resource1) {
        System.out.println("线程1获取resource1的锁");
        try { Thread.sleep(100); } catch (InterruptedException e) {}
        synchronized (resource2) {
          System.out.println("线程1获取resource2的锁");
        }
      }
    });

    Thread thread2 = new Thread(() -> {
      synchronized (resource1) {
        System.out.println("线程2获取resource1的锁");
        try { Thread.sleep(100); } catch (InterruptedException e) {}
        synchronized (resource2) {
          System.out.println("线程2获取resource2的锁");
        }
      }
    });

    thread1.start();
    thread2.start();
  }
}