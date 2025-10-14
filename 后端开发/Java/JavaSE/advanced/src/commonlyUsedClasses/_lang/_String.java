package commonlyUsedClasses._lang;

/*
 * String 类详解
 *
 * 1. String类的理解
 *    - 类的声明：
 *      public final class String implements java.io.Serializable, Comparable<String>, CharSequence, Constable, ConstantDesc
 *      - final: String是不可被继承的
 *      - java.io.Serializable: 实现可序列化接口 意味着可以通过网络或本地流进行数据的传输
 *      - Comparable<String>: 实现Comparable接口 意味着可以对String对象进行排序
 *      - CharSequence: 实现CharSequence接口 意味着可以作为字符序列进行操作
 *      - Constable&ConstantDesc: 强调不可变特性
 *
 *    - 内部声明的属性：
 *      - private final byte[] value: 用于存储字符串的字符数组
 *
 * 2. 字符串常量的存储位置：
 *    - 字符串常量池（String Constant Pool）：位于堆内存中的一部分区域，用于存储字符串字面量。
 *    - 字符串常量池不允许存放两个相同的字符串常量 当使用字符串字面量创建字符串时，如果池中已经存在相同的字符串，则直接引用该字符串。
 *    - 使用 new 关键字创建的字符串对象会在堆内存中创建一个新的实例。
 *
 * 3. String 不可变性的理解：见 demonstrateImmutability()
 *
 * 4. String 实例化的两种方式：
 *    - 使用字符串字面量：例如 `String str = "Hello, World!";`
 *    - 使用 new 关键字：例如 `String str = new String("Hello, World!");`
 */

public class _String {
    public static void main(String[] args) {
        // 创建字符串
        demonstrateStringCreation();
        // 演示 String 的不可变性
        demonstrateImmutability();
        // 调用所有常用方法的方法
        demonstrateAllMethods();
    }

