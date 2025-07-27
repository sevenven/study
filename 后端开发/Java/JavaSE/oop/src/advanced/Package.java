/**
 * package关键字示例类
 *
 * package关键字用于：
 * 1. 定义Java类所属的包（命名空间）
 * 2. 必须作为Java源文件的第一条非注释语句
 * 3. 命名规则：
 *    - 全部小写字母
 *    - 采用反转域名约定（如com.example.project）
 *    - 使用点号(.)分隔层级
 *
 * 包的作用：
 * 1. 避免类名冲突
 * 2. 提供访问控制（包级私有权限）
 * 3. 便于组织和管理代码
 * 4. 实现模块化开发
 *
 * 注意事项：
 * 1. 包声明必须与目录结构匹配
 * 2. 没有package声明则属于默认包（不推荐）
 * 3. 导入其他包的类需要使用import语句
 * 4. 包名是Java类的完全限定名的一部分
 */

// 包声明必须放在文件最前面（除注释外）
package advanced;

// 导入其他包的类
import java.util.ArrayList;
import static java.lang.Math.PI;

public class Package {
    public static void main(String[] args) {
        System.out.println("Package example running");

        // 使用同包下的类不需要导入
        PackageHelper helper = new PackageHelper();
        helper.showInfo();

        // 使用其他包的类需要导入
        ArrayList<String> list = new ArrayList<>();
        System.out.println("PI value: " + PI);
    }
}

/**
 * 同包下的辅助类
 * 演示包级私有访问权限
 */
class PackageHelper {
    void showInfo() {
        System.out.println("This is a helper class in the same package");
        // 可以访问同包下其他类的包级私有成员
    }
}

// 包级私有类，只能被同包下的类访问
class InternalUtil {
    static void log(String message) {
        System.out.println("[LOG] " + message);
    }
}