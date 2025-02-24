class MyClass:
    def __init__(self, value):
        self.value = value

    # 定义对象的字符串表示
    def __str__(self):
        return f"MyClass with value {self.value}"

    # 定义加法运算
    def __add__(self, other):
        return MyClass(self.value + other.value)


# 创建实例
obj1 = MyClass(10)
obj2 = MyClass(20)


print(obj1)  # 调用 __str__ 方法
print(obj1 + obj2)  # 调用 __add__ 方法
