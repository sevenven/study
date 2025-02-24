# 元组（tuple）是一种不可变（immutable）的有序集合，用于存储一组不可更改的元素。

# 创建元组
# my_tuple = (1, 2.5, "apple", True)  # 创建一个包含不同类型的元素的元组
# empty_tuple = ()  # 创建一个空元组
# single_element_tuple = (42,)  # 创建一个单元素元组
# another_tuple = 1, 2, 3  # 元组也可以不用括号直接用逗号分隔元素来创建
# print(my_tuple, empty_tuple, single_element_tuple, another_tuple)

# 访问元组中的元素
# fruits = ("apple", "banana", "cherry", "date")
# print(fruits[0])  # 访问第一个元素
# print(fruits[-1])  # 访问最后一个元素
# print(fruits[2])  # 访问第三个元素

# 切片操作
# numbers = (1, 2, 3, 4, 5, 6)
# print(numbers[0:3])  # 获取前三个元素
# print(numbers[2:])  # 获取从第三个元素到最后的所有元素
# print(numbers[::2])  # 获取所有元素，步长为2

# 元组的拼接
# tuple1 = (1, 2, 3)
# tuple2 = (4, 5, 6)
# print(tuple1 + tuple2)

# 元组的重复
# my_tuple = (1, 2, 3)
# print(my_tuple * 3)

# 解包元组
# a, b, c = my_tuple = (1, 2, 3)
# print(a, b, c)
# first, *middle, last = my_tuple = (1, 2, 3, 4, 5)
# print(first, middle, last)

# 嵌套元组
# nested_tuple = ((1, 2), (3, 4), (5, 6))
# print(nested_tuple)
# print(nested_tuple[1][0])  # 访问嵌套元组中的元素

# 常见操作
# numbers = (1, 2, 3, 4, 5)
# print(len(numbers))  # 获取元组长度
# print(max(numbers))  # 获取最大值
# print(min(numbers))  # 获取最小值
# print(sum(numbers))  # 计算总和
# print(tuple([1, 2, 3]))  # 将列表转换为元组