    // 创建字符串
    private static void demonstrateStringCreation() {
        System.out.println("\n=== 字符串创建 ===");

        /*
         * 方式1：使用字符串字面量创建
         * - 内存情况：
         *   1. 首先检查字符串常量池中是否存在"Hello, World!"这个字符串
         *   2. 如果存在，则str1直接引用常量池中的这个字符串对象
         *   3. 如果不存在，则在字符串常量池中创建这个字符串对象，然后str1引用它
         * - 特点：
         *   - 节省内存，相同字面量会共享同一个对象
         *   - 字符串常量池位于堆内存的永久代(JDK7前)或堆内存(JDK7及以后)
         */
        String str1 = "Hello, World!"; // 使用字符串字面量创建字符串

        /*
         * 方式2：使用new关键字创建
         * - 内存情况：
         *   1. 首先检查字符串常量池中是否存在"Hello, Java!"这个字符串
         *   2. 不管常量池中是否存在，都会在堆内存中创建一个新的String对象
         *   3. str2引用的是堆内存中新创建的这个对象
         * - 特点：
         *   - 每次new都会创建新的对象，即使内容相同
         *   - 如果常量池中没有该字符串，会先在常量池创建，再在堆中创建
         */
        String str2 = new String("Hello, Java!"); // 使用 new 关键字创建字符串对象

        /*
         * 方式3：从字符数组创建
         * - 构造器：String(char[] value)
         * - 内存情况：
         *   1. 在堆内存中直接创建一个新的String对象
         *   2. 不会检查字符串常量池，也不会将内容放入常量池
         *   3. str3引用的是堆内存中新创建的这个对象
         * - 特点：
         *   - 完全独立的对象，与常量池无关
         *   - 适合需要从可变字符数组创建不可变字符串的场景
         */
        char[] charArray = {'H', 'e', 'l', 'l', 'o'};
        String str3 = new String(charArray); // 使用 new 关键字 从字符数组创建字符串对象

        /*
         * 方式4：从字符数组部分创建
         * - 构造器：String(char[] value, int offset, int count)
         * - 参数说明：
         *   - value: 源字符数组
         *   - offset: 起始偏移量(从0开始)
         *   - count: 要使用的字符数量
         * - 特点：
         *   - 可以从大数组中提取部分字符创建字符串
         *   - 同样不会使用字符串常量池
         */
        String str4 = new String(charArray, 1, 3); // 从索引1开始，取3个字符

        /*
         * 方式5：从字节数组创建
         * - 构造器：String(byte[] bytes)
         * - 特点：
         *   - 使用平台默认字符集解码字节数组
         *   - 适用于从网络或文件读取的字节数据转换为字符串
         */
        byte[] byteArray = {72, 101, 108, 108, 111};
        String str5 = new String(byteArray); // ASCII码对应的"Hello"

        /*
         * 方式6：从字节数组部分创建(指定字符集)
         * - 构造器：String(byte[] bytes, int offset, int length, String charsetName)
         * - 参数说明：
         *   - bytes: 源字节数组
         *   - offset: 起始偏移量
         *   - length: 要使用的字节数
         *   - charsetName: 字符集名称(如"UTF-8")
         * - 特点：
         *   - 可以显式指定字符集，避免编码问题
         *   - 适合处理多语言文本
         */
        try {
            String str6 = new String(byteArray, 0, 5, "UTF-8");
            System.out.println("从字节数组(UTF-8)创建: " + str6);
        } catch (java.io.UnsupportedEncodingException e) {
            e.printStackTrace();
        }

        /*
         * 方式7：从StringBuffer或StringBuilder创建
         * - 构造器：String(StringBuffer buffer) 和 String(StringBuilder builder)
         * - 特点：
         *   - 将可变字符串转换为不可变字符串
         *   - 线程安全考虑：会复制一份内容，与原对象解耦
         */
        StringBuilder sb = new StringBuilder("Hello from StringBuilder");
        String str7 = new String(sb);

        System.out.println("字符串字面量创建: " + str1);
        System.out.println("new关键字创建: " + str2);
        System.out.println("new关键字 从字符数组创建: " + str3);
        System.out.println("从字符数组部分创建: " + str4);
        System.out.println("从字节数组创建: " + str5);
        System.out.println("从StringBuilder创建: " + str7);

        /*
         * 其他不常用但重要的构造器：
         * 1. String(int[] codePoints, int offset, int count)
         *    - 从Unicode代码点数组创建字符串
         *    - 适合处理补充字符(超出基本多语言平面的字符)
         *
         * 2. String(String original)
         *    - 虽然不常用，但可以创建原字符串的副本
         *    - 在极少数需要切断与原字符串联系时使用
         *
         * 3. String(byte[] bytes, Charset charset)
         *    - Java 1.6+推荐使用的字符集构造器
         *    - 比指定字符集名称更高效
         */

        /*
         * 内存布局示例：
         *
         * 字符串常量池 (可能)           堆内存
         * +-------------------+       +-------------------+
         * | "Hello, World!"   | <---- str1
         * | "Hello, Java!"    |       +-------------------+
         * +-------------------+       | new String("Hello, Java!") | <---- str2
         *                            +-------------------+
         *                            | new String({'H'...})        | <---- str3
         *                            +-------------------+
         *                            | new String(byte[])          | <---- str5
         *                            +-------------------+
         *                            | new String(sb)               | <---- str7
         *                            +-------------------+
         *
         * 关键点：
         * - str1直接指向常量池
         * - str2指向堆中的新对象，该对象可能(但不一定)指向常量池中的相同内容
         * - str3,str4,str5,str7完全独立，与常量池无关
         */
    }

