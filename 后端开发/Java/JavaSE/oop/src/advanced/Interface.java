package advanced;

/**
 * Java接口(interface)综合示例
 *
 * 一、接口核心概念
 * 1. 接口定义使用interface关键字，是一种完全抽象的"纯规范"，用于定义行为契约
 * 2. 接口与类的关系：
 *    - 类通过implements实现接口(可多实现)
 *    - 接口通过extends继承其他接口(支持多继承)
 * 3. 典型应用场景：
 *    - 定义跨继承体系的行为标准(如Comparable)
 *    - 实现松耦合的系统架构
 *    - 支持策略模式等设计模式实现
 *
 * 二、接口成员组成(Java 8+)
 * 1. 常量：默认public static final修饰
 *    - 示例：String TYPE = "Animal";
 * 2. 抽象方法：默认public abstract修饰
 *    - 实现类必须重写所有抽象方法
 * 3. 默认方法(default方法)：Java 8引入
 *    - 使用default修饰，提供默认实现
 *    - 实现类可选择重写
 *    - 作用：接口演化时保持向后兼容
 * 4. 静态方法：Java 8引入
 *    - 通过接口名直接调用
 *    - 示例：Animal.staticMethod();
 * 5. 私有方法：Java 9引入
 *    - 分为普通私有方法和静态私有方法
 *    - 作用：提取公共代码，减少重复
 *
 * 三、接口与抽象类对比
 *               接口                    抽象类
 * 变量    只能是常量              可以是普通变量
 * 构造方法  不能有                  可以有
 * 方法实现  Java 8前不能有         可以有具体方法
 * 继承      多继承接口              单继承类
 * 设计目的  定义行为规范            提供通用实现
 *
 * 四、最佳实践建议
 * 1. 优先使用接口定义类型
 * 2. 默认方法应保持简单，避免复杂逻辑
 * 3. 静态方法适合工具类功能
 * 4. 避免过度使用默认方法导致"接口膨胀"
 * 5. 接口命名通常使用形容词(如Runnable)或名词(如List)
 */
public class Interface {
    public static void main(String[] args) {
        // 多态演示
        FileParser csvParser = new CsvParser();
        csvParser.parse();      // 调用实现类方法
        csvParser.log();        // 调用接口默认方法
        FileParser.checkFormat(); // 调用接口静态方法

        // 多重实现演示
        SmartDevice phone = new SmartPhone();
        phone.boot();
        phone.connectNetwork();
    }
}

/**
 * 文件解析接口示例
 * 演示默认方法和静态方法
 */
interface FileParser {
    // 抽象方法
    void parse();

    // 默认方法
    default void log() {
        System.out.println("[LOG] Parsing started at " + getCurrentTime());
    }

    // 静态方法
    static void checkFormat() {
        System.out.println("Checking file format...");
    }

    // 私有方法(Java 9+)
    private String getCurrentTime() {
        return java.time.LocalTime.now().toString();
    }
}

/**
 * 智能设备接口体系
 * 演示接口继承和多实现
 */
interface SmartDevice extends Bootable, Connectable {
    // 组合多个接口功能
    default void showStatus() {
        System.out.println("Device status: OK");
    }
}

interface Bootable {
    void boot();
}

interface Connectable {
    void connectNetwork();
}

/**
 * CSV解析器实现类
 */
class CsvParser implements FileParser {
    @Override
    public void parse() {
        System.out.println("Parsing CSV file...");
    }

    // 可选择重写默认方法
    @Override
    public void log() {
        System.out.println("[CSV LOG] Custom logging");
    }
}

/**
 * 智能手机实现类
 * 演示多重接口实现
 */
class SmartPhone implements SmartDevice {
    @Override
    public void boot() {
        System.out.println("Android system booting...");
    }

    @Override
    public void connectNetwork() {
        System.out.println("Connecting to 5G network...");
    }
}