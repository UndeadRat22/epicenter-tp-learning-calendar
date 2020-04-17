import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import reducer from '../reducers/index';

const middleware = [reduxThunk];

const store = createStore(reducer, applyMiddleware(...middleware));
export default store;
