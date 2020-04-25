import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './reducers/index';
import logger from './logger';

const initialState = undefined;

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunk, logger)));

export default store;
