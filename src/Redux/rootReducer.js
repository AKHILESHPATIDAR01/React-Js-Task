import { combineReducers } from 'redux';
import fetchReducer from './Reducers/reducers.js';

const rootReducer = combineReducers({
    data: fetchReducer,
});
export default rootReducer;