package comment;

public class Main {
    /**
     * 这是一个文档注释示例。
     * 文档注释用于描述类、方法、字段等的用途和功能。
     * 文档注释是Java特有的 可以被JDK提供的工具 javadoc 所解析，生成以网页形式呈现的API文档。
     *
     * @param args 命令行参数
     */
    public static void main(String[] args) {
        // 这是一个单行注释 编译后的字节码文件中不会保留
        System.out.println("单行注释");
        /*
        这是一个多行注释示例
        多行注释可以跨越多行
        用于详细解释代码逻辑
        多行注释不能嵌套使用
        编译后的字节码文件中不会保留
        */
        System.out.println("多行注释");
        // 文档注释示例见 main方法
        System.out.println("文档注释");
    }
}