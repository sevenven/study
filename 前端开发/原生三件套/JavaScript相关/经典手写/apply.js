// 模拟Function.prototype.apply---与模拟call主要是参数形式不同
Function.prototype.myApply = function (ctx, args = []) {
	ctx = ctx || window;
	ctx.fn = this;
	const result = ctx.fn(...args);
	delete ctx.fn;
	return result;
};

var name = 'seven-window';
const foo = {
	name: 'seven'
};
function bar(age, gender) {
	console.log(this.name, age, gender);
	return 'bobozanzan';
}

console.log(bar.myApply(null, [25, 'female']));
console.log(bar.myApply(foo, [25, 'female']));
console.log(bar.myApply(foo));
