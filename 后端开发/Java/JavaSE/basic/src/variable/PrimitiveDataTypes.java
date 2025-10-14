package variable;

import java.math.BigDecimal;

public class PrimitiveDataTypes {
    public static void main(String[] args) {
        demonstrateIntegerTypes(); // 整型数据类型演示
        demonstrateFloatingPointTypes(); // 浮点型数据类型演示
        demonstrateCharType(); // 字符型数据类型演示
        demonstrateBooleanType(); // 布尔型数据类型演示
        demonstrateTypeConversion(); // 类型转换演示
    }

    // 整型数据类型演示
    private static void demonstrateIntegerTypes() {
        System.out.println("===== 整型数据类型范围 =====");
        byte byteVar = 100;
        short shortVar = 30000;
        int intVar = 2147483647;
        long longVar = 9223372036854775807L;

        System.out.println("byte 有符号范围: " + Byte.MIN_VALUE + " ~ " + Byte.MAX_VALUE);
        System.out.println("short 有符号范围: " + Short.MIN_VALUE + " ~ " + Short.MAX_VALUE);
        System.out.println("int 有符号范围: " + Integer.MIN_VALUE + " ~ " + Integer.MAX_VALUE);
        System.out.println("long 有符号范围: " + Long.MIN_VALUE + " ~ " + Long.MAX_VALUE);
    }

    // 浮点型数据类型演示
    private static void demonstrateFloatingPointTypes() {
        System.out.println("\n===== 浮点数精度问题示例 =====");
        float floatVar = 3.14f;
        double doubleVar = 3.1415926535;

        double d1 = 0.1;
        double d2 = 0.2;
        double sum = d1 + d2;
        System.out.printf("0.1 + 0.2 = %.20f%n", sum);
        System.out.println("预期结果: 0.3");

        // 浮点数比较陷阱
        boolean equal = (sum == 0.3);
        System.out.println("0.1 + 0.2 == 0.3 的比较结果: " + equal);

        // 使用BigDecimal解决精度问题
        System.out.println("\n===== 使用 BigDecimal 解决精度问题 =====");
        BigDecimal bdSum = new BigDecimal("0.1").add(new BigDecimal("0.2"));
        System.out.println("使用 BigDecimal 计算 0.1 + 0.2 = " + bdSum);

        // 浮点数特殊值
        System.out.println("\n===== 浮点数特殊值 =====");
        System.out.println("正无穷大: " + (1.0 / 0.0));
        System.out.println("负无穷大: " + (-1.0 / 0.0));
        System.out.println("非数字(NaN): " + (0.0 / 0.0));
    }

    // 字符型数据类型演示
    private static void demonstrateCharType() {
        System.out.println("\n===== 字符型(char)的三种表现形式 =====");
        char charVar1 = 'A';
        char charVar2 = '\u0041';
        char charVar3 = 65;

        System.out.println("单引号表示: " + charVar1);
        System.out.println("Unicode转义: " + charVar2);
        System.out.println("数值表示: " + charVar3);

        // 常见错误示例
        System.out.println("\n===== char 变量编译错误分析 =====");
        System.out.println("错误示例: char error1 = 'AB'; // 编译错误: 字符字面量只能包含一个字符");
        System.out.println("解决方案: char correct1 = 'A';");
    }

    // 布尔型数据类型演示
    private static void demonstrateBooleanType() {
        System.out.println("\n===== 布尔型示例 =====");
        boolean boolVar = true;
        System.out.println("boolean 示例: " + boolVar);
    }

    // 类型转换演示
    private static void demonstrateTypeConversion() {
        System.out.println("\n===== 自动类型提升 =====");
        byte b = 10;
        int i = b; // 自动类型提升
        System.out.println("byte -> int: " + i);

        System.out.println("\n===== 强制类型转换 =====");
        double d = 3.14;
        int i2 = (int)d; // 强制类型转换
        System.out.println("double -> int: " + i2);
    }
}