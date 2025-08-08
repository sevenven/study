package thread.communication;

import java.util.LinkedList;
import java.util.Queue;

/**
 * 线程间通信示例类
 *
 * 线程通信核心知识：
 * 1. wait()/notify()/notifyAll()机制
 *    - 必须在同步代码块中使用
 *    - wait(): 释放锁并等待
 *    - notify(): 唤醒一个等待线程(按优先级来)
 *    - notifyAll(): 唤醒所有等待线程
 *
 * 2. 生产者-消费者模式
 *    - 生产者和消费者通过共享队列通信
 *    - 需要处理队列满和队列空的情况
 */
public class ThreadCommunication {
    public static void main(String[] args) {
        // 创建容量为5的消息队列
        MessageQueue queue = new MessageQueue(5);

        // 生产者线程 - 生产10条消息
        Thread producer = new Thread(() -> {
            for (int i = 0; i < 10; i++) {
                String msg = "消息-" + i;
                queue.put(msg);  // 将消息放入队列
                System.out.println("生产: " + msg);
                try {
                    Thread.sleep(200);  // 模拟生产耗时
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }, "Producer");  // 线程命名为Producer

        // 消费者线程 - 消费10条消息
        Thread consumer = new Thread(() -> {
            for (int i = 0; i < 10; i++) {
                String msg = queue.take();  // 从队列取出消息
                System.out.println("消费: " + msg);
                try {
                    Thread.sleep(500);  // 模拟消费耗时
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }, "Consumer");  // 线程命名为Consumer

        // 启动生产者和消费者线程
        producer.start();
        consumer.start();
    }
}

/**
 * 线程安全的消息队列类
 * 实现生产者-消费者模式的核心通信机制
 */
class MessageQueue {
    private final Queue<String> queue;  // 实际存储消息的队列
    private final int maxSize;         // 队列最大容量

    public MessageQueue(int maxSize) {
        this.maxSize = maxSize;
        this.queue = new LinkedList<>();
    }

    /**
     * 向队列中添加消息(生产者调用)
     * @param message 要添加的消息
     *
     * 关键点：
     * 1. 方法声明为synchronized，确保线程安全
     * 2. 使用while循环而不是if检查条件，防止虚假唤醒
     * 3. wait()会释放锁，让其他线程可以进入同步块
     * 4. notifyAll()唤醒所有等待线程
     */
    public synchronized void put(String message) {
        // 当队列满时，生产者需要等待
        while (queue.size() == maxSize) {
            try {
                System.out.println("队列已满，" + Thread.currentThread().getName() + "等待...");
                wait(); // 1. 释放锁 2. 进入等待状态 3. 被唤醒后重新获取锁
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        // 队列有空位，添加消息
        queue.add(message);
        // 通知所有等待的消费者线程(可能有多个消费者在等待)
        notifyAll();
    }

    /**
     * 从队列中取出消息(消费者调用)
     * @return 取出的消息
     *
     * 关键点：
     * 1. 方法声明为synchronized，确保线程安全
     * 2. 使用while循环检查条件
     * 3. wait()会释放锁
     * 4. notifyAll()唤醒所有等待线程
     */
    public synchronized String take() {
        // 当队列为空时，消费者需要等待
        while (queue.isEmpty()) {
            try {
                System.out.println("队列为空，" + Thread.currentThread().getName() + "等待...");
                wait(); // 1. 释放锁 2. 进入等待状态 3. 被唤醒后重新获取锁
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        // 队列不为空，取出消息
        String message = queue.poll();
        // 通知所有等待的生产者线程(可能有多个生产者在等待)
        notifyAll();
        return message;
    }
}