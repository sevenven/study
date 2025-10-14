package binary;

public class Main {
    public static void main(String[] args) {
        System.out.println("===== Java 进制系统详解与示例 =====");
        demonstrateNumberRepresentations();  // 不同进制表示法
        demonstrateBaseConversion();        // 进制转换方法
        demonstrateBitwiseOperations();     // 位运算操作
        demonstrateShiftOperations();       // 移位运算
        demonstrateBitwiseTricks();         // 位运算实用技巧
        demonstrateNumberEncoding();        // 原码、反码和补码
        demonstrateBitmaskApplications();   // 位掩码应用
    }

    // 不同进制表示法
    private static void demonstrateNumberRepresentations() {
        System.out.println("\n1. 不同进制表示法");
        System.out.println("==================================");

        int decimal = 42;       // 十进制 (默认)
        int binary = 0b101010;   // 二进制 (0b 或 0B 开头)
        int octal = 052;         // 八进制 (0 开头)
        int hex = 0x2A;          // 十六进制 (0x 或 0X 开头)

        System.out.println("十进制 42: " + decimal);
        System.out.println("二进制 0b101010: " + binary);
        System.out.println("八进制 052: " + octal);
        System.out.println("十六进制 0x2A: " + hex);

        System.out.println("\n所有表示法都等于 42: " +
          (decimal == binary && binary == octal && octal == hex));
    }

    // 进制转换方法
    private static void demonstrateBaseConversion() {
        System.out.println("\n2. 进制转换方法");
        System.out.println("==================================");

        int num = 255;

        // 十进制转其他进制
        String binStr = Integer.toBinaryString(num);
        String octStr = Integer.toOctalString(num);
        String hexStr = Integer.toHexString(num);

        System.out.println(num + " 的二进制: " + binStr);
        System.out.println(num + " 的八进制: " + octStr);
        System.out.println(num + " 的十六进制: " + hexStr);

        // 其他进制转十进制
        int fromBin = Integer.parseInt("11111111", 2);
        int fromOct = Integer.parseInt("377", 8);
        int fromHex = Integer.parseInt("FF", 16);

        System.out.println("\n二进制 11111111 转十进制: " + fromBin);
        System.out.println("八进制 377 转十进制: " + fromOct);
        System.out.println("十六进制 FF 转十进制: " + fromHex);

        // 任意进制转换
        String binaryToHex = Integer.toHexString(
          Integer.parseInt("10101010", 2)
        ).toUpperCase();
        System.out.println("\n二进制 10101010 转十六进制: 0x" + binaryToHex);
    }

    // 位运算操作
    private static void demonstrateBitwiseOperations() {
        System.out.println("\n3. 位运算操作");
        System.out.println("==================================");

        int a = 0b1100; // 12
        int b = 0b1010; // 10

        // 按位与 (AND)
        int andResult = a & b;
        System.out.println("按位与: " + Integer.toBinaryString(a) + " & " +
          Integer.toBinaryString(b) + " = " +
          String.format("%4s", Integer.toBinaryString(andResult)).replace(' ', '0'));

        // 按位或 (OR)
        int orResult = a | b;
        System.out.println("按位或: " + Integer.toBinaryString(a) + " | " +
          Integer.toBinaryString(b) + " = " +
          Integer.toBinaryString(orResult));

        // 按位异或 (XOR)
        int xorResult = a ^ b;
        System.out.println("按位异或: " + Integer.toBinaryString(a) + " ^ " +
          Integer.toBinaryString(b) + " = " +
          String.format("%4s", Integer.toBinaryString(xorResult)).replace(' ', '0'));

        // 按位取反 (NOT)
        int notResult = ~a;
        System.out.println("按位取反: ~" + Integer.toBinaryString(a) + " = " +
          Integer.toBinaryString(notResult) + " (32位表示)");
    }

