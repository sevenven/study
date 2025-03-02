def apply_function(func, value):
    return func(value)


def square(x):
    return x**2


print(apply_function(square, 4))  # 输出: 16
