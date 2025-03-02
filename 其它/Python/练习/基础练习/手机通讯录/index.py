from tinydb import TinyDB, Query

with open("./demo.csv", encoding="utf-8") as f:
    fileData = f.readlines()
    # print(fileData)

# 遍历 fileData ，并将每一行数据以逗号分隔存储到 db 中
db = TinyDB("./db.json")
for f in fileData:
    fileDataItem = f.split(",")
    if db.contains(Query().name == fileDataItem[0]):
        continue
    db.insert(
        {
            "name": fileDataItem[0],
            "source": fileDataItem[1],
            "tel": fileDataItem[2].strip(),
        }
    )

# 查看数据库中的所有数据
# print(db.all())

# 根据name查询数据
item = db.search(Query().name == "张三")
print(item)
print(f"{item[0]['name']}: {item[0]['tel']}")
