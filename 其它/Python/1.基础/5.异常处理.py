# 基本语法
# try:
#     # 可能会引发异常的代码
#     list[0] = 1
# except Exception as e:
#     # Python 提供了许多内置的异常类型，常见的包括：
#     # 	Exception: 所有内置异常的基类。
#     # 	ValueError: 当传入的参数类型正确但值不合法时引发。
#     # 	TypeError: 当操作或函数应用于不适当类型的对象时引发。
#     # 	IndexError: 当序列下标超出范围时引发。
#     # 	KeyError: 当字典中不存在某个键时引发。
#     # 	FileNotFoundError: 当试图打开不存在的文件时引发。
#     # 	ZeroDivisionError: 当除数为零时引发。
#     print("An error occurred:", e)

# 多个 except 块
# try:
#     # 可能会引发异常的代码
#     list[0] = 1
# except TypeError as e:
#     print("An TypeError occurred:", e)
# except Exception as e:
#     print("An Exception occurred:", e)

# else 块
# list
# try:
#     list = [1, 2, 3]
# except Exception as e:
#     print("An Exception occurred:", e)
# else:
#     # 如果没有异常发生，执行此代码
#     print("No exception was raised.", list)

# finally 块
# try:
#     # 可能会引发异常的代码
#     list[0] = 1
# except Exception as e:
#     # 处理异常
#     print("An Exception occurred:", e)
# finally:
#     # 无论是否发生异常，都会执行此代码
#     print("This code will always run.")


# 自定义异常
# class MyCustomError(Exception):
#     pass


# try:
#     raise MyCustomError("Something went wrong")  # 手动抛出异常
# except MyCustomError as e:
#     print(f"Caught an exception: {e}")

# 捕获所有异常
try:
    list[0] = 1
except:
    # 处理所有异常
    print("An exception occurred")
