import { takeEvery, takeLatest, throttle, select, call } from 'redux-saga/effects';

export function* defaultSaga() {
	// console.log('defaultSaga');
	yield takeEvery('takeEvery', function* () {
		const state = yield select(state => state.user);
		console.log('takeEvery', state);
		// setTimeout(() => {}, 0);
		// yield call(setTimeout);
	});
	yield takeLatest('takeLatest', function* () {
		// console.log('takeLatest');
	});
	yield throttle(0, 'throttle', function* () {
		// console.log('throttle');
	});
}
