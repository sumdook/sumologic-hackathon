import { combineReducers } from 'redux';
import dataReducer from './dataReducer';
import pathReducer from './pathReducer';
export default combineReducers({
	data_snapshot: dataReducer,
	path:pathReducer
});