    // 演示 String 的不可变性
    private static void demonstrateImmutability() {
        System.out.println("\n=== String 不可变性演示 ===");

        // 1. 原始字符串
        String original = "Hello";
        System.out.println("原始字符串: " + original + " (hashCode: " + original.hashCode() + ")");

        // 2. 尝试修改字符串 - 拼接操作
        String modified = original.concat(" World");
        System.out.println("拼接后原始字符串: " + original + " (hashCode: " + original.hashCode() + ")");
        System.out.println("拼接后新字符串: " + modified + " (hashCode: " + modified.hashCode() + ")");

        // 3. 尝试修改字符串 - 替换操作
        String replaced = original.replace('H', 'h');
        System.out.println("替换后原始字符串: " + original + " (hashCode: " + original.hashCode() + ")");
        System.out.println("替换后新字符串: " + replaced + " (hashCode: " + replaced.hashCode() + ")");

        // 4. 字符串连接的特殊情况
        String s1 = "Java";
        String s2 = s1;
        System.out.println("\n初始状态:");
        System.out.println("s1: " + s1 + " (hashCode: " + s1.hashCode() + ")");
        System.out.println("s2: " + s2 + " (hashCode: " + s2.hashCode() + ")");

        s1 += " Programming"; // 看起来像是修改了s1，实际上是创建了新对象
        System.out.println("\n执行 s1 += \" Programming\" 后:");
        System.out.println("s1: " + s1 + " (hashCode: " + s1.hashCode() + ")");
        System.out.println("s2: " + s2 + " (hashCode: " + s2.hashCode() + ")");

        /*
         * String 不可变性相关知识:
         *
         * 1. 什么是不可变性?
         *    - 一旦String对象被创建，它的值就不能被改变
         *    - 所有看似修改String的操作(如concat, replace, toUpperCase等)实际上都返回一个新String对象
         *    - 原始String对象保持不变
         *
         * 2. 为什么String设计为不可变?
         *    - 安全性: String常用于网络连接、文件路径等，不可变性防止被意外修改
         *    - 线程安全: 不可变对象天生线程安全，无需同步
         *    - 缓存哈希码: String的hashCode()方法会缓存计算结果，因为值不会变
         *    - 字符串池优化: 允许字符串常量池的存在，节省内存
         *
         * 3. 技术实现:
         *    - String类被声明为final，防止被继承和修改
         *    - 内部存储字符的byte[]数组是private final的
         *    - 不提供任何能修改内部数组的公共方法
         *
         * 4. 内存影响:
         *    - 每次"修改"都会创建新对象，可能影响性能
         *    - 对于频繁字符串操作，建议使用StringBuilder或StringBuffer
         *
         * 5. 特殊案例:
         *    - 字符串字面量("abc")会在编译时放入字符串常量池
         *    - 使用new String("abc")会在堆中创建新对象
         *    - 运行时拼接的字符串(如s1+s2)会创建新对象
         */
    }

    // 常用方法
    private static void demonstrateAllMethods() {
        demonstrateLength(); // 字符串长度获取/length
        demonstrateIsEmpty(); // 判断字符串是否为空/isEmpty
        demonstrateConcat(); // 字符串连接/concat
        demonstrateEquals(); // 字符串内容比较/equals
        demonstrateEqualsIgnoreCase(); // 忽略大小写比较/equalsIgnoreCase
        demonstrateCompareTo(); // 字符串排序比较/compareTo
        demonstrateCompareToIgnoreCase(); // 忽略大小写排序比较/compareToIgnoreCase
        demonstrateCaseConversion(); // 大小写转换/toLowerCase/toUpperCase
        demonstrateTrimming(); // 去除两端空白/trim
        demonstrateIntern(); // 字符串池化/intern
        demonstrateSubstringSearch(); // 查找子串/indexOf/lastIndexOf/contains
        demonstrateSubstringExtraction(); // 子串提取/substring
        demonstrateReplacement(); // 字符串替换/replace
        demonstrateReplacementAdvanced(); // 高级替换/replaceAll/replaceFirst
        demonstrateSplitting(); // 字符串分割/split
        demonstrateFormatting(); // 字符串格式化/format
        demonstrateCharAt(); // 获取指定位置字符/charAt
        demonstrateToCharArray(); // 转换为字符数组/toCharArray
        demonstrateValueOf(); // 其他类型转字符串/valueOf
        demonstrateCopyValueOf(); // 字符数组转字符串/copyValueOf
        demonstrateStartsWith(); // 检查前缀/startsWith
        demonstrateEndsWith();   // 检查后缀/endsWith
        demonstrateStringConcatenation(); // 字符串连接操作分析
    }

    // 获取字符串长度
    private static void demonstrateLength() {
        System.out.println("\n=== 字符串长度 ===");

        String str = "Hello, World!";
        int length = str.length();

        System.out.println("字符串: " + str);
        System.out.println("长度: " + length);
    }

