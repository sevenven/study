import random

# 生成随机浮点数
# print(random.random())  # 生成一个位于 [0.0, 1.0) 范围内的随机浮点数。

# 生成随机整数
# print(random.randint(1, 10))  # 生成一个位于 [a, b] 范围内的随机整数。
# print(random.randrange(0, 101, 2))  # start, stop[, step]

# 随机选择与打乱顺序
# print(random.choice(["apple", "banana", "cherry"]))  # 从非空序列中随机选择一个元素
# print(
#     random.choices(["apple", "banana", "cherry"], weights=[10, 1, 1], k=3)
# )  # 从非空序列中随机选择多个元素，元素出现的概率与其权重成正比
# fruits = ["apple", "banana", "cherry"]
# random.shuffle(fruits)  # 将序列中的元素随机排列
# print(fruits)

# 分布函数
print(random.uniform(1, 10))  # 生成一个 [a, b] 范围内的随机浮点数
print(random.gauss(0, 1))  # 生成一个具有指定均值和标准差的正态分布随机数

# 设置随机种子
# random.seed(1)  # 使用整数作为种子
