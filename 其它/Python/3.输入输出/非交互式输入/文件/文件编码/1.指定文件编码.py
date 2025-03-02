# 编码（Encoding）：将字符转换为字节的过程。常见的编码方式有 UTF-8、ASCII、GBK 等。
# 解码（Decoding）：将字节转换为字符的过程。
# 默认编码：Python 3 默认使用 UTF-8 编码。

# 以 UTF-8 编码写入文件
with open("../file.txt", "w", encoding="utf-8") as file:
    file.write("你好，世界！")

# 以 UTF-8 编码打开文件
with open("../file.txt", "r", encoding="utf-8") as file:
    content = file.read()
    print(content)
