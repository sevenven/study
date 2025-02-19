class Dog:
	def __init__(self, name, age):
		self.name = name
		self.age = age
	
	def bark(self):
		return f"{self.name} says woof!"

class Bulldog(Dog):
	def run(self):
		return f"{self.name} is running fast."

my_bulldog = Bulldog("sugar", 5)
print(my_bulldog.run())