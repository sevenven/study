import React, { Component } from 'react';
import { connect } from 'react-redux';

class ReduxSagaPage extends Component {
	takeEvery = () => {
		this.props.dispatch({
			type: 'takeEvery',
			user: {
				name: 'seven',
				password: '123456'
			}
		});
	};
	takeLatest = () => {
		this.props.dispatch({
			type: 'takeLatest',
			user: {
				name: 'seven',
				password: '123456'
			}
		});
	};
	throttle = () => {
		this.props.dispatch({
			type: 'throttle',
			user: {
				name: 'seven',
				password: '123456'
			}
		});
	};

	render() {
		// const { count } = store.getState();
		return (
			<div>
				<h3>ReduxSagaPage</h3>
				<br />
				<button onClick={this.takeEvery}>点击发送takeEvery</button>
				<br />
				<button onClick={this.takeLatest}>点击发送takeLates</button>
				<br />
				<button onClick={this.throttle}>点击发送throttle</button>
			</div>
		);
	}
}

export default connect()(ReduxSagaPage);
