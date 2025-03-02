# 打开文件
file = open("./file.txt")

# 读取整个文件
# print(file.read())

# 读取一行
print(file.readline())

# 读取所有行
for line in file.readlines():
    print(line.strip())  # 去掉换行符

# 关闭文件
file.close()
