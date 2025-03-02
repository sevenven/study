# 使用字典
person = {"name": "Alice", "age": 25}
message = f"{person['name']} 今年 {person['age']} 岁了。"
print(message)


# 使用对象
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age


person = Person("Bob", 30)
message = f"{person.name} 今年 {person.age} 岁了。"
print(message)
