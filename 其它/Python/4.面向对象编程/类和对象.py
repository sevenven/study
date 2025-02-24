class MyClass:
    # 类属性
    class_attribute = "I am a class attribute"

    # 初始化方法（构造函数）
    def __init__(self, instance_attribute):
        # 实例属性
        self.instance_attribute = instance_attribute

    # 实例方法
    def instance_method(self):
        return f"I am an instance method and my attribute is {self.instance_attribute}"

    # 类方法
    @classmethod
    def class_method(cls):
        return f"I am a class method and I can access {cls.class_attribute}"

    # 静态方法
    @staticmethod
    def static_method():
        return "I am a static method and I don't have access to class or instance attributes"


# 创建 MyClass 的实例
my_instance = MyClass("example")
# 访问实例属性
print(my_instance.instance_attribute)
# 调用实例方法
print(my_instance.instance_method())
# 访问类属性
print(MyClass.class_attribute)
# 调用类方法
print(MyClass.class_method())
# 调用静态方法
print(MyClass.static_method())
