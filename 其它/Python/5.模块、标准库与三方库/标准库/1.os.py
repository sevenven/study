# 提供与操作系统交互的功能

import os

os.mkdir("new_directory")  # 创建新目录
os.rmdir("new_directory")  # 删除目录

os.chdir("../模块")  # 改变当前工作目录
print(os.getcwd())  # 获取当前工作目录

print(os.listdir("."))  # 列出当前目录下的所有文件和目录

print(os.path.join("folder", "file.txt"))  # 拼接路径
print(os.path.exists("file.txt"))  # 检查路径是否存在
