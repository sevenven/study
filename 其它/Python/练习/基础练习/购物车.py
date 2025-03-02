# 商品列表
products = [
    [100, "iphone", "phone", 12000],  # id, name, category, price
    [101, "macbook", "laptop", 2000],
    [102, "ipad", "tablet", 4000],
    [103, "samsung", "tv", 3500],
]

# 购物车
cart = {
    100: 5,
    101: 2,
}


# 添加到购物车
def add_to_cart(id, count):
    if id not in cart:
        cart[id] = count
    else:
        cart[id] += count


# 从购物车删除
def del_to_cart(id, count):
    if id not in cart:
        pass
    elif cart[id] < count:
        pass
    else:
        cart[id] -= count


# 清空购物车
def clear_cart():
    cart.clear()


# 根据id查找商品名称
def idtoname(id):
    for product in products:
        if product[0] == id:
            return product[1]
    return None


# 根据id查找商品价格
def idtoprice(id):
    for product in products:
        if product[0] == id:
            return product[3]
    return None


def show_cart():
    print("购物车")
    total = 0
    for id, count in cart.items():
        name = idtoname(id)
        price = idtoprice(id)
        subtotal = count * price
        print(f"购买商品{name} 数量{count} 单价{price} 小计{subtotal}")
        total += subtotal
    print("总价：%d" % total)


show_cart()
