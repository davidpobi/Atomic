import {combineReducers} from 'redux';
import contractAssets from './contractAssets';
import isLoggedReducer from './isLogged';
import userAssets from './userAssets';



const allReducers = combineReducers({isLogged: isLoggedReducer, collectibles:userAssets, collections: contractAssets});

export default allReducers;