    // 判断字符串是否为空/isEmpty
    private static void demonstrateIsEmpty() {
        System.out.println("\n=== 判断字符串是否为空/isEmpty ===");

        String emptyStr = "";
        String blankStr = " ";
        String normalStr = "Hello";

        System.out.println("\"\" 是否为空: " + emptyStr.isEmpty()); // true
        System.out.println("\" \" 是否为空: " + blankStr.isEmpty()); // false
        System.out.println("\"Hello\" 是否为空: " + normalStr.isEmpty()); // false

        /*
         * 注意事项：
         * 1. isEmpty() 判断的是字符串长度是否为0
         * 2. 仅包含空白字符的字符串不算空
         * 3. 与isBlank()不同(Java 11+)，isBlank()会将空白字符视为空
         */
    }

    // 字符串连接/concat
    private static void demonstrateConcat() {
        System.out.println("\n=== 字符串连接/concat ===");

        String str1 = "Hello";
        String str2 = "World";
        String result = str1.concat(", ").concat(str2);

        System.out.println("连接结果: " + result); // Hello, World

        /*
         * 特点：
         * 1. 每次concat都会创建新String对象
         * 2. 性能不如StringBuilder，适合少量连接
         * 3. 与+操作符不同，+会被编译器优化为StringBuilder
         */
    }

    // 字符串内容比较/equals
    private static void demonstrateEquals() {
        System.out.println("\n=== 字符串内容比较/equals ===");

        String str1 = "Java";
        String str2 = "Java";
        String str3 = new String("Java");
        String str4 = "java";

        System.out.println("str1 equals str2: " + str1.equals(str2)); // true
        System.out.println("str1 equals str3: " + str1.equals(str3)); // true
        System.out.println("str1 equals str4: " + str1.equals(str4)); // false

        /*
         * 注意事项：
         * 1. 比较的是内容而非引用
         * 2. 比==更安全，能正确处理new String的情况
         * 3. 注意null检查，str.equals(null)会抛NPE
         */
    }

    // 忽略大小写比较/equalsIgnoreCase
    private static void demonstrateEqualsIgnoreCase() {
        System.out.println("\n=== 忽略大小写比较/equalsIgnoreCase ===");

        String str1 = "Java";
        String str2 = "JAVA";
        String str3 = "java";

        System.out.println("str1 equalsIgnoreCase str2: " + str1.equalsIgnoreCase(str2)); // true
        System.out.println("str1 equalsIgnoreCase str3: " + str1.equalsIgnoreCase(str3)); // true

        /*
         * 特点：
         * 1. 不区分大小写比较
         * 2. 适用于用户名、验证码等场景
         * 3. 比toLowerCase()+equals()组合更高效
         */
    }

    // 字符串排序比较/compareTo
    private static void demonstrateCompareTo() {
        System.out.println("\n=== 字符串排序比较/compareTo ===");

        String str1 = "Apple";
        String str2 = "Banana";
        String str3 = "apple";

        System.out.println("Apple compareTo Banana: " + str1.compareTo(str2)); // 负数
        System.out.println("Banana compareTo Apple: " + str2.compareTo(str1)); // 正数
        System.out.println("Apple compareTo apple: " + str1.compareTo(str3)); // 负数(ASCII码比较)

        /*
         * 返回值说明：
         * 负数 - 当前字符串字典序在前
         * 0    - 字符串内容相同
         * 正数 - 当前字符串字典序在后
         *
         * 注意：
         * 1. 区分大小写(A < a)
         * 2. 常用于排序
         */
    }

    // 忽略大小写排序比较/compareToIgnoreCase
    private static void demonstrateCompareToIgnoreCase() {
        System.out.println("\n=== 忽略大小写排序比较/compareToIgnoreCase ===");

        String str1 = "Apple";
        String str2 = "apple";

        System.out.println("Apple compareToIgnoreCase apple: " + str1.compareToIgnoreCase(str2)); // 0

        /*
         * 特点：
         * 1. 不区分大小写的字典序比较
         * 2. 返回值规则与compareTo相同
         * 3. 适用于不区分大小写的排序
         */
    }


