def print_args(*args):
    for arg in args:
        print(arg)


def print_kwargs(**kwargs):
    for key, value in kwargs.items():
        print(f"{key}: {value}")


print_args(1, 2, 3)  # 输出: 1 2 3
print_kwargs(name="Alice", age=25)  # 输出: name: Alice age: 25
