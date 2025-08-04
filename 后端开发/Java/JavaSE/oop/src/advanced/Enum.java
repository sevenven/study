package advanced;

/**
 * Java枚举(Enum)示例类
 *
 * 枚举是Java 5引入的一种特殊数据类型，用于定义一组固定的常量。以下是枚举的核心知识说明：
 *
 * 1. 基本特性
 *    - 枚举是class的特殊形式，隐式继承java.lang.Enum
 *    - 枚举常量是public static final的，在类加载时初始化
 *    - 枚举构造器只能是private(可省略)
 *
 * 2. 优势
 *    - 类型安全：比整数或字符串常量更安全
 *    - 可读性强：常量名称自描述
 *    - 扩展性好：可以添加属性和方法
 *    - 单例实现：每个枚举常量都是单例实例
 *
 * 3. 常用方法
 *    - values()：返回所有枚举常量的数组
 *    - valueOf(String)：根据名称返回枚举常量
 *    - name()/toString()：返回枚举常量名称
 *    - ordinal()：返回枚举常量的序数(位置)
 *
 * 4. 高级用法
 *    - 实现接口：枚举可以实现一个或多个接口
 *    - 策略枚举：通过抽象方法让每个枚举常量实现不同行为
 *    - 枚举集合：EnumSet和EnumMap是高效的特殊集合
 *
 * 5. 使用场景
 *    - 替代常量类(如状态码、错误码)
 *    - 有限集合的类型定义(如星期、月份)
 *    - 单例模式实现
 *    - 状态机实现
 *
 * 6. 注意事项
 *    - 枚举不能继承其他类(已隐式继承Enum)
 *    - 枚举常量必须在第一行声明
 *    - 比较枚举使用==(因为都是单例)而不是equals()
 */
public class Enum {

    /**
     * 基础枚举示例 - 表示星期
     */
    public enum Day {
        MONDAY,    // 枚举常量通常全部大写
        TUESDAY,
        WEDNESDAY,
        THURSDAY,
        FRIDAY,
        SATURDAY,
        SUNDAY
    }

    /**
     * 带属性的枚举 - 表示HTTP状态码
     */
    public enum HttpStatus {
        OK(200, "成功"),
        NOT_FOUND(404, "未找到"),
        SERVER_ERROR(500, "服务器内部错误");

        private final int code;        // 状态码
        private final String desc;     // 描述

        // 枚举构造函数(默认为private)
        HttpStatus(int code, String desc) {
            this.code = code;
            this.desc = desc;
        }

        public int getCode() {
            return code;
        }

        public String getDesc() {
            return desc;
        }
    }

    /**
     * 带方法的枚举 - 表示计算器操作
     */
    public enum Operation {
        PLUS {
            public double apply(double x, double y) { return x + y; }
        },
        MINUS {
            public double apply(double x, double y) { return x - y; }
        },
        TIMES {
            public double apply(double x, double y) { return x * y; }
        },
        DIVIDE {
            public double apply(double x, double y) { return x / y; }
        };

        // 抽象方法，每个枚举常量必须实现
        public abstract double apply(double x, double y);
    }

    public static void main(String[] args) {
        // 1. 基础枚举使用
        Day today = Day.FRIDAY;
        System.out.println("Today is: " + today);  // 输出: Today is: FRIDAY

        // 2. 带属性枚举使用
        HttpStatus status = HttpStatus.NOT_FOUND;
        System.out.println(status.getCode() + ": " + status.getDesc()); // 输出: 404: 未找到

        // 3. 带方法枚举使用
        double result = Operation.PLUS.apply(3, 4);
        System.out.println("3 + 4 = " + result);  // 输出: 3 + 4 = 7.0

        // 4. 枚举常用方法
        System.out.println("所有星期:");
        for (Day day : Day.values()) {  // values()返回所有枚举常量
            System.out.println(day);
        }

        // 5. 根据字符串获取枚举实例
        Day parsedDay = Day.valueOf("MONDAY");  // valueOf()方法
        System.out.println("Parsed day: " + parsedDay);
    }
}