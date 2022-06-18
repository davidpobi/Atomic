import {combineReducers} from 'redux';
import isLoggedReducer from './isLogged';
import userAssets from './userAssets';


const allReducers = combineReducers({isLogged: isLoggedReducer, collectibles:userAssets});

export default allReducers;