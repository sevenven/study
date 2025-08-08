package exception;

/**
 * 自定义异常示例类
 *
 * 自定义异常核心知识：
 * 1. 创建检查异常: 继承Exception
 * 2. 创建运行时异常: 继承RuntimeException
 * 3. 最佳实践：
 *    - 提供有意义的异常名称
 *    - 添加构造方法(包括带cause参数的)
 *    - 包含有用的错误信息
 *    - 添加文档注释说明何时抛出
 */
public class CustomException {

    public static void main(String[] args) {
        try {
            BankAccount account = new BankAccount(1000);
            account.withdraw(1500);
        } catch (InsufficientFundsException e) {
            System.err.println("错误: " + e.getMessage());
            System.err.println("缺少金额: " + e.getDeficit());
        }
    }
}

/**
 * 银行账户类
 */
class BankAccount {
    private double balance;

    public BankAccount(double balance) {
        this.balance = balance;
    }

    /**
     * 取款方法
     * @param amount 取款金额
     * @throws InsufficientFundsException 当余额不足时抛出
     */
    public void withdraw(double amount) throws InsufficientFundsException {
        if (amount > balance)  throw new InsufficientFundsException("余额不足", amount - balance);
        balance -= amount;
        System.out.println("取款成功，余额: " + balance);
    }
}

/**
 * 自定义异常 - 余额不足异常
 * 继承Exception表示这是一个检查异常
 */
class InsufficientFundsException extends Exception {
    private final double deficit;

    /**
     * @param message 错误信息
     * @param deficit 缺少的金额
     */
    public InsufficientFundsException(String message, double deficit) {
        super(message);
        this.deficit = deficit;
    }

    /**
     * 获取缺少的金额
     */
    public double getDeficit() {
        return deficit;
    }
}
