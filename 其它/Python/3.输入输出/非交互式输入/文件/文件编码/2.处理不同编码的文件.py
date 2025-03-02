try:
    with open("../file.txt", "r", encoding="gbk") as file:
        content = file.read()
        print(content)
except UnicodeDecodeError:
    print("文件编码不匹配，请检查文件编码！")
