package commonlyUsedClasses._lang;

public class _String {
    public static void main(String[] args) {
        // =============================
        // 创建字符串
        // =============================
        // 使用字符串字面量创建字符串
        String str1 = "Hello, World!";
        // 使用 new 关键字创建字符串对象
        String str2 = new String("Hello, Java!");
        // 从字符数组创建字符串
        char[] charArray = {'H', 'e', 'l', 'l', 'o'};
        String str3 = new String(charArray);

        System.out.println("str1: " + str1);
        System.out.println("str2: " + str2);
        System.out.println("str3: " + str3);

        // =============================
        // 获取字符串长度
        // =============================
        // 使用 length() 方法获取字符串的长度
        int lengthStr1 = str1.length();
        System.out.println("Length of str1: " + lengthStr1);

        // =============================
        // 比较字符串
        // =============================
        // 使用 equals() 方法比较两个字符串的内容是否相同
        boolean isEqual = str1.equals(str2);
        System.out.println("str1 equals str2: " + isEqual);

        // 使用 equalsIgnoreCase() 方法忽略大小写比较两个字符串
        boolean isIgnoreCaseEqual = str1.equalsIgnoreCase("hello, world!");
        System.out.println("str1 equalsIgnoreCase \"hello, world!\": " + isIgnoreCaseEqual);

        // =============================
        // 查找子串
        // =============================
        // 使用 indexOf() 方法查找字符或子串第一次出现的位置
        int indexOfWorld = str1.indexOf("World");
        System.out.println("Index of \"World\" in str1: " + indexOfWorld);

        // 使用 lastIndexOf() 方法查找字符或子串最后一次出现的位置
        int lastIndexOfO = str1.lastIndexOf('o');
        System.out.println("Last index of 'o' in str1: " + lastIndexOfO);

        // =============================
        // 提取子串
        // =============================
        // 使用 substring(int beginIndex) 方法提取从指定索引开始到末尾的子串
        String subStr = str1.substring(7);
        System.out.println("Substring from index 7: " + subStr);

        // 使用 substring(int beginIndex, int endIndex) 方法提取从 beginIndex 到 endIndex-1 的子串
        String subStrRange = str1.substring(0, 5);
        System.out.println("Substring from index 0 to 5: " + subStrRange);

        // =============================
        // 替换字符或子串
        // =============================
        // 使用 replace(char oldChar, char newChar) 方法替换所有出现的旧字符为新字符
        String replacedStr = str1.replace('o', 'a');
        System.out.println("Replace 'o' with 'a': " + replacedStr);

        // 使用 replace(CharSequence target, CharSequence replacement) 方法替换所有出现的目标子串为新的子串
        String replacedSubStr = str1.replace("World", "Universe");
        System.out.println("Replace \"World\" with \"Universe\": " + replacedSubStr);

        // =============================
        // 分割字符串
        // =============================
        // 使用 split(String regex) 方法根据正则表达式分割字符串
        String[] splitArray = str1.split(",");
        for (String part : splitArray) {
            System.out.println("Split by \",\": " + part.trim());
        }

        // =============================
        // 转换大小写
        // =============================
        // 使用 toLowerCase() 方法将字符串转换为小写
        String lowerCaseStr = str1.toLowerCase();
        System.out.println("Lowercase: " + lowerCaseStr);

        // 使用 toUpperCase() 方法将字符串转换为大写
        String upperCaseStr = str1.toUpperCase();
        System.out.println("Uppercase: " + upperCaseStr);

        // =============================
        // 去除空白字符
        // =============================
        // 使用 trim() 方法去除字符串两端的空白字符
        String stringWithSpaces = "   Hello, World!   ";
        String trimmedStr = stringWithSpaces.trim();
        System.out.println("Original: \"" + stringWithSpaces + "\"");
        System.out.println("Trimmed: \"" + trimmedStr + "\"");

        // =============================
        // 格式化字符串
        // =============================
        // 使用 String.format() 方法格式化字符串
        String formattedStr = String.format("Name: %s, Age: %d, Height: %.2f", "Alice", 30, 5.6789);
        System.out.println("Formatted String: " + formattedStr);
    }
}



