package commonlyUsedClasses._lang;

import java.util.Objects;

/**
 * Object类是所有Java类的根类，每个类都直接或间接继承自Object类。
 *
 * 重点方法说明：
 *
 * 1. equals(Object obj) - 对象相等性比较
 *    - 默认实现为"=="比较对象引用
 *    - 重写时需要满足：
 *      a) 自反性：x.equals(x)返回true
 *      b) 对称性：x.equals(y)与y.equals(x)结果一致
 *      c) 传递性：x.equals(y)且y.equals(z)则x.equals(z)
 *      d) 一致性：多次调用结果相同
 *      e) 非空性：x.equals(null)返回false
 *    - 重写equals()必须同时重写hashCode()
 *
 * 2. toString() - 对象字符串表示
 *    - 默认返回"类名@哈希码"
 *    - 建议重写为包含对象有意义信息的字符串
 *    - IDE可自动生成标准格式的toString()
 *
 * 3. clone() - 对象克隆
 *    - 必须实现Cloneable接口(标记接口)
 *    - 默认实现是浅拷贝
 *    - 深拷贝需要递归克隆引用类型字段
 *    - 替代方案：拷贝构造器或工厂方法
 *
 * 4. finalize() - 对象回收前清理(Java 9已废弃)
 *    - 不推荐使用，原因：
 *      a) 调用时机不确定
 *      b) 性能开销大
 *      c) 可能导致资源泄漏
 *    - 替代方案：try-with-resources或Cleaner
 */
public class _Object {

    public static void main(String[] args) throws CloneNotSupportedException {
        // equals()和toString()演示
        Employee e1 = new Employee("E001", "张三");
        Employee e2 = new Employee("E001", "张三");
        Employee e3 = new Employee("E002", "李四");

        System.out.println(e1.toString());  // 输出: Employee[id=E001, name=张三]
        System.out.println(e1.equals(e2)); // true
        System.out.println(e1.equals(e3)); // false

        // clone()演示
        Employee e4 = e1.clone();
        System.out.println(e4);       // 输出: Employee[id=E001, name=张三]
        System.out.println(e1 == e4); // false

        // finalize()演示(仅示例，实际不推荐使用)
        new Resource().use();
        System.gc(); // 提醒JVM进行垃圾回收
    }
}

/**
 * 员工类演示equals/toString/clone的标准实现
 */
class Employee implements Cloneable {
    private final String id;  // 员工ID作为唯一标识
    private String name;

    public Employee(String id, String name) {
        this.id = Objects.requireNonNull(id);
        this.name = Objects.requireNonNull(name);
    }

    /**
     * 基于员工ID的相等性判断
     */
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Employee employee = (Employee) o;
        return id.equals(employee.id);
    }

    @Override
    public int hashCode() {
        return id.hashCode();
    }

    /**
     * 返回包含员工信息的字符串
     */
    @Override
    public String toString() {
        return "Employee[id=" + id + ", name=" + name + "]";
    }

    /**
     * 浅拷贝实现
     */
    @Override
    public Employee clone() throws CloneNotSupportedException {
        return (Employee) super.clone();
    }
}

/**
 * @deprecated 演示finalize的不推荐用法
 */
@Deprecated(since = "9")
class Resource {
    private byte[] data = new byte[1024 * 1024]; // 1MB模拟资源

    void use() {
        System.out.println("使用资源...");
    }

    /**
     * @deprecated finalize()方法已废弃
     */
    @Override
    @Deprecated
    protected void finalize() throws Throwable {
        try {
            System.out.println("清理资源...");
            data = null;
        } finally {
            super.finalize();
        }
    }
}