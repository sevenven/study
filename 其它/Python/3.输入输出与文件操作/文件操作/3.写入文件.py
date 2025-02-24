# 写入文件
with open("./file.txt", "w") as file:
    file.write("Hello, World!\n")
    file.write("This is a new line.\n")

# 追加内容
with open("./file.txt", "a") as file:
    file.write("This is appended text.\n")
