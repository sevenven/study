package advanced._static;

/**
 * 单例模式(Singleton)示例类 - 演示通过static关键字实现单例的两种方式
 *
 * 单例模式核心特点：
 * 1. 私有化构造方法 - 防止外部实例化
 * 2. 静态成员持有唯一实例
 * 3. 提供全局访问点
 *
 * 实现方式对比：
 *
 * 一、饿汉式(静态常量)
 * 特点：
 * - 类加载时就初始化实例
 * - 线程安全(由JVM类加载机制保证)
 * - 可能造成资源浪费(如果实例未被使用)
 *
 * 适用场景：
 * - 实例较小且一定会被使用
 * - 对性能要求不高的场景
 *
 * 二、懒汉式(静态内部类)
 * 特点：
 * - 延迟加载(使用时才初始化)
 * - 线程安全(静态内部类特性保证)
 * - 实现较复杂但性能更优
 *
 * 适用场景：
 * - 实例较大或初始化耗时
 * - 需要延迟加载的场景
 */
public class Singleton {

    // 饿汉式(静态常量实现)
    public static final class EagerSingleton {
        // 1. 私有构造方法
        private EagerSingleton() {
            System.out.println("饿汉式单例初始化");
        }

        // 2. 静态常量持有唯一实例(类加载时创建)
        private static final EagerSingleton INSTANCE = new EagerSingleton();

        // 3. 全局访问点
        public static EagerSingleton getInstance() {
            return INSTANCE;
        }

        public void showMessage() {
            System.out.println("饿汉式单例方法调用");
        }
    }

    // 懒汉式1
    public static class LazySingleton1 {
        // 1. 私有构造方法
        private LazySingleton1() {
            System.out.println("懒汉式单例初始化");
        }

        // 2. 静态变量持有实例
        private static LazySingleton1 instance;

        // 3. 全局访问点
        public static LazySingleton1 getInstance() {
            if (instance == null) instance = new LazySingleton1();
            return instance;
        }

        public void showMessage() {
            System.out.println("懒汉式单例方法调用");
        }
    }

    // 懒汉式2(静态内部类实现) - 推荐方式
    public static class LazySingleton2 {
        // 1. 私有构造方法
        private LazySingleton2() {
            System.out.println("懒汉式单例初始化");
        }

        // 2. 静态内部类持有实例---静态内部类在首次被访问时才会初始化，而不是在外围类加载时就初始化
        private static class SingletonHolder {
            private static final LazySingleton2 INSTANCE = new LazySingleton2();
        }

        // 3. 全局访问点
        public static LazySingleton2 getInstance() {
            return SingletonHolder.INSTANCE;
        }

        public void showMessage() {
            System.out.println("懒汉式单例方法调用");
        }
    }

    public static void main(String[] args) {
        // 测试饿汉式
        EagerSingleton eager1 = EagerSingleton.getInstance();
        EagerSingleton eager2 = EagerSingleton.getInstance();
        System.out.println("饿汉式单例是否相同: " + (eager1 == eager2)); // true
        eager1.showMessage();

        // 测试懒汉式1
        LazySingleton1 lazy1_1 = LazySingleton1.getInstance();
        LazySingleton1 lazy1_2 = LazySingleton1.getInstance();
        System.out.println("懒汉式单例是否相同: " + (lazy1_1 == lazy1_2)); // true
        lazy1_1.showMessage();

        // 测试懒汉式2
        LazySingleton2 lazy2_1 = LazySingleton2.getInstance();
        LazySingleton2 lazy2_2 = LazySingleton2.getInstance();
        System.out.println("懒汉式单例是否相同: " + (lazy2_1 == lazy2_2)); // true
        lazy2_1.showMessage();

        /*
        输出顺序：
        饿汉式单例初始化 (类加载时立即初始化)
        饿汉式单例是否相同: true
        饿汉式单例方法调用
        懒汉式单例初始化 (首次调用getInstance时初始化)
        懒汉式单例是否相同: true
        懒汉式单例方法调用
        */
    }
}