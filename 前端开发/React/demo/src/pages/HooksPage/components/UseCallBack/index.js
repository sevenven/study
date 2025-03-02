import React, { useCallback, useState } from 'react';
import A, { MemoA } from './components/A';

export default function UseCallBack(props) {
	const [count, setCount] = useState(10);
	const [count2, setCount2] = useState(20);

	const addCount = () => {
		console.log('addCount~~~~', count);
		setCount(count + 1);
	};

	// 使用了useCallback，函数地址只有当依赖发生变化的时候才会改变
	// useCallBack不要每个函数都包一下，否则就会变成反向优化，useCallBack本身就是需要一定性能的
	// useCallBack并不能阻止函数重新创建,它只能通过依赖决定返回新的函数还是旧的函数,从而在依赖不变的情况下保证函数地址不变
	// useCallBack需要配合React.memo使用

	const addCount2 = useCallback(() => {
		console.log('addCount2~~~', count2);
		setCount2(count2 + 2);
	}, [count2]);

	return (
		<div>
			<br />
			<h4>UseCallBack</h4>
			<div>{count}</div>
			<button onClick={addCount}> 点击我改变父组件中与A组件无关的state</button>
			<div>{count2}</div>
			<button onClick={addCount2}> 点击我改变父组件中与A组件有关的state</button>
			<A
				// 接受一个函数作为props
				addCount={addCount}
			/>
			<MemoA
				// 接受一个函数作为props
				// useCallback需要搭配React.memo使用-浅比较
				addCount={addCount2}
			/>
		</div>
	);
}
