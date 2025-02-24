# 字典（dict）是一种非常强大且灵活的数据结构，用于存储键值对（key-value pairs）。
# 字典中的每个键都是唯一的，并且通过键可以快速查找对应的值。字典是可变的（mutable），这意味着你可以在创建字典后添加、删除或修改其中的元素。

# 创建字典
# my_dict = {
#     "name": "Alice",
#     "age": 25,
#     "is_student": False,
# }
# empty_dict = {}  # 创建一个空字典
# another_dict = dict(name="Bob", age=30, is_student=True)  # 使用 dict() 构造函数创建字典
# print(my_dict, empty_dict, another_dict)

# 新增
# person = {"name": "Alice", "age": 25}
# person["address"] = "123 Main St"  # 添加新键值对
# 用于获取指定键的值。如果该键不存在于字典中，则会插入给定的键并赋予一个默认值（如果没有提供默认值，则使用 None）
# print(person.setdefault("address", "123 Main St"))

# 删除字典中的元素
# person = {"name": "Alice", "age": 25, "address": "123 Main St"}
# del person["address"]  # 使用 del 删除键值对
# print(person)
# print(person.pop("age"))  # 使用 pop() 删除键值对并返回键
# print(person.popitem())  # 使用 popitem() 随机移除一个键值对
# print(person)
# person.clear()
# print(person)

# 修改
# person = {"name": "Alice", "age": 25}
# person["age"] = 26  # 修改现有键值对
# print(person)  # 输出: {'name': 'Alice', 'age': 26, 'address': '123 Main St'}
# print({"name": "Alice", "age": 25}.update({"age": 26, "address": "456 Elm St"}))

# 查看
# person = {"name": "Alice", "age": 25, "is_student": False}
# print(person["name"])  # 通过键访问值
# # print(person["address"])  # 如果键不存在，会引发 KeyError
# print(person.get("address"))  # 使用 get() 方法安全地访问值
# print(person.get("address", "未知地址"))  # 使用默认值

# 常见操作
# person = {"name": "Alice", "age": 25, "address": "123 Main St"}
# print(person.keys())  # 获取所有键
# print(person.values())  # 获取所有值
# print(person.items())  # 获取所有键值对
# for key in person:  # 遍历键
#     print(key)
# for value in person.values():  # 遍历值
#     print(value)
# for key, value in person.items():  # 遍历键值对
#     print(f"{key}: {value}")

# 字典推导式
# print({x: x * x for x in range(5)})  # 基本字典推导式
# print({x: x * x for x in range(5) if x % 2 == 0})  # 带条件的字典推导式