    // 移位运算
    private static void demonstrateShiftOperations() {
        System.out.println("\n4. 移位运算");
        System.out.println("==================================");

        int value = 0b11001100; // 204

        // 左移
        int leftShift = value << 2;
        System.out.println("左移两位: " + value + " << 2 = " + leftShift +
          " (二进制: " + Integer.toBinaryString(leftShift) + ")");

        // 右移
        int rightShift = value >> 2;
        System.out.println("右移两位: " + value + " >> 2 = " + rightShift +
          " (二进制: " + String.format("%8s", Integer.toBinaryString(rightShift)).replace(' ', '0') + ")");

        // 无符号右移
        int unsignedRightShift = value >>> 2;
        System.out.println("无符号右移: " + value + " >>> 2 = " + unsignedRightShift);

        // 负数右移示例
        int negative = -8;
        int negRightShift = negative >> 2;
        int negUnsignedShift = negative >>> 2;

        System.out.println("\n负数右移示例 (-8):");
        System.out.println("有符号右移 (-8 >> 2): " + negRightShift +
          " (二进制: " + Integer.toBinaryString(negRightShift) + ")");
        System.out.println("无符号右移 (-8 >>> 2): " + negUnsignedShift +
          " (二进制: " + Integer.toBinaryString(negUnsignedShift) + ")");
    }

    // 位运算实用技巧
    private static void demonstrateBitwiseTricks() {
        System.out.println("\n5. 位运算实用技巧");
        System.out.println("==================================");

        // 判断奇偶性
        int number = 15;
        boolean isEven = (number & 1) == 0;
        System.out.println(number + " 是" + (isEven ? "偶数" : "奇数"));

        // 交换两个变量的值
        int x = 5, y = 7;
        System.out.println("交换前: x = " + x + ", y = " + y);
        x = x ^ y;
        y = x ^ y;
        x = x ^ y;
        System.out.println("交换后: x = " + x + ", y = " + y);

        // 检查是否是2的幂
        int testNum = 16;
        boolean isPowerOfTwo = (testNum & (testNum - 1)) == 0;
        System.out.println(testNum + " 是2的幂? " + isPowerOfTwo);

        // 获取最低位的1
        int lowBit = testNum & -testNum;
        System.out.println(testNum + " 的最低位的1: " + lowBit +
          " (二进制: " + Integer.toBinaryString(lowBit) + ")");

        // 快速乘以2和除以2
        int original = 25;
        int doubled = original << 1;
        int halved = original >> 1;
        System.out.println(original + " 乘以2: " + doubled);
        System.out.println(original + " 除以2: " + halved);
    }

    // 原码、反码和补码
    private static void demonstrateNumberEncoding() {
        System.out.println("\n6. 原码、反码和补码");
        System.out.println("==================================");

        int positive = 10;
        int negativeNum = -10;

        System.out.println("正数 10 的二进制: " +
          String.format("%32s", Integer.toBinaryString(positive)).replace(' ', '0'));
        System.out.println("负数 -10 的二进制: " + Integer.toBinaryString(negativeNum));
    }

    // 位掩码应用
    private static void demonstrateBitmaskApplications() {
        System.out.println("\n7. 位掩码应用");
        System.out.println("==================================");

        final int READ = 0b0001;
        final int WRITE = 0b0010;
        final int EXECUTE = 0b0100;

        int userPermissions = READ | WRITE;

        System.out.println("用户权限: " + Integer.toBinaryString(userPermissions));
        System.out.println("有读权限? " + ((userPermissions & READ) != 0));
        System.out.println("有写权限? " + ((userPermissions & WRITE) != 0));
        System.out.println("有执行权限? " + ((userPermissions & EXECUTE) != 0));

        // 添加执行权限
        userPermissions |= EXECUTE;
        System.out.println("\n添加执行权限后: " + Integer.toBinaryString(userPermissions));
        System.out.println("有执行权限? " + ((userPermissions & EXECUTE) != 0));

        // 移除写权限
        userPermissions &= ~WRITE;
        System.out.println("\n移除写权限后: " + Integer.toBinaryString(userPermissions));
        System.out.println("有写权限? " + ((userPermissions & WRITE) != 0));
    }
}