def f1(x):
	if x > 5:
		print("x is greater than 5")
	elif x == 5:
		print("x is equal to 5")
	else:
		print("x is less than 5")

f1(6)

def f2(x):
	for i in range(5):
		print(i)
	while x > 0:
		print(x)
		x -= 1

f2(5)