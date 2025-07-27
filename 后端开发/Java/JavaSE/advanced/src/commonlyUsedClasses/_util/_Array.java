package commonlyUsedClasses._util;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class _Array {
    public static void main(String[] args) {
        System.out.println("===== Java 一维数组详解与示例 =====");

        // ===========================================
        // 1. 数组的声明和初始化
        // ===========================================
        /*
         * 数组声明方式：
         *   - 推荐：数据类型[] 数组名; (如 int[] numbers;)
         *   - 不推荐：数据类型 数组名[]; (如 int numbers[];)
         *
         * 数组初始化方式：
         *   - 静态初始化：声明同时赋值 (int[] arr = {1,2,3};)
         *   - 动态初始化：先声明数组大小，再赋值 (int[] arr = new int[3];)
         *
         * 注意：
         *   - 数组长度一旦确定不能修改
         *   - 静态初始化只能在声明时使用
         */
        System.out.println("\n1. 数组的声明和初始化");

        // 声明数组
        int[] scores; // 推荐声明方式

        // 静态初始化
        int[] primeNumbers = {2, 3, 5, 7, 11};
        System.out.println("静态初始化数组: " + Arrays.toString(primeNumbers));

        // 动态初始化
        scores = new int[5]; // 创建长度为5的整型数组
        System.out.println("动态初始化数组: " + Arrays.toString(scores));

        // 匿名数组（用于方法参数）
        printArray(new int[]{10, 20, 30, 40, 50});

        // ===========================================
        // 2. 调用数组的指定元素
        // ===========================================
        /*
         * 访问数组元素：
         *   - 通过索引访问，索引从0开始
         *   - 语法：数组名[索引]
         *   - 有效索引范围：[0, 数组长度-1]
         *
         * 修改数组元素：
         *   - 直接通过索引赋值
         */
        System.out.println("\n2. 调用数组的指定元素");

        // 访问数组元素
        System.out.println("primeNumbers[0]: " + primeNumbers[0]); // 第一个元素
        System.out.println("primeNumbers[2]: " + primeNumbers[2]); // 第三个元素
        System.out.println("primeNumbers[4]: " + primeNumbers[4]); // 最后一个元素

        // 修改数组元素
        scores[0] = 95;
        scores[1] = 88;
        scores[2] = 76;
        scores[3] = 92;
        scores[4] = 85;
        System.out.println("修改后scores数组: " + Arrays.toString(scores));

        // ===========================================
        // 3. 数组的属性：length
        // ===========================================
        /*
         * length属性：
         *   - 数组对象的一个final属性
         *   - 表示数组的长度（元素个数）
         *   - 不是方法，不需要括号
         *   - 使用：数组名.length
         */
        System.out.println("\n3. 数组的属性：length");

        System.out.println("primeNumbers数组长度: " + primeNumbers.length);
        System.out.println("scores数组长度: " + scores.length);

        // 创建不同长度的数组
        String[] names = new String[3];
        System.out.println("names数组长度: " + names.length);

        // 使用length属性遍历数组
        System.out.print("使用length遍历scores数组: ");
        for (int i = 0; i < scores.length; i++) {
            System.out.print(scores[i] + " ");
        }
        System.out.println();

        // ===========================================
        // 4. 数组的遍历
        // ===========================================
        /*
         * 数组遍历方式：
         *   - 基本for循环（使用索引）
         *   - 增强for循环（for-each）
         *   - Arrays.toString()方法
         *   - 使用Stream API（Java 8+）
         */
        System.out.println("\n4. 数组的遍历");

        double[] temperatures = {22.5, 23.8, 25.1, 24.3, 21.7};

        // 1. 基本for循环
        System.out.println("基本for循环遍历:");
        for (int i = 0; i < temperatures.length; i++) {
            System.out.printf("第%d天温度: %.1f°C\n", i + 1, temperatures[i]);
        }

        // 2. 增强for循环（for-each）
        System.out.println("\n增强for循环遍历:");
        for (double temp : temperatures) {
            System.out.printf("%.1f°C ", temp);
        }
        System.out.println();

        // 3. Arrays.toString()
        System.out.println("\nArrays.toString(): " + Arrays.toString(temperatures));

        // 4. 使用Stream API
        System.out.println("\nStream API遍历:");
        Arrays.stream(temperatures).forEach(temp -> System.out.printf("%.1f°C ", temp));
        System.out.println();

        // ===========================================
        // 5. 数组元素的默认初始化
        // ===========================================
        /*
         * 数组元素默认值：
         *   - 整型（byte, short, int, long）：0
         *   - 浮点型（float, double）：0.0
         *   - 字符型（char）：'\u0000'（空字符）
         *   - 布尔型（boolean）：false
         *   - 引用类型：null
         *
         * 注意：
         *   - 只在数组创建时初始化，局部变量不会自动初始化
         */
        System.out.println("\n5. 数组元素的默认初始化");

        // 不同数据类型的默认值
        byte[] byteArr = new byte[3];
        short[] shortArr = new short[3];
        int[] intArr = new int[3];
        long[] longArr = new long[3];
        float[] floatArr = new float[3];
        double[] doubleArr = new double[3];
        char[] charArr = new char[3];
        boolean[] boolArr = new boolean[3];
        String[] strArr = new String[3];
        Object[] objArr = new Object[3];

        System.out.println("byte数组默认值: " + Arrays.toString(byteArr));
        System.out.println("short数组默认值: " + Arrays.toString(shortArr));
        System.out.println("int数组默认값: " + Arrays.toString(intArr));
        System.out.println("long数组默认값: " + Arrays.toString(longArr));
        System.out.println("float数组默认값: " + Arrays.toString(floatArr));
        System.out.println("double数组默认값: " + Arrays.toString(doubleArr));
        System.out.println("char数组默认值: " + Arrays.toString(charArr) +
                " (空字符显示为空白)");
        System.out.println("boolean数组默认值: " + Arrays.toString(boolArr));
        System.out.println("String数组默认值: " + Arrays.toString(strArr));
        System.out.println("Object数组默认值: " + Arrays.toString(objArr));

        // 默认值验证
        System.out.println("\nchar数组第一个元素: [" + charArr[0] + "] (ASCII值: " + (int)charArr[0] + ")");

        // ===========================================
        // 6. 数组的特点
        // ===========================================
        /*
         * 数组特点：
         *   - 固定长度：数组的长度在创建时确定，之后不能改变。
         *   - 同一类型：数组中的所有元素必须是同一数据类型。
         *   - 连续存储：数组元素在内存中连续存储，便于快速访问。
         *   - 索引访问：通过索引访问数组元素，索引从0开始。
         *   - 多维数组：可以创建多维数组（如二维数组、三维数组等）。
         */

        // 示例：固定长度
        int[] fixedLengthArray = new int[5];
        System.out.println("\n固定长度数组: " + Arrays.toString(fixedLengthArray));

        // 示例：同一类型
        int[] sameTypeArray = {1, 2, 3, 4, 5};
        System.out.println("同一类型数组: " + Arrays.toString(sameTypeArray));

        // 示例：连续存储
        /*
         * 内存分析：
         *   - 数组在内存中是一块连续的空间。
         *   - 每个元素占用固定的字节数。
         *   - 通过基地址和偏移量计算元素地址。
         */
        int[] continuousArray = {10, 20, 30, 40, 50};
        System.out.println("连续存储数组: " + Arrays.toString(continuousArray));

        // 示例：索引访问
        int elementAt2 = continuousArray[2]; // 访问第三个元素
        System.out.println("索引访问数组元素: continuousArray[2] = " + elementAt2);

        // 示例：多维数组
        int[][] multiDimensionalArray = {
                {1, 2, 3},
                {4, 5, 6},
                {7, 8, 9}
        };
        System.out.println("多维数组: ");
        for (int i = 0; i < multiDimensionalArray.length; i++) {
            System.out.println(Arrays.toString(multiDimensionalArray[i]));
        }

        // ===========================================
        // 7. 一维数组内存分析示例
        // ===========================================
        /*
         * 内存分析示例：
         *   - 创建一个包含10个整数的数组。
         *   - 解释数组在内存中的分配情况。
         *   - 数组在堆内存中分配空间。
         *   - 每个元素占据特定的字节数（int类型占4字节）。
         *   - 数组对象本身在栈上保存引用指向堆上的数组数据。
         *   - 例如，memoryExample数组在堆上分配40字节的空间（10 * 4字节），栈上保存指向该空间的引用。
         */
        System.out.println("\n内存量分析:");

        // 创建一个包含10个整数的数组
        int[] memoryExample = new int[10];
        System.out.println("memoryExample数组长度: " + memoryExample.length);

        // 打印数组的内存地址（实际应用中无法直接获取内存地址）
        System.out.println("memoryExample数组: " + Arrays.toString(memoryExample));

        // 解释内存分配
        /*
         * 内存分配解释：
         *   - 数组在堆内存中分配空间。
         *   - 每个元素占据特定的字节数（int类型占4字节）。
         *   - 数组对象本身在栈上保存引用指向堆上的数组数据。
         *   - 例如，memoryExample数组在堆上分配40字节的空间（10 * 4字节），栈上保存指向该空间的引用。
         */
        System.out.println("内存分配解释:");
        System.out.println("  - 数组在堆内存中分配空间。");
        System.out.println("  - 每个元素占据特定的字节数（int类型占4字节）。");
        System.out.println("  - 数组对象本身在栈上保存引用指向堆上的数组数据。");
        System.out.println("  - 例如，memoryExample数组在堆上分配40字节的空间（10 * 4字节），栈上保存指向该空间的引用。");

        // ===========================================
        // 8. 二维数组详解
        // ===========================================
        /*
         * 二维数组：
         *   - 可以看作是一维数组的数组
         *   - 每个元素本身又是一个一维数组
         *   - 常用于表示表格数据或矩阵
         *
         * 二维数组声明方式：
         *   - 推荐：数据类型[][] 数组名; (如 int[][] matrix;)
         *   - 不推荐：数据类型 数组名[][]; 或 数据类型[] 数组名[];
         *
         * 二维数组初始化方式：
         *   - 静态初始化：声明同时赋值 (int[][] arr = {{1,2}, {3,4}};)
         *   - 动态初始化：
         *     - 直接指定各维度大小 (int[][] arr = new int[3][4];)
         *     - 只指定第一维大小 (int[][] arr = new int[3][];)
         */
        System.out.println("\n8. 二维数组详解");

        // 二维数组静态初始化
        int[][] matrix1 = {
                {1, 2, 3},
                {4, 5, 6},
                {7, 8, 9}
        };
        System.out.println("静态初始化二维数组:");
        for (int[] row : matrix1) {
            System.out.println(Arrays.toString(row));
        }

        // 二维数组动态初始化（规则二维数组）
        int[][] matrix2 = new int[3][4]; // 3行4列的二维数组
        System.out.println("\n动态初始化规则二维数组:");
        for (int[] row : matrix2) {
            System.out.println(Arrays.toString(row));
        }

        // 二维数组动态初始化（不规则二维数组）
        int[][] matrix3 = new int[3][]; // 只指定第一维大小
        matrix3[0] = new int[2]; // 第一行2列
        matrix3[1] = new int[3]; // 第二行3列
        matrix3[2] = new int[4]; // 第三行4列
        System.out.println("\n动态初始化不规则二维数组:");
        for (int[] row : matrix3) {
            System.out.println(Arrays.toString(row));
        }

        // ===========================================
        // 9. 二维数组的遍历
        // ===========================================
        /*
         * 二维数组遍历方式：
         *   - 嵌套基本for循环
         *   - 嵌套增强for循环
         *   - Arrays.deepToString()方法
         */
        System.out.println("\n9. 二维数组的遍历");

        // 1. 嵌套基本for循环
        System.out.println("嵌套基本for循环遍历:");
        for (int i = 0; i < matrix1.length; i++) {
            for (int j = 0; j < matrix1[i].length; j++) {
                System.out.print(matrix1[i][j] + " ");
            }
            System.out.println();
        }

        // 2. 嵌套增强for循环
        System.out.println("\n嵌套增强for循环遍历:");
        for (int[] row : matrix1) {
            for (int ele : row) {
                System.out.print(ele + " ");
            }
            System.out.println();
        }

        // 3. Arrays.deepToString()
        System.out.println("\nArrays.deepToString():");
        System.out.println(Arrays.deepToString(matrix1));

        // ===========================================
        // 10. 二维数组元素的默认初始化
        // ===========================================
        /*
         * 二维数组元素默认值：
         *   - 与一维数组相同，取决于元素类型
         *   - 未初始化的第二维数组为null
         */
        System.out.println("\n10. 二维数组元素的默认初始化");

        // 不同数据类型的二维数组默认值
        int[][] int2DArr = new int[2][3];
        double[][] double2DArr = new double[2][3];
        char[][] char2DArr = new char[2][3];
        boolean[][] bool2DArr = new boolean[2][3];
        String[][] str2DArr = new String[2][3];
        Object[][] obj2DArr = new Object[2][3];

        System.out.println("int二维数组默认值:");
        for (int[] row : int2DArr) {
            System.out.println(Arrays.toString(row));
        }

        System.out.println("\ndouble二维数组默认值:");
        for (double[] row : double2DArr) {
            System.out.println(Arrays.toString(row));
        }

        System.out.println("\nchar二维数组默认值:");
        for (char[] row : char2DArr) {
            System.out.println(Arrays.toString(row));
        }

        System.out.println("\nboolean二维数组默认值:");
        for (boolean[] row : bool2DArr) {
            System.out.println(Arrays.toString(row));
        }

        System.out.println("\nString二维数组默认值:");
        for (String[] row : str2DArr) {
            System.out.println(Arrays.toString(row));
        }

        System.out.println("\nObject二维数组默认值:");
        for (Object[] row : obj2DArr) {
            System.out.println(Arrays.toString(row));
        }

        // 未初始化第二维的情况
        int[][] partial2DArr = new int[3][];
        System.out.println("\n未初始化第二维的二维数组:");
        System.out.println(Arrays.toString(partial2DArr)); // 输出三个null

        // ===========================================
        // 11. 二维数组的内存解析
        // ===========================================
        /*
         * 二维数组内存结构：
         *   - 二维数组在堆内存中分配空间
         *   - 第一维存储的是对第二维数组的引用
         *   - 第二维存储实际数据
         *   - 不规则数组的第二维可以有不同的长度
         *
         * 内存示例：
         *   int[][] arr = new int[3][2];
         *   - 栈上保存arr引用，指向堆中的3个元素空间
         *   - 堆中的每个元素又指向一个包含2个int的空间
         *   - 总共需要: 3个引用空间 + 3*2个int空间
         */
        System.out.println("\n11. 二维数组的内存解析");

        // 规则二维数组内存示例
        int[][] regularArray = new int[3][2];
        System.out.println("规则二维数组:");
        for (int[] row : regularArray) {
            System.out.println(Arrays.toString(row));
        }

        // 不规则二维数组内存示例
        int[][] irregularArray = new int[3][];
        irregularArray[0] = new int[2];
        irregularArray[1] = new int[3];
        irregularArray[2] = new int[1];
        System.out.println("\n不规则二维数组:");
        for (int[] row : irregularArray) {
            System.out.println(Arrays.toString(row));
        }

        // 内存分配解释
        System.out.println("\n内存分配解释:");
        System.out.println("  - 二维数组在堆内存中分配空间");
        System.out.println("  - 第一维存储的是对第二维数组的引用");
        System.out.println("  - 第二维存储实际数据");
        System.out.println("  - 不规则数组的第二维可以有不同的长度");
        System.out.println("  - 例如，int[][] arr = new int[3][2];");
        System.out.println("    - 栈上保存arr引用，指向堆中的3个元素空间");
        System.out.println("    - 堆中的每个元素又指向一个包含2个int的空间");
        System.out.println("    - 总共需要: 3个引用空间 + 3*2个int空间");

        // ===========================================
        // 12. Arrays工具类的使用
        // ===========================================
        /*
         * Arrays工具类：
         *   - java.util.Arrays类提供了操作数组的各种方法
         *   - 常用功能：排序、查找、比较、填充、复制等
         *   - 大大简化了数组操作
         */
        System.out.println("\n12. Arrays工具类的使用");

        // 示例数组
        int[] nums = {3, 9, 1, 7, 5, 2, 8, 4, 6};
        double[] doubles = {1.2, 3.4, 0.8, 5.6, 4.3};

        // ===========================================
        // 12.1 数值型数组特征值统计
        // ===========================================
        /*
         * 特征值统计：
         *   - 需要手动计算或使用Stream API
         *   - 包括：平均值、最大值、最小值、总和等
         */
        System.out.println("\n12.1 数值型数组特征值统计");

        // 计算总和、平均值、最大值、最小值
        int sum = 0;
        int max = nums[0];
        int min = nums[0];

        for (int num : nums) {
            sum += num;
            if (num > max) max = num;
            if (num < min) min = num;
        }

        double average = (double) sum / nums.length;

        System.out.println("数组: " + Arrays.toString(nums));
        System.out.println("总和: " + sum);
        System.out.println("平均值: " + average);
        System.out.println("最大值: " + max);
        System.out.println("最小值: " + min);

        // 使用Stream API计算
        System.out.println("\n使用Stream API计算:");
        System.out.println("总和: " + Arrays.stream(nums).sum());
        System.out.println("平均值: " + Arrays.stream(nums).average().orElse(0));
        System.out.println("最大值: " + Arrays.stream(nums).max().getAsInt());
        System.out.println("最小值: " + Arrays.stream(nums).min().getAsInt());

        // ===========================================
        // 12.2 数组元素的赋值与复制
        // ===========================================
        /*
         * 数组复制方式：
         *   - System.arraycopy()：高效的原生方法
         *   - Arrays.copyOf()：简便方法，可扩容
         *   - clone()：对象方法
         *   - 直接赋值：仅复制引用，不复制内容
         */
        System.out.println("\n12.2 数组元素的赋值与复制");

        // 直接赋值（引用复制）
        int[] arr1 = {1, 2, 3};
        int[] arr2 = arr1;  // 仅复制引用
        arr2[0] = 100;      // 修改会影响原数组
        System.out.println("直接赋值后:");
        System.out.println("arr1: " + Arrays.toString(arr1));
        System.out.println("arr2: " + Arrays.toString(arr2));

        // System.arraycopy()
        int[] arr3 = new int[arr1.length];
        System.arraycopy(arr1, 0, arr3, 0, arr1.length);
        arr3[0] = 200;      // 修改不会影响原数组
        System.out.println("\nSystem.arraycopy()后:");
        System.out.println("arr1: " + Arrays.toString(arr1));
        System.out.println("arr3: " + Arrays.toString(arr3));

        // Arrays.copyOf()
        int[] arr4 = Arrays.copyOf(arr1, arr1.length);
        arr4[0] = 300;      // 修改不会影响原数组
        System.out.println("\nArrays.copyOf()后:");
        System.out.println("arr1: " + Arrays.toString(arr1));
        System.out.println("arr4: " + Arrays.toString(arr4));

        // 扩容复制
        int[] arr5 = Arrays.copyOf(arr1, arr1.length * 2);
        System.out.println("\n扩容复制后:");
        System.out.println("arr5: " + Arrays.toString(arr5));

        // ===========================================
        // 12.3 数组的反转
        // ===========================================
        /*
         * 数组反转：
         *   - 可以通过交换元素实现
         *   - 也可以使用Collections.reverse()（需转为List）
         */
        System.out.println("\n12.3 数组的反转");

        int[] reverseArr = {1, 2, 3, 4, 5};
        System.out.println("原数组: " + Arrays.toString(reverseArr));

        // 方法1：交换元素
        for (int i = 0; i < reverseArr.length / 2; i++) {
            int temp = reverseArr[i];
            reverseArr[i] = reverseArr[reverseArr.length - 1 - i];
            reverseArr[reverseArr.length - 1 - i] = temp;
        }
        System.out.println("反转后: " + Arrays.toString(reverseArr));

        // 方法2：使用Collections（需要转为List）
        Integer[] reverseArr2 = {1, 2, 3, 4, 5};
        Collections.reverse(Arrays.asList(reverseArr2));
        System.out.println("使用Collections反转: " + Arrays.toString(reverseArr2));

        // ===========================================
        // 12.4 数组的扩容与缩容
        // ===========================================
        /*
         * 数组扩容与缩容：
         *   - 数组长度固定，扩容/缩容实际上是创建新数组
         *   - 常用Arrays.copyOf()实现
         */
        System.out.println("\n12.4 数组的扩容与缩容");

        // 扩容示例
        int[] expandArr = {1, 2, 3};
        System.out.println("原数组: " + Arrays.toString(expandArr));

        expandArr = Arrays.copyOf(expandArr, expandArr.length * 2);
        System.out.println("扩容后: " + Arrays.toString(expandArr));

        // 缩容示例
        int[] shrinkArr = {1, 2, 3, 4, 5};
        System.out.println("\n原数组: " + Arrays.toString(shrinkArr));

        shrinkArr = Arrays.copyOf(shrinkArr, shrinkArr.length / 2);
        System.out.println("缩容后: " + Arrays.toString(shrinkArr));

        // ===========================================
        // 12.5 数组的查找与排序
        // ===========================================
        /*
         * 数组查找：
         *   - Arrays.binarySearch()：二分查找（必须先排序）
         *   - 线性查找：逐个比较
         *
         * 数组排序：
         *   - Arrays.sort()：快速排序
         *   - Arrays.parallelSort()：并行排序（大数据量更高效）
         */
        System.out.println("\n12.5 数组的查找与排序");

        // 排序示例
        int[] sortArr = {5, 3, 9, 1, 7};
        System.out.println("排序前: " + Arrays.toString(sortArr));

        Arrays.sort(sortArr);
        System.out.println("排序后: " + Arrays.toString(sortArr));

        // 二分查找（必须先排序）
        int key = 7;
        int index = Arrays.binarySearch(sortArr, key);
        System.out.println("\n查找值 " + key + " 的索引: " + index);

        // 线性查找
        int linearIndex = -1;
        for (int i = 0; i < sortArr.length; i++) {
            if (sortArr[i] == key) {
                linearIndex = i;
                break;
            }
        }
        System.out.println("线性查找索引: " + linearIndex);

        // 并行排序
        int[] parallelArr = {5, 3, 9, 1, 7, 2, 8, 4, 6};
        System.out.println("\n并行排序前: " + Arrays.toString(parallelArr));

        Arrays.parallelSort(parallelArr);
        System.out.println("并行排序后: " + Arrays.toString(parallelArr));

        // ===========================================
        // 12.6 其他常用Arrays方法
        // ===========================================
        /*
         * 其他常用方法：
         *   - Arrays.fill()：填充数组
         *   - Arrays.equals()：比较数组内容
         *   - Arrays.deepEquals()：比较多维数组
         */
        System.out.println("\n12.6 其他常用Arrays方法");

        // fill()示例
        int[] fillArr = new int[5];
        Arrays.fill(fillArr, 10);
        System.out.println("fill()后: " + Arrays.toString(fillArr));

        // equals()示例
        int[] arrA = {1, 2, 3};
        int[] arrB = {1, 2, 3};
        int[] arrC = {1, 3, 2};
        System.out.println("\narrA equals arrB: " + Arrays.equals(arrA, arrB));
        System.out.println("arrA equals arrC: " + Arrays.equals(arrA, arrC));

        // deepEquals()示例
        int[][] deepA = {{1, 2}, {3, 4}};
        int[][] deepB = {{1, 2}, {3, 4}};
        int[][] deepC = {{1, 2}, {4, 3}};
        System.out.println("\ndeepA equals deepB: " + Arrays.deepEquals(deepA, deepB));
        System.out.println("deepA equals deepC: " + Arrays.deepEquals(deepA, deepC));

        // ===========================================
        // 13. 数组中的常见异常
        // ===========================================
        /*
         * 数组常见异常：
         *   - ArrayIndexOutOfBoundsException: 数组索引越界
         *   - NullPointerException: 空指针异常（操作未初始化的数组）
         *   - NegativeArraySizeException: 数组大小为负数
         *   - ArrayStoreException: 类型不匹配异常
         */
        System.out.println("\n13. 数组中的常见异常");

        // 1. ArrayIndexOutOfBoundsException 数组索引越界异常
        try {
            int[] arr = {1, 2, 3};
            System.out.println(arr[3]); // 尝试访问索引3，但最大索引为2
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("捕获到ArrayIndexOutOfBoundsException: " + e.getMessage());
        }

        // 2. NullPointerException 空指针异常
        try {
            int[] nullArr = null;
            System.out.println(nullArr.length); // 尝试访问null数组的长度
        } catch (NullPointerException e) {
            System.out.println("\n捕获到NullPointerException: " + e.getMessage());
        }

        // 3. NegativeArraySizeException 负数组大小异常
        try {
            int[] negativeSizeArr = new int[-5]; // 尝试创建大小为负数的数组
        } catch (NegativeArraySizeException e) {
            System.out.println("\n捕获到NegativeArraySizeException: " + e.getMessage());
        }

        // 4. ArrayStoreException 数组存储异常
        try {
            Object[] _objArr = new String[3];
            _objArr[0] = 123; // 尝试将Integer存入String数组
        } catch (ArrayStoreException e) {
            System.out.println("\n捕获到ArrayStoreException: " + e.getMessage());
        }

        // ===========================================
        // 14. 数组使用的最佳实践
        // ===========================================
        /*
         * 数组最佳实践：
         *   - 始终检查数组索引是否越界
         *   - 使用增强for循环简化遍历
         *   - 优先使用Arrays工具类
         *   - 考虑使用集合类代替数组（当需要动态大小时）
         *   - 大型数组考虑使用并行操作
         *   - 防御性编程：对可能为null的数组进行检查
         */
        System.out.println("\n14. 数组使用的最佳实践");

        // 1. 安全的数组访问
        int[] safeArr = {1, 2, 3, 4, 5};
        int indexToAccess = 5;
        if (indexToAccess >= 0 && indexToAccess < safeArr.length) {
            System.out.println("安全访问元素: " + safeArr[indexToAccess]);
        } else {
            System.out.println("索引 " + indexToAccess + " 越界");
        }

        // 2. 使用增强for循环
        System.out.println("\n使用增强for循环遍历:");
        for (int num : safeArr) {
            System.out.print(num + " ");
        }
        System.out.println();

        // 3. 优先使用Arrays工具类
        int[] unsorted = {5, 3, 1, 4, 2};
        System.out.println("\n排序前: " + Arrays.toString(unsorted));
        Arrays.sort(unsorted); // 使用Arrays.sort()而不是手动实现
        System.out.println("排序后: " + Arrays.toString(unsorted));

        // 4. 大型数组使用并行操作
        int[] bigArray = new int[1000000];
        Arrays.parallelSetAll(bigArray, i -> i * 2);
        System.out.println("\n大型数组前5个元素: " +
                Arrays.toString(Arrays.copyOf(bigArray, 5)));

        // 5. 防御性编程：检查null
        int[] possibleNullArray = getMaybeNullArray();
        if (possibleNullArray != null) {
            System.out.println("\n数组长度: " + possibleNullArray.length);
        } else {
            System.out.println("\n数组为null");
        }

        // ===========================================
        // 15. 数组与集合的选择
        // ===========================================
        /*
         * 数组 vs 集合：
         *   - 数组优点：
         *     * 性能更高（内存连续，访问速度快）
         *     * 基本类型支持更好
         *     * 多维数组实现简单
         *   - 集合优点：
         *     * 动态大小
         *     * 丰富的API支持
         *     * 更好的类型安全（泛型）
         *
         * 选择建议：
         *   - 固定大小、性能关键：使用数组
         *   - 需要动态调整、复杂操作：使用集合
         */
        System.out.println("\n15. 数组与集合的选择");

        // 数组示例（固定大小，性能敏感）
        int[] highPerformanceArray = new int[1000];
        for (int i = 0; i < highPerformanceArray.length; i++) {
            highPerformanceArray[i] = i * i;
        }

        // 集合示例（动态大小，丰富操作）
        List<Integer> flexibleList = new ArrayList<>();
        for (int i = 0; i < 1000; i++) {
            flexibleList.add(i * i);
        }
        flexibleList.remove(0); // 动态调整大小
        System.out.println("集合大小: " + flexibleList.size());

        // ===========================================
        // 16. 数组性能优化技巧
        // ===========================================
        /*
         * 数组性能优化：
         *   - 批量操作优于单元素操作
         *   - 系统原生拷贝优于循环拷贝
         *   - 避免频繁扩容
         *   - 考虑缓存友好性（顺序访问）
         *   - 大型数组使用并行处理
         */
        System.out.println("\n16. 数组性能优化技巧");

        // 1. 批量操作 vs 单元素操作
        int[] source = new int[10000];
        int[] dest1 = new int[10000];
        int[] dest2 = new int[10000];

        // 方式1：单元素赋值（慢）
        long start = System.currentTimeMillis();
        for (int i = 0; i < source.length; i++) {
            dest1[i] = source[i];
        }
        long time1 = System.currentTimeMillis() - start;

        // 方式2：系统批量拷贝（快）
        start = System.currentTimeMillis();
        System.arraycopy(source, 0, dest2, 0, source.length);
        long time2 = System.currentTimeMillis() - start;

        System.out.printf("单元素赋值耗时: %dms, 批量拷贝耗时: %dms\n", time1, time2);

        // 2. 缓存友好性示例
        int[][] matrix = new int[10000][10000];

        // 不友好的访问方式（按列访问）
        start = System.currentTimeMillis();
        for (int col = 0; col < matrix[0].length; col++) {
            for (int row = 0; row < matrix.length; row++) {
                matrix[row][col] = row + col;
            }
        }
        long badTime = System.currentTimeMillis() - start;

        // 友好的访问方式（按行访问）
        start = System.currentTimeMillis();
        for (int row = 0; row < matrix.length; row++) {
            for (int col = 0; col < matrix[row].length; col++) {
                matrix[row][col] = row + col;
            }
        }
        long goodTime = System.currentTimeMillis() - start;

        System.out.printf("不友好访问耗时: %dms, 友好访问耗时: %dms\n", badTime, goodTime);

        // ===========================================
        // 17. 现代Java中的数组新特性
        // ===========================================
        /*
         * Java新版本数组特性：
         *   - Java 8: Stream API支持
         *   - Java 9: 新增Arrays.compare()/mismatch()方法
         *   - Java 11: var关键字简化数组声明
         *   - Java 17: 增强的数组工具方法
         */
        System.out.println("\n17. 现代Java中的数组新特性");

        // Java 8 Stream API
        int[] numbers = {1, 2, 3, 4, 5};
        System.out.println("Stream处理结果: " +
                Arrays.stream(numbers)
                        .filter(n -> n % 2 == 0)
                        .map(n -> n * 2)
                        .sum());

        // Java 9+ 比较方法
        int[] _arr1 = {1, 2, 3};
        int[] _arr2 = {1, 2, 4};
        System.out.println("\n数组比较结果: " + Arrays.compare(_arr1, _arr2));

        // Java 10+ var关键字
        var varArray = new int[]{1, 2, 3}; // 类型推断
        System.out.println("var声明的数组: " + Arrays.toString(varArray));


    }

    // 辅助方法：模拟可能返回null的数组
    private static int[] getMaybeNullArray() {
        return Math.random() > 0.5 ? new int[]{1, 2, 3} : null;
    }

    // 辅助方法：打印数组
    private static void printArray(int[] arr) {
        System.out.println("\n匿名数组作为参数: " + Arrays.toString(arr));
    }
}