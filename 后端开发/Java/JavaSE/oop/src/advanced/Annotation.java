package advanced;

/**
 * Java注解(Annotation)示例类
 *
 * 注解是Java 5引入的元数据机制，用于为代码提供附加信息。
 * 注解本身不会直接影响代码逻辑，但可以被编译器、开发工具或运行时环境读取和处理。
 *
 * 注解核心知识说明：
 *
 * 1. 内置标准注解
 *    - @Override - 表示方法覆盖父类方法
 *    - @Deprecated - 表示元素已过时
 *    - @SuppressWarnings - 抑制编译器警告
 *    - @SafeVarargs - 表示可变参数使用安全
 *    - @FunctionalInterface - 表示函数式接口
 *
 * 2. 元注解(用于定义注解的注解)
 *    - @Target - 指定注解可以应用的目标(类/方法/字段等)
 *    - @Retention - 指定注解保留策略(源码/类文件/运行时)
 *    - @Documented - 表示注解应包含在Javadoc中
 *    - @Inherited - 表示注解可被继承
 *    - @Repeatable - 表示注解可重复使用
 *
 * 3. 注解元素
 *    - 可以包含属性(方法形式声明)
 *    - 支持的类型: 基本类型/String/Class/枚举/注解/数组
 *    - 可以指定默认值
 *
 * 4. 处理方式
 *    - 编译时处理(APT)
 *    - 运行时反射处理
 *    - 通过注解处理器(Annotation Processor)处理
 *
 * 5. 常见应用场景
 *    - 代码生成(如Lombok)
 *    - 配置替代(如Spring注解)
 *    - 静态检查(如Android @NonNull)
 *    - 文档生成(如Swagger)
 */
public class Annotation {

    // 1. 标准注解使用示例
    @Override
    public String toString() {
        return "Annotation示例类";
    }

    @Deprecated
    public void oldMethod() {
        System.out.println("过时的方法");
    }

    @SuppressWarnings("unchecked")
    public void suppressWarningExample() {
        // 这里可能有未检查的类型转换
    }

    // 2. 自定义注解示例

    // 自定义方法注解 - 用于标记需要权限验证的方法

    @java.lang.annotation.Target(java.lang.annotation.ElementType.METHOD)  // 该注解指定当前注解只能应用于方法上
    @java.lang.annotation.Retention(java.lang.annotation.RetentionPolicy.RUNTIME)  // 该注解指定当前注解在运行时仍然保留，可以通过反射机制获取
    public @interface RequiresPermission {
        String[] value();  // 需要的权限数组
        String description() default "";  // 可选描述
    }
    // 自定义类注解 - 用于标记API接口
    @java.lang.annotation.Target(java.lang.annotation.ElementType.TYPE) // 该注解指定当前注解只能应用于类、接口（包括注解类型）或枚举声明上
    @java.lang.annotation.Retention(java.lang.annotation.RetentionPolicy.RUNTIME)  // 该注解指定当前注解在运行时仍然保留，可以通过反射机制获取
    public @interface ApiEndpoint {
        String path();
        String method() default "GET";
        boolean authRequired() default true;
    }

    // 3. 自定义注解使用示例
    @ApiEndpoint(path = "/user", method = "POST", authRequired = true)
    public static class UserController {

        @RequiresPermission(value = {"user.create", "admin.access"},
                description = "需要用户创建权限")
        public void createUser() {
            System.out.println("创建用户");
        }
    }

    // 4. 注解处理示例(模拟运行时处理)
    public static void processAnnotations(Class<?> clazz) {
        // 处理类注解
        if (clazz.isAnnotationPresent(ApiEndpoint.class)) {
            ApiEndpoint endpoint = clazz.getAnnotation(ApiEndpoint.class);
            System.out.println("API端点: " + endpoint.method() + " " + endpoint.path());
            System.out.println("需要认证: " + endpoint.authRequired());
        }

        // 处理方法注解
        for (java.lang.reflect.Method method : clazz.getDeclaredMethods()) {
            if (method.isAnnotationPresent(RequiresPermission.class)) {
                RequiresPermission perm = method.getAnnotation(RequiresPermission.class);
                System.out.println("方法 " + method.getName() + " 需要权限: "
                        + String.join(", ", perm.value()));
                if (!perm.description().isEmpty()) {
                    System.out.println("描述: " + perm.description());
                }
            }
        }
    }

    public static void main(String[] args) {
        // 演示注解处理
        processAnnotations(UserController.class);

        /*
        输出示例:
        API端点: POST /user
        需要认证: true
        方法 createUser 需要权限: user.create, admin.access
        描述: 需要用户创建权限
        */
    }
}