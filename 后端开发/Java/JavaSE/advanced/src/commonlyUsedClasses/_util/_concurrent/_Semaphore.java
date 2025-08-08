package commonlyUsedClasses._util._concurrent;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Semaphore;
import java.util.concurrent.TimeUnit;

/**
 * Semaphore使用示例
 *
 * 核心特点：
 * 1. 初始化时指定许可数量
 * 2. acquire()获取许可(阻塞或非阻塞)
 * 3. release()释放许可
 * 4. 支持公平/非公平模式
 *
 * 适用场景：
 * - 资源池管理(如数据库连接池)
 * - 限流控制
 * - 互斥锁(许可数为1时)
 */
public class _Semaphore {
    public static void main(String[] args) {
        final int resourceCount = 2;
        final int userCount = 5;
        Semaphore semaphore = new Semaphore(resourceCount, true); // 公平模式

        ExecutorService executor = Executors.newFixedThreadPool(userCount);

        System.out.println("启动资源使用者线程");
        for (int i = 0; i < userCount; i++) {
            executor.execute(new ResourceUser(semaphore, "User-" + i));
        }

        executor.shutdown();
    }
}

class ResourceUser implements Runnable {
    private final Semaphore semaphore;
    private final String name;

    public ResourceUser(Semaphore semaphore, String name) {
        this.semaphore = semaphore;
        this.name = name;
    }

    @Override
    public void run() {
        try {
            System.out.println(name + " 尝试获取资源");
            if (semaphore.tryAcquire(1, TimeUnit.SECONDS)) {
                try {
                    System.out.println(name + " 获取资源许可成功");
                    Thread.sleep(2000); // 模拟资源使用
                    System.out.println(name + " 使用资源完成");
                } finally {
                    semaphore.release();
                    System.out.println(name + " 释放资源许可");
                }
            } else {
                System.out.println(name + " 获取资源超时");
            }
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}