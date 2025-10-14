package commonlyUsedClasses._lang;

/**
 * Math 类示例演示
 *
 * Math 类特点：
 * 1. final 类，不能被继承
 * 2. 所有方法都是静态方法，可以直接通过类名调用
 * 3. 构造器是私有的，不能创建 Math 类的实例
 *
 * 精度说明：
 * 1. Math 类的方法使用浮点运算，可能会有精度损失
 * 2. 对于精确计算，应考虑使用 BigDecimal 类
 */
public class _Math {

  /**
   * 演示基本数学运算
   *
   * 包含方法：
   * - abs() - 绝对值
   * - max() - 最大值
   * - min() - 最小值
   */
  public static void demonstrateBasicOperations() {
    System.out.println("绝对值 Math.abs(-10): " + Math.abs(-10));
    System.out.println("最大值 Math.max(5, 10): " + Math.max(5, 10));
    System.out.println("最小值 Math.min(5, 10): " + Math.min(5, 10));
  }

  /**
   * 演示指数和对数运算
   *
   * 包含方法：
   * - sqrt() - 平方根
   * - cbrt() - 立方根
   * - pow() - 幂运算
   * - log() - 自然对数
   * - log10() - 以10为底对数
   */
  public static void demonstrateExponentialLogarithmic() {
    System.out.println("平方根 Math.sqrt(16): " + Math.sqrt(16));
    System.out.println("立方根 Math.cbrt(27): " + Math.cbrt(27));
    System.out.println("幂运算 Math.pow(2, 3): " + Math.pow(2, 3));
    System.out.println("自然对数 Math.log(Math.E): " + Math.log(Math.E));
    System.out.println("以10为底对数 Math.log10(100): " + Math.log10(100));
  }

  /**
   * 演示三角函数
   *
   * 注意：
   * 1. 参数使用弧度制
   * 2. 包含 sin(), cos(), tan() 等基本三角函数
   */
  public static void demonstrateTrigonometric() {
    System.out.println("正弦 Math.sin(Math.PI/2): " + Math.sin(Math.PI/2));
    System.out.println("余弦 Math.cos(Math.PI): " + Math.cos(Math.PI));
    System.out.println("正切 Math.tan(Math.PI/4): " + Math.tan(Math.PI/4));
  }

  /**
   * 演示角度和弧度转换
   *
   * 包含方法：
   * - toRadians() - 角度转弧度
   * - toDegrees() - 弧度转角度
   */
  public static void demonstrateAngleConversion() {
    System.out.println("转弧度 Math.toRadians(180): " + Math.toRadians(180));
    System.out.println("转角度 Math.toDegrees(Math.PI): " + Math.toDegrees(Math.PI));
  }

  /**
   * 演示舍入运算
   *
   * 包含方法：
   * - round() - 四舍五入
   * - ceil() - 向上取整
   * - floor() - 向下取整
   */
  public static void demonstrateRounding() {
    System.out.println("四舍五入 Math.round(3.6): " + Math.round(3.6));
    System.out.println("向上取整 Math.ceil(3.2): " + Math.ceil(3.2));
    System.out.println("向下取整 Math.floor(3.8): " + Math.floor(3.8));
  }

  /**
   * 演示随机数和常量
   *
   * 包含：
   * 1. random() - 生成[0.0, 1.0)之间的随机数
   * 2. PI - 圆周率π
   * 3. E - 自然对数底e
   *
   * 注意：对于更复杂的随机数需求，可以使用 Random 类
   */
  public static void demonstrateRandomAndConstants() {
    System.out.println("随机数 Math.random(): " + Math.random());
    System.out.println("圆周率 Math.PI: " + Math.PI);
    System.out.println("自然对数底 Math.E: " + Math.E);
  }

  public static void main(String[] args) {
    System.out.println("===== 基本数学运算 =====");
    demonstrateBasicOperations();

    System.out.println("\n===== 指数和对数运算 =====");
    demonstrateExponentialLogarithmic();

    System.out.println("\n===== 三角函数 =====");
    demonstrateTrigonometric();

    System.out.println("\n===== 角度和弧度转换 =====");
    demonstrateAngleConversion();

    System.out.println("\n===== 舍入运算 =====");
    demonstrateRounding();

    System.out.println("\n===== 随机数和常量 =====");
    demonstrateRandomAndConstants();
  }
}