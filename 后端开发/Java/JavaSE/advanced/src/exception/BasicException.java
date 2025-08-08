package exception;

/**
 * Java异常处理基础示例类
 *
 * 异常处理核心知识：
 * 1. 异常分类：
 *    - Error: 严重错误，程序无法处理(如OutOfMemoryError)
 *    - Exception: 可处理的异常
 *      - RuntimeException: 运行时异常(未检查异常)
 *      - 其他Exception: 检查异常(必须处理)
 *
 * 2. 异常处理关键字：
 *    - try: 尝试执行可能抛出异常的代码
 *    - catch: 捕获并处理特定类型异常
 *    - finally: 无论是否异常都会执行的代码块
 *    - throw: 主动抛出异常
 *    - throws: 声明方法可能抛出的异常
 *
 * 3. 异常处理原则：
 *    - 具体异常优先捕获
 *    - 不要捕获Exception基类
 *    - 不要吞掉异常(空的catch块)
 *    - 合理使用finally释放资源
 */
public class BasicException {

    public static void main(String[] args) {
        // 示例1: 捕获算术异常
        try {
            int result = divide(10, 0);
            System.out.println("结果: " + result);
        } catch (ArithmeticException e) {
            System.out.println("捕获到算术异常: " + e.getMessage());
        } finally {
            System.out.println("计算完成");
        }

        // 示例2: 捕获数组越界异常
        try {
            int[] arr = {1, 2, 3};
            System.out.println(arr[3]);
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("数组越界: " + e.getMessage());
        }

        // 示例3: 多重catch块
        try {
            processInput("abc");
        } catch (NumberFormatException e) {
            System.out.println("数字格式错误: " + e.getMessage());
        } catch (IllegalArgumentException e) {
            System.out.println("参数错误: " + e.getMessage());
        }
    }


    // 除法运算方法
    public static int divide(int a, int b) throws ArithmeticException {
        if (b == 0) throw new ArithmeticException("除数不能为零");
        return a / b;
    }

    // 处理输入方法
    public static void processInput(String input) {
        if (input == null || input.isEmpty()) throw new IllegalArgumentException("输入不能为空");
        int num = Integer.parseInt(input); // 可能抛出NumberFormatException
        System.out.println("输入数字: " + num);
    }
}