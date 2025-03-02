# 定义函数
def greet(name: str = "sugar") -> str:  # 函数默认值 类型提示
    return f"Hello, {name}!"  # 函数返回值


# 调用函数
print(greet())
print(greet("seven"))
