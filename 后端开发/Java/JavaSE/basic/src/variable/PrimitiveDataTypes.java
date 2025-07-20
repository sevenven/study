package variable;

import java.math.BigDecimal;

public class PrimitiveDataTypes {
    public static void main(String[] args) {

        // =============================
        // 1. 整型（整数类型）
        // =============================
        byte byteVar = 100;          // 8位有符号整数，范围：-128 ~ 127
        short shortVar = 30000;      // 16位有符号整数，范围：-32,768 ~ 32,767
        int intVar = 2147483647;     // 32位有符号整数，范围：-2³¹ ~ 2³¹-1
        long longVar = 9223372036854775807L; // 64位有符号整数，需加'L'

        // 输出整型范围
        System.out.println("===== 整型数据类型范围 =====");
        System.out.println("byte 有符号范围: " + Byte.MIN_VALUE + " ~ " + Byte.MAX_VALUE);
        System.out.println("short 有符号范围: " + Short.MIN_VALUE + " ~ " + Short.MAX_VALUE);
        System.out.println("int 有符号范围: " + Integer.MIN_VALUE + " ~ " + Integer.MAX_VALUE);
        System.out.println("long 有符号范围: " + Long.MIN_VALUE + " ~ " + Long.MAX_VALUE);

        // =============================
        // 2. 浮点型（小数类型）
        // =============================
        float floatVar = 3.14f;      // 32位单精度浮点数，后缀加'f'或'F'
        double doubleVar = 3.1415926535; // 64位双精度浮点数

        // 浮点数精度问题说明：
        // Java 使用 IEEE 754 标准表示浮点数，某些十进制小数无法在二进制中精确表示
        // 导致计算时出现误差（如 0.1 + 0.2 ≠ 0.3）

        System.out.println("\n===== 浮点数精度问题示例 =====");
        double d1 = 0.1;
        double d2 = 0.2;
        double sum = d1 + d2;
        System.out.printf("0.1 + 0.2 = %.20f%n", sum); // 输出：0.30000000000000004441
        System.out.println("预期结果: 0.3");

        // 浮点数比较陷阱
        boolean equal = (sum == 0.3);
        System.out.println("0.1 + 0.2 == 0.3 的比较结果: " + equal); // false

        // 多次累加误差
        double total = 0.0;
        for (int i = 0; i < 10; i++) total += 0.1;
        System.out.printf("10个0.1累加结果: %.20f%n", total); // 不是1.0

        // =============================
        // 解决方案 1：使用 BigDecimal 进行精确计算
        // =============================
        System.out.println("\n===== 使用 BigDecimal 解决精度问题 =====");
        BigDecimal bd1 = new BigDecimal("0.1");
        BigDecimal bd2 = new BigDecimal("0.2");
        BigDecimal bdSum = bd1.add(bd2);
        System.out.println("使用 BigDecimal 计算 0.1 + 0.2 = " + bdSum); // 输出 0.3
        System.out.println("使用 BigDecimal 比较结果: " + bdSum.equals(new BigDecimal("0.3"))); // true

        // =============================
        // 解决方案 2：设置精度阈值进行比较
        // =============================
        System.out.println("\n===== 设置精度阈值进行比较 =====");
        double epsilon = 1e-10; // 设置一个极小的误差范围
        boolean approximatelyEqual = Math.abs(sum - 0.3) < epsilon;
        System.out.println("使用精度阈值比较 0.1 + 0.2 == 0.3: " + approximatelyEqual); // true

        // =============================
        // 浮点数特殊值
        // =============================
        System.out.println("\n===== 浮点数特殊值 =====");
        double positiveInfinity = 1.0 / 0.0;
        double negativeInfinity = -1.0 / 0.0;
        double notANumber = 0.0 / 0.0;
        System.out.println("正无穷大: " + positiveInfinity);
        System.out.println("负无穷大: " + negativeInfinity);
        System.out.println("非数字(NaN): " + notANumber);

        // NaN 比较陷阱
        System.out.println("NaN与自身比较: " + (notANumber == notANumber)); // false
        System.out.println("使用 Double.isNaN() 检测 NaN: " + Double.isNaN(notANumber)); // true

        // =============================
        // 3. 字符型
        // =============================
        System.out.println("\n===== 字符型(char)的三种表现形式 =====");
        // 表现形式1: 单引号表示的字符字面量（内部有且仅有一个字符）
        char charVar1 = 'A'; // 基本形式
        char charVar2 = '中'; // 支持中文字符
        // 表现形式2: Unicode转义序列
        char charVar3 = '\u0041'; // 表示'A' (U+0041)
        char charVar4 = '\u4e2d'; // 表示'中' (U+4E2D)
        // 表现形式3: 整数数值（0~65535）
        char charVar5 = 65;    // ASCII值，对应'A'
        char charVar6 = 20013; // Unicode值，对应'中'
        // 表现形式4: 特殊字符转义
        char newLine = '\n';    // 换行符
        char tab = '\t';        // 制表符
        char backslash = '\\';  // 反斜杠
        char singleQuote = '\''; // 单引号
        char nullChar = '\0';   // 空字符
        // 输出字符变量
        System.out.println("单引号表示: " + charVar1 + ", " + charVar2);
        System.out.println("Unicode转义: " + charVar3 + ", " + charVar4);
        System.out.println("数值表示: " + charVar5 + ", " + charVar6);
        // 输出特殊字符
        System.out.println("特殊字符: 换行[" + newLine + "], 制表[" + tab + "], 反斜杠[" + backslash + "], 单引号[" + singleQuote + "], 空字符[" + nullChar + "]");
        // 字符与整数的转换
        System.out.println("\n字符与整数的转换:");
        System.out.println("字符'A'的ASCII值: " + (int)charVar1);
        System.out.println("字符'中'的Unicode值: " + (int)charVar2);
        System.out.println("Unicode值65对应的字符: " + (char)65);
        System.out.println("Unicode值20013对应的字符: " + (char)20013);
        // 字符运算
        System.out.println("\n字符运算:");
        char letterA = 'A';
        char letterB = (char)(letterA + 1); // 字符可以参与算术运算
        System.out.println("'A' + 1 = " + letterB);
        // =============================
        // char变量编译错误示例分析
        // =============================
        System.out.println("\n===== char 变量编译错误分析 =====");
        // 错误示例1: 单引号内多个字符
        // char error1 = 'AB'; // 编译错误: 字符字面量只能包含一个字符
        System.out.println("错误1: char error1 = 'AB';");
        System.out.println("原因: 单引号内只能包含一个字符，不能包含多个字符");
        // 错误示例2: 超出范围的整数值
        // char error2 = 70000; // 编译错误: 不兼容的类型: 从int转换到char可能会有损失
        System.out.println("\n错误2: char error2 = 70000;");
        System.out.println("原因: char 范围是0-65535，70000超出范围");
        System.out.println("解决方案: char error2 = (char)70000; // 强制转换");
        // 错误示例3: 无效的Unicode转义
        // char error3 = '\u04e2'; // 编译错误: 非法的 Unicode 转义
        System.out.println("\n错误3: char error3 = '\\u4e2';");
        System.out.println("原因: Unicode转义必须是4位十六进制数字");
        System.out.println("解决方案: char error3 = '\\u04e2'; // 补足4位");
        // 错误示例4: 赋值给不兼容类型
        // int error4 = 'A'; // 这是合法的，但反过来:
        // char error5 = 65; // 这是合法的，但:
        // char error6 = intVar; // 编译错误: 不兼容的类型: 从int转换到char可能会有损失
        System.out.println("\n错误4: char error6 = intVar;");
        System.out.println("原因: 不能直接将int变量赋给char，即使值在范围内");
        System.out.println("解决方案: char error6 = (char)intVar; // 需要显式强制转换");
        // 错误示例5: 使用双引号
        // char error7 = "A"; // 编译错误: 不兼容的类型: String无法转换为char
        System.out.println("\n错误5: char error7 = \"A\";");
        System.out.println("原因: 双引号表示字符串(String)，不是字符(char)");
        System.out.println("解决方案: char error7 = 'A'; // 使用单引号");
        // 错误示例6: 空字符字面量
        // char error8 = ''; // 编译错误: 字符字面量不能为空
        System.out.println("\n错误6: char error8 = '';");
        System.out.println("原因: 字符字面量必须包含一个字符");
        System.out.println("解决方案: char error8 = ' '; // 空格或 char error8 = '\\0'; // 空字符");
        // 错误示例7: 特殊字符错误使用
        // char error9 = '\'; // 编译错误: 未结束的字符字面量
        System.out.println("\n错误7: char error9 = '\\';");
        System.out.println("原因: 反斜杠是转义字符，必须配合使用如 '\\\\'");
        System.out.println("解决方案: char error9 = '\\\\'; // 表示一个反斜杠字符");
        // =============================
        // 正确示例展示
        // =============================
        System.out.println("\n===== char 正确使用示例 =====");
        // 正确示例1: 使用单字符
        char correct1 = 'X';
        System.out.println("正确1: 'X' -> " + correct1);
        // 正确示例2: 强制转换超出范围的值
        char correct2 = (char)70000; // 强制转换
        System.out.println("正确2: (char)70000 -> " + correct2 + " (Unicode: " + (int)correct2 + ")");
        // 正确示例3: 补足4位Unicode
        char correct3 = '\u04e2';
        System.out.println("正确3: '\\u04e2' -> " + correct3);
        // 正确示例4: 显式强制转换
        int temp = 65;
        char correct4 = (char)temp;
        System.out.println("正确4: (char)65 -> " + correct4);
        // 正确示例5: 使用单引号
        char correct5 = '?';
        System.out.println("正确5: '?' -> " + correct5);
        // 正确示例6: 使用空字符
        char correct6 = '\0';
        System.out.println("正确6: '\\0' -> [" + correct6 + "] (空字符)");
        // 正确示例7: 正确转义
        char correct7 = '\\';
        System.out.println("正确7: '\\\\' -> " + correct7);

        // =============================
        // 4. 布尔型
        // =============================
        boolean boolVar = true; // 只有两个值：true 或 false

        // =============================
        // 输出各基本类型变量
        // =============================
        System.out.println("\n===== 基本数据类型变量示例 =====");
        System.out.println("byte 示例: " + byteVar);
        System.out.println("short 示例: " + shortVar);
        System.out.println("int 示例: " + intVar);
        System.out.println("long 示例: " + longVar);
        System.out.println("float 示例: " + floatVar);
        System.out.println("double 示例: " + doubleVar);
        System.out.println("boolean 示例: " + boolVar);

        // =============================
        // 自动类型提升（隐式转换）
        // =============================

        // 规则1 byte → short → int → long → float → double
        byte b = 10;
        short s = b; // byte 转换为 short
        int i = s;   // short 转换为 int
        long l = i;  // int 转换为 long
        float f = l; // long 转换为 float
        double d = f; // float 转换为 double

        System.out.println("===== 自动类型提升 =====");
        System.out.println("byte: " + b);
        System.out.println("short: " + s);
        System.out.println("int: " + i);
        System.out.println("long: " + l);
        System.out.println("float: " + f);
        System.out.println("double: " + d);

        // 在运算中的自动类型提升
        int intValue = 10;
        double doubleValue = 5.5;
        double result = intValue + doubleValue; // int 被自动提升为 double
        System.out.println("int + double = " + result); // 输出 15.5

        // 规则2 char → int
        char c = 'A';
        int asciiValue = c; // char 转换为 int
        System.out.println("char: " + c);
        System.out.println("ascii value of char: " + asciiValue);

        // =============================
        // 强制类型转换（显式转换）
        // =============================

        // double 到 int 的转换
        double doubleValueToConvert = 3.14;
        int i1 = (int)doubleValueToConvert; // 显式转换，小数部分被截断
        System.out.println("double: " + doubleValueToConvert);
        System.out.println("converted to int: " + i1);

        // long 到 short 的转换
        long l1 = 1234567890L;
        short s1 = (short)l1; // 显式转换，可能导致溢出
        System.out.println("long: " + l1);
        System.out.println("converted to short: " + s1);

        // int 到 char 的转换
        int intValue1 = 65;
        char c1 = (char)intValue1; // 显式转换
        System.out.println("int: " + intValue1);
        System.out.println("converted to char: " + c1);

        // float 到 byte 的转换
        float f1 = 123.45f;
        byte b1 = (byte)f1; // 显式转换，小数部分被截断
        System.out.println("float: " + f1);
        System.out.println("converted to byte: " + b1);

        // 在运算中的强制类型转换
        int m = 10;
        int n = 3;
        double quotient = (double)m / n; // 强制转换其中一个操作数为 double
        System.out.println("m / n = " + quotient); // 输出 3.3333333333333335
    }

    // 封装一个浮点数比较方法（推荐复用）
    public static boolean approximatelyEqual(double a, double b, double epsilon) {
        return Math.abs(a - b) < epsilon;
    }
}