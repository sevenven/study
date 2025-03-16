from collections import deque


class Task:
    def __init__(self, name):
        self.name = name

    def run(self):
        print(f"Running task: {self.name}")


class TaskScheduler:
    def __init__(self):
        self.task_queue = deque()

    def add_task(self, task):
        self.task_queue.append(task)

    def run_tasks(self):
        while self.task_queue:
            task = self.task_queue.popleft()
            task.run()


# 创建任务调度器和任务
scheduler = TaskScheduler()
scheduler.add_task(Task("Task 1"))
scheduler.add_task(Task("Task 2"))
scheduler.run_tasks()
