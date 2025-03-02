# 定义一个 CoffeeMixin 类，用于处理咖啡的相关操作
class CoffeeMixin:
    def __init__(self):
        # 初始化咖啡的数量
        self.amount = 0

    # 添加咖啡的方法
    def addCoffee(self, nums):
        self.volume = nums  # 设置咖啡的量
        return f"add coffee {self.volume} part"  # 返回添加咖啡的描述


# 定义一个 WaterMixin 类，用于处理水的相关操作
class WaterMixin:
    def __init__(self):
        # 初始化水的温度和数量
        self.temperature = None
        self.amount = 0

    # 添加水的方法
    def addWater(self, nums, temperature):
        self.volume = nums  # 设置水的体积
        if temperature == "cold":
            self.temperature = "cold"  # 设置水温为冷
        elif temperature == "hot":
            self.temperature = "hot"  # 设置水温为热

        # 返回添加水的描述
        return f"add {self.temperature} water {self.volume} ML "


# 定义一个 MilkMixin 类，用于处理牛奶的相关操作
class MilkMixin:
    def __init__(self):
        # 初始化牛奶的温度和数量
        self.temperature = None
        self.amount = 0

    # 添加牛奶的方法
    def addMilk(self, nums, temperature):
        self.volume = nums  # 设置牛奶的体积
        if temperature == "cold":
            self.temperature = "cold"  # 设置牛奶温度为冷
        elif temperature == "hot":
            self.temperature = "hot"  # 设置牛奶温度为热

        # 返回添加牛奶的描述
        return f"add {self.temperature} milk {self.volume} ML "


# 定义一个 Coffee 类，继承 WaterMixin、CoffeeMixin 和 MilkMixin
class Coffee(CoffeeMixin, WaterMixin, MilkMixin):
    def __init__(
        self, coffee=1, water=-1, water_temp="cold", milk=-1, milk_temp="cold"
    ):
        # 初始化咖啡的配方参数
        self.coffee = coffee  # 咖啡的量
        self.water = water  # 水的量
        self.water_temp = water_temp  # 水的温度
        self.milk = milk  # 牛奶的量
        self.milk_temp = milk_temp  # 牛奶的温度
        self.prescription = []  # 用于存储配方的列表

        # 如果咖啡的量大于 0，调用 addCoffee 方法并添加到配方中
        if int(self.coffee) > 0:
            self.prescription.append(super().addCoffee(self.coffee))

        # 如果水的量大于 0，调用 addWater 方法并添加到配方中
        if int(self.water) > 0:
            self.prescription.append(super().addWater(self.water, self.water_temp))

        # 如果牛奶的量大于 0，调用 addMilk 方法并添加到配方中
        if int(self.milk) > 0:
            self.prescription.append(super().addMilk(self.milk, self.milk_temp))

    # 显示配方的方法
    def showPrescription(self):
        for i in self.prescription:
            print(i)  # 打印配方中的每一项


# 创建一个 Coffee 实例，设置牛奶量为 150 ML，温度为热，咖啡量为 1 份
americano_ice = Coffee(coffee=1, milk=150, milk_temp="hot")

# 显示配方
americano_ice.showPrescription()
