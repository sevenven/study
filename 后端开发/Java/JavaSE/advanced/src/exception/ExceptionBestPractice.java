package exception;

import java.util.logging.*;
import java.sql.SQLException;

/**
 * 异常处理最佳实践示例类
 *
 * 异常处理最佳实践：
 * 1. 记录完整异常信息(使用logger)
 * 2. 不要忽略异常(空的catch块)
 * 3. 使用特定异常而非通用Exception
 * 4. 异常信息应包含有用上下文
 * 5. 考虑异常转换(将底层异常转换为业务异常)
 * 6. 使用防御性编程减少异常
 */
public class ExceptionBestPractice {
    private static final Logger logger = Logger.getLogger(ExceptionBestPractice.class.getName());

    public static void main(String[] args) {
        try {
            processOrder("123", 2);
        } catch (OrderProcessingException e) {
            logger.log(Level.SEVERE, "订单处理失败: " + e.getMessage(), e);
            // 向用户显示友好错误信息
            System.out.println("系统繁忙，请稍后再试");
        }
    }

    /**
     * 处理订单方法
     * @param orderId 订单ID
     * @param quantity 数量
     * @throws OrderProcessingException 当订单处理失败时抛出
     */
    public static void processOrder(String orderId, int quantity) throws OrderProcessingException {
        if (orderId == null || orderId.isEmpty()) throw new IllegalArgumentException("订单ID不能为空");

        try {
            // 模拟数据库操作
            if (quantity > 10) throw new SQLException("库存不足");
            System.out.println("订单处理成功: " + orderId);
        } catch (SQLException e) {
            // 将底层数据库异常转换为业务异常
            throw new OrderProcessingException("处理订单" + orderId + "失败", e);
        }
    }
}

/**
 * 自定义订单处理异常(业务异常)
 */
class OrderProcessingException extends Exception {
    public OrderProcessingException(String message, Throwable cause) {
        super(message, cause);
    }
}