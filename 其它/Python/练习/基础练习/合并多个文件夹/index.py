file_data = []
for file_path in ["./demo1.txt", "./demo2.txt", "./demo3.txt"]:
    with open(file_path) as f:
        file_data.append(f.read())

with open("./demo.txt", "w") as f:
    for data in file_data:
        f.write(data)
