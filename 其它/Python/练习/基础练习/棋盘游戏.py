from pynput.keyboard import Key, Listener, KeyCode

# 初始化棋盘
chessboard = [["0", "0", "0"], ["0", "x", "0"], ["0", "0", "0"]]


# 打印棋盘的函数
def print_chessboard():
    for row in chessboard:
        print(" ".join(row))
    print()  # 打印空行分隔


# 移动逻辑的函数
def move_x(delta_row, delta_col):
    for i in range(3):
        for j in range(3):
            if chessboard[i][j] == "x":
                new_row, new_col = i + delta_row, j + delta_col
                # 检查新位置是否在棋盘范围内
                if 0 <= new_row < 3 and 0 <= new_col < 3:
                    chessboard[i][j] = "0"
                    chessboard[new_row][new_col] = "x"
                return  # 找到 "x" 并移动后直接退出


# 键盘按下事件处理
def on_press(key):
    if key == KeyCode.from_char("w"):  # 上
        move_x(-1, 0)
    elif key == KeyCode.from_char("s"):  # 下
        move_x(1, 0)
    elif key == KeyCode.from_char("a"):  # 左
        move_x(0, -1)
    elif key == KeyCode.from_char("d"):  # 右
        move_x(0, 1)
    elif key == Key.esc:  # 按下 Esc 键退出
        print("退出程序")
        return False  # 返回 False 停止监听

    # 每次按键后打印棋盘
    print_chessboard()


# 监听键盘输入
print("按下 W/A/S/D 移动，按下 Esc 退出")
print_chessboard()  # 初始打印棋盘
with Listener(on_press=on_press) as listener:
    listener.join()
