package passByValue;

/**
 * 这个类演示了Java中的值传递机制
 *
 * Java中的参数传递总是按值传递(pass by value)，基本数据类型和引用类型的传递方式有所不同：
 *
 * 1. 基本数据类型(byte, short, int, long, float, double, char, boolean):
 *    - 传递的是实际值的副本
 *    - 方法内对参数的修改不会影响原始值
 *
 * 2. 引用数据类型(对象、数组等):
 *    - 传递的是对象引用的副本(即内存地址的拷贝)
 *    - 方法内可以修改对象的状态(因为引用指向同一个对象)
 *    - 但无法改变原始引用指向的对象(即不能使原始引用指向新对象)
 *
 * 常见误区：
 * - Java中没有按引用传递(pass by reference)
 * - 不能通过方法调用交换两个基本数据类型的值
 * - 对于引用类型，可以修改对象内容但不能改变原始引用
 */
public class Main {

    public static void main(String[] args) {
        // 基本数据类型示例
        int num = 10;
        System.out.println("调用前 - 基本类型值: " + num);  // 输出: 10
        modifyPrimitive(num);
        System.out.println("调用后 - 基本类型值: " + num);  // 输出: 10 (未改变)

        // 引用数据类型示例
        Person person = new Person("张三");
        System.out.println("调用前 - 对象姓名: " + person.getName());  // 输出: 张三
        modifyReference(person);
        System.out.println("调用后 - 对象姓名: " + person.getName());  // 输出: 李四 (对象内容被修改)

        // 尝试改变引用本身的示例
        System.out.println("尝试改变引用本身:");
        System.out.println("调用前 - 对象姓名: " + person.getName());  // 输出: 李四
        tryToChangeReference(person);
        System.out.println("调用后 - 对象姓名: " + person.getName());  // 输出: 李四 (引用未改变)
    }

    /**
     * 修改基本数据类型参数
     * @param value 基本类型参数(传递的是值的副本)
     */
    public static void modifyPrimitive(int value) {
        value = 20;  // 只修改了副本
        System.out.println("方法内 - 基本类型值: " + value);  // 输出: 20
    }

    /**
     * 修改引用数据类型参数
     * @param p 引用类型参数(传递的是引用的副本)
     */
    public static void modifyReference(Person p) {
        p.setName("李四");  // 通过引用副本修改对象内容
        System.out.println("方法内 - 对象姓名: " + p.getName());  // 输出: 李四
    }

    /**
     * 尝试改变引用本身(不会成功)
     * @param p 引用类型参数
     */
    public static void tryToChangeReference(Person p) {
        p = new Person("王五");  // 只改变了局部引用的指向
        System.out.println("方法内 - 新对象姓名: " + p.getName());  // 输出: 王五
    }
}

/**
 * 简单的Person类用于演示
 */
class Person {
    private String name;

    public Person(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}