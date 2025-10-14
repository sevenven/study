package processControl;

public class While {
    public static void main(String[] args) {
        System.out.println("===== Java While 循环详解与示例 =====");
        basicWhileLoop(); // 基本 while 循环结构
        whileVsFor(); // while 循环 vs for 循环
        controlFlowWithBreakContinue(); // 使用 break 和 continue 控制循环
        avoidInfiniteLoop(); // 避免无限循环
        nestedWhileLoops(); // 嵌套 while 循环
        doWhileLoop(); // do-while 循环
        practicalExamples(); // 实际应用案例
        commonErrorsAndDebuggingTips(); // 常见错误与调试技巧
    }

    // 基本 while 循环结构
    private static void basicWhileLoop() {
        System.out.println("\n基本 while 循环结构");
        /*
         * while 循环语法：
         *   while (条件表达式) {
         *       // 循环体
         *   }
         * 执行流程：
         *   1. 先判断条件表达式是否为 true
         *   2. 如果为 true，执行循环体
         *   3. 再次判断条件表达式
         *   4. 直到条件为 false 时退出循环
         */

        int count = 1;
        System.out.println("从1数到5:");
        while (count <= 5) {
            System.out.println("计数: " + count);
            count++;  // 计数器递增（避免无限循环的关键）
        }
    }

    // while 循环 vs for 循环
    private static void whileVsFor() {
        System.out.println("\nwhile 循环 vs for 循环");
        /*
         * 何时使用 while 而不是 for：
         *   - 当迭代次数不确定时
         *   - 当循环条件不依赖于计数器时
         *   - 当需要更复杂的循环控制时
         */

        // 使用 while 实现不确定次数的迭代
        int randomNum = (int)(Math.random() * 10) + 1; // 1-10的随机数
        System.out.println("随机数: " + randomNum);
        System.out.println("除以2直到小于1:");

        while (randomNum >= 1) {
            System.out.println("当前值: " + randomNum);
            randomNum /= 2;  // 每次除以2
        }
    }

    // 使用 break 和 continue 控制循环
    private static void controlFlowWithBreakContinue() {
        System.out.println("\n使用 break 和 continue");
        /*
         * break: 立即退出整个循环
         * continue: 跳过当前迭代，进入下一次循环
         */

        int num = 0;
        System.out.println("查找第一个能被3和5整除的数:");
        while (num < 100) {
            num++;

            // 跳过偶数
            if (num % 2 == 0) {
                continue;  // 跳过本次循环的剩余部分
            }

            if (num % 3 == 0 && num % 5 == 0) {
                System.out.println("找到符合条件的数: " + num);
                break;  // 找到后退出循环
            }
        }
    }

    // 避免无限循环
    private static void avoidInfiniteLoop() {
        System.out.println("\n避免无限循环");
        /*
         * 无限循环常见原因：
         *   - 忘记更新循环变量
         *   - 循环条件始终为真
         *
         * 如何避免：
         *   - 确保循环变量在循环体内被更新
         *   - 确保循环条件最终会变为 false
         *   - 使用调试工具检查循环行为
         */

        // 安全计数器防止无限循环
        int safeCounter = 0;
        int value = 10;
        System.out.println("安全循环示例:");

        while (value > 1) {
            value--;  // 递减值
            safeCounter++;  // 安全计数器递增

            // 设置安全上限
            if (safeCounter > 100) {
                System.out.println("安全计数器触发，退出循环！");
                break;
            }
        }
    }

    // 嵌套 while 循环
    private static void nestedWhileLoops() {
        System.out.println("\n嵌套 while 循环");
        /*
         * 嵌套循环应用场景：
         *   - 处理多维数据结构
         *   - 生成组合数据
         *   - 复杂迭代逻辑
         */

        System.out.println("乘法表:");
        int i = 1;
        while (i <= 5) {
            int j = 1;
            while (j <= i) {
                System.out.print(j + "×" + i + "=" + (i * j) + "\t");
                j++;
            }
            System.out.println();  // 换行
            i++;
        }
    }

    // do-while 循环
    private static void doWhileLoop() {
        System.out.println("\ndo-while 循环");
        /*
         * do-while 语法：
         *   do {
         *       // 循环体
         *   } while (条件表达式);
         *
         * 特点：
         *   - 循环体至少执行一次
         *   - 条件判断在循环体之后
         */

        int userInput;
        int attempts = 0;

        // 模拟用户输入验证
        do {
            attempts++;
            // 模拟用户输入（实际应用中从Scanner获取）
            userInput = (int)(Math.random() * 5); // 0-4的随机数

            System.out.println("尝试 #" + attempts + ": 输入值 = " + userInput);
        } while (userInput != 3 && attempts < 5); // 直到输入3或尝试5次

        if (userInput == 3) {
            System.out.println("成功输入3！");
        } else {
            System.out.println("未能在5次内输入3");
        }
    }

    // 实际应用案例
    private static void practicalExamples() {
        System.out.println("\n实际应用案例");

        // 案例1: 数字反转
        int original = 12345;
        int reversed = 0;
        int temp = original;

        System.out.println("数字反转: " + original);
        while (temp != 0) {
            int digit = temp % 10;         // 获取最后一位数字
            reversed = reversed * 10 + digit; // 构建反转数字
            temp = temp / 10;              // 移除最后一位
        }
        System.out.println("反转结果: " + reversed);

        // 案例2: 计算最大公约数 (GCD)
        int a = 48, b = 18;
        System.out.println("\n计算最大公约数: " + a + " 和 " + b);

        while (b != 0) {
            int remainder = a % b;
            a = b;
            b = remainder;
        }
        System.out.println("最大公约数: " + a);

        // 案例3: 查找素数
        System.out.println("\n查找1-50之间的素数:");
        int number = 2;
        while (number <= 50) {
            boolean isPrime = true;
            int divisor = 2;

            // 检查是否为素数
            while (divisor <= Math.sqrt(number)) {
                if (number % divisor == 0) {
                    isPrime = false;
                    break;
                }
                divisor++;
            }

            if (isPrime) {
                System.out.print(number + " ");
            }
            number++;
        }
    }

    // 常见错误与调试技巧
    private static void commonErrorsAndDebuggingTips() {
        System.out.println("\n\n常见错误与调试技巧");

        // 错误1: 忘记更新循环变量
        /*
        int x = 0;
        while (x < 5) {
            System.out.println("无限循环?");
            // 缺少 x++ 会导致无限循环
        }
        */
        System.out.println("错误1: 忘记更新循环变量 -> 可能导致无限循环");

        // 错误2: 使用错误的循环条件
        int y = 10;
        System.out.println("\n错误2: 使用错误的循环条件:");
        while (y > 0) {
            System.out.println("y = " + y);
            y++;  // 递增而不是递减，导致无限循环
            if (y > 20) break; // 添加安全退出
        }

        // 调试技巧
        System.out.println("\n调试技巧:");
        int z = 1;
        System.out.println("循环开始:");
        while (z <= 5) {
            System.out.println("循环迭代 #" + z);
            // 打印关键变量值
            System.out.println("  当前值: " + z);

            // 模拟复杂计算
            int result = z * 10;
            System.out.println("  计算结果: " + result);

            z++;
        }
    }
}