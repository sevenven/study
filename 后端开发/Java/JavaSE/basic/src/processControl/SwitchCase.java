package processControl;

public class SwitchCase {
    public static void main(String[] args) {
        System.out.println("===== Java Switch 语句详解与示例 =====");

        // 基本 switch 语句
        basicSwitchStatement();

        // 穿透现象 (fall-through)
        fallThroughExample();

        // switch 与字符串
        switchWithString();

        // switch 与枚举
        switchWithEnum();

        // Java 12+ switch 表达式
        java12SwitchExpression();

        // Java 14+ 模式匹配（预览特性）
        patternMatchingPreview();

        // Java 17+ 增强模式匹配
        enhancedPatternMatching();

        // 最佳实践与常见错误
        bestPracticesAndCommonErrors();
    }

    // 基本 switch 语句
    private static void basicSwitchStatement() {
        System.out.println("\n基本 switch 语句");
        /*
         * 传统 switch 语法：
         *   switch (表达式) {
         *       case 值1:
         *           // 代码块1
         *           break;
         *       case 值2:
         *           // 代码块2
         *           break;
         *       default:
         *           // 默认代码块
         *   }
         *
         * 特点：
         *   - 表达式类型：byte, short, char, int, String, 枚举
         *   - case 值必须是常量表达式
         *   - 需要 break 防止穿透
         */

        int dayOfWeek = 3;
        System.out.print("星期" + dayOfWeek + ": ");

        switch (dayOfWeek) {
            case 1:
                System.out.println("星期一");
                break;
            case 2:
                System.out.println("星期二");
                break;
            case 3:
                System.out.println("星期三");
                break;
            case 4:
                System.out.println("星期四");
                break;
            case 5:
                System.out.println("星期五");
                break;
            case 6:
                System.out.println("星期六");
                break;
            case 7:
                System.out.println("星期日");
                break;
            default:
                System.out.println("无效的星期");
        }
    }

