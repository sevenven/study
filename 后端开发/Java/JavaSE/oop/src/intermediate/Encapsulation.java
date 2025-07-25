package intermediate;

public class Encapsulation {
    public static void main(String[] args) {
        // 创建BankAccount对象
        BankAccount account = new BankAccount("AC123456");

        // 通过公共方法访问和修改私有属性
        account.deposit(1000);  // 存款
        account.withdraw(200);  // 取款

        // 直接访问私有属性会导致编译错误
        // account.balance = 10000;  // 错误：balance是私有的

        // 只能通过公共方法获取余额
        System.out.println("当前余额: " + account.getBalance());
    }
}

/**
 * 封装示例类
 *
 * 封装的核心思想：
 * 1. 将类的属性私有化(private)
 * 2. 提供公共的(public)getter和setter方法来访问和修改属性
 * 3. 可以在方法中添加逻辑控制，保证数据的完整性和安全性
 *
 * 封装的核心概念
 * 1.访问修饰符：
 *   - 默认（无修饰符）：只能在当前包中访问
 *   - private: 只能在当前类中访问
 *   - protected: 当前类、同包类和子类可以访问
 *   - public: 所有类都可以访问
 * 2.封装的优点：
 *   - 数据隐藏与安全：外部无法直接访问内部数据 防止不合理的数据修改
 *   - 代码可维护性：内部实现可以改变而不影响外部调用
 *   - 增强可控性：通过封装，可以对数据进行验证和过滤，确保数据的有效性和一致性。
 */
class BankAccount {
    // 1. 私有属性 - 实现封装的第一步
    private String accountNumber;  // 账号
    private double balance;       // 余额

    // 2. 公共构造方法 - 初始化对象
    public BankAccount(String accountNumber) {
        this.accountNumber = accountNumber;
        this.balance = 0.0;  // 初始余额为0
    }

    // 3. 公共方法 - 提供对私有属性的访问和修改
    // 存款方法
    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
            System.out.println("成功存入: " + amount);
        } else {
            System.out.println("存款金额必须大于0");
        }
    }
    // 取款方法
    public void withdraw(double amount) {
        if (amount <= 0) {
            System.out.println("取款金额必须大于0");
        } else if (amount > balance) {
            System.out.println("余额不足，取款失败");
        } else {
            balance -= amount;
            System.out.println("成功取出: " + amount);
        }
    }

    // 4. getter方法 - 提供对私有属性的安全访问
    public double getBalance() {
        return balance;
    }
    public String getAccountNumber() {
        return accountNumber;
    }

    // 5. setter方法 - 提供对私有属性的安全修改
    // tips: 没有提供balance的setter方法，因为余额只能通过deposit和withdraw方法修改
    public void setAccountNumber(String accountNumber) {
        if (accountNumber != null && !accountNumber.isEmpty()) {
            this.accountNumber = accountNumber;
        } else {
            System.out.println("账号不能为空");
        }
    }
}