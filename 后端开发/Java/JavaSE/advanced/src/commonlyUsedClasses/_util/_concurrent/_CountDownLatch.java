package commonlyUsedClasses._util._concurrent;

import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * CountDownLatch使用示例
 *
 * 核心特点：
 * 1. 初始化时指定计数器值
 * 2. countDown()方法减少计数器
 * 3. await()方法阻塞直到计数器归零
 * 4. 一次性使用，不能重置
 *
 * 适用场景：
 * - 主线程等待多个子线程完成任务
 * - 多个线程等待某个初始化操作完成
 */
public class _CountDownLatch {
    public static void main(String[] args) throws InterruptedException {
        final int workerCount = 3;
        CountDownLatch latch = new CountDownLatch(workerCount);
        ExecutorService executor = Executors.newFixedThreadPool(workerCount);

        System.out.println("主线程启动所有Worker线程");
        for (int i = 0; i < workerCount; i++) {
            executor.execute(new Worker(latch, "Worker-" + i));
        }

        System.out.println("主线程等待所有Worker完成");
        latch.await(); // 阻塞直到计数器归零

        System.out.println("所有Worker任务完成，主线程继续");
        executor.shutdown();
    }
}

class Worker implements Runnable {
    private final CountDownLatch latch;
    private final String name;

    public Worker(CountDownLatch latch, String name) {
        this.latch = latch;
        this.name = name;
    }

    @Override
    public void run() {
        try {
            System.out.println(name + " 正在工作");
            Thread.sleep(1000 + (int)(Math.random() * 1000));
            System.out.println(name + " 工作完成");
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        } finally {
            latch.countDown(); // 任务完成，计数器减1
        }
    }
}