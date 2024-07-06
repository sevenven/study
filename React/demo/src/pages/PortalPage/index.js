import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';

class PortalsPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		// 正常渲染
		// return <div className="modal">{this.props.children || 'createPortal'} </div>;

		// 使用 Portals 渲染到 body 上。
		// fixed 元素要放在 body 上，有更好的浏览器兼容性。
		return ReactDOM.createPortal(
			<div className="modal">{this.props.children || 'createPortal'}</div>,
			document.body // DOM 节点
		);
	}
}

export default PortalsPage;
