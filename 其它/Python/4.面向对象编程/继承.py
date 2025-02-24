class ParentClass:
    def __init__(self, name):
        self.name = name

    def greet(self):
        return f"Hello, {self.name}!"


class ChildClass(ParentClass):
    def __init__(self, name, age):
        # 调用父类的初始化方法
        super().__init__(name)
        self.age = age

    def greet(self):
        # 扩展父类的方法
        return f"{super().greet()} You are {self.age} years old."


# 创建 ChildClass 的实例
child_instance = ChildClass("Alice", 25)

# 调用继承的方法
print(child_instance.greet())  # 输出: Hello, Alice! You are 25 years old.
