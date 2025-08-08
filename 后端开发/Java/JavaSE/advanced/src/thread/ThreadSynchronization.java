package thread;


public class ThreadSynchronization {
    public static void main(String[] args) {
        // 锁的正确使用示例1
        Ticket1 ticket = new Ticket1();
        new Thread(ticket, "窗口1").start();
        new Thread(ticket, "窗口2").start();
        new Thread(ticket, "窗口3").start();

        // 锁的正确使用示例2
        // Ticket2 ticket2_1 = new Ticket2( "窗口1");
        // Ticket2 ticket2_2 = new Ticket2( "窗口2");
        // Ticket2 ticket2_3 = new Ticket2( "窗口3");
        // ticket2_1.start();
        // ticket2_2.start();
        // ticket2_3.start();
    }
}

/**
 * 线程同步与锁示例类
 *
 * 线程同步核心知识：
 * 1. 同步问题：多线程共享资源时可能导致数据不一致
 *
 * 2. 如何解决：保证一个线程做一些会导致数据不一致的操作时，其它线程必须等待
 *
 * 3. Java同步解决方案：
 *    - synchronized关键字
 *      - 同步方法
 *      - 同步代码块
 *    - Lock接口及其实现类
 *
 * 4. 线程安全：
 *    - 原子性：操作不可中断
 *    - 可见性：线程修改对其他线程可见
 *    - 有序性：程序执行顺序符合预期
 *
 * 示例说明
 *  本类展示三种线程同步方式：
 *  - synchronized方法
 *  - synchronized代码块
 *  - Lock接口实现
 *
 * tips: 示例中三个不同的方法使用了三个不同的锁 在实际项目中这是错误的 应该使用同一个锁
 *
 */
class Account {
    private int balance;
    private final Object lock = new Object();  // 专用锁对象（用于synchronized代码块）
    private final java.util.concurrent.locks.Lock accountLock = new java.util.concurrent.locks.ReentrantLock(); // ReentrantLock实例（用于显式锁）

    public Account(int balance) {
        this.balance = balance;
    }

    /**
     * 取款操作（同步代码块实现线程安全）
     *
     * 说明：
     * - 需要被同步的代码，即为操作共享数据的代码
     * - 共享数据：即多个线程需要操作的数据。比如 balance
     * - 需要被同步的代码，在被synchronized包括以后，就使得一个线程在操作这些代码的过程中，其它线程必须等待
     * - 同步监视器，俗称锁。哪个线程获取了锁，哪个线程就能执行需要被同步的代码
     */
    public void withdraw(int amount) {
        // 获取lock对象的监视器锁
        synchronized (lock) {
            // 检查余额是否充足（在同步块内检查保证原子性）
            if (balance >= amount) {
                try {
                    Thread.sleep(100); // 模拟处理耗时
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                balance -= amount; // 修改余额
                System.out.println(Thread.currentThread().getName()
                  + " 取款 " + amount + ", 余额: " + balance);
            }
        }
        // 释放lock对象的监视器锁
    }

    // 获取余额（同步方法实现线程安全）
    public synchronized int getBalance() {
        return balance;
    }

    /**
     * 存款操作（Lock接口实现线程安全）
     *
     * 同步原理：
     * - 使用ReentrantLock显式锁
     * - 必须在finally块中释放锁
     * - 相比synchronized提供更灵活的锁控制
     */
    public void deposit(int amount) {
        accountLock.lock(); // 获取锁
        try {
            balance += amount; // 修改余额
            System.out.println(Thread.currentThread().getName()
              + " 存款 " + amount + ", 余额: " + balance);
            Thread.sleep(100); // 模拟处理耗时
        } catch (InterruptedException e) {
            e.printStackTrace();
        } finally {
            accountLock.unlock(); // 确保锁被释放
        }
    }
}


class Ticket1 implements Runnable {
    private int ticket = 100;
    private final Object lock = new Object();  // 添加专用锁对象

    @Override
    public void run() {
        // while (true) {
        //     try {
        //         Thread.sleep(10);
        //         // 同步代码块
        //         synchronized (lock) {
        //             if (ticket <= 0) {
        //                 break;  // 票卖完后退出循环
        //             }
        //             System.out.println(Thread.currentThread().getName() + " 卖出第 " + ticket-- + " 张票");
        //         }
        //     } catch (InterruptedException e) {
        //         Thread.currentThread().interrupt();  // 正确处理中断
        //         break;  // 中断时退出循环
        //     }
        // }
        this.sale();
    }

    // 同步方法
    public synchronized void sale() {
        while (true) {
            try {
                Thread.sleep(10);
                if (ticket <= 0) {
                    break;  // 票卖完后退出循环
                }
                System.out.println(Thread.currentThread().getName() + " 卖出第 " + ticket-- + " 张票");
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();  // 正确处理中断
                break;  // 中断时退出循环
            }
        }
    }
}

class Ticket2 extends Thread {
    private static int ticket = 100;

    Ticket2(String name) {
        super(name);
    }

    @Override
    public void run() {
        while (true) {
            try {
                Thread.sleep(10);
                synchronized (Ticket2.class) {
                    if (ticket <= 0) break;
                    System.out.println(Thread.currentThread().getName() + " 卖出第 " + ticket-- + " 张票");
                }
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
        }
    }

    // 同步方法
    public synchronized void sale() {
        while (true) {
            try {
                Thread.sleep(10);
                if (ticket <= 0) {
                    break;  // 票卖完后退出循环
                }
                System.out.println(Thread.currentThread().getName() + " 卖出第 " + ticket-- + " 张票");
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();  // 正确处理中断
                break;  // 中断时退出循环
            }
        }
    }
}



