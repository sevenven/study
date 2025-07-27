package commonlyUsedClasses._util;

import java.util.Scanner;

public class _Scanner {
    public static void main(String[] args) {
        // 创建一个 Scanner 对象，用于读取标准输入（通常是键盘输入）
        Scanner scanner = new Scanner(System.in);

        // =============================
        // 读取字符串
        // =============================
        System.out.print("Enter a string: ");
        // 使用 nextLine() 方法读取一行字符串
        String inputString = scanner.nextLine();
        System.out.println("You entered: " + inputString);

        // =============================
        // 读取整数
        // =============================
        System.out.print("Enter an integer: ");
        // 使用 nextInt() 方法读取下一个整数
        int inputInt = scanner.nextInt();
        System.out.println("You entered: " + inputInt);

        // =============================
        // 读取浮点数
        // =============================
        System.out.print("Enter a float: ");
        // 使用 nextFloat() 方法读取下一个浮点数
        float inputFloat = scanner.nextFloat();
        System.out.println("You entered: " + inputFloat);

        // =============================
        // 读取双精度浮点数
        // =============================
        System.out.print("Enter a double: ");
        // 使用 nextDouble() 方法读取下一个双精度浮点数
        double inputDouble = scanner.nextDouble();
        System.out.println("You entered: " + inputDouble);

        // =============================
        // 读取布尔值
        // =============================
        System.out.print("Enter a boolean (true/false): ");
        // 使用 nextBoolean() 方法读取下一个布尔值
        boolean inputBoolean = scanner.nextBoolean();
        System.out.println("You entered: " + inputBoolean);

        // =============================
        // 读取单个字符
        // =============================
        System.out.print("Enter a character: ");
        // 使用 next().charAt(0) 方法读取单个字符
        char inputChar = scanner.next().charAt(0);
        System.out.println("You entered: " + inputChar);

        // =============================
        // 关闭 Scanner 对象
        // =============================
        // 在使用完 Scanner 对象后，建议关闭它以释放资源
        scanner.close();
    }
}