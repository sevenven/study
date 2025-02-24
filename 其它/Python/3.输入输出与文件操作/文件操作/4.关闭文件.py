# 手动关闭
# file = open("./file.txt", "r")
# print(file.read())
# file.close()

# 使用 with 语句（推荐）
with open("./file.txt", "r") as file:
    print(file.read())
# 文件会在 with 块结束后自动关闭
