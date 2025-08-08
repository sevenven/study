package thread.pool;

import java.util.concurrent.*;

/**
 * 线程池与Callable示例类
 *
 * 线程池核心知识：
 * 1. 线程池优势：
 *    - 降低资源消耗
 *    - 提高响应速度
 *    - 提高线程可管理性
 *
 * 2. Executor框架：
 *    - Executor: 执行接口
 *    - ExecutorService: 扩展Executor
 *    - ThreadPoolExecutor: 线程池实现类
 *    - Executors: 工厂方法工具类
 *
 * 3. Callable vs Runnable:
 *    - Callable可以有返回值
 *    - Callable可以抛出异常
 *    - Callable使用Future获取结果
 */
public class ThreadPool {
    public static void main(String[] args) {
        // 创建固定大小的线程池
        ExecutorService executor = Executors.newFixedThreadPool(3);

        // 提交Runnable任务
        executor.execute(() -> {
            System.out.println(Thread.currentThread().getName() + " 执行Runnable任务");
        });

        // 提交Callable任务
        Future<Integer> future = executor.submit(new MyCallable());

        try {
            // 获取Callable任务结果(会阻塞直到任务完成)
            Integer result = future.get();
            System.out.println("Callable任务结果: " + result);
        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
        }

        // 关闭线程池
        executor.shutdown();
        try {
            if (!executor.awaitTermination(1, TimeUnit.SECONDS)) {
                executor.shutdownNow();
            }
        } catch (InterruptedException e) {
            executor.shutdownNow();
        }
    }
}

/**
 * 实现Callable接口的任务类
 */
class MyCallable implements Callable<Integer> {
    @Override
    public Integer call() throws Exception {
        int sum = 0;
        for (int i = 1; i <= 100; i++) {
            sum += i;
            Thread.sleep(10); // 模拟耗时操作
        }
        return sum;
    }
}
