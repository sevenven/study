package processControl;

public class IfElse {
    public static void main(String[] args) {
        System.out.println("===== Java If-Else 控制结构详解 =====");
        demonstrateBasicIf(); // 基本 if 语句演示
        demonstrateIfElse(); // if-else 语句演示
        demonstrateIfElseIf(); // if-else if-else 语句演示
        demonstrateNestedIf(); // 嵌套 if 语句演示
        demonstrateLogicalOperators(); // 逻辑运算符演示
        demonstrateTernaryOperator(); // 三目运算符演示
        demonstrateNullCheck(); // 空指针检查演示
        demonstrateEnumHandling(); // 枚举类型处理演示
        demonstrateCommonMistakes(); // 常见错误与调试技巧
        demonstrateBestPractices(); // 最佳实践演示
    }

    // 基本 if 语句演示
    private static void demonstrateBasicIf() {
        System.out.println("\n基本 if 语句");
        int temperature = 30;
        System.out.println("当前温度: " + temperature + "°C");

        if (temperature > 35) {
            System.out.println("天气炎热，请注意防暑！");
        }
    }

    // if-else 语句演示
    private static void demonstrateIfElse() {
        System.out.println("\nif-else 语句");
        int age = 17;
        System.out.println("年龄: " + age + "岁");

        if (age >= 18) {
            System.out.println("您已成年，可以进入。");
        } else {
            System.out.println("未成年，禁止进入！");
        }
    }

    // if-else if-else 语句演示
    private static void demonstrateIfElseIf() {
        System.out.println("\nif-else if-else 语句");
        int score = 85;
        System.out.println("考试成绩: " + score + "分");

        if (score >= 90) {
            System.out.println("优秀！获得 A 等级");
        } else if (score >= 80) {
            System.out.println("良好！获得 B 等级");
        } else if (score >= 70) {
            System.out.println("中等！获得 C 等级");
        } else if (score >= 60) {
            System.out.println("及格！获得 D 等级");
        } else {
            System.out.println("不及格！需要补考");
        }
    }

    // 嵌套 if 语句演示
    private static void demonstrateNestedIf() {
        System.out.println("\n嵌套 if 语句");
        boolean isMember = true;
        int orderAmount = 150;
        System.out.println("会员状态: " + isMember);
        System.out.println("订单金额: ￥" + orderAmount);

        if (isMember) {
            if (orderAmount > 100) {
                System.out.println("尊享会员优惠！获得9折折扣");
            } else {
                System.out.println("会员可享受95折优惠");
            }
        } else {
            System.out.println("非会员，无折扣优惠");
        }
    }

    // 逻辑运算符演示
    private static void demonstrateLogicalOperators() {
        System.out.println("\n使用逻辑运算符简化条件");
        boolean hasTicket = true;
        boolean hasID = true;
        int personAge = 16;

        if (hasTicket && hasID && personAge >= 18) {
            System.out.println("允许进入VIP区域");
        } else if (hasTicket && hasID) {
            System.out.println("允许进入普通区域");
        } else {
            System.out.println("无法进入，请检查门票和证件");
        }
    }

    // 三元运算符演示
    private static void demonstrateTernaryOperator() {
        System.out.println("\n三元运算符");
        int stock = 5;
        String status = (stock > 0) ? "有库存" : "缺货";
        System.out.println("商品状态: " + status);

        int orderAmount = 150;
        String discountLevel = (orderAmount > 200) ? "高级折扣" :
          (orderAmount > 100) ? "中级折扣" : "普通折扣";
        System.out.println("折扣级别: " + discountLevel);
    }

    // 空值检查演示
    private static void demonstrateNullCheck() {
        System.out.println("\n对象与空值检查");
        String username = null;

        if (username != null && !username.isEmpty()) {
            System.out.println("欢迎, " + username);
        } else {
            System.out.println("用户名无效或为空");
        }
    }

    // 枚举处理演示
    private static void demonstrateEnumHandling() {
        System.out.println("\n枚举类型处理");
        enum Day { MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY }
        Day today = Day.FRIDAY;

        if (today == Day.MONDAY) {
            System.out.println("星期一：新的一周开始");
        } else if (today == Day.FRIDAY) {
            System.out.println("星期五：周末即将到来！");
        } else if (today == Day.SATURDAY || today == Day.SUNDAY) {
            System.out.println("周末：好好休息");
        } else {
            System.out.println("工作日：努力工作");
        }
    }

    // 常见错误演示
    private static void demonstrateCommonMistakes() {
        System.out.println("\n常见错误与陷阱");

        // 错误1: 使用赋值运算符=而不是比较运算符==
        boolean flag = false;
        if (flag = true) {
            System.out.println("错误1: 错误地使用了赋值运算符=");
        }

        // 错误2: 缺少花括号导致逻辑错误
        int x = 10;
        if (x > 5)
            System.out.println("x大于5");
        System.out.println("这行代码总是会执行");

        // 错误3: 浮点数精确比较
        double d1 = 0.1 + 0.2;
        double d2 = 0.3;
        if (d1 == d2) {
            System.out.println("0.1 + 0.2 等于 0.3");
        } else {
            System.out.println("0.1 + 0.2 = " + d1 + " ≠ 0.3");
        }

        // 正确做法：使用误差范围比较
        double epsilon = 0.0001;
        if (Math.abs(d1 - d2) < epsilon) {
            System.out.println("在误差范围内，0.1 + 0.2 ≈ 0.3");
        }

        // 错误4: 条件顺序错误
        int value = 75;
        if (value > 50) {
            System.out.println("大于50");
        } else if (value > 70) {
            System.out.println("大于70");
        }
    }

    // 最佳实践演示
    private static void demonstrateBestPractices() {
        System.out.println("\n最佳实践");

        // 实践1: 使用花括号{}包裹所有代码块
        int num = 5;
        if (num % 2 == 0) {
            System.out.println(num + "是偶数");
        } else {
            System.out.println(num + "是奇数");
        }

        // 实践2: 复杂条件提取为布尔变量
        enum Day { SATURDAY, SUNDAY }
        Day today = Day.SATURDAY;
        boolean isWeekend = (today == Day.SATURDAY || today == Day.SUNDAY);
        boolean isHoliday = true;
        boolean canRest = isWeekend && isHoliday;

        if (canRest) {
            System.out.println("今天是休息日，好好放松");
        }

        // 实践3: 使用卫语句
        System.out.println("\n使用卫语句减少嵌套:");
        processOrder(150, true);
        processOrder(50, false);

        // 实践4: 使用equals比较对象
        String str1 = new String("hello");
        String str2 = new String("hello");
        if (str1.equals(str2)) {
            System.out.println("str1 和 str2 内容相同");
        }
    }

    // 卫语句示例方法
    private static void processOrder(double amount, boolean isValid) {
        if (!isValid) {
            System.out.println("订单无效！");
            return;
        }

        if (amount <= 0) {
            System.out.println("订单金额必须大于0");
            return;
        }

        System.out.println("处理订单，金额: ￥" + amount);
        if (amount > 100) {
            System.out.println("应用大额订单折扣");
        }
    }
}