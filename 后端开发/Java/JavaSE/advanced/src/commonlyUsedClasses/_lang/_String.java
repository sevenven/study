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
 *    - 当使用字符串字面量创建字符串时，如果池中已经存在相同的字符串，则直接引用该字符串。
 *    - 使用 new 关键字创建的字符串对象会在堆内存中创建一个新的实例。
 *
 * 3. String 不可变性的理解：
 *    - 不可变性带来了许多好处，如线程安全、缓存哈希码、节省内存等。
 *    - 不可变性确保了字符串的安全性和一致性。
 *
 * 4. String 实例化的两种方式：
 *    - 使用字符串字面量：例如 `String str = "Hello, World!";`
 *    - 使用 new 关键字：例如 `String str = new String("Hello, World!");`
 */

public class _String {
    public static void main(String[] args) {
        // 创建字符串
        demonstrateStringCreation();
        // 调用所有常用方法的方法
        demonstrateAllMethods();
    }



    // 创建字符串
    private static void demonstrateStringCreation() {
        System.out.println("\n=== 字符串创建 ===");
        String str1 = "Hello, World!"; // 使用字符串字面量创建字符串
        String str2 = new String("Hello, Java!"); // 使用 new 关键字创建字符串对象
        char[] charArray = {'H', 'e', 'l', 'l', 'o'}; // 使用 new 关键字 从字符数组创建字符串 创建字符串对象
        String str3 = new String(charArray);

        System.out.println("字符串字面量创建: " + str1);
        System.out.println("new关键字创建: " + str2);
        System.out.println("new关键字 从字符数组创建: " + str3);
    }

    // 常用方法
    private static void demonstrateAllMethods() {
        demonstrateLength(); // 字符串长度获取
        demonstrateComparison(); // 字符串比较
        demonstrateSubstringSearch(); // 子串查找
        demonstrateSubstringExtraction(); // 子串提取
        demonstrateReplacement(); // 字符串替换
        demonstrateSplitting(); // 字符串分割
        demonstrateCaseConversion(); // 大小写转换
        demonstrateTrimming(); // 空白字符去除
        demonstrateFormatting(); // 字符串格式化
    }

    // 2. 获取字符串长度
    private static void demonstrateLength() {
        System.out.println("\n=== 字符串长度 ===");

        String str = "Hello, World!";
        int length = str.length();

        System.out.println("字符串: " + str);
        System.out.println("长度: " + length);
    }

    // 3. 比较字符串
    private static void demonstrateComparison() {
        System.out.println("\n=== 字符串比较 ===");

        String str1 = "Hello, World!";
        String str2 = "hello, world!";
        String str3 = new String("Hello, World!");

        // equals() 方法比较内容
        boolean isEqual1 = str1.equals(str2);
        boolean isEqual2 = str1.equals(str3);

        // equalsIgnoreCase() 忽略大小写比较
        boolean isIgnoreCaseEqual = str1.equalsIgnoreCase(str2);

        System.out.println("str1 equals str2: " + isEqual1);
        System.out.println("str1 equals str3: " + isEqual2);
        System.out.println("str1 equalsIgnoreCase str2: " + isIgnoreCaseEqual);
    }

    // 4. 查找子串
    private static void demonstrateSubstringSearch() {
        System.out.println("\n=== 子串查找 ===");

        String str = "Hello, World! Welcome to Java World!";

        // 查找子串第一次出现的位置
        int firstIndex = str.indexOf("World");
        // 查找子串最后一次出现的位置
        int lastIndex = str.lastIndexOf("World");
        // 查找字符第一次出现的位置
        int charIndex = str.indexOf('W');

        System.out.println("字符串: " + str);
        System.out.println("\"World\" 第一次出现的位置: " + firstIndex);
        System.out.println("\"World\" 最后一次出现的位置: " + lastIndex);
        System.out.println("'W' 第一次出现的位置: " + charIndex);
    }

    // 5. 提取子串
    private static void demonstrateSubstringExtraction() {
        System.out.println("\n=== 子串提取 ===");

        String str = "Hello, World!";

        // 从指定位置提取到末尾
        String sub1 = str.substring(7);
        // 提取指定范围内的子串
        String sub2 = str.substring(0, 5);

        System.out.println("原始字符串: " + str);
        System.out.println("从索引7开始的子串: " + sub1);
        System.out.println("从索引0到5的子串: " + sub2);
    }

    // 6. 替换字符或子串
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

    // 7. 分割字符串
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

    // 8. 转换大小写
    private static void demonstrateCaseConversion() {
        System.out.println("\n=== 大小写转换 ===");

        String str = "Hello, World!";

        String lower = str.toLowerCase();
        String upper = str.toUpperCase();

        System.out.println("原始字符串: " + str);
        System.out.println("转换为小写: " + lower);
        System.out.println("转换为大写: " + upper);
    }

    // 9. 去除空白字符
    private static void demonstrateTrimming() {
        System.out.println("\n=== 空白字符去除 ===");

        String str = "   Hello, World!   ";
        String trimmed = str.trim();

        System.out.println("原始字符串: \"" + str + "\"");
        System.out.println("去除两端空白后: \"" + trimmed + "\"");
    }

    // 10. 格式化字符串
    private static void demonstrateFormatting() {
        System.out.println("\n=== 字符串格式化 ===");

        String name = "Alice";
        int age = 30;
        double height = 5.6789;

        String formatted = String.format("Name: %s, Age: %d, Height: %.2f",
          name, age, height);

        System.out.println("格式化结果: " + formatted);
    }
}



