from sympy import Derivative, Symbol
from sympy.plotting import plot

x = Symbol("x")
y = x * x + 3 * x + 2
d = Derivative(y, x)

print(d.doit())
print(d.doit().subs({"x": 10}))

print(plot(y, (x, -10, 10)))
