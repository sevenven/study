import { createStore, combineReducers, applyMiddleware } from 'redux';
import { couterReducer, couterReducer2, defaultReducer } from './reducer';
import createSagaMiddleware from 'redux-saga';
import { defaultSaga } from './sagas';

const sagaMiddleware = createSagaMiddleware();

export default createStore(defaultReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(defaultSaga);
