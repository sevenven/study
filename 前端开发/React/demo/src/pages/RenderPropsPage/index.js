import React from 'react';

class Mouse extends React.Component {
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
				{/* 将当前 state 作为 props ，传递给 render （render 是一个函数组件） */}
				{this.props.render(this.state)}
			</div>
		);
	}
}

const RenderPropsPage = props => (
	<Mouse
		render={
			/* render 是一个函数组件 */
			({ x, y }) => (
				<h1>
					The mouse position is ({x}, {y})
				</h1>
			)
		}
	/>
);

/**
 * 即，定义了 Mouse 组件，只有获取 x y 的能力。
 * 至于 Mouse 组件如何渲染，App 说了算，通过 render prop 的方式告诉 Mouse 。
 */

export default RenderPropsPage;
