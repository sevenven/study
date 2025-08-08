package exception;

import java.io.*;

/**
 * 异常链和资源管理示例类
 *
 * 核心知识：
 * 1. 异常链(Chained Exceptions):
 *    - 通过Throwable的cause参数保存原始异常
 *    - 使用initCause()方法或带cause参数的构造方法
 *
 * 2. try-with-resources:
 *    - Java 7引入的自动资源管理语法
 *    - 资源类必须实现AutoCloseable接口
 *    - 多个资源用分号分隔
 *    - 关闭顺序与声明顺序相反
 */
public class ExceptionChainAndResource {

    public static void main(String[] args) {
        // 示例1: 异常链
        try {
            processFile("nonexistent.txt");
        } catch (FileProcessingException e) {
            System.err.println("捕获到文件处理异常: " + e.getMessage());
            System.err.println("根本原因: " + e.getCause().getMessage());
        }

        // 示例2: try-with-resources
        try (FileReader reader = new FileReader("test.txt");
             BufferedReader br = new BufferedReader(reader)) {
            String line;
            while ((line = br.readLine()) != null) {
                System.out.println(line);
            }
        } catch (IOException e) {
            System.err.println("文件读取错误: " + e.getMessage());
        }
    }

    /**
     * 处理文件方法
     * @param filename 文件名
     * @throws FileProcessingException 当文件处理失败时抛出
     */
    public static void processFile(String filename) throws FileProcessingException {
        try {
            // 模拟文件处理
            if (!new File(filename).exists()) throw new FileNotFoundException("文件不存在: " + filename);
            // 其他处理...
        } catch (FileNotFoundException e) {
            // 将原始异常包装为新异常
            throw new FileProcessingException("处理文件失败", e);
        }
    }
}

/**
 * 自定义文件处理异常
 */
class FileProcessingException extends Exception {
    public FileProcessingException(String message, Throwable cause) {
        super(message, cause); // 保存原始异常
    }
}
