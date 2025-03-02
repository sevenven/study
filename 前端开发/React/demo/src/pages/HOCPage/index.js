import React from 'react';

// 高阶组件--工厂模式
const withMouse = Component => {
	class withMouseComponent extends React.Component {
		constructor(props) {
			super(props);
			this.state = { x: 0, y: 0 };
		}

		handleMouseMove = event => {
			this.setState({
				x: event.clientX,
				y: event.clientY
			});
		};

		render() {
			return (
				<div style={{ height: '500px', border: '1px solid #f00' }} onMouseMove={this.handleMouseMove}>
					{/* 1. 透传所有 props 2. 增加 mouse 属性 */}
					<Component {...this.props} mouse={this.state} />
				</div>
			);
		}
	}
	return withMouseComponent;
};

const HOCPage = props => {
	const { x, y } = props.mouse; // 接收 mouse 属性
	return (
		<h1>
			The mouse position is ({x}, {y})
		</h1>
	);
};

export default withMouse(HOCPage); // 返回高阶函数
