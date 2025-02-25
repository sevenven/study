// 定义一个命名空间 `MathOperations`，用于组织数学运算相关的函数
namespace MathOperations {
	// 导出一个加法函数 `add`，接受两个数字参数并返回它们的和
	export function add(a: number, b: number): number {
		return a + b;
	}

	// 导出一个减法函数 `subtract`，接受两个数字参数并返回它们的差
	export function subtract(a: number, b: number): number {
		return a - b;
	}
	// 在 `MathOperations` 命名空间内定义一个嵌套命名空间 `AdvancedMath` 用于组织更高级的数学运算函数
	export namespace AdvancedMath {
		// 导出一个乘法函数 `multiply`，接受两个数字参数并返回它们的积
		export function multiply(a: number, b: number): number {
			return a * b;
		}

		// 导出一个除法函数 `divide`，接受两个数字参数并返回它们的商
		// 如果除数为 0，抛出错误
		export function divide(a: number, b: number): number {
			if (b === 0) throw new Error('Division by zero');
			return a / b;
		}
	}
}

console.log(MathOperations.add(5, 3));
console.log(MathOperations.subtract(10, 4));
console.log(MathOperations.AdvancedMath.multiply(5, 3));
console.log(MathOperations.AdvancedMath.divide(10, 2));
