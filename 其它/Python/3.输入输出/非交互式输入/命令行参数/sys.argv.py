import sys

if __name__ == "__main__":
    # 打印所有命令行参数
    print("脚本名称:", sys.argv[0])
    print("参数列表:", sys.argv[1:])

    # 示例：处理参数
    if len(sys.argv) > 1:
        for i, arg in enumerate(sys.argv[1:], start=1):
            print(f"参数 {i}: {arg}")
    else:
        print("没有提供参数。")

# python .\sys.argv.py arg1 arg2 arg3
