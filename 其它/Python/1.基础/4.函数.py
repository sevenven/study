import sys

# Python 默认的递归深度限制是 1000 层 可以通过 sys.setrecursionlimit() 来修改这个限制。
sys.setrecursionlimit(1500)


# 定义函数
def greet(name="sugar"):  # 函数默认值
    return f"Hello, {name}!"  # 函数返回值


# 调用函数
print(greet())
print(greet("seven"))


# 关键字参数--------------------------------
def describe_pet(pet_name, animal_type="dog"):
    print(f"I have a {animal_type} named {pet_name}.")


describe_pet(pet_name="sugar")  # 输出: I have a dog named sugar.
describe_pet(
    animal_type="hamster", pet_name="Harry"
)  # 输出: I have a hamster named Harry.


# 可变参数--------------------------------
def print_args(*args):
    for arg in args:
        print(arg)


def print_kwargs(**kwargs):
    for key, value in kwargs.items():
        print(f"{key}: {value}")


print_args(1, 2, 3)  # 输出: 1 2 3
print_kwargs(name="Alice", age=25)  # 输出: name: Alice age: 25


# Lambda函数--------------------------------
square = lambda x: x**2
print(square(5))  # 输出: 25


# 文档字符串--------------------------------
def add(a, b):
    """
    This function adds two numbers and returns the result.
    """
    return a + b


print(add.__doc__)  # 输出: This function adds two numbers and returns the result.


# 作用域--------------------------------
x = 10


def modify_global():
    global x
    x = 20


modify_global()
print(x)  # 输出: 20


# 递归--------------------------------
def factorial(n):
    if n == 1:
        return 1
    else:
        return n * factorial(n - 1)


print(factorial(5))  # 输出: 120


# 高阶函数--------------------------------
def apply_function(func, value):
    return func(value)


def square(x):
    return x**2


print(apply_function(square, 4))  # 输出: 16


# 闭包--------------------------------
def outer_function(x):
    def inner_function(y):
        return x + y

    return inner_function


closure = outer_function(10)
print(closure(5))  # 输出: 15


# 装饰器--------------------------------
def my_decorator(func):
    def wrapper():
        print("Something is happening before the function is called.")
        func()
        print("Something is happening after the function is called.")

    return wrapper


@my_decorator
def say_hello():
    print("Hello!")


say_hello()


# 生成器函数
def count_up_to(max):
    count = 1
    while count <= max:
        yield count
        count += 1


counter = count_up_to(5)
for num in counter:
    print(num)
