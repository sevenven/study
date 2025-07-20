package processControl;

public class For {
    public static void main(String[] args) {
        System.out.println("===== Java For 循环详解与示例 =====");

        // ===========================================
        // 1. 基本 for 循环结构
        // ===========================================
        /*
         * for 循环语法：
         *   for (初始化; 条件; 迭代) {
         *       // 循环体
         *   }
         *
         * 执行流程：
         *   1. 执行初始化语句（只执行一次）
         *   2. 检查条件表达式
         *   3. 条件为 true 时执行循环体
         *   4. 执行迭代语句
         *   5. 重复步骤2-4，直到条件为 false
         */
        System.out.println("\n1. 基本 for 循环结构");

        System.out.println("打印数字 1-5:");
        for (int i = 1; i <= 5; i++) {
            System.out.print(i + " ");
        }

        // ===========================================
        // 2. 增强 for 循环（for-each）
        // ===========================================
        /*
         * 增强 for 循环语法：
         *   for (元素类型 变量名 : 集合或数组) {
         *       // 循环体
         *   }
         *
         * 特点：
         *   - 简化数组和集合的遍历
         *   - 不需要索引变量
         *   - 不能修改集合/数组大小
         */
        System.out.println("\n\n2. 增强 for 循环（for-each）");

        int[] numbers = {10, 20, 30, 40, 50};
        System.out.println("遍历数组:");
        for (int num : numbers) {
            System.out.print(num + " ");
        }

        // ===========================================
        // 3. 嵌套 for 循环
        // ===========================================
        /*
         * 嵌套循环应用场景：
         *   - 处理多维数据结构
         *   - 生成组合数据
         *   - 矩阵运算
         */
        System.out.println("\n\n3. 嵌套 for 循环");

        System.out.println("打印九九乘法表:");
        for (int i = 1; i <= 9; i++) {
            for (int j = 1; j <= i; j++) {
                System.out.printf("%d×%d=%-2d ", j, i, i * j);
            }
            System.out.println();
        }

        // ===========================================
        // 4. 循环控制语句：break 和 continue
        // ===========================================
        /*
         * break: 立即退出当前循环
         * continue: 跳过当前迭代，进入下一次循环
         */
        System.out.println("\n4. 循环控制语句：break 和 continue");

        System.out.println("查找第一个能被3和5整除的数:");
        for (int i = 1; i <= 100; i++) {
            // 跳过偶数
            if (i % 2 == 0) {
                continue;
            }

            if (i % 3 == 0 && i % 5 == 0) {
                System.out.println("找到符合条件的数: " + i);
                break;
            }
        }

        // ===========================================
        // 5. 带标签的循环控制
        // ===========================================
        /*
         * 标签语法：
         *   标签名: for (...) {
         *       // 循环体
         *   }
         *
         * 使用场景：
         *   - 在嵌套循环中控制外层循环
         *   - 需要从多层循环中跳出时
         */
        System.out.println("\n5. 带标签的循环控制");

        outerLoop: // 外层循环标签
        for (int i = 1; i <= 3; i++) {
            System.out.println("外层循环 i = " + i);

            for (int j = 1; j <= 5; j++) {
                System.out.println("  内层循环 j = " + j);

                if (j == 3) {
                    // 跳出外层循环
                    break outerLoop;
                }
            }
        }

        // ===========================================
        // 6. 特殊形式：无限循环
        // ===========================================
        /*
         * 无限循环形式：
         *   for (;;) {
         *       // 循环体
         *   }
         *
         * 使用场景：
         *   - 需要持续运行的程序（如服务器）
         *   - 需要外部条件退出的循环
         *   - 配合 break 控制退出
         */
        System.out.println("\n6. 特殊形式：无限循环");

        System.out.println("模拟倒计时:");
        int count = 5;
        for (;;) {
            if (count < 0) {
                break;
            }
            System.out.println("倒计时: " + count);
            count--;

            // 模拟延迟
            try {
                Thread.sleep(1000); // 暂停1秒
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        System.out.println("发射！");

        // ===========================================
        // 7. 多个循环变量
        // ===========================================
        /*
         * 语法：
         *   for (初始化1, 初始化2; 条件; 迭代1, 迭代2) {
         *       // 循环体
         *   }
         *
         * 使用场景：
         *   - 同时控制多个相关变量
         *   - 遍历多个相关序列
         */
        System.out.println("\n7. 多个循环变量");

        System.out.println("斐波那契数列前10项:");
        for (int a = 0, b = 1, i = 0; i < 10; i++) {
            System.out.print(a + " ");
            int next = a + b;
            a = b;
            b = next;
        }

        // ===========================================
        // 8. 空循环体
        // ===========================================
        /*
         * 使用场景：
         *   - 简单计数
         *   - 延迟等待
         *
         * 注意：避免创建性能问题
         */
        System.out.println("\n\n8. 空循环体");

        // 计算1-100的和
        int sum = 0;
        for (int i = 1; i <= 100; sum += i++); // 空循环体
        System.out.println("1-100的和: " + sum);

        // ===========================================
        // 9. for 循环与数组操作
        // ===========================================
        /*
         * 常见操作：
         *   - 遍历数组
         *   - 填充数组
         *   - 查找元素
         *   - 数组排序（如冒泡排序）
         */
        System.out.println("\n9. for 循环与数组操作");

        // 数组填充
        int[] squares = new int[10];
        for (int i = 0; i < squares.length; i++) {
            squares[i] = (i + 1) * (i + 1);
        }

        System.out.println("平方数数组:");
        for (int sq : squares) {
            System.out.print(sq + " ");
        }

        // 冒泡排序
        int[] arr = {5, 3, 8, 4, 2};
        System.out.println("\n\n冒泡排序前:");
        printArray(arr);

        for (int i = 0; i < arr.length - 1; i++) {
            for (int j = 0; j < arr.length - 1 - i; j++) {
                if (arr[j] > arr[j + 1]) {
                    // 交换元素
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }

        System.out.println("冒泡排序后:");
        printArray(arr);

        // ===========================================
        // 10. for 循环与集合操作
        // ===========================================
        /*
         * 集合遍历方式：
         *   - 传统 for 循环（需要索引）
         *   - 增强 for 循环（推荐）
         *   - 迭代器（Iterator）
         */
        System.out.println("\n10. for 循环与集合操作");

        java.util.List<String> fruits = new java.util.ArrayList<>();
        fruits.add("Apple");
        fruits.add("Banana");
        fruits.add("Orange");

        System.out.println("使用增强 for 循环遍历集合:");
        for (String fruit : fruits) {
            System.out.println(fruit);
        }

        System.out.println("\n使用传统 for 循环遍历集合:");
        for (int i = 0; i < fruits.size(); i++) {
            System.out.println(fruits.get(i));
        }

        // ===========================================
        // 11. 性能优化与最佳实践
        // ===========================================
        System.out.println("\n11. 性能优化与最佳实践");

        // 实践1: 将循环不变代码移到循环外
        String[] names = {"Alice", "Bob", "Charlie", "David"};
        System.out.println("优化前:");
        long start = System.nanoTime();
        for (String name : names) {
            // 每次循环都创建新对象
            String greeting = "Hello, " + name;
            System.out.println(greeting);
        }
        long end = System.nanoTime();
        System.out.println("优化前耗时: " + (end - start) + " ns");

        System.out.println("\n优化后:");
        start = System.nanoTime();
        // 创建一次StringBuilder
        StringBuilder builder = new StringBuilder();
        for (String name : names) {
            builder.setLength(0); // 重置StringBuilder
            builder.append("Hello, ").append(name);
            System.out.println(builder.toString());
        }
        end = System.nanoTime();
        System.out.println("优化后耗时: " + (end - start) + " ns");

        // 实践2: 避免在循环条件中调用方法
        System.out.println("\n循环条件优化:");
        int size = names.length; // 提前获取长度
        for (int i = 0; i < size; i++) {
            System.out.println(names[i]);
        }

        // 实践3: 使用并行流处理大数据集
        System.out.println("\n使用并行流处理:");
        java.util.Arrays.stream(names)
                .parallel()
                .forEach(name -> System.out.println("并行处理: " + name));
    }

    // 辅助方法：打印数组
    private static void printArray(int[] arr) {
        for (int num : arr) {
            System.out.print(num + " ");
        }
        System.out.println();
    }
}