    // 查找子串/indexOf/lastIndexOf/contains
    private static void demonstrateSubstringSearch() {
        System.out.println("\n=== 子串查找 ===");

        String str = "Hello, World! Welcome to Java World!";

        // 查找子串第一次出现的位置
        int firstIndex = str.indexOf("World");
        // 查找子串最后一次出现的位置
        int lastIndex = str.lastIndexOf("World");
        // 查找字符第一次出现的位置
        int charIndex = str.indexOf('W');
        // 检查是否包含指定子串
        boolean containsJava = str.contains("Java");
        boolean containsPython = str.contains("Python");

        System.out.println("字符串: " + str);
        System.out.println("\"World\" 第一次出现的位置: " + firstIndex);
        System.out.println("\"World\" 最后一次出现的位置: " + lastIndex);
        System.out.println("'W' 第一次出现的位置: " + charIndex);
        System.out.println("是否包含\"Java\": " + containsJava);
        System.out.println("是否包含\"Python\": " + containsPython);
    }

    // 提取子串
    private static void demonstrateSubstringExtraction() {
        System.out.println("\n=== 子串提取 ===");

        String str = "Hello, World!";

        // 从指定位置提取到末尾
        String sub1 = str.substring(7);
        // 提取指定范围内的子串
        String sub2 = str.substring(0, 5); // [beginIndex, endIndex)

        System.out.println("原始字符串: " + str);
        System.out.println("从索引7开始的子串: " + sub1);
        System.out.println("从索引0到5的子串: " + sub2);
    }

    // 替换字符或子串
    private static void demonstrateReplacement() {
        System.out.println("\n=== 字符串替换 ===");

        String str = "Hello, World!";

        // 替换字符
        String replacedChar = str.replace('o', 'a');
        // 替换子串
        String replacedSub = str.replace("World", "Java");

        System.out.println("原始字符串: " + str);
        System.out.println("替换字符'o'为'a': " + replacedChar);
        System.out.println("替换子串\"World\"为\"Java\": " + replacedSub);
    }

    // 高级替换/replaceAll/replaceFirst
    private static void demonstrateReplacementAdvanced() {
        System.out.println("\n=== 高级字符串替换 ===");

        String text = "The quick brown fox jumps over the lazy dog. The dog is not lazy really.";

        // replaceAll - 替换所有匹配正则表达式的部分
        String replacedAll = text.replaceAll("(?i)the", "A"); // 不区分大小写替换
        String replacedDigits = "123abc456".replaceAll("\\d", "X"); // 替换所有数字

        // replaceFirst - 只替换第一个匹配正则表达式的部分
        String replacedFirst = text.replaceFirst("dog", "cat");
        String replacedFirstDigit = "123abc456".replaceFirst("\\d", "X");

        System.out.println("原始文本: " + text);
        System.out.println("\nreplaceAll不区分大小写替换\"the\":\n" + replacedAll);
        System.out.println("\nreplaceAll替换所有数字:\n" + replacedDigits);
        System.out.println("\nreplaceFirst替换第一个\"dog\":\n" + replacedFirst);
        System.out.println("\nreplaceFirst替换第一个数字:\n" + replacedFirstDigit);

        // 更复杂的正则表达式示例
        String phoneNumber = "我的电话是: 010-12345678, 另一个是: 021-87654321";
        String maskedPhones = phoneNumber.replaceAll("\\d{3}-\\d{8}", "***-*******");

        System.out.println("\n原始电话号码: " + phoneNumber);
        System.out.println("替换后的电话号码: " + maskedPhones);

        /*
         * replaceAll 方法详解:
         * 1. 方法签名: String replaceAll(String regex, String replacement)
         * 2. 功能: 用replacement替换所有匹配正则表达式regex的子串
         * 3. 正则表达式特殊字符需要转义，如 . 要写成 \\.
         * 4. 支持正则表达式分组引用，如 $1 表示第一个分组
         *
         * replaceFirst 方法详解:
         * 1. 方法签名: String replaceFirst(String regex, String replacement)
         * 2. 功能: 只替换第一个匹配的子串
         * 3. 其他特性与replaceAll相同
         *
         * 与简单replace方法的区别:
         * 1. replace不接受正则表达式，只处理字面字符串
         * 2. replaceAll/replaceFirst功能更强大但性能略低
         *
         * 常用正则表达式示例:
         * 1. 替换所有数字: \\d
         * 2. 替换所有空白字符: \\s
         * 3. 替换所有单词边界: \\bword\\b
         * 4. 不区分大小写: (?i)pattern
         *
         * 注意事项:
         * 1. 复杂正则可能影响性能
         * 2. 替换字符串中的$有特殊含义(引用分组)，需要用\\$转义
         * 3. 对简单字面替换，使用replace性能更好
         */
    }

