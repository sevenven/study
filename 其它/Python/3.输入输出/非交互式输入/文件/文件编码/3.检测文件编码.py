import chardet

# 读取文件并检测编码
with open("../file.txt", "rb") as file:
    raw_data = file.read()
    result = chardet.detect(raw_data)
    print("检测到的编码:", result)

# 根据检测到的编码读取文件
encoding = result["encoding"]
with open("../file.txt", "r", encoding=encoding) as file:
    content = file.read()
    print(content)
