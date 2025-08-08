package commonlyUsedClasses._util._concurrent;

import java.util.concurrent.*;

/**
 * FutureTask使用示例
 *
 * 核心特点：
 * 1. 实现Future和Runnable接口
 * 2. 可取消的异步计算
 * 3. 可查询计算状态和结果
 *
 * 适用场景：
 * - 需要获取异步任务结果
 * - 可取消的长时间运行任务
 * - 多个线程等待同一个计算结果
 */
public class _FutureTask {
    public static void main(String[] args) {
        FutureTask<Integer> futureTask = new FutureTask<>(new ComplexCalculation());

        // 方式1: 直接使用Thread执行
        new Thread(futureTask).start();

        // 方式2: 通过Executor执行
        // ExecutorService executor = Executors.newSingleThreadExecutor();
        // executor.submit(futureTask);

        System.out.println("主线程继续其他工作");
        try {
            // 模拟主线程其他工作
            Thread.sleep(1000);

            // 获取计算结果(会阻塞直到计算完成)
            int result = futureTask.get();
            System.out.println("计算结果: " + result);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        } catch (ExecutionException e) {
            System.err.println("计算过程中发生错误: " + e.getCause());
        }
    }
}

class ComplexCalculation implements Callable<Integer> {
    @Override
    public Integer call() throws Exception {
        System.out.println("开始复杂计算");
        int sum = 0;
        for (int i = 1; i <= 100; i++) {
            sum += i;
            Thread.sleep(50); // 模拟耗时计算
            if (Thread.currentThread().isInterrupted()) {
                System.out.println("计算被中断");
                throw new InterruptedException();
            }
        }
        System.out.println("复杂计算完成");
        return sum;
    }
}
