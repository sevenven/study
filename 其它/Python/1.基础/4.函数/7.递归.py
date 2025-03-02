import sys

# Python 默认的递归深度限制是 1000 层 可以通过 sys.setrecursionlimit() 来修改这个限制。
sys.setrecursionlimit(1500)


# 递归--------------------------------
def factorial(n):
    if n == 1:
        return 1
    else:
        return n * factorial(n - 1)


print(factorial(5))  # 输出: 120