    // 穿透现象 (fall-through)
    private static void fallThroughExample() {
        System.out.println("\n穿透现象 (fall-through)");
        /*
         * 穿透现象：
         *   - 当省略 break 时，程序会继续执行下一个 case
         *   - 有时故意利用穿透实现多个 case 共享代码
         *
         * 注意：大多数情况下需要避免意外穿透
         */

        int month = 2;
        int year = 2023;
        int days = 0;

        System.out.print(month + "月天数: ");
        switch (month) {
            case 1: case 3: case 5: case 7: case 8: case 10: case 12:
                days = 31;
                break;
            case 4: case 6: case 9: case 11:
                days = 30;
                break;
            case 2:
                // 闰年判断
                if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)) {
                    days = 29;
                } else {
                    days = 28;
                }
                break;
            default:
                days = -1; // 无效月份
        }
        System.out.println(days + "天");
    }

    // switch 与字符串
    private static void switchWithString() {
        System.out.println("\nswitch 与字符串");
        /*
         * Java 7+ 支持字符串 switch
         *   - 比较字符串内容（区分大小写）
         *   - 底层使用 equals() 和 hashCode()
         */

        String color = "RED";
        System.out.print("颜色 " + color + " 的RGB值: ");

        switch (color.toLowerCase()) { // 转换为小写处理
            case "red":
                System.out.println("(255, 0, 0)");
                break;
            case "green":
                System.out.println("(0, 255, 0)");
                break;
            case "blue":
                System.out.println("(0, 0, 255)");
                break;
            default:
                System.out.println("未知颜色");
        }
    }

    // switch 与枚举
    private static void switchWithEnum() {
        System.out.println("\nswitch 与枚举");
        /*
         * 枚举 switch：
         *   - 类型安全
         *   - 不需要指定枚举前缀
         *   - 覆盖所有枚举值（或使用 default）
         */

        Direction dir = Direction.EAST;
        System.out.print("方向 " + dir + ": ");

        switch (dir) {
            case NORTH:
                System.out.println("向上移动");
                break;
            case SOUTH:
                System.out.println("向下移动");
                break;
            case EAST:
                System.out.println("向右移动");
                break;
            case WEST:
                System.out.println("向左移动");
                break;
            default:
                System.out.println("无效方向");
        }
    }

    // Java 12+ switch 表达式
    private static void java12SwitchExpression() {
        System.out.println("\nJava 12+ switch 表达式");
        /*
         * 新特性：
         *   - 箭头标签 (->)：替代 break，避免穿透
         *   - 多值 case：case 1,2,3:
         *   - 返回值：switch 可作为表达式返回结果
         *   - yield 关键字：在代码块中返回值
         */

        // 箭头标签和多值 case
        int day = 6;
        String dayType = switch (day) {
            case 1, 2, 3, 4, 5 -> "工作日";
            case 6, 7 -> "周末";
            default -> "无效日期";
        };
        System.out.println("星期" + day + " 是: " + dayType);

        // 使用 yield 返回值
        int num = 5;
        String numberType = switch (num % 2) {
            case 0 -> "偶数";
            case 1 -> {
                if (num > 10) {
                    yield "大奇数";
                } else {
                    yield "小奇数";
                }
            }
            default -> "未知";
        };
        System.out.println(num + " 是: " + numberType);
    }

    // Java 14+ 模式匹配（预览特性）
    private static void patternMatchingPreview() {
        System.out.println("\nJava 14+ 模式匹配（预览特性）");
        /*
         * 模式匹配：
         *   - 允许在 case 中使用类型模式
         *   - 简化 instanceof 检查
         *
         * 注意：需要启用预览特性（--enable-preview）
         */

        Object obj = "Hello Pattern Matching";
        // 传统方式
        if (obj instanceof String) {
            String s = (String) obj;
            System.out.println("字符串长度: " + s.length());
        }

        // 模式匹配方式（预览）
        /*
        switch (obj) {
            case String s ->
                System.out.println("字符串长度: " + s.length());
            case Integer i ->
                System.out.println("整数值: " + i);
            case Double d ->
                System.out.println("浮点值: " + d);
            case null ->
                System.out.println("对象为null");
            default ->
                System.out.println("未知类型");
        }
        */
        System.out.println("模式匹配需要Java 17+并启用预览特性");
    }

    // Java 17+ 增强模式匹配
    private static void enhancedPatternMatching() {
        System.out.println("\nJava 17+ 增强模式匹配");
        /*
         * Java 17 正式特性：
         *   - 模式匹配成为正式特性
         *   - 支持 null 检查
         *   - 支持守卫条件（when）
         */

        // 实际Java 17代码示例（注释中展示）
        /*
        Object obj2 = 42;
        String result = switch (obj2) {
            case null -> "空对象";
            case String s -> "字符串: " + s;
            case Integer i && i > 0 -> "正整数: " + i; // 守卫条件
            case Integer i -> "整数: " + i;
            case Double d -> "双精度: " + d;
            default -> "其他类型";
        };
        System.out.println(result);
        */
        System.out.println("Java 17模式匹配示例: 正整数: 42");
    }

    // 最佳实践与常见错误
    private static void bestPracticesAndCommonErrors() {
        System.out.println("\n最佳实践与常见错误");

        // 错误1: 忘记 break
        int x = 1;
        System.out.println("忘记 break 示例:");
        switch (x) {
            case 1:
                System.out.println("x=1");
                // 缺少 break
            case 2:
                System.out.println("x=2");
                break;
            default:
                System.out.println("默认");
        }

        // 错误2: default 位置不当
        System.out.println("\ndefault 位置不当:");
        int y = 3;
        switch (y) {
            default: // 应放在最后
                System.out.println("默认");
            case 1:
                System.out.println("y=1");
                break;
            case 2:
                System.out.println("y=2");
                break;
        }

        // 最佳实践1: 使用新式 switch 表达式
        System.out.println("\n最佳实践: 使用 switch 表达式");
        int month = 5;
        String season = switch (month) {
            case 12, 1, 2 -> "冬季";
            case 3, 4, 5 -> "春季";
            case 6, 7, 8 -> "夏季";
            case 9, 10, 11 -> "秋季";
            default -> "无效月份";
        };
        System.out.println(month + "月属于: " + season);

        // 最佳实践2: 枚举 switch 覆盖所有情况
        System.out.println("\n最佳实践: 枚举覆盖所有情况");
        Direction[] directions = Direction.values();
        for (Direction direction : directions) {
            String action = switch (direction) {
                case NORTH -> "向北";
                case SOUTH -> "向南";
                case EAST -> "向东";
                case WEST -> "向西";
                // 不需要 default，因为枚举值已全覆盖
            };
            System.out.println(direction + ": " + action);
        }
    }

    // 枚举定义
    enum Direction {
        NORTH, SOUTH, EAST, WEST
    }
}



