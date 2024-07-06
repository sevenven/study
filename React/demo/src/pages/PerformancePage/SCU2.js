import React from 'react';
import _ from 'lodash';

class Input extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: ''
		};
	}
	componentDidUpdate() {
		console.log('Input componentDidUpdate');
	}
	onTitleChange = e => {
		this.setState({
			title: e.target.value
		});
	};
	onSubmit = () => {
		const { submitTitle } = this.props;
		submitTitle(this.state.title);

		this.setState({
			title: ''
		});
	};
	render() {
		return (
			<div>
				<input value={this.state.title} onChange={this.onTitleChange} />
				<button onClick={this.onSubmit}>提交</button>
			</div>
		);
	}
}

class List extends React.Component {
	componentDidUpdate() {
		console.log('List componentDidUpdate');
	}
	render() {
		const { list } = this.props;

		return (
			<ul>
				{list.map((item, index) => {
					return (
						<li key={item.id}>
							<span>{item.title}</span>
						</li>
					);
				})}
			</ul>
		);
	}

	// 增加 shouldComponentUpdate
	shouldComponentUpdate(nextProps, nextState) {
		// _.isEqual 做对象或者数组的深度比较（一次性递归到底）
		if (_.isEqual(nextProps.list, this.props.list)) {
			// 相等，则不重复渲染
			return false;
		}
		return true; // 不相等，则渲染
	}
}

class TodoListDemo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			count: 0,
			list: [
				{
					id: 'id-1',
					title: '标题1'
				},
				{
					id: 'id-2',
					title: '标题2'
				},
				{
					id: 'id-3',
					title: '标题3'
				}
			]
		};
	}

	onIncrease = () => {
		this.setState({
			count: this.state.count + 1
		});
	};

	onSubmitTitle = title => {
		// 正确的用法
		this.setState({
			list: this.state.list.concat({
				id: `id-${Date.now()}`,
				title
			})
		});

		// 为了演示 SCU ，故意写的错误用法
		// this.state.list.push({
		// 	id: `id-${Date.now()}`,
		// 	title
		// });
		// this.setState({
		// 	list: this.state.list
		// });
	};

	render() {
		return (
			<div>
				<br />
				<div>
					<span>{this.state.count}</span>
					<button onClick={this.onIncrease}>increase</button>
				</div>
				<br />
				{/* React默认 父组件更新 则子组件无条件更新 */}
				<Input submitTitle={this.onSubmitTitle} />
				<List list={this.state.list} />
			</div>
		);
	}
}

export default TodoListDemo;
