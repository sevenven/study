# 集合（set）是一种无序且不包含重复元素的数据结构。
# 集合非常适合用于需要快速查找、去重以及执行数学集合操作（如并集、交集和差集）的场景。

# 创建集合
# my_set = {1, 2, 3, 4, 5}  # 使用花括号创建集合
# my_set_from_list = set([1, 2, 2, 3, 4, 4, 5])  # 使用 set() 函数创建集合
# empty_set = set()  # 创建空集合
# print(my_set, my_set_from_list, empty_set)

# 新增
# my_set = {1, 2, 3}
# my_set.add(4)
# print(my_set)

# 删除
# my_set = {1, 2, 3, 4}
# my_set.remove(2)  # 使用 remove() 删除元素
# my_set.discard(3)  # 使用 discard() 删除元素
# # my_set.remove(5)  # 会引发 KeyError: 5
# my_set.discard(5)  # 尝试删除不存在的元素 不会引发错误
# my_set.clear()  # 清空集合
# print(my_set)

# 集合的数学运算
# 并集
# set1 = {1, 2, 3}
# set2 = {3, 4, 5}
# print(set1 | set2) # 使用 | 运算符
# print(set1.union(set2)) # 使用 union() 方法
# 交集
# set1 = {1, 2, 3}
# set2 = {3, 4, 5}
# print(set1 & set2)  # 使用 & 运算符
# print(set1.intersection(set2))  # 使用 intersection() 方法
# 差集
# set1 = {1, 2, 3}
# set2 = {3, 4, 5}
# print(set1 - set2)  # 使用 - 运算符
# print(set1.difference(set2))  # 使用 difference() 方法
# 对称差集
# set1 = {1, 2, 3}
# set2 = {3, 4, 5}
# print(set1 ^ set2)  # 使用 ^ 运算符
# print(set1.symmetric_difference(set2))  # 使用 symmetric_difference() 方法

# 其它类型转换为集合
# print(set([1, 2, 2, 3, 4, 4, 5]))  # 列表转换为集合
# print(set((1, 2, 2, 3, 4, 4, 5)))  # 元组转换为集合
# print(set("hello"))  # 字符串转换为集合
# print(set({"a": 1, "b": 2, "c": 3}))  # 字典转换为集合

# 常见操作
# set1 = {1, 2}
# set2 = {1, 2, 3, 4}
# print(2 in set1)  # 检查成员
# print(4 in set1)  # 检查成员
# print(set1.issubset(set2))  # 检查子集
# print(set2.issuperset(set1))  # 检查超集
# print(frozenset({1, 2, 3}))  # 创建一个冻结集合
# # frozen.add(4) # 尝试修改冻结集合会引发 AttributeError
# # 遍历集合
# for element in {1, 2, 3, 4, 5}:
#     print(element)
