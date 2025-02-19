import datetime
from datetime import timedelta

now = datetime.now()
future = now + timedelta(days=10)
print(future)  # 输出10天后的日期和时间