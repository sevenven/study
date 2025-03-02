import React, { useState, useEffect, useLayoutEffect } from 'react';

export default function UseEffect(props) {
	const [count, setCount] = useState(0);

	// 不同的useEffect处理不同的逻辑单元-更加清晰明了
	useEffect(() => {
		// 浏览器渲染完成后异步执行--页面会闪烁
		// componentDidMount&componentDidUpdate-数组不为空或者不传数组参数
		if (count === 0) {
			setCount(10 + Math.random() * 200);
		}
	}, [count]);

	// useLayoutEffect 相比 useEffect，通过同步执行状态更新可解决一些特性场景下的页面闪烁问题。
	// useEffect 可以满足百分之99的场景，而且 useLayoutEffect 会阻塞渲染，请谨慎使用。
	// useLayoutEffect(() => {
	// 	// 在组件渲染完成后，它在浏览器布局和绘制之前同步执行--页面不会闪烁
	// 	// 适合用来处理布局问题
	// 	if (count === 0) {
	// 		setCount(10 + Math.random() * 200);
	// 	}
	// 	return () => {
	// 		// 在组件卸载前执行的清理代码
	// 	};
	// }, [count]);

	// 时间绑定与时间解绑写在了一处-有效降低忘记解绑的概率
	useEffect(() => {
		// componentDidMount-数组为空
		window.addEventListener('resize', onResize);
		// componentWillUnMount
		return () => {
			window.removeEventListener('resize', onResize);
		};
	}, []);

	const onResize = e => {
		console.log('e~~~~', e, new Date().getTime());
	};

	return (
		<div>
			<br />
			<h3>UseEffect&UseLayoutEffect</h3>
			<div onClick={() => setCount(0)}>{count}</div>
		</div>
	);
}
