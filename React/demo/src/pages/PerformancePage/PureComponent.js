import React from 'react';

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

class List extends React.PureComponent {
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
				<Input submitTitle={this.onSubmitTitle} />
				<List list={this.state.list} />
			</div>
		);
	}
}

export default TodoListDemo;