    // 分割字符串
    private static void demonstrateSplitting() {
        System.out.println("\n=== 字符串分割 ===");

        String str = "Apple,Banana,Orange,Mango";
        String[] fruits = str.split(",");

        System.out.println("原始字符串: " + str);
        System.out.println("分割结果:");
        for (String fruit : fruits) {
            System.out.println("- " + fruit.trim());
        }
    }

    // 转换大小写
    private static void demonstrateCaseConversion() {
        System.out.println("\n=== 大小写转换 ===");

        String str = "Hello, World!";

        String lower = str.toLowerCase();
        String upper = str.toUpperCase();

        System.out.println("原始字符串: " + str);
        System.out.println("转换为小写: " + lower);
        System.out.println("转换为大写: " + upper);
    }

    // 去除空白字符
    private static void demonstrateTrimming() {
        System.out.println("\n=== 空白字符去除 ===");

        String str = "   Hello, World!   ";
        String trimmed = str.trim();

        System.out.println("原始字符串: \"" + str + "\"");
        System.out.println("去除两端空白后: \"" + trimmed + "\"");
    }

    // 字符串池化/intern
    private static void demonstrateIntern() {
        System.out.println("\n=== 字符串池化/intern ===");

        String str1 = new String("Java");
        String str2 = "Java";
        String str3 = str1.intern();

        System.out.println("str1 == str2: " + (str1 == str2)); // false
        System.out.println("str2 == str3: " + (str2 == str3)); // true

        /*
         * intern()方法说明：
         * 1. 将字符串放入常量池(如果池中没有)
         * 2. 返回池中的引用
         * 3. 可以节省内存，但过度使用可能影响性能
         *
         * 使用场景：
         * 1. 大量重复字符串需要去重
         * 2. 需要频繁使用==比较的场景
         */
    }

    // 格式化字符串
    private static void demonstrateFormatting() {
        System.out.println("\n=== 字符串格式化 ===");

        String name = "Alice";
        int age = 30;
        double height = 5.6789;

        String formatted = String.format("Name: %s, Age: %d, Height: %.2f",
          name, age, height);

        System.out.println("格式化结果: " + formatted);
    }

    // 获取指定位置字符/charAt
    private static void demonstrateCharAt() {
        System.out.println("\n=== 获取指定位置字符/charAt ===");

        String str = "Hello, Java!";
        char firstChar = str.charAt(0);
        char lastChar = str.charAt(str.length() - 1);

        System.out.println("字符串: " + str);
        System.out.println("第一个字符: " + firstChar); // H
        System.out.println("最后一个字符: " + lastChar); // !

        try {
            char outOfBoundChar = str.charAt(100); // 抛出StringIndexOutOfBoundsException
        } catch (StringIndexOutOfBoundsException e) {
            System.out.println("捕获异常: " + e.getMessage());
        }

        /*
         * 注意事项：
         * 1. 索引从0开始
         * 2. 索引范围是0到length()-1
         * 3. 超出范围会抛出StringIndexOutOfBoundsException
         * 4. 适合随机访问单个字符
         */
    }

    // 转换为字符数组/toCharArray
    private static void demonstrateToCharArray() {
        System.out.println("\n=== 转换为字符数组/toCharArray ===");

        String str = "Java";
        char[] charArray = str.toCharArray();

        System.out.println("原始字符串: " + str);
        System.out.print("字符数组内容: ");
        for (char c : charArray) {
            System.out.print(c + " ");
        }
        // 输出: J a v a

        // 修改字符数组不会影响原字符串
        charArray[0] = 'j';
        System.out.println("\n修改后的字符数组: " + new String(charArray)); // java
        System.out.println("原字符串保持不变: " + str); // Java

        /*
         * 特点：
         * 1. 返回字符串的字符数组副本
         * 2. 修改返回的数组不会影响原字符串
         * 3. 适合需要操作单个字符的场景
         * 4. 比charAt()更高效地遍历所有字符
         */
    }

