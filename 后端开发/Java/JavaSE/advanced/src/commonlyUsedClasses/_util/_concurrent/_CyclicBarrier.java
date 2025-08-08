package commonlyUsedClasses._util._concurrent;

import java.util.concurrent.BrokenBarrierException;
import java.util.concurrent.CyclicBarrier;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * CyclicBarrier使用示例
 *
 * 核心特点：
 * 1. 初始化时指定参与线程数和屏障动作
 * 2. await()方法使线程等待在屏障点
 * 3. 可重复使用(reset())
 * 4. 支持屏障动作在所有线程到达后执行
 *
 * 适用场景：
 * - 多阶段任务需要同步
 * - 并行计算分阶段处理
 */
public class _CyclicBarrier {
    public static void main(String[] args) {
        final int taskCount = 3;
        CyclicBarrier barrier = new CyclicBarrier(taskCount, () ->
                System.out.println("所有线程到达屏障，执行屏障动作"));

        ExecutorService executor = Executors.newFixedThreadPool(taskCount);

        System.out.println("启动所有Task线程");
        for (int i = 0; i < taskCount; i++) {
            executor.execute(new Task(barrier, "Task-" + i));
        }

        executor.shutdown();
    }
}

class Task implements Runnable {
    private final CyclicBarrier barrier;
    private final String name;

    public Task(CyclicBarrier barrier, String name) {
        this.barrier = barrier;
        this.name = name;
    }

    @Override
    public void run() {
        try {
            System.out.println(name + " 第一阶段开始");
            Thread.sleep(1000 + (int)(Math.random() * 1000));
            System.out.println(name + " 第一阶段完成，等待其他线程");
            barrier.await();

            System.out.println(name + " 第二阶段开始");
            Thread.sleep(500 + (int)(Math.random() * 500));
            System.out.println(name + " 第二阶段完成，等待其他线程");
            barrier.await();

            System.out.println(name + " 所有阶段完成");
        } catch (InterruptedException | BrokenBarrierException e) {
            Thread.currentThread().interrupt();
        }
    }
}