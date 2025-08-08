package thread;

/**
 * Java多线程基础示例类
 *
 * 核心概念：
 * 1. 程序(Program)：静态的代码集合，存储在磁盘上的可执行文件
 * 2. 进程(Process)：程序的一次执行过程，操作系统调度和分配资源的最小单位
 *    - 拥有独立的内存空间（堆、栈、方法区）
 *    - 进程间通信(IPC)成本较高（管道、信号、共享内存等）
 * 3. 线程(Thread)：进程内的执行单元，CPU调度和执行的最小单位
 *    - 共享进程内存空间（堆、方法区），独有栈和程序计数器
 *    - 线程间通信成本低（可直接访问共享变量）
 * 4. 并行(Parallelism)：多核CPU同时执行多个线程（真正的同时）
 * 5. 并发(Concurrency)：单核CPU通过时间片轮转模拟"同时"执行
 *
 * 线程创建核心知识：
 * 1. 创建线程的两种方式：
 *    - 继承Thread类并重写run()方法
 *    - 实现Runnable接口并实现run()方法
 *
 * 2. 线程构造器：
 *    - Thread(): 分配新Thread对象
 *    - Thread(String name): 指定线程名称
 *    - Thread(Runnable target): 使用Runnable对象创建
 *    - Thread(Runnable target, String name): 组合形式
 *    - Thread(ThreadGroup group, Runnable target): 指定线程组
 *    - Thread(ThreadGroup group, Runnable target, String name): 组合形式
 *    - Thread(ThreadGroup group, Runnable target, String name, long stackSize): 组合形式
 *    - Thread(ThreadGroup group, Runnable target, String name, long stackSize, boolean daemon): 组合形式
 *
 * 3. 线程中的方法：
 *  3.1 常用方法：
 *    - start(): 启动线程（进入RUNNABLE状态，只能调用一次）
 *    - run(): 线程执行体（由JVM调用，不应直接调用）
 *    - currentThread(): 获取当前线程实例
 *    - getName()/setName(): 线程名称操作
 *    - sleep(long millis): 线程休眠（不释放锁，进入TIMED_WAITING状态）
 *    - yield(): 提示调度器让出当前CPU（不保证立即生效）
 *    - join(): 等待该线程终止
 *    - isAlive(): 判断线程是否存活
 *    - getId(): 获取线程唯一ID
 *    - getState(): 获取线程状态（返回Thread.State枚举）
 *    - interrupt(): 中断线程（设置中断标志位）
 *    - isInterrupted(): 测试线程是否被中断
 *    - interrupted(): 静态方法，测试并清除当前线程的中断状态
 *    - setDaemon(): 设置为守护线程（随主线程退出）
 *
 *  3.2 过时方法（Deprecated）：
 *    - stop(): 强制终止线程（已废弃，会导致：
 *      * 突然释放所有监视器锁，可能破坏对象一致性
 *      * 示例：转账操作中途被终止可能导致金额错误）
 *    - suspend(): 暂停线程（已废弃，会导致：
 *      * 不释放锁的情况下挂起，容易导致死锁
 *      * 示例：线程A持有锁L被挂起，线程B需要锁L才能唤醒A）
 *    - resume(): 恢复被suspend的线程（已废弃）
 *    - destroy(): 销毁线程（从未实现）
 *
 * 4. 线程优先级：
 *    - 优先级范围：1（MIN_PRIORITY）~ 10（MAX_PRIORITY）
 *    - 默认优先级：5（NORM_PRIORITY）
 *    - 获取/设置优先级：getPriority()/setPriority(int newPriority)
 *    - 注意事项：
 *      * 不同操作系统优先级映射不同（Windows有7级，Linux有140级）
 *      * 高优先级不能保证绝对优先执行
 *      * 避免依赖优先级实现业务逻辑
 *    - 优先级效果：
 *      | 优先级  | 获取CPU时间片概率 |
 *      |--------|----------------|
 *      | 高     | 较高但不保证100%  |
 *      | 中     | 适中            |
 *      | 低     | 较低但不为0      |
 *
 * 5. 线程生命周期（状态机模型）：
 *
 *    NEW（新建）
 *      -> start() -> RUNNABLE（可运行）
 *      -> 获取锁失败 -> BLOCKED（锁阻塞）
 *      -> wait()/join() -> WAITING（无限等待）
 *      -> sleep(n)/wait(n)/join(n) -> TIMED_WAITING（限时等待）
 *      -> 运行结束 -> TERMINATED（终止）
 *
 * 详细状态说明：
 * - NEW（新建）：
 *   * 线程对象已创建但未start()
 *   * 示例：Thread t = new Thread()
 *
 * - RUNNABLE（可运行）：
 *   * 包含两种子状态：
 *     - READY：等待CPU时间片（就绪队列中）
 *     - RUNNING：正在执行
 *   * 状态转换触发条件：
 *     - start()：NEW→RUNNABLE
 *     - yield()/时间片用完：RUNNING→READY
 *     - 系统调度：READY→RUNNING
 *
 * - BLOCKED（锁阻塞）：
 *   * 线程等待获取同步锁
 *   * 只针对synchronized关键字
 *   * 示例：
 *     synchronized(lock) {  // 其他线程持有锁时进入BLOCKED
 *         // 临界区
 *     }
 *
 * - WAITING（无限等待）：
 *   * 需要被其他线程显式唤醒
 *   * 进入方式：
 *     - object.wait()
 *     - thread.join()
 *     - LockSupport.park()
 *   * 退出方式：
 *     - notify()/notifyAll()
 *     - 目标线程终止（join()时）
 *
 * - TIMED_WAITING（计时等待）：
 *   * 具有超时机制的等待
 *   * 进入方式：
 *     - Thread.sleep(long)
 *     - object.wait(long)
 *     - thread.join(long)
 *     - LockSupport.parkNanos()
 *
 * - TERMINATED（终止）：
 *   * 进入方式：
 *     - run执行结束
 *     - 出现了未被处理的Error、Exception
 *     - top()
 *
 * 6. 线程调度策略：
 *    - 分时调度(Time Slicing)：
 *      * 系统将CPU时间划分为固定长度的时间片（通常10-100ms）
 *      * 每个线程轮流获得时间片执行
 *      * 特点：公平性高，但上下文切换开销大
 *      * 适用：通用操作系统（如Linux默认策略）
 *    - 抢占式调度(Preemptive Scheduling)：
 *      * 高优先级线程可抢占低优先级线程的执行权
 *      * Java采用的调度策略（通过Thread.setPriority()设置）
 *      * 特点：响应快，但可能产生线程饥饿
 *      * 优先级范围：1(MIN_PRIORITY)-10(MAX_PRIORITY)，默认5(NORM_PRIORITY)
 *    - 对比：
 *      | 特性            | 分时调度               | 抢占式调度           |
 *      |----------------|---------------------|---------------------|
 *      | 公平性          | 高                   | 依赖优先级设置        |
 *      | 响应速度        | 平均                  | 高优先级线程响应快    |
 *      | 实现复杂度      | 简单                  | 复杂                |
 *      | 典型应用场景    | 通用操作系统            | 实时系统             |
 *
 * 7. 最佳实践：
 *    - 优先实现Runnable接口而非继承Thread
 *    - 使用线程池代替直接创建线程
 *    - 使用interrupt()机制而非stop()终止线程
 *    - 为线程设置有意义的名字
 *    - 同步访问共享资源
 *    - 避免过度依赖线程优先级
 *
 * 示例说明：
 * 本类演示基础的线程创建和生命周期管理
 */
public class ThreadBasic {

    public static void main(String[] args) {
        // 方式1: 继承Thread类
        MyThread thread1 = new MyThread();
        thread1.setName("Thread-1");
        thread1.start();

        // 方式2: 实现Runnable接口
        Thread thread2 = new Thread(new MyRunnable(), "Thread-2");
        thread2.start();

        // 主线程继续执行
        for (int i = 0; i < 5; i++) {
            System.out.println(Thread.currentThread().getName() + ": " + i);
            try {
                Thread.sleep(500); // 主线程休眠500ms
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}

// 继承Thread类的方式创建线程
class MyThread extends Thread {
    @Override
    public void run() {
        for (int i = 0; i < 5; i++) {
            System.out.println(getName() + ": " + i);
            try {
                Thread.sleep(300); // 线程休眠300ms
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}

// 实现Runnable接口的方式创建线程
class MyRunnable implements Runnable {
    @Override
    public void run() {
        for (int i = 0; i < 5; i++) {
            System.out.println(Thread.currentThread().getName() + ": " + i);
            try {
                Thread.sleep(400); // 线程休眠400ms
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}
