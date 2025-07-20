package operator;

public class Main {
    public static void main(String[] args) {
        System.out.println("===== Java 运算符详解与示例 =====");

        // 1. 算术运算符
        System.out.println("\n1. 算术运算符 (+ - * / % ++ --)");
        int a = 10, b = 3;
        System.out.println(a + " + " + b + " = " + (a + b));   // 加法
        System.out.println(a + " - " + b + " = " + (a - b));   // 减法
        System.out.println(a + " * " + b + " = " + (a * b));   // 乘法
        System.out.println(a + " / " + b + " = " + (a / b));   // 除法（整数除法）
        System.out.println(a + " % " + b + " = " + (a % b));   // 取模（求余）

        // 浮点数除法
        double c = 10.0, d = 3.0;
        System.out.println(c + " / " + d + " = " + (c / d));

        // 自增自减运算符
        int x = 5;
        System.out.println("\n自增自减运算符:");
        System.out.println("初始值 x = " + x);
        System.out.println("x++ = " + x++); // 后置自增：先使用值，再自增
        System.out.println("现在 x = " + x);
        System.out.println("++x = " + ++x); // 前置自增：先自增，再使用值
        System.out.println("现在 x = " + x);
        System.out.println("x-- = " + x--); // 后置自减
        System.out.println("现在 x = " + x);
        System.out.println("--x = " + --x); // 前置自减

        // 2. 关系运算符
        System.out.println("\n\n2. 关系运算符 (== != > < >= <=)");
        int num1 = 10, num2 = 20;
        System.out.println(num1 + " == " + num2 + " : " + (num1 == num2)); // 相等
        System.out.println(num1 + " != " + num2 + " : " + (num1 != num2)); // 不等
        System.out.println(num1 + " > " + num2 + "  : " + (num1 > num2));  // 大于
        System.out.println(num1 + " < " + num2 + "  : " + (num1 < num2));  // 小于
        System.out.println(num1 + " >= " + num2 + " : " + (num1 >= num2)); // 大于等于
        System.out.println(num1 + " <= " + num2 + " : " + (num1 <= num2)); // 小于等于

        // 3. 逻辑运算符
        System.out.println("\n\n3. 逻辑运算符 (&& || !)");
        boolean p = true, q = false;
        System.out.println(p + " && " + q + " = " + (p && q)); // 逻辑与
        System.out.println(p + " || " + q + " = " + (p || q)); // 逻辑或
        System.out.println("!" + p + " = " + (!p));            // 逻辑非

        // 短路行为演示
        System.out.println("\n短路行为演示:");
        int i = 5;
        // 第一个条件为false，第二个条件不会执行
        boolean result = (i > 10) && (++i < 20);
        System.out.println("&& 短路后 i = " + i); // i 仍为5

        // 第一个条件为true，第二个条件不会执行
        result = (i < 10) || (++i > 5);
        System.out.println("|| 短路后 i = " + i); // i 仍为5

        // 4. 位运算符
        System.out.println("\n\n4. 位运算符 (& | ^ ~ << >> >>>)");
        int m = 0b1100; // 12
        int n = 0b1010; // 10

        System.out.println("按位与 &  : " + Integer.toBinaryString(m) +
                " & " + Integer.toBinaryString(n) + " = " +
                Integer.toBinaryString(m & n));

        System.out.println("按位或 |  : " + Integer.toBinaryString(m) +
                " | " + Integer.toBinaryString(n) + " = " +
                Integer.toBinaryString(m | n));

        System.out.println("按位异或 ^ : " + Integer.toBinaryString(m) +
                " ^ " + Integer.toBinaryString(n) + " = " +
                Integer.toBinaryString(m ^ n));

        System.out.println("按位取反 ~ : ~" + Integer.toBinaryString(m) +
                " = " + Integer.toBinaryString(~m));

        System.out.println("左移 <<  : " + m + " << 2 = " + (m << 2) +
                " (二进制: " + Integer.toBinaryString(m << 2) + ")");

        System.out.println("右移 >>  : " + m + " >> 2 = " + (m >> 2) +
                " (二进制: " + Integer.toBinaryString(m >> 2) + ")");

        // 5. 赋值运算符
        System.out.println("\n\n5. 赋值运算符 (= += -= *= /= %= &= |= ^= <<= >>= >>>=)");
        int value = 10;
        System.out.println("初始值: " + value);

        value += 5; // 等价于 value = value + 5
        System.out.println("+= 5 后: " + value);

        value -= 3; // value = value - 3
        System.out.println("-= 3 后: " + value);

        value *= 2; // value = value * 2
        System.out.println("*= 2 后: " + value);

        value /= 3; // value = value / 3
        System.out.println("/= 3 后: " + value);

        value %= 5; // value = value % 5
        System.out.println("%= 5 后: " + value);

        // 位运算复合赋值
        int bits = 0b1010;
        bits &= 0b1100; // bits = bits & 0b1100
        System.out.println("&= 操作后: " + Integer.toBinaryString(bits));

        // 6. 三元运算符
        System.out.println("\n\n6. 三元运算符 (条件 ? 表达式1 : 表达式2)");
        int score = 85;
        String resultStr = (score >= 60) ? "及格" : "不及格";
        System.out.println("分数 " + score + " 的结果: " + resultStr);

        // 嵌套三元运算符
        String grade = (score >= 90) ? "优秀" :
                (score >= 80) ? "良好" :
                        (score >= 70) ? "中等" :
                                (score >= 60) ? "及格" : "不及格";
        System.out.println("等级评定: " + grade);

        // 7. instanceof 运算符
        System.out.println("\n\n7. instanceof 运算符");
        String text = "Hello";
        Integer number = 42;

        System.out.println("text 是 String 类型? " + (text instanceof String)); // true
        System.out.println("number 是 Integer 类型? " + (number instanceof Integer)); // true
        System.out.println("number 是 Number 类型? " + (number instanceof Number)); // true

        // null 检查
        String nullStr = null;
        System.out.println("nullStr 是 String 类型? " + (nullStr instanceof String)); // false

        // 8. 运算符优先级
        System.out.println("\n\n8. 运算符优先级");
        int calc = 5 + 3 * 2 - 4 / 2; // 等价于 5 + (3*2) - (4/2)
        System.out.println("5 + 3 * 2 - 4 / 2 = " + calc); // 5 + 6 - 2 = 9

        boolean logic = true || false && false; // 等价于 true || (false && false)
        System.out.println("true || false && false = " + logic); // true

        // 使用括号改变优先级
        int calc2 = (5 + 3) * (2 - 4) / 2;
        System.out.println("(5 + 3) * (2 - 4) / 2 = " + calc2); // 8 * (-2) / 2 = -8

        // 9. 特殊运算符
        System.out.println("\n\n9. 特殊运算符");

        // 字符串连接运算符 +
        String firstName = "张";
        String lastName = "三";
        String fullName = firstName + lastName;
        System.out.println("姓名: " + fullName);

        // 混合类型连接
        String info = "年龄: " + 25 + " 岁";
        System.out.println(info);

        // 逗号运算符（在for循环中）
        System.out.println("\n逗号运算符在for循环中的使用:");
        for (int j = 0, k = 10; j < k; j++, k--) {
            System.out.println("j = " + j + ", k = " + k);
        }

        // 10. 运算符陷阱与注意事项
        System.out.println("\n\n10. 运算符陷阱与注意事项");

        // 整数除法陷阱
        double division = 5 / 2; // 整数除法，结果为2.0
        System.out.println("5 / 2 = " + division);
        double correctDivision = 5.0 / 2; // 正确写法
        System.out.println("5.0 / 2 = " + correctDivision);

        // 浮点数精度问题
        double d1 = 0.1;
        double d2 = 0.2;
        System.out.println("0.1 + 0.2 = " + (d1 + d2)); // 0.30000000000000004

        // 使用BigDecimal解决精度问题
        System.out.println("使用BigDecimal: 0.1 + 0.2 = " +
                (new java.math.BigDecimal("0.1").add(new java.math.BigDecimal("0.2"))));

        // 自增运算符在表达式中的行为
        int count = 0;
        int total = count++ + ++count; // 0 + (count先自增到1，再自增到2)
        System.out.println("\n自增陷阱: count++ + ++count = " + total);
        System.out.println("现在 count = " + count);

        // 运算符优先级陷阱
        boolean precedence = 5 > 3 == true; // 等价于 (5>3) == true
        System.out.println("5 > 3 == true: " + precedence);

        // 位运算优先级陷阱
        int bitTrap = 5 & 3 + 2; // 等价于 5 & (3+2) = 5 & 5 = 5
        System.out.println("5 & 3 + 2 = " + bitTrap);
        int correctBit = (5 & 3) + 2; // (1) + 2 = 3
        System.out.println("(5 & 3) + 2 = " + correctBit);
    }
}