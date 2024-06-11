// 有一个数组a[100]存放0—99；要求每隔两个数删掉一个数
// 到末尾时循环至开头继续进行, 求最后一个被删掉的数。

function rinkDel(arr) {
	var index = 0;
	while (arr.length !== 1) {
		var item = arr.shift();
		index += 1;
		if (index % 3 !== 0) {
			arr.push(item);
		}
	}
	return arr[0];
}

var arr = [];
for (var i = 0; i < 100; i++)
	arr.push(i);
console.log(rinkDel(arr)); // 90