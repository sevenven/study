from pathlib import Path  # 推荐使用pathlib操作文件路径

# 创建 Path 对象
path = Path("../file.txt")

# 检查文件是否存在
if path.exists():
    print("文件存在")
    print("文件内容:", path.read_text())
else:
    print("文件不存在")
