from collections import (
    namedtuple,
)  # 导入 namedtuple 函数，用于创建具有命名字段的元组子类

# Point = namedtuple(
#     "PointBase", ["x", "y"]
# )  # 创建一个名为 "PointBase" 的 namedtuple 类，具有字段 "x" 和 "y"

# p = Point(1, 2)  # 实例化一个 Point 对象，x 值为 1，y 值为 2


class Point(namedtuple("PointBase", ["x", "y"])):  # 继承 namedtuple 类
    def __add__(self, other):  # 重写 __add__ 方法
        return Point(self.x + other.x, self.y + other.y)

    def __sub__(self, other):  # 重写 __sub__ 方法
        return Point(self.x - other.x, self.y - other.y)


p1 = Point(1, 2)
p2 = Point(2, 3)
print(p1 + p2)
print(p1 - p2)