    // 其他类型转字符串/valueOf
    private static void demonstrateValueOf() {
        System.out.println("\n=== 其他类型转字符串/valueOf ===");

        // 基本数据类型
        String intStr = String.valueOf(123);
        String doubleStr = String.valueOf(3.14);
        String boolStr = String.valueOf(true);

        // 对象类型
        String objStr = String.valueOf(new Object());

        // char数组
        char[] chars = {'J', 'a', 'v', 'a'};
        String charArrStr = String.valueOf(chars);
        String charArrSubStr = String.valueOf(chars, 1, 2); // 从索引1开始，取2个字符

        System.out.println("int转字符串: " + intStr); // 123
        System.out.println("double转字符串: " + doubleStr); // 3.14
        System.out.println("boolean转字符串: " + boolStr); // true
        System.out.println("Object转字符串: " + objStr); // java.lang.Object@...
        System.out.println("char数组转字符串: " + charArrStr); // Java
        System.out.println("char数组部分转字符串: " + charArrSubStr); // av

        /*
         * 特点：
         * 1. 重载方法支持所有基本类型和Object
         * 2. 对于null对象返回"null"字符串而非抛出异常
         * 3. 比直接调用toString()更安全
         * 4. char数组版本可以指定偏移和长度
         */
    }

    // 字符数组转字符串/copyValueOf
    private static void demonstrateCopyValueOf() {
        System.out.println("\n=== 字符数组转字符串/copyValueOf ===");

        char[] chars = {'P', 'r', 'o', 'g', 'r', 'a', 'm'};

        // 完整数组转换
        String fullStr = String.copyValueOf(chars);
        // 部分数组转换
        String partStr = String.copyValueOf(chars, 2, 3); // 从索引2开始，取3个字符

        System.out.println("完整数组: " + fullStr); // Program
        System.out.println("部分数组: " + partStr); // ogr

        // 修改原数组不影响字符串
        chars[0] = 'p';
        System.out.println("修改数组后字符串: " + fullStr); // Program (不变)

        /*
         * 与valueOf的区别：
         * 1. copyValueOf只有char数组版本
         * 2. 功能上完全等同于valueOf(char[])
         * 3. 方法名更明确表示创建的是副本
         *
         * 注意事项：
         * 1. 总是创建新字符串对象
         * 2. 返回的字符串与原数组无关联
         * 3. 适合需要从字符数组创建独立字符串的场景
         */
    }

    // 检查前缀/startsWith
    private static void demonstrateStartsWith() {
        System.out.println("\n=== 检查前缀/startsWith ===");

        String str = "Java Programming";

        // 简单前缀检查
        boolean startsWithJava = str.startsWith("Java");
        boolean startsWithHello = str.startsWith("Hello");

        // 带偏移量的前缀检查
        boolean startsWithPro = str.startsWith("Pro", 5); // 从索引5开始检查

        System.out.println("字符串: " + str);
        System.out.println("是否以\"Java\"开头: " + startsWithJava); // true
        System.out.println("是否以\"Hello\"开头: " + startsWithHello); // false
        System.out.println("从索引5开始是否以\"Pro\"开头: " + startsWithPro); // true

        /*
         * 方法重载：
         * 1. startsWith(String prefix) - 检查整个字符串是否以指定前缀开头
         * 2. startsWith(String prefix, int offset) - 从指定偏移量开始检查
         *
         * 注意事项：
         * 1. 区分大小写
         * 2. 空字符串("")作为前缀始终返回true
         * 3. offset参数必须在0到length()范围内
         * 4. 比正则表达式更高效的前缀检查
         *
         * 典型应用场景：
         * 1. 文件路径检查
         * 2. URL协议检查(如http://)
         * 3. 命令解析
         */
    }

