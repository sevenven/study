# 手动关闭
# file = None
# try:
#     file = open("example.txt", "r", encoding="utf-8")
#     content = file.read()
#     print(content)
# finally:
#     if file:
#         file.close()  # 确保文件被关闭

# 使用 with 语句（推荐）
with open("./file.txt", "r") as file:
    print(file.read())
# 文件会在 with 块结束后自动关闭
