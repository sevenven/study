/*
 * 关键字知识说明：
 * 1. 关键字是语言保留的特殊单词，Java17共48个，有特定含义，不能用作标识符（如变量名、类名）。
 * 2. 所有关键字均为小写（如public正确，PUBLIC错误）
 * 3. 常见关键字分类：
 *    - 访问控制：public, private, protected
 *    - 类与对象：class, new, instanceof, this, super
 *    - 数据类型：int, boolean, char, float, double, long, short, byte
 *    - 流程控制：if, else, switch, case, for, while, do, break, continue
 *    - 异常处理：try, catch, finally, throw, throws
 *    - 方法相关：void, return
 *    - 修饰符：static, final, abstract, synchronized, volatile, transient
 *    - 包管理：package, import
 *    - 其他：native, strictfp, assert, enum
 */
/*
 * 标识符知识说明：
 * 1. 定义：开发者自定义的名称（类名、方法名、变量名等）
 * 2. 命名规则（强制）：
 *    - 由字母(A-Za-z)、数字(0-9)、下划线(_)、美元符($)组成
 *    - 不能以数字开头
 *    - 不能是关键字或保留字
 *    - 区分大小写（age和Age是不同标识符）
 * 3. 命名规范（建议）：
 *    - 类名：大驼峰式 UpperCamelCase（如StudentRecord）
 *    - 方法/变量名：小驼峰式 lowerCamelCase（如getUserName）
 *    - 常量名：全大写+下划线 UPPER_SNAKE_CASE（如MAX_SIZE）
 *    - 包名：全小写+点分隔（如com.example.util）
 * 4. 重要原则：
 *    - 见名知意（避免无意义字符）
 *    - 长度适中（3-20字符为宜）
 *    - 禁止使用保留字 (如goto, const (虽未启用但禁止使用))
 * 5. 标识符命名技巧：
 *    （1）. 避免歧义：
 *       - 不良：l (小写L) vs I (大写i) vs 1 (数字)
 *       - 推荐：使用list, index等明确单词
 *    （2）. 避免缩写陷阱：
 *       - 不良：genymdhms (生成年月日时分秒)
 *       - 推荐：generationTimestamp
 *    （3）. 避免单字母：
 *       - 仅允许在局部变量和循环中使用：for (int i=0; i<10; i++)
 */
package variable;

public class Main {
    public static void main(String[] args) {
        // ======================
        // 变量概念说明：
        // 1. 变量是内存中的命名存储空间
        // 2. 存储的值在程序运行期间可以改变
        // 3. 每个变量都有特定的数据类型
        // ======================

        // 变量构成的三要素：
        // 1. 数据类型 - 决定变量的存储空间和取值范围
        // 2. 变量名   - 标识符规则：字母/数字/$/_组成，不能以数字开头
        // 3. 变量值   - 存储在变量中的数据

        // ======================
        // Java变量声明标准格式：
        // [数据类型] [变量名] = [初始值];
        // ======================

        // 示例1：基本数据类型变量
        int age = 25;            // 整数类型
        double salary = 7500.50;  // 双精度浮点类型
        char grade = 'A';         // 单个字符类型
        boolean isEmployed = true; // 布尔类型

        // 示例2：引用数据类型变量
        String name = "张三";     // 字符串类型（引用类型）

        // 示例3：先声明后赋值
        int count;               // 声明变量
        count = 10;              // 后续赋值

        // 示例4：变量重新赋值（值可变）
        System.out.println("修改前: " + count);
        count = 20;              // 改变变量值
        System.out.println("修改后: " + count);

        // 示例5：多变量声明
        int x = 5, y = 10, z = 15;  // 同一类型多个变量

        // 注意事项：
        // 1. 变量必须先声明后使用
        // 2. 同一作用域内变量名不能重复
        // 3. 局部变量使用前必须初始化
    }
}