package processControl;

public class IfElse {
    public static void main(String[] args) {
        System.out.println("===== Java If-Else 控制结构详解 =====");

        // ===========================================
        // 1. 基本 if 语句
        // ===========================================
        /*
         * if 语句语法：
         *   if (条件表达式) {
         *       // 条件为 true 时执行的代码
         *   }
         *
         * 使用场景：
         *   - 当只需要在条件满足时执行特定操作
         *   - 不需要处理条件不满足的情况
         */
        System.out.println("\n1. 基本 if 语句");

        int temperature = 30;
        System.out.println("当前温度: " + temperature + "°C");

        if (temperature > 35) {
            System.out.println("天气炎热，请注意防暑！");
        }

        // ===========================================
        // 2. if-else 语句
        // ===========================================
        /*
         * if-else 语法：
         *   if (条件表达式) {
         *       // 条件为 true 时执行
         *   } else {
         *       // 条件为 false 时执行
         *   }
         *
         * 使用场景：
         *   - 需要处理条件满足和不满足两种情况的场景
         *   - 二选一的决策逻辑
         */
        System.out.println("\n2. if-else 语句");

        int age = 17;
        System.out.println("年龄: " + age + "岁");

        if (age >= 18) {
            System.out.println("您已成年，可以进入。");
        } else {
            System.out.println("未成年，禁止进入！");
        }

        // ===========================================
        // 3. if-else if-else 语句
        // ===========================================
        /*
         * 多条件分支语法：
         *   if (条件1) {
         *       // 条件1为 true 时执行
         *   } else if (条件2) {
         *       // 条件2为 true 时执行
         *   } else {
         *       // 所有条件都不满足时执行
         *   }
         *
         * 使用场景：
         *   - 需要处理多个互斥条件的场景
         *   - 成绩等级划分、价格区间判断等
         *
         * 注意：
         *   - 条件判断从上到下执行，一旦满足某个条件，后续条件不再检查
         *   - else 块是可选的
         */
        System.out.println("\n3. if-else if-else 语句");

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

        // ===========================================
        // 4. 嵌套 if 语句
        // ===========================================
        /*
         * 嵌套 if 语法：
         *   if (条件1) {
         *       if (条件2) {
         *           // 条件1和条件2都为 true 时执行
         *       }
         *   }
         *
         * 使用场景：
         *   - 需要同时满足多个条件的复杂决策
         *   - 权限验证（登录状态 + 权限级别）
         *
         * 注意：
         *   - 避免过度嵌套（一般不超过3层）
         *   - 复杂逻辑可考虑使用逻辑运算符简化
         */
        System.out.println("\n4. 嵌套 if 语句");

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

        // ===========================================
        // 5. 使用逻辑运算符简化条件
        // ===========================================
        /*
         * 逻辑运算符：
         *   && - 逻辑与（两个条件都为 true）
         *   || - 逻辑或（至少一个条件为 true）
         *   !  - 逻辑非（反转条件结果）
         *
         * 优势：
         *   - 减少嵌套层级
         *   - 提高代码可读性
         *   - 简化复杂条件判断
         */
        System.out.println("\n5. 使用逻辑运算符简化条件");

        boolean hasTicket = true;
        boolean hasID = true;
        int personAge = 16;

        // 使用逻辑运算符简化嵌套
        if (hasTicket && hasID && personAge >= 18) {
            System.out.println("允许进入VIP区域");
        } else if (hasTicket && hasID) {
            System.out.println("允许进入普通区域");
        } else {
            System.out.println("无法进入，请检查门票和证件");
        }

        // ===========================================
        // 6. 三元运算符（条件表达式）
        // ===========================================
        /*
         * 三元运算符语法：
         *   变量 = (条件) ? 表达式1 : 表达式2;
         *
         * 使用场景：
         *   - 简单的二选一赋值操作
         *   - 替代简单的if-else结构
         *
         * 注意：
         *   - 避免在复杂逻辑中使用
         *   - 不要嵌套过多三元运算符
         */
        System.out.println("\n6. 三元运算符");

        int stock = 5;
        String status = (stock > 0) ? "有库存" : "缺货";
        System.out.println("商品状态: " + status);

        // 复杂示例（不推荐）
        String discountLevel = (orderAmount > 200) ? "高级折扣" :
                (orderAmount > 100) ? "中级折扣" : "普通折扣";
        System.out.println("折扣级别: " + discountLevel);

        // ===========================================
        // 7. 对象与空值检查
        // ===========================================
        /*
         * 对象检查：
         *   - 检查对象是否为null
         *   - 避免NullPointerException
         *   - 通常在方法开头进行参数验证
         */
        System.out.println("\n7. 对象与空值检查");

        String username = null;

        if (username != null && !username.isEmpty()) {
            System.out.println("欢迎, " + username);
        } else {
            System.out.println("用户名无效或为空");
        }

        // ===========================================
        // 8. 枚举类型与switch替代方案
        // ===========================================
        /*
         * 使用if-else处理枚举：
         *   - 当枚举值较少时可用if-else处理
         *   - 枚举值较多时推荐使用switch
         */
        System.out.println("\n8. 枚举类型处理");

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

        // ===========================================
        // 9. 常见错误与陷阱
        // ===========================================
        System.out.println("\n9. 常见错误与陷阱");

        // 错误1: 使用赋值运算符=而不是比较运算符==
        boolean flag = false;
        if (flag = true) { // 错误写法，实际是赋值操作
            System.out.println("错误1: 错误地使用了赋值运算符=");
        }

        // 错误2: 缺少花括号导致逻辑错误
        int x = 10;
        if (x > 5)
            System.out.println("x大于5"); // 只有这一行属于if
        System.out.println("这行代码总是会执行"); // 不属于if块

        // 错误3: 浮点数精确比较
        double d1 = 0.1 + 0.2;
        double d2 = 0.3;
        if (d1 == d2) { // 错误：浮点数不应直接比较相等
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
        } else if (value > 70) { // 这个条件永远不会执行
            System.out.println("大于70");
        }

        // 正确做法：调整条件顺序
        if (value > 70) {
            System.out.println("大于70");
        } else if (value > 50) {
            System.out.println("大于50但小于等于70");
        }

        // ===========================================
        // 10. 最佳实践
        // ===========================================
        System.out.println("\n10. 最佳实践");

        // 实践1: 使用花括号{}包裹所有代码块
        int num = 5;
        if (num % 2 == 0) {
            System.out.println(num + "是偶数");
        } else {
            System.out.println(num + "是奇数");
        }

        // 实践2: 复杂条件提取为布尔变量
        boolean isWeekend = (today == Day.SATURDAY || today == Day.SUNDAY);
        boolean isHoliday = true;
        boolean canRest = isWeekend && isHoliday;

        if (canRest) {
            System.out.println("今天是休息日，好好放松");
        }

        // 实践3: 使用卫语句（Guard Clauses）减少嵌套
        System.out.println("\n使用卫语句减少嵌套:");
        processOrder(150, true); // 有效订单
        processOrder(50, false); // 无效订单

        // 实践4: 使用Objects.equals()进行对象比较
        String str1 = new String("hello");
        String str2 = new String("hello");
        if (str1.equals(str2)) { // 使用equals比较内容
            System.out.println("str1 和 str2 内容相同");
        }
    }

    // 卫语句示例方法
    private static void processOrder(double amount, boolean isValid) {
        // 卫语句：先处理无效情况
        if (!isValid) {
            System.out.println("订单无效！");
            return;
        }

        if (amount <= 0) {
            System.out.println("订单金额必须大于0");
            return;
        }

        // 处理有效订单
        System.out.println("处理订单，金额: ￥" + amount);

        if (amount > 100) {
            System.out.println("应用大额订单折扣");
        }
    }
}