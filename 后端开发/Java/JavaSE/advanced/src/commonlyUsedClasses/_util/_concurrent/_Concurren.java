package commonlyUsedClasses._util._concurrent;

import java.util.*;
import java.util.concurrent.*;

/**
 * Concurrent集合使用示例
 *
 * 核心特点：
 * 1. 线程安全的集合实现
 * 2. 比同步包装器(synchronizedXXX)更高的并发性能
 * 3. 弱一致性迭代器
 *
 * 常用实现类：
 * - ConcurrentHashMap
 * - CopyOnWriteArrayList
 * - ConcurrentLinkedQueue
 * - BlockingQueue实现类
 */
public class _Concurren {
    public static void main(String[] args) throws InterruptedException {
        // 1. ConcurrentHashMap示例
        Map<String, Integer> concurrentMap = new ConcurrentHashMap<>();
        ExecutorService executor = Executors.newFixedThreadPool(5);

        for (int i = 0; i < 10; i++) {
            final int taskId = i;
            executor.execute(() -> {
                for (int j = 0; j < 100; j++) {
                    concurrentMap.merge("key-" + taskId % 3, 1, Integer::sum);
                }
            });
        }

        executor.shutdown();
        executor.awaitTermination(1, TimeUnit.SECONDS);
        System.out.println("ConcurrentHashMap结果: " + concurrentMap);

        // 2. CopyOnWriteArrayList示例
        List<String> cowList = new CopyOnWriteArrayList<>();
        cowList.addAll(Arrays.asList("A", "B", "C"));

        // 迭代过程中可以安全修改
        for (String item : cowList) {
            if (item.equals("B")) {
                cowList.add("D");
            }
        }
        System.out.println("CopyOnWriteArrayList结果: " + cowList);

        // 3. BlockingQueue示例
        BlockingQueue<String> queue = new LinkedBlockingQueue<>(2);
        new Thread(() -> {
            try {
                queue.put("消息1");
                queue.put("消息2");
                queue.put("消息3"); // 将阻塞直到有空间
                System.out.println("生产者完成");
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }).start();

        new Thread(() -> {
            try {
                Thread.sleep(1000);
                System.out.println("消费者接收: " + queue.take());
                System.out.println("消费者接收: " + queue.take());
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }).start();
    }
}