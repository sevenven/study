pi = 3.1415926535

# 保留两位小数
formatted_pi = f"π 的值是 {pi:.2f}"
print(formatted_pi)

# 对齐文本
name = "Alice"
print(f"{name:<10}")  # 左对齐，宽度为 10
print(f"{name:^10}")  # 居中对齐，宽度为 10
print(f"{name:>10}")  # 右对齐，宽度为 10