    // 检查后缀/endsWith
    private static void demonstrateEndsWith() {
        System.out.println("\n=== 检查后缀/endsWith ===");

        String str = "HelloWorld.java";
        String filename = "test.txt";

        boolean endsWithJava = str.endsWith(".java");
        boolean endsWithTxt = filename.endsWith(".txt");
        boolean endsWithEmpty = str.endsWith(""); // 空字符串

        System.out.println("字符串1: " + str);
        System.out.println("字符串2: " + filename);
        System.out.println("\"" + str + "\"是否以\".java\"结尾: " + endsWithJava); // true
        System.out.println("\"" + filename + "\"是否以\".txt\"结尾: " + endsWithTxt); // true
        System.out.println("任何字符串是否以空字符串结尾: " + endsWithEmpty); // true

        /*
         * 特点：
         * 1. 只接受完整后缀检查，没有偏移量参数
         * 2. 区分大小写
         * 3. 空字符串("")作为后缀始终返回true
         *
         * 与startsWith比较：
         * 1. endsWith没有带偏移量的重载版本
         * 2. 实现上endsWith内部是调用startsWith(suffix, length()-suffix.length())
         *
         * 典型应用场景：
         * 1. 文件扩展名检查
         * 2. 域名后缀检查
         * 3. 字符串格式验证
         */
    }

    // 演示String连接操作的内存和地址变化
    private static void demonstrateStringConcatenation() {
        System.out.println("\n=== String连接操作的内存和地址变化 ===");

        // 情况1：常量 + 常量
        String s1 = "Hello" + "World";
        String s1_literal = "HelloWorld";
        System.out.println("\n情况1: 常量 + 常量");
        System.out.println("s1: " + System.identityHashCode(s1));
        System.out.println("s1_literal: " + System.identityHashCode(s1_literal));
        System.out.println("s1 == s1_literal: " + (s1 == s1_literal)); // true

        /*
         * 情况1说明：
         * - 编译期优化：编译器会将"Hello" + "World"直接合并为"HelloWorld"
         * - 两者都指向字符串常量池中的同一个对象
         * - 不会在运行时创建新对象
         */

        // 情况2：常量 + 变量 或 变量 + 变量
        String var = "World";
        String s2 = "Hello" + var;
        String s2_literal = "HelloWorld";
        System.out.println("\n情况2: 常量 + 变量");
        System.out.println("s2: " + System.identityHashCode(s2));
        System.out.println("s2_literal: " + System.identityHashCode(s2_literal));
        System.out.println("s2 == s2_literal: " + (s2 == s2_literal)); // false

        /*
         * 情况2说明：
         * - 运行时创建新String对象
         * - 使用StringBuilder实现拼接
         * - 新对象在堆中，不在常量池
         * - 即使内容相同，也是不同对象
         */

        // 情况3：调用intern()
        String s3 = s2.intern();
        System.out.println("\n情况3: 调用intern()");
        System.out.println("s3: " + System.identityHashCode(s3));
        System.out.println("s3 == s2_literal: " + (s3 == s2_literal)); // true

        /*
         * 情况3说明：
         * - intern()方法会尝试将字符串放入常量池
         * - 如果池中已有，则返回池中的引用
         * - 如果池中没有，则将当前字符串加入池中并返回引用
         * - 可以用于减少重复字符串的内存占用
         */

        // 情况4：concat方法
        String s4 = "Hello".concat("World");
        System.out.println("\n情况4: concat方法");
        System.out.println("s4: " + System.identityHashCode(s4));
        System.out.println("s4 == s1_literal: " + (s4 == s1_literal)); // false

        /*
         * 情况4说明：
         * - concat()方法总是创建新String对象
         * - 不会使用常量池优化
         * - 性能上不如+操作符(因为+会被编译器优化为StringBuilder)
         * - 适合确定需要新对象的场景
         */

        // 额外情况：循环中的字符串拼接
        System.out.println("\n额外情况: 循环中的字符串拼接");
        String loopStr = "";
        for (int i = 0; i < 5; i++) {
            loopStr += i; // 每次循环创建新StringBuilder和String对象
        }
        System.out.println("loopStr: " + loopStr);

        /*
         * 循环拼接说明：
         * - 每次+=操作相当于: loopStr = new StringBuilder().append(loopStr).append(i).toString()
         * - 会产生大量临时对象
         * - 应该改用StringBuilder:
         *   StringBuilder sb = new StringBuilder();
         *   for (int i = 0; i < 5; i++) {
         *       sb.append(i);
         *   }
         *   String result = sb.toString();
         */
    }
}



