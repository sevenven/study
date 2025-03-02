import argparse

if __name__ == "__main__":
    # 创建 ArgumentParser 对象
    parser = argparse.ArgumentParser(description="一个简单的命令行参数示例")

    # 添加参数
    parser.add_argument("name", help="用户的名字")  # required
    parser.add_argument("-a", "--age", type=int, help="用户的年龄")  # optional
    parser.add_argument("-v", "--verbose", action="store_true", help="是否显示详细信息")

    # 解析参数
    args = parser.parse_args()

    # 使用参数
    print(f"你好, {args.name}!")
    if args.age:
        print(f"你 {args.age} 岁了。")
    if args.verbose:
        print("这是详细信息。")

# python .\_argparse.py Alice -a 30 -v
