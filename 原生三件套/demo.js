// index.js
Page({
	data: {
		name: 'xiaowang',
		age: 22
	},
	eatFood: function (food) {
		console.log('eating ' + food);
	}
});

// list.js
Page({
	onLoad: function (options) {
		//获取当前页面栈
		const pages = getCurrentPages();
		//获取上一页面对象
		let prePage = pages[pages.length - 2];
		console.log(prePage.data.name); //'xiaowang'
		prePage.eatFood('apple'); //eating apple
	}
});
