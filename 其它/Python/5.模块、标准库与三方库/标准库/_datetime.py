# 处理日期和时间

import datetime
from datetime import timedelta

print(datetime.now())  # 获取当前日期和时间
print(datetime(2023, 10, 1, 12, 30))  # 创建特定日期和时间
print(datetime.now().strftime("%Y-%m-%d %H:%M:%S"))  # 格式化输出
print(datetime.now() + timedelta(days=10))  # 日期和时间的加减
