# 列表（list）是一种非常常用的数据结构，用于存储一系列有序的元素。
# 列表中的元素可以是任何类型的数据，如整数、浮点数、字符串，甚至是其他列表。
# 列表是可变的（mutable），这意味着你可以在创建列表后添加、删除或修改其中的元素。


# 新增
fruits = ["apple", "banana", "cherry"]
fruits.insert(1, "avocado")  # 在指定位置插入一个元素
fruits.append("orange")  # 在列表末尾添加元素
fruits.extend(["Olive", "Longan"])  # 添加多个元素
print(fruits)

# 删除
# fruits = ["apple", "banana", "cherry", "banana"]
# fruits.remove("banana")  # 删除指定元素
# fruits.pop(1)  # 删除指定位置的元素
# del fruits[0]  # 删除指定位置的元素
# # del fruits  # 删除整个列表
# # fruits.clear()  # 清空列表
# print(fruits)

# 修改
# fruits = ["apple", "banana", "cherry", "banana"]
# fruits[0] = "grape"  # 修改列表中的第一个元素
# fruits[1:2] = ["pear", "watermelon"]  # 替换列表中的部分元素
# fruits.sort()  # 对列表进行排序
# fruits.reverse()  # 对列表进行反转
# print(fruits)

# 查看
# fruits = ["apple", "banana", "cherry", "banana"]
# print(fruits[0])  # 访问列表中的第一个元素

# 常见操作
# fruits = ["apple", "banana", "cherry", "banana"]
# print(len(fruits))  # 获取列表长度
# print(fruits.count("apple"))  # 统计指定元素出现的次数
# print(fruits.index("cherry"))  # 获取指定元素的索引
# print(fruits.copy())  # 复制列表


# 使用内置函数创建列表
# print(list("hello"))

# 使用列表推导式创建列表
# print([x for x in range(1, 6)]) # 基本的列表推导式
# print([x * x for x in range(1, 6) if x > 2]) # 带条件的列表推导式
