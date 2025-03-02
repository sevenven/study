import os

# 获取当前工作目录
current_dir = os.getcwd()
print("当前目录:", current_dir)

# 拼接路径
new_path = os.path.join(current_dir, "example.txt")
print("拼接后的路径:", new_path)

# 检查文件是否存在
if os.path.exists(new_path):
    print("文件存在")
else:
    print("文件不存